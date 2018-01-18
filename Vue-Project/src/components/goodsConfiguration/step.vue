<!--进度条-->
<template>
  <div class="step">
    <ul class="step-list clearfix">
      <li v-for=" (item,index) in stepList"
          :class="{active:currentStep >= index}"
          :style="{marginRight: space + 'px', height: height+'px', width: width + 'px', lineHeight: height + 'px'}"
      >{{item.text}}</li>
    </ul>
  </div>
</template>
<style scoped lang="less">
  *{
    padding: 0;
    margin: 0;
  }
  .step{
    width: 100%;
    overflow: hidden;
  }
  .step-list{
    width: 150%;
    li{
      float: left;
      width: 142px;
      height: 30px;
      line-height: 30px;
      background: url("../../assets/img/order-step-waiting.png") right no-repeat;
      background-size: auto 100%;
      color: #333;
      font-size: 12px;
      padding-left: 10px;
    }
    .active{
      background-image: url("../../assets/img/order-step-complete.png");
      color: #ff8200;
    }
  }
</style>
<script>
  export default{
      props:['stepList','currentStep','space', 'height', 'width']

  }
</script>
