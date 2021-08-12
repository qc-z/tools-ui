/*
 * @Description:
 * @Date: 2021-08-02 11:18:38
 * @LastEditTime: 2021-08-12 21:03:41
 */
const fs = require('fs') //文件模块
const path = require('path')
const ora = require('ora')

const { firstToUpper } = require('../../src/utils/prefix')
const createIndexTemplate = require('../template/createIndexTemplate.js')
// 1. 读取组件库的文件内容
const packages = fs.readdirSync(path.resolve(__dirname + '../../../packages'))
let introduce = ''
const components = []
packages.forEach((item) => {
  if (item.includes('.')) {
    return
  }
  introduce += `import ${firstToUpper(item)} from './${item}' \n`
  components.push(firstToUpper(item))
})
const spinner = ora('组件配置文件生成中...').start()
spinner.start()

// 2. 创建 index.js
fs.writeFileSync(
  path.resolve(__dirname + '../../../packages/index.js'),
  createIndexTemplate(introduce, components)
)
spinner.text = '组件配置文件已生成'
spinner.succeed()
