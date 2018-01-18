<template>
  <div class="page">
    <MyNav :current="current" :loginClick.sync="loginClick"></MyNav>

    <div class="container">
      <div class="step">
        <div v-bind:class = "{'step-item-processing':step == '1','step-item-complete':step >= '2'}">
          <span>1. 确认产品信息</span>
        </div>
        <div v-bind:class = "{'step-item-waiting':step == '1','step-item-processing':step == '2','step-item-complete':step > '2'}">
          <span>2. 提交订单</span>
        </div>
        <div v-bind:class = "{'step-item-waiting':step <= '2','step-item-processing':step == '3','step-item-complete':step > '3'}">
          <span>3. 施工人员施工</span>
        </div>
        <div v-bind:class = "{'step-item-waiting':step <= '3','step-item-processing':step == '4'}">
          <span>4. 订单完成</span>
        </div>
      </div>

      <div class="remind">
        <div class="note">
          <img src="../../assets/img/order_submit_false.png"/>
          <span>糟糕!订单提交失败!</span>
          <div class="link">
            <span>3秒后</span>
            <a>返回购物车</a>
            <a>返回首页</a>
          </div>
        </div>
      </div>
    </div>
    <!--脚注-->
    <MyFooter></MyFooter>
  </div>

</template>

<script>
  import MyNav from '../common/MyNav.vue';
  import MyFooter from '../common/MyFooter.vue';

  export default {
    data(){
      return{
        step:"1",
        loginClick:false,
        current:"index",
      }
    },
    components:{
      MyNav,
      MyFooter,
    },
  }
</script>

<style scoped lang="less">
  .page{
    width: 100%;
    background-color: white;
    heigth:100%;
  }

  .container{
    .step{
      width:1021px;
      height: 33px;
      background-color: yellow;
      margin-top: 50px;

      .step-item-complete{
        width:25%;
        float:left;
        height: 33px;
        line-height: 33px;
        background: #fff url("../../assets/img/order-step-complete.png") center no-repeat;
        span{
          font-size: 14px;
          color:#ff8200;
          margin-left: 50px;
          font-family: "Microsoft YaHei";
          font-weight: bold;
        }
      }

      .step-item-processing{
        width:25%;
        float:left;
        height: 33px;
        line-height: 33px;
        background: #fff url("../../assets/img/order-step-processing.png") center no-repeat;
        span{
          font-size: 14px;
          color:white;
          margin-left: 50px;
          font-family: "Microsoft YaHei";
          font-weight: bold;
        }
      }

      .step-item-waiting{
        width:25%;
        float:left;
        height: 33px;
        line-height: 33px;
        background: #fff url("../../assets/img/order-step-waiting.png") center no-repeat;
        span{
          font-size: 14px;
          color:#666666;
          margin-left: 50px;
          font-family: "Microsoft YaHei";
          font-weight: bold;
        }
      }
    }

    .remind{
      width:1021px;
      height:314px;
      background-color: #f9fff1;
      border: dashed 1px #b5e879;
      margin-top:30px;

      .note{
        width:407px;
        height: 200px;
        margin-top: 59px;
        margin-left: 100px;
        span{
          font-size:18px;
          line-height: 60px;
        }
        .link{
          width:200px;
          margin-left: 95px;
          margin-top: -40px;
          span{
            font-size: 14px;
          }
          a{
            color:#34acef;
            cursor: pointer;
          }
        }
      }
    }
  }

</style>

