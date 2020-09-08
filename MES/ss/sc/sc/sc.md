
### 盒模型

https://www.cnblogs.com/nyw1983/p/11326599.html

### 居中布局
https://segmentfault.com/a/1190000016389031

### 文字下划线应用

1. 在html标签中对需要加下划线的文字加<u></u>即可实现加下划线样式。
2. 使用CSS样式单词：text-decoration:underline
3. 使用css border-bottom

### 伪元素和伪类区别。使用场景

伪元素使用： https://www.cnblogs.com/wonyun/p/5807191.html

## npm install 的流程逻辑

https://mp.weixin.qq.com/s/5tmND0G_ZkYVR7Dmug0ugQ
https://www.cnblogs.com/everlose/p/12505245.html


## webpack chunks 如何加载

## CommonJS 与 ES6 Modules 规范的区别

https://github.com/YvetteLau/Step-By-Step/issues/43 (推荐)

https://juejin.im/post/6844904039822393358

1. CommonJS 模块是运行时加载, ES6 Modules 为“编译时加载”或者静态加载.
2. CommonJS 输出是值的拷贝;
   当导入基本数据类型时，两个模块没有任何关联;
   而当导入复杂数据类型时，属于浅拷贝。由于两个模块引用的对象指向同一个内存空间，因此对该模块的值做修改时会影响另一个模块；

ES6 Modules 输出的是值的引用，被输出模块的内部的改变会影响引用的改变;

3.

不同于 CommonJS，ES6 使用 export 和 import 来导出、导入模块。export 命令规定的是对外的接口，必须与模块内部的变量建立一一对应关系。

import 采用的是编译时加载，所以 import 导入的模块必须放在代码的顶部，模块指向也是指向同一个内存对象，所以当改变内存指向的对象的值时，导入值会随之改变（和 require 导入复杂类型对象相似）\

4. CommonJS this 指向当前模块，ES6 Modules this 指向 undefined

5. CommonJs 导入的模块路径可以是一个表达式，因为它使用的是 require()方法；而 ES6 Modules 只能是字符串

6. 关于第一个差异，是因为 CommonJS 加载的是一个对象（即 module.exports 属性），该对象只有在脚本运行完才会生成。
   而 ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。

7. 当使用 require 命令加载同一个模块时，不会再执行该模块，而是取到缓存之中的值。
   也就是说，CommonJS 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，就返回第一次运行的结果，除非手动清除系统缓存。

https://mp.weixin.qq.com/s/eMC2ZQrFpuHbgQooQdv4xg
https://juejin.im/post/6844903983987834888
https://segmentfault.com/a/1190000010426778
https://es6.ruanyifeng.com/#docs/module

https://www.cnblogs.com/shuaigebie/p/12757772.html
https://zhuanlan.zhihu.com/p/26625636

## webpack 相关

https://blog.csdn.net/sinat_17775997/article/details/84314006

## 实现一个模板替换

## JSONP 实现跨域

//https://www.jianshu.com/p/d006b883772a

```js
function addScript() {
  var script = document.createElement("script");
  script.src = "http://www.sen.com/getData?callback=getData";
  document.head.appenChild(script);
  document.head.removeChild(script);
}

function getData(data) {
  console.log(data);
}

addScript();
getData();
```

## 求整数的所有除数

<!-- 要求： 除数不包括 1 和数字本身
 要求： 如果该数没有除数 返回一个字符串
 例如： 13这个数应该返回 “13 没有除数”
例如： 12这个数应该返回 [2,3,4,6]
给定数是大于 1 的 -->

```js
function divisors(integer) {
  var res = [];
  for (var i = 2; i <= Math.floor(integer / 2); ++i)
    if (integer % i == 0) res.push(i);
  return res.length ? res : integer + " 没有除数";
}
console.log(divisors(12));
```

## 整数质因数分解 12: 2*2*3

```js
function factor(num) {
  let arr = [];
  let i = 2;
  for (; i < num / 2; i++) {
    if (num % i === 0) {
      arr.push(i);
      num = num / i;
      i = 1;
    }
  }

  if (i > num / 2 && num > 1) {
    arr.push(num);
  }
  return arr;
}

let result = factor(100).join("*");
console.log("res", result);
```

