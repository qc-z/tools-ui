<template>
  <div>
    <img class="lineH-left" src="../assets/images/typography.png"/>
    <ul class="lineH-right">
      <li>line-height:1 <span>无行高</span></li>
      <li>line-height:1.3 <span>紧凑</span></li>
      <li>line-height:1.5 <span>常规</span></li>
      <li>line-height:1.7 <span>宽松</span></li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
  .demo-typo-size {
    .color-dark-light {
      color: #99a9bf;
    }
  }

  .demo-term-box img {
    width: 24%;
    margin: 0 4% 20px 0;
  }

  .lineH-left {
    display: inline-block;
    height: 80px;
  }

  .lineH-right {
    display: inline-block;
    list-style: none;
    padding: 0 0 0 90px;
    margin: 0;
    vertical-align: top;
  }

  .lineH-right li {
    font-size: 13px;
    color: #666;
    height: 20px;
    line-height: 20px;
  }

  .lineH-right li span {
    padding-left: 40px;
  }
</style>
