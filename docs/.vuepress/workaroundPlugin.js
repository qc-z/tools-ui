const fs = require('fs-extra');
const path = require('path');
const globby = require('globby');

module.exports = (options, ctx) => {
  return {
    async ready() {
      const paths = await globby(['styles/**/*.{svg,png,jpg,ttf,woff,woff2}'], {
        cwd: ctx.vuepressDir
      });

      const copyFiles = []
      console.log(paths, 'paths')
      paths.forEach(item => {
        copyFiles.push(
          fs.copy(
            path.resolve(ctx.vuepressDir, item),
            path.resolve(ctx.tempPath, item.replace(/^styles\//, ''))
          )
        )
      })

      await Promise.all(copyFiles)
    }
  }
}
