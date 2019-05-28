---
id: 320
title: '使用frida  hook重载函数'
date: 2018-11-28T19:14:16+00:00
author: bfpiaoran
layout: post
categories:
  - 未分类
---
<div>
  <p>
    apply arguments
  </p>
  
  <pre class="hljs javascript"><code class="javascript">MyClass.MyFunc.overload(&lt;span class="hljs-string">"java.util.List"&lt;/span>).implementation = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span>() &lt;/span>{
    &lt;span class="hljs-keyword">this&lt;/span>.MyFunc.overload(&lt;span class="hljs-string">"java.util.List"&lt;/span>).apply(&lt;span class="hljs-keyword">this&lt;/span>, &lt;span class="hljs-built_in">arguments&lt;/span>);
}
</code></pre>
  
  <p>
    argments下标
  </p>
  
  <pre class="hljs javascript"><code class="javascript">MyClass.MyFunc.overload(&lt;span class="hljs-string">"java.util.List"&lt;/span>).implementation = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> () &lt;/span>{
    &lt;span class="hljs-keyword">this&lt;/span>.MyFunc(&lt;span class="hljs-built_in">arguments&lt;/span>[&lt;span class="hljs-number">0&lt;/span>]);
};
</code></pre>
  
  <p>
    用具体的
  </p>
  
  <pre class="hljs javascript"><code class="javascript">MyClass.MyFuncs.overload(&lt;span class="hljs-string">"int"&lt;/span>, &lt;span class="hljs-string">"int"&lt;/span>).implementation = &lt;span class="hljs-function">&lt;span class="hljs-keyword">function&lt;/span> (&lt;span class="hljs-params">s1, s2&lt;/span>) &lt;/span>{
    &lt;span class="hljs-keyword">var&lt;/span> ret = &lt;span class="hljs-keyword">this&lt;/span>.MyFuncs(s1, s2);
}
</code></pre>
  
  <p>
    字符串数组
  </p>
  
  <pre class="hljs bash"><code class="bash">hook.hookMeArray.overload(&lt;span class="hljs-string">"[Ljava.lang.String;"&lt;/span>).implementation = {}
</code></pre>
  
  <p>
    用call
  </p>
  
  <pre class="hljs javascript"><code class="javascript">&lt;span class="hljs-keyword">var&lt;/span> Handler = classFactory.use(&lt;span class="hljs-string">"android.os.Handler"&lt;/span>);
&lt;span class="hljs-keyword">var&lt;/span> Looper = classFactory.use(&lt;span class="hljs-string">"android.os.Looper"&lt;/span>);

&lt;span class="hljs-keyword">var&lt;/span> looper = Looper.getMainLooper();
&lt;span class="hljs-keyword">var&lt;/span> handler = Handler.$&lt;span class="hljs-keyword">new&lt;/span>.overload(&lt;span class="hljs-string">"android.os.Looper"&lt;/span>).call(Handler, looper);



MyClass.MyFunc.overload(&lt;span class="hljs-string">"java.lang.String;"&lt;/span>).implementation = {
     &lt;span class="hljs-keyword">this&lt;/span>.MyFunc.overload(&lt;span class="hljs-string">"java.lang.String"&lt;/span>).call(&lt;span class="hljs-keyword">this&lt;/span>, args[&lt;span class="hljs-number">1&lt;/span>])
     MyClass.MyFunc.overload(&lt;span class="hljs-string">"java.lang.String"&lt;/span>).call()
}
</code></pre>
</div>

最近正好练习分析app

分析娘家人的一个app

发现登陆处是加密的  于是尝试解密

无混淆无壳

<img class="alignnone size-full wp-image-323" src="http://www.cuijianxiong.top/wp-content/uploads/2018/11/111-5.png" alt="" width="965" height="262" srcset="http://www.cuijianxiong.top/wp-content/uploads/2018/11/111-5.png 965w, http://www.cuijianxiong.top/wp-content/uploads/2018/11/111-5-300x81.png 300w, http://www.cuijianxiong.top/wp-content/uploads/2018/11/111-5-768x209.png 768w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 1362px) 62vw, 840px" /> 

&nbsp;

java太渣了 没定位到传入参数

于是想hook下login

<pre class="pure-highlightjs"><code class="">Java.perform(function() {                

    var test1 = Java.use("com.wanmei.tiger.module.person.net.AccountLikeDownloader");
    var ApiClient = Java.use('com.android.org.conscrypt.TrustManagerImpl');
	var orglogin = test1.login.overload("java.lang.String","java.lang.String");
	
	test1.login.implementation = function(arg1,arg2){
		console.log(arg1);
		console.log(arg2);
		orglogin.call(arg1,arg2);
	}
},0);</code></pre>

使用frida  hook下 成功截获信息 没想到加密只是最普通的加密2333

<img class="alignnone size-full wp-image-325" src="http://www.cuijianxiong.top/wp-content/uploads/2018/11/111-7.png" alt="" width="823" height="147" srcset="http://www.cuijianxiong.top/wp-content/uploads/2018/11/111-7.png 823w, http://www.cuijianxiong.top/wp-content/uploads/2018/11/111-7-300x54.png 300w, http://www.cuijianxiong.top/wp-content/uploads/2018/11/111-7-768x137.png 768w" sizes="(max-width: 709px) 85vw, (max-width: 909px) 67vw, (max-width: 984px) 61vw, (max-width: 1362px) 45vw, 600px" />