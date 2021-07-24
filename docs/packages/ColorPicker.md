# 颜色拾取器

## 基础用法

::: demo

```html

<template>
  <my-color-picker :value="value" @change="val=>value=val"></my-color-picker>
</template>
<script>
  export default {
    data() {
      return {
        value: ''
      }
    }
  }
</script>
```

:::

## 禁用状态

::: demo

```html

<template>
  <my-button></my-button>
</template>
<script>
  export default {
    data() {
      return {
        value: ''
      }
    }
  }
</script>
```

:::
