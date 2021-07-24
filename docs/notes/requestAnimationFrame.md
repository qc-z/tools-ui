# requestAnimationFrame用法

本文整理记录较早，有些内容理解其实也不透彻，甚至会造成误解。本文可作为参考，但是有些细节需要读者自行甄别。

> 后面有时间了会重新学习并整理。

---

随着技术与设备的发展，用户的终端对动画的表现能力越来越强，更多的场景开始大量使用动画。在 Web 应用中，实现动画效果的方法比较多，JavaScript 中可以通过定时器 `setTimeout` 来实现，css3 可以使用 `transition` 和`animation` 来实现，html5 中的 `canvas` 也可以实现。除此之外，html5 还提供一个专门用于请求动画的 API，即 `requestAnimationFrame`

> 本文内容均非原创，而是在知识点的收集与搬运中学习与理解，也欢迎大家收集与搬运本篇文章！

### 1\. 是什么

- HTML5 新增加的 API，类似于 `setTimeout` 定时器

- `window` 对象的一个方法，`window.requestAnimationFrame`
  ```js
partial interface Window {
long requestAnimationFrame(FrameRequestCallback callback);
void cancelAnimationFrame(long handle);
};
```

- 浏览器\(所以只能在浏览器中使用\)专门为动画提供的 API，让 DOM 动画、Canvas 动画、SVG 动画、WebGL 动画等有一个统一的刷新机制

### 2\. 做什么

> - 浏览器重绘频率一般会和显示器的刷新率保持同步。大多数浏览器采取 W3C 规范的建议，浏览器的渲染页面的标准帧率也为 60FPS（frames/ per second）

- **按帧对网页进行重绘**。该方法告诉浏览器希望执行动画并请求浏览器在下一次重绘之前调用回调函数来更新动画

- **由系统来决定回调函数的执行时机**，在运行时浏览器会自动优化方法的调用

    - 显示器有固定的刷新频率（60Hz 或 75Hz），也就是说，每秒最多只能重绘 60 次或 75 次，`requestAnimationFrame` 的基本思想**让页面重绘的频率与这个刷新频率保持同步**

      比如显示器屏幕刷新率为 60Hz，使用`requestAnimationFrame` API，那么回调函数就每`1000ms / 60 ≈ 16.7ms`执行一次；如果显示器屏幕的刷新率为 75Hz，那么回调函数就每`1000ms / 75 ≈ 13.3ms`执行一次。

    - 通过`requestAnimationFrame`调用回调函数引起的页面重绘或回流的时间间隔和显示器的刷新时间间隔相同。所以 `requestAnimationFrame` 不需要像`setTimeout`那样传递时间间隔，而是浏览器通过系统获取并使用显示器刷新频率

      比如一个动画，宽度从 0px 加一递增到 100px。无缓动效果的情况下，浏览器重绘一次，宽度就加 1。

### 3\. 用法

> 动画帧请求回调函数列表：每个 Document 都有一个动画帧请求回调函数列表，该列表可以看成是由`<handle, callback>`元组组成的集合。
>
> - `handle` 是一个整数，唯一地标识了元组在列表中的位置，`cancelAnimationFrame()`可以通过它停止动画
> - `callback` 是一个无返回值的、形参为一个时间值的函数（该时间值为由浏览器传入的从 1970 年 1 月 1 日到当前所经过的毫秒数）。
> - 刚开始该列表为空。

---

