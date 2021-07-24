const merge = require('webpack-merge');
// const path = require('path');
const baseConfig = require('./webpack.dev.base.conf');
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map'
});
