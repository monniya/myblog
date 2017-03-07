---
title: vno主题优化(二）添加上下篇导航及优化disqus速度
date: 2016-03-29 18:35:41
tags: 敲敲码
---
>前言

本主题由[喵神](//onevcat.com/)原创，基于jekyll，[hexo](https://github.com/lenbo-ma/hexo-theme-vno)版本由[空谷幽兰](//mlongbo.com/)创建。
由于hexo版本的vno主题，博主已经停止维护，为了这个漂亮的主题不被荒废，特新建了一个[repository](https://github.com/monniya/hexo-theme-new-vno.git)进行持续修复和优化，有需要的可以从我的github上下载此主题

>3.29更新 增加文章末尾，最近的文章，更早的文章

就是博客经常看到的上一篇，下一篇功能啦，还是按照喵神的样式来，只是摘要字数减少了一点，颜色采用蓝色调，具体效果见[文章末尾](//monniya.com/2016/03/29/theme-vno-diy2/#end)。
简要概述：使用hexo的page.prev及page.next获取上一篇，下一篇文章，以及用path，title，content属性获取对应的路径，文章名称，内容，再加入到生成的文章模版中，最后添加css样式即可
操作步骤：
1.在<code>themes/new-vno/layout/_partial/</code>位置新建文件[read-more.ejs](https://raw.githubusercontent.com/monniya/hexo-theme-new-vno/master/layout/_partial/read-more.ejs)（为避免代码有个别词被转义，建议直接下载文件）
添加代码：
```
<section class="read-more">
     <% if (page.prev || page.next){ %>         
        <% if (page.prev){ %>       
            <div class="read-more-item">
                <span class="read-more-item-dim">最近的文章</span>
                <h2 class="post-list__post-title post-title"><a href="<%- config.root %><%- page.prev.path %>" title="<%= page.prev.title %>"><%= page.prev.title %></a></h2>
                <p class="excerpt">
                <% if (page.prev.excerpt){ %>
                <%= strip_html(page.prev.excerpt) %>
                <% } else { %>
                <%= strip_html(page.prev.content).substring(0, 150)%>
                <% } %>&hellip;
                </p>
                <div class="post-list__meta"><%- partial('_partial/date',{post: page.prev}) %> &#8226; <span class="post-list__meta--tags tags">于&nbsp;<%- partial('_partial/tags',{post: page.prev}) %></span><a class="btn-border-small" href="<%- config.root %><%- page.prev.path %>">继续阅读</a></div>
                           
            </div>
        <% } %>

        <% if (page.next){ %>       
            <div class="read-more-item">
                <span class="read-more-item-dim">更早的文章</span>
                <h2 class="post-list__post-title post-title"><a href="<%- config.root %><%- page.next.path %>" title="<%= page.next.title %>"><%= page.next.title %></a></h2>
                <p class="excerpt">
                <% if (page.next.excerpt){ %>
                <%= strip_html(page.next.excerpt) %>
                <% } else { %>
                <%= strip_html(page.next.content).substring(0, 150)%>
                <% } %>&hellip;
                </p>
                <div class="post-list__meta"><%- partial('_partial/date',{post: page.next}) %> &#8226; <span class="post-list__meta--tags tags">于&nbsp;<%- partial('_partial/tags',{post: page.next}) %></span><a class="btn-border-small" href="<%- config.root %><%- page.next.path %>">继续阅读</a></div>
                       
            </div>
        <% } %>     
   <% } %>  
</section>
```

2.添加到post文章模版中
文件位置：<code>themes/new-vno/layout/post.ejs</code>
在文章模块后，comments模块前加上调用代码
```
<%- partial('_partial/read-more', {}) %>
```

3.增加css样式
文件位置：<code>/themes/new-vno/source/css/vno.styl</code>
```
.read-more {
  margin-top: 1em;
  margin-bottom: 1em;
  padding-top: 1.2em;
  padding-bottom: 1em;
  border-top: 1px solid #DDDDDD; 
}

.read-more-item {
  display: inline-block;
  vertical-align: top;
  width: 48%; 
}

.read-more-item-dim {
  color: #4E97D8;
  font-size: .8em; 
  line-height: 1.8em;
}

@media all and (max-width: 960px) {
.read-more-item {
  padding-top: 1.2em;
  width: 100%; 
}
}

```
好了，搞定！

>3.27更新 优化disqus访问速度

disqus评论加载缓慢本质原因是博客没有上https协议，不知为何http的disqus地址绕墙能力很低下，小白不懂。
想想家里的砖块服务器还能用，懒得再买个服务器折腾，就没上https（某人说上https是程序员的尊严😂，幸好我只是一枚产品媛😂）
but总不能一直忍受蜗牛的速度吧，让我们来想几个小办法
首先：disqus评论优化文件位置：<code>themes/new-vno/layout/_partial/comments.ejs</code>
潘神教我直接用<code>a.disquscdn.com</code>减少一次跳转，但我试了效果并不显著，可能姿势不对orz
直接把用到的资源文件下载到本地，懒人还是放弃把
**亲测有效** 把comments.ejs文件中几个disqus的链接地址从<code>http</code>，改成<code>https</code>.真的有用！哈哈！
相关文章：[vno主题优化(一)](//monniya.com/2016/02/24/theme-vno-diy)
相关文章：[vno主题优化(三) 添加博客统计](//monniya.com/2016/06/14/article-analytics/)

