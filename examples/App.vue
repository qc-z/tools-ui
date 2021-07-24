<template>
  <div class="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<style scoped lang="scss">
  .app {
    height: 100%;
    width: 100%;
  }
</style>
