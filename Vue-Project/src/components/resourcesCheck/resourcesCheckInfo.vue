<!--资源审核详情页-->
<template>
  <div class="page">
    <UserNav></UserNav>
    <div class="page-cont clearfix">
      <ClientManagerNav></ClientManagerNav>
      <div class="right">
        <div class="right-main">
          <div class="top-btns">
            <router-link to="/resourcesCheck"><img src="../../assets/img/back.png">返回</router-link>
          </div>
          <CloudHostCheck></CloudHostCheck>
          <!--<test></test>-->
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  img{
    border: 0 none;
  }
  a:focus{
    text-decoration: none;
  }
  .page{
    background: #f6f6f6;
    overflow: hidden;
  }
  .page-cont{
    position: relative;
  }
  .right{
    width: 100%;
    padding-left: 14.16%;
  }
  .right-main{
    padding: 0 20px;
  }
  .top-btns{
    line-height:60px;
    font-size:18px;
    color:#ddd;
    img{
      width:20px;
      height:20px;
      vertical-align:middle;
      margin-right:5px;
    }
  }
</style>
<script>
  import UserNav from '../common/UserHeader.vue';
  import ClientManagerNav from '../common/ClientManagerNav.vue';
  import CloudHostCheck from './CloudHostCheck.vue';
//  import test from './test.vue';
  export default{
    components:{
      UserNav,
      ClientManagerNav,
      CloudHostCheck,
//      test
    },
    data(){
      return{

      }
    },
    methods:{

    }
  }
</script>
