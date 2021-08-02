const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const { getPath } = require('./getFilePath')
const path = require('path')
const components = getPath(path.resolve(__dirname, '../packages'))
const { prefix } = require('../src/utils/prefix')
const ora = require('ora')
const spinner = ora('组件样式生成中...').start()
spinner.start()
function buildCss(cb) {
  gulp
    .src('../packages/styles/index.scss', { allowEmpty: true })
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename('index.css'))
    .pipe(gulp.dest('../lib/styles'))
  cb()
}

function buildSeperateCss(cb) {
  Object.keys(components).forEach(compName => {
    gulp
      .src(`../packages/styles/${compName}.scss`, {
        allowEmpty: true
      })
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(cleanCSS())
      .pipe(rename(`${prefix.toLocaleLowerCase()}-${compName}.css`))
      .pipe(gulp.dest('../lib/styles'))
  })
  cb()
  outPut()
}
function outPut() {
  spinner.text = '组件样式已生成'
  spinner.succeed()
}
exports.default = gulp.series(buildCss, buildSeperateCss)
