/*
 * @Description:获取指定目录下除了index.js
 * @Date: 2021-07-26 13:58:43
 * @LastEditTime: 2021-08-13 13:04:21
 */
const fs = require('fs')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '../../', dir)
}
const getPath = function(path) {
  const template = fs.readdirSync(resolve(path))
  return template.filter((item) => !item.includes('.'))
}
module.exports = getPath
