<!--客户现有资产-->
<template>
  <div class="clientAssets">
    <MyNav class="nav" :current="'index'"
           :custData="custData"
           :background="'#2aabd2'"
    ></MyNav>
    <div class="main clearfix">
      <div class="left">
        <clientAssetdInfo :custData="custData"
                          :navNum.sync = 'navNum'
        ></clientAssetdInfo>
      </div>
      <div class="right">
          <currentAssets :navNum.sync = 'navNum'></currentAssets>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  .nav{
    background: #2aabd2;
  }
  .main{
    position: relative;
    width: 1200px;
    margin: 0 auto;
  }
  .left{
    float: left;
    width: 280px;
  }
  .right{
    float: left;
    padding-left: 20px;
  }
</style>
<script>
  import MyNav from '../common/MyNav.vue';
  import clientAssetdInfo from './clientAssetsInfo.vue';
  import currentAssets from './currentAssets.vue';

  export default{
    components:{
      MyNav,
      clientAssetdInfo,
      currentAssets
    },
    data(){
        return{
          current:"index",
          custData:{},
          minHeight:0,
          navNum:{
            '161':0,
            '61':0,
            '101':0,
            '4':0,
            '5':0
          },
        }
    },
    created(){
      var cust = window.sessionStorage.getItem('cust');
      if(cust!=null && cust!=''){
        this.custData=JSON.parse(cust);
      }
    }
  }
</script>
