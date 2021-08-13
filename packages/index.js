// 此文件由 build/bin/build-entry.js生成
import Button from './button'
import Input from './input'

import config from '../package.json'
const components = [Button, Input]
const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
// 自动安装 (用于script标签引入)
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
// 必须包含一个install方法
export default {
  Button,
  Input,
  version: config.version,
  install
}
