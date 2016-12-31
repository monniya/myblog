---
title: linux自建git私有仓库
date: 2015-08-30 21:29:17
tags: 敲敲码
comments: true
---
> 一、下载git

windows版本：下载地址：https://git-scm.com/downloads
linux版本：安装命令：apt-get install git
如果是把项目推送到github上，那就在https://github.com/ 上注册用户并新建项目，这里免费用户是开源的，仓库不能私有。不过国内的//git.oschina.net/ 上可以建私有仓库，差不多就是github的中文版。

>二、建立免密钥登陆

ssh key可以让本地电脑和服务器间建立加密链接，每次访问无需输入用户密码。
如果是在github或git.oschina为了方便可以先设置为git协议而不是http协议，输入：
git remote -v
如果显示：https://git.oschina.net/monniya/demo.git(fetch) 即用的http协议
可以如下改为git协议
remote set-url origin git@git.oschina.net:monniya/demo.git

本地生成密钥：ssh-keygen -t rsa -C “monniyastyle@gmail.com”
一路回车即可：一般默认生成地址都在/root/.ssh/id_rsa
cd /root/.ssh/id_rsa 可以查看到密钥文件，把id_rsa.pub中内容添加到服务器git公钥中即可：

先拷贝一份到服务器上，然后把密钥加入authorized_keys文件末尾
cat id_rsa.pub >> authorized_keys

>三、建立服务器仓库

进入设置的你想要的仓库地址，用以下命令建立仓库：
git –bare init demo.git 建立裸仓库，bare仓库只存储历史和元信息，不存储文件，即看不到添加的文件
git init demo.git 据说可以这服务器上查看文件，但是我试过不行，不知道哪里不对

空仓库设置好以后，就可以本地克隆项目啦。
回到本地：进去工作目录，先克隆服务器项目：git clone git@192.168.0.100:/root/git/demo.git
然后告诉git你的用户名和email，让他可以知道是谁本地提交了版本
git config –global user.name “monniya”
git config –global user.email “monniyastyle@gmail.com”
提交版本步骤：
git status 查看当前项目状态
git add -A 把所有增删改文件加入缓存，也可只加入某个文件，如git add README
git commit -am “first commit” 提交到本地版本，添加提交说明
git push origin master 提交到服务器版本
第一次提交报错：
remote: error: refusing to update checked out branch: refs/heads/master
remote: error: By default, updating the current branch in a non-bare repository
remote: error: is denied, because it will make the index and work tree inconsistent
remote: error: with what you pushed, and will require ‘git reset –hard’ to match
remote: error: the work tree to HEAD.
remote: error:
remote: error: You can set ‘receive.denyCurrentBranch’ configuration variable to
remote: error: ‘ignore’ or ‘warn’ in the remote repository to allow pushing into
remote: error: its current branch; however, this is not recommended unless you
remote: error: arranged to update its work tree to match what you pushed in some
remote: error: other way.
remote: error:
remote: error: To squelch this message and still keep the default behaviour, set
remote: error: ‘receive.denyCurrentBranch’ configuration variable to ‘refuse’.
需要在服务器项目目录执行以下语句：
git config –bool core.bare true

出错原因在于我初始化空仓库的时候用了git init demo.git
避免此类错误需要用：git –bare init demo.git建立裸仓库。