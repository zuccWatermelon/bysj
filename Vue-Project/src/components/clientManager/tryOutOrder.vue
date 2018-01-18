<!--试用中的订单-->
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
                <td class="order-pro">商品名称</td>
                <td class="order-client">客户名称</td>
                <td class="order-date">创建时间</td>
                <td class="order-status">订单状态</td>
                <td class="operate">操作</td>
              </tr>
              </thead>
              <tbody v-for="(item, index) in orderData">
              <tr>
                <td>{{item.orderItemId}}</td>
                <td>{{item.offerName}}<i :class="['prodIcon',item.prodShow?'el-icon-remove':'el-icon-circle-plus']" @click.stop="prodShowFun(index)"></i></td>
                <td>{{item.custName}}</td>
                <td>{{item.createDate}}</td>
                <!--<td>{{item.price}}</td>-->
                <!--<td>{{item.realAmount}}元</td>-->
                <!--<td class="status1">{{item.statusCd}}</td>-->
                <td>{{item.statusCdName}}</td>
                <td class="operate">
                  <a href="javascript:void(0);" @click.stop="recede(item.orderItemId,index)">转商用</a>
                </td>
              </tr>
              <tr class="table-title prodItem-title" v-if="item.prodShow">
                <td class="order-id"></td>
                <td class="order-pro">产品名称</td>
                <td class="order-client">业务号码</td>
                <td class="order-date">生失效时间</td>
                <td class="order-status">产品状态</td>
                <td class="operate"></td>
              </tr>
              <tr class="prodItem-list" v-for="proItem in item.orderProductInstanceList" v-if="item.prodShow">
                <td class="prod-null"><input type="checkbox" :disabled="item.statusCd == '13'" v-model="proItem.checkBool" /></td>
                <td>{{proItem.productName}}</td>
                <td>{{proItem.accNum}}</td>
                <td>{{proItem.effDate}}-{{proItem.expDate}}</td>
                <td>试用中</td>
                <td></td>
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
  .shadow{
    height: 30px;
    width: 100%;
    background: url("../../assets/img/shadow.png") repeat-x;
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
      min-width: 150px;
    }
    .order-pro{
      min-width: 150px;
    }
    .order-date{
      min-width: 170px;
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
        font-size: 12px;
        color: #2bb4ff;
      }
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
        text-align: right;
      }
      a{
        color: #2aabd2;
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
      ClientManagerNav,
    },
    data(){
      return{
        userID:"",
        minHeight:0,
        orderId:'',
        order:{
          orderId:"",
          client:"",
          code:""
        },
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
      self.orderDataChange();
    },
    methods:{
      //订单列表查询
      orderDataChange(){
        var self = this;
        var data = {
          accNum:self.order.code, //业务号码
          orderNum:self.order.orderId,//订单编号
          sysUserCode:self.userID, //登录账户编号
          customerName:self.order.client, //客户名称
//          params:{
          pageSize:self.pageSize.toString(),
          pageNo:self.currentPage.toString()
//          }
        };
        axios({
          method:"post",
          url:"/netCloudOrder/orderListService/trialsCloudList",
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
                  self.$set(v,'checkBool',false);
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
            this.$router.replace('/tryOutOrder?page=' + self.currentPage);
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
//      产品展开
      prodShowFun(i){
        this.orderData[i].prodShow = !this.orderData[i].prodShow;
      },
//      试转商
      recede(orderItemId,index){
        var self = this;
        let productInstanceId = '';
        self.orderData[index].orderProductInstanceList.forEach((v)=>{
           if(v.checkBool){
             if(productInstanceId == ''){
               productInstanceId = v.productInstanceId;
             }  else {
               productInstanceId = productInstanceId + ',' + v.productInstanceId;
             }
           }
        });
        let data = {
          orderItemId:orderItemId,
          prodInstId:productInstanceId,
          statusCd:'13',
          actionCode:'转商'
        }
        if(productInstanceId == ''){
          this.$alert('请选择一个产品！', '提示', {
            confirmButtonText: '确定',
            callback:action=>{
            }
          });
        } else {
          axios({
            method:'post',
            url:'/netCloudOrder/orderService/subOrderBusiness',
            data:data
          }).then(res=>{
            if(res.data.code == '0' || res.data.code == 0){
              self.$alert('转商中，请前往购物车操作', '提示', {
                confirmButtonText: '确定',
                callback:action=>{
                  self.$router.push('/shoppingCartFrame');
                }
              });
            } else {
              self.$alert('转商失败！', '提示', {
                confirmButtonText: '确定',
                callback:action=>{
                }
              });
            }
          }).catch(err=>{
            console.log(err)
          })
        }
      }
    }
  }
</script>
