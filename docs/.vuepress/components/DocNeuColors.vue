<template>
  <el-row :gutter="12">
    <el-col :span="6" :xs="{span: 12}">
      <div class="demo-color-box-group">
        <div class="demo-color-box demo-color-box-other"
             :style="{ background: textPrimary }"
        >主要文字
          <div class="value">{{textPrimary}}</div>
        </div>
        <div class="demo-color-box demo-color-box-other"
             :style="{ background: textRegular }"
        >
          常规文字
          <div class="value">{{textRegular}}</div>
        </div>
        <div class="demo-color-box demo-color-box-other"
             :style="{ background: textSecondary }"
        >次要文字
          <div class="value">{{textSecondary}}</div>
        </div>
        <div class="demo-color-box demo-color-box-other"
             :style="{ background: textPlaceholder }"
        >占位文字
          <div class="value">{{textPlaceholder}}</div>
        </div>
      </div>
    </el-col>
    <el-col :span="6" :xs="{span: 12}">
      <div class="demo-color-box-group">
        <div class="demo-color-box demo-color-box-other demo-color-box-lite"
             :style="{ background: borderBase }"
        >一级边框
          <div class="value">{{borderBase}}</div>
        </div>
        <div class="demo-color-box demo-color-box-other demo-color-box-lite"
             :style="{ background: borderLight }"
        >二级边框
          <div class="value">{{borderLight}}</div>
        </div>
        <div class="demo-color-box demo-color-box-other demo-color-box-lite"
             :style="{ background: borderLighter }"
        >三级边框
          <div class="value">{{borderLighter}}</div>
        </div>
        <div class="demo-color-box demo-color-box-other demo-color-box-lite"
             :style="{ background: borderExtraLight }"
        >四级边框
          <div class="value">{{borderExtraLight}}</div>
        </div>
      </div>
    </el-col>
    <el-col :span="6" :xs="{span: 12}">
      <div class="demo-color-box-group">
        <div
          class="demo-color-box demo-color-box-other"
          :style="{ background: black }"
        >基础黑色
          <div class="value">{{black}}</div>
        </div>
        <div
          class="demo-color-box demo-color-box-other"
          :style="{ background: white, color: '#303133', border: '1px solid #eee' }"
        >基础白色
          <div class="value">{{white}}</div>
        </div>
        <div class="demo-color-box demo-color-box-other bg-transparent">透明
          <div class="value">Transparent</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import bus from '../utils/bus';
  import {tintColor} from '../utils/color.js';
  import {ACTION_USER_CONFIG_UPDATE} from '../utils/constant.js';

  const varMap = {
    'primary': '$--color-primary',
    'success': '$--color-success',
    'warning': '$--color-warning',
    'danger': '$--color-danger',
    'info': '$--color-info',
    'white': '$--color-white',
    'black': '$--color-black',
    'textPrimary': '$--color-text-primary',
    'textRegular': '$--color-text-regular',
    'textSecondary': '$--color-text-secondary',
    'textPlaceholder': '$--color-text-placeholder',
    'borderBase': '$--border-color-base',
    'borderLight': '$--border-color-light',
    'borderLighter': '$--border-color-lighter',
    'borderExtraLight': '$--border-color-extra-light'
  };
  const original = {
    primary: '#409EFF',
    success: '#67C23A',
    warning: '#E6A23C',
    danger: '#F56C6C',
    info: '#909399',
    white: '#FFFFFF',
    black: '#000000',
    textPrimary: '#303133',
    textRegular: '#606266',
    textSecondary: '#909399',
    textPlaceholder: '#C0C4CC',
    borderBase: '#DCDFE6',
    borderLight: '#E4E7ED',
    borderLighter: '#EBEEF5',
    borderExtraLight: '#F2F6FC'
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
        primary: '',
        success: '',
        warning: '',
        danger: '',
        info: '',
        white: '',
        black: '',
        textPrimary: '',
        textRegular: '',
        textSecondary: '',
        textPlaceholder: '',
        borderBase: '',
        borderLight: '',
        borderLighter: '',
        borderExtraLight: ''
      }
    },
    watch: {
      global: {
        immediate: true,
        handler(value) {
          Object.keys(original).forEach((o) => {
            if (value[varMap[o]]) {
              this[o] = value[varMap[o]]
            } else {
              this[o] = original[o]
            }
          });
        }
      }
    },
  }
</script>
<style lang="scss" scoped>
  .demo-color-box {
    position: relative;
    border-radius: 4px;
    padding: 20px;
    margin: 5px 0;
    height: 114px;
    box-sizing: border-box;
    color: #fff;
    font-size: 14px;

    & .value {
      font-size: 12px;
      opacity: 0.69;
      line-height: 24px;
    }
  }

  .demo-color-box-other {
    height: 74px;
    margin: 10px 0 !important;
    border-radius: 4px 4px 4px 4px !important;
    padding: 15px 20px;
  }

  .demo-color-box-group {
    .demo-color-box {
      border-radius: 0;
      margin: 0;
    }

    .demo-color-box:first-child {
      border-radius: 4px 4px 0 0;
    }

    .demo-color-box:last-child {
      border-radius: 0 0 4px 4px;
    }
  }

  .bg-color-sub {
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    position: absolute;
    border-radius: 0 0 4px 4px;
  }

  .bg-blue-sub-item {
    width: 11.1111111%;
    height: 100%;
    display: inline-block;
  }

  .bg-blue-sub-item:first-child {
    border-radius: 0 0 0 4px;
  }

  .bg-success-sub-item {
    width: 50%;
    height: 100%;
    display: inline-block;
  }

  .bg-success-sub-item:first-child {
    border-radius: 0 0 0 4px;
  }

  .bg-success-sub-item:last-child {
    border-radius: 0 0 4px 0;
  }

  .bg-transparent {
    border: 1px solid #fcc3c3;
    color: #303133;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><path d='M0 98 L100 0 L100 1 L1 98' fill='%23FCC3C3' /></svg>");
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%, auto;
  }

  .demo-color-box-lite {
    color: #303133;
  }

</style>
