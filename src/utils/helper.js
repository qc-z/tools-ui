/**
 * 为组件添加安装方法
 * @param {Object} Mod Vue组件
 * @return {Object}
 */

export function installed(Mod) {
  Mod.install = Vue => Vue.component(Mod.name, Mod)
  return Mod
}
