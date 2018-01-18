<template>
  <div class="page">
    <MyNav :current="current"></MyNav>
    <div class="order clearfix">
      <span></span>
      <p class="title">待处理工单</p>
      <p class="num">23</p>
    </div>
    <div class="myOrder">
      <ul class="myOrder-title clearfix">
        <li>我的工单</li>
      </ul>
      <a class="more" href="##" target="_blank">More</a>
      <table>
        <thead>
        <tr>
          <td style="width: 210px;">工单编号</td>
          <td style="width: 210px;">订单编号</td>
          <td style="width: 210px;">客户名称</td>
          <td style="width: 130px;">客户手机号</td>
          <td style="width: 260px;">联系地址</td>
          <td style="width: 90px;">状态</td>
          <td>操作</td>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in orderData" :class="{tr2:index%2==1}">
          <td>{{item.id1}}</td>
          <td>{{item.id2}}</td>
          <td>{{item.client}}</td>
          <td>{{item.phone}}</td>
          <td>{{item.addr}}</td>
          <td>{{item.status}}</td>
          <td class="operate">
            <a href="javascript:void(0);" @click="sendBox=true">接单</a>
            <a href="##" target="_blank">派单</a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="sendBox" class="send">
      <div class="send-box">
        <p class="send-title">接单<span @click="sendBox=false"></span></p>
        <section class="date">
          <label>接单时间：</label><input type="text" v-model="date" placeholder="请输入日期" @focus="dateBox=true" />
          <calendar v-if="dateBox" class="calendar" @getDate="changeDate"></calendar>
        </section>
        <section>
          <label>备注：</label><textarea v-model="text"></textarea>
        </section>
        <section class="btn-list clearfix">
          <button @click="submit">提交</button>
          <button @click="reset">取消</button>
        </section>
      </div>
    </div>
    <MyFooter></MyFooter>
  </div>
</template>
<style scoped lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  .page{
    background: #f6f6f6;
  }
  .order{
    width: 1287px;
    height: 90px;
    padding-left: 20px;
    background: #fff;
    margin: 59px auto 40px auto;
    box-shadow: 4px 10px 18px 0px rgba(204, 204, 204, 0.2);
    -webkit-box-shadow: 4px 10px 18px 0px rgba(204, 204, 204, 0.2);
    -moz-box-shadow: 4px 10px 18px 0px rgba(204, 204, 204, 0.2);
    position: relative;
    span{
      position: absolute;
      top: 25px;
      left: 20px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #fe9a1e url("../assets/img/order.png") left center no-repeat;

    }
    .title{
      float: left;
      height: 90px;
      line-height: 90px;
      padding: 0 30px 0 51px;
      font-size: 24px;
      color: #666;
    }
    .num{
      float: left;
      font-size: 36px;
      color: #333;
      line-height: 90px;
    }

  }
  .myOrder{
    position: relative;
    width: 1292px;
    height: 542px;
    border: 2px #f2f2f2 solid;
    margin: 0 auto;
    background: #fff;
    .more{
      position: absolute;
      top: 20px;
      right: 38px;
      width: 77px;
      height: 18px;
      line-height: 18px;
      font-size: 18px;
      color: #2bb4ff;
      text-align: left;
      background: url("../assets/img/more1.png") right center no-repeat;
      padding: 0;
      margin: 0;
    }
  }
  .myOrder-title{
    border: 1px #f2f2f2 solid;
    li{
      float: left;
      background: #318de7;
      color: #fff;
      width:195px;
      height: 53px;
      font-size: 24px;
      line-height: 53px;
      cursor: pointer;
      border-right: 2px #f2f2f2 solid;
      border-bottom: 1px #f2f2f2 solid;
      text-align: center;
    }
  }
  table{
    width: 100%;
    text-align: center;
    table-layout: fixed;
    line-height: 60px;
    thead{
      background: #fafafa;
      color: #333;
      font-size: 18px;
    }
    tbody{
      color: #666;
      font-size: 14px;
    }
    .tr2{
      background: #fafafa;
    }
    td{
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .operate{
    font-size: 0px;
    a{
      display: inline-block;
      height: 30px;
      line-height: 30px;
      vertical-align: middle;
      color: #2bb4ff;
      font-size: 18px;
      margin: 0 10px;
    }
  }
  .send{
    position: fixed;
    top: 0;
    left:0;
    background: rgba(0,0,0,0.15);
    width:100%;
    height: 100%;
    .send-box{
      width: 784px;
      height: 424px;
      background: #fff;
      position: absolute;
      top:50%;
      left:50%;
      margin: -212px 0 0 -392px;
      box-shadow: 4px 3px 10px 0px rgba(153, 153, 153, 0.3);
      -webkit-box-shadow: 4px 3px 10px 0px rgba(153, 153, 153, 0.3);
      -moz-box-shadow: 4px 3px 10px 0px rgba(153, 153, 153, 0.3);
    }
  }
  .send-title{
    width: 100%;
    height: 61px;
    line-height: 61px;
    text-align: center;
    color: #fff;
    font-size: 24px;
    background: #347aea;
    position: relative;
    span{
      position: absolute;
      top: 20px;
      right: 20px;
      width: 24px;
      height: 24px;
      background: url("../assets/img/cha.png")  center no-repeat;
      cursor: pointer;
    }
    span:hover{
      transform: rotate(90deg);
      transition: transform .5s;
    }
  }
  .send-box{
    section{
      line-height: 40px;
      padding-left: 145px;
      margin-top: 20px;
    }
    .date{
      margin-top: 51px;
      position: relative;
    }
    label{
      width: 120px;
      font-size: 18px;
      font-weight: 400;
      color: #333;
      text-align: right;
      padding-right: 20px;
      vertical-align: top;
    }
    input{
      width: 350px;
      height: 40px;
      padding-left: 20px;
      border: #ccc 1px solid;
      background: url("../assets/img/date-icon.png") no-repeat;
      background-position: 321px center;
    }
    textarea{
      resize: none;
      width: 350px;
      height: 120px;
      border: #ccc 1px solid;
      padding: 0 20px;
    }
    .btn-list{
      padding-left: 265px;
      overflow: hidden;
    }
    button{
      float: left;
      width: 159px;
      height: 40px;
      border: #ccc 1px solid;
      background: #347aea;
      color: #fff;
      margin-right: 33px;
    }
  }
  .calendar{
    position: absolute;
  }


</style>
<script>
  import MyNav from "./common/MyNav.vue";
  import MyFooter from "./common/MyFooter.vue";
  import calendar from './common/calendar.vue';
  export default{
    components:{
      MyNav,
      MyFooter,
      calendar
    },
    data(){
        return{
          current:"index",
          orderData:[
            {
              "id1":"1001011706120911",
              "id2":"1001011706120911",
              "client":"张三",
              "phone":"12345678901",
              "addr":"杭州市拱墅区118号",
              "status":"待处理"
            },
            {
              "id1":"1001011706120911",
              "id2":"1001011706120911",
              "client":"张三",
              "phone":"12345678901",
              "addr":"杭州市拱墅区118号",
              "status":"待处理"
            }
          ],
          dateBox: false,
          sendBox:false,
          date:"",
          text:"11111111"
        }
    },
    methods:{
      changeDate(str){
        this.date=str;
        this.dateBox=!this.dateBox;
        console.log(str);
      },
      submit(){

      },
      reset(){
        this.date="";
        this.text="";
      }
    }
  }
</script>
