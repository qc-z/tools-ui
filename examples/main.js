/* eslint-disable */

/*
 * @Description:
 * @Autor: QC-Z
 * @Date: 2021-03-26 15:13:15
 * @LastEditors: QC-Z
 * @LastEditTime: 2021-05-06 11:55:21
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import tools from 'tools-ui'

console.log(tools)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
