const path = require('path')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const baseConfig = require('./webpack.base')
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const smp = new SpeedMeasurePlugin()

// smp.wrap()
module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    app: path.resolve(__dirname, '../packages/index.js')
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: 'index.js',
    chunkFilename: '[id].js',
    libraryExport: 'default',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new CleanWebpackPlugin(['lib/'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false
    }),
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
