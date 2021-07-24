<template>

  <div>
    <div
      class="demo-shadow"
      :style="{ boxShadow: boxShadowBase }"
    ></div>
    <span class="demo-shadow-text">基础投影 box-shadow: {{boxShadowBase}}</span>

    <div
      class="demo-shadow"
      :style="{ boxShadow: boxShadowLight }"
    ></div>
    <span class="demo-shadow-text">浅色投影 box-shadow: {{boxShadowLight}}</span>
  </div>
</template>

<script>
  import bus from '../utils/bus';
  import {ACTION_USER_CONFIG_UPDATE} from '../utils/constant.js';

  const varMap = {
    '$--box-shadow-light': 'boxShadowLight',
    '$--box-shadow-base': 'boxShadowBase',
    '$--border-radius-base': 'borderRadiusBase',
    '$--border-radius-small': 'borderRadiusSmall'
  };
  const original = {
    boxShadowLight: '0 2px 12px 0 rgba(0, 0, 0, 0.1)',
    boxShadowBase: '0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)',
    borderRadiusBase: '4px',
    borderRadiusSmall: '2px'
  }
  export default {
    created() {
      bus.$on(ACTION_USER_CONFIG_UPDATE, this.setGlobal);
    },
    mounted() {
      this.setGlobal();
    },
    methods: {
      setGlobal() {
        if (window.userThemeConfig) {
          this.global = window.userThemeConfig.global;
        }
      }
    },
    data() {
      return {
        global: {},
        boxShadowLight: '',
        boxShadowBase: '',
        borderRadiusBase: '',
        borderRadiusSmall: ''
      }
    },
    watch: {
      global: {
        immediate: true,
        handler(value) {
          Object.keys(varMap).forEach((c) => {
            if (value[c]) {
              this[varMap[c]] = value[c]
            } else {
              this[varMap[c]] = original[varMap[c]]
            }
          });
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .demo-border .text {
    width: 15%;
  }

  .demo-border .line {
    width: 70%;
  }

  .demo-border .line div {
    width: 100%;
    height: 0;
    border-top: 1px solid #eee;
  }

  .demo-border .line .dashed {
    border-top: 2px dashed #eee;
  }

  .demo-shadow {
    height: 100px;
    width: 50%;
    border: 1px solid #eee;
  }

  .demo-shadow-text {
    line-height: 50px;
    color: #666;
    font-size: 14px;
  }

  .demo-radius .title {
    color: #666;
    font-size: 18px;
    margin: 10px 0;
  }

  .demo-radius .value {
    color: #333;
    font-size: 16px;
    margin: 10px 0;
  }

  .demo-radius .radius {
    height: 60px;
    width: 70%;
    border: 1px solid #d7dae2;
    border-radius: 0;
    margin-top: 20px;
  }

  .demo-radius .radius-30 {
    border-radius: 30px;
  }

</style>
