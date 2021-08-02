const prettier = require('prettier')
const createIndexTemplate = function(introduce, components) {
  const templateCode = `
    // 此文件由 build/bin/build-entry.js生成
    ${introduce}
    const components = [${components}]
    const output = {}
    components.forEach(item => (output[item.name] = item))
    export default output
  `
  return prettier.format(templateCode, { parser: 'babel', singleQuote: true })
}
module.exports = createIndexTemplate
