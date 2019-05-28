---
id: 40
title: docker 容器下 gourdscanV2
date: 2017-08-12T11:38:57+00:00
author: bfpiaoran
layout: post
categories:
  - 未分类
---
0x01 下载安装 Docker  
https://github.com/docker/toolbo … rToolbox-1.12.2.exe  
GourdScanV2 docker镜像  
https://pan.baidu.com/s/1jINkSdS

安装步骤同样略过.安装完成后桌面会产生了四个图标，首次打开或关闭虚拟机后.Docker Quickstart Terminal如下图.

docker打开虚拟机设置完成后出现命令栏.

0x02 获取当前docker默认路径,然后到跳转到下载好的GourdScanV2镜像目录.

$ pwd  
$ cd C:/Users/Administrator/Desktop/vbox  
$ ls

导入镜像文件,查看导入镜像状态.

$ cat gourdscan.tar | docker import – gourdscan:v2.0

$ docker images

0x03 运行GourdScanV2

$ docker run -d –name gourdscan -p 10022:22 -p 10086:10086 -p 10080:80 gourdscan:v2.0 /usr/sbin/sshd -D

获取GourdScanV2 root

$ docker exec -it gourdscan bash

多开五个Docker Quickstart Terminal窗口获取root后执行命令:

运行图详细如下:

0x04 运行完了这里之后你已经拥有GourdScanV2神器~.  
访问http://127.0.0.1:10080/ 证明一下.

0x05 浏览器http代理  
设置为127.0.0.1:10086就可以使用被动扫描.

0x06 如访问不了vbox需要设置转发端口

0x07 一键运行GourdScanV2  
这样运行太麻烦了.作为懒人的我.一键运行适合我多点.如果你像我一样就直接忽略以上几个步骤,下载一键运行脚本.  
只需要做的0x01,0x02两个步骤即可,五个窗口打开后可关闭,是可以后台运行的.只支持X64运行.其他的自行测试与修改,只是写好一个列子.

证书生成问题,留给其他人解决.

附一些docker 常用命令笔记说明:  
docker run －t －i 用镜像创建一个容器  
docker pull image 拉拽镜像  
docker images 查看可用镜像  
docker ps 查看运行的容器  
docker ps -a 查看所有的容器  
docker stop 停止该容器  
docker start 开始该容器  
docker attach 与该容器交互  
docker commit 创建当前运行镜像的新的镜像(包含改变)  
docker rm 删除容器  
docker rmi 删除镜像  
docker cp :/file/path/within/container /host/path/target 从Docker容器内拷贝文件到主机上  
sudo docker save -o ubuntu_14.04.tar ubuntu:14.04 导出镜像文件  
sudo docker load –input ubuntu_14.04.tar 导入镜像文件  
docker exec -it /bin/sh 与容器交互  
docker inspect 容器信息  
docker build -t apache-php2 . Dockerfile创建镜像  
docker tag username/name:devel 修改镜像的标签  
docker cp :/file/path/within/container /host/path/target 从容器内拷贝文件到主机上