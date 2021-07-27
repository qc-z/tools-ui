/**
 * 防抖函数
 * @param {function} fn 事件处理函数
 * @param {number} [delay=20] 延迟时间
 * @param {boolean} [isImmediate=false] 是否立刻执行
 * @param {object} [context=this] 上下文对象
 * @returns {Function} 事件处理函数
 */
export function debounce(fn, delay = 20, isImmediate = false, context = this) {
  // 使用闭包，保存执行状态，控制函数调用顺序
  let timer;

  return function () {
    const _args = [].slice.call(arguments)

    clearTimeout(timer);

    const _fn = function () {
      timer = null;
      if (!isImmediate) fn.apply(context, _args);
    };

    // 是否滚动时立刻执行
    const callNow = !timer && isImmediate;

    timer = setTimeout(_fn, delay);

    if (callNow) fn.apply(context, _args);
  }
}

/**
 * 节流函数
 * @param {function} fn 事件处理函数
 * @param {object} [context=this] 上下文对象
 * @param {boolean} [isImmediate=false] 是否立刻执行
 * @returns {Function} 事件处理函数
 */
export function throttle(fn, context = this, isImmediate = false) {
  let isLocked;
  return function () {
    const _args = arguments

    if (isLocked) return

    isLocked = true
    raFrame(function () {
      isLocked = false;
      fn.apply(context, _args)
    })

    isImmediate && fn.apply(context, _args)
  }
}

// requestAnimationFrame 适配函数
const raFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
  return window.setTimeout(callback, 1000 / 60);
};


/**
 * 为组件添加安装方法
 * @param {Object} Mod Vue组件
 * @return {Object}
 */
export function install(Mod) {
  Mod.install = Vue => Vue.component(Mod.name, Mod);
  return Mod;
}
