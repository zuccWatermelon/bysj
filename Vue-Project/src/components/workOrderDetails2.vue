<!--客户经理门户-->
<template>
  <div class="page" id="clientManagerIndex">

    <!--模态框-->

    <UserNav></UserNav>
    <div class="page-cont clearfix">
      <ClientManagerNav></ClientManagerNav>
      <div class="right">
        <div class="order">
          <div class="back"> <router-link class="backTo" to="/myWorkOrder">返回</router-link> | <span>工单详情</span></div>
          <div class="orderBox">
            <div class="orderYun">
              <div class="orderYun1">
                <div class="orderYun2">施工中</div>
              </div>
            </div>
            <div class="orderB clearfix">
              <div class="orderN" style=" padding-left: 0;">
                <img src="../assets/img/orderNum.png"/>
                订单号码
                <p>10020117606120912</p>
              </div>
              <div class="orderN">
                <img src="../assets/img/userName.png"/>
                客户姓名
                <p>张三丰</p>
              </div>
              <div class="orderN" style="border-right: 0px">
                <img src="../assets/img/userPhone.png"/>
                客户电话
                <p>15868825856</p>
              </div>
            </div>
            <div class="orderB clearfix" style="border-bottom: 0">
              <div class="orderN" style=" padding-left: 0;">
                <img src="../assets/img/DistributionTime.png"/>
                派发时间
                <p>2017年9月16日 15:30:54</p>
              </div>
              <div class="orderN">
                <img src="../assets/img/state.png"/>
                状态
                <p>未开始</p>
              </div>
              <div class="orderN" style="border-right: 0px">
                <img src="../assets/img/state.png"/>
                备注
                <p>请尽快完成设备安装与调试</p>
              </div>
            </div>
            <button class="borderBtn" @click="finish()">完成施工</button>
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
    padding: 20px 30px 40px 30px;
    background: #f2f8fa;
    min-height:600px;
  }
  .back{
    font-size: 14px;
    color: #a0a0a0;
  }
  .backTo{
    font-size: 14px;
    color: #a0a0a0;
  }
  .back span{
    color:#333;
    font-size: 18px;
  }
  .orderBox{
    width:100%;
    height:400px;
    background: #fff;
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 40px;
    position: relative;
    overflow: hidden;
  }
  .orderYun{
    position: absolute;
    width:100px;
    height: 100px;
    background: #a7ecb6;
    top:-50px;
    left:996px;
    border-radius: 50%;
  }
  .orderYun1{
    position: absolute;
    width: 90px;
    height: 80px;
    background: #59dc75;
    top: 12px;
    left: 5px;
    border-radius: 50%;
  }
  .orderYun2{
    position: absolute;
    top: 46px;
    left: 22px;
    color:#fff;
    font-size: 14px;

  }
  .orderB{
    border-bottom: 1px solid #e5e5e5;
  }
  .orderN{
    float: left;
    width: 300px;
    height: 60px;
    border-right: 1px solid #eaeaea;
    margin: 40px 0;
    color: #808080;
    padding-left: 30px;
  }
  .orderN p{
    color:#6e6e6e;
    text-indent: 22px;
    margin-top: 10px;
  }
  .borderBtn{
    position: absolute;
    bottom: 40px;
    right:40px;
    background: #53caef;
    width:100px;
    height:40px;
    line-height: 40px;
    text-align: center;
    outline: none;
    border:1px solid #53caef;
    color: #fff;
    border-radius: 4px;
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
//    created(){
//        axios({
//          method:"post",
//          url:"/api/customerSrv/queryCustomerInfoList",
//          data: {
//            pageSize:10,
//            pageNo:1
//          }
//        }).then(
//          response => {
//             console.log(response);
//             this.clientData=response.data.data;
//          }
//        ).catch(error=>{
//            console.log(error)
//        })
//    },
    methods:{
      finish:function(){
        this.$router.push({path:'/workOrderDetails3'});
      }
    }
  }
</script>
