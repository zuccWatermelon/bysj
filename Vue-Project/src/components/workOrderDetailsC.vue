<!--客户经理门户-->
<template>
  <div class="page" id="clientManagerIndex">

    <UserNav></UserNav>
    <div class="page-cont clearfix">
      <ClientManagerNav></ClientManagerNav>
      <div class="right">
        <div class="order">

          <div class="orderBox">
            <div class="orderB">
              <img src="../assets/img/fail.png"/>
              <p class="orderBP1">糟糕！本次派单失败！</p>
              <p class="orderBP2">3秒后
                <span>
                  <router-link to="/myWorkOrder2" style="color:#8dd9f8 ">返回工单详情</router-link>
                  <router-link to="/#" style="color:#8dd9f8 ">平台首页</router-link>
                </span>
              </p>
            </div>
          </div>
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
    float: left;
    width: 100%;
    padding-left: 14.16%;
  }

  .order{
    width:1200px;
    padding: 40px 20px 40px 20px;
    background: #f2f8fa;
    min-height:600px;
  }

  .orderBox{
    width:100%;
    height:280px;
    background: #f1edee;
    border:1px solid #e0695a;
    margin-top: 20px;
    padding-top: 100px;
    padding-left: 170px;
    /*padding-right: 40px;*/
    position: relative;
    overflow: hidden;

  }
  .orderB{
    color:#333;
  }
  .orderB img{
    width:60px;
    position: absolute;
    top:86px;
    left:100px;
  }
  .orderBP1{
    font-size: 16px;

  }
  .orderBP2{
    font-size: 12px;
  }
  .orderBP2 span{

  }
</style>

<script>
  import UserNav from './common/UserHeader.vue';
  import ClientManagerNav from './common/ClientManagerNav.vue';

  export default{
    components:{
      UserNav,
      ClientManagerNav
    },
    data(){
      return{

      }
    },

    methods:{

    },
    mounted(){
      var _this = this;
      var t;
      clearTimeout(t)
      t = setTimeout(function (){
        _this.$router.push({path:'/myWorkOrder2'});
      }, 3000);
    }
  }
</script>
