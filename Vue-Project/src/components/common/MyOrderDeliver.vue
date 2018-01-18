<template>
  <div class="index">
    <MyNav :current="current"></MyNav>

    <div class="out-panel">
      <div class="myOrderDeliverContainer">
        <div class="myOrderDeliver-top">
          <div class="myOrder" id="myOrder" name="myOrder">
            <div class="myOrder-inner">我的订单</div>
          </div>

          <div class="myOrder-return">返回</div>
        </div>

        <div class="myOrderDeliver-middle">
          <div id="create-time" name="create-time" class="create-time">
            <label>创建时间:&nbsp;&nbsp;</label>
            <input class="form-control" id="time-begin" type="text" value=""></input>
            <span>至</span>
            <input class="form-control" id="time-end" type="text" value=""></input>
          </div>

          <div id="order-status" name="order-status" class="order-status">
            <label>状态:&nbsp;&nbsp;</label>
            <select class="select-after-label form-control">
              <option>全部</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>

          <div id="order-customer" name="order-customer" class="order-customer">
            <label>所属客户:&nbsp;&nbsp;</label>
            <select class="select-after-label form-control">
              <option>全部</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>

          <div class="order-query" id="order-query" name="order-query">查询</div>

        </div>

        <div class="order-table" id="order-table" name="order-table">
          <table class="table">
            <thead>
              <tr>
                <td style="width:15%;">工单编号</td>
                <td style="width:15%;">订单编号</td>
                <td style="width:10%;">所属客户</td>
                <td style="width:15%;">客户手机号</td>
                <td style="width:20%;">联系地址</td>
                <td style="width:10%;">状态</td>
                <td style="width:15%;">操作</td>
              </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in clientData" :class="{tr2:index%2==1}">
              <td style="width:15%;">{{item.wordOrderNum}}</td>
              <td style="width:15%;"> {{item.orderNum}}</td>
              <td style="width:10%;">{{item.customer}}</td>
              <td style="width:15%;">{{item.phoneNum}}</td>
              <td style="width:20%;">{{item.address}}</td>
              <td style="width:10%;">{{item.status}}</td>
              <td style="width:30%;">
                <div class="order-receive"     id="order-receive"       name="order-receive">接单</div>
                <div class="order-dispatch"    id="order-dispatch"      name="order-dispatch">派单</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>

    <MyFooter></MyFooter>
  </div>
</template>

<script>
  import MyNav from '../common/MyNav.vue';
  import MyFooter from '../common/MyFooter.vue';

  export default {
    components:{
      MyNav,
      MyFooter
    },

    data(){
      return{
        clientData:[
          {
            "wordOrderNum":'1001011706120911',
            "orderNum":'1001011706120911',
            "customer":'张三',
            "phoneNum":'12345678900',
            "address":'杭州市拱墅区118号',
            "status":'待处理',
          },
          {
            "wordOrderNum":1001011706120911,
            "orderNum":1001011706120911,
            "customer":'张三',
            "phoneNum":'12345678900',
            "address":'杭州市拱墅区118号',
            "status":'待处理',
          }
        ]
      }
    }
  }
</script>

<style scoped lang="less">
  .index{
    min-width: 1312px;
    background: #f6f6f6;
    overflow: hidden;
  }

  .out-panel{
    width: 100%;
    padding-top: 62px;
    background-color: #f6f6f6;
    margin-bottom: 85px;
  }

  .myOrderDeliverContainer{
    width: 1300px;
    height: 697px;
    margin:0 auto;
    background-color: white;
  }

  .myOrderDeliver-top{
    height: 56px;
    background-color: white;
  }

  .myOrder{
    background-color: #28a4c9;
    width: 200px;
    height: 100%;
    float: left;
  }

  .myOrder-inner{
    font-size:20px;
    color: white;
    text-align:center;
    padding-top: 15px;
  }

  .myOrder-return{
    margin:20px 50px;
    width:50px;
    height: 26px;
    padding-top: 3px;
    float:right;
    background:#75c579;
    color:white;
    border-radius: 3px;
    text-align: center;
  }

  .myOrderDeliver-middle{
    width: 100%;
    height:84px;

  }

  .create-time{
    width: 400px;
    height: 84px;
    float:left;

    span{
      margin:25px 5px;
      line-height:34px;
      float: left;
    }

    label{
      font-size: 20px;
      float:left;
      padding-left: 60px;
      color:#676a6c;
      line-height: 80px;
    }

    input{
      width: 100px;
      float:left;
      margin-top:25px;
      line-height: 34px;
    }
  }

  .select-after-label{
    float:left;
    width:125px;
    margin:23px 5px;
  }

  #order-status{
    width: 257px;
    height: 84px;
    float:left;

    label{
      font-size: 20px;
      float:left;
      padding-left: 30px;
      padding-top:25px;
      color:#676a6c;
    }

    div{
      font-size: 20px;
      float:left;
      padding-top:25px;
      color:#676a6c;
    }
  }

  #order-customer{
    width: 267px;
    height: 84px;
    float:left;

    label{
      font-size: 20px;
      float:left;
      padding-left:20px;
      padding-top:25px;
      color:#676a6c;
    }

    div{
      font-size: 20px;
      float:left;
      padding-top:25px;
      color:#676a6c;
    }
  }

  #order-query{
    margin:20px;
    width:92px;
    height: 34px;
    float:right;
    background:#fe9a1e;
    color:white;
    border-radius: 2px;
    text-align: center;
    padding-top: 6px;
  }

  #order-table{
    width: 100%;
    height: 400px;
  }

  table{
    width:100%;
    text-align: center;
    table-layout: fixed;
    line-height: 60px;
    vertical-align: middle;

    thead{
      background: #fafafa;
      color: #333;
      font-size: 18px;
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


  #order-receive{
    width:50%;
    font-size: 14px;
    color:#2bb4ff;
    float:left;
    padding-left: 30px;
    cursor: pointer;
  }

  #order-dispatch{
    width:50%;
    font-size: 14px;
    color:#2bb4ff;
    float:left;
    cursor: pointer;
  }

</style>
