<!--定价配置-->
<template>
  <div class="cont">
    <div class="box">
      <p class="title">定价配置<i @click="closeFun">X</i></p>
      <div class=""></div>
      <div class="main">
        <!--步骤条  stepList表示步骤数组
        currentStep表示当前步骤，传参为数字类型
        space表示步骤条之间的间距-->
        <step
          :stepList="stepList"
          :currentStep.sync="currentStep"
          :space = '59'
        ></step>
        <!--定价信息配置-->
        <priceInfo v-if="currentStep == 0"
                   :currentStep.sync="currentStep"
        ></priceInfo>
        <!--定价参考对象配置-->
        <priceRefObject v-if="currentStep == 1"
                        :currentStep.sync="currentStep"
                        :priceRefList.sync="priceRefList"
        ></priceRefObject>
        <!--价目表配置-->
        <priceList v-if="currentStep == 2"
                   :priceRefList.sync="priceRefList"
        ></priceList>

      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  *{
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
    padding-left: 14.16%;
  }
  .box{
    width: 600px;
    /*height: 467px;*/
    position: absolute;
    top: 50%;
    /*left: 57.08%;*/
    left: 50%;
    margin: -233px 0 0 -300px;
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
    padding: 9px 27px;
  }

</style>
<script>
  import step from './step.vue';
  import priceInfo from './addPrice/priceInfo.vue';
  import priceRefObject from './addPrice/priceRefObject.vue';
  import priceList from './addPrice/priceList.vue';
  export default{
    props:['showBool','currentGoodID'],
    components:{
      step,
      priceInfo,
      priceRefObject,
      priceList
    },
    data(){
      return{
        stepList:[
          {
              text:"定价信息配置"
          },
          {
            text:"定价参考对象配置"
          },
          {
            text:"价目表配置"
          }
        ],
        currentStep:0,
        priceRefList:[]
      }
    },
    methods:{
      closeFun(){
          this.$emit('update:showBool', false);
      }
    }
  }
</script>
