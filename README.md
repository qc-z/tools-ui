# tools-ui
## 安装
```html
npm install tools-ui
or
yarn add tools-ui
```


### 全量导入
```js
import ToolsUI from 'tools-ui' // 引入组件库
import 'tools-ui/styles/index.css' // 引入整个组件库的样式文件

Vue.use(ToolsUI)

```
### 按需加载

```js

import { Hello } from "tools-ui"
Vue.use(Hello)
```
**安装`babel-plugin-component`**

在根目录新建`.babelrc`
```yaml
{
  "plugins": [
    [
        "component",
      {
        "libraryName": "tools-ui",
        "libDir": "lib",
        "styleLibrary": {
          "name": "styles",
          "base": false,
          "path": "[module].css"
        }
      }
    ]
  ]
}

```
