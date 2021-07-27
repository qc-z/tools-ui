import components from './components'
import clickoutside from './directive/clickoutside'

const directives = {clickoutside}
const install = function (Vue) {
  // 判断是否安装过
  if (install.installed) return;
  // 注册组件
  console.log(components)
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
  // 添加全局资源(指令)
  Object.keys(directives).forEach(key => {
    Vue.directive(key, directives[key])
  })
}
// 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  install,
  components
}
export default install
