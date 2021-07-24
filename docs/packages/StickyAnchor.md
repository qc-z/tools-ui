# StickyAnchor 锚点
<ClientOnly>

## 基础用法

:::demo

```html

<template>
  <div style="height: 100%;width: 100%;">
    <sticky-anchor :menus="menus">
      <div class="container1 box">1</div>
      <div class="container2 box">2</div>
      <div class="container3 box">3</div>
      <div class="container4 box">4</div>
      <div class="container5 box">5</div>
      <div class="container6 box">6</div>
    </sticky-anchor>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        menus: [
          {label: 'tab1', value: '.container1', content: 'tab1'},
          {label: 'tab2', value: '.container2', content: 'tab2'},
          {label: 'tab3', value: '.container3', content: 'tab3'},
          {label: 'tab4', value: '.container4', content: 'tab4'},
          {label: 'tab5', value: '.container5', content: 'tab5'},
          {label: 'tab6', value: '.container6', content: 'tab6'}
        ]
      }
    }
  }
</script>

<style>
  .box {
    height: 300px;
    width: 100%;
    margin-bottom: 20px;
    background-color: yellow;
  }

  .container1 {
    background-color: red;
  }
</style>

```

:::

## Attributes

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| size     | 尺寸   | string  |   medium / small / mini            |    —     |
| type     | 类型   | string    |   primary / success / warning / danger / info / text |     —    |
| plain     | 是否朴素按钮   | boolean    | — | false   |
| round     | 是否圆角按钮   | boolean    | — | false   |
| circle     | 是否圆形按钮   | boolean    | — | false   |
| loading     | 是否加载中状态   | boolean    | — | false   |
| disabled  | 是否禁用状态    | boolean   | —   | false   |
| icon  | 图标类名 | string   |  —  |  —  |
| autofocus  | 是否默认聚焦 | boolean   |  —  |  false  |
| native-type | 原生 type 属性 | string | button / submit / reset | button |

</ClientOnly>
