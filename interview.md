# 2017.8.17面试分享（js面试题记录）

### 1. 最简单的一道题

``` js
    '11' * 2
    'a8' * 3
```

### 2. 一道this的问题

```javascript
    var num = 10;
    var obj = {
        num:8,
        inner: {
            num: 6,
            print: function () {
                console.log(this.num);
            }
        }
    }
    num = 888;
    obj.inner.print(); // 6
    var fn = obj.inner.print;
    fn(); //888
    (obj.inner.print)(); //6
    (obj.inner.print = obj.inner.print)(); //888 这个点没有太理解，虽然答对了
```

### 3. var和function的预解析问题,以及变量和function的先后顺序的问题

```javascript
    // 以下代码执行输出结果是什么
    function b () {
        console.log(a);
        var a = 10;
        function a() {};
        a = 100;
        console.log(a);
    }
    b();

    function c () {
        console.log(a);
        function a() {};
        var a = 10;
        a = 100;
        console.log(a);
    }
    c();

    (function d (num) {
        console.log(num);
        var num = 10;
    }(100))

    (function e (num) {
        console.log(num);
        var num = 10;
        function num () {};
    }(100))

    (function f (num) {
        function num () {};
        console.log(num);
        var num =10
        console.log(num);
    }(100))

    //仍然是预解析(在与解析过程中还要考虑一下当前变量的作用于)
    function m () {
        console.log(a1); // underfined
        console.log(a2); // underfined
        console.log(b1); // underfined
        console.log(b2); // underfined
        if(false) {
            function b1 (){};
            var a1 = 10;
        }
        if(true) {
            function b2 (){};
            var a2 = 10;
        }
        console.log(a1); // underfined
        console.log(a2); // 10
        console.log(b1); // function
        console.log(b2); // underfined
    }
    m();

    function n() {
        if(2>1) {
            arr = 10;
            brr = 10;
            let arr;
            var brr;
            console.log(arr);
            console.log(brr);
        }
    }
    n(); // ReferenceError
```

此阶段浏览器只是对var、function、函数形参进行一个解析的准备过程。而且在这个“预解析”过程中，有一个预解析先后顺序，即函数的形参 -> function -> var。而且重名时预留函数、后来者覆盖前者。预解析结果形参如果有值则解析到值，没有则为underfined，函数则解析到整个函数体，变量都为underfined；这道题目中没有参数出现，所以先不讨论。所以这道题在“预解析”时，函数声明权重优先会被提升


### 4. 一个算法问题

有一个已经排序的数组，比方[1,4,6,9,11,15,18],给你一个新的数，插入到数组中，写一个function

### 5.  函数节流是什么，有什么优点（之前没有了解过这个概念，懵逼了）

### 6.  写一个方法，实现传入两个参数(parentNode, childNode),要求如果childNode是parentNode的子孙节点，则返回为true，否则返回为false

### 7.  dom事件流原理是什么，分为那几个阶段？

事件捕获 处于目标阶段 事件冒泡

### 8.  dom事件委托什么原理，有什么优缺点

### 9.  http的cache机制，以及200状态下怎么实现 from cache（表示接触最多的就是304的from cache）（用于优化，没有接触过，需要理解）

### 10.  一个原型链继承的问题

```javascript
    // 有一个构造函数A，写一个函数B，继承A
    function A (num) {
        this.titileName = num;
    }
    A.prototype = {
        fn1: function () {},
        fn2: function () {}
    }
```

这个问题的关注点是B继承的A的静态属性，同时B的原型链中不存在A实例的titleName属性

### 11. 什么是虚拟dom

### 12. js基础数据类型和引用类型分别是什么？这个前提条件下写一个getType，返回相应的类型


### 13. dom选择器优先级是什么，以及权重值计算（一道老问题了）
1.行内样式 1000
2.id 0100
3.类选择器、伪类选择器、属性选择器[type="text"] 0010
4.标签选择器、伪元素选择器(::first-line) 0001
5.通配符*、子选择器、相邻选择器 0000

### 14. vue双向数据绑定的原理是什么

首先传输对象的双向数据绑定 Object.defineProperty(target, key, decription),在decription中设置get和set属性（此时应注意description中get和set不能与描述属性共存）
数组的实现与对象不同。
同时运用观察者模式实现wather，用户数据和view视图的更新

### 15. react和vue比较来说有什么区别
1 component层面，web component和virtual dom
2 数据绑定（vue双向，react的单向）等好多
3 计算属性  vue 有，提供方便；而 react 不行
4 vue 可以 watch 一个数据项；而 react 不行
5 vue 由于提供的 direct 特别是预置的 directive 因为场景场景开发更容易；react 没有
6 生命周期函数名太长 directive

