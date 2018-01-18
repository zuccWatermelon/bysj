<!--客户现有资产列表-->
<template>
    <div class="main-panel">

        <div class="title">
            <div class="tag">{{custName}}的资产列表</div>
            <!--<div class="search">-->
              <!--<input type="text" placeholder="请输入业务号码查询"/><i class="el-icon-search"></i>-->
            <!--</div>-->
        </div>

        <div class="list-panel" :style="{height:myHeight+'px'}">
            <div v-for="(item,index) in assetList" class="list-item" @click="changeFun(item.catalogId)">
                <img v-bind:src="item.pic"/>
                <div class="offer-name">{{item.catalogName}}</div>
                <div class="offer-num">{{item.num}}</div>
            </div>
        </div>
    </div>
</template>

<script>

  export default{
    props:['navNum'],
    data(){
      return{
        custName:"",
        /**页面高度自适应**/
        myHeight:0,
        assetList:[
          {
            catalogName:"云产品",
            catalogId:"161",
            num:"0",
          },
//          {
//            catalogName:"畅捷通",
//            catalogId:"61",
//            num:"0",
//          },
//          {
//            catalogName:"云专线",
//            catalogId:"101",
//            num:"0",
//          }
        ],
      }
    },
    created:function () {
      var _this = this;
      /**获取客户对应的session**/
      var cust = window.sessionStorage.getItem('cust');
      var custName = JSON.parse(cust).custName;
      var custId = JSON.parse(cust).CUST_ID;
      _this.custName = custName;

      /**最小全屏高度**/
      var height = document.documentElement.clientHeight;
      _this.myHeight = height-61-50;
      if(this.myHeight<=0){
        this.myHeight=0;
      }
      this.init();
    },
    methods:{
      changeFun:function(assetsId){
        var _this = this;
        _this.$router.push('/clientAssetsList?prodId='+ assetsId);
      },
      init(){
        var self = this;
        for(let key in self.navNum){
          self.assetList.forEach((v)=>{
            if(v.catalogId == key){
              v.num = self.navNum[key];
            }
          })
        }
        /**遍历,设置图标路径**/
        self.assetList.forEach((v)=>{
          self.$set(v,'pic','');
          self.$set(v,'url','');

          if(v.catalogName == '畅捷通'){
            v.pic = require("../../assets/img/assets_list_icon2.png");
          } else if(v.catalogName == '云专线'){
            v.pic = require("../../assets/img/assets_list_icon3.png");
          } else if(v.catalogName == '云产品'){
            v.pic = require("../../assets/img/assets_list_icon1.png");
          } else if(v.catalogName == '云网通'){
            v.pic = require("../../assets/img/assets_list_icon4.png");
          }else if(v.catalogName == '云宽通'){
            v.pic = require("../../assets/img/assets_list_icon5.png");
          }
        })
      }
    },
    watch:{
       'navNum':"init"
    }
  }
</script>

<style scoped lang="less">
    .main-panel{
      position: relative;
      width: 900px;
      margin: 0 auto;
      .title{
        height:50px;
        border-bottom: #ddd 1px solid;
          .tag{
            margin-top:20px;
            font-size: 16px;
            float:left;
          }
          input{
            width:250px;
            height:30px;
            float:right;
            border-radius: 5px;
            text-align: center;
            background: #C9C9C9;
          }
        .search{
          float: right;
          position: relative;
          height: 50px;
          padding: 15px 0 7px 0;
          input{

            display: block;
            line-height: 28px;
            font-size: 12px;
            width: 230px;
            height: 100%;
            border: #ddd 1px solid;
            border-radius: 3px;
            padding: 0  25px 0 5px;
            background: #f5f5f5;
          }
          i{
            position: absolute;
            width: 45px;
            height: 28px;
            background: #3998ea;
            right: 0;
            top: 15px;
            color: #fff;
            font-size: 16px;
            text-align: center;
            line-height: 28px;
            border-radius: 0 3px 3px 0;
          }
        }
      }

      .list-panel{
        width:900px;
        height: 400px;

        .list-item{
          width:200px;
          height:80px;
          background-color:#F2F2F2;
          float:left;
          margin-left:70px;
          margin-top: 30px;
          cursor:pointer;
          img{
            width:40px;
            height:40px;
            float:left;
            margin-top:15px;
            margin-left:15px;
          }
          .offer-name{
            margin-top:25px;
            float:left;
            font-size: 18px;
            margin-left:20px;
          }

          .offer-num{
            margin-top:25px;
            float:left;
            margin-left:20px;
            font-size: 18px;
          }
        }
      }
    }
</style>
