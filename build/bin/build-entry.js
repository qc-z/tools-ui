/*
 * @Description:
 * @Date: 2021-08-02 11:18:38
 * @LastEditTime: 2021-08-02 13:41:30
 */
const fs = require('fs') //文件模块
const path = require('path')
const chalk = require('chalk')

const { firstToUpper } = require('../../src/utils/prefix')
const createIndexTemplate = require('../template/createIndexTemplate.js')
// 1. 读取组件库的文件内容
const packages = fs.readdirSync(path.resolve(__dirname + '../../../packages'))
let introduce = ''
// const components = []
packages.forEach(item => {
  if (item.includes('.')) {
    return
  }
  console.log(item)
  introduce += `import ${firstToUpper(item)} from './${item}'`
  // import Button from './button'
  // import Input from './input'
  // const components = [Button, Input]
})
console.log(chalk.blue(introduce))

// 2. 创建 index.js
fs.writeFileSync(
  path.resolve(__dirname + '../../../packages/test.js'),
  createIndexTemplate()
)
