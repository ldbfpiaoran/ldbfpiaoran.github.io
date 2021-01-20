---
id: 393
title: python ssrf到命令执行
date: 2021-01-20 T15:36:17+00:00
author: bfpiaoran
layout: post
tags:
    - security
---

说命令执行其实有点牵强 后续没做了  最近公司有个新业务 之前另外一个同事负责的 最近交给我了  突然发现还有个后台就看了下，
发现是用django写的  估计没啥越权了 但是看到了个组件 DjangoUeditor  一查发现15年就停止更新了 还有个任意文件上传，看了下代码 还有任意文件读取 ssrf...  

![](/img/ssrf/1.png)
这玩意随便一看就没有鉴权 挑着catchimage 看下 一看命名就是危险方法  
![](/img/ssrf/2.png)
这里看到取得source[]参数 然后请求参数的地址获取之后保存，还判断了后缀名/ueditor/controller/?action=config允许的后缀在这里看就行了，但是这后缀不觉得太草率了么  
payload  
```yaml
file:///etc/passwd#1.jpg
```  
直接就饶过了。。。  
![](/img/ssrf/3.png)  
![](/img/ssrf/4.png)  
这里有个问题 我们公司伟大的程序员修改了保存目录 直接保存到tmp里了 我么获取不到返回值 成了无回显ssrf 于是搜了搜  
看了下P牛的文章[从SSRF到命令执行惨案](https://www.leavesongs.com/PENETRATION/getshell-via-ssrf-and-redis.html#reply)  

发现python3.7还有问题。。。  是没修复么？  
![](/img/ssrf/6.png)  
![](/img/ssrf/5.png)   