#Mac下配置环境变量(转)

    说明:Mac下⼀一般使⽤用bash作为默认shell## 一、Mac系统的环境变量,加载顺序为:

```
/etc/profile/etc/paths~/.bash_profile~/.bash_login~/.profile~/.bashrc
```
当然/etc/profile和/etc/paths是系统级别的,系统启动就会加载,后⾯几个是当前⽤用户级的环境 变量量。
后⾯面3个按照从前往后的顺序读取,如果~/.bash_profile⽂文件存在,则后面的⼏个⽂件就会被忽略 不读了,如果~/.bash_profile⽂文不存在,才会以此类推读取后⾯的⽂件。
~/.bashrc没有上述规则,它是bash shell打开的时候载入的。
## 二、设置PATH的语法都为:

``` sh
#中间⽤用冒号隔开
export PATH=$PATH:<PATH1>:<PATH2>:<PATH3>:------:<PATHN>
```###1、全局设置下⾯面的几个⽂件设置是全局的,修改时需要root权限1)/etc/paths (全局建议修改这个⽂文件 )编辑 paths,将环境变量量添加到 paths⽂文件中 ,⼀行⼀个路路径2)/etc/profile (建议不不修改这个⽂文件 ) 全局(公有)配置,不管是哪个用户,登录时都会读取该文件。3)/etc/bashrc (一般在这个⽂件中添加系统级环境变量)全局(公有)配置,bash shell执行时,不不管是何种方式,都会读取此文件。4)1.创建⼀一个⽂文件:

```sudo touch /etc/paths.d/mysql
```2.⽤ vim 打开这个⽂文件(如果是以 open -t 的方式打开,则不允许编辑):

```sudo vim /etc/paths.d/mysql
```3.编辑该⽂件,键⼊入路路径并保存(关闭该 Terminal 窗⼝口并重新打开一个,就能使⽤用 mysql 命令 了)

```/usr/local/mysql/bin
```这样可以⾃己生成新的文件,不用把变量全都放到 paths ⼀个文件里,⽅便管理。
###2、单个⽤用户设置1)~/.bash_profile (任意一个文件中添加用户级环境变量量)(注:Linux ⾥⾯是 .bashrc 而 Mac 是 .bash_profile)若bash shell是以login⽅式执行时,才会读取此⽂文件。该⽂件仅执行⼀次

```export PATH=$PATH:<PATH1>:<PATH2>:<PATH3>:------:<PATH N>
```
若bash shell是以login⽅式执行时,才会读取此⽂文件。该⽂件仅执⾏一次 默认情况下,他设置⼀些环境变量

```
#设置命令别名
alias ll=’ls -la’
```
```
#设置环境变量:export PATH=/opt/local/bin:/opt/local/sbin:$PATH
```

2)~/.bashrc 同上

###三、注意:如果想⽴刻生效,则可执⾏下⾯的语句:source 相应的文件 ⼀般环境变量更改后,重启后生效。

```
source $file
```
也就是说在当前⽤户的⽬录下,如果⼜有了.bash_profile⽂件就不会去加载.bashrc文件。 所以如果要能正常加载.bashrc⽂文件,需要在.bash_profile⽂件的最末尾上加入如下语句:

```
if [ -f ~/.bashrc ]; then   source ~/.bashrcfi
```然⽽而,这个修改只是正对bash的,如果你没有修改过,上⾯面的方法默认重启后就能生效。 但是,现在的mac上有些使⽤zsh这个作为默认的shell,所以,在启动shell时,默认不会按上⾯的 套路路去加载。 如果想要正常加载.bashrc⽂件时,就要找到用户目录下的.zlogin⽂文件加⼊入如下代码:

```if [ -f ~/.bashrc ]; then   source ~/.bashrcfi
```

    注意: $ZDOTDIR 默认指向 $HOME
    如果是一个登录了的终端，会加载 /etc/profile 然后加载 $ZDOTDIR/.zprofile。然后如果是交互式模式，会继续加载 /etc/zsh/zshrc 接着加载 $ZDOTDIR/.zshrc 。最后如果还是登录了的终端，/etc/zsh/zlogin 和 $ZDOTDIR/.zlogin 也会被加载。



There are 5 startup files that zsh will read commands from:
```
$ZDOTDIR/.zshenv$ZDOTDIR/.zprofile$ZDOTDIR/.zshrc$ZDOTDIR/.zlogin$ZDOTDIR/.zlogou
```即可⽣生效。
