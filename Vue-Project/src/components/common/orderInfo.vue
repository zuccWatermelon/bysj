<!--订单详情-->
<template>
  <div class="page">
    <MyNav :current="current"></MyNav>

    <div class="out-panel">
      <div class="orderContainer">
        <div class="order-top">
          <div class="orderNum" id="orderNum" name="orderNum">
            <div class="orderNum-inner">订单编号:1001011706120911</div>
          </div>
          <router-link to="/myOrder"><button type="button" id="btn-return" name="btn-return" class="btn btn-success">返回订单列表</button></router-link>
        </div>

        <div class="order-middle">
            <div id="orderStatus">
                <label>订单状态:</label>
                <span>{{orderData.orderStatus}}</span>
            </div>
        </div>

        <div id="orderInfoTag">
          <div id="orderInfoLabel">
            <label>订单概要</label>
          </div>
        </div>

        <div id="orderInfo">
            <div id="orderId">
                <label>订单编号:</label>
                <span>{{orderData.orderId}}</span>
            </div>

            <div id="openTime">
              <label>支付/开通时间:</label>
              <span>{{orderData.openTime}}</span>
            </div>

          <div id="createTime">
            <label>创建时间:</label>
            <span>{{orderData.createTime}}</span>
          </div>

          <div id="orderStatusInfo">
            <label>订单状态:</label>
            <span>{{orderData.orderStatusInfo}}</span>
          </div>

        </div>


        <div id="orderDetailTag">
          <div id="orderDetailTagLabel">
            <label>订单详情</label>
          </div>
        </div>

        <table class="table">
         <thead>
          <tr>
            <th>产品</th>
            <th>数量</th>
            <th>具体内容</th>
            <th>付款方式</th>
            <th>起止时间</th>
            <th>金额</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in productData" :class="{tr2:index%2==0}">
            <td>{{item.productName}}</td>
            <td>{{item.productNum}}</td>
            <td>{{item.productContent}}</td>
            <td>{{item.productPay}}</td>
            <td>{{item.productTime}}</td>
            <td style="color:#318de7;">{{item.productPrice}}</td>
          </tr>
         </tbody>
        </table>

          <div>
            <div id="priceToPay">
              <label>应付金额:</label>
              <input type="text" value="￥113.00"/>
            </div>

            <div id="rowPrice">
                <label>原价:</label>
                <input type="text" value="￥117.00"/>
            </div>
          </div>
        </div>
    </div>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
  import MyNav from '../common/MyNav.vue';
  import MyFooter from '../common/MyFooter.vue';

  export default{
    components:{
      MyNav,
      MyFooter
    },
    data(){
      return{
        current:"partner",
        orderData: {
          "orderStatus":'已支付',
          "orderId": '100000000',
          "openTime":'2017-06-02 09:00:01',
          "createTime":'2017-06-02 08:55:01',
          "orderStatusInfo":'已支付￥1000.00',
        },
        productData:[
          {
              "productName":'云服务器',
              "productNum":"1",
              "productContent":"标准型云服务器,1核4G内存",
              "productPay":"按年(1年)",
              "productTime":"2017-06-02 09:00:01",
              "productPrice":"￥879"
          },
          {
            "productName":'云服务器',
            "productNum":"1",
            "productContent":"标准型云服务器,1核4G内存",
            "productPay":"按年(1年)",
            "productTime":"2017-06-02 09:00:01",
            "productPrice":"￥879"
          }
        ]
      }
    },
    methods:{

    }
  }
</script>

<style scoped lang="less">

  .page{
    width: 100%;
    background-color: #f6f6f6;
  }

  .out-panel{
    width: 100%;
    padding-top: 62px;
    padding-bottom: 100px;
    background-color: #f6f6f6;
  }

  .order-top{
    width: 999px;
    height: 56px;
  }

  .orderNum{
    background-color: #28a4c9;
    width: 465px;
    height: 56px;
    float: left;
  }

  .orderNum-inner{
    font-size:20px;
    color: white;
    text-align:center;
    padding-top: 15px;
  }

  #btn-return{
    margin:20px;
    float:right;
  }

  .order-middle{
    width: 999px;
    height: 67px;
    background-color: white;
  }

  #orderStatus label{
    font-size: 20px;
    color: black;
    padding-left: 20px;
    padding-top: 20px;
    color:#676a6c;
    float: left;
  }

  #orderStatus span{
    font-size: 20px;
    padding-left: 20px;
    padding-top: 20px;
    color:#5b9fea;
    float: left;
  }

  #orderInfoTag{
    width: 999px;
    height: 60px;
    background-color: #fafafa;
  }

  #orderInfoLabel label{
    font-size: 20px;
    color: black;
    padding-left: 20px;
    padding-top: 15px;
    float: left;
  }

  #orderInfo{
    width: 999px;
    height: 140px;
  }

  #rowPrice{
    float:right;
  }

  #rowPrice label{
    font-size: 20px;
  }

  #rowPrice input{
    border: none;
    font-size: 20px;
    color: deepskyblue;
  }

  #priceToPay{
    float:right;
    padding-right:auto;
  }

  #priceToPay label{
    font-size: 20px;
  }

  #priceToPay input{
    border: none;
    font-size: 20px;
    color: deepskyblue;
    width: 150px;
  }

  .table{
    font-size: 20px;
    text-align: center;
    vertical-align: middle;

    th{
      text-align: center;
      vertical-align: middle;
      height: 60px;
      border-bottom:none !important;
    }

    tr{
      height: 60px;
    }

    .tr2{
      height: 60px;
      background-color:#fafafa;
    }

    td{
      border-top: none !important;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      vertical-align: middle !important;
    }
  }

  .orderContainer{
    width: 1000px;
    height: 697px;
    margin:0 auto;
    background-color: white;
   }


  #orderId{
    float:left;
  }

  #orderId label{
      font-size: 20px;
      padding-top:10px;
      padding-left:20px;
      color: #666666;
  }

  #orderId span{
    font-size: 20px;
    width: auto;
    border:none;
    padding-left: 10px;
    color: #666666;
  }

  #openTime{
    float:left;
    padding-left:100px;
  }

  #openTime label{
    font-size: 20px;
    padding-top:10px;
    padding-left:20px;
    color: #666666;
  }

  #openTime span{
    font-size: 20px;
    width: auto;
    border:none;
    padding-left: 10px;
    margin-right: 20px;
    color: #666666;
  }

  #createTime{
    float:left;
    padding-top: 20px;
  }

  #createTime label{
    font-size: 20px;
    padding-top:20px;
    padding-left:20px;
    color: #666666;
  }

  #createTime span{
    font-size: 20px;
    width: auto;
    border:none;
    padding-left: 10px;
    color: #666666;
  }

  #orderStatusInfo{
    float:left;
    padding-top: 20px;
    padding-left:100px;
    color: #666666;
  }

  #orderStatusInfo label{
    font-size: 20px;
    padding-top:20px;
    padding-left:20px;
    color: #666666;
  }

  #orderStatusInfo span{
    font-size: 20px;
    width: auto;
    border:none;
    padding-left: 10px;
    margin-right: 20px;
  }

  #orderDetailTag{
    width: 999px;
    height: 60px;
    background-color: #fafafa;
  }


  #orderDetailTagLabel label{
    font-size: 20px;
    color: black;
    padding-left: 20px;
    padding-top: 15px;
    float: left;
  }

</style>
