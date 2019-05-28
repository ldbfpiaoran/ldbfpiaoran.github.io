---
id: 37
title: 一个基于百度地图定位ip位置
date: 2017-08-12T11:38:17+00:00
author: bfpiaoran
layout: post
categories:
  - 未分类
---
这里需要调用百度的一个接口

http://lbsyun.baidu.com/index.php?title=webapi/high-acc-ip  
<img src="http://www.cuijianxiong.top/wp-content/uploads/2017/08/3-300x161.jpg" alt="" width="300" height="161" class="alignnone size-medium wp-image-38" srcset="http://www.cuijianxiong.top/wp-content/uploads/2017/08/3-300x161.jpg 300w, http://www.cuijianxiong.top/wp-content/uploads/2017/08/3-230x123.jpg 230w, http://www.cuijianxiong.top/wp-content/uploads/2017/08/3-350x188.jpg 350w, http://www.cuijianxiong.top/wp-content/uploads/2017/08/3-480x257.jpg 480w, http://www.cuijianxiong.top/wp-content/uploads/2017/08/3.jpg 690w" sizes="(max-width: 300px) 85vw, 300px" />  
http://api.map.baidu.com/highacciploc/v1?qcip=183.55.116.90&qterm=pc&ak=“你的 密钥（AK）”&coord=bd09ll&extensions=3

结果为json格式数据、

freebuf已经给了 基于Python2.7写的脚本

无奈 自己不会2.7 只能python写了一个小脚本与 freebuf给的略有不同

<pre line="1">#ip查询位置查询
import urllib.request
import json
import time
 
def get_ip(ip):
 
#ip = '222.33.63.163'
    ip_addrs = 'http://api.map.baidu.com/highacciploc/v1?qcip='+ip+'&qterm=pc&ak=SNjRPTGuQEyMK41FguGgxPFGGNmDkyQG&coord=bd09ll&extensions=3'
#print(ip_addrs)
 
    req = urllib.request.Request(ip_addrs)
    req.add_header = ('User-Agent','Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 UBrowser/5.7.16173.12 Safari/537.36')
    html = urllib.request.urlopen(req)
    html = html.read().decode('utf-8')
    data_dict = json.loads(html)
    try:
        content = data_dict['content']
        city = content['formatted_address']
        print('地理位置为：'+city)
    except:
        print('未找到该ip')
 
def loop():
    ex = 1
    while ex == 1:
        ip = input('请输入ip地址(退出请输入q)： ')
        ip = str(ip)
        if ip == 'q':
            ex = 2
            print('正在退出请稍等3秒')
        else:
            get_ip(ip)
        time.sleep(3)
 
 
 
if __name__ == '__main__':
    loop()
</pre>

做了些小优化  
但是百度地图有些数据还是获取不到 有机会还是试一试shodan的接口吧