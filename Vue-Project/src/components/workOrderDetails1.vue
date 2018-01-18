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
            <div class="orderYunA" v-show="statusCd=='未开始'">
              <div class="orderYunA1">
                <div class="orderYunA2">未开始</div>
              </div>
            </div>
            <div class="orderYunB" v-show="statusCd=='施工中'">
              <div class="orderYunB1">
                <div class="orderYunB2">施工中</div>
              </div>
            </div>
            <div class="orderYunC" v-show="statusCd=='施工报竣'">
              <div class="orderYunC1">
                <div class="orderYunC2">已完成</div>
              </div>
            </div>

            <div class="orderB clearfix" >
              <div class="orderBTitle">{{offerName}}</div>
              <div class="orderBTab1">
                <div class="orderBTabTop clearfix">
                  <div class="tabTopTitle">模块组</div>
                  <div class="tabTopTitle">模块</div>
                  <div class="tabTopTitle">站点数</div>
                </div>
                <div class="orderBTabA clearfix" v-for="(item, index) in orderProductInstance">
                  <div class="orderBTabALeft" >{{item.proName}}</div>
                  <div class="orderBTabACenter" v-for="(serviceItem, index) in item.orderProductService" >{{serviceItem.serviceName}}</div>
                  <div class="orderBTabARight" v-if="item.prodId != '150' && item.prodId != '149' && item.prodId != '177' && item.prodId != '178'">{{item.proNum}}</div>
                </div>

              </div>

            </div>


            <button v-show="statusCd=='未开始'" class="borderBtn" @click="startBtn()">开始施工</button>
            <button v-show="statusCd=='施工中'" class="borderBtn" @click="finishBtn()">完成施工</button>
          </div>




        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  .noBrder{
    border-bottom: 0px !important;
  }

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
  .orderYunA{
    position: absolute;
    width:100px;
    height: 100px;
    background: #f8cfa4;
    top:-50px;
    left:996px;
    border-radius: 50%;
  }
  .orderYunA1{
    position: absolute;
    width: 90px;
    height: 80px;
    background: #f1a553;
    top: 12px;
    left: 5px;
    border-radius: 50%;
  }
  .orderYunA2{
    position: absolute;
    top: 46px;
    left: 22px;
    color:#fff;
    font-size: 14px;

  }
  .orderYunB{
    position: absolute;
    width:100px;
    height: 100px;
    background: #a7ecb6;
    top:-50px;
    left:996px;
    border-radius: 50%;
  }
  .orderYunB1{
    position: absolute;
    width: 90px;
    height: 80px;
    background: #59dc75;
    top: 12px;
    left: 5px;
    border-radius: 50%;
  }
  .orderYunB2{
    position: absolute;
    top: 46px;
    left: 22px;
    color:#fff;
    font-size: 14px;

  }
  .orderYunC{
    position: absolute;
    width:100px;
    height: 100px;
    background: #a4e3f7;
    top:-50px;
    left:996px;
    border-radius: 50%;
  }
  .orderYunC1{
    position: absolute;
    width: 90px;
    height: 80px;
    background: #53caef;
    top: 12px;
    left: 5px;
    border-radius: 50%;
  }
  .orderYunC2{
    position: absolute;
    top: 46px;
    left: 22px;
    color:#fff;
    font-size: 14px;

  }
  /*工单详情样式*/
  .orderB{
    /*border-bottom: 1px solid #e5e5e5;*/
  }
  .orderBTitle{
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;

  }
  .orderBTab1 {
    width: 100%;

  }
  .tabTopTitle{
    width:300px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    float: left;


  }
  .orderBTabCenter{
    width:100%;
    height:auto;

    padding: 20px;
    position: relative;

  }



  .orderBTabA{
    width:900px;
    height:auto;
    min-height: 31px;
    padding: 5px 0;
    padding-left: 294px;
    position: relative;
    border-bottom: 1px solid #ccc;
  }
  .orderBTabALeft{
    width:270px;
    position: absolute;
    top:50%;
    left:20px;
    transform: translateY(-50%);
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    text-align: center;
  }
  .orderBTabACenter{
    width:310px;
    text-align: center;

    float: left;

  }
  .orderBTabARight{
    width:290px;
    text-align: center;
    /*margin-top: 10px;*/
    float: right;

  }
  .tabCLeft{
    position: absolute;
    width: 270px;
    left:20px;
    text-align: center;


  }
  .tabCCenter{
    float: left;
    margin-left: 294px;
    width: 310px;
    text-align: center;

  }
  .tabCRight{
    width:290px;
    text-align: center;

    float: left;

  }


  .borderBtn{
    position: absolute;
    bottom: 40px;
    right:40px;
    background: #59dc75;
    width:100px;
    height:40px;
    line-height: 40px;
    text-align: center;
    outline: none;
    border:1px solid #59dc75;
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
        workId:this.$route.query.workId,
        customerName:"",
        phone:"",
        createDate:"",
        remark:"",
        findWorker:[],
        staffId:"",
        sysUserName:"",
        status:"",
        statusCd:"",

        orderProductInstance:[],
        offerName:"",
        orderNum:""

      }
    },
    created(){
      axios({
        method:"post",
        url:"/netCloudOrder/orderService/getOrderItemDetails",

        data:{
          orderItemId:this.workId,
        }


      }).then(
        response => {
          this.offerName=response.data.data.offerName;
          this.orderProductInstance=response.data.data.orderProductInstance;
          axios({
            method:"post",
            url:"/netCloudOrder/workOrder/findOrderDetail",

            params:{
              params:{
                orderNum:this.workId,
              }
            }

          }).then(
            response => {
              console.log(response.data.CustomerOrderItem.statusCd)
              this.statusCd=response.data.CustomerOrderItem.statusCd


            }).catch(error=>{
          })
        }).catch(error=>{
      })
    },
    methods:{
      startBtn:function(){
       var user = window.sessionStorage.getItem('user');
       var cust = window.sessionStorage.getItem('cust');
       var sysUserName = JSON.parse(user).sysUserName;
        var staffId = JSON.parse(user).staffId;
        axios({
          method:"post",
          url:"/netCloudOrder/workOrder/workingOrder",
          params:{
            params:{
              user:{
                staffId:staffId,
                sysUuserName:sysUserName,
              },
              workId:this.workId,
            }
          }

        }).then(
          response => {
            if(response.data.code!=="0"){
              this.$alert('流程推进失败', '提示', {
                confirmButtonText: '确定',
                callback:action=>{
                }
              });
            }else if(response.data.code=="0"){
              axios({
                method:"post",
                url:"/netCloudOrder/workOrder/findOrderDetail",
                params:{
                  params:{
                    user:{
                      staffId:staffId,
                      sysUuserName:sysUserName,
                    },
                    workId:this.workId,
                  }
                }

              }).then(
                response => {
                  this.orderNum=response.data.order.orderNum;
                  this.managerName=response.data.order.managerName;
                  this.customerName=response.data.order.customerName;
                  this.phone=response.data.order.phone;
                  this.createDate=response.data.order.createDate;
                  this.remark=response.data.order.remark;
                  this.status=response.data.order.status

                }
              ).catch(error=>{
              })
            }
          }).catch(error=>{
        })
      },
      finishBtn:function(){
        var user = window.sessionStorage.getItem('user');
        var cust = window.sessionStorage.getItem('cust');
        var sysUserName = JSON.parse(user).sysUserName;
        var staffId = JSON.parse(user).staffId;
        axios({
          method:"post",
          url:"/netCloudOrder/workOrder/updateMyOrderOver",
          params:{
            params:{
              user:{
                staffId:staffId,
                sysUuserName:sysUserName
              },
              workId:this.workId,
            }
          }

        }).then(
          response => {
            if(response.data.code!=="0"){
              this.$alert('流程推进失败', '提示', {
                confirmButtonText: '确定',
                callback:action=>{
                },
              });
            }else if(response.data.code=="0"){
              axios({
                method:"post",
                url:"/netCloudOrder/workOrder/findOrderDetail",
                params:{
                  params:{
                    user:{
                      staffId:staffId,
                      sysUuserName:sysUserName
                    },
                    workId:this.workId,
                  }
                }
              }).then(
                response => {
                  this.orderNum=response.data.order.orderNum;
                  this.managerName=response.data.order.managerName;
                  this.customerName=response.data.order.customerName;
                  this.phone=response.data.order.phone;
                  this.createDate=response.data.order.createDate;
                  this.remark=response.data.order.remark;
                  this.status=response.data.order.status

                }).catch(error=>{
              })
            }

          }).catch(error=>{
        })
      }
    }
  }
</script>
