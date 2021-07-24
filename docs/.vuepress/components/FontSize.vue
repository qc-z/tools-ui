<template>
  <table class="demo-typo-size">
    <tbody>
    <tr
    >
      <td>层级</td>
      <td>字体大小</td>
      <td class="color-dark-light">举例</td>
    </tr>
    <tr
      :style="{ fontSize: font_size_extra_small }"
    >
      <td>辅助文字</td>
      <td class="color-dark-light">{{font_size_extra_small}} Extra Small</td>
      <td>用 Element 快速搭建页面</td>
    </tr>
    <tr
      :style="{ fontSize: font_size_small }"
    >
      <td>正文（小）</td>
      <td class="color-dark-light">{{font_size_small}} Small</td>
      <td>用 Element 快速搭建页面</td>
    </tr>
    <tr
      :style="{ fontSize: font_size_base }"
    >
      <td>正文</td>
      <td class="color-dark-light">{{font_size_base}} Base</td>
      <td>用 Element 快速搭建页面</td>
    </tr>
    <tr
      :style="{ fontSize: font_size_medium }"
    >
      <td>小标题</td>
      <td class="color-dark-light">{{font_size_medium}} Medium</td>
      <td>用 Element 快速搭建页面</td>
    </tr>
    <tr
      :style="{ fontSize: font_size_large }"
    >
      <td>标题</td>
      <td class="color-dark-light">{{font_size_large}} large</td>
      <td>用 Element 快速搭建页面</td>
    </tr>
    <tr
      :style="{ fontSize: font_size_extra_large }"
    >
      <td>主标题</td>
      <td class="color-dark-light">{{font_size_extra_large}} Extra large</td>
      <td>用 Element 快速搭建页面</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
  import bus from '../utils/bus';
  import { ACTION_USER_CONFIG_UPDATE } from '../utils/constant.js';
  const varMap = [
    '$--font-size-extra-large',
    '$--font-size-large',
    '$--font-size-medium',
    '$--font-size-base',
    '$--font-size-small',
    '$--font-size-extra-small'
  ];
  const original = {
    'font_size_extra_large': '20px',
    'font_size_large': '18px',
    'font_size_medium': '16px',
    'font_size_base': '14px',
    'font_size_small': '13px',
    'font_size_extra_small': '12px'
  }
  export default {
    created() {
      bus.$on(ACTION_USER_CONFIG_UPDATE, this.setGlobal);
    },
    mounted() {
      this.setGlobal();
    },
    methods: {
      tintColor(color, tint) {
        return tintColor(color, tint);
      },
      setGlobal() {
        if (window.userThemeConfig) {
          this.global = window.userThemeConfig.global;
        }
      }
    },
    data() {
      return {
        global: {},
        'font_size_extra_large': '',
        'font_size_large': '',
        'font_size_medium': '',
        'font_size_base': '',
        'font_size_small': '',
        'font_size_extra_small': ''
      }
    },
    watch: {
      global: {
        immediate: true,
        handler(value) {
          varMap.forEach((v) => {
            const key = v.replace('$--', '').replace(/-/g, '_')
            if (value[v]) {
              this[key] = value[v]
            } else {
              this[key] = original[key]
            }
          });
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  .demo-typo-size {
    .color-dark-light {
      color: #99a9bf;
    }
  }

  .demo-term-box img {
    width: 24%;
    margin: 0 4% 20px 0;
  }

  .lineH-left {
    display: inline-block;
    height: 80px;
  }

  .lineH-right {
    display: inline-block;
    list-style: none;
    padding: 0 0 0 90px;
    margin: 0;
    vertical-align: top;
  }

  .lineH-right li {
    font-size: 13px;
    color: #666;
    height: 20px;
    line-height: 20px;
  }

  .lineH-right li span {
    padding-left: 40px;
  }
</style>
