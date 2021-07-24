const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const baseConfig = require('./webpack.prod.base.conf');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap(merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: []
  },
  plugins: [
    new CleanWebpackPlugin(['lib/'], {
      root: path.resolve(__dirname, '../'),
      verbose: true,
      dry: false
    }),
    function () {
      this.hooks.done.tap('done', (stats) => {
        if (stats.compilation.errors &&
          stats.compilation.errors.length && process.argv.indexOf('-- watch') === -1)
        {
          console.log('build error');
          process.exit(1);
        }
      })
    }
    // 体积分析
    // new BundleAnalyzerPlugin(),
  ]
}))
