/*
 * @Description:
 * @Date: 2021-08-10 23:38:02
 * @LastEditTime: 2021-08-12 15:30:19
 */
import { mock } from './mock'
describe('mock data', () => {
  it('已知输入', () => {
    const x = [
      '',
      '2019/11/14 18:01',
      '2019/11/14 18:02',
      '2019/11/14 18:03',
      '2019/11/14 18:04',
      '2019/11/14 18:05'
    ]
    const data = {
      飞机出行: [
        '2019/11/14 18:01',
        '2019/11/14 18:02',
        '2019/11/14 18:03',
        '2019/11/14 18:04',
        '2019/11/14 18:05'
      ],
      交易ip: [
        '2019/11/14 18:01',
        '2019/11/14 18:02',
        '2019/11/14 18:03',
        '2019/11/14 18:04',
        '2019/11/14 18:05'
      ]
    }
    const result = [
      ['', [0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
      ['', [0, 1], [1, 1], [2, 1], [3, 1], [4, 1]]
    ]
    expect(mock(x, data)).toEqual(result)
  })
  it('已知输入2', () => {
    const x = [
      '',
      '2019/11/14 18:01',
      '2019/11/14 18:02',
      '2019/11/14 18:03',
      '2019/11/14 18:04',
      '2019/11/14 18:05'
    ]
    const data = {
      飞机出行: [
        '2019/11/14 18:01',
        '2019/11/14 18:02'
        // '2019/11/14 18:03',
        // '2019/11/14 18:04',
        // '2019/11/14 18:05'
      ],
      交易ip: [
        '2019/11/14 18:01',
        '2019/11/14 18:02',
        '2019/11/14 18:03',
        '2019/11/14 18:04',
        '2019/11/14 18:05'
      ]
    }
    const result = [
      ['', [0, 0], [1, 0], '', '', ''],
      ['', [0, 1], [1, 1], [2, 1], [3, 1], [4, 1]]
    ]
    expect(mock(x, data)).toEqual(result)
  })
})
