/**
 * 提供 ::: demo xxx ::: 语法，用于构建 markdown 中的示例
 */
const path = require('path')
const renderDemoBlock = require('./common/render')
const demoBlockContainers = require('./common/containers')
module.exports = (options = {}, ctx) => {
  return {
    name: 'demo-container',
    enhanceAppFiles: path.resolve(__dirname, './enhanceAppFile.js'),
    extendMarkdown: md => {
      md.use(demoBlockContainers(options));
      const id = setInterval(() => {
        const render = md.render;
        if (typeof render.call(md, '') === 'object') {
          md.render = (...args) => {
            let result = render.call(md, ...args);
            const { template, script, style } = renderDemoBlock(result.html);
            result.html = template || '';
            result.dataBlockString = `${script}\n${style}\n${result.dataBlockString}`;
            return result;
          }
          clearInterval(id);
        }
      }, 10);
    }
  }
}