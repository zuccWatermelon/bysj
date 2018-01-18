<!--实名企业-->
<template>
  <div class="page">
    <MyNav :current="current"></MyNav>
    <div class="main">
      <RealNameStep :step="step"></RealNameStep>
      <RealBaseInfo    v-if="step==1"  @step="stepChange"></RealBaseInfo>
      <RealCompanyInfo v-if="step==2"  @step="stepChange"></RealCompanyInfo>
      <CooperationMode v-if="step==3"  @step="stepChange"></CooperationMode>
  </div>
    <MyFooter></MyFooter>
  </div>
</template>
<style scoped lang="less">
  .page{
    background: #f3f4f4;
  }
  .main{
    width: 1200px;
    height: 762px;
    margin: 59px auto 93px auto;
    background: #fff;
  }
</style>
<script>
  import MyNav from './common/MyNav.vue';
  import MyFooter from './common/MyFooter.vue';
  import RealNameStep from './RealNameStep.vue';
  import RealBaseInfo from './RealBaseInfo.vue';
  import RealCompanyInfo from './RealCompanyInfo.vue';
  import CooperationMode from './CooperationMode.vue';
  export default{
    components:{
      MyNav,
      MyFooter,
      RealNameStep,
      RealBaseInfo,
      RealCompanyInfo,
      CooperationMode
    },
    data(){
      return{
        current:"partner",
        step:1,
        realNameForm:{
          name:""
        }
      }
    },
    methods:{
      stepChange(num){
        this.step=num;
      }
    }
  }

</script>
