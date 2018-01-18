<template>
  <div class="out-of-welcome">
    <div class="welcome" >
      <div class="welWord">你好，{{data.custName}}</div>
      <p class="info">客户类型：<span>{{data.custType}}</span></p>
      <p class="info">证件类型：<span>{{data.certTypeName}}</span></p>
      <p class="info">证件号码：<span>{{data.certNum}}</span></p>
      <p class="info">联系电话：<span>{{data.mobile}}</span></p>
      <p class="info">客户地址：<span>{{data.province}}{{data.city}}{{data.county}}{{data.contactAddr}}</span></p>
      <div class="quitBtn" @click="custOut()">退出</div>
      <a class="clinet">修改客户信息</a>
      <router-link class="assets" to="/clientAssets">查看现有资产</router-link>
    </div>
  </div>
</template>

<script>
  export default{
    props:['data','custChange'],
    methods:{
      custOut(){
        window.sessionStorage.setItem('cust','');
        this.$emit("custOut","0");
      },
      custChangeFun(){
        this.$emit("update:custChange",true);
      }
    }
  }
</script>

<style scoped lang="less">
  *{
    margin: 0;
    padding: 0;
  }
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
    top:61px;
    left: 50%;
    margin-left: 295px;
    z-index: 9;
  }
  .welcome{
    width: 305px;
    height:280px;
    background: rgba(255,255,255,.2);
    padding:20px 0 0 14px ;
    position: absolute;
    top:0;
    right:0;
    z-index: 99;
    .welWord{
      line-height: 38px;
      font-size: 16px;
      color: #fff;
      width: 85%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .info{
      font-size: 14px;
      line-height: 28px;
      color: #fff;
    }
    a{
      position: absolute;
      bottom: 26px;
      left: 21px;
      width: 120px;
      height: 30px;
      line-height: 28px;
      border: 1px #fff solid;
      text-align: center;
      color: #fff;
      font-size: 12px;
    }
    .assets{
      bottom: 26px;
      left: auto;
      right: 21px;
    }
  }

  .switchBtn{
    position: absolute;
    top: 100px;
    right: 50px;
    width: 100px;
    height: 30px;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    background: #bcbcbc;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }
  .quitBtn{
    position: absolute;
    top: 24px;
    right: 8px;
    width: 50px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }
</style>
