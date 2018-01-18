<!--客户经理门户-->
<template>
  <div class="page" id="clientManagerIndex">
    <!--模态框-->
    <div class="modal fade" id="skyCloud_modal" tabindex="-1" role="dialog" aria-labelledby="skyCloud_modalLabel" aria-hidden="true" data-backdrop="static">
      <div class="modal-dialog modal-add-dialog">
        <div class="modal-content modal-add-content">
          <div class="modal-header modal-add-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h4 class="modal-title modalTitle" id="skyCloud_modalLabel"> 提示</h4>
          </div>
          <div class="modal-body">

            <div class="modalBodyCenter">
              {{operateWord}}
            </div>
            <div class="modal-footer" id='amModalFooter'>
              <div class="modalBtnWrap">
                <div class="btnWrapIn">
                  <button class='AMclose' data-dismiss='modal'>取消</button>
                  <button @click="AMsure()" class='AMsure' data-dismiss='modal'>确认</button>

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
        <div class="shadow"></div>
        <div class="order">
          <div class="order-btn clearfix">
            <i :style="{left: slideLeft}"></i>
            <div :class="['order-item',current==1?'order-current1':'']" @click="orderChanage(1)">
              <img src="../assets/img/order-bg1.png" />
              <p class="num">{{todo}}</p>
              <p class="text">处理中的工单</p>
            </div>
            <div style="margin-left: 76px" :class="['order-item',current==2?'order-current2':'']" @click="orderChanage(2)">
              <img src="../assets/img/order-bg3.png" />
              <p class="num">{{finished}}</p>
              <p class="text">已完成的工单</p>
            </div>
          </div>
          <p class="order-title">{{title}}</p>
          <div class="select-box clearfix">
            <div class="select-item">
              <label>派发时间：</label><el-date-picker
              v-model="order.date1"
              type="date"
              format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker> - <el-date-picker
              v-model="order.date2"
              type="date"
              format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
            </div>
            <div class="select-item">
              <label>订单号：</label>
              <input class="client el-input__inner"  placeholder="请输入内容" v-model="order.num" />

            </div>
            <div class="select-item">
              <label>客户姓名：</label>
              <input class="client el-input__inner"  placeholder="请输入内容" v-model="order.client" />
            </div>
            <!--<div class="select-item">-->
              <!--<label>手机号码：</label>-->
              <!--<input class="client el-input__inner"  placeholder="请输入内容" v-on:input="entry3($event)" value=""/>-->
            <!--</div>-->
            <div class="select-item">
              <button class="submit" type="button" @click="inquire()">查询</button>
            </div>
          </div>
          <table class="order-table">
            <thead>
            <tr>
              <td class="order-id">订单号码</td>
              <td class="order-name">客户姓名</td>
              <td class="order-phone">手机号码</td>
              <td class="order-date">派发时间</td>
              <td class="order-state">状态</td>
              <td>操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in orderData" :class="{tr2:index%2==1}">

              <td class="order-id">
                <img v-show="item.status=='施工中'" class="workOrderImg" src="../assets/img/underway.png"/>
                <img v-show="item.status=='未开始'" class="workOrderImg" src="../assets/img/notBegin.png"/>
                {{item.orderNum}}
              </td>
              <td>{{item.customerName}}</td>
              <td>{{item.phone}}</td>
              <td>{{item.createDate}}</td>
              <td>{{item.status}}</td>
              <td class="operate">
                <router-link :to="'/workOrderDetails1?workId='+item.workId">工单详情</router-link>
                <a v-show="item.status=='未开始'" @click="build(item.status,item.workId)" class="changeBtn configuration" data-toggle="modal" data-target="#skyCloud_modal">开始施工</a>
                <a v-show="item.status=='施工中'" @click="build(item.status,item.workId)" class="changeBtn configuration" data-toggle="modal" data-target="#skyCloud_modal">完成施工</a>
              </td>
            </tr>
            </tbody>
          </table>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="totalRecord">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  #clientManagerIndex .el-pagination{
    position: static !important;
  }

  /*模态*/
  .modal fade in{
    position: relative;
  }
  .modal-header .close{
    margin-top: 6px;
    padding-right: 10px;
  }
  .modal-add-dialog{
    position: absolute;
    top:300px;
    left:600px;
    width:400px;
    margin: 0 auto;
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
    height:180px;
    background: #fff;
  }
  .modalBodyCenter{
    height:120px;
    line-height: 120px;
  }
  .modal-content{
    border-radius: 0;
    text-align: center;
    margin: 0 auto;

  }
  .modal-footer{
    border-top: 0;
    text-align: center;
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
  .changeBtn:hover{
    cursor: pointer;
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
  .shadow{
    height: 30px;
    width: 100%;
    background: url("../assets/img/shadow.png") repeat-x;
  }
  .order{
    padding: 0 30px 40px 30px;
    position: relative;
  }
  .order-btn{
    width:100%;
    justify-content:space-between;
    position: relative;
    padding-bottom: 48px;
    border-bottom: #ccd4d7 1px solid;

    i{
      position: absolute;
      bottom: 0;
      width: 0;
      height: 0;
      margin-left: -17px;
      border-width: 0 17px 18px 17px;
      border-style:solid;
      border-color: #f2f8fa #f2f8fa #ccd4d7 #f2f8fa;
    }
  }
  .order-current1{
    transform: scale(1.05);
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -o-transform: scale(1.05);
    box-shadow: rgba(20, 247, 164, 0.34) 0 0 15px 2px;
    -webkit-box-shadow: rgba(20, 247, 164, 0.34) 0 0 15px 2px;
    -moz-box-shadow: rgba(20, 247, 164, 0.34) 0 0 15px 2px;
    -o-box-shadow: rgba(20, 247, 164, 0.34) 0 0 15px 2px;
  }
  .order-current2{
    transform: scale(1.05);
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -o-transform: scale(1.05);
    box-shadow: rgba(255, 165, 108, 0.34) 0 0 15px 2px;
    -webkit-box-shadow: rgba(255, 165, 108, 0.34) 0 0 15px 2px;
    -moz-box-shadow: rgba(255, 165, 108, 0.34) 0 0 15px 2px;
    -o-box-shadow: rgba(255, 165, 108, 0.34) 0 0 15px 2px;
  }

  .order-item{
    width: 338px;
    height:auto;
    float: left;
    position: relative;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;

    img{
      width: 100%;
      height: auto;
    }
    .num{
      position: absolute;
      left:0;
      top: 22%;
      width: 100%;
      line-height: 64px;
      font-size: 60px;
      text-align: center;
    }
    .text{
      position: absolute;
      left:0;
      top: 64%;
      width: 100%;
      line-height: 18px;
      font-size: 16px;
      text-align: center;
    }
  }
  .order-title{
    height: 72px;
    line-height: 72px;
    font-size: 22px;
    color: #333;
  }
  .select-box{
    color: #676a6c;
    font-size: 12px;
    padding: 20px 0;
    background: #fff;
  }
  .select-item{
    float: left;
    padding-left: 20px;
    height: 30px;
    line-height: 30px;
    label{
      font-weight: 400;
    }
    .client{
      width: 105px;
    }
    .submit{
      width: 80px;
      height: 30px;
      background: #53caef;
      border: 0 none;
      -webkit-border-radius:5px;
      -moz-border-radius:5px;
      border-radius: 5px;
      color: #fff;
      font-size: 14px;
    }
  }
  .order-table{
    background: #fff;
    width: 100%;
    thead{
      background: #fafafa;
    }
    tr{
      height: 60px;
      line-height: 18px;
      text-align: center;
    }
    .tr2{
      background: #fafafa;
    }

    td{
      word-break:break-all;
    }
    .order-id{
      padding-left: 2.5%;
      min-width: 80px;
      text-align: left;
      position: relative;
    }
    .workOrderImg{
      position:absolute;
      width:20px;
      top:20px;
      left: 5px;
    }
    .order-name{
      min-width: 80px;
    }
    .order-managerName{
      min-width: 80px;
    }
    .order-phone{
      min-width: 100px;
    }
    .order-date{
      width: 95px;
    }


    .operate{
      min-width: 80px;
      font-size: 0;
      a{
        display: inline-block;
        width: 70px;
        margin: 0 2px;
        font-size: 14px;
        color: #2bb4ff;
      }
    }

  }
</style>
<style lang="less">


  #clientManagerIndex{
    /*选择日期*/
    .el-date-editor{
      width: 100px;
    }
    .el-input__inner{
      height: 30px;
      padding:0 10px;
    }
    .el-icon-date{
      display: none;
    }
    .el-select{
      width: 140px;
    }
    /*分页*/
    .el-pagination{
      padding: 40px 0;
      text-align: center;
      background: #fff;
    }
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
        finished:'',
        todo:'',
        currentPage:1,
        pageSize:10,
        totalRecord:20,
        orderNum:"",
        customerName:"",
        customerNameP:'',
        phone:"",
        phoneP:'',
        workId:"",
        userId:'',
        custInfo:{
          "contactName":"",
          "certNum":"",
          "telephone":"",
          "mobile":""
        },
        operateWord:'',
        current:1,
        title:"处理中的工单",
        slideLeft:'15%',
        order:{
          date1:"",
          date2:"",
          status:"1",
          client:"",
          num:''
        },
        status:[
          {
            value:"1",
            label:"处理中"
          },
          {
            value:"2",
            label:"已完成"
          },

        ],
        orderData:[],
        currentPage1:2
      }
    },
    created(){
      var self = this;
      self.orderDataChange();
    },
    methods:{

      orderChanage(i){
        this.current=i;
        if(i==1){
          this.slideLeft='15%';
          this.title="处理中的工单";
          this.order.status='1';
          this.inquire();
        } else if(i==2){
          this.slideLeft='50%';
          this.title="已完成的工单";
          this.order.status='2';
          this.inquire();
        }
      },
      //      查询函数
      inquire:function(){
        var self = this;
        self.currentPage = 1;
        self.orderDataChange();
      },
//      日期格式转换
      dateFun(date,time){
        var result='';
        result=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' ' + time;
        return result;
      },
//      开始施工||完成施工
      build:function(status,workId){
        this.workId=workId
        if(status=='未开始'){
          this.operateWord="是否确认开始施工？"
        }else if(status=='施工中'){
          this.operateWord="是否确认完成施工？"
        }

      },
//     确认开始施工
      AMsure:function(){
        var user = window.sessionStorage.getItem('user');
        var cust = window.sessionStorage.getItem('cust');
        var sysUserName = JSON.parse(user).sysUserName;
        var staffId = JSON.parse(user).staffId;
        if(this.operateWord=="是否确认开始施工？"){
          axios({
            method:"post",
            url:"/netCloudOrder/workOrder/workingOrder",
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
              console.log(response);
              console.log(response.data)
              if(response.data.code!=="0"){
                this.$alert('流程推进失败', '提示', {
                  confirmButtonText: '确定',
                  callback:action=>{
                  }
                });
              }else if(response.data.code=="0"){
                axios({
                  method:"post",
                  url:"/netCloudOrder/workOrder/findMyOrderConstruction",
                  params:{
                    params:{
                      user:{
                        staffId:staffId,
                        sysUuserName:sysUserName
                      },
                      pageSize:10,
                      pageNo:1,
                      startTime:"",
                      endTime:"",
                      customerName:"",
                      orderNum:"",
                      phone:"",
                      status:"1"
                    }
                  }

                }).then(
                  response => {
                    console.log(response);
                    console.log(response.data)
                    this.orderData=response.data.data;
                    this.finished=response.data.finished;
                    this.todo=response.data.todo;
                    this.currentPage=response.data.pageNo;
                    this.pageSize=response.data.pageSize;
                    this.totalRecord=response.data.totalRecord;
                  }
                ).catch(error=>{
                  console.log(error)
                })
              }
            }
          ).catch(error=>{
            console.log(error)
          })
        }else if(this.operateWord=="是否确认完成施工？"){
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
              console.log(response);
              console.log(response.data)
              if(response.data.code!=="0"){
                this.$alert('流程推进失败', '提示', {
                  confirmButtonText: '确定',
                  callback:action=>{
                  }
                });
              }else if(response.data.code=="0"){
                axios({
                  method:"post",
                  url:"/netCloudOrder/workOrder/findMyOrderConstruction",
                  params:{
                    params:{
                      user:{
                        staffId:staffId,
                        sysUuserName:sysUserName
                      },
                      pageSize:10,
                      pageNo:1,
                      startTime:"",
                      endTime:"",
                      customerName:"",
                      orderNum:"",
                      phone:"",
                      status:"1"
                    }
                  }

                }).then(
                  response => {
                    console.log(response);
                    console.log(response.data)
                    this.orderData=response.data.data;
                    this.finished=response.data.finished;
                    this.todo=response.data.todo;
                    this.currentPage=response.data.pageNo;
                    this.pageSize=response.data.pageSize;
                    this.totalRecord=response.data.totalRecord;
                  }
                ).catch(error=>{
                  console.log(error)
                })
              }
            }
          ).catch(error=>{
            console.log(error)
          })
        }
        console.log(this.orderNum);

      },
      //      分页
      handleCurrentChange(){
        this.orderDataChange();
//        this.$router.replace('/myWorkOrder2?order='+ self.order.status +'&page=' + self.currentPage);
      },
      orderDataChange(){
        var user = window.sessionStorage.getItem('user');
        var sysUserName = JSON.parse(user).sysUserName;
        var staffId = JSON.parse(user).staffId;
        var self = this;
        var date1="";
        var date2="";
        if(date1!==""&&date2!==""){
          date1=this.dateFun(self.order.date1,"00:00:00");
          date2=this.dateFun(self.order.date2,"23:59:59");
        }
        axios({
          method:"post",
          url:"/netCloudOrder/workOrder/findMyOrderConstruction",
          params:{
            params:{
              user:{
                staffId:staffId,
                sysUuserName:sysUserName
              },
              pageSize:self.pageSize,
              pageNo:self.currentPage,
              startTime:date1,
              endTime:date2,
              customerName:self.order.client,
              orderNum:self.order.num,
              phone:self.phoneP,
              status:""
            }
          }

        }).then(
          response => {
            this.orderData=response.data.data;
            this.orderData.forEach((v)=>{
              if(v.createDate!=''){
                let pos = v.createDate.indexOf(' ');
                v.createDate = v.createDate.slice(0,pos);
              }
            });
            this.finished=response.data.finished;
            this.todo=response.data.todo;
            this.pageSize=response.data.pageSize;
            this.totalRecord=response.data.totalRecord;
          }
        ).catch(error=>{
          console.log(error)
        })

      }

    }
  }
</script>
