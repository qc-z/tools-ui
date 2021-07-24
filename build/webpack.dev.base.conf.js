const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NotifierPlugin = require('friendly-errors-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, '../examples/main.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue', 'scss'],
    alias: {
      'Vue': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../examples'),
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-webpack-plugin',
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   // eslint检查报告的格式规范
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            // 用babel-loader需要把es6-es5
            presets: [
              '@babel/preset-env'
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.css$/,
        exclude: /^node_modules$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.vue$/,
        exclude: /^node_modules$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /^node_modules$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /^node_modules$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  stats: {children: false},
  plugins: [
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) {
        return chunk.name;
      }
      return chunk.mapModules(m => path.relative(m.context, m.request)).join('_');
    }),
    new webpack.NamedModulesPlugin(),
    // DefinePlugin 允许在 编译时 将你代码中的变量替换为其他值或表达式
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development') //定义编译环境
      }
    }),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      filename: 'index.html', //生成的html存放路径，相对于 path
      template: path.resolve(__dirname, '../public/index.html'), //html模板路径
      hash: true
    }),
    // new ExtractTextPlugin("css/index.css"),
    new ExtractTextPlugin('[name].css'),
    // DllPlugin插件能够快速打包，能把第三方依赖的文件能提前进行预编译打包到一个文件里面去
    new AutoDllPlugin({
      inject: true, // will inject the DLL bundle to index.html
      debug: true,
      filename: '[name]_[hash].js',
      path: './dll',
      entry: {
        vendor: ['vue', 'vue-router', 'vuex', 'element-ui']
      }
    }),
    new VueLoaderPlugin(),
    new NotifierPlugin(),
    new ESLintPlugin({
      fix: true
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendors',
          enforce: true,
          minSize: 50000, // 限制最小大小 ( byte )
        },
      },
      chunks: 'all'
    },
  },
  devServer: {
    port: 8080,
    contentBase: false, //本地服务器所加载的页面所在的目录
    // 编译出错的时候，在浏览器页面上显示错误
    overlay: true,
    //实时刷新
    inline: true,
    stats: {
      assets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      colors: true,
      entrypoints: false,
      hash: false,
      modules: false,
      // timings: false,
      version: false
    }
  }
}
