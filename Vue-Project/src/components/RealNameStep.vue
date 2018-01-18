<!--实名企业步骤条-->
<template>
  <div class="step">
    <ul class="clearfix">
      <li class="step-item">
        <div :class="['step-num',{complete:step>=1}]">
          <span>1</span>
        </div>
        <p>账号信息</p>
        <i :class="{active:step>1}"></i>
      </li>
      <li class="step-item">
        <div :class="['step-num',{complete:step>=2}]">
          <span>2</span>
        </div>
        <p>企业实名</p>
        <i :class="{active:step>2}"></i>
      </li>
      <li class="step-item">
        <div :class="['step-num',{complete:step>=3}]">
          <span>3</span>
        </div>
        <p>合作模式</p>
        <!--<i :class="{active:step>=3}"></i>-->
      </li>
    </ul>
  </div>
</template>
<style scoped lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  .step{
    width: 797px;
    margin: 0 auto;
    padding-top: 91px;
    overflow: hidden;
    ul{
      width: 1200px;
    }
  }
  .step-item{
    float: left;
    width: 90px;
    margin-right: 264px;
    position: relative;
    p{
      font-size: 18px;
      line-height: 38px;
      text-align: center;
      color: #333;

    }
    i{
      position: absolute;
      top:30px;
      left:100%;
      width: 264px;
      height: 2px;
      background: #ccc;
    }
    .active{
      background: #71c574;
    }
  }
  .step-num{
    width: 60px;
    height: 60px;
    margin: 0 auto;
    background: #ccc;
    font-size: 40px;
    border-radius: 50%;
    color: #fff;
    overflow: hidden;
    span{
      display: block;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
  }
  .complete{
    background: #fff url("../assets/img/step.png") center no-repeat;
    span{
      display: none;
    }
  }
</style>
<script>
  export default{
    props:['step']
  }

</script>
