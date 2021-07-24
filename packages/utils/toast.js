const Toast = {}
// toastTimer:存储toast定时器id; toastVM:存储toast vm;
let [toastTimer, toastVM] = [false, null];
Toast.install = function (Vue, options) {
  const defaultOption = {
    type: 'bottom',
    duration: '25000',
    wordWrap: false,
    width: 'auto'
  }
  /**
   * toast方法
   * @param {string} tip 提示文本
   * @param {object|string} config 配置参数
   */
  Vue.prototype.$toast = (tip, config) => {
    let option = {...options, ...defaultOption}
    // 如果有传type，位置则设为该type
    if (typeof config === 'object') {
      option = {...option, ...config}
    } else if (config) {
      option.type = config
    }

    if (toastTimer) {
      // 如果toast还在，则取消上次消失时间
      clearTimeout(toastTimer);
      toastVM.show = false;
    }

    if (!toastVM) {
      const toastTpl = Vue.extend({
        data() {
          return {
            extStyle: {
              width: option.width
            },
            wordWrap: option.wordWrap,
            tip,
            show: false,
            type: option.type
          }
        },
        render(h) {
          if (!this.show) {
            return false;
          }
          return h('div', {
            class: ['vue-toast', `vue-toast-${this.type}`, this.wordWrap ? 'vue-word-wrap' : ''],
            style: this.extStyle,
            domProps: {
              innerHTML: tip
            }
          })
        }
      })

      toastVM = new toastTpl()
      const tpl = toastVM.$mount().$el
      document.body.appendChild(tpl)
    }

    toastVM.tip = tip;
    toastVM.wordWrap = option.wordWrap;
    toastVM.type = option.type;
    toastVM.extStyle.width = option.width;
    toastVM.show = true;
    toastTimer = setTimeout(() => {
      toastVM.show = false;
    }, option.duration);

  }

  ['bottom', 'center', 'top'].forEach(type => {
    Vue.prototype.$toast[type] = (tip, config = {type}) => {
      return Vue.prototype.$toast(tip, config);
    }
  });
}

module.exports = Toast
