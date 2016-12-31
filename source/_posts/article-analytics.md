---
title: vno主题优化(三）添加博客统计
date: 2016-06-14 18:31:47
tags: 敲敲码
---
 如果你想对网站访问做个分析，想统计下博客每篇文章的访问人数(如右上角），可能这篇文章能帮到你。
>网站统计

对于网站统计，[谷歌分析](https://www.google.com/intl/zh-CN/analytics/) 无疑最佳,各种酷炫功能等你去发现。
使用步骤：
1.注册一个google analytics的账户，创建一个跟踪网站，获取到跟踪ID,如下示例：
![](//cdn.monniya.com/2016/article-analytics-google.jpeg)
2.因为之前加了<code>themes/new-vno/layout/_partial/google_analytics.ejs </code>文件，所以直接填到主题的配置文件<code>_config.yml</code>中即可,如下：
```
google_analytics: UA-78918255-1
```

对于不能翻墙的同学，也给你准备了[百度统计](//tongji.baidu.com/)，功能类似，配置也类似，这个是为了主题配置方便写的，其实直接把这段代码贴到头部，尾部文件都可以
1.注册百度统计的账户，添加网站，获取代码，找到其中的识别码（一串字符）
![](//cdn.monniya.com/2016/article-analytics-baidu.jpeg)

不想创建文件的可以直接更新github上的[主题](https://github.com/monniya/hexo-theme-new-vno)，可以下面的跳过2，3步骤
2.新建文件，放置位置：<code>themes/new-vno/layout/_partial/baidu_tongji.ejs</code>

添加统计脚本：
```
<% if (theme.baidu_tongji) { %>
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?<%= theme.baidu_tongji %>";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
<% } %>
```
3.在<code>themes/new-vno/layout/layout.ejs</code>文件加入引用：

```
<%- partial('_partial/baidu_tongji') %>
```

4.把识别码填到配置文件<code>_config.yml</code>中即可：
```
baidu_tongji: 9cdad07c755fa23f6aced510c6760e87
```
>文章访问统计

这个功能喵神貌似没弄，说实话挺破坏美感的，我放来放去，只能把它放在右上角。凑合看吧。功能用了[不蒜子大神](//ibruce.info/2015/04/04/busuanzi/)的，即统计pv（页面点击量）.
可以直接更新github上的[主题](https://github.com/monniya/hexo-theme-new-vno)

或者按以下使用步骤：
1.脚本引用

在<code>themes/new-vno/layout/layout.ejs</code>文件中加入以下代码。当然，加在你的footer，header中都可以
```
<script async src="https://dn-lbstatics.qbox.me/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```

2.把点击量显示在每篇文章的右上角

在<code>themes/new-vno/layout/post.ejs</code>文件中加入以下代码：加在<code>post-meta</code>那个div中，即文章头部
```
<span class="page-pv">     
     &nbsp;阅读&nbsp;<span id="busuanzi_value_page_pv"><i class="fa fa-spinner fa-spin"></i></span>
</span>
```

其中：<code>id=”busuanzi_value_page_pv”</code>是脚本识别必填，其他都属于样式，
在统计数没加载出来之前有个齿轮转转效果，这个是参考潘神的，齿轮上用了font-awesome字体，也可以自己换。
```
<i class="fa fa-spinner fa-spin"></i>
```

3.美化样式

在<code>/themes/new-vno/source/css/vno.styl</code>文件中加入以下代码：
```
.post-meta .page-pv {
    
    margin-right: 0.5em;
    font-size: 0.8em;
    float: right;
}
i.fa.fa-spinner.fa-spin {
    font-size: 0.8em;
}
```

好了，搞定。
相关文章：[vno主题优化(一)](//monniya.com/2016/02/24/theme-vno-diy)
相关文章：[vno主题优化(二) 添加上下篇导航及优化disqus速度](//monniya.com/2016/03/29/theme-vno-diy2/)


