const sidebar = require('./sidebar')
const nav = require('./nav')
module.exports = {
  title: 'tools-ui',
  description: 'vue组件库',
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.ico'
    }]
  ],
  base: '/tools-ui/',
  port: '7080',
  dest: 'web/tools-ui',
  markdown: {
    lineNumbers: true
  },
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  themeConfig: {
    logo: '/img/logo.png',
    nav: nav,
    sidebar: sidebar,
    sidebarDepth: 2,
    activeHeaderLinks: true,
    // displayAllHeaders: true,
    lastUpdated: 'Last Updated'
  },
  plugins: [
    // ['@vuepress/back-to-top', true],
    ['demo-container'],
    [
      'vuepress-plugin-gotop-plus', {
      // 是否在移动设备上显示(default: true)
      mobileShow: false,
      // 回到页首元素显示触发的高度阈值(default: 50)
      threshold: 50,
      log: false
    }
    ]
  ],
  chainWebpack: (config, isServer) => {
    config.resolve.alias.set('$docs', process.cwd() + '/docs/.vuepress')
    config.resolve.alias.set('$lib', process.cwd() + '/packages')
  }
}
