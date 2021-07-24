<template>
  <div class="hello">
    <span class="hello-text">
      hello
    </span>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    /**
     * 参数属性
     * @property {Object[]} *******
     */
    props: {},
    data() {
      return {
        data: {a: 1}
      }
    },
    methods: {},
    mounted() {
      console.log(this.data?.a);
      const b = [1,3,1]
      const a = b.filter(item=>item===1)
      console.log(a)
    }
  }
</script>

<style scoped lang="scss">
  $BACKGROUNG1: #333;
  .hello {
    width: 100%;
    height: 20px;
    background-color: $BACKGROUNG1;

    &-text {
      color: yellow;
    }
  }
</style>
