<template>
  <div class="anchor">
    <div
        v-for="item in menus"
        :key="item.value"
        class="anchor-item"
        :class="{ 'anchor-item__active': menu === item.value }" @click="handleMenuChange(item.value)">
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>
<script>
  import {debounce} from '../../../utils/util'
  import {getFirstScrollElement} from '../../../utils/dom'

  export default {
    props: {
      top: {
        type: Number,
        default: 0
      },
      menus: {
        type: Array,
        default: () => []
      }
    },

    data() {
      return {
        selector: '',
        menu: '',
        isScroll: true,
        isMounted: false,
        scrollTop: 0,
        anchorChange: false,
        rootScrollElement: '',
        timer: null
      }
    },
    watch: {
      parent: {
        immediate: true,
        handler: 'getScrollElement'
      },
      menus: {
        immediate: true,
        handler(list) {
          this.menu = (list.length > 0 && list[0].value) ? list[0].value : ''
        }
      },
      scrollTop() {
        if (this.anchorChange) {
          // 切换按钮会滚动视图，$nextTick 之后按钮值改变了，但滚动可能还没有结束，所以需要打个标记。
          this.isScroll = true
        }
      }
    },
    mounted() {
      this.isMounted = true
      this.getScrollElement()
    },

    methods: {
      handleMenuChange(selector) {
        this.isScroll = false
        this.anchorChange = false
        this.menu = selector
        const scrollElement = document.querySelector(selector)
        const rootScrollElement = getFirstScrollElement(scrollElement)
        const bodyTop = document.documentElement.scrollTop || document.body.scrollTop
        if (scrollElement && rootScrollElement) {
          const offsetTop = scrollElement.offsetTop + scrollElement.clientTop
          let offsetHeight = 0
          if (this.$el && this.$el.parentElement && this.$el.parentElement.offsetHeight) {
            offsetHeight = this.$el.parentElement.offsetHeight
          }
          const top = offsetTop - this.top - offsetHeight - bodyTop
          rootScrollElement.scrollTop = top
          // 当滚动容器无法滚动时，点击的菜单高亮
          if (this.scrollTop >= this.rootScrollElement.scrollHeight - this.rootScrollElement.offsetHeight) {
            this.menu = selector
          }
          this.$nextTick(() => {
            this.anchorChange = true
          })
        }
      },
      getScrollElement() {
        if (!this.isMounted) {
          return
        }
        // 如果没有传入 parent 默认取第一个父级滚动元素
        const parent = this.parent
        let element = null
        if (parent) {
          element = document.querySelector(parent)
          // mount 之后 rootScrollElement 可能已经存在了，如果和上次一样就不做任何操作。
          if (element === this.rootScrollElement) {
            return
          }
        } else if (this.$el) {
          element = getFirstScrollElement(this.$el.parentElement)
        }
        if (element) {
          this.removeScrollEvent()
          this.rootScrollElement = element
          this.rootScrollElement.addEventListener('scroll', debounce(this.handleScroll, 10))
        }
      },
      removeScrollEvent() {
        if (this.rootScrollElement) {
          this.rootScrollElement.removeEventListener('scroll', this.handleScroll)
        }
      },
      handleScroll() {
        const bodyTop = document.documentElement.scrollTop || document.body.scrollTop || 10
        const scrollTop = this.rootScrollElement.scrollTop - bodyTop
        this.scrollTop = scrollTop
        if (!this.isScroll) {
          return
        }
        const menus = this.menus
        let offsetHeight = 0
        if (this.$el && this.$el.parentElement && this.$el.parentElement.offsetHeight) {
          offsetHeight = this.$el.parentElement.offsetHeight
        }
        const scrollList = []
        menus.length && menus.forEach((item) => {
          const element = document.querySelector(item.value)
          if (element) {
            const top = element.offsetTop - bodyTop
            const rect = {
              top: top + element.clientTop - this.top - offsetHeight,
              bottom: top + element.offsetHeight - this.top - offsetHeight
            }
            scrollList.push(rect)
          }
        })
        if (scrollTop < scrollList[0].top) {
          this.menu = this.menus[0].value || ''
          return
        }
        // 遍历按钮元素的 top 和 bottom，查看当前滚动在那个元素的区间内。

        scrollList.some((it, index) => {
          // 加上第一个index = 0
          if (scrollTop >= it.top && scrollTop < it.bottom) {
            const menu = this.menus[index].value || ''
            if (menu) {
              this.menu = menu
            }
            return true
          }
          return false
        })
      }
    }
  }
</script>
<style lang="scss">
  .anchor {
    width: 100%;
    overflow-y: hidden;
    background: #cfeaff;

    &-item {
      display: inline-block;
      padding: 16px 24px;
      color: #666;
      font-size: 16px;
      cursor: pointer;

      &__active {
        background: #edf4fe;
        border-bottom: 1px solid #1890ff;

        span {
          border-bottom-color: #1890ff;
          color: #1890ff;
          transition: all 0.2s;
        }
      }
    }
  }
</style>
