---
title: vno主题优化(一）
date: 2016-02-24 19:49:47
tags: 敲敲码
---
>前言

每次换博客总是会为主题style纠结，这次换来换去盯上了[onevcat大神](//onevcat.com/)的主题，简洁明快，基于响应式的设计风格。可惜大神用的是jekyll,幸好有另外的大神[空谷幽兰](//mlongbo.com/)写了一个基于hexo的[主题](https://github.com/lenbo-ma/hexo-theme-vno).
但是又很不幸发现vno主题的博主已经停止维护此主题了，为了这个漂亮的主题不被荒废，特新建了一个[repository](https://github.com/monniya/hexo-theme-new-vno.git)进行持续修复和优化，有需要的可以从我的github上下载此[主题](https://github.com/monniya/hexo-theme-new-vno.git)

>2.24-2更新bug 文章分页问题

文章列表分页跳转有问题，点击下一页跳回主页
简单的解决方法是不采用分页，修改全局配置文件`_config.yml`,设置`per_page: 0` ，但是大部分人还是希望有分页的。
查看了下源代码，其实翻页是没问题的，只是在上面被盖了一个蒙层，原因是在`page`分页时，`header`里面的`css`没有加上`panel-cover–collapsed`样式
修复分页办法如下：
修改js文件地址：`themes/new-vno/source/js/main.js`
具体调整：
在`$(document).ready(function()` 中增加下面函数：
```
if (window.location.pathname.substring(0, 6) == "/page/") {
   $('.panel-cover').addClass('panel-cover--collapsed');
 }
 ```
 >2.24更新bug 代码块样式问题

 使用代码块时，列表会超出屏幕显示，而不是自动出横向滚动条
调整样式代码：
样式位置：`/themes/new-vno/source/css/vno.styl`
具体调整：
```
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  table-layout: fixed;
}
table td:first-child {
   width: 3%;
   text-align: center;
}
```
相关文章：[vno主题优化(二) 添加上下篇导航及优化disqus速度](//monniya.com/2016/03/29/theme-vno-diy2/)
相关文章：[vno主题优化(三) 添加博客统计](//monniya.com/2016/06/14/article-analytics/)