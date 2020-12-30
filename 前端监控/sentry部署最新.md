## sentry部署

### 安装Docker

```bash
sudo yum install -y yum-utils

sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

yum-config-manager --enable docker-ce-edge

yum -y install docker-ce

systemctl start docker

docker --version
```

## 二、 安装 Sentry 其他依赖包

```bash
yum install -y device-mapper-persistent-data lvm2

yum install epel-release

yum install -y python-pip

pip install docker-compose

yum install git

```


###  部署sentry

https://juejin.im/post/6847902219015356423



### 注意

apt-get install python3-pip
pip3 install docker-compose



#### Centos7安装apt-get

https://www.cnblogs.com/-wenli/p/13552402.html



### 邮箱 相关
http://www.iocoder.cn/Sentry/install/?vip


### 有关分布式集群

https://zhuanlan.zhihu.com/p/132635228
