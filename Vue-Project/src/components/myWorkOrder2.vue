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
              <div class="codeMa">输入商品注册码</div>
              <div class="CJTsoft">
                <!--<div class="CJTsoft1" v-for="(item,index) in  findOrderItem">-->
                <!--<label>{{item.remark}}：</label><input v-on:input="write1($event,item.orderItemId)"  type="text"  value="" class="el-input__inner"/>-->
                <!--</div>-->
                <div class="CJTsoft1" >
                  <label>{{remark}}：</label><input v-on:input="write1($event)"  type="text"  value="" class="el-input__inner"/>
                </div>

              </div>
              <div class="codeMa">选择施工人员</div>
              <div class="orderTable1">
                <table class="orderTable">
                  <div class="orderTableD clearfix">
                    <div class="orderTableD1">姓名</div>
                    <div class="orderTableD1">手机号码</div>
                    <div class="orderTableD1">组织</div>
                  </div>
                  <div class="orderTable2"  >
                    <tr v-for="(item,index) in  findWorker">
                      <td>
                        <input type="radio" name="user" value="" @click="radioBtn($event,item.staffId)"/>
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
              <p class="text">待处理的工单</p>
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
              size="small"
              type="date"
              format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker> - <el-date-picker
              v-model="order.date2"
              size="small"
              type="date"
              format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
            </div>
            <div class="select-item">
              <label>订单号：</label>
              <input class="client el-input__inner"  placeholder="请输入内容" v-model="order.num" />

            </div>
            <!--<div class="select-item">-->
            <!--<label>客户经理姓名：</label>-->
            <!--<input claclientAssetsient el-input__inner"  placeholder="请输入内容" v-on:input="entry2($event)" value=""/>-->
            <!--</div>-->
            <div class="select-item">
              <label>客户姓名：</label>
              <input class="client el-input__inner"  placeholder="请输入内容" v-model="order.client" />
            </div>
            <!--<div class="select-item">-->
              <!--<label>手机号码：</label>-->
              <!--<input class="client el-input__inner"  placeholder="请输入内容" />-->
            <!--</div>-->
            <div class="select-item">
              <button class="submit" type="button" @click="inquire()">查询</button>
            </div>
          </div>
          <table class="order-table">
            <thead>
            <tr>
              <td class="order-id">号码</td>
              <td class="order-number">CRM订单编号</td>
              <!--<td class="order-managerName">客户经理姓名</td>-->
              <td class="order-name">客户姓名</td>
              <td class="order-phone">手机号码</td>
              <td class="order-date">时间</td>
              <td>操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in orderData" :class="{tr2:index%2==1}">

              <td class="order-id">
                {{item.orderNum}}
              </td>
              <td >{{item.bssOrderNum}}</td>
              <!--<td>{{item.managerName}}</td>-->
              <td class="order-name">{{item.customerName}}</td>
              <td>{{item.phone}}</td>
              <td>{{item.createDate}}</td>
              <td class="operate">
                <router-link :to="'/workOrderDetailsA?workId='+item.workId">工单详情</router-link>
                <a v-if="item.status=='未派单'" @click="build(item.workId)" class="changeBtn configuration" data-toggle="modal" data-target="#skyCloud_modal">派单</a>
                <!--<a v-show="item.status=='未开始'"></a>-->
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
  /*模态*/
  #clientManagerIndex .el-pagination{
    position: static!important;
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
    margin: -200px auto 0 auto;
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
    height:400px;
    background: #fff;
  }
  .modalBodyCenter{
    height:350px;
    /*line-height: 120px;*/
  }
  .modal-content{
    border-radius: 0;
    text-align: center;
    margin: 0 auto;

  }

  .codeMa{
    width:100%;
    height:40px;
    line-height: 40px;
    background: #f5f5f5;
    padding: 0 20px;

  }
  .CJTsoft{
    padding:20px 10px;
    height:120px;
    width:100%;
  }
  .CJTsoft1{
    float: left;
    margin-top: 10px;
    width: 240px;
  }
  .CJTsoft1 input{
    width:100px;
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
      height: 45px;
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
      min-width: 80px;
      position: relative;
      text-align: center;
    }
    .workOrderImg{
      position:absolute;
      width:20px;
      top:20px;
      left: 5px;
    }
    .order-name{
      overflow: hidden;
      width: 200px;
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
    padding: 30px 0;
    text-align: center;
    background: #fff;
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
        remark:"",
        orderItemId:"",
        findOrderItem:[],
        findWorker:[],
        finished:'',
        todo:'',
        currentPage:1,
        pageSize:5,
        totalRecord:4,

        entryA:'',
        entryB:'',
        entryC:'',
        entryD:'',
        startTime:"",
        endTime:"",
        managerName:"",
        customerName:"",
        orderNum:"",
        userId:'',
        workId:"",
        phone:"",
        orderItem:[],
        staffId:'',
        custInfo:{
          "contactName":"",
          "certNum":"",
          "telephone":"",
          "mobile":""
        },
        operateWord:'',
        order1:1200,
        order2:120,
        current:1,
        title:"待处理的工单",
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
            label:"待处理"
          },
          {
            value:"2",
            label:"已完成"
          },

        ],
        orderData:[],


      }
    },
    created(){
      var _this=this;
      _this.order.status = '1';
      _this.inquire();
    },
    methods:{
      orderChanage(i){
        this.current=i;
        if(i==1){
          this.slideLeft='15%';
          this.title="待处理的工单";
          this.order.status='1';
          this.inquire();
        } else if(i==2){
          this.slideLeft='50%';
          this.title="已完成的工单";
          this.order.status='2';
          this.inquire();
        }
      },
//      entry1:function(event){
//        var el=event.currentTarget;
//        this.orderNum=el.value;
//      },
//      entry3:function(event){
//        var el=event.currentTarget;
//        this.customerName=el.value;
//      },
//      entry4:function(event){
//        var el=event.currentTarget;
//        this.phone=el.value
//      },
//      查询函数
      inquire:function(){
        var self = this;
        self.currentPage = 1;
        self.orderDataChange();
      },
//      日期格式转换
      dateFun(date,time){
        var result='';
        if(date != null && date !='') {
          result = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + time;
        }
        return result;
      },
//      点击派单
      build:function(workId){
        var self = this;
        axios({
          method:"post",
          url:"/netCloudOrder/workOrder/findOrderItem",
          params:{
            params:{
              workId:workId,
            }
          }
        }).then(
          response => {
            self.orderItemId=response.data.data.orderItemId;
            self.remark=response.data.data.remark;
            axios({
              method:"post",
              url:"/netCloudOrder/workOrder/findWorker",

            }).then(
              response => {
                self.findWorker=response.data.data;
              }
            ).catch(error=>{
            });
          }).catch(error=>{
        })

      },
      write1:function(event){
        var _this=this;
        var el=event.currentTarget;
        var tempArr = [];
        var tmp = {"orderItemId":this.orderItemId,"businessId":el.value}
        tempArr.push(tmp);
        this.orderItem=tempArr;
      },
      radioBtn:function(event,staffId){
        this.staffId=staffId;
      },
      AMsure:function(){
        axios({
          method:"post",
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
        });
      },
//      分页
      handleCurrentChange(){
        var self = this;
        self.orderDataChange();
//        this.$router.replace('/myWorkOrder2?order='+ self.order.status +'&page=' + self.currentPage);
      },
      orderDataChange(){
        var self = this;
        var user = window.sessionStorage.getItem('user');
        var sysUserName = JSON.parse(user).sysUserName;
        var staffId = JSON.parse(user).staffId;
        var date1="";
        var date2="";
        if(date1!==""&&date2!==""){
          date1=this.dateFun(self.order.date1,"00:00:00");
          date2=this.dateFun(self.order.date2,"23:59:59");
        }
        axios({
          method:"post",
          url:"/netCloudOrder/workOrder/findTodoList",
          params:{
            params:{
              pageSize:self.pageSize,
              pageNo:self.currentPage,
              startTime:date1,
              endTime:date2,
              managerName:'',
              customerName:self.order.client,
              orderNum:self.orderNum,
              phone:self.phone,
              state:self.order.status,
              user:{
                staffId:staffId,
                sysUuserName:sysUserName
              },
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
            this.totalRecord=response.data.totalRecord;
          }).catch(error=>{
        })
      }
    },

  }
</script>
