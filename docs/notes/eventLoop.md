# EVENTLOOP
## 引子

几乎在每一本JS相关的书籍中，都会说JS是`单线程`的，JS是通过事件队列`(Event Loop)`的方式来实现异步回调的。 对很多初学JS的人来说，根本搞不清楚单线程的JS为什么拥有`异步`的能力，所以，我试图从`进程`、`线程`的角度来解释这个问题。

## CPU

![CPU](https://user-gold-cdn.xitu.io/2019/8/20/16caca3ddada3a3d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

计算机的核心是`CPU`，它承担了所有的计算任务。

它就像一座工厂，时刻在运行。

## 进程

![进程](https://user-gold-cdn.xitu.io/2019/8/20/16caca3ddb1e54c7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

假定工厂的电力有限，一次只能供给一个车间使用。 也就是说，一个车间开工的时候，其他车间都必须停工。 背后的含义就是，单个CPU一次只能运行一个任务。

`进程`就好比工厂的车间，它代表CPU所能处理的单个任务。 `进程`之间相互独立，任一时刻，CPU总是运行一个`进程`，其他`进程`处于非运行状态。 CPU使用时间片轮转进度算法来实现同时运行多个`进程`。

## 线程

![线程](https://user-gold-cdn.xitu.io/2019/8/20/16caca3ddb0197b8?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

一个车间里，可以有很多工人，共享车间所有的资源，他们协同完成一个任务。

`线程`就好比车间里的工人，一个`进程`可以包括多个`线程`，多个`线程`共享`进程`资源。

## CPU、进程、线程之间的关系

从上文我们已经简单了解了CPU、进程、线程，简单汇总一下。

- `进程`是cpu资源分配的最小单位（是能拥有资源和独立运行的最小单位）
- `线程`是cpu调度的最小单位（线程是建立在进程的基础上的一次程序运行单位，一个进程中可以有多个线程）
- 不同`进程`之间也可以通信，不过代价较大
- `单线程`与`多线程`，都是指在一个`进程`内的单和多

## 浏览器是多进程的

我们已经知道了`CPU`、`进程`、`线程`之间的关系，对于计算机来说，每一个应用程序都是一个`进程`， 而每一个应用程序都会分别有很多的功能模块，这些功能模块实际上是通过`子进程`来实现的。 对于这种`子进程`的扩展方式，我们可以称这个应用程序是`多进程`的。

而对于浏览器来说，浏览器就是多进程的，我在Chrome浏览器中打开了多个tab，然后打开windows控制管理器：

![浏览器是多进程的](https://user-gold-cdn.xitu.io/2019/8/21/16cb1f0a851c86b9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

如上图，我们可以看到一个Chrome浏览器启动了好多个进程。

总结一下：

- 浏览器是多进程的
- 每一个Tab页，就是一个独立的进程

## 浏览器包含了哪些进程

- 主进程
    - 协调控制其他子进程（创建、销毁）
    - 浏览器界面显示，用户交互，前进、后退、收藏
    - 将渲染进程得到的内存中的Bitmap，绘制到用户界面上
    - 处理不可见操作，网络请求，文件访问等
- 第三方插件进程
    - 每种类型的插件对应一个进程，仅当使用该插件时才创建
- GPU进程
    - 用于3D绘制等
- `渲染进程`，就是我们说的`浏览器内核`
    - 负责页面渲染，脚本执行，事件处理等
    - 每个tab页一个渲染进程

那么浏览器中包含了这么多的进程，那么对于普通的前端操作来说，最重要的是什么呢？

答案是`渲染进程`，也就是我们常说的`浏览器内核`

## 浏览器内核（渲染进程）

从前文我们得知，进程和线程是一对多的关系，也就是说一个进程包含了多条线程。

而对于`渲染进程`来说，它当然也是多线程的了，接下来我们来看一下渲染进程包含哪些线程。

- `GUI渲染线程`
    - 负责渲染页面，布局和绘制
    - 页面需要重绘和回流时，该线程就会执行
    - 与js引擎线程互斥，防止渲染结果不可预期
- `JS引擎线程`
    - 负责处理解析和执行javascript脚本程序
    - 只有一个JS引擎线程（单线程）
    - 与GUI渲染线程互斥，防止渲染结果不可预期
- `事件触发线程`
    - 用来控制事件循环（鼠标点击、setTimeout、ajax等）
    - 当事件满足触发条件时，将事件放入到JS引擎所在的执行队列中
- `定时触发器线程`
    - setInterval与setTimeout所在的线程
    - 定时任务并不是由JS引擎计时的，是由定时触发线程来计时的
    - 计时完毕后，通知事件触发线程
- `异步http请求线程`
    - 浏览器有一个单独的线程用于处理AJAX请求
    - 当请求完成时，若有回调函数，通知事件触发线程

当我们了解了渲染进程包含的这些线程后，我们思考两个问题：

1.  为什么 javascript 是单线程的
2.  为什么 GUI 渲染线程为什么与 JS 引擎线程互斥

### 为什么 javascript 是单线程的

首先是历史原因，在创建 javascript 这门语言时，多进程多线程的架构并不流行，硬件支持并不好。

其次是因为多线程的复杂性，多线程操作需要加锁，编码的复杂性会增高。

而且，如果同时操作 DOM ，在多线程不加锁的情况下，最终会导致 DOM 渲染的结果不可预期。

### 为什么 GUI 渲染线程与 JS 引擎线程互斥

这是由于 JS 是可以操作 DOM 的，如果同时修改元素属性并同时渲染界面\(即 `JS线程`和`UI线程`同时运行\)， 那么渲染线程前后获得的元素就可能不一致了。

因此，为了防止渲染出现不可预期的结果，浏览器设定 `GUI渲染线程`和`JS引擎线程`为互斥关系， 当`JS引擎线程`执行时`GUI渲染线程`会被挂起，GUI更新则会被保存在一个队列中等待`JS引擎线程`空闲时立即被执行。

## 从 Event Loop 看 JS 的运行机制

到了这里，终于要进入我们的主题，什么是 Event Loop

先理解一些概念：

- JS 分为同步任务和异步任务
- 同步任务都在JS引擎线程上执行，形成一个`执行栈`
- 事件触发线程管理一个`任务队列`，异步任务触发条件达成，将回调事件放到`任务队列`中
- `执行栈`中所有同步任务执行完毕，此时JS引擎线程空闲，系统会读取`任务队列`，将可运行的异步任务回调事件添加到`执行栈`中，开始执行

![](https://user-gold-cdn.xitu.io/2019/8/21/16cb1d70e5120bea?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

在前端开发中我们会通过`setTimeout/setInterval`来指定定时任务，会通过`XHR/fetch`发送网络请求， 接下来简述一下`setTimeout/setInterval`和`XHR/fetch`到底做了什么事

我们知道，不管是`setTimeout/setInterval`和`XHR/fetch`代码，在这些代码执行时， 本身是同步任务，而其中的回调函数才是异步任务。

当代码执行到`setTimeout/setInterval`时，实际上是`JS引擎线程`通知`定时触发器线程`，间隔一个时间后，会触发一个回调事件， 而`定时触发器线程`在接收到这个消息后，会在等待的时间后，将回调事件放入到由`事件触发线程`所管理的`事件队列`中。

当代码执行到`XHR/fetch`时，实际上是`JS引擎线程`通知`异步http请求线程`，发送一个网络请求，并制定请求完成后的回调事件， 而`异步http请求线程`在接收到这个消息后，会在请求成功后，将回调事件放入到由`事件触发线程`所管理的`事件队列`中。

当我们的同步任务执行完，`JS引擎线程`会询问`事件触发线程`，在`事件队列`中是否有待执行的回调函数，如果有就会加入到执行栈中交给`JS引擎线程`执行

用一张图来解释：

![](https://user-gold-cdn.xitu.io/2019/8/21/16cb1d7433f29c46?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

再用代码来解释一下：

```javascript
let timerCallback = function() {
  console.log('wait one second');
};
let httpCallback = function() {
  console.log('get server data success');
}

// 同步任务
console.log('hello');
// 同步任务
// 通知定时器线程 1s 后将 timerCallback 交由事件触发线程处理
// 1s 后事件触发线程将 timerCallback 加入到事件队列中
setTimeout(timerCallback,1000);
// 同步任务
// 通知异步http请求线程发送网络请求，请求成功后将 httpCallback 交由事件触发线程处理
// 请求成功后事件触发线程将 httpCallback 加入到事件队列中
$.get('www.xxxx.com',httpCallback);
// 同步任务
console.log('world');
//...
// 所有同步任务执行完后
// 询问事件触发线程在事件事件队列中是否有需要执行的回调函数
// 如果没有，一直询问，直到有为止
// 如果有，将回调事件加入执行栈中，开始执行回调代码
复制代码
```

总结一下：

- JS引擎线程只执行执行栈中的事件
- 执行栈中的代码执行完毕，就会读取事件队列中的事件
- 事件队列中的回调事件，是由各自线程插入到事件队列中的
- 如此循环

## 宏任务、微任务

当我们基本了解了什么是执行栈，什么是事件队列之后，我们深入了解一下事件循环中`宏任务`、`微任务`

### 什么是宏任务

我们可以将每次执行栈执行的代码当做是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）， 每一个宏任务会从头到尾执行完毕，不会执行其他。

我们前文提到过`JS引擎线程`和`GUI渲染线程`是互斥的关系，浏览器为了能够使`宏任务`和`DOM任务`有序的进行，会在一个`宏任务`执行结果后，在下一个`宏任务`执行前，`GUI渲染线程`开始工作，对页面进行渲染。

```javascript
// 宏任务-->渲染-->宏任务-->渲染-->渲染．．．
复制代码
```

主代码块，setTimeout，setInterval等，都属于宏任务

**第一个例子：**

```javascript
document.body.style = 'background:black';
document.body.style = 'background:red';
document.body.style = 'background:blue';
document.body.style = 'background:grey';
复制代码
```

我们可以将这段代码放到浏览器的控制台执行以下，看一下效果：

![](https://user-gold-cdn.xitu.io/2019/8/20/16caca3e44d7d357?imageslim)

我们会看到的结果是，页面背景会在瞬间变成灰色，以上代码属于同一次`宏任务`，所以全部执行完才触发`页面渲染`，渲染时`GUI线程`会将所有UI改动优化合并，所以视觉效果上，只会看到页面变成灰色。

**第二个例子：**

```javascript
document.body.style = 'background:blue';
setTimeout(function(){
    document.body.style = 'background:black'
},0)
复制代码
```

执行一下，再看效果：

![](https://user-gold-cdn.xitu.io/2019/8/20/16caca3ed44e6b16?imageslim)

我会看到，页面先显示成蓝色背景，然后瞬间变成了黑色背景，这是因为以上代码属于两次`宏任务`，第一次`宏任务`执行的代码是将背景变成蓝色，然后触发渲染，将页面变成蓝色，再触发第二次宏任务将背景变成黑色。

### 什么是微任务

我们已经知道`宏任务`结束后，会执行渲染，然后执行下一个`宏任务`， 而微任务可以理解成在当前`宏任务`执行后立即执行的任务。

也就是说，当`宏任务`执行完，会在渲染前，将执行期间所产生的所有`微任务`都执行完。

Promise，process.nextTick等，属于`微任务`。

**第一个例子：**

```javascript
document.body.style = 'background:blue'
console.log(1);
Promise.resolve().then(()=>{
    console.log(2);
    document.body.style = 'background:black'
});
console.log(3);
复制代码
```

执行一下，再看效果：

![](https://user-gold-cdn.xitu.io/2019/8/20/16cad85d2378ccb5?imageslim)

控制台输出 1 3 2 , 是因为 promise 对象的 then 方法的回调函数是异步执行，所以 2 最后输出

页面的背景色直接变成黑色，没有经过蓝色的阶段，是因为，我们在宏任务中将背景设置为蓝色，但在进行渲染前执行了微任务， 在微任务中将背景变成了黑色，然后才执行的渲染

**第二个例子：**

```javascript
setTimeout(() => {
    console.log(1)
    Promise.resolve(3).then(data => console.log(data))
}, 0)

setTimeout(() => {
    console.log(2)
}, 0)

// print : 1 3 2
复制代码
```

上面代码共包含两个 setTimeout ，也就是说除主代码块外，共有两个`宏任务`， 其中第一个`宏任务`执行中，输出 1 ，并且创建了`微任务队列`，所以在下一个`宏任务`队列执行前， 先执行`微任务`，在`微任务`执行中，输出 3 ，微任务执行后，执行下一次`宏任务`，执行中输出 2

## 总结

- 执行一个`宏任务`（栈中没有就从`事件队列`中获取）
- 执行过程中如果遇到`微任务`，就将它添加到`微任务`的任务队列中
- `宏任务`执行完毕后，立即执行当前`微任务队列`中的所有`微任务`（依次执行）
- 当前`宏任务`执行完毕，开始检查渲染，然后`GUI线程`接管渲染
- 渲染完毕后，`JS线程`继续接管，开始下一个`宏任务`（从事件队列中获取）

![](https://user-gold-cdn.xitu.io/2019/8/21/16cb1d7bb4bd9fd2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 系列文章推荐

- [「前端进阶」如何优雅的处理图片异常](https://juejin.im/post/6844903901616046093 "https://juejin.im/post/6844903901616046093")
- [「前端进阶」单页路由解析与实现](https://juejin.im/post/6844903890278694919 "https://juejin.im/post/6844903890278694919")
- [「前端进阶」彻底弄懂函数柯里化](https://juejin.im/post/6844903882208837645 "https://juejin.im/post/6844903882208837645")
- [「前端进阶」JS中的栈内存堆内存](https://juejin.im/post/6844903873992196110 "https://juejin.im/post/6844903873992196110")
- [「前端进阶」JS中的内存管理](https://juejin.im/post/6844903869525262349 "https://juejin.im/post/6844903869525262349")
- [「前端进阶」数组乱序](https://juejin.im/post/6844903863812620296 "https://juejin.im/post/6844903863812620296")

## 参考

- [WebKit技术内幕](https://link.juejin.cn/?target=https%3A%2F%2Fbook.douban.com%2Fsubject%2F25910556%2F "https://book.douban.com/subject/25910556/")
- [浏览器都包含哪些进程](https://link.juejin.cn/?target=https%3A%2F%2Fwww.jianshu.com%2Fp%2F1e455a9226ce "https://www.jianshu.com/p/1e455a9226ce")
- [进程与线程的一个简单解释](https://link.juejin.cn/?target=http%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2013%2F04%2Fprocesses_and_threads.html "http://www.ruanyifeng.com/blog/2013/04/processes_and_threads.html")
