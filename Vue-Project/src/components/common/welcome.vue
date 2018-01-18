<template>
  <div class="out-of-welcome" >
      <div class="welcome" >
        <div class="welWord">欢迎来到&nbsp;&nbsp;能力平台 !</div>
        <input type="text" placeholder="请输入客户姓名/证件号码/业务号码/服务号码" v-model="custInfo.contactName" id="certame" @keyup.13="keyFun($event)">
        <button class="welBtn" @click="query()">查询</button>
      </div>
      <div v-if="customerSelectBox" >
        <div class="send">
          <div class="send-box">
            <p class="send-title">客户选择<span @click="cancel()"></span></p>
            <table class="send-table">
              <thead>
              <tr id="send-tabletr">
                <th>序号</th>
                <th>客户姓名</th>
                <th>证件号码</th>
                <th>业务号码</th>
                <th>所属区域</th>
                <th class="choose">选择</th>
              </tr>
              </thead>
              <tbody class="send-list">
              <tr v-for="(item,index) in custDataList" id="send-tablet">
                <th>{{item.custNumber}}</th>
                <th>{{item.custName}}</th>
                <th>{{item.certNum}}</th>
                <th>{{item.mobile}}</th>
                <th>{{item.province}}{{item.city}}{{item.county}}</th>
                <th class="choose">
                  <input type="radio" :value="index" v-model = "custSelect" />
                </th>
              </tr>
              </tbody>
            </table>
            <p>
              <a class="openthree" href="javascript:void(0)" target="_blank" @click="submit()">确认</a>
              <a class="opentwo" href="javascript:void(0)" target="_blank" @click="cancel()" >取消</a>
            </p>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
  export default {
    props:["customerSelectBox","custDataList",'custData','customer_search'],
    data(){
      return{
        custInfo:{
          "contactName":"",
          "certNum":"",
          "telephone":"",
          "mobile":""
        },
        custSelect:''
      }
    },
    methods:{
      query(){
        this.$emit("queryCustInfo",this.custInfo);
      },

      cancel(){
        this.$emit('update:customerSelectBox',false);
        //this.customerSelectBox = false;
      },

      submit(){
          if(this.custSelect==''&&this.custSelect!=0){
            this.$alert('请至少选择一个客户', '提示', {
              confirmButtonText: '确定',
              callback:acion=>{

              }
            });
          } else {
            var i = this.custSelect;
            this.$emit('callback',this.custDataList[i]);
//            this.customerSelectBox = false;
          }
      },
      keyFun(ev){
        if(ev.keyCode == 13){
          this.query();
        }
      }
    }
  }
</script>
<style scoped lang="less">
  a:focus{
    text-decoration: none;
  }
  .out-of-welcome{
    /*width:1200px;*/
    /*height:280px;*/
    /*margin: 0 auto;*/
    /*position: relative;*/
    width:305px;
    height:280px;
    position: absolute;
    left: 50%;
    top: 61px;
    margin-left: 295px;
    z-index: 9;
  }
  .welcome{
    width:305px;
    height:280px;
    background: rgba(255,255,255,.2);
    /*padding:30px 50px;*/
    position: absolute;
    top:0;
    right:0;
    /*z-index: 999;*/
    input{
      display: block;
      width: 265px;
      height: 34px;
      margin: 0 auto;
      background: rgba(255,255,255,.7);
      border: 0 none;
      line-height: 34px;
      font-size: 12px;
      padding: 0 5px;
    }
  }
  .welWord{
    width:100%;
    line-height: 66px;
    font-size: 16px;
    color: #fff;
    text-align: center;
    padding-bottom: 32px;
    padding-top: 25px;
  }
  .welBtn{
    display: block;
    margin: 30px auto 0 auto;
    width:263px;
    line-height: 28px;
    outline: none;
    border: #fff 1px solid;
    color: #fff;
    font-size: 12px;
    background: none;
  }
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
    border: #bcbcbc 1px solid;
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
    background: #ff8200;
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
  .send-table{
    .choose{
      width: 65px;
    }
  }
  .send-list{
    display: block;
    height: 200px;
    overflow-y: scroll;
  }
  table thead,table tr{
    display:table;
    width:100%;
    table-layout:fixed;
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
    background: #bcbcbc;
    color: #fff;
    border-radius: 5px;
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
    background: #ff8200;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    line-height: 30px;
    margin: 0;
    font-size: 12px;
  }
</style>
