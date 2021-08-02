/*
 * @Description: 组件前缀
 * @Date: 2021-07-30 16:34:50
 * @LastEditTime: 2021-07-30 17:25:41
 */

/**
 * @description: 组件前缀
 * @param {*}
 * @return {*}
 */
const prefix = 'Tools'
/**
 * @description:
 * @param {*}
 * @return {*}
 */
const namespace = prefix.toLowerCase()
const firstToUpper = function(str) {
  return str.toLowerCase().replace(/( |^)[a-z]/g, L => L.toUpperCase())
}
module.exports = {
  prefix,
  namespace,
  firstToUpper
}
