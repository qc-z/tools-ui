/**
 *
 * @param fn
 * @param context
 */
Array.prototype.myFilter = function (fn, context) {
  if (typeof fn !== 'function') {
    throw new TypeError('no a function')
  }
  const arr = this
  const results = []
  for (let i = 0; i < arr.length; i++) {
    const flag = fn.call(context, arr[i], i, arr)
    flag && results.push(arr[i])
  }
  return results
}

Function.prototype.myBind = function () {
  const self = this,                        // 保存原函数
    context = [].shift.call(arguments), // 保存需要绑定的this上下文
    args = Array.from(arguments).slice()
  Array.prototype.slice.call(arguments);    // 剩余的参数转为数组
  return function () {                    // 返回一个新函数
    self.apply(context, [].concat.call(args, [].slice.call(arguments)));
  }
}
