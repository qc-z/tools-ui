const fs = require('fs')
exports.getPath = function(path) {
  const template = fs.readdirSync(path)
  const components = {}
  template.forEach(key => {
    if (key === 'index.js') return
    components[key] = `${key}/index.js`
  })
  return components
}
