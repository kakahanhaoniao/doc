## webworker整理介绍

webworker的出现主要是为了解决浏览器端的单线程问题（当业务复杂同时需要复杂ui交互时，会导致页面卡顿丢帧的问题）
webworker主要分为包含
1.webworker
2.shareworker
3.serviceworker


### webworker
webworker主要是分为两个层：页面服务层/后台处理层
1）页面服务层主要处理ui界面的逻辑，运行在主进程上
2）后台处理层相当于新开了一个进程，用于处理需要在后台处理的逻辑，不能处理ui界面的逻辑
页面服务层与后台服务层之间进行通讯，通过worker的postMessage和onmessage事件进行通讯，如果后台处理层需要处理ui层面的逻辑，需要借助postmessage
在主页面与 worker 之间传递的数据是通过拷贝，而不是共享来完成的。
Web Worker 的实现为前端程序带来了后台计算的能力，可以实现主 UI 线程与复杂计运算线程的分离，从而极大减轻了因计算量大而造成 UI 阻塞而出现的界面渲染卡、掉帧的情况，并且更大程度地利用了终端硬件的性能；
其主要应用有几个场景：
对于图像、视频、音频的解析处理；
canvas 中的图像计算处理；
大量的 ajax 请求或者网络服务轮询；
大量数据的计算处理（排序、检索、过滤、分析...）；

    注意： 作为参数传递给worker构造器的URI必须遵循同源策略 。目前各浏览器供应商对于何种URI属于同源仍有争议；Gecko 10.0 (Firefox 10.0 / Thunderbird 10.0 / SeaMonkey 2.7)及更高版本支持数据URI 而 Internet Explorer 10 不支持将blob URI作为worker中合法的脚本。
    在主线程中使用时，onmessage和postMessage() 必须挂在worker对象上，而在worker中使用时不用这样做。原因是，在worker内部，worker是有效的全局作用域。


## shareworker
由于webworker只能运用于当前页面，不对其他页面产生作用，所以诞生了shareworker即共享worker。

## serviceworker
serviceworker与webworker有很多相似之处
事件驱动的 worker，生命周期与页面无关，关联页面未关闭时，它也可以退出，没有关联页面时，它也可以启动，

介绍https://zhuanlan.zhihu.com/p/27264234


##websocket
