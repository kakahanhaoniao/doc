## macos 安装docker，并运行nodejs

### 1. 安装docker

``` sh
	brew cask install docker
```

### 2. 测试docker安装成功

启动docker，一直next，docker图标启动，在命令行中测试

``` sh 
	docker run -d -p 80:80 --name webserver nginx
```

上述命令执行之后，打开localhost,出现nginx的欢迎页面


### 3. 运行node服务

``` sh
	npm init
	npm i --save express
	vi index.js
	vi dockerfile
```


在index.js文件中添加一下内容

``` js
	var express = require('express');
	var PORT = 8888;
	var app = express();
	app.get('/', function (req, res) {
	    res.send('Hello world');
	});
	app.listen(PORT);
	console.log('Running on http://localhost:' + PORT);
```


在dockerfile中添加如下内容

``` sh
	FROM node
	EXPOSE 8888
	WORKDIR /app
	# 安装npm模块
	ADD . /app/
	# 使用淘宝的npm镜像
	RUN npm install --production -d --registry=https://registry.npm.taobao.org
	# 运行app.js
	CMD ["node", "/app/service.js"]
```


### 4. 创建docker镜像

``` sh
	docker build -t my-nodejs-app .
```

### 5. 通过创建的my-nodejs-app镜像生成容器

``` sh
	docker run -idt --rm --name my-running-app  -p 8080:8888 my-nodejs-app
```

该种方式生成的镜像是拷贝本地项目到镜像中，如果项目发生变化，均需要重新build镜像


### 6.运行单个js文件

``` sh
	docker run -it --rm --name my-running-script -v "$PWD":/root/docker/ -w /root/docker -p 8081:8888 node node service.js
```




