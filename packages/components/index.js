const files = require.context('.', true, /\.js$/)

let configRouters = [], components = {};
/**
 * inject routers
 */
files.keys().forEach(key => {
  if (key === './index.js') return
  const com = files(key).default
  configRouters = configRouters.concat(com) // 读取出文件中的default模块
  components[com.name] = com
})
export default components
