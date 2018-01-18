<!--优惠配置-->
<template>
  <div class="cont">
    <div class="box">
      <p class="title">优惠配置<i @click="closeFun">X</i></p>
      <div class="main">
        <!--步骤条  stepList表示步骤数组
        currentStep表示当前步骤，传参为数字类型
        space表示步骤条之间的间距-->
        <step
          :stepList="stepList"
          :currentStep.sync="currentStep"
          :space = '9'
          :width="133"
        ></step>

        <!--优惠信息配置-->
        <discountInfo v-if="currentStep==0"
                      :currentStep.sync="currentStep"
        ></discountInfo>

      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  p,ul{
    padding: 0;
    margin: 0;
  }
  a:focus{
    text-decoration: none;
  }
  .cont{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
  }
  .box{
    width: 784px;
    /*height: 467px;*/
    position: absolute;
    top: 50%;
    /*left: 57.08%;*/
    left: 50%;
    margin: -172px 0 0 -392px;
    background: #fff;
    .title{
      width: 100%;
      height: 55px;
      line-height: 55px;
      background: #2facee;
      text-align: center;
      font-size: 18px;
      color: #fff;
      position: relative;
      i{
        position: absolute;
        top: 10px;
        right: 20px;
        width: 30px;
        height: 30px;
        font-style: normal;
        font-size: 17px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
      }
    }
  }
  .main{
    padding: 9px 35px 10px 35px;
  }
</style>
<script>
  import step from './step.vue';
  import discountInfo from './addDiscount/discountInfo.vue';
  export default{
    components:{
      step,
      discountInfo
    },
    data(){
      return{
        stepList:[
          {
            text:"优惠信息配置"
          },
          {
            text:"优惠条件参考对象配置"
          },
          {
            text:"优惠条件表达式配置"
          },
          {
            text:"优惠参考对象配置"
          },
          {
            text:"优惠价目配置"
          }
        ],
        currentStep:0,
      }
    },
    methods:{
      closeFun(){
        this.$emit('update:showBool', false);
      }
    }
  }

</script>
