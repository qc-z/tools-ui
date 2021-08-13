/*
 * @Description:生成文件中对应键值对 
example:
{
  index: '/Users/qichenggege/Desktop/refactor/packages',
  't-button': '/Users/qichenggege/Desktop/refactor/packages/button',
  't-input': '/Users/qichenggege/Desktop/refactor/packages/input'
}
 * @Date: 2021-08-12 22:07:58
 * @LastEditTime: 2021-08-13 12:05:16
 */

const fs = require('fs')
const path = require('path')
const { namespace } = require(resolve('src/utils/prefix'))

function resolve(dir) {
  return path.join(__dirname, '../../', dir)
}
/**
 * 判断刚路径是否含有index.js
 * @param {String} dir
 */
function hasIndexJs(dir) {
  let dirs = []
  try {
    dirs = fs.readdirSync(dir)
  } catch (e) {
    dirs = null
  }
  return dirs && dirs.includes('index.js')
}

/**
 * 获取指定入口和入口下包含index.js的文件夹的路径
 * @param {String} entryDir
 */
const getPath = function(entryDir) {
  let dirs = fs.readdirSync(entryDir)

  const result = {
    index: entryDir
  }
  dirs
    .filter((dir) => {
      return hasIndexJs(path.resolve(entryDir, dir))
    })
    .forEach((dir) => {
      result[`${namespace}-${dir}`] = path.resolve(entryDir, dir)
    })

  return result
}
module.exports = getPath
