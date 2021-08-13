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
      default: 'default'
    }
  },
  methods: {
    click() {
      console.log(999)
    }
  },
  render: function (h) {
    // const that = this
    return h(
      'button', // 标签名称
      {
        class: ['tools-button', `tools-button-${this.type}`],
        attrs: { type: 'button' },
        on: {
          click: this.click
        }
      },
      [...this.$slots.default]
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
