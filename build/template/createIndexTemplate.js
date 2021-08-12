const prettier = require('prettier')
const createIndexTemplate = function(introduce, components) {
  const templateCode = `
    // 此文件由 build/bin/build-entry.js生成
    ${introduce}
    import config from '../package.json'
    const components = [${components}]
    const install = function(Vue) {
      components.forEach((component) => {
        Vue.component(component.name, component)
      })
    }
    // 自动安装 (用于script标签引入)
    if (typeof window !== 'undefined' && window.Vue) {
      install(window.Vue)
     }
     // 必须包含一个install方法
     export default {
      ${components},
       version: config.version,
       install
     }
  `
  return prettier.format(templateCode, { parser: 'babel', singleQuote: true })
}
module.exports = createIndexTemplate
