<!--客户经理门户-->
<template>
  <div class="page" id="clientManagerIndex">
    <UserNav></UserNav>
    <div class="page-cont clearfix">
      <ClientManagerNav></ClientManagerNav>
      <div class="right">
        <div class="shadow"></div>
        <div class="order">
          <div class="order-btn">
            <i :style="{left: slideLeft}"></i>
            <div :class="['order-item',current==status[0].value?'order-current1':'']" @click="orderChanage(status[0].value,0)">
              <img src="../assets/img/order-bg1.png" />
              <p class="num">{{orderStatusNum[0]}}</p>
              <p class="text">处理中的订单</p>
            </div>
            <div :class="['order-item',current==status[1].value?'order-current2':'']" @click="orderChanage(status[1].value,0)">
              <img src="../assets/img/order-bg2.png" />
              <p class="num">{{orderStatusNum[1]}}</p>
              <p class="text">已完成的订单</p>
            </div>
            <div :class="['order-item',current==status[2].value?'order-current3':'']" @click="orderChanage(status[2].value,0)">
              <img src="../assets/img/order-bg3.png" />
              <p class="num">{{orderStatusNum[2]}}</p>
              <p class="text">异常订单</p>
            </div>
          </div>
          <p class="order-title">{{title}}</p>
          <div class="select-box clearfix">
            <div class="select-item">
              <label>订单编号：</label><input v-model="order.orderId" />
            </div>
            <div class="select-item">
              <label>客户名称：</label><input v-model="order.client" />
            </div>
            <div class="select-item">
              <label>业务号码：</label><input v-model="order.code" />
            </div>
            <div class="select-item">
              <button class="submit" type="button" @click="searchFun">查询</button>
            </div>
          </div>
          <div class="order-list" :style="{minHeight:minHeight+'px'}">
            <table class="order-table">
              <thead>
              <tr class="table-title">
                <td class="order-id">订单编号</td>
                <td class="order-client">商品名称</td>
                <td class="order-pro">客户名称</td>
                <td class="order-date">创建时间</td>
                <td class="order-currPrice">金额</td>
                <td class="order-status">订单状态</td>
                <td class="order-tool"></td>
              </tr>
              </thead>
              <tbody v-for="(item, index) in orderData">
              <tr>
                <td>{{item.orderItemId}}</td>
                <td>{{item.offerName}}<i :class="['prodIcon',item.prodShow?'el-icon-remove':'el-icon-circle-plus']" @click.stop="prodShowFun(index)"></i></td>
                <td>{{item.custName}}</td>
                <td>{{item.createDate}}</td>
                <!--<td>{{item.price}}</td>-->
                <td>{{item.realAmount}}元</td>
                <!--<td class="status1">{{item.statusCd}}</td>-->
                <td :class="item.statusCd=='已完成'?'status2':'status1'">{{item.statusCd}}</td>
                <td class="operate">
                  <!--<a href="javascript:;" @click="orderDetail(item.custOrderId)">详情</a>-->
                  <!--<a v-if="item.statusCd!='已完成'" href="javascript:;" @click.stop="edit()">修改</a>-->
                  <!--<a href="javascript:void(0);" @click.stop="reset()">取消</a>-->
                  <!--<a href="javascript:void(0);" @click.stop="recede()">退单</a>-->
                </td>
              </tr>
              <tr class="table-title prodItem-title" v-if="item.prodShow">
                <td class="order-id"></td>
                <td class="order-client">产品名称</td>
                <td class="order-pro">业务号码</td>
                <td class="order-date">折扣</td>
                <td class="order-currPrice">金额</td>
                <td class="order-status">产品状态</td>
                <td class="order-tool">生失效时间</td>
              </tr>
              <tr class="prodItem-list" v-for="proItem in item.orderProductInstanceList" v-if="item.prodShow">
                <td class="prod-null"></td>
                <td>{{proItem.productName}}</td>
                <td>{{proItem.accNum}}</td>
                <td>{{proItem.discount}}</td>
                <td>{{proItem.realAmount}}</td>
                <td>{{proItem.statusCd}}</td>
                <td>{{proItem.effDate}}-{{proItem.expDate}}</td>
              </tr>
              </tbody>
            </table>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!--<orderDetail :orderId="orderId"-->
                 <!--:showBool.sync = 'orderDetailShow'-->
                 <!--v-if="orderDetailShow"-->
    <!--&gt;</orderDetail>-->
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
  .shadow{
    height: 30px;
    width: 100%;
    background: url("../assets/img/shadow.png") repeat-x;
  }
  .order{
    padding: 0 30px 40px 30px;
  }
  .order-btn{
    display: flex;
    display: -webkit-flex;
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
  .order-current3{
    transform: scale(1.05);
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -o-transform: scale(1.05);
    box-shadow: rgba(85, 193, 250, 0.34) 0 0 15px 2px;
    -webkit-box-shadow: rgba(85, 193, 250, 0.34) 0 0 15px 2px;
    -moz-box-shadow: rgba(85, 193, 250, 0.34) 0 0 15px 2px;
    -o-box-shadow: rgba(85, 193, 250, 0.34) 0 0 15px 2px;
  }
  .order-item{
    width: 31.86%;
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
    color: #333;
    font-size: 14px;
    padding: 15px 0;
    background: #fff;
    input{
      width: 168px;
      height: 30px;
      padding-left: 5px;
      border: 0 none;
      background: #f0f0f0;
    }
  }
  .select-item{
    float: left;
    padding-left: 30px;
    height: 30px;
    line-height: 30px;
    label{
      font-weight: 400;
    }
    .client{
      width: 140px;
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
  .order-list{
    position: relative;
    padding-bottom: 100px;
    background: #fff;
  }
  .order-table{
    background: #fff;
    width: 100%;
    font-size: 14px;
    color: #333;
    .table-title{
      color: #999;
    }
    tr{
      height: 45px;
      line-height: 18px;
      text-align: center;
      border-top: #d2d2d2 1px solid;
    }
    td{
      word-break:break-all;
    }
    .order-id{
      min-width: 130px;
    }
    .order-client{
      min-width: 156px;
    }
    .order-pro{
      min-width: 100px;
    }
    .order-date{
      width: 95px;
    }
    .order-price{
      min-width: 70px;
    }
    .order-currPrice{
      min-width: 90px;
    }
    .order-status{
      min-width: 90px;
    }
    .order-num{
      min-width: 100px;
    }
    .order-tool{
      min-width:150px;
    }
    .operate{
      min-width: 80px;
      font-size: 0;
      a{
        display: inline-block;
        margin: 0 2px;
        font-size: 14px;
        color: #2bb4ff;
      }
    }
    .status1{
      color: #fe9a1e;
    }
    .status2{
      color: #75c579;
    }

    .prodItem-title,.prodItem-list{
      background: #f6f6f6;
    }
    .prodItem-list{
      border: 0 none;
      td{
        border-top: 1px #d2d2d2 dashed;
      }
      .prod-null{
        border: 0 none;
      }
    }
  }
  .prodIcon{
    color: #b9d1dc;
    padding-left: 10px;
    font-size: 14px;
    cursor: pointer;
  }
  .el-pagination{
    position: absolute;
    bottom: 0;
    left: 0;
    width:100%;
    padding: 30px 0;
    text-align: center;
    background: #fff;
  }
</style>
<script>
  import UserNav from './common/UserHeader.vue';
  import ClientManagerNav from './common/ClientManagerNav.vue';
//  import orderDetail from './clientManager/orderDetail.vue';

  export default{
    components:{
      UserNav,
      ClientManagerNav,
//      orderDetail
    },
    data(){
      return{
        userID:"",
        minHeight:0,
        current:'1,2,3,4,5,6,8',
        title:"处理中的订单",
        slideLeft:'15%',
        orderStatusNum:[0,0,0],
        orderId:'',
        orderDetailShow:false,
        order:{
          orderId:"",
          client:"",
          code:""
        },
        status:[
          {
            value:"1,2,3,4,5,6,8"
          },
          {
            value:"7"
          },
          {
            value:"9"
          },
        ],
        orderData:[],
        currentPage:1,
        pageSize:5,
        total:1,
      }
    },
    created(){
      var self = this;
//        最小全屏高度
      var height=document.documentElement.clientHeight;
      this.minHeight=height-110-30-90-72-70-40;
      if(this.minHeight<=0){
        this.minHeight=0;
      }
//      获取用户id
      var user = window.sessionStorage.getItem('user');
      if(user != null && user != ''){
        this.userID=JSON.parse(user).staffId;
      }
//      获取订单数量
      this.orderNum(this.status[0].value,0);
      this.orderNum(this.status[1].value,1);
      this.orderNum(this.status[2].value,2);

//      获取当前路由参数
      var order = this.$route.query.order;
      var currentPage = this.$route.query.currentPage;
      if(order!=undefined && order!=null){
        self.current = order;
      }
      self.orderChanage(self.current,1);
    },
    methods:{
      orderNum(status,index){
          var self = this;
          axios({
            method:"post",
            url:'/netCloudOrder/orderService/getOrderQuantityByStatus',
            data:{
              statusCd:status,
              orderHandlerId:self.userID
            }
          }).then(res=>{
            self.$set(self.orderStatusNum,index,res.data.data);
          }).catch(err=>{
              console.log(err)
          })
      },
      orderChanage(i,key){
//          i是类型，key：若key为0则从第1页开始，否组默认刷新页码不变
        var self = this;
        this.current=i;
        if(key==0){
          self.currentPage = 1;
        } else if(key==1){
          if(!this.$route.query.page || this.$route.query.page==1 || this.$route.query.page=='1'){
            self.currentPage = 1;
          } else {
            self.currentPage = parseInt(this.$route.query.page);
          }
        }
//        三角形定位
        if(i==this.status[0].value){
          this.setDataByI(i,'15%',"处理中的订单");
        } else if(i==this.status[1].value){
          this.setDataByI(i,'50%',"已完成的订单");
        } else if(i==this.status[2].value){
          this.setDataByI(i,'85%',"异常订单");
        }
      },
      setDataByI:function(i,slideLeft,title){
        var self = this;
//            控制当前样式
        this.slideLeft=slideLeft;
        this.title=title;
        this.current=i;
        this.$router.replace('/ClientManagerIndex?order='+ self.current +'&page=' + self.currentPage);
        this.orderDataChange();
      },
      handleCurrentChange(){
        var self = this;
        self.orderDataChange();
        self.$router.replace('/ClientManagerIndex?order='+ self.current +'&page=' + self.currentPage);
      },
      //订单列表查询
      orderDataChange(){
        var self = this;
        var data = {
          orderHandlerId:self.userID,
          fromDate:'',
          endDate:'',
          statusCd:self.current,
          custName:self.order.client,
          orderItemId:self.order.orderId,
          accNum:self.order.code,
//          params:{
          pageSize:self.pageSize,
          pageNo:self.currentPage
//          }
        };
        axios({
          method:"post",
          url:"/netCloudOrder/orderService/getQueryOrders",
          data: data
        }).then(
          res => {
            self.orderData=[];
            if(res.data.code == '0' || res.data.code == 0){
              var data = res.data.data;
              self.orderData = JSON.parse(JSON.stringify(data));
              self.orderData.forEach((v,i) => {
                let dateArr = v.createDate.split(' ')
                v.createDate = dateArr[0];
                this.$set(v,'prodShow',false);
                v.orderProductInstanceList.forEach((b)=>{
                  b.effDate = b.effDate.split('-')[0] + '.' + b.effDate.split('-')[1] + '.' + b.effDate.split('-')[2].split(' ')[0];
                  b.expDate = b.expDate.split('-')[0] + '.' + b.expDate.split('-')[1] + '.' + b.expDate.split('-')[2].split(' ')[0];
                })
              })
              self.total = parseInt(res.data.totalRecord);
            } else {
              this.$alert('查询出错', '提示', {
                confirmButtonText: '确定',
                callback:action=>{

                }
              });
            }
          }
        ).catch(error=>{
          console.log(error)
        })
      },
//      条件查询
      searchFun(){
        this.currentPage = 1;
        this.orderDataChange();
      },
//      修改日期
      dateFun(date,time){
        var result='';
        if(date != null && date != '') {
          result = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + time;
        }
        return result;
      },
//      产品展开
      prodShowFun(i){
        this.orderData[i].prodShow = !this.orderData[i].prodShow;
      },
//      查看详情
      orderDetail(orderId){
        this.orderId = orderId;
        this.orderDetailShow = true;
      },
//      修改
      edit(){},
//      取消
      reset(){},
//      退单
      recede(){}
    }
  }
</script>
