import components from '@packages'
import clickoutside from '@/directive/clickoutside'
import config from '../package.json'

const directives = { clickoutside }
const install = function(Vue) {
  // 判断是否安装过
  if (install.installed) return
  // 注册组件
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
  // 添加全局资源(指令)
  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
  })
}
// 自动安装 (用于script引入)
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
// 必须包含一个install方法
export default {
  version: config.version,
  ...components,
  install
}
