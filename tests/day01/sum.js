/*
 * @Description: 两数之和
 * @Date: 2021-08-05 23:54:14
 * @LastEditTime: 2021-08-25 13:59:37
 */
/**
 * @description: 双循环
 * @param {*}
 * @return {*}
 */
export const sum = (arr, num) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] + arr[j] === num) {
        return [i, j]
      }
    }
  }
}
/**
 * @description: 哈希表
 * @param {*}
 * @return {*}
 */
export const twoSum = (nums, target) => {
  const map = new Map([])
  for (let i = 0; i < nums.length; i++) {
    const dif = target - nums[i]
    if (map.has(dif)) {
      return [map.get(dif), i]
    } else {
      map.set(nums[i], i)
    }
  }
}
