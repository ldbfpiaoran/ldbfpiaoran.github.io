---
id: 15
title: 在centos 上搭建wordpress ！
date: 2017-08-11T13:13:22+00:00
author: bfpiaoran
layout: post
categories:
  - 未分类
---
一、主要内容

1、安装LAMP服务器系统（Linux、Apache、MySQL、PHP ）;

2、安装wordpress；

二、具体步骤

一、LAMP环境设置

1、安装LAMP系统，在centOS上可以使用命令yum install进行安装，-y 表示安装过程中全部选择yes

1 shell命令：yum -y install httpd mysql mysql-server php php-mysql php-gd php-xml  
2、设置httpd、mysqld为开机启动服务

1 shell命令: chkconfig httpd on  
2 　　　　　　 chkconfig mysqld on  
3、启动服务

1 shell命令: service httpd start  
2 　　　　　　service mysqld start  
4、MySQL数据库设置

—-配置mysql：mysql\_secure\_installation

1 主要内容如下  
2 Set root password? [Y/n] //设置root密码（最好自己设置密码，选Y）  
3 anonymous users? [Y/n] //删除匿名用户（选Y）  
4 Disallow root login remotely? [Y/n] //禁止root用户远程登录（选n）  
5 Remove test database and access to it? [Y/n] //删除默认的 test 数据库（选Y）  
6 Reload privilege tables now? [Y/n] //是否马上应用最新的设置（选Y）  
—-登陆MySQL数据库mysql –u root –p （一开始密码为空，直接按回车键即可）

mysql> create database wordpress; //创建wordpress数据库，为下面安装wordpress做准  
二、安装wordpress

1、下载安装

1 wget http://cn.wordpress.org/wordpress-4.5.3-zh_CN.zip //下载  
3 unzip /wordpress-4.5.3-zh_CN.zip //解压  
5 cp -R wordpress/* /var/www/html/ //将wordprss下所有的文件复制到apache服务器下的根目录  
2、配置wordpress的配置文件

cd /var/www/html/ //进入wordpress文件夹下  
cp wp-config-sample.php wp-config.php //复制配置文件  
vim wp-config.php //编辑wordpress的配置文件  
然后输入数据库名称，例如我上面创建的数据库wordpress，然后是数据库的用户名和密码，“MySQL主机”一般默认为localhost，不需要修改

三、安装完成

最后在浏览器中输入ip地址，即可看见如下图，然后按照提示，就成功设置了一个自己的博客系统