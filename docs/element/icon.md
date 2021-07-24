# Icon 图标

提供了一套常用的图标集合。

## 使用方法

直接通过设置类名为 `el-icon-iconName` 来使用即可。例如：

:::demo
```html
<template>
  <div>
    <i class="el-icon-edit"></i>
    <i class="el-icon-share"></i>
    <i class="el-icon-delete"></i>
    <el-button type="primary" icon="el-icon-search">搜索</el-button>
  </div>
</template>
<style lang="scss" scoped>
.demo-icon .source > div > i {
  color: #606266;
  margin: 0 20px;
  font-size: 1.5em;
  vertical-align: middle;
}

.demo-icon .source button {
  margin: 0 20px;
}

.page-component .content > ul.icon-list {
  overflow: hidden;
  list-style: none;
  padding: 0!important;
  border: solid 1px #eaeefb;
  border-radius: 4px;
}
.icon-list li {
  float: left;
  width: 16.66%;
  text-align: center;
  height: 120px;
  line-height: 120px;
  color: #666;
  font-size: 13px;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
  margin-right: -1px;
  margin-bottom: -1px;

  &::after {
    display: inline-block;
    content: "";
    height: 100%;
    vertical-align: middle;
  }

  span {
    display: inline-block;
    line-height: normal;
    vertical-align: middle;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
      "Microsoft YaHei", SimSun, sans-serif;
    color: #99a9bf;
    transition: color 0.15s linear;
  }

  i {
    display: block;
    font-size: 32px;
    margin-bottom: 15px;
    color: #606266;
    transition: color 0.15s linear;
  }

  .icon-name {
    display: inline-block;
    padding: 0 3px;
    height: 1em;
  }

  &:hover {
    span,
    i {
      color: rgb(92, 182, 255);
    }
  }
}

</style>

```
:::

## 图标集合
<IconsCount></IconsCount>

