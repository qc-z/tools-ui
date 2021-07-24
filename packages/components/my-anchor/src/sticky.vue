<!--
 * @Description:
 * @Date: 2021-04-02 10:34:42
 * @LastEditTime: 2021-05-19 11:34:57
-->
<template>
  <div class="klk-sticky"
       :class="fixedClass"
       :style="{top: top + 'px', zIndex}">
    <slot></slot>
  </div>
</template>
<script>
import { getFirstScrollElement } from '../../../utils/dom'

export default {
  props: {
    top: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 1
    },
    parent: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isMounted: false,
      fixedClass: '',
      offsetHeight: 0,
      scrollElement: null
    }
  },

  watch: {
    parent: {
      immediate: true,
      handler: 'initScrollElement'
    },

    fixedClass(v) {
      if (v && !this.offsetHeight) {
        this.offsetHeight = this.$el.offsetHeight
      }
    }
  },

  mounted() {
    this.isMounted = true
    this.initScrollElement()
  },

  destroyed() {
    this.removeScrollEvent()
  },

  methods: {
    handleScroll() {
      const scrollOffsetTop = this.$el.offsetTop - this.top
      if (this.scrollElement.scrollTop >= scrollOffsetTop) {
        this.fixedClass = 'top-fixed'
      } else {
        this.fixedClass = ''
      }
    },

    initScrollElement() {
      if (!this.isMounted) {
        return
      }
      const parent = this.parent
      let element = null
      if (parent) {
        element = document.querySelector(parent)
        if (element === this.scrollElement) {
          return
        }
      } else if (this.$el) {
        element = getFirstScrollElement(this.$el)
      }
      if (element) {
        this.removeScrollEvent()
        this.scrollElement = element
        this.scrollElement.addEventListener('scroll', this.handleScroll)
      }
    },
    removeScrollEvent() {
      if (this.scrollElement) {
        this.scrollElement.removeEventListener('scroll', this.handleScroll)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.klk-sticky {
  position: sticky;
}
</style>
