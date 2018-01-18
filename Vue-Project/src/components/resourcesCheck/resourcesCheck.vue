<!--资源审核-->
<template>
  <div class="page" id="clientManagerIndex">
    <UserNav></UserNav>
    <div class="page-cont clearfix">
      <ClientManagerNav></ClientManagerNav>
      <div class="right">
        <div class="order">
          <p class="order-title">订单列表</p>
          <div class="select-box clearfix">
            <div class="select-item">
              <label>订单编号：</label><input v-model="order.orderId" />
            </div>
            <div class="select-item">
              <label>客户名称：</label><input v-model="order.client" />
            </div>
            <div class="select-item">
              <label>审核状态：</label><el-select size="small" v-model="order.status" placeholder="请选择">
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </div>
            <div class="select-item">
              <button class="submit" type="button" @click="orderDataChange">查询</button>
            </div>
          </div>
          <div class="order-list" :style="{minHeight:minHeight+'px'}">
            <table class="order-table">
              <thead>
              <tr class="table-title">
                <td class="order-id">订单编号</td>
                <td class="order-pro">商品名称</td>
                <td class="order-client">客户名称</td>
                <td class="order-date">创建时间</td>
                <td class="order-currPrice">金额</td>
                <td class="order-tool">操作</td>
              </tr>
              </thead>
              <tbody v-for="(item, index) in orderData">
              <tr>
                <td>{{item.orderItemId}}</td>
                <td>{{item.offerName}}<i :class="['prodIcon',item.prodShow?'el-icon-remove':'el-icon-circle-plus']" @click="prodShowFun(index)"></i></td>
                <td>{{item.custName}}</td>
                <td>{{item.createDate}}</td>
                <td>{{item.realAmount}}元</td>
                <td class="operate">
                  <router-link v-if="item.statusCd=='10'" :to="'/resourcesCheckInfo?id=' + item.orderItemId + '&offerId=' + item.offerId">审核</router-link>
                  <p v-else-if="item.statusCd=='11'" class="pass">审核通过</p>
                  <p v-else-if="item.statusCd=='12'">审核未通过</p>
                </td>
              </tr>
              <tr class="table-title prodItem-title" v-if="item.prodShow">
                <td class="order-id"></td>
                <td class="order-pro">产品名称</td>
                <td class="order-client">业务号码</td>
                <!--<td class="order-date">折扣</td>-->
                <td class="order-currPrice">金额</td>
                <td class="order-status">产品状态</td>
                <td class="order-tool">生失效时间</td>
              </tr>
              <tr class="prodItem-list" v-for="proItem in item.orderProductInstanceList" v-if="item.prodShow">
                <td class="prod-null"></td>
                <td>{{proItem.productName}}</td>
                <td>{{proItem.accNum}}</td>
                <!--<td>{{proItem.discount}}</td>-->
                <td>{{proItem.realAmount}}</td>
                <td>{{item.orderItemCd == '1'?'新装':item.orderItemCd == '2'?'试用':''}}</td>
                <td>{{proItem.effDate}}-{{proItem.expDate}}</td>
              </tr>
              </tbody>
            </table>
            <el-pagination
              @current-change="orderDataChange"
              :current-page.sync="currentPage"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="total">
            </el-pagination>
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
    width: 100%;
    padding-left: 14.16%;
  }
  .order{
    padding: 0 30px 40px 30px;
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
    font-size: 12px;
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
      min-width: 120px;
    }
    .order-pro{
      min-width: 140px;
    }
    .order-date{
      width: 100px;
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
      min-width:130px;
    }
    .operate{
      min-width: 80px;
      font-size: 0;
      a{
        display: inline-block;
        margin: 0 2px;
        font-size: 12px;
        color: #2bb4ff;
      }
      p{
        margin: 0;
        display: inline-block;
        color: #ddd;
        font-size: 12px;
      }
      .pass{
        color: #00ff2a;
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
  import UserNav from '../common/UserHeader.vue';
  import ClientManagerNav from '../common/ClientManagerNav.vue';

  export default{
    components:{
      UserNav,
      ClientManagerNav
    },
    data(){
      return{
        userID:"",
        minHeight:0,
        current:'',
        slideLeft:'15%',
        order:{
          orderId:"",
          client:"",
          status:''
        },
        status:[ // 10:资源未审核 11：资源审核通过 12：资源未通过
          {
            value:"",
            label:"全部"
          },
          {
            value:"10",
            label:"资源审核中"
          },
          {
            value:"11",
            label:"资源审核通过"
          },
          {
            value:"12",
            label:"资源审核未通过"
          }
        ],
        orderData:[],
        currentPage:1,
        pageSize:10,
        total:1,
      }
    },
    created(){
      var self = this;
//        最小全屏高度
      var height=document.documentElement.clientHeight;
      this.minHeight=height-60-72-60-40;
      if(this.minHeight<=0){
        this.minHeight=0;
      }
//      获取用户id
      var user = window.sessionStorage.getItem('user');
      if(user != null && user != ''){
        this.userID=JSON.parse(user).sysUserCode;
      }

      this.$router.replace('/resourcesCheck?order='+ self.current +'&page=' + self.currentPage);
//      获取当前路由参数
      var order = this.$route.query.order;

      if(order){
        this.current = order;
      }
      this.orderDataChange();
    },
    methods:{
      //订单列表查询
      orderDataChange(){
        var self = this;
        var data = {
          orderNum:self.order.orderId, //订单编号
          sysUserCode:self.userID, //登录用户
          stateCd:self.order.status, //状态
          customerName:self.order.client, //客户名称
          pageSize:self.pageSize.toString(),
          pageNo:self.currentPage.toString()
        };
        axios({
          method:"post",
          url:"/netCloudOrder/orderListService/cloudListCheck",
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
                  b.discount = b.discount + '%';
                });
              })
              self.total = parseInt(res.data.totalRecord);
              self.$router.replace('/resourcesCheck?order='+ self.current +'&page=' + self.currentPage);
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
      dateFun(date,time){
        var result='';
        if(date != null && date != '') {
          let m = date.getMonth() + 1;
          let d = date.getDate();
          if(m < 10 && m > 0){
              m = ('0' + m).toString();
          }
          if(d < 10 && d > 0){
            d = ('0' + d).toString();
          }
          result = date.getFullYear() + '-' + m + '-' + d + ' ' + time;
        }
        return result;
      },
      prodShowFun(i){
        this.orderData[i].prodShow = !this.orderData[i].prodShow;
      }
    }
  }
</script>
