<!-- 待补录订单列表 -->
<template>
  <div class="page">
    <UserNav></UserNav>
    <div class="page-cont">
      <ClientManagerNav :routerlinks="routerlinks"></ClientManagerNav>
      <div class="right">
        <div class="right-main">
          <div class="whiteBg" :style="{minHeight: minHeight + 'px'}">
            <div class="searchBar clearfix">
              <div class="inputGroup">
                <label>客户名称：</label>
                <input type="text" placeholder="" v-model="clientName">
              </div>
              <a href="javascript:void(0);" class="btn searchBtn" @click="dataChange">查询</a>
            </div>
            <table class="makeupTable">
              <thead>
              <tr>
                <th class="code" style="width: 30%;">订单编号</th>
                <th style="width: 30%;">客户</th>
                <th style="width: 30%;">产品名称</th>
                <th style="width: 10%;">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item,index) in orderData" :class="{tr2:index%2==1}">
                <td class="code">{{item.ORDER_ITEM_ID}}</td>
                <td>{{item.CUST_NAME}}</td>
                <td>{{item.PROD_NAME}}</td>
                <td><router-link :to="'/toMakeupInfo?idnum='+ item.ORDER_ITEM_ID + '&prodId=' + item.PROD_ID + '&custOrderId=' + item.CUST_ORDER_ID" class="detailLink">详情</router-link></td>
              </tr>
              </tbody>
            </table>
            <div v-if="orderData.length <= 0" class="null-box">
              <img src="../../assets/img/nullBox.png"/>
              <p>所有订单已经补录完成，可以好好休息啦~</p>
            </div>
            <div class="pagination" v-if="orderData.length > 0" >
              <el-pagination
                 @current-change="dataChange"
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
  </div>
</template>
<style scoped lang="less">
  .page{
    background: #f3f8fb;
    overflow: hidden;
  }
  .page-cont{
    position: relative;
  }
  .right{
    width: 100%;
    padding-left: 14.16%;
  }
  .right-main{
    padding: 20px 20px 10px 20px;
  }
  .whiteBg{
    background:white;
    position: relative;
    .pagination{
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      text-align: center;
    }
  }
  .searchBar{
    padding:15px;
    .inputGroup{
      box-sizing:border-box;
      -webkit-box-sizing:border-box;
      width:30%;
      display:block;
      float:left;
      padding-left:100px;
      padding-right:15px;
      position:relative;
      label{
        position:absolute;
        width:90px;
        line-height:34px;
        text-align:right;
        left:0;
        top:0;
      }
      input{
        width:100%;
        line-height:34px;
        height:34px;
        background:#f0f0f0;
        border-radius:4px;
        border:none;
        box-shadow:none;
        padding:0 12px;
      }
    }
    .searchBtn{
      float:left;
      background:#2facee;
      color:white;
    }
  }
  .makeupTable{width:100%;}
  .null-box{
    text-align: center;
    padding-top: 40px;
    p{
      padding-top: 20px;
      font-size: 14px;
      line-height: 20px;
      color: #999;
    }
  }
  .makeupTable .code{
    padding-left: 10px;
    text-align: left;
  }
  .makeupTable thead tr{background:#5c6f8a;}
  .makeupTable thead tr th{color:white;}
  .makeupTable tr th,.makeupTable tr td{line-height:36px;text-align:center;}
  .tr2{background:#f0f0f0;}
  .detailLink{color:#2facee;}
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
        minHeight:0,
        routerlinks:{
          current:'/waitRecord',
          links:[
            {
              name:'待补录订单',
              link:'/waitRecord'
            }
          ]
        },
        clientName:'',
        orderData:[],
        total:0,
        pageSize:6,
        currentPage:1
      }
    },
    created(){
      var self = this;
      //        最小全屏高度
      var height = document.documentElement.clientHeight;
      self.minHeight=height-60-30;
      if(self.minHeight<=0){
        self.minHeight=0;
      }
      self.dataChange();

    },
    methods:{
      dataChange(){
        var self = this;
        self.clientName = self.clientName.replace(/^\s+|\s+$/g,"");
        let user = window.sessionStorage.getItem('user');
        let userId = '';
        if(user != null && user != ''){
          userId = JSON.parse(user).staffId;
        }
        axios({
          method:"post",
          url:'/netCloudOrder/orderService/getWaitReentryInfo',
//          url:'http://134.98.100.72:8001/orderService/getWaitReentryInfo',
          data:{
            id: "203",
            statusCd: "8",
            custName: self.clientName,
            loginId: userId, //客户经理ID
            pageNo:self.currentPage.toString(),
            pageSize:self.pageSize.toString()
          }
        }).then(res=>{
          if(res.data.code == '0' || res.data.code == 0){
            self.orderData = res.data.data;
            self.total = parseInt(res.data.totalRecord);
          } else {
            this.$alert(res.data.msg, '提示', {
              confirmButtonText: '确定',
              callback:action=>{

              }
            });
          }
        }).catch(err=>{
          console.log(error);
        });
      }
    }
  }
</script>

