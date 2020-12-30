
## 一、CentOS 7 安装Docker

Docker CE 支持 64 位版本 CentOS 7，并且要求内核版本不低于 3.10，内核升级： https://www.jianshu.com/p/fdf6bb6c5b9c

### 1. 卸载旧版本Docker

```bash
$ sudo yum remove docker \
           docker-common \
           docker-selinux \
           docker-engin
```

### 2. 使用yum安装

执行以下命令安装依赖包：

```bash
$ sudo yum install -y yum-utils \
           device-mapper-persistent-data \
           lvm2
```

鉴于国内网络问题，强烈建议使用国内源执行下面的命令添加 yum 软件源：

```bash
$ sudo yum-config-manager \
    --add-repo \
    https://mirrors.ustc.edu.cn/docker-ce/linux/centos/docker-ce.repo
```

### 3. 安装Docker CE
更新yum软件源缓存，并安装docker-ce


```bash
$ sudo yum makecache fast
$ sudo yum install docker-ce

$ systemctl start docker
$ docker --version
```



## 二、 安装 Sentry 其他依赖包

```bash
yum install -y device-mapper-persistent-data lvm2

yum install epel-release

yum install -y python-pip

pip install docker-compose

yum install git

```
## 三、部署sentry
### 1. 拉取镜像

```bash
docker pull sentry       ###目前最新版本9.1.2

docker pull redis

docker pull postgres
```
### 2. 启动服务

```bash
docker run -d --name sentry-redis --restart=always redis   ###保证了，异常自动拉起
docker run -d --name sentry-postgres -e POSTGRES_PASSWORD=secret -e POSTGRES_USER=sentry --restart=always postgres
```
### 3. 生成sentry秘钥
```bash
docker run --rm sentry config generate-secret-key

(om)y06(q=hf--s3(8922*m01n@t@ldcmgucr-!8!nn*kmq(72  ###打印出secret-keys
```

### 4. 数据库及账户初始化及#

注意：过程中需要你创建用户和密码

```bash
During the upgrade, you will be prompted to create the initial user which will act as the superuser.

docker run -it --rm -e SENTRY_SECRET_KEY='(om)y06(q=hf--s3(8922*m01n@t@ldcmgucr-!8!nn*kmq(72' --link sentry-postgres:postgres --link sentry-redis:redis sentry upgrade
```
### 5. 启动sentry的web服务#
The web interface needs to expose port 9000 into the container. This can just be done with –publish 9000:9000:
You should now be able to test the web service by visiting http://localhost:9000/

```bash
docker run -d -p 9000:9000 --name my-sentry -e SENTRY_SECRET_KEY='(om)y06(q=hf--s3(8922*m01n@t@ldcmgucr-!8!nn*kmq(72' --link sentry-redis:redis --link sentry-postgres:postgres --restart=always sentry
```

### 6.启动sentry-cron/work服务#

```bash
docker run -d --name sentry-cron -e SENTRY_SECRET_KEY='(om)y06(q=hf--s3(8922*m01n@t@ldcmgucr-!8!nn*kmq(72' --link sentry-postgres:postgres --link sentry-redis:redis sentry run cron

docker run -d --name sentry-worker-1 -e SENTRY_SECRET_KEY='(om)y06(q=hf--s3(8922*m01n@t@ldcmgucr-!8!nn*kmq(72' --link sentry-postgres:postgres --link sentry-redis:redis sentry run worker
```

### 7. 登录测试效果#
http://ip:9000/ 

注意：认证账户就是初始化的邮箱及密码

