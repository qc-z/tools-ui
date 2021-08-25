# tools-ui

## 安装

```html
npm install tools-ui or yarn add tools-ui
```

### 全量导入

```js
import TUI from 'tools-ui' // 引入组件库
import 'tools-ui/styles/index.css' // 引入整个组件库的样式文件

Vue.use(TUI)
```

### 按需加载

```js
import { TButton } from 'tools-ui'
Vue.use(TButton)
```

**安装`babel-plugin-component`**

在根目录新建`.babelrc`

```yaml
{
  'plugins':
    [
    [
      'component',
      {
        libraryName: 'tools-ui', // 组件库的名字
        camel2Dash: true, // 是否把驼峰转换成xx-xx的写法
        styleLibrary: {
          base: false, // 是否每个组件都默认引用base.css
          name: 'styles' // css目录的名字
        }
      }
    ]
  ]
}
```