> [页面可见性 API](https://link.juejin.cn/?target=https%3A%2F%2Fwww.w3.org%2FTR%2Fpage-visibility%2F "https://www.w3.org/TR/page-visibility/")
>
> - 当页面被最小化或者被切换成后台标签页时，页面为不可见，浏览器会触发一个`visibilitychange`事件，并设置`document.hidden`属性为`true`
> - 当页面切换到显示状态，页面变为可见，同时触发一个`visibilitychange`事件，设置`document.hidden`属性为`false`

- 调用操作。与`setTimeout`相似，但是不需要设置间隔时间，使用一个回调函数作为参数，返回一个大于 0 的整数

  ```js
  handle = requestAnimationFrame(callback);
  复制代码
  ```

    - 参数`callback`，是一个回调函数，在下次重新绘制动画时调用。该回调函数接收唯一参数，是一个高精度时间戳（`performance.now()`），指触发回调函数的当前时间（不用手动传入）
    - 返回值是一个`long`型的非零整数，是`requestAnimationFrame`回调函数列表中唯一的标识，表示定时器的编号，无其他意义

- 取消操作

  ```js
  cancelAnimationFrame(handle);
  复制代码
  ```

    - 参数是调用`requestAnimationFrame`时的返回值
    - 取消操作没有返回值

- 浏览器执行过程

    - 首先判断`document.hidden`属性是否为`true`（页面是否可见），页面处于可见状态才会执行后面步骤

    - 浏览器清空上一轮的动画函数

    - `requestAnimationFrame`将回调函数追加到动画帧请求回调函数列表的末尾

      当执行`requestAnimationFrame(callback)`的时候，不会立即调用 callback 函数，只是将其放入队列。每个回调函数都有一个布尔标识`cancelled`，该标识初始值为`false`，并且对外不可见。

    - 当浏览器再执行列表中的回调函数的时候，判断每个元组的 callback 的`cancelled`，如果为`false`，则执行 callback

      当页面可见并且**动画帧请求回调函数列表**不为空，浏览器会定期将这些回调函数加入到浏览器 UI 线程的队列中

    - 博客园上[yyc 元超](https://link.juejin.cn/?target=https%3A%2F%2Fhome.cnblogs.com%2Fu%2Fchaogex%2F "https://home.cnblogs.com/u/chaogex/")的文章[深入理解 requestAnimationFrame](https://link.juejin.cn/?target=https%3A%2F%2Fwww.cnblogs.com%2Fchaogex%2Fp%2F3960175.html%23explain "https://www.cnblogs.com/chaogex/p/3960175.html#explain")中提供了让一个伪代码，用来说明“采样所有动画”任务的执行步骤

      ```js
      var list = {};
      var browsingContexts = 浏览器顶级上下文及其下属的浏览器上下文;
      for (var browsingContext in browsingContexts) {
      /* !将时间值从 DOMTimeStamp 更改为 DOMHighResTimeStamp 是 W3C 针对基于脚本动画计时控制规范的最新编辑草案中的最新更改，
* 并且某些供应商仍将其作为 DOMTimeStamp 实现。
* 较早版本的 W3C 规范使用 DOMTimeStamp，允许你将 Date.now 用于当前时间。
* 如上所述，某些浏览器供应商可能仍实现 DOMTimeStamp 参数，或者尚未实现 window.performance.now 计时函数。
* 因此需要用户进行polyfill
  */
  var time = DOMHighResTimeStamp   //从页面导航开始时测量的高精确度时间。DOMHighResTimeStamp 以毫秒为单位，精确到千分之一毫秒。此时间值不直接与 Date.now() 进行比较，后者测量自 1970 年 1 月 1 日至今以毫秒为单位的时间。如果你希望将 time 参数与当前时间进行比较，请使用当前时间的 window.performance.now。
  var d = browsingContext 的 active document;   //即当前浏览器上下文中的Document节点
  //如果该active document可见
  if (d.hidden !== true) {
  //拷贝 active document 的动画帧请求回调函数列表到 list 中，并清空该列表
  var doclist = d的动画帧请求回调函数列表
  doclist.appendTo(list);
  clear(doclist);
  }
  //遍历动画帧请求回调函数列表的元组中的回调函数
  for (var callback in list) {
  if (callback.cancelled !== true) {
  try {
  //每个 browsingContext 都有一个对应的 WindowProxy 对象，WindowProxy 对象会将 callback 指向 active document 关联的 window 对象。
  //传入时间值time
  callback.call(window, time);
  }
  //忽略异常
  catch (e) {
  }
  }
  }
  }
  复制代码
   ```

- 当调用`cancelAnimationFrame(handle)`时，浏览器会设置该 handle 指向的回调函数的`cancelled`为`true`（无论该回调函数是否在动画帧请求回调函数列表中）。如果该 handle 没有指向任何回调函数，则什么也不会发生。

- 递归调用。要想实现一个完整的动画，应该在回调函数中递归调用回调函数

  ```js
  let count = 0;
  let rafId = null;
  /**
* 回调函数
* @param time requestAnimationFrame 调用该函数时，自动传入的一个时间
  */
  function requestAnimation(time) {
  console.log(time);
  // 动画没有执行完，则递归渲染
  if (count < 50) {
  count++;
  // 渲染下一帧
  rafId = requestAnimationFrame(requestAnimation);
  }
  }
  // 渲染第一帧
  requestAnimationFrame(requestAnimation);
  复制代码
  ```

- 如果在执行回调函数或者 Document 的动画帧请求回调函数列表被清空之前多次调用 `requestAnimationFrame` 调用同一个回调函数，那么列表中会有多个元组指向该回调函数（它们的 handle 不同，但 `callback` 都为该回调函数），“采集所有动画”任务会执行多次该回调函数。（类比定时器`setTimeout`）

  ```js
  function counter() {
  let count = 0;
  function animate(time) {
    if (count < 50) {
      count++;
      console.log(count);
      requestAnimationFrame(animate);
    }
  }
  requestAnimationFrame(animate);
  }
  btn.addEventListener("click", counter, false);
  复制代码
  ```

- 多次点击按钮，会发现打印出来多个序列数值（下图中，连续触发三次，打印了三个有序列）

  ![多次调用回调函数](https://user-gold-cdn.xitu.io/2019/1/14/1684ce0619bd4dcd?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- 如果是作用于动画，动画会出现突变的情况

### 4\. 兼容性

- 国际惯例 [caniuse](https://link.juejin.cn/?target=https%3A%2F%2Fcaniuse.com%2F%23search%3DrequestAnimationFrame "https://caniuse.com/#search=requestAnimationFrame")
- [MDN\(window.requestAnimationFrame\)](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FWindow%2FrequestAnimationFrame%23%25E6%25B5%258F%25E8%25A7%2588%25E5%2599%25A8%25E5%2585%25BC%25E5%25AE%25B9%25E6%2580%25A7 "https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7")
- 现代浏览器版本包括移动端基本支持，难免使用祖传版本，所以还是要进行下**优雅降级**处理

> 来源：[Polyfill for requestAnimationFrame/cancelAnimationFrame](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fdarius%2FrequestAnimationFrame "https://github.com/darius/requestAnimationFrame")

在浏览器初次加载的时候执行下面的代码即可。

```js
// 使用 Date.now 获取时间戳性能比使用 new Date().getTime 更高效
if (!Date.now)
  Date.now = function() {
    return new Date().getTime();
  };

(function() {
  "use strict";

  var vendors = ["webkit", "moz"];
  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
    var vp = vendors[i];
    window.requestAnimationFrame = window[vp + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
      window[vp + "CancelAnimationFrame"] ||
      window[vp + "CancelRequestAnimationFrame"];
  }
  // 上面方法都不支持的情况，以及IOS6的设备
  // 使用 setTimeout 模拟实现
  if (
    /iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) ||
    !window.requestAnimationFrame ||
    !window.cancelAnimationFrame
  ) {
    var lastTime = 0;
    // 和通过时间戳实现节流功能的函数相似
    window.requestAnimationFrame = function(callback) {
      var now = Date.now();
      var nextTime = Math.max(lastTime + 16, now);
      // 实际上第1帧是不准确的，首次nextTime - now = 0
      return setTimeout(function() {
        callback((lastTime = nextTime));
      }, nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
  }
})();
复制代码
```

### 5\. 优势

`requestAnimationFrame`采用系统时间间隔，保持最佳绘制效率。不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间过长，使动画卡顿。

从实现的功能和使用方法上，`requestAnimationFrame`与定时器`setTimeout`都相似，所以说其优势是同`setTimeout`实现的动画相比。

#### a. 提升性能，防止掉帧

> - 浏览器 UI 线程：浏览器让执行 JavaScript 和更新用户界面（包括重绘和回流）共用同一个单线程，称为“浏览器 UI 线程”
> - 浏览器 UI 线程的工作基于一个简单的队列系统，任务会被保存到队列中直到进程空闲。一旦空闲，队列中的下一个任务就被重新提取出来并运行。这些任务要么是运行 JavaScript 代码，要么执行 UI 更新。

- 通过`setTimeout`实现动画

    - `setTimeout`通过设置一个间隔时间不断改变图像，达到动画效果。该方法在一些低端机上会出现卡顿、抖动现象。这种现象一般有两个原因：

        - `setTimeout`的执行时间并不是确定的。

          在 JavaScript 中，`setTimeout`任务被放进异步队列中，只有当主线程上的任务执行完以后，才会去检查该队列的任务是否需要开始执行。所以，**`setTimeout`的实际执行时间一般比其设定的时间晚一些**。这种运行机制决定了时间间隔参数实际上只是指定了把动画代码添加到【浏览器 UI 线程队列】中以等待执行的时间。如果队列前面已经加入了其他任务，那动画代码就要等前面的任务完成后再执行

          ```js
          let startTime = performance.now();
          setTimeout(() => {
  let endTime = performance.now();
  console.log(endTime - startTime);
  }, 50);
  /* 一个非常耗时的任务 */
  for (let i = 0; i < 20000; i++) {
  console.log(0);
  }
  复制代码
  ```

      ![定时器](https://user-gold-cdn.xitu.io/2019/1/14/1684ce0619a26535?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

    - 刷新频率受屏幕分辨率和屏幕尺寸影响，不同设备的屏幕刷新率可能不同，`setTimeout`只能设置固定的时间间隔，这个时间和屏幕刷新间隔可能不同

    - 以上两种情况都会导致`setTimeout`**的执行步调和屏幕的刷新步调不一致**，从而引起**丢帧**现象。

        - `setTimeout`**的执行只是在内存中对图像属性进行改变，这个改变必须要等到下次浏览器重绘时才会被更新到屏幕上**。如果和屏幕刷新步调不一致，就可能导致中间某些帧的操作被跨越过去，直接更新下下一帧的图像。

          假如使用定时器设置间隔 10ms 执行一个帧，而浏览器刷新间隔是 16.6ms（即 60FPS）

          ![丢帧](https://user-gold-cdn.xitu.io/2019/3/5/1694cac2cf97812b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

          由图可知，在 20ms 时，`setTimeout`调用回调函数在内存中将图像的属性进行了修改，但是此时浏览器下次刷新是在 33.2ms 的时候，所以 20ms 修改的图像没有更新到屏幕上。 而到了 30ms 的时候，`setTimeout`又一次调用回调函数并改变了内存中图像的属性，之后浏览器就刷新了，20ms 更新的状态被 30ms 的图像覆盖了，屏幕上展示的是 30ms 时的图像，所以 20ms 的这一帧就丢失了。丢失的帧多了，画面就卡顿了。

- 使用 `requestAnimationFrame` 执行动画，最大优势是**能保证回调函数在屏幕每一次刷新间隔中只被执行一次**，这样就不会引起丢帧，动画也就不会卡顿

#### b. 节约资源，节省电源

- 使用 `setTimeout` 实现的动画，当页面被隐藏或最小化时，定时器`setTimeout`仍在后台执行动画任务，此时刷新动画是完全没有意义的（实际上 FireFox/Chrome 浏览器对定时器做了优化：页面闲置时，如果时间间隔小于 1000ms，则停止定时器，与`requestAnimationFrame`行为类似。如果时间间隔>=1000ms，定时器依然在后台执行）

  ```js
  // 在浏览器开发者工具的Console页执行下面代码。
  // 当开始输出count后，切换浏览器tab页，再切换回来，可以发现打印的值没有停止，甚至可能已经执行完了
  let count = 0;
  let timer = setInterval(() => {
  if (count < 20) {
    count++;
    console.log(count);
  } else {
    clearInterval(timer);
    timer = null;
  }
  }, 2000);
  复制代码
  ```

- 使用`requestAnimationFrame`，当页面处于未激活的状态下，该页面的屏幕刷新任务会被系统暂停，由于`requestAnimationFrame`保持和屏幕刷新同步执行，所以也会被暂停。当页面被激活时，动画从上次停留的地方继续执行，节约 CPU 开销。

  ```js
  // 在浏览器开发者工具的Console页执行下面代码。
  // 当开始输出count后，切换浏览器tab页，再切换回来，可以发现打印的值从离开前的值继续输出
  let count = 0;
  function requestAnimation() {
  if (count < 500) {
    count++;
    console.log(count);
    requestAnimationFrame(requestAnimation);
  }
  }
  requestAnimationFrame(requestAnimation);
  复制代码
  ```

#### c. 函数节流

- 一个刷新间隔内函数执行多次时没有意义的，因为显示器每 16.7ms 刷新一次，多次绘制并不会在屏幕上体现出来
- 在高频事件（`resize`，`scroll`等）中，使用`requestAnimationFrame`可以防止在一个刷新间隔内发生多次函数执行，这样保证了流畅性，也节省了函数执行的开销
- 某些情况下可以直接使用`requestAnimationFrame`替代 Throttle 函数，都是限制回调函数执行的频率

### 6\. 应用

- 简单的进度条动画

  ```js
  function loadingBar(ele) {
  // 使用闭包保存定时器的编号
  let handle;
  return () => {
    // 每次触发将进度清空
    ele.style.width = "0";
    // 开始动画前清除上一次的动画定时器
    // 否则会开启多个定时器
    cancelAnimationFrame(handle);
    // 回调函数
    let _progress = () => {
      let eleWidth = parseInt(ele.style.width);
      if (eleWidth < 200) {
        ele.style.width = `${eleWidth + 5}px`;
        handle = requestAnimationFrame(_progress);
      } else {
        cancelAnimationFrame(handle);
      }
    };
    handle = requestAnimationFrame(_progress);
  };
  }
  复制代码
  ```

- 添加缓动效果，实现一个元素块按照三阶贝塞尔曲线的`ease-in-out`缓动特效参数运动。[如何使用 Javascript 实现缓动特效](https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F25676357 "https://zhuanlan.zhihu.com/p/25676357")

> [缓动动画](https://link.juejin.cn/?target=https%3A%2F%2Feasings.net%2Fzh-cn "https://easings.net/zh-cn")：指定动画效果在执行时的速度，使其看起来更加真实。

```js
/**
 * @param {HTMLElement} ele 元素节点
 * @param {number} change 改变量
 * @param {number} duration 动画持续时长
 */
function moveBox(ele, change, duration) {
  // 使用闭包保存定时器标识
  let handle;
  // 返回动画函数
  return () => {
    // 开始时间
    let startTime = performance.now();
    // 防止启动多个定时器
    cancelAnimationFrame(handle);
    // 回调函数
    function _animation() {
      // 这一帧开始的时间
      let current = performance.now();
      let eleTop = ele.offsetLeft;
      // 这一帧内元素移动的距离
      let left = change * easeInOutCubic((current - startTime) / duration);
      ele.style.left = `${~~left}px`;
      // 判断动画是否执行完
      if ((current - startTime) / duration < 1) {
        handle = requestAnimationFrame(_animation);
      } else {
        cancelAnimationFrame(handle);
      }
    }
    // 第一帧开始
    handle = requestAnimationFrame(_animation);
  };
}
/**
 * 三阶贝塞尔曲线ease-in-out
 * @param {number} k
 */
function easeInOutCubic(k) {
  return (k *= 2) < 1 ? 0.5 * k * k * k : 0.5 * ((k -= 2) * k * k + 2);
}
复制代码
```

### 7\. 相关

> 本文内容均非原创，而是在知识点的收集与搬运中学习与理解，也欢迎大家收集与搬运本篇文章！

- [developer.mozilla.org/zh-CN/docs/…](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FWindow%2FrequestAnimationFrame "https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame")
- [caniuse.com/#search=req…](https://link.juejin.cn/?target=https%3A%2F%2Fcaniuse.com%2F%23search%3DrequestAnimationFrame "https://caniuse.com/#search=requestAnimationFrame")
- [www.zhangxinxu.com/wordpress/2…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.zhangxinxu.com%2Fwordpress%2F2013%2F09%2Fcss3-animation-requestanimationframe-tween-%25E5%258A%25A8%25E7%2594%25BB%25E7%25AE%2597%25E6%25B3%2595%2F "https://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-%E5%8A%A8%E7%94%BB%E7%AE%97%E6%B3%95/")
- [javascript.ruanyifeng.com/htmlapi/req…](https://link.juejin.cn/?target=https%3A%2F%2Fjavascript.ruanyifeng.com%2Fhtmlapi%2Frequestanimationframe.html "https://javascript.ruanyifeng.com/htmlapi/requestanimationframe.html")
- [www.cnblogs.com/xiaohuochai…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.cnblogs.com%2Fxiaohuochai%2Fp%2F5777186.html "https://www.cnblogs.com/xiaohuochai/p/5777186.html")
- [juejin.im/post/684490…](https://juejin.im/post/6844903649366245384 "https://juejin.im/post/6844903649366245384")
- [www.cnblogs.com/chaogex/p/3…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.cnblogs.com%2Fchaogex%2Fp%2F3960175.html%23explain "https://www.cnblogs.com/chaogex/p/3960175.html#explain")
- [www.softwhy.com/article-720…](https://link.juejin.cn/?target=http%3A%2F%2Fwww.softwhy.com%2Farticle-7204-1.html "http://www.softwhy.com/article-7204-1.html")
- [easings.net/zh-cn#](https://link.juejin.cn/?target=https%3A%2F%2Feasings.net%2Fzh-cn%23 "https://easings.net/zh-cn#")
- [zhuanlan.zhihu.com/p/25676357](https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F25676357 "https://zhuanlan.zhihu.com/p/25676357")
- [www.cnblogs.com/onepixel/p/…](https://link.juejin.cn/?target=https%3A%2F%2Fwww.cnblogs.com%2Fonepixel%2Fp%2F7078617.html "https://www.cnblogs.com/onepixel/p/7078617.html")
