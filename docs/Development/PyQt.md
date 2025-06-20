## PyQt跨线程赋值

> 即使我在主线程声明self.output=[]但是使用第二者依旧报错?

```python
# 正确
output.append(out1)
output.append(out2)
self.parent.output=output

# 报错
self.parent.output.append(out1)
self.parent.output.append(out2)
```

## PyQt 跨线程通信

PyQt 的 GUI 操作（如更新标签、按钮状态）必须在主线程（GUI 线程）中执行。若在子线程（如工作线程）中直接调用父类（主线程）的槽函数，会违反这一规则，导致：

- UI 无响应或崩溃；
- 数据竞争（多个线程同时修改 UI 组件）；
- 未定义行为（如标签内容不更新）。

> 示例 1：直接调用父类槽函数（错误演示）

```python
import sys
import time
from PyQt5.QtCore import QThread, Qt
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel, QPushButton

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.init_ui()
        self.worker = WorkerThread(parent=self)  # 工作线程，父类为当前窗口

    def init_ui(self):
        self.setWindowTitle("跨线程通信错误示例")
        self.label = QLabel("初始状态", self)
        self.label.setGeometry(50, 50, 200, 30)
        self.btn = QPushButton("启动线程", self)
        self.btn.setGeometry(50, 100, 100, 30)
        self.btn.clicked.connect(self.start_thread)

    def start_thread(self):
        self.worker.start()  # 启动工作线程

    def update_label(self, text):
        # 目标：更新标签内容（GUI操作，应在主线程执行）
        self.label.setText(text)
        self.label.update()  # 强制刷新界面

class WorkerThread(QThread):
    def __init__(self, parent=None):
        super().__init__(parent)
        self.parent = parent  # 保存父窗口引用

    def run(self):
        # 模拟耗时任务（子线程中执行）
        for i in range(5):
            time.sleep(1)  # 模拟耗时操作
            # 直接调用父窗口的槽函数（错误！）
            self.parent.update_label(f"第 {i+1} 秒")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())
```

> 示例 2：通过信号量通信（正确实现）

```python
import sys
import time
from PyQt5.QtCore import QThread, pyqtSignal, Qt
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel, QPushButton

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.init_ui()
        self.worker = WorkerThread()
        self.worker.update_signal.connect(self.update_label)  # 信号连接槽

    def init_ui(self):
        self.setWindowTitle("信号量通信正确示例")
        self.label = QLabel("初始状态", self)
        self.label.setGeometry(50, 50, 200, 30)
        self.btn = QPushButton("启动线程", self)
        self.btn.setGeometry(50, 100, 100, 30)
        self.btn.clicked.connect(self.start_thread)

    def start_thread(self):
        self.worker.start()  # 启动工作线程

    def update_label(self, text):
        # 槽函数：在主线程中安全更新UI
        self.label.setText(text)
        self.label.update()

class WorkerThread(QThread):
    update_signal = pyqtSignal(str)  # 定义信号（传递字符串）

    def run(self):
        # 子线程中执行耗时任务，通过信号传递数据
        for i in range(5):
            time.sleep(1)
            # 发送信号（数据会自动传递到主线程的槽函数）
            self.update_signal.emit(f"第 {i+1} 秒")

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())
```

**但是如果再使用父类槽函数时传输父类对象呢?**