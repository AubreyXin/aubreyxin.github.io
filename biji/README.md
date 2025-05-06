## 学习笔记

##### [Windows安装ssh](https://www.mls-software.com/opensshd.html)

##### [CentOS7安装可视化桌面](https://blog.csdn.net/oschina_41140683/article/details/81508544?spm=1001.2014.3001.5506)

##### [Linux 常用命令——超详细（建议收藏）](https://blog.csdn.net/zzvar/article/details/119090134?spm=1001.2014.3001.5506)


## 企业微信机器人配置

```bash
curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=49ba8bde-d6da-433d-a637-c240c879958f' \
                -H 'Content-Type: application/json' \
                -d '
            {
                "msgtype": "text",
                "text": {
                "content": "hello world"},
                }
                }
            }'
```



## Linux文件上传和解压缩

### scp命令本地和服务器文件互传

从远程机器复制到本地

```bash
scp -r root@10.10.10.10:/opt /opt
```

从10.10.10.10机器上的`/opt`中下载`/opt`目录到本地的`/opt`目录来。

上传本地目录到远程机器指定目录

```bash
scp -r /opt root@10.10.10.10:/opt
```

上传本地目录`/opt`到远程机器`10.10.10.10`上`/opt`的目录中去。


### tar压缩、解压缩命令

```bash
# 压缩文件、文件夹
tar -cvf 压缩包名 压缩目录

# 解压缩到当前目录
tar -xvf 压缩包名

# 查看压缩包内容
tar -tvf 压缩包名
```

### zip压缩、解压缩命令

```bash
# zip 压缩文件名 原文件
zip 压缩文件名 原文件

# zip 解压缩
unzip 压缩文件名
```



## SSH连接配置

### cmd ssh连接、断开服务器


```bash
ssh root@45.88.12.129
# 连接服务器ip

logout
# 退出连接
```


### VsCode 配置免密连接服务器

#### 生成公钥私钥对

本地执行命令

```bash
ssh-keygen -t rsa -C "your_email@example.com"
```

#### 上传到Linux服务器

将 `C://Users/xxx/.ssh/id_rsa.pub` 拷贝到服务器的 `~/.ssh/authorized_keys`

请不要采用复制粘贴文本的方式，建议直接将文件传到服务器上（不会传直接复制内容也行）

## 常用命令

### 查Linux相关系统进程

```bash
ps -aux | grep plugchaind
```

### 查Linux系统版本

```bash
uname -a
```

### 查Linux磁盘空间

```bash
du -sh *
```

### Linux挂载磁盘


```bash
mount /dev/sdb1 /mnt
```

### Linux切换分支


```bash
git checkout 分支名称
```

### 拉取最新代码


```bash
git fetch --all
```

Linux

## 常见错误

### Linux root 目录下没有.ssh目录

```bash
ssh localhost
```

原因.ssh 是记录密码信息的文件夹，如果没有登录过root的话，就没有 .ssh 文件夹，因此登录 localhost ，并输入密码就会生成了。

### 编译报错

#### collect2: error: ld returned 1 exit status

原因：

ld的版本过低，需要升级一下。

在你的centos7终端运行：


```bash
yum install binutils
```

#### dial tcp 172.217.27.145:443: connect: connection refused

原因：被防火墙屏蔽，需要改成我们国内可用的代理地址，直接在命令行执行


```bash
go env -w GOPROXY=https://goproxy.cn
```

如果克隆仓库比较慢或者没反应的情况，可以把克隆地址 `github.com` 换成国内镜像，已知的国内镜像有`github.com.cnpmjs.org`和`hub.fastgit.org/`



## 安装Linux软件

### Centos 7 安装 Mail

SMTP 常见服务器地址：

网易163：`smtp.163.com`

QQ：`smtp.qq.com`

安装 mailx

```bash
yum install mailx -y
```


配置邮箱授权

```bash
vim /etc/mail.rc

# 指定邮箱
set from=1040858548@qq.com
 
# 邮箱协议
set smtp="smtp.qq.com"
 
# 邮箱账号
set smtp-auth-user="1040858548@qq.com"
 
# 邮箱授权码，QQ邮箱后台里面去授权
set smtp-auth-password="vlzbfnyxqnvgbbdc"
 
# 登陆方式
set smtp-auth=login
```

发送邮件格式

```bash
mail -s test 1040858548@qq.com < /status.json
# 发送文件里的内容到邮箱
echo "hello world" | mail -s "test" 1040858548@qq.com
# 发送`hello world`到邮箱
```

### 安装 v2Ray

```bash
yum update -y && yum install curl -y
```

```bash
bash <(curl -s -L https://git.io/v2rayinstall.sh)
```


### 安装 ZSH

安装

```bash
yum install zsh
```

确认

```bash
zsh --version
```


安装oh-my-zsh

curl

```bash
sh -c "$(curl -fsSL https://gitee.com/gloriaied/oh-my-zsh/raw/master/tools/install.sh)"
```

wget


```bash
sh -c "$(wget https://gitee.com/gloriaied/oh-my-zsh/raw/master/tools/install.sh -O -)"
```

编辑配置文件

```bash
vim ~/.zshrc

ZSH_THEME="fox"

设为默认shell

chsh -s /bin/zsh

重新加载

source ~/.zshrc
```


### 安装 Golang

- golang 安装(>=1.16)

- [golang各种版本下载](https://studygolang.com/dl)

- 本教程下载的 v1.16.4 版本，官方安装 golang 教程[文档](https://golang.org/doc/install)

安装 go1.16.4 版本

```bash
wget https://studygolang.com/dl/golang/go1.16.4.linux-amd64.tar.gz
```
解压 go1.16.4 安装包

```bash
rm -rf /usr/local/go && tar -C /usr/local -zxf go1.16.4.linux-amd64.tar.gz
```

```bash
export PATH=$PATH:/usr/local/go/bin
```

```bash
mkdir -p $HOME/go/bin
echo "export GOPATH=$HOME/go" >> ~/.bashrc
source ~/.bashrc
echo "export GOBIN=$GOPATH/bin" >> ~/.bashrc
source ~/.bashrc
echo "export PATH=$PATH:$GOBIN" >> ~/.bashrc
source ~/.bashrc

export GOROOT=/usr/local/go
export GOPATH=/usr/local/GO
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
```

参考 go 的版本是否正确（go version go1.16.4 linux/amd64）如报错请重新安装 go

```bash
go version
```


## Windows安装msi应用


在msixbundle目录下按住shift右键空白处

点击“在此处打开power shell窗口”

输入`add-appxpackage ./文件名` 并回车

TIPS:你可以按下TAB补全文件名

## html修改网页内容


 ```bash
document.body.contentEditable="true"
document.designMode = 'on'
 ```

