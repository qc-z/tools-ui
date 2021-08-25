/*
 * @Description:
 * @Date: 2021-08-10 23:37:53
 * @LastEditTime: 2021-08-13 13:51:40
 */
export const mock = (x, data) => {
  const arr = []
  Object.keys(data).forEach((item, index) => {
    const tem = x.map((n, indexs) => {
      return n === '0' ? '' : data[item].includes(n) ? [indexs - 1, index] : ''
    })
    arr.push(tem)
  })
  return arr
}
