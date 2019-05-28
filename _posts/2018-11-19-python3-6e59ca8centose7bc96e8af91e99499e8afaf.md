---
id: 301
title: python3.6在centos编译错误
date: 2018-11-19T13:47:49+00:00
author: bfpiaoran
layout: post
guid: http://www.cuijianxiong.top/?p=301
permalink: /?p=301
categories:
  - 未分类
---
gcc -pthread -Xlinker -export-dynamic -o python Programs/python.o libpython3.6m.a -lpthread -ldl -lutil -lrt -lm  
./python -E -S -m sysconfig &#8211;generate-posix-vars ;\  
if test $? -ne 0 ; then \  
echo &#8220;generate-posix-vars failed&#8221; ; \  
rm -f ./pybuilddir.txt ; \  
exit 1 ; \  
fi  
Fatal Python error: Py_Initialize: Unable to get the locale encoding  
LookupError: unknown encoding: GB2312

Current thread 0x00007fd09a00f700 (most recent call first):  
/bin/sh: line 5: 15089 ????? ./python -E -S -m sysconfig &#8211;generate-posix-vars  
generate-posix-vars failed  
make: \*** [pybuilddir.txt] ?? 1

&nbsp;

改下字符集

全要改！！！！

export LANGUAGE=en_US.UTF-8

export LANG=en_US.UTF-8

export LC\_ALL=en\_US.UTF-8

蛋疼 google了一圈只说改两个23333