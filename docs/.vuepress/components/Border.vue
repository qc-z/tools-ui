<template>
  <table class="demo-border">
    <tbody>
    <tr>
      <td class="text">名称</td>
      <td class="text">粗细</td>
      <td class="line">举例</td>
    </tr>
    <tr>
      <td class="text">实线</td>
      <td class="text">1px</td>
      <td class="line">
        <div></div>
      </td>
    </tr>
    <tr>
      <td class="text">虚线</td>
      <td class="text">2px</td>
      <td class="line">
        <div class="dashed"></div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
  .demo-border .text {
    width: 15%;
  }

  .demo-border .line {
    width: 70%;
  }

  .demo-border .line div {
    width: 100%;
    height: 0;
    border-top: 1px solid #eee;
  }

  .demo-border .line .dashed {
    border-top: 2px dashed #eee;
  }

  .demo-shadow {
    height: 100px;
    width: 50%;
    border: 1px solid #eee;
  }

  .demo-shadow-text {
    line-height: 50px;
    color: #666;
    font-size: 14px;
  }

  .demo-radius .title {
    color: #666;
    font-size: 18px;
    margin: 10px 0;
  }

  .demo-radius .value {
    color: #333;
    font-size: 16px;
    margin: 10px 0;
  }

  .demo-radius .radius {
    height: 60px;
    width: 70%;
    border: 1px solid #d7dae2;
    border-radius: 0;
    margin-top: 20px;
  }

  .demo-radius .radius-30 {
    border-radius: 30px;
  }

</style>
