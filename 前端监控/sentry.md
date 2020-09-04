
## CentOS 7. × 系统及内核升级指南
https://www.jianshu.com/p/fdf6bb6c5b9c


## centos7安装docker

https://juejin.im/post/6844903988299563022


## 基于sentry的前端错误监控日志系统(部署sentry服务器/前端项目部署)-让前端最快的定位到生产问题

https://blog.csdn.net/kwame211/article/details/104626762/?utm_medium=distribute.wap_relevant.none-task-blog-title-4

## Docker 部署 Sentry

https://juejin.im/post/6847902219015356423


# Centos7安装Python3.7详细教程
https://blog.csdn.net/xuezhangjun0121/article/details/103903984


# my

(om)y06(q=hf--s3(8922*m01n@t@ldcmgucr-!8!nn*kmq(72


docker run -it --rm -e SENTRY_SECRET_KEY='(om)y06(q=hf--s3(8922*m01n@t@ldcmgucr-!8!nn*kmq(72' --link sentry-postgres:postgres --link sentry-redis:redis sentry upgrade


docker run -d -p 9000:9000 --name my-sentry -e SENTRY_SECRET_KEY='(om)y06(q=hf--s3(8922*m01n@t@ldcmgucr-!8!nn*kmq(72' --link sentry-redis:redis --link sentry-postgres:postgres --restart=always sentry

docker run -d --name sentry-cron -e SENTRY_SECRET_KEY='(om)y06(q=hf--s3(8922*m01n@t@ldcmgucr-!8!nn*kmq(72' --link sentry-postgres:postgres --link sentry-redis:redis sentry run cron

docker run -d --name sentry-worker-1 -e SENTRY_SECRET_KEY='(om)y06(q=hf--s3(8922*m01n@t@ldcmgucr-!8!nn*kmq(72' --link sentry-postgres:postgres --link sentry-redis:redis sentry run worker


## 参考文章：https://www.cnblogs.com/xiaochina/p/12585453.html




## 主动上报
https://www.cnblogs.com/chris-oil/p/11512923.html （推荐）

https://zhuanlan.zhihu.com/p/51446011




https://www.jianshu.com/p/cea2d22fbb32