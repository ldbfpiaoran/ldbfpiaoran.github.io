---
id: 239
title: linux修改open files数
date: 2018-08-27T11:23:52+00:00
author: bfpiaoran
layout: post
categories:
  - 未分类
---
ulimit -a 查看open  files数

&nbsp;

core file size (blocks, -c) 0  
data seg size (kbytes, -d) unlimited  
scheduling priority (-e) 0  
file size (blocks, -f) unlimited  
pending signals (-i) 31403  
max locked memory (kbytes, -l) 64  
max memory size (kbytes, -m) unlimited  
open files (-n) 65535  
pipe size (512 bytes, -p) 8  
POSIX message queues (bytes, -q) 819200  
real-time priority (-r) 0  
stack size (kbytes, -s) 10240  
cpu time (seconds, -t) unlimited  
max user processes (-u) 31403  
virtual memory (kbytes, -v) unlimited  
file locks (-x) unlimited

&nbsp;

**修改：**  
1.修改file-max

<pre class="wp-code-highlight prettyprint prettyprinted"><span class="com"># echo  6553560 &gt; /proc/sys/fs/file-max  //sysctl -w "fs.file-max=34166"，前面2种重启机器后会恢复为默认值<span class="pln">
<span class="pun">或
# vim /etc/sysctl.conf, 加入以下内容，重启生效
fs.file-max = <span class="lit">6553560</span></span></span></span></pre>

2.修改ulimit的open file，系统默认的ulimit对文件打开数量的限制是1024

<pre class="wp-code-highlight prettyprint prettyprinted"><span class="com"># ulimit -HSn 102400  //这只是在当前终端有效，退出之后，open files又变为默认值。当然也可以写到/etc/profile中，因为每次登录终端时，都会自动执行/etc/profile<span class="pln">
<span class="pun">或
# vim /etc/security/limits.conf  //加入以下配置，重启即可生效
* soft nofile <span class="lit">65535 
* hard nofile 65535</span></span></span></span></pre>