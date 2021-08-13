/*
 * @Description:组件打包webpack配置文件
 * @Date: 2021-08-13 01:13:22
 * @LastEditTime: 2021-08-13 11:39:12
 */
const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('../config/webpack.base.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 速度分析
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const smp = new SpeedMeasurePlugin()
// 体积分析
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ora = require('ora')
function resolve(dir = '.') {
  return path.join(__dirname, '../../', dir)
}
// 入口文件
const entries = require('../utils/getComponents')(resolve('packages'))

process.env.NODE_ENV = 'production'
const spinner = ora('组件生成中...').start()
spinner.start()

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  entry: entries,
  output: {
    path: resolve('lib'),
    publicPath: '/lib/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    library: 'tools-ui',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new CleanWebpackPlugin(['lib/'], {
      root: resolve(),
      verbose: true,
      dry: false
    }),
    function() {
      this.hooks.done.tap('done', (stats) => {
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
