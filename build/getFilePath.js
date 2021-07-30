const fs = require('fs')
const path = require('path')
exports.getPath = function() {
  const template = fs.readdirSync(
    path.resolve(__dirname, '../packages/components')
  )
  const components = {}
  template.forEach(key => {
    if (key === 'index.js') return
    components[key] = `components/${key}/index.js`
  })
  return components
}
