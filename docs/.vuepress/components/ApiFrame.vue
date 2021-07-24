<template>
  <iframe v-if="url" class="api-frame" :src="url" frameborder="0"></iframe>
</template>

<script>
  export default {
    name: 'ApiFrame',
    props: {
      href: {
        type: String
      }
    },
    data() {
      return {
        url: null
      }
    },
    mounted() {
      this.url = this.$route.query.url || this.href || ''
    }
  }
</script>

<style lang="scss" scoped>
  .api-frame {
    height: 100%;
    width: 100%;
  }
</style>
