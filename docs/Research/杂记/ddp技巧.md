### 自己的模板

```python
def train(args,epoch, model, train_loader, criterion, optimizer,
          rank,device,writer, best_case_metrics):
        with tqdm(patient_loader, desc=f"Train Epoch {epoch} | {image_name}", unit="block",disable=(rank!=0)) as tbar:

        if rank == 0:  # 仅主进程记录日志
            logging.info(f"Train Epoch: {epoch} | Patient: {image_name} | Dice: {dice:.4f} | IoU: {iou:.4f}")

    loss_tensor = torch.tensor(train_loss, device=device)
    dice_tensor = torch.tensor(case_dice, device=device)
    iou_tensor = torch.tensor(case_iou, device=device)
    count_tensor = torch.tensor(total_blocks, device=device)
    # all_reduce（SUM）到每张卡
    dist.all_reduce(loss_tensor, op=dist.ReduceOp.SUM)
    dist.all_reduce(dice_tensor, op=dist.ReduceOp.SUM)
    dist.all_reduce(iou_tensor, op=dist.ReduceOp.SUM)
    dist.all_reduce(count_tensor, op=dist.ReduceOp.SUM)

    if rank == 0:
        ws = dist.get_world_size()
        avg_loss = loss_tensor.item() / count_tensor.item()
        avg_dice = dice_tensor.item() / (len(train_loader) * ws)
        avg_iou = iou_tensor.item() / (len(train_loader) * ws)

        writer.add_scalar('Train/Loss', avg_loss, epoch)
        writer.add_scalar('Train/Dice', avg_dice, epoch)
        writer.add_scalar('Train/IoU', avg_iou, epoch)
        logging.info(
            f"Train Epoch: {epoch} | Avg Loss: {avg_loss:.4f} | Avg Dice: {avg_dice:.4f} | Avg IoU: {avg_iou:.4f}")

def main(args):
    # 初始化分布式环境
    dist.init_process_group(backend="nccl",init_method="env://")
    rank = dist.get_rank()
    # 不写的话其他进程的部分基础信息会在rank0加载
    torch.cuda.set_device(rank)
    device = torch.device(f'cuda:{rank}' if torch.cuda.is_available() else 'cpu')

    # 仅主进程创建目录
    if rank == 0:
        os.makedirs(args.log_dir, exist_ok=True)
        os.makedirs(args.checkpoint_dir, exist_ok=True)
        os.makedirs("predicts", exist_ok=True)
        logging.basicConfig(filename=args.log_file, level=args.log_level, format=args.log_format)
        writer = SummaryWriter(log_dir=args.log_dir)
    else:
        writer = None
    #等待主进程加载权重
    # 在model指定device_ids之前使用所以写上
    dist.barrier(device_ids=[rank])

    # 模型初始化（所有进程独立初始化，DDP会自动同步参数）
    # 不写 device_ids barrier()、all_reduce() 等调用就不会再报“devices unknown”的警告；
    # 不用写 output_device 也没事，DDP 会自动用 device_ids[0]。
    model = UNet3D(in_channels=1, n_classes=1).to(device)
    model = DDP(model, device_ids=[rank], output_device=rank)

    optimizer = optim.Adam(model.parameters(), lr=args.lr)
    scheduler = torch.optim.lr_scheduler.StepLR(optimizer, step_size=50, gamma=0.1)
    criterion = DiceLoss()

    # 恢复训练（仅主进程加载，DDP自动同步参数）
    best_avg_metrics = {'dice': 0.0, 'epoch': "None"}
    best_case_metrics = {'dice': 0.0, 'epoch': "None", 'patient': "None"}
    checkpoint=None
    if args.resume:
        checkpoint = torch.load(args.resume, map_location='cpu')
        best_avg_metrics = checkpoint.get('best_avg_metrics', best_avg_metrics)
        best_case_metrics = checkpoint.get('best_case_metrics', best_case_metrics)
        start_epoch = checkpoint['epoch'] + 1
    else:
        start_epoch = 1
    if rank == 0 and checkpoint:
        model.load_state_dict(checkpoint['model_state_dict'])
        optimizer.load_state_dict(checkpoint['optimizer_state_dict'])
        scheduler.load_state_dict(checkpoint['scheduler_state_dict'])

    train_dataset=CaseLevel3DDataset(args.train_image_dir, args.train_label_dir,
                                     args.block_size,args.overlap)
    test_dataset=CaseLevel3DDataset(args.test_image_dir, args.test_label_dir,
                                    args.block_size,args.overlap)
    # 初始化分布式采样器
    # 全局打乱
    # [1,2||3,4]
    # [2,4||1,3]
    train_sampler = DistributedSampler(dataset=train_dataset)

    train_loader = DataLoader(dataset=train_dataset, batch_size=1, sampler=train_sampler)
    test_loader = DataLoader(dataset=test_dataset, batch_size=1)

    # 训练循环
    for epoch in range(start_epoch, args.epochs + 1):
        # 轮次打乱
        train_sampler.set_epoch(epoch)

        train(args,epoch, model, train_loader, criterion, optimizer,
              rank,device,writer, best_case_metrics)
        scheduler.step()

        if rank == 0:
            # 你的model已经不再是你的model
            raw_model=model.module
            current_dice, best_avg_metrics, best_case_metrics = test(
                args,epoch, raw_model, test_loader, criterion,
                rank,device,writer, best_avg_metrics, best_case_metrics
            )
            state = {
                'epoch': epoch,
                'model_state_dict': model.module.state_dict(),  # 保存原始模型参数
                'optimizer_state_dict': optimizer.state_dict(),
                'scheduler_state_dict': scheduler.state_dict(),
                'best_avg_metrics': best_avg_metrics,
                'best_case_metrics': best_case_metrics
            }
            is_best = current_dice > best_avg_metrics['dice']
            save_checkpoint(state, is_best, args.checkpoint_dir, filename=f'checkpoint_last.pth.tar')
        dist.barrier()

    # 主进程输出最终结果
    if rank == 0:
        logging.info(f"Best_Avg: {best_avg_metrics['epoch']} | {best_avg_metrics['dice']:.4f} | "
                     f"Best_Case: {best_case_metrics['epoch']} | {best_case_metrics['patient']} | {best_case_metrics['dice']:.4f}")
        writer.close()
    dist.destroy_process_group()


# CUDA_VISIBLE_DEVICES=6,7 torchrun --standalone --nproc-per-node=2 run.py
```

