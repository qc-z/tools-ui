const { twoSum, sum } = require('./sum')

describe('给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。', () => {
  it('双循环解决', () => {
    expect(sum([1, 2, 3, 4, 11, 5, 9], 10)).toEqual([0, 6])
  })
  it('用哈希表来解决', () => {
    expect(twoSum([1, 2, 3, 4, 11, 5, 9], 10)).toEqual([0, 6])
  })
})
