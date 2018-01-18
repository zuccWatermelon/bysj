<!--客户经理门户-->
<template>
  <div class="page" id="clientManagerIndex">

    <!--模态框-->
    <div class="modal fade" id="skyCloud_modal" tabindex="-1" role="dialog" aria-labelledby="skyCloud_modalLabel" aria-hidden="true" data-backdrop="static">
      <div class="modal-dialog modal-add-dialog">
        <div class="modal-content modal-add-content">
          <div class="modal-header modal-add-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title modalTitle" id="skyCloud_modalLabel"> 派单</h4>
          </div>
          <div class="modal-body">

            <div class="modalBodyCenter">

              <div class="orderPerson">选择施工人员</div>
              <div class="orderTable1">
                <table class="orderTable">
                  <div class="orderTableD clearfix">
                    <div class="orderTableD1">姓名</div>
                    <div class="orderTableD1">手机号码</div>
                    <div class="orderTableD1">组织</div>
                  </div>
                  <div class="orderTable2">
                    <tr v-for="(item,index) in  findWorker">
                      <td>
                        <input type="radio" name="user" value="" @click="radioBtn($event,item.staffId,item.sysUserName)"/>
                        {{item.sysUserName}}
                      </td>
                      <td>{{item.mobile}}</td>
                      <td>{{item.sysUserCode}}</td>
                    </tr>
                  </div>

                </table>
              </div>


            </div>
            <div class="modal-footer" id='amModalFooter'>
              <div class="modalBtnWrap">
                <div class="btnWrapIn">
                  <button class='AMclose' data-dismiss='modal'>取消</button>
                  <button @click="dispatchPerson()" class='AMsure' data-dismiss='modal'>确认</button>

                </div>
              </div>
            </div>


          </div>
        </div><!-- /.modal-content -->
      </div><!-- /.modal-dialog -->
    </div>

    <UserNav></UserNav>
    <div class="page-cont clearfix">
      <ClientManagerNav></ClientManagerNav>
      <div class="right">
        <div class="order">
          <div class="back"> <router-link class="backTo" to="/myWorkOrder2">返回</router-link> | <span>工单详情</span></div>
          <div class="orderBox">

            <div v-show="statusCd=='未开始'" class="orderYun">
              <div class="orderYun1">
                <div class="orderYun2">已完成</div>
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
          </div>
          <div class="paiDan">派 单</div>
          <div class="orderBoxBtm">
            <div class="codeMa">
              <img src='../assets/img/tiaoCode.png'/>
              输入商品注册码
            </div>
            <div class="CJTsoft">
              <div class="CJTsoft1" >
                <label>{{remark}}：</label><input v-on:input="write1($event)"  type="text"  value="" class="el-input__inner"/>
              </div>

            </div>
            <div class="codeMa">
              <img src='../assets/img/userName.png'/>
              请选择施工人员
              <p class="dispatchPerson">{{sysUserName}}</p>
              <div @click="dispatch()" class="codeMaR configuration" data-toggle="modal" data-target="#skyCloud_modal" >选择施工人员</div>
            </div>

            <button v-show="statusCd=='未派单'" class="borderBtn" @click="borderBtn()">确认派单</button>
            <button v-show="statusCd=='未开始'"></button>
            <div  class="borderBtnDiv"></div>

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
  .modal fade in{
    position: relative;
  }
  .modal-header .close{
    margin-top: 6px;
    padding-right: 10px;
  }
  .modal-add-dialog{
    position: absolute;
    top:50%;
    left:450px;
    width:600px;
    margin: -171px auto 0 auto;
  }
  .modal-add2-dialog{
    width:300px;
  }
  .modal-add-content{
    border-radius:0;
  }
  .modal-add-header{
    height:40px;
    line-height: 40px;
    background-color: #347aea;
    color:#fff;
    text-align: center;
    button{
      color:#fff;
    }
  }
  .modalTitle{

    text-align: center;
    color: #fff;
    line-height: 36px;
  }
  .modal-header{
    padding: 3px;
    background: #35acec;
  }
  .modal-body{
    padding: 0;
    width:596px;
    height:300px;
    background: #fff;
  }
  .modalBodyCenter{
    height:250px;
    /*line-height: 120px;*/
  }
  .modal-content{
    border-radius: 0;
    text-align: center;
    margin: 0 auto;

  }

  .orderPerson{
    width:100%;
    height:40px;
    line-height: 40px;
    background: #f5f5f5;
    padding: 0 20px;
    text-align: left;

  }

  .modal-footer{
    border-top: 0;
    text-align: center;
  }
  .orderTable1{
    width:100%;
    padding: 20px;

  }
  .orderTable{
    padding: 10px;
  }
  .orderTable2{
    overflow:auto;
    height: 90px;
    width:550px;
  }
  .orderTable2 tr{
    margin-top: 20px;
  }
  .orderTableD{
    width: 515px;
    text-indent: 18px;;
  }
  .orderTableD1{
    float: left;
    width:33.3%;
    height:20px;
    line-height: 20px;
    text-align: left;
  }

  .orderTable td{
    width:170px;
    text-align: left;
  }
  .AMsure{
    background: #35acec;
    width:100px;
    height:30px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    outline: none;
    border: 1px solid #35acec;
    border-radius: 4px;
  }
  .AMclose{
    background: #d3d3d3;
    width:100px;
    height:30px;
    color: #fff;
    text-align: center;
    line-height: 30px;
    outline: none;
    border: 1px solid #d3d3d3;
    border-radius: 4px;
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
    height:auto;
    background: #fff;
    margin-top: 20px;
    padding-left: 20px;
    padding-right: 40px;
    padding-bottom: 20px;
    position: relative;
    overflow: hidden;
  }
  .orderYun{
    position: absolute;
    width:100px;
    height: 100px;
    background: #a4e3f7;
    top:-50px;
    left:996px;
    border-radius: 50%;
  }
  .orderYun1{
    position: absolute;
    width: 90px;
    height: 80px;
    background: #53caef;
    top: 12px;
    left: 5px;
    border-radius: 50%;
  }
  .orderYun2 {
    position: absolute;
    top: 46px;
    left: 22px;
    color: #fff;
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
  .orderN{
    float: left;
    width: 240px;
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
  .paiDan{
    width:100%;
    height:40px;
    line-height: 40px;
    font-size: 18px;

  }
  .orderBoxBtm{
    width:100%;
    height:350px;
    background: #fff;
    padding-left: 20px;
    padding-right: 40px;
    position: relative;
    overflow: hidden;
  }
  .codeMa{
    width:100%;
    height:40px;
    line-height: 40px;
    padding: 0 25px;
    color: #808080;
    position: relative;
  }

  .codeMa img{
    position: absolute;
    top:50%;
    margin-top: -8px;
    left:0;
  }
  .codeMaR{
    position: absolute;
    right:20px;
    top:0;
    color:#53caef;
  }
  .codeMaR:hover{
    cursor: pointer;
  }
  .CJTsoft{
    height:120px;
    width:100%;
    color: #808080;
    padding:20px 10px;

  }
  .CJTsoft1{
    float: left;
    margin-top: 10px;
    width: 240px;
  }
  .CJTsoft1 input{
    width:120px;
    height: 30px;
    padding: 0 10px;
  }



  .borderBtn{
    position: absolute;
    bottom: 40px;
    right:40px;
    background: #dcdcdc;
    width:100px;
    height:40px;
    line-height: 40px;
    text-align: center;
    outline: none;
    border:1px solid #dcdcdc;
    color: #fff;
    border-radius: 4px;
  }
  .dispatchPerson{
    display: none;
  }
  .borderBtnDiv{
    position: absolute;
    bottom: 40px;
    right:40px;
    background: rgba(0,0,0,0);
    width:102px;
    height:42px;
    line-height: 40px;
    text-align: center;
    outline: none;
    /*border:1px solid #dcdcdc;*/
    color: #fff;
    border-radius: 4px;
  }
  .borderBtn1{
    color: #fff !important;
    background: #53caef !important;
    border:1px solid #53caef !important;
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
        CustomerOrderItem:[],
        managerName:"",
        customerName:"",
        phone:"",
        createDate:"",
        remark:"",
        findWorker:[],
        staffId:"",
        sysUserName:"",
        status:"",
        orderItem:[],
        orderProductInstance:[],
        offerName:"",
        orderItemId:"",
        statusCd:""



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
            //url:"/netCloudFlow/workOrderService/findOrderItem",
            url:"/netCloudOrder/workOrder/findOrderItem",
            params:{
              params:{
                workId:this.workId,
              }
            }
          }).then(
            response => {
              this.orderItemId=response.data.data.orderItemId;
              this.remark=response.data.data.remark;
              this.statusCd=response.data.data.statusCd;
            }).catch(error=>{
            console.log(error)
          })



        }).catch(error=>{
        console.log(error)
      })
    },
    methods:{
      //      选择施工人员
      dispatch:function(){
        axios({
          method:"post",
          //url:"/netCloudFlow/workOrderService/findWorker",
          url:"/netCloudOrder/workOrder/findWorker",
        }).then(
          response => {
            this.findWorker=response.data.data;
          }
        ).catch(error=>{
        });
      },
      radioBtn:function(event,staffId,sysUserName){
        var el=event.currentTarget;
        this.staffId=staffId;
        this.sysUserName=sysUserName;
      },
      dispatchPerson:function(){
        $('.dispatchPerson').show();
      },
      write1:function(event){
        var _this=this;
        var el=event.currentTarget;
        var tempArr1 = [];
        var tmp1 = {"orderItemId":this.orderItemId,"businessId":el.value}
        tempArr1.push(tmp1);
        this.orderItem=tempArr1;


        var tempArr = [] ,
          src,
          res;
        src =el.value ;
        tempArr.push(src);
        res = tempArr.join('');
        if(tempArr==!""){
          $('.borderBtnDiv').hide();
          $('.borderBtn').addClass('borderBtn1');
        }else if(tempArr==""){
          $('.borderBtnDiv').show();
          $('.borderBtn').removeClass('borderBtn1');
        }
      },
//      确认派单
      borderBtn:function(){
        axios({
          method:"post",
          //url:"/netCloudFlow/workOrderService/sendWorkOrder",
          url:"/netCloudOrder/workOrder/sendWorkOrder",
          params:{
            params:{
              orderItem:this.orderItem,
              userId:this.staffId
            },

          }
        }).then(
          response => {
            if(response.data.code=="0"){
              this.$router.push({path:'/workOrderDetailsB'});
            }else if(response.data.code!=="0"){
              this.$router.push({path:'/workOrderDetailsC'});
            }

          }
        ).catch(error=>{
          console.log(error)
        });
      }
    }
  }
</script>
