---
title: 使用github＋hexo搭建静态blog
date: 2016-01-10 13:42:11
tags: 敲敲码
comments: true
categories: 敲敲码
---

WD自从被刷了多次固件后，访问速度越来越慢，并发量也是瓶颈，听从小熊的建议，开始采用静态blog方式。放弃臃肿的wordpress后也让blog变得简洁无比。写作心情也越来越好（明明没写几篇orz）

进入正题：下面就来说说如何用github＋hexo搭建静态blog
<!--more-->

## 环境部署

需要安装以下内容：
* git
* Node.js
* hexo

[hexo官网资料参考链接](https://hexo.io)

使用brew安装npm （Node.js 的模块依赖管理工具）
``` bash
    brew install npm
```
安装git
``` bash
    brew install git
```
[git搭建blog官网资料参考链接](https://pages.github.com/)
新建git仓库作为静态网站的存放位置
命名规则要求为：git账户名.github.io
可以先在仓库上新建index.html测试下网址是否有效

安装hexo
``` bash
    npm install -g hexo-cli
```
初始化hexo
``` bash
hexo init <yourfolder>
cd <yourfolder>
npm install
```
安装hexo部署git环境

``` bash
npm install hexo-deployer-git --save
``` 

修改配置文件_config.yml
``` bash
deploy:
  type: git
  repo: https://github.com/gitusername/gitusername.github.io.git
``` 
至此基础环境搭建完毕

若需绑定特定域名，则先在hexo初始化的文件夹<yourfolder>下面新建CNAME文件，写入域名
再将域名的dns解析增加两条a记录，解析到github服务器192.30.252.153和192.30.252.154

## 博客写作

hexo自带hello－world文章。只需两步命令即可看到网站全貌


``` bash
    hexo generate //简写hexo g
    hexo deploy //简写hexo d
``` 
访问[https://monniya.github.io](https://monniya.github.io)或者[https://monniya.com](https://monniya.com)

generate为生成静态文件，deploy为提交到git，现在可以去仓库中看到提交的内容。
但若每次修改一点内容就提交一次，毕竟不方便。
请使用命令：
``` bash
    hexo server //简写hexo s
    ＃INFO  Hexo is running at //0.0.0.0:4000/. Press Ctrl+C to stop.
``` 
即启动本地预览，访问本地地址//0.0.0.0:4000/ 即可，修改后刷新地址即可看到效果，满意后再deploy到git发布即可

看完了helloworld就可以开始新建写自己的文章了
新建文章命令：
``` bash
    hexo new [layout] <title>
``` 
Hexo 有三种自带布局：post、page 和 draft，默认post，title即为静态页面地址栏标题
新建完成后可以在目录/source/_posts/看到新建的文章：title.md，此时还未编译成静态文件，（mac用户建议用visual studio code软件编写，微软官网下载即可，轻便好用。）
说说基础的编辑：进入md文件，首先编辑Front-matter 
即文件最上方以 --- 分隔的区域，用于指定文件基础信息，如文章显示名称，发布时间，评论开启等等
``` bash
   ---  
   title: 使用github＋hexo搭建静态blog
   date: 2016-01-10 13:42:11
   tags: [github, hexo, blog, cname]
   comments: true
   categories: skills
   ---  
``` 
接着就可以愉快的写作啦，这里采用markdown通用格式编写。 
Markdown 是一种轻量级标记语言，它允许人们“使用易读易写的纯文本格式编写文档，然后转换成有效的XHTML(或者HTML)文档”。详情参见维基百科：[Markdown](https://zh.wikipedia.org/wiki/Markdown#.E4.BB.A3.E7.A0.81)
语法支持请戳[Markdown中文文档](//markdown-zh.readthedocs.org)

ok。使用github＋hexo搭建静态blog基本步骤介绍完毕了。

原有文章大部分都在wordpress上，明天想个法子把文章挪过来。