```js
// 错了
function factor(num, arr = []) {
  let i = 2;
  for (; i < Math.floor(num / 2); i++) {
    if (num % i === 0) {
      arr.push(i);
      factor(num / i, arr);
      break;
    }
  }
  if (i > num / 2) {
    arr.push(num);
  }
  return arr;
}

function factor_str(num) {
  return factor(num).join("*");
}

factor_str(100);
```

## table 初始时是乱序，第一次点击按照时间排序，后面点击就倒序（原生 js 实现)

https://www.jb51.net/article/103958.htm

## react props 是拷贝还是引用
https://my.oschina.net/u/4384187/blog/3415269

## Object.assign polyfill 的实现

https://cnodejs.org/topic/56c49662db16d3343df34b13



## 实现一个深拷贝
https://juejin.im/post/6844903895550918669

```js
function deepClone(source){
 let  target = Array.isArray(source) ? [] : {}
    if(typeOf(source) == 'object'){
        for (key in source){
            if(source.hasOwnProperty(key)){
                if(source[key] == 'object'){
                    deepClone(source[key])
                } else {
                    target[key] = source[key]
                }
            }
        }
    } else {
        target = source
    }
    return target
}
```


## react props 是引用还是拷贝

https://my.oschina.net/u/4384187/blog/3415269

## nginx 有哪些负载均衡的策略

https://blog.csdn.net/xiaojin21cen/article/details/79903713

## JavaScript 内存泄漏教程

http://www.ruanyifeng.com/blog/2017/04/memory-leak.html

## 查看内存使用情况
点击Performace ==》点击录制==》页面上操作一段时间==》 停止录制==》 查看Memory==> 
看波浪线是否趋于平稳
如果趋于平稳就没有泄露，否则存在内存泄露

## Node 查看内存使用情况

```js
> console.log(process.memoryUsage());
{
  rss: 22192128,
  heapTotal: 5435392,
  heapUsed: 3182928,
  external: 1505788,
  arrayBuffers: 9449
}
```
rss（resident set size）：所有内存占用，包括指令区和堆栈。
heapTotal："堆"占用的内存，包括用到的和没用到的。
heapUsed：用到的堆的部分。
external： V8 引擎内部的 C++ 对象占用的内存。
判断内存泄漏，以heapUsed字段为准。

## Map VS WeakMap




## JS 标记清除算法
JS探索-GC垃圾回收： https://zhuanlan.zhihu.com/p/103110917

https://www.cnblogs.com/starof/p/6594904.html
浅谈JavaScript垃圾收集——标记清除和引用计数： https://blog.csdn.net/zhouziyu2011/article/details/61201613


## 为什么要做动静分离


## 一道题
https://www.jianshu.com/p/2ae88363c79b

## 宏任务和微任务

宏任务： scriprt 整体代码、setTimeout  、setInterval、UI交互事件、 I/O
微任务： Promise.then、、 await 后面的代码

## 了解vue.nextTick()
https://www.jianshu.com/p/55203b13e894

##  react 声明周期
https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
https://www.jianshu.com/p/514fe21b9914


## var和let/const的区别
https://blog.csdn.net/qq_39009348/article/details/93042516
https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/133
https://juejin.im/post/6844903704189992973
https://juejin.im/post/6844903752139276301



## this
https://zhuanlan.zhihu.com/p/24145671

https://juejin.im/post/6844903805708926990


```js
var a= 1
var obj ={
	a:2,
	getA: ()=>{
		return this.a
	}
}
console.log(obj.getA()) // 1
```

```js
let a= 1
let obj ={
	a:2,
	getA: ()=>{
		return this.a
	}
}
console.log(obj.getA())  // undefined
```



```js
var  a= 1
var obj ={
	a:2,
	getA(){
		return this.a
	}
}
console.log(obj.getA())  //2
```

```js
let  a= 1
let obj ={
	a:2,
	getA(){
		return this.a
	}
}
console.log(obj.getA())  //2
```


## vue 单页应用内存泄露
https://blog.csdn.net/qq_41635262/article/details/106055818

## 浏览器垃圾回收机制与 Vue 项目内存泄漏场景分析 + 标记清除算法

https://developer.51cto.com/art/201909/602862.htm





