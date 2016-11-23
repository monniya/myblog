---
title: hexo博客创建RSS订阅
date: 2016-02-24 18:38:13
tags: 敲敲码
---
rss方式阅读会在这个信息爆炸的时代为你提高阅读质量。
刚刚给自己的博客添加了rss地址，很简单的三步，记录如下：
> 下载安装hexo插件

```
npm install hexo-generator-feed --save 
```
安装完成后，会在`node_modules`目录下生成`hexo-generator-feed`目录：
![](http://cdn.monniya.com/2016/create-rss-1.png)
>根目录_config.yml配置

```
# RSS
plugin: hexo-generator-feed
#Feed Atom
feed:     
type: atom
path: atom.xml
limit: 20
```

>主题_config.yml配置

```
rss: /atom.xml
```