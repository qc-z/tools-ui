/*
 * @Description: 
 * @Date: 2021-04-06 17:54:33
 * @LastEditTime: 2021-05-14 14:00:39
 */
const Loading = {};
// showLoad:存储loading显示状态; loadNode:存储loading节点元素;
let [showLoad, loadNode] = [false, null];


Loading.install = (Vue) => {
  /**
   * loading方法
   * @param {*string} tip 提示文本
   * @param {*string} type loading类型，可选open/close
   */
  Vue.prototype.$loading = (tip, type) => {
    if (type === 'close') {
      if (loadNode) {
        loadNode.show = showLoad = false;
      }
    } else {
      if (showLoad && loadNode) {
        showLoad.tip = tip;
        return false;
      }
      const loadTpl = Vue.extend({
        data() {
          return {
            show: false,
            tip
          }
        },
        render(h) {
          if (!this.show) {
            return;
          }
          return h('div', {
            class: 'lx-load-mark',
            show: this.show
          }, [
            h('div', {
              class: 'lx-load-box'
            }, [
              h('div', {
                class: this.tip ? 'lx-loading' : 'lx-loading-nocontent'
              }, Array.apply(null, { length: 12 }).map((value, index) => {
                return h('div', {
                  class: ['loading_leaf', `loading_leaf_${index}`]
                })
              })),
              h('div', {
                class: 'lx-load-content',
                domProps: {
                  innerHTML: this.tip
                }
              })
            ])
          ])
        }
      });
      loadNode = new loadTpl();
      const tpl = loadNode.$mount().$el;

      document.body.appendChild(tpl);
      loadNode.show = showLoad = true;
    }
  };

  ['open', 'close'].forEach(type => {
    Vue.prototype.$loading[type] = tip => {
      return Vue.prototype.$loading(tip, type);
    }
  })
}
export default Loading;
