// 导入组件
import MyColorPicker from './src/MyColorPicker.vue'

// 为组件提供 install 安装方法，供按需引入
MyColorPicker.install = function (Vue) {
  Vue.component(MyColorPicker.name, MyColorPicker)
}

// 默认导出组件
export default MyColorPicker