### 学习的模板

```python
from torchvision.datasets import MNIST
from torchvision.transforms import ToTensor
from torch import nn
import torch
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP
from torch.utils.data.distributed import DistributedSampler
from torch.utils.data import DataLoader
import torch.nn.functional as F
import os


class Net(nn.Module):  # 模型定义
    def __init__(self):
        super(Net, self).__init__()
        self.flatten = nn.Flatten()
        self.seq = nn.Sequential(
            nn.Linear(28 * 28, 128),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, 10)
        )

    def forward(self, x):
        x = self.flatten(x)
        return self.seq(x)


def main():
    dist.init_process_group(backend='nccl')  # 【集合通讯】其他进程连master，大家互认

    rank = dist.get_rank()
    world_size = dist.get_world_size()
    device_name = f'cuda:{rank}'

    checkpoint = None  # 各自加载checkpoint
    try:
        checkpoint = torch.load('checkpoint.pth', map_location='cpu')  # checkpoint是cuda:0保存的，加载默认会读到cuda:0，所以明确指定给cpu
    except:
        pass

    model = Net().to(device_name)
    if checkpoint and rank == 0:  # rank0恢复模型参数
        model.load_state_dict(checkpoint['model'])

    model = DDP(model)  # 【集合通讯】rank0广播参数给其他进程

    optimizer = torch.optim.Adam(model.parameters(), lr=0.001)  # model参数一致，则optim会保证其初始状态一致
    if checkpoint:
        optimizer.load_state_dict(checkpoint['optimizer'])  # 各自加载checkpoint

    train_dataset = MNIST(root='./data', download=True, transform=ToTensor(), train=True)  # 各自加载dataset
    sampler = DistributedSampler(train_dataset)  # 指派子集给各进程
    train_dataloader = DataLoader(train_dataset, batch_size=32, sampler=sampler, persistent_workers=True, num_workers=2)

    val_dataset = MNIST(root='./data', download=True, transform=ToTensor(), train=False)
    val_dataloader = DataLoader(val_dataset, batch_size=32, shuffle=True, persistent_workers=True, num_workers=2)

    for epoch in range(20):
        sampler.set_epoch(epoch)  # 【集合通讯】生成随机种子，rank0广播给其他进程

        model.train()
        for x, y in train_dataloader:
            x, y = x.to(device_name), y.to(device_name)
            pred_y = model(x)  # 【集合通讯】rank0广播model buffer给其他进程
            loss = F.cross_entropy(pred_y, y)
            optimizer.zero_grad()
            loss.backward()  # 【集合通讯】每个参数的梯度做all reduce（每个进程会收到其他进程的梯度，并求平均）
            optimizer.step()

        dist.reduce(loss, dst=0)  # 【集合通讯】rank0汇总其他进程的loss

        if rank == 0:
            train_avg_loss = loss.item() / world_size

            # evaluate
            raw_model = model.module
            val_loss = 0
            with torch.no_grad():
                for x, y in val_dataloader:
                    x, y = x.to(device_name), y.to(device_name)
                    pred_y = raw_model(x)
                    loss = F.cross_entropy(pred_y, y)
                    val_loss += loss.item()
            val_avg_loss = val_loss / len(val_dataloader)
            print(f'train_loss:{train_avg_loss} val_loss:{val_avg_loss}')

            # checkpoint
            torch.save({'model': model.module.state_dict(), 'optimizer': optimizer.state_dict()}, '.checkpoint.pth')
            os.replace('.checkpoint.pth', 'checkpoint.pth')

        dist.barrier()  # 【集合通讯】等待rank0跑完eval


# torchrun --nproc-per-node 2 singlenode_gpu.py
if __name__ == '__main__':
    main()
```

