/*
 * @Author: your name
 * @Date: 2021-03-26 15:13:15
 * @LastEditTime: 2021-05-06 10:28:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue-components-librarys/src/router/index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from '../views/hello'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Hello',
    component: Hello
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
