<script>
import { oneOf } from '@/utils/assist'
export default {
  name: 'TButton',
  props: {
    type: {
      validator(value) {
        return oneOf(value, ['default', 'primary', 'info', 'success', 'warning', 'error'])
      },
      type: String,
      default: 'primary'
    }
  },
  render: function (h) {
    // const that = this
    // console.log(this.$slots.default)

    return h(
      'button', // 标签名称
      {
        class: ['tools-button', `tools-button-${this.type}`],
        attrs: { type: 'button' },
        domProps: {
          innerHTML: this.$slots.default[0].text
        }
      }
    )
  }
  //     <template>
  //   <button
  //     class="tools-button"
  //     :class="{[`tools-button-${type}`]: true}"
  //     type="button">
  //     <slot></slot>
  //   </button>
  // </template>
}
</script>
