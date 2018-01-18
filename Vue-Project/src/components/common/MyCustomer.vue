<template>
  <div class="page">
    <MyNav :current="current"></MyNav>

    <div class="out-panel">
      <div class="myCustomerContainer">
          <div class="myCustomer-top">
            <div class="myCustomer" id="myCustomer" name="myCustomer">
              <div class="myCustomer-inner">我的客户</div>
            </div>

            <div class = "myCustomer-add2">
                  <img class="myCustomer-add-img" src="../../assets/img/add_customer.png">
                 <div class="myCustomer-add">新增客户</div>
            </div>

          </div>

          <div class="myCustomer-middle">
              <div id="customer-name" name="customer-name" class="customer-name">
                  <label>用户名称:&nbsp;&nbsp;</label>
                  <input type="text" value="请输入关键字"/>
              </div>

            <div id="phoneNum" name="phoneNum" class="phoneNum">
              <label>手机号:&nbsp;&nbsp;</label>
              <input type="text" value="请输入关键字"/>
            </div>

            <div id="customer-status" name="customer-status" class="customer-status">
              <label>状态:&nbsp;&nbsp;</label>
              <select class="select-after-label form-control">
                <option value="1">全部</option>
                <option value="2">已审核</option>
                <option value="3">未审核</option>
              </select>
            </div>

            <div class="customer-query" id="customer-query" name="customer-query">查询</div>

          </div>

          <div class="customer-table" id="customer-table" name="customer-table">
            <table class="table">
              <thead>
              <tr>
                <th style="width:15%;">用户名</th>
                <th style="width:15%">手机号码</th>
                <th style="width:10%">类型</th>
                <th style="width:15%">注册时间</th>
                <th style="width:15%">状态(是否实名审核)</th>
                <th style="width:30%;">操作</th>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="width:15%">张三</td>
                  <td style="width:15%"> 18029873621</td>
                  <td style="width:10%">个人</td>
                  <td style="width:15%">2017-08-04</td>
                  <td style="width:15%">是</td>
                  <td style="width:30%;padding-top:8px;padding-right:0px;">
                    <div class="operation-purchase" id="operation-purchase" name="operation-purchase">购物</div>
                    <div class="operation-order"    id="operation-order"     name="operation-order">订单</div>
                    <div class="operation-cart"     id="operation-cart"       name="operation-cart">购物车</div>
                    <div class="operation-ordered"  id="operation-ordered"   name="operation-ordered">已购商品</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        <div id="customer-page" name="customer-page" class="customer-page">
          <ul class="pagination">
            <li><a href="#">&laquo;</a></li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li><a href="#">&raquo;</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div style="background-color:#f6f6f6"><MyFooter></MyFooter></div>

  </div>
</template>

<script>
  import MyNav from '../common/MyNav.vue';
  import MyFooter from '../common/MyFooter.vue';

  export default {
    components: {
      MyNav,
      MyFooter
    },
    data() {
      return{
          current:'index'
      }
    },
    methods: {}
  }
</script>

<style scoped lang="less">
  .page{
    width: 100%;
  }

  .out-panel{
    width: 100%;
    padding-top: 30px;
    background-color: #f6f6f6;
  }

  .myCustomerContainer{
    width: 1300px;
    height: 697px;
    margin:0 auto;
    background-color: white;
  }

  .myCustomer-top{
    height: 56px;
    background-color:#f6f6f6;
  }

  .myCustomer{
    background-color: #f6f6f6;
    width: 200px;
    height: 100%;
    float: left;
  }

  .myCustomer-inner{
    font-size:20px;
    color: black;
    padding-top: 15px;
  }

  .myCustomer-add2{
    width:141px;
    height:30px;
    background-color: #52dc90;
    float: right;
    border-radius: 2px;
    cursor: pointer;
  }

  .myCustomer-add{
    color: white;
    font-size: 15px;
    margin-top: 4px;
    margin-left: 40px;
    float: left;
  }

  .myCustomer-add-img{
    width:25px;
    height:20px;
    float: left;
    margin-top: 5px;
    margin-left: 20px;
  }

  .myCustomer-middle{
    height:73px;
    border:none;
  }

  #customer-name{
    width: 278px;
    height: 73px;
    float:left;
    label{
      font-size: 15px;
      float:left;
      padding-left: 30px;
      padding-top:25px;
    }
    input{
      font-size: 15px;
      float:left;
      margin-top: 23px;
      padding-left: 5px;
      height: 27px;
      line-height: 27px;
      border-radius: 4px;
      width:140px;
      background-color: #eef1f2;
      border:none;
      font-size: 15px;
      color:#b8b8b9;
    }
  }

  #phoneNum{
    width: 278px;
    height: 73px;
    float:left;
    label{
      font-size: 15px;
      float:left;
      padding-left: 33px;
      padding-top:25px;
    }

    input{
      font-size: 15px;
      float:left;
      margin-top: 23px;
      padding-left: 5px;
      height: 27px;
      line-height: 27px;
      border-radius: 4px;
      width:140px;
      background-color: #eef1f2;
      border:none;
      font-size: 15px;
      color:#b8b8b9;
    }
  }

  #customer-status{
    width: 278px;
    height: 73px;
    float:left;

    label{
      font-size: 15px;
      float:left;
      padding-left: 30px;
      padding-top:25px;
    }
    select{
      display: inline-block;
      vertical-align: top;
      text-align: center;
      width:140px !important;
      margin-top: 21px;
    }
  }

  #customer-query{
    margin-top:21px;
    width:92px;
    height: 34px;
    float:left;
    background:#53caef;
    color:white;
    border-radius: 2px;
    text-align: center;
    padding-top: 6px;
    cursor: pointer;
  }

  #customer-table{
    width: 100%;
    height: 400px;
  }

  .table thead{
    background-color:#f2f2f2;
  }
  .table tr th{
    font-size: 15px;
    height:50px;
    border: none;
    text-align: center;
    vertical-align: middle;
  }

  .table tr td{
    font-size: 15px;
    text-align: center;
    vertical-align: middle;
  }

  #operation-purchase{
    width:20%;
    font-size: 15px;
    color:#2bb4ff;
    float:left;
    padding-top: 2px;
    cursor: pointer;
 }

  #operation-order{
       width:20%;
       font-size: 15px;
       color:#2bb4ff;
       float:left;
       padding-top: 2px;
       cursor: pointer;
  }

  #operation-ordered{
    width:25%;
    font-size: 15px;
    color:#2bb4ff;
    float:left;
    padding-top: 2px;
    cursor: pointer;
  }

  #operation-cart{
    width:25%;
    font-size: 15px;
    color:#2bb4ff;
    float:left;
    padding-top: 2px;
    cursor: pointer;
  }

  #customer-page{
    float:right;
    padding-right: 30px;
  }
</style>
