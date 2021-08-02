const prettier = require('prettier')
const createIndexTemplate = function(code) {
  const templateCode = `
    ${code}
    const output = {}
    components.forEach(item => (output[item.name] = item))
    export default output
  `
  return prettier.format(templateCode, { parser: 'babel', singleQuote: true })
}
module.exports = createIndexTemplate
