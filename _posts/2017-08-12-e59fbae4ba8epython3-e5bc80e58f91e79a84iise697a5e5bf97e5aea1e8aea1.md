---
id: 59
title: 基于Python3 开发的iis日志审计
date: 2017-08-12T11:48:18+00:00
author: bfpiaoran
layout: post
guid: http://www.cuijianxiong.top/?p=59
permalink: /?p=59
categories:
  - 未分类
---
源码如下  
缺陷 :正则不全 无多线程

<pre line="1">import re
 
 
 
 
 
f = open('u_ex161115.log','r',encoding= 'utf-8')
 
ipcount = []
ipaddrs = []    # ipaddrs ip : 地址
#print(type(f))
for line in f.readlines():
    if line[0]  != '#':
        answer = re.split(' ',line)
    #print(answer)
        ipcount.append(answer[10])
        ipadd = answer[6]
        if ipadd != '/':
            ipaddrs.append(answer[10]+' '+':'+' '+answer[6])
 
 
 
def xss(ipaddrs):                     #分析函数
    xsslist = ['\.\./', 'select.+(from|limit)', '(?:(union(.*?)select))', 'having|rongjitest', 'sleep\((\s*)(\d*)(\s*)\)',
 
            'benchmark\((.*)\,(.*)\)', 'base64_decode\(', '(?:from\W+information_schema\W)',
 
            '(?:(?:current_)user|database|schema|connection_id)\s*\(', '(?:etc\/\W*passwd)',
 
            'into(\s+)+(?:dump|out)file\s*', 'group\s+by.+\(', 'xwork.MethodAccessor',
 
            '(?:define|eval|file_get_contents|include|require|require_once|shell_exec|phpinfo|system|passthru|preg_\w+|execute|echo|print|print_r|var_dump|(fp)open|alert|showmodaldialog)\(',
 
            'xwork\.MethodAccessor', '(gopher|doc|php|glob|file|phar|zlib|ftp|ldap|dict|ogg|data)\:\/',
 
            'java\.lang', '\$_(GET|post|cookie|files|session|env|phplib|GLOBALS|SERVER)\[',
 
            '\&lt;(iframe|script|body|img|layer|div|meta|style|base|object|input)', '(onmouseover|onerror|onload)\=',
 
            '.(bak|inc|old|mdb|sql|backup|java|class)$', '\.(svn|htaccess|bash_history)',
 
            '(vhost|bbs|host|wwwroot|www|site|root|hytop|flashfxp).*\.rar',
 
            '(phpmyadmin|jmx-console|jmxinvokerservlet)', 'java\.lang',
 
            '/(attachments|upimg|images|css|uploadfiles|html|uploads|templets|static|template|data|inc|forumdata|upload|includes|cache|avatar)/(\\w+).(php|jsp)']
    xssaddrs = []
    print('开始分析xss攻击')
    for i in xsslist:
        for f in ipaddrs:
            p = re.compile(i,re.I)
            f = re.split(' ',f)
            response = p.findall(f[2])
            if response != []:
                    xssaddrs.append(f)
    attack = []
    for i in xssaddrs:
        if i not in attack:
            attack.append(i)
    print('共计受到'+str(len(attack))+ '条攻击')
    if attack != []:
        b = open('xss.txt', 'w')
        for ip in attack:
            b.write(str(ip)+'\n')
        b.close()
    return attack
a=xss(ipaddrs)
ipcount = []
answer = input('是否统计攻击ip数(y/n):')
if answer == 'y':
    for i in a:
        i = i[0]
        if i not in ipcount:
            ipcount.append(i)
    print(ipcount)
    print('共有'+str(len(ipcount))+'个ip发动攻击')
</pre>