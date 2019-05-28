---
id: 313
title: 利用frida hook安卓 SSL Pinning
date: 2018-11-23T17:18:42+00:00
author: bfpiaoran
layout: post
categories:
  - 未分类
---
最近  用xp框架发现不是那么好用 有些包还是抓不到 请教了下公司二进制的大佬

成功用frida绕过SSL Pinning   抓取https流量

首先需要在手机装  frida-server

https://github.com/frida/frida/releases

安卓手机是小米6

https://github.com/frida/frida/releases/download/12.2.25/frida-server-12.2.25-android-arm64.xz

如果模拟器用x86

然后  adb push进去 以root权限启动

<img class="alignnone size-full wp-image-314" src="http://www.cuijianxiong.top/wp-content/uploads/2018/11/111-3.png" alt="" width="680" height="231" srcset="http://www.cuijianxiong.top/wp-content/uploads/2018/11/111-3.png 680w, http://www.cuijianxiong.top/wp-content/uploads/2018/11/111-3-300x102.png 300w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" /> 

&nbsp;

pc端需要装 frida库以及 frida-tools以后应该会用到

写个python脚本抓取 当前应用名

<pre class="pure-highlightjs"><code class="">import frida
rdev = frida.get_usb_device()
front_app = rdev.get_frontmost_application()
print(front_app)</code></pre>

<img class="alignnone size-full wp-image-315" src="http://www.cuijianxiong.top/wp-content/uploads/2018/11/111-4.png" alt="" width="686" height="91" srcset="http://www.cuijianxiong.top/wp-content/uploads/2018/11/111-4.png 686w, http://www.cuijianxiong.top/wp-content/uploads/2018/11/111-4-300x40.png 300w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" /> 

然后用 用绕过SSL Pinning 的脚本 这里面有两个 最新的很简单 但是不知道怎么回事我的手机总是有问题会莫名的卡是 我还是用旧的吧

<pre class="pure-highlightjs"><code class="">Java.perform(function() {                

    var array_list = Java.use("java.util.ArrayList");
    var ApiClient = Java.use('com.android.org.conscrypt.TrustManagerImpl');

    ApiClient.checkTrustedRecursive.implementation = function(a1,a2,a3,a4,a5,a6) {
            // console.log('Bypassing SSL Pinning');
            var k = array_list.$new(); 
            return k;
    }

},0);</code></pre>

旧的代码如下

<pre class="pure-highlightjs"><code class="">/* 
   Android SSL Re-pinning frida script v0.2 030417-pier 

   $ adb push burpca-cert-der.crt /data/local/tmp/cert-der.crt
   $ frida -U -f it.app.mobile -l frida-android-repinning.js --no-pause

   &lt;blockquote class="wp-embedded-content" data-secret="gFW10hD5oN">&lt;a href="https://techblog.mediaservice.net/2017/07/universal-android-ssl-pinning-bypass-with-frida/">Universal Android SSL Pinning bypass with Frida&lt;/a>&lt;/blockquote>
*/

setTimeout(function(){
    Java.perform(function (){
    	console.log("");
	    console.log("[.] Cert Pinning Bypass/Re-Pinning");

	    var CertificateFactory = Java.use("java.security.cert.CertificateFactory");
	    var FileInputStream = Java.use("java.io.FileInputStream");
	    var BufferedInputStream = Java.use("java.io.BufferedInputStream");
	    var X509Certificate = Java.use("java.security.cert.X509Certificate");
	    var KeyStore = Java.use("java.security.KeyStore");
	    var TrustManagerFactory = Java.use("javax.net.ssl.TrustManagerFactory");
	    var SSLContext = Java.use("javax.net.ssl.SSLContext");

	    // Load CAs from an InputStream
	    console.log("[+] Loading our CA...")
	    cf = CertificateFactory.getInstance("X.509");
	    
	    try {
	    	var fileInputStream = FileInputStream.$new("/data/local/tmp/cert-der.crt");
	    }
	    catch(err) {
	    	console.log("[o] " + err);
	    }
	    
	    var bufferedInputStream = BufferedInputStream.$new(fileInputStream);
	  	var ca = cf.generateCertificate(bufferedInputStream);
	    bufferedInputStream.close();

		var certInfo = Java.cast(ca, X509Certificate);
	    console.log("[o] Our CA Info: " + certInfo.getSubjectDN());

	    // Create a KeyStore containing our trusted CAs
	    console.log("[+] Creating a KeyStore for our CA...");
	    var keyStoreType = KeyStore.getDefaultType();
	    var keyStore = KeyStore.getInstance(keyStoreType);
	    keyStore.load(null, null);
	    keyStore.setCertificateEntry("ca", ca);
	    
	    // Create a TrustManager that trusts the CAs in our KeyStore
	    console.log("[+] Creating a TrustManager that trusts the CA in our KeyStore...");
	    var tmfAlgorithm = TrustManagerFactory.getDefaultAlgorithm();
	    var tmf = TrustManagerFactory.getInstance(tmfAlgorithm);
	    tmf.init(keyStore);
	    console.log("[+] Our TrustManager is ready...");

	    console.log("[+] Hijacking SSLContext methods now...")
	    console.log("[-] Waiting for the app to invoke SSLContext.init()...")

	   	SSLContext.init.overload("[Ljavax.net.ssl.KeyManager;", "[Ljavax.net.ssl.TrustManager;", "java.security.SecureRandom").implementation = function(a,b,c) {
	   		console.log("[o] App invoked javax.net.ssl.SSLContext.init...");
	   		SSLContext.init.overload("[Ljavax.net.ssl.KeyManager;", "[Ljavax.net.ssl.TrustManager;", "java.security.SecureRandom").call(this, a, tmf.getTrustManagers(), c);
	   		console.log("[+] SSLContext initialized with our custom TrustManager!");
	   	}
    });
},0);</code></pre>

frida -U -n com.wanmei.xxx -l universal-ssl-check-bypass.js &#8211;no-pause

hook对应的应用名即可

<img class="alignnone size-full wp-image-316" src="http://www.cuijianxiong.top/wp-content/uploads/2018/11/222.png" alt="" width="789" height="297" srcset="http://www.cuijianxiong.top/wp-content/uploads/2018/11/222.png 789w, http://www.cuijianxiong.top/wp-content/uploads/2018/11/222-300x113.png 300w, http://www.cuijianxiong.top/wp-content/uploads/2018/11/222-768x289.png 768w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" /> 

&nbsp;

落了两条

要进行端口转发

adb forward tcp:27042 tcp:27042

adb forward tcp:27043 tcp:27043