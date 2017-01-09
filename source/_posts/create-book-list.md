---
title: 构建我的黄金屋－书单和电影
date: 2016-01-31 17:43:37
tags: 敲敲码
comments: true
---
在逛云栖社区的时候偶然看到大神的[做一个照片流，分享你喜欢的书和电影](https://blog.jamespan.me/2016/01/28/show-your-favorites-collection-in-hexo/)，哇，正想做一个照片流呢， Hexo刚玩不久，还没捣鼓插件，真巧，马上用起来。
如何搭建文章中讲得很清楚，按理将一步步照做就行了。让我来复习下步骤：
>安装

从 Github 上下载大神的代码，放到博客的scripts目录
<pre>
cd scripts
curl -o image-stream.js https://raw.githubusercontent.com/JamesPan/blog-src/8ac83216ef4f2904d326ec7cddcf7adba56d9757/themes/icarus/scripts/image-stream.js

//也可以直接下载我的
curl -o image-stream.js https://raw.githubusercontent.com/monniya/monniya.blog/master/scripts/image-stream.js
</pre>

>配置

在博客的主配置文件中加入下面配置，前面两个是插件依赖的模块的 CDN 链接，第三个是实现页面中图片懒加载时用到的占位符，如果有需要可以替换为自己喜欢的链接。
当然如果和我一样在主题中已经加载了jquery，可以设置jquery为false
<pre>
image_stream:
  #jquery: //cdn.bootcss.com/jquery/2.1.0/jquery.min.js
  jquery: false
  jquery_lazyload: //cdn.bootcss.com/jquery.lazyload/1.9.1/jquery.lazyload.min.js
  img_placeholder: //ww4.sinaimg.cn/large/e724cbefgw1etyppy7bgwg2001001017.gif
</pre>

>使用

在博客的source目录新增favourite目录，并新建文件 <code>index.md</code>
使用如下格式写入图片，书名和链接，大神这个插件在所有文章都可以用，所以就不用代码插入了，直接截图看看
![ ](//cdn.monniya.com/2016/create-book-list-2.png )

我改过的样式如下：封面上书名大大的，我就去掉了文字描述，但是保留跳转链接，以及加了在读，已读的title。
![ ](//cdn.monniya.com/2016/create-book-list-3.png )

对应的<code>/scripts/image-stream.js</code>中，修改为点击图片跳转，如下：
``` bash
hexo.extend.tag.register('figure', function(args){
  var imgUrl = args.shift();
  //var title = args.join(' ');
  var placeholder = config['img_placeholder'];
  var wordUrl = args.shift();
  var result = '<figure>';
  
  result += '<a href="' + wordUrl + '" target="_blank" rel="external">'
  result += '<img class="hexo-image-steam-lazy nofancy" src="' + placeholder + '" data-original="' + imgUrl + '"/>';
  result += '<noscript><img src="' + imgUrl + '"/></noscript>' + '</a>';
  //result += '<figcaption>' + hexo.render.renderSync({text: title, engine: 'markdown'}).replace(/<p>/, '').replace(/<.p>/, '') + '</figcaption>';
  result += '</figure>';
  return result;
});
```
以及一些边框样式调整，不赘述。
>小白分割线

but对于小白用户来讲，照着敲也会遇到问题，orz。下面就记录下使用过程中遇到的困惑，万一也有和我一样的小白呢？
照着每一步都做完以后，却只显示文字，哪里出问题了呢？一个个来排除：
1、代码确认无误 check
2、查看html文件发现有两个地方使用img，但是<code>&lt;noscript></code>不知道什么意思，发现去了就能显示图片了。如下：
![ ](//cdn.monniya.com/2016/create-book-list-1.jpg )
google完毕后发现这里是使用了[lazyload](//www.appelsiini.net/projects/lazyload)插件，<code>&lt;noscript></code>是用来当js脚本不起作用时显示里面的内容。soga。
3、查看network加载发现重复引用jQuery，分别有2.1.0和2.1.4版本的jquery.min.js，前者是这个插件带的，后者是主题引用的，将前者配置改成<code>image_stream.jquery:false</code>，将后者从body移到head中。还是没有显示。
4、对比大神的代码和自己的代码，发现大神的<code>&lt;img></code>中多了一句，<code>style="display: block;"</code>，好吧，为什么我的没有，仔细检查了发现
当前页的style中，对图片的class默认是<code>.hexo-image-steam-lazy {display:none;}</code>，我把这句改成<code>display:none;</code>，然后就显示了。只是不知道对于图片懒加载有没有什么影响。代码修改地址：<code>/scripts/image-stream.js</code>


好啦，就这样我的[黄金屋](//monniya.com/favourite/)造好啦，感谢大神。
