import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default async ({ Vue, isServer }) => {
  Vue.use(Element)
  if (!isServer) {
    await import('@packages').then(model => {
      Vue.use(model.default)
    })
    Vue.mixin({
      mounted() {
        import('@packages').then(function(m) {
          Vue.use(m.default)
        })
      }
    })
  }
}
