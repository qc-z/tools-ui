const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const { prefix } = require('../src/utils/prefix')
const ora = require('ora')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 速度分析
// const smp = new SpeedMeasurePlugin()
const { getPath } = require('./getFilePath')
const components = getPath(path.resolve(__dirname, '../packages'))
process.env.NODE_ENV = 'production'
const spinner = ora('组件生成中...').start()
spinner.start()
const basePath = path.resolve(__dirname, '../')
let entries = {}
Object.keys(components).forEach(key => {
  entries[`${prefix.toLocaleLowerCase()}-${key}`] = path.join(
    basePath,
    'packages',
    components[key]
  )
})

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  entry: entries,
  output: {
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/lib/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    // library: 'tools-ui',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    function() {
      this.hooks.done.tap('done', stats => {
        if (
          stats.compilation.errors &&
          stats.compilation.errors.length &&
          process.argv.indexOf('-- watch') === -1
        ) {
          console.log('build error')
          process.exit(1)
        }
        spinner.text = '组件已生成'
        spinner.succeed()
      })
    }
    // 体积分析
    // new BundleAnalyzerPlugin(),
  ],
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  }
})
