const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const { getPath } = require('./getFilePath')
const components = getPath('../packages/index')
const { prefix } = require('../src/utils/prefix')

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
}

exports.default = gulp.series(buildCss, buildSeperateCss)
