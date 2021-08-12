import install from '../packages/index'
import config from '../package.json'

// 自动安装 (用于script标签引入)
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// 必须包含一个install方法
export default {
  version: config.version,
  install
}
