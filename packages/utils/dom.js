// 判断一个元素是否是滚动元素
const scrollList = ['auto', 'scroll']

export function hasScrollElement(el, direction = 'vertical') {
  if (!el) {
    return
  }
  const style = window.getComputedStyle(el)
  if (direction === 'vertical') {
    return scrollList.includes(style.overflowY)
  } else if (direction === 'horizontal') {
    return scrollList.includes(style.overflowX)
  }
}

// 获取第一个滚动元素
export function getFirstScrollElement(el, direction = 'vertical') {
  if (!el) {
    return
  }
  if (hasScrollElement(el, direction)) {
    return el
  } else {
    return getFirstScrollElement(el && el.parentElement, direction)
  }
}
