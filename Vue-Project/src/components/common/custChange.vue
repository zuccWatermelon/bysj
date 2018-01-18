<template>
  <div class="send">
    <div class="send-box">
      <p class="send-title">客户选择<span @click="cancel()"></span></p>
      <section class="search-box">
        <input class="search" type="text" placeholder="请输入客户姓名/证件号码/业务号码/服务号码"
               v-model="custValue"
               @keyup.13="keyFun($event)" />
        <i class="search-btn" @click="searchFun"></i>
      </section>
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
</template>
<script>
  export default {
    data(){
      return{
        custDataList:[],
        custValue:"",
        custSelect:''
      }
    },
    methods:{
      searchFun(){
        var self = this;
        var userStr = window.sessionStorage.getItem('user');
        var user = JSON.parse(userStr);
        var userId = user.staffId;
        axios({
          method:'post',
//            url:'/api/customerSrv/queryCustomerInfoList',
          url:"/netCloudCustomer/customerService/queryCustomerInfoList",
          data: {
            keywords:{
              value:self.custValue,
              userId:userId
            },
            pageSize:-1,
            pageNo:-1
          }
        })
          .then(response => {
//             查询出有数据
            if(response.data.code=="0"){
              var length=response.data.data.length;
//                有数据
              if(length >= 1){
                self.custDataList = response.data.data;
              }else{
                this.$alert('未查询到对应的客户信息', '提示', {
                  confirmButtonText: '确定',
                  callback:action=>{
                  }
                });
              }
            } else {
              this.$alert('查询出错', '提示', {
                confirmButtonText: '确定',
                callback:action=>{

                }
              });
            }})
          .catch(err => {

          })
      },
      keyFun(ev){
        var self = this;
        var userStr = window.sessionStorage.getItem('user');
        var user = JSON.parse(userStr);
        var userId = user.staffId;
        if(ev.keyCode == 13){
          axios({
            method:'post',
//            url:'/api/customerSrv/queryCustomerInfoList',
            url:"/NetCloudcustomer/customerSrv/queryCustomerInfoList",
            data: {
              keywords:{
                value:self.custValue,
                userId:userId
              },
              pageSize:-1,
              pageNo:-1
            }
          })
            .then(response => {
//             查询出有数据
              if(response.data.code=="0"){
                var length=response.data.data.length;
//                有数据
                if(length >= 1){
                  self.custDataList = response.data.data;
                }else{
                  this.$alert('未查询到对应的客户信息', '提示', {
                    confirmButtonText: '确定',
                    callback:action=>{
                    }
                  });
                }
              } else {
                this.$alert('查询出错', '提示', {
                  confirmButtonText: '确定',
                  callback:action=>{

                  }
                });
              }})
            .catch(err => {

            })
        }
      },
      cancel(){
        this.$emit('update:custChange',false);
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
//          回调函数
          this.$emit('callback',this.custDataList[i]);
        }
      }
    }
  }
</script>
<style scoped lang="less">
  a:focus{
    text-decoration: none;
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
  .search{
    width: 540px;
    display: block;
    height: 40px;
    margin: 15px auto;
    border: 0 none;
    padding: 0 50px 0 18px;
    background: #ecefef no-repeat;

  }
  .send-table{
    .choose{
      width: 65px;
    }
  }
  .search-box{
    width: 540px;
    margin: 0 auto;
    position: relative;
  }
  .search-btn{
    cursor: pointer;
    font-style: normal;
    width: 40px;
    height: 40px;
    position: absolute;
    right: 10px;
    top: 0;
    background: url("../../assets/img/search.jpg") no-repeat;
  }
  .send-list{
    display: block;
    height: 110px;
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
