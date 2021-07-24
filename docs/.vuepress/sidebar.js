const fs = require('fs')
const path = require('path')

function sort(array) {
  array.sort(function (a, b) {
    return a > b ? 1 : -1
  })
  return array
}

function createMenus(title, children, isSort = true) {
  return {
    title: title,
    collapsable: true,
    children: isSort ? sort(children) : children
  }
}

function getFilesName(path1) {
  const files = fs.readdirSync(path.resolve(__dirname, path1))
  const configRouters = files.filter(item => item.toLocaleLowerCase() !== 'readme.md')
  return configRouters
}


module.exports = {
  '/element/': [
    createMenus('Basic', [
      'layout',
      'container',
      'color',
      'typography',
      'border',
      'icon',
      'button',
      'link'
    ]),
    createMenus('Form', [
      'radio',
      'checkbox',
      'input',
      'input-number',
      'select',
      'cascader',
      'switch',
      'slider',
      'time-picker',
      'date-picker',
      'datetime-picker',
      'upload',
      'rate',
      'color-picker',
      'transfer',
      'form'
    ]),
    createMenus('Data', [
      'table',
      'tag',
      'progress',
      'tree',
      'pagination',
      'badge'
    ]),
    createMenus('Notice', [
      'alert',
      'loading',
      'message',
      'message-box',
      'notification'
    ]),
    createMenus('Navigation', [
      'menu',
      'tabs',
      'breadcrumb',
      'page-header',
      'dropdown',
      'steps'
    ]),
    createMenus('Others', [
      'dialog',
      'tooltip',
      'popover',
      'popconfirm',
      'card',
      'carousel',
      'collapse',
      'timeline',
      'divider',
      'calendar',
      'image',
      'backtop',
      'infiniteScroll',
      'drawer'
    ])
  ],
  '/packages/': [
    createMenus('基础组件', getFilesName('../packages'))
  ],
  '/notes/': [
    createMenus('构建笔记', getFilesName('../notes'))
  ]
}
