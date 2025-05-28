# WSI

### MIL遇见的问题

（i）未考虑块之间的关系，从而可能限制模型性能；

（ii）无法处理在临床诊断中至关重要的检索任务。

### MIL常见模型

- DSMIL
- CS-MIL
- SA-MIL
- TransMIL
- HIPT
- MRAN

### 指标

#### 1. Confusion Matrix

在介绍各指标前，先定义常用符号：

- **TP**（True Positive）：预测为阳性且实际为阳性
- **FP**（False Positive）：预测为阳性但实际为阴性
- **TN**（True Negative）：预测为阴性且实际为阴性
- **FN**（False Negative）：预测为阴性但实际为阳性

混淆矩阵是所有二分类指标的基础。

```
               预测阳性    预测阴性
实际为阳性   |    TP     |    FN    |
实际为阴性   |    FP     |    TN    |
```

------

#### 2. Accuracy

- **公式**：

  $\mathrm{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN}$

- **原理**：衡量模型整体预测正确的比例。

- **代表意义**：当正负样本分布均衡时，准确率能较好反映模型整体性能；但若类别高度不平衡，容易被多数类主导，掩盖少数类表现。

------

#### 3. Precision

- **公式**：

  $\mathrm{Precision} = \frac{TP}{TP + FP}$

- **原理**：在所有被预测为阳性的样本中，有多少是真正的阳性。

- **代表意义**：关注“预测为阳性”的可靠性，适用于希望减少假阳性（FP）代价高的场景，比如误诊成本高。

------

#### 4. Recall

- **公式**：

  $\mathrm{Recall} = \frac{TP}{TP + FN}$

- **原理**：在所有实际为阳性的样本中，有多少被模型正确找出。

- **代表意义**：关注“漏检率”（FN）低，适用于希望尽可能多地检测出阳性（如病灶检测）时。

------

#### 5. Specificity

- **公式**：

  $\mathrm{Specificity} = \frac{TN}{TN + FP}$

- **原理**：在所有实际为阴性的样本中，有多少被模型正确识别为阴性。

- **代表意义**：衡量模型排除阴性样本的能力，与召回率互补；适合关注假阳性成本时。

------

#### 6. F1 Score

- **公式**：

  $F1 = 2 \times \frac{\mathrm{Precision} \times \mathrm{Recall}}{\mathrm{Precision} + \mathrm{Recall}}$

- **原理**：Precision 和 Recall 的调和平均，平衡两者权重。

- **代表意义**：当需要兼顾查准率和召回率时，F1 能提供一个综合度量，尤其在类别不平衡时比准确率更可靠。

------

#### 7. ROC 曲线及 AUC

- **ROC 曲线**：以假阳性率（FPR = FP / (FP + TN)）为横轴，召回率（TPR = Recall）为纵轴，绘制不同阈值下的曲线。

- **AUC（ROC AUC）**：

  $\mathrm{AUC} = \int_0^1 \mathrm{TPR}(FPR) \, dFPR$

- **原理**：评估模型在不同阈值下区分正负样本的能力，AUC 越接近 1，说明模型区分度越高。

- **代表意义**：不依赖特定阈值，适合总体性能评估；对类别不平衡较鲁棒。

------

#### 8. PR 曲线及 AUPRC

- **PR 曲线**：以召回率（Recall）为横轴，精确率（Precision）为纵轴，绘制不同阈值下的曲线。

- **AUPRC**：

  $\mathrm{AUPRC} = \int_0^1 \mathrm{Precision}(\mathrm{Recall}) \, d(\mathrm{Recall})$

- **原理**：更关注模型对正类（通常为少数类）检出的性能。

- **代表意义**：在正负样本极度不平衡时，AUPRC 能更敏感地反映模型对少数类的区分能力。

------

#### 9. Average Precision, AP

- **公式**：将 Precision–Recall 曲线离散化后计算加权和：

  $AP = \sum_n (R_n - R_{n-1}) P_n$

  其中 $P_n$、$R_n$ 分别为第 $n$ 个阈值下的精确率和召回率。

- **原理**：在 PR 曲线下方求和，等同于 AUPRC 的一种离散近似。

- **代表意义**：常用于目标检测评估，兼顾模型查准和召回能力。

------

#### 10. MCC

- **公式**：

  $\mathrm{MCC} = \frac{TP \times TN - FP \times FN}{\sqrt{(TP + FP)(TP + FN)(TN + FP)(TN + FN)}}$

- **原理**：基于混淆矩阵的关联度量，输出范围 $[-1,1]$。

- **代表意义**：综合考虑 TP、TN、FP、FN，适用于类别不平衡情况；MCC 越接近1，模型性能越好。

