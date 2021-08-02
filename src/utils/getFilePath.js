function getPath(path = '.', reg = /\.js$/) {
  const files = require.context(path, true, reg)

  let configRouters = [], components = {};
  files.keys().forEach(key => {
    if (key === './index.js') return
    const com = files(key).default
    configRouters = configRouters.concat(com) // 读取出文件中的default模块
    components[com.name] = com
  })
  return components
}

export default getPath
