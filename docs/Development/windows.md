

# Windows

### 激活

```java
slmgr /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX
slmgr /skms kms.03k.org
slmgr /ato
```

### 远程连接

1. 开端口3389防火墙
2. 开服务

> 修改注册表端口值：
>
> - 打开注册表编辑器（Win+R 输入 regedit），导航至路径：HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Terminal Server\WinStations\RDP - Tcp。双击 PortNumber 项，选择 “十进制”，输入新端口号（如 3390），点击 “确定”。
> - 部分系统需额外修改路径 HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Terminal Server\Wds\rdpwd\Tds\tcp 下的 PortNumber。
>
> 重启服务生效：
>
> - 无需重启系统：以管理员身份打开 CMD，执行命令 net stop TermService /y 和 net start TermService 重启远程桌面服务。或直接重启计算机使更改生效。
>
> 配置防火墙：
>
> - 打开 “高级安全 Windows Defender 防火墙”，新建入站规则：选择 “端口”→TCP 协议→输入新端口号（如 3390）→允许连接→命名规则（如 “远程桌面新端口”）。

### 修改电源模式

```bash
#查看电源模式功能
powercfg -a
#关闭系统休眠
powercfg -h off
```

