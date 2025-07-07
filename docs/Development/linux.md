# 一些linux命令

#### screen(linux复用窗口)

```bash
# 1. 创建新会话（启动并进入）
screen -S <会话名>  # 示例：screen -S baidupan_sync

# 2. 列出所有活动会话
screen -ls  

# 3. 恢复（连接）已有会话
screen -r <会话名或会话ID>  # 示例：screen -r baidupan_sync 或 screen -r 12345

# 4. 强制恢复会话（断开其他连接）
screen -r -d <会话名或ID>  # 示例：screen -r -d baidupan_sync

# 5. 将会话放入后台（不终止任务）
# 说明：在会话内通过快捷键将会话 detach（分离）到后台运行，返回原终端
# 操作：先按 Ctrl + a（松开后），再按 d（组合键分两步执行，非同时按下）
# 示例操作（会话内执行）：
# Ctrl + a（松开） + d  # 后台保留会话，回到原终端界面


# 6. 终止（删除）指定会话
# 说明：强制退出并删除一个 Screen 会话（会话内的任务会被终止，操作不可逆）
# 用途：清理不再需要的后台会话（如 bypy 任务已完成或需强制终止）
screen -X -S <会话名或ID> quit  # 示例：screen -X -S baidupan_sync quit
```

#### bypy(百度网盘)

```bash
# 说明：初始化配置（首次登录认证）
# 触发认证流程（按提示完成百度账号登录）
bypy quota

# 说明：列出远程目录文件
# 列出网盘根目录下的文件（按名称升序）
bypy list / --sort name --order asc

# 说明：上传本地文件/目录到网盘
#上传单个文件
bypy upload "D:\docs\report.pdf" "我的文件夹/report.pdf"
#上传整个文件夹
bypy upload -r "D:\projects\2024" "项目备份/2024"

# 说明：下载网盘文件/目录到本地
#下载单个文件
bypy download "我的文件夹/report.pdf" "D:\downloads\report.pdf"
#下载整个文件夹（关键：递归参数 -r）
bypy download -r "项目备份/2024" "D:\backup\2024"

# 说明：双向同步目录（网盘→本地）
bypy syncdown /Backup ~/Backup --deletelocal True

# 说明：创建远程目录
bypy mkdir /2024_Archive

# 说明：删除远程文件/目录
bypy delete /old_logs.zip
```

#### 查看当前目录

```bash
pwd
```

#### 列出目录内容

```bash
ls -l  # 长格式列出文件和目录
ls -a  # 显示隐藏文件
ls -la # 组合选项，长格式显示所有文件
```

#### 切换目录

```bash
cd /path/to/directory  # 切换到指定目录
cd ..                  # 返回上级目录
cd ~                   # 回到用户主目录
```

#### 创建目录

```bash
mkdir new_directory  # 创建新目录
mkdir -p path/to/new/dir  # 递归创建多级目录
```

#### 删除文件或目录

```bash
rm file.txt  # 删除文件
rm -r directory  # 递归删除目录（小心使用）
rm -f file.txt  # 强制删除文件（无需确认）
```

#### 复制文件或目录

```bash
cp source.txt destination.txt  # 复制文件
cp -r source_dir/ destination_dir/  # 递归复制目录
```

#### 移动或重命名文件 / 目录

```bash
mv old_name.txt new_name.txt  # 重命名文件
mv file.txt /path/to/directory/  # 移动文件到指定目录
```

#### 查看文件内容

```bash
cat file.txt  # 显示文件全部内容
more file.txt  # 分页显示文件内容
less file.txt  # 更高级的分页查看器
head -n 10 file.txt  # 显示文件前10行
tail -f log.txt  # 实时监控文件追加内容
```

#### 查找文件

```bash
find /path -name "filename"  # 在指定路径查找文件名
grep "text" file.txt  # 在文件中搜索文本
grep -r "text" /path/  # 递归搜索目录中的文本
```

#### 查看系统信息

```bash
uname -a  # 显示系统信息
df -h  # 查看磁盘使用情况
free -h  # 查看内存使用情况
top  # 实时监控系统进程
htop  # 更友好的进程监控工具（需安装）
```

#### 网络相关

```bash
ifconfig  # 查看网络接口信息
ip addr  # 现代替代ifconfig
ping google.com  # 测试网络连接
traceroute google.com  # 追踪网络路由
curl https://example.com  # 发送HTTP请求
wget https://example.com/file.zip  # 下载文件
```

#### 用户和权限

```bash
chmod 755 file.sh  # 修改文件权限
chown user:group file.txt  # 更改文件所有者和组
sudo command  # 以管理员权限执行命令
su - username  # 切换用户
```

#### 软件包管理(Debian/Ubuntu)

```bash
sudo apt update  # 更新软件包列表
sudo apt upgrade  # 升级所有软件包
sudo apt install package_name  # 安装软件包
sudo apt remove package_name  # 移除软件包
```

#### 软件包管理(RHEL/CentOS)

```bash
sudo yum update  # 更新软件包
sudo yum install package_name  # 安装软件包
sudo yum remove package_name  # 移除软件包
```

#### 服务管理

```bash
sudo systemctl start service_name  # 启动服务
sudo systemctl stop service_name  # 停止服务
sudo systemctl restart service_name  # 重启服务
sudo systemctl status service_name  # 查看服务状态
```

#### 压缩与解压

```bash
tar -czvf archive.tar.gz directory/  # 创建tar.gz压缩包
tar -xzvf archive.tar.gz -C /path/  # 解压tar.gz到指定目录
zip -r archive.zip directory/  # 创建ZIP压缩包
unzip archive.zip -d /path/  # 解压ZIP到指定目录
```

#### 防火墙管理（UFW）

```bash
sudo ufw enable  # 启用防火墙
sudo ufw disable  # 禁用防火墙
sudo ufw allow 80/tcp  # 允许80端口TCP流量
sudo ufw status  # 查看防火墙状态
```

#### 定时任务（Cron）

```bash
crontab -e  # 编辑当前用户的cron任务
# 添加类似下面的行（每天凌晨2点执行备份）
0 2 * * * /path/to/backup/script.sh
```

#### SSH 连接

```bash
ssh username@server_ip  # 连接到远程服务器
ssh -i private_key.pem username@server_ip  # 使用私钥连接
```

#### 文件权限符号表示法

```bash
# r=读(4), w=写(2), x=执行(1)
# 所有者-组-其他用户
chmod 644 file.txt  # rw-r--r--
chmod 755 script.sh  # rwxr-xr-x
```

