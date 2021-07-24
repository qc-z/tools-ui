<template>
  <a :href="docHref" :target="target">
    <slot></slot>
    <OutboundLink></OutboundLink>
  </a>
</template>

<script>
  const docsBaseUrl = '/my/'
  export default {
    name: 'ApiLink',
    props: {
      href: {
        type: String,
        default: ''
      },
      target: {
        type: String,
        default: '_blank'
      }
    },
    computed: {
      docHref() {
        const array = this.href.split('/')
        const category = array[0], module = array[1]
        const file = module ? `module-$ui_${category}_${module}.html` : 'index.html'
        const url = `${docsBaseUrl}api/${category}/${file}`
        return `${docsBaseUrl}api/${category}.html?url=${encodeURIComponent(url)}`
      }
    }
  }
</script>

<style scoped>

</style>