### 16. git使用过程中，如果你在开发着业务，突然另一个分支有一个bug要改，你怎么办
    git stash

### 17. postcss的使用


### 18. 网页布局有哪几种，有什么区别
静态、自适应、流式、响应式四种网页布局
静态布局：意思就是不管浏览器尺寸具体是多少，网页布局就按照当时写代码的布局来布置；
自适应布局：就是说你看到的页面，里面元素的位置会变化而大小不会变化；
流式布局：你看到的页面，元素的大小会变化而位置不会变化——这就导致如果屏幕太大或者太小都会导致元素无法正常显示。
自适应布局：每个屏幕分辨率下面会有一个布局样式，同时位置会变而且大小也会变。


### 18. 执行下面代码

``` js
var a = {};
var b = {key: 'b'};
var c = {key: 'c'};
var d = [3,5,6];
a[b] = 123;
a[c] = 345;
a[d] = 333;
console.log(a[b]);
console.log(a[c]);
console.log(a[d]);
```

### 19.

``` JS
    var R = (function() {
        var u = {a:1,b:2};
        var r = {
            fn: function(k) {
                return u[k];
            }
        }
        return r;
    }());
    R.fn('a');
```
上述代码中如何获取匿名函数中的u


### 20. 不适用循环语句（包括map、forEach方法）实现一个100长度的数组，索引值和值相同的数组[0,1,2,3,4,5........99]

``` js
var arr = new Array(100);
//方法1
[...arr.keys()];
//方法二
Array.from(arr.keys());

//方法三
Array.from({length: 100});

// 方法四 借助string
var arr1 = new Array(101);
var str = arr1.join('1,');
str = str.replace(/(1\,)/g, function ($0, $1, index) {
    var start = '' + Math.ceil(index/2);
    if(index < str.length - 2) {
        start += ','
    }
    return start;
});
return str.split(',');


// 方法五（函数式变成，参考网络）
function reduce(arr, val) {
    if(Object.prototype.toString.apply(val)){
        return;
    }
    if(val >= 100) {
        return arr;
    }
    arr.push(val);
    return reduce(arr, val+1);
}
var res = reduce([], 0)
```


### 21. 下面语句执行结果输出

``` js
var a = function (val, index) {
    console.log(index);
    return {
        fn: function (name) {
            return a(name, val);
        }
    }
}

var b = a(0); // underfined
b.fn(1); // 0
b.fn(2); // 0
b.fn(3); // 0
```

### 22. 科普

1) dom节点的根节点是不是body
回答： 不是，dom节点的根节点是html(包含head和body，head中分为meta、title等。body又分为一组)

2）dom元素都会有offsetParent吗
回答： offsetParent属性返回一个对象的引用，这个对象是距离调用offsetParent的元素最近的（在包含层次中最靠近的），并且是已进行过CSS定位的容器元素。 如果这个容器元素未进行CSS定位, 则offsetParent属性的取值为根元素(在标准兼容模式下为html元素；在怪异呈现模式下为body元素)的引用。 当容器元素的style.display 被设置为 "none"时（译注：IE和Opera除外），offsetParent属性 返回 null。

3) [1,3,5]转译成字符串是什么
回答： '1,3,5'
调用toString方法，生成该字符串

4）li标签的祖级元素可以为li，父级元素也可以为例
回答： 错误


### 23. jsonp原理，jquery是怎么实现的，这样实现有什么好处和坏处


### 24. http协议属于七层协议中的哪一层，下一层是什么

### 25. js垃圾回收机制知道哪些，v8引擎使用的哪一种

### 26. 作用域什么时候生成的？

### 27. websocket长连接原理是什么

### 28. http缓存知道哪些

### 29. 讲一下事件循环机制

### 30. 理解web安全吗？都有哪几种，介绍以及如何预防


### 40. sessionStorage和localstorage能跨域拿到吗？比如我在www.baidu.com设置的值能在m.baidu.com能拿到吗？为什么

### 41. localstorage不能手动删除的时候，什么时候过期

### 42. cookie可以设置什么域？可以设置.com吗

### 43. 登录状态的保存你认为可以保存在sessionstorage或者localstorage或者cookie或者你知道的哪种方式，存在了哪里？？为什么保存在那里


### 44. flux -> redux -> mobx 变化的本质是什么

### 45. 按需加载路由怎么加载对应的chunk文件的？换句话说浏览器怎么知道什么时候加载这个chunk，以及webpack是怎么识别那个多个经过hash过的chunk文件


### 50. get和post有什么区别？get可以通过body传递数据吗

### 51. 下拉刷新你怎么实现


### 52. 预加载options请求为什么会出现，能避免这个请求吗？
