<!--导航条-->
<template>
  <div class="nav">
    <div class="nav-main clearfix">
      <div class="nav-logo">
        <img src="../../assets/img/logo2.png" />
      </div>
      <ul class="nav-links clearfix">
        <li><router-link :class="{current:current=='index'}" to="/">首页</router-link></li>
        <li><router-link :class="{current:current=='partner'}" to="/partner">合作伙伴</router-link></li>
        <li><a href="javascript:void(0);" @click="admin">管理平台</a></li>
        <!--<li><router-link :class="{current:current=='ClientManagerIndex'}" to="/ClientManagerIndex">管理平台</router-link></li>-->
        <li>
          <!--
                    <a href="javascript:void(0);">帮助中心</a>
          -->
          <router-link to="/myOrderDetail">帮助中心</router-link>
        </li>
      </ul>
      <ul v-if="login=='false'" class="user clearfix">
        <!--<li><a  class="AddClient" href="javascript:void(0);">注册</a></li>-->
        <li><router-link class="AddClient" to="/MyCustomer">注册</router-link></li>
        <li><a class="login" href="javascript:void(0);" @click="loginClickFun">登录</a></li>
      </ul>
      <router-link v-if="client.custName" to="/shoppingCart2" class="shoppingCar">我的购物车</router-link>
      <div v-if="login=='true'" class="welcome">
        <div class="welcome-main clearfix">
          <p class="welcome-text">欢迎，{{clinetManager}}</p>
          <img class="user-head" src="../../assets/img/user.png" />
        </div>
        <div class="welcome-box">
          <p class="welcome-name">欢迎你！{{clinetManager}}</p>
          <!--<p class="real-check">已实名认证</p>-->
          <p class="welcome-info">登录邮箱：{{email==false?"未绑定邮箱":email}}</p>
          <p class="welcome-info">手机号码：{{phone}}</p>
          <button class="login-out" type="button" @click="loginOut">退出</button>
        </div>
      </div>

    </div>
    <loginBox v-if="loginClick" :loginClick.sync="loginClick"></loginBox>
  </div>
</template>

<script>
  import loginBox from '../Login.vue';

  export default {
    props:['current','client'],
    data () {
      return {
        loginClick:false,
        login: 'false',
        clinetManager:"*****",
        email:"",
        phone:"158****5856"
      }
    },
    components:{
      loginBox
    },
    created(){
      if(window.sessionStorage && window.sessionStorage.getItem('login')=='true'){
        this.login = window.sessionStorage.getItem('login');
        var user = window.sessionStorage.getItem('user');
        console.log(user);
        this.clinetManager=JSON.parse(user).sysUserName;
        this.phone = JSON.parse(user).mobile;
      }
      if(window.sessionStorage && window.sessionStorage.getItem('client')){
        this.client = window.sessionStorage.getItem('client');
      }
    },
    methods:{
      loginClickFun(){
        this.loginClick=true;
      },
      loginOut(){
        window.sessionStorage.setItem('login',false);
        window.sessionStorage.setItem('user','');
        window.sessionStorage.setItem('cust','');
        window.sessionStorage.setItem('userResources','');
        this.$router.go(0);
      },

//      管理平台权限

    }
  }
</script>

<style scoped lang='less'>
  *{
    margin:0;
    padding: 0;
  }
  a:focus{
    text-decoration: none;
  }
  .nav {
    position: relative;
    border-bottom: 1px #fff solid;
  }
  .nav-main{
    width: 1200px;
    height: 60px;
    margin: 0 auto;
    position: relative;
  }
  .nav-logo{
    float: left;
    height: 60px;
    font-size: 0;
    img{
      height: 60px;
      vertical-align: middle;
    }
  }
  .nav-links{
    float: left;
    padding-left: 39px;
    li{
      float: left;
      margin-right: 34px;
    }
    a{
      display: block;
      width: 120px;
      height: 60px;
      line-height: 60px;
      color: #fff;
      font-size: 16px;
      text-align: center;
      box-sizing: content-box;
    }
    .current{
      border-bottom: #fff 4px solid;
    }
  }
  .user{
    float: right;
    height: 100%;
    li{
      float: left;
      padding: 0 5px;
    }
    a{
      display: block;
      width: 50px;
      height: 60px;
      color: #fff;
      font-size: 14px;
      line-height: 60px;
      text-align: center;
    }
    .register{
      border-right: 1px #ccc solid;
    }
  }
  .welcome{
    float: right;
    height: 63px;
    margin-top: 47px;
    color: #999;
    font-size: 14px;
    position: relative;
  }
  .welcome-main{
    display: block;
    color: #fff;
    font-size: 14px;
    position: relative;
    .welcome-text{
      float: left;
      line-height: 55px;
      text-align: right;
      padding-right: 25px;
    }
    .user-head{
      float: right;
      width: 55px;
      height: 55px;
      border-radius: 50%;
    }
    /*i{*/
    /*position: absolute;*/
    /*font-style: normal;*/
    /*top: -3px;*/
    /*right: -4px;*/
    /*width: 16px;*/
    /*height: 16px;*/
    /*border-radius: 50%;*/
    /*font-size: 12px;*/
    /*text-align: center;*/
    /*line-height: 16px;*/
    /*color: #fff;*/
    /*background: #ff5029;*/
    /*}*/
  }
  .welcome-box{
    display: none;
    position: absolute;
    top: 100%;
    right: 0;
    width: 242px;
    background: #fff;
    padding-bottom: 25px;
    z-index: 999;
    .welcome-name{
      color: #333;
      line-height: 26px;
      font-size: 16px;
      padding: 14px 0 18px 0;
      text-align: center;
    }
    .welcome-info{
      font-size: 12px;
      padding: 0 24px;
      color: #333;
      line-height: 34px;
    }
  }
  .login-out{
    display: block;
    width: 185px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    background: #ff8200;
    border: 0 none;
    color: #fff;
    border-radius: 5px;
    margin: 21px auto 0 auto;
  }
  .welcome:hover .welcome-box{
    display: block;
  }
  .welcome-box:hover{
    display: block;
  }
  .box{
    width:100px;
    height: 100px;
    position: fixed;
    top:50%;
    left: 50%;
    margin: -50px 0 0 -50px;
    border: 1px #000 solid;
    z-index: 999;
  }
  .shoppingCar{
    float: right;
    width: 120px;
    height: 30px;
    line-height: 30px;
    background: #fff;
    border-radius: 4px;
    padding-left: 33px;
    background: #fff url("../../assets/img/shoppingCar.jpg") left center no-repeat;
    margin-top: 60px;
    margin-left: 26px;
  }
</style>
