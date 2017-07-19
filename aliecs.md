## 环境介绍
本地： Mac OSX 10.11.4，应用采用的技术：Node.js + Express.js
远端服务器：阿里云ECS（1核CPU、2GB内存），系统为CentOS7.2 64位
## 1. 运行ecs

## 2. 创建数据盘

## 3. 更新yum

``` sh
# 更新
yum update -y
# 查看yum已经安装的包
yum list installed
# yum 查看可用安装包
yum info $PACKAGE
```


## 4. 安装nodejs && npm

``` sh
yum install nodejs -y
```

## 5. 安装nvm
``` sh
    # 安装nvm
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash
```
``` sh
#由于是nvm管理node，所以新创建的用户的node版本不能保持与root用户版本相同，保持相同需执行
source /root/.nvm/nvm.sh
```
使用方式：
``` sh
# nvm 查看可用node版本
nvm ls-remote
# nvm 安装node版本
nvm install $version
# nvm 使用某个版本
nvm use  $version
# nvm 查看当前系统安装所有版本
nvm ls
# nvm 设置默认使用版本
nvm alias default $version

```

## 6. 安装mongodb

``` sh
# 安装mongo
yum -y install mongodb-server  mongodb
# 启动mongo服务
service mongod start
```

## 7. 安装nginx

``` sh
# 安装nginx
yum install nginx -y
# 启动nginx
service nginx start
# 重启
service reload nginx
service restart nginx
```

查看当前网络端口号启用状态
``` sh
netstat -antp
# 通过上述命令可以看到某个端口号进程id,如需杀掉请用下面命令
kill -9 $PID
```

配置静态服务器，nginx 安装路径 /etc/nginx/nginx.conf
具体如何配置server和如何代理nodejs网上很多相关文档

## 8. 分配用户 ssh免登陆
``` sh
# 添加普通用户
useradd $USER
# 添加root用户(group也为root)
useradd -o -u 0 -g 0 $USER
# 设置密码
passwd $USER
# 添加sudo权限
usermod -aG wheel $USER
# 查看某个用户的角色和权限
id $user
```
1）设置用户访问权限
``` sh
vi /etc/sudoers
```
修改文件内容：
```
## Allow root to run any commands anywhere
root    ALL=(ALL)       ALL
# 添加如下内容，设置要root运行的用户
$user     ALL=(ALL)       ALL
```

2) 本地生成公钥和私钥,并将密钥导入到服务器，加入到授权访问认证文件
``` sh
# 生成密钥
# id_rsa: 私钥
# id_rsa.pub:公钥
ssh-keygen -t rsa
# 密钥导入到目标主机（服务器）
scp ~/.ssh/id_rsa.pub $user@目标主机ip或主机名:/root/.ssh/id_rsa.pub
# 登录目标服务器
ssh $user@目标主机ip或主机名
# 把公钥导入到认证文件
cat /root/.ssh/id_rsa.pub >> /root/.ssh/authorized_keys
# 删除公钥
rm -rf /root/.ssh/id_rsa.pub
# 更改相关文件的权限
chmod 700 /root/.ssh
chmod 600 /root/.ssh/authorized_keys
```

3) 服务器端关闭root用户的ssh访问，并设置ssh访问授权免密登录authorized_keys
``` sh
vi /etc/ssh/sshd_config
```
修改文件内容：
1.PermitRootLogin yes => PermitRootLogin no
2.AuthorizedKeysFile  .ssh/authorized_keys => AuthorizedKeysFile /root/.ssh/authorized_keys

4) 重启ssh服务（设置用户免密登录权限生效）
在云服务器 ECS Linux CentOS 7 下重启服务不再通过 service  操作，而是通过 systemctl 操作。 操作说明如下：
``` sh
# 如果没有启动，则需要启动该服务：
systemctl start sshd.service
# 重启 sshd 服务：
systemctl restart sshd.service
# 设置服务开启自启：
systemctl enable sshd.service
# 查看 sshd 服务是否启动
status sshd.service
```

5）测试访问
``` sh
# 不在需要输入密码即免密登录成功
ssh $user@目标主机ip或主机名
```

## 9. 安装pm2 半自动化部署
安装pm2
``` sh
npm install -g pm2 --registry=https://registry.npm.taobao.org
```
具体部署操作步骤请见链接https://zhuanlan.zhihu.com/p/20940096

补充部分：
1.pm2设置deploy部分中，虽然设置了git目录，但是deploy的时候并没有对分支进行pull操作,如需pull分支保持代码最新，故需要添加 **'pre-deploy': 'git pull' ** 属性设置

``` js
    ...
    deploy: {
        ...
        production: {
            user: 'xiaoshao',
            host: 'XXXXXX',
            ref: 'origin/master',
            repo: 'git@github.com:repo.git',
            path: '/root',
            'pre-deploy': 'git pull',
            'post-deploy': xxxxxxxxxxx
        }
        ...
    }
```
2. 部署命令
``` sh
# 该命令会每次部署生成source文件件，如source文件夹存在会报错，将git pull的代码下载到该文件夹，导致代码会存在两份
pm2 deploy ecosystem.config.js production setup
# 该命令会依赖source文件夹，但是git代码并没有生成到该文件夹，同时path目录下的文件夹是最新文件（故推荐该方法部署）
pm2 deploy ecosystem.config.js production
```

3. 关注点
此时主要是在远程服务器中，并未将http://github.com加入known_hosts，在服务器端通过如下命令设置：
``` sh
ssh-keyscan -t rsa github.com >> /root/.ssh/known_hosts
```
