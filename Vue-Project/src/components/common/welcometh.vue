<!--弃用-->
<template>
  <div class="send">
    <div class="send-box">
      <p class="send-title">客户选择<span @click="cancel()"></span></p>
      <table>
        <thead>
        <tr id="send-tabletr">
          <th style="width:70px">序号</th>
          <th style="width:110px ">客户姓名</th>
          <th style="width:180px ">证件号码</th>
          <th style="width:130px ">业务号码</th>
          <th style="width:110px ">所属区域</th>
          <th style="width:100px ">状态</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in custDataList" id="send-tablet">
          <th>{{item.id}}</th>
          <th>{{item.name}}</th>
          <th>{{item.documentNum}}</th>
          <th>{{item.documentType}}</th>
          <th>{{item.address}}</th>
          <th>
            <input name = "custSelect" type="radio"/>
          </th>
        </tr>
        </tbody>
      </table>
      <p>
        <a class="opentwo" href="javascript:void(0)" target="_blank" @click="submit()">确认</a>
        <a class="openthree" href="javascript:void(0)" target="_blank" @click="cancel()" >取消</a>
      </p>
    </div>
  </div>
</template>
<style scoped lang="less">
  .send{
    position: fixed;
    top: 0;
    left:0;
    background: rgba(0,0,0,0.15);
    width: 100%;
    height: 100%;
    z-index: 999;
  }
  .send-box{
    width: 687px;
    height: 416px;
    background: #fff;
    position: absolute;
    top:50%;
    left:50%;
    margin: -212px 0 0 -392px;
    box-shadow: 4px 3px 10px 0px rgba(153, 153, 153, 0.3);
    -webkit-box-shadow: 4px 3px 10px 0px rgba(153, 153, 153, 0.3);
    -moz-box-shadow: 4px 3px 10px 0px rgba(153, 153, 153, 0.3);
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
    margin: 0;
  }
  .send-title span{
    position: absolute;
    top: 20px;
    right: 20px;
    width: 24px;
    height: 24px;
    background: url("../../assets/img/cha.png")  center no-repeat;
    cursor: pointer;
  }
  .send-title span:hover{
    transform: rotate(90deg);
    transition: transform .5s;
  }
  #send-tabletr{
    width: 100%;
    height:60px;
    background-color: #f9f9f9;
  }
  #send-tabletr th{
    text-align: center;
  }
  #send-tablet{
    width: 100%;
    height:60px;
  }
  #send-tablet th{
    font-weight: 400;
    color: #3a3a3a;
    text-align: center;
  }
  .opentwo{
    position: absolute;
    top:340px;
    right: 370px;
    width: 120px;
    height: 30px;
    background: #3b7fea;
    color: #fff;
    /*border-radius: 7px;*/
    text-align: center;
    line-height: 30px;
    margin: 0;
    font-size: 12px;
  }
  .openthree{
    position: absolute;
    top:340px;
    right: 180px;
    width: 120px;
    height: 30px;
    background: #3b7fea;
    color: #fff;
    /*border-radius: 7px;*/
    text-align: center;
    line-height: 30px;
    margin: 0;
    font-size: 12px;
  }
  #certame{
    width: 350px;
    height:44px;
    background-color: white;
    border: none;
    margin-left: 24px;
    padding-left: 13px;
    font-size: 16px;
  }
</style>
<script>
  export default {
      props:["custDataList"],
      methods:{
        submit(){
          this.$emit("customer_search","1");
        },
        cancel(){
          this.$emit("customer_sear",this.customerSelectBox);
        },

      },
    data(){
      return {
        current: "index",
        dateBox: false,
        customerSelectBox: false,
        date: "",
        text: "11111111"
      }
    },

  }
</script>
