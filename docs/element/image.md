# Image 图片
图片容器，在保留原生img的特性下，支持懒加载，自定义占位、加载失败等

## 基础用法

:::demo 可通过`fit`确定图片如何适应到容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)。
```html
<template>
  <div>
    <div class="demo-image">
      <div class="block" v-for="fit in fits" :key="fit">
        <span class="demonstration">{{ fit }}</span>
        <el-image
          style="width: 100px; height: 100px"
          :src="url"
          :fit="fit"></el-image>
      </div>
    </div>
 </div>
</template>

<style lang="scss" scoped>
  .demo-image {
    .block {
      padding: 30px 0;
      text-align: center;
      border-right: solid 1px #eff2f6;
      display: inline-block;
      width: 20%;
      box-sizing: border-box;
      vertical-align: top;
      &:last-child {
        border-right: none;
      }
    }
  
    .demonstration {
      display: block;
      color: #8492a6;
      font-size: 14px;
      margin-bottom: 20px;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      }
    }
  }
</script>
```
:::

## 占位内容

:::demo 可通过`slot = placeholder`可自定义占位内容
```html
<template>
  <div class="demo-image__placeholder">
    <div class="block">
      <span class="demonstration">默认</span>
      <el-image :src="src"></el-image>
    </div>
    <div class="block">
      <span class="demonstration">自定义</span>
      <el-image :src="src">
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </el-image>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .demo-image {
    .block {
      padding: 30px 0;
      text-align: center;
      border-right: solid 1px #eff2f6;
      display: inline-block;
      width: 20%;
      box-sizing: border-box;
      vertical-align: top;
      &:last-child {
        border-right: none;
      }
    }
  
    .demonstration {
      display: block;
      color: #8492a6;
      font-size: 14px;
      margin-bottom: 20px;
    }
  }
  
  .demo-image__placeholder{
    @extend .demo-image;
  
    .block {
      width: 49%;
    }
  
    .el-image {
      width: 300px;
      height: 200px;
    }
  
    .image-slot {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background: #f5f7fa;
      color: #909399;
      font-size: 14px;
    }
    .dot {
          animation: dot 2s infinite steps(3, start);
          overflow: hidden;
        }
  }
  

  
  
</style>

<script>
  export default {
    data() {
      return {
        src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
      }
    }
  }
</script>
```
:::

## 加载失败

:::demo 可通过`slot = error`可自定义加载失败内容
```html
<template>
  <div class="demo-image__error">
    <div class="block">
      <span class="demonstration">默认</span>
      <el-image></el-image>
    </div>
    <div class="block">
      <span class="demonstration">自定义</span>
      <el-image>
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .demo-image {
    .block {
      padding: 30px 0;
      text-align: center;
      border-right: solid 1px #eff2f6;
      display: inline-block;
      width: 20%;
      box-sizing: border-box;
      vertical-align: top;
      &:last-child {
        border-right: none;
      }
    }
  
    .demonstration {
      display: block;
      color: #8492a6;
      font-size: 14px;
      margin-bottom: 20px;
    }
  }
  
.demo-image__error {
  @extend .demo-image;

  .block {
    width: 49%;
  }

  .el-image {
    width: 300px;
    height: 200px;
    &:last-child {
        background-color: #f5f7fa;
        line-height: 200px;
        font-size: 30px;
        color: #c0c4cc;
    }
     .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #909399;
        color: #909399;
        font-size: 30px;
      }
  }
}
</style>

```
:::

## 懒加载

:::demo 可通过`lazy`开启懒加载功能，当图片滚动到可视范围内才会加载。可通过`scroll-container`来设置滚动容器，若未定义，则为最近一个`overflow`值为`auto`或`scroll`的父元素。
```html
<template>
  <div class="demo-image__lazy">
    <el-image v-for="url in urls" :key="url" :src="url" lazy></el-image>
  </div>
</template>

<style lang="scss" scoped>
  .demo-image__lazy {
    height: 400px;
    overflow-y: auto;
  
    .el-image {
      display: block;
      min-height: 200px;
      margin-bottom: 10px;
  
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        urls: [
          'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
          'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
          'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
          'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
          'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
          'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        ]
      }
    }
  }
</script>
```
:::

## 大图预览

:::demo 可通过 `previewSrcList` 开启预览大图的功能。
```html
<template>
  <div class="demo-image__preview">
    <el-image 
      style="width: 100px; height: 100px"
      :src="url" 
      :preview-src-list="srcList">
    </el-image>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ]
      }
    }
  }
</script>
```
:::

## Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| src | 图片源，同原生 | string | — | - |
| fit | 确定图片如何适应容器框，同原生 [object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) | string | fill / contain / cover / none / scale-down | - |
| alt | 原生 alt | string | - | - |
| referrer-policy | 原生 referrerPolicy | string | - | - |
| lazy | 是否开启懒加载 | boolean | — | false |
| scroll-container | 开启懒加载后，监听 scroll 事件的容器 | string / HTMLElement | — | 最近一个 overflow 值为 auto 或 scroll 的父元素 |
| preview-src-list | 开启图片预览功能 | Array | — | - |
| z-index | 设置图片预览的 z-index | Number | — | 2000 |

## Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| load | 图片加载成功触发 | (e: Event) |
| error | 图片加载失败触发 | (e: Error) |

## Slots
| 名称    | 说明         |
|---------|-------------|
| placeholder | 图片未加载的占位内容 |
| error | 加载失败的内容 |


