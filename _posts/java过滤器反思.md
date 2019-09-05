---
id: 387
title: java过滤器反思
date: 2019-07-29T16:40:17+00:00
author: bfpiaoran
layout: post
categories:
  - 未分类
---
    之前研究路径引发的安全问题其实依赖于tomcat+nginx特性导致  近些天又发现一个安全隐患 在过滤器中有使用startswitch作为过滤使用的，但是有些需求是需要访问本地的js、jpg、png等静态资源的，为了满足需求同时又要做权限控制，于是开发们想了另外一个奇葩的方法，根据后缀判断是否对路径进行访问控制的限制。
    于是有了开发在filter中加了如下的骚操作

    ```
             if (requestURI.endsWith(staticurl)) {
                chain.doFilter(request, response);
                return;
            }

    ```

    看似没什么问题  但是如果构造一个url 是以js结尾的又不破坏原有的url 就绕过了，在思考这个问题时突然想到了在访问的时候一些java应用是不会解析;后面的内容的
    ```
    于是乎便想到了一个绕过方法

    www.test.com/api/apilist.json;a.js
    ```
    于是乎绕过了访问控制
    
