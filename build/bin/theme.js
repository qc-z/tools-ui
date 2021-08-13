/*
 * @Description: 样式打包gulp配置文件
 * @Date: 2021-07-26 00:17:07
 * @LastEditTime: 2021-08-13 13:00:04
 */

const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const components = require('../utils/getFilePath')('packages')

const path = require('path')
const { namespace } = require(resolve('src/utils/prefix'))
const ora = require('ora')
const spinner = ora('组件样式生成中...').start()
spinner.start()

function resolve(dir) {
  return path.join(__dirname, '../../', dir)
}
function buildCss(cb) {
  gulp
    .src(resolve('src/styles/index.scss'), { allowEmpty: true })
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename('index.css'))
    .pipe(gulp.dest(resolve('lib/styles')))
  cb()
}

function buildSeperateCss(cb) {
  components.forEach((compName) => {
    gulp
      .src(resolve(`src/styles/${compName}.scss`), {
        allowEmpty: true
      })
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cleanCSS())
      .pipe(rename(`${namespace}-${compName}.css`))
      .pipe(gulp.dest(resolve('lib/styles')))
  })
  cb()
  outPut()
}
function outPut() {
  spinner.text = '组件样式已生成'
  spinner.succeed()
}
exports.default = gulp.series(buildCss, buildSeperateCss)
