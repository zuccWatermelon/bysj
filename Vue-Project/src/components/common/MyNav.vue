<!--导航条-->
<template>
  <div class="nav">
    <div class="nav-main clearfix">
      <div class="nav-logo">
        <img src="../../assets/img/logo2.png" />
      </div>
      <ul class="nav-links clearfix">
        <li><router-link :class="{current:current=='index'}" to="/">首页</router-link></li>
        <li><router-link :class="{current:current=='partner'}" to="/">合作伙伴</router-link></li>
        <li class="admin">
          <a href="javascript:void(0);">管理平台</a>
          <div class="admin-list" :style="{background:background}">
            <a class="admin-item" href="javascript:void(0);" @click="admin">个人管理平台</a>
            <!--<router-link class="admin-item" to="/productsManagement">商品管理平台</router-link>-->
          </div>
        </li>
        <li>
          <router-link to="/">帮助中心</router-link>
        </li>
      </ul>
      <ul v-if="login=='false'" class="user clearfix">
      <li><a href="javascript:void(0);">注册</a></li>
      <li><a class="login" href="javascript:void(0);" @click="loginClickFun">登录</a></li>
      </ul>
      <div v-if="login=='true'" class="welcome">
        <div class="welcome-main clearfix">
          <div class="welcome-user clearfix">
            <p class="welcome-text"><img class="user-head" src="../../assets/img/portrait.png" />欢迎你，{{clinetManager}}</p>
            <div class="welcome-box">
              <p class="welcome-name">欢迎你！{{clinetManager}}</p>
              <p class="welcome-info">登录邮箱：{{email==false?"未绑定邮箱":email}}</p>
              <p class="welcome-info">手机号码：{{phone}}</p>
              <button class="login-out" type="button" @click="loginOut">退出</button>
            </div>
          </div>
          <router-link to="/shoppingCartFrame" v-if="custData.custName" class="welcome-nav">
              <span class="welcome-span">{{custData.custName.length > 5 ? custData.custName.substr(0,5) + '...': custData.custName}}的购物车</span><img class="welcome-img" src="../../assets/img/icon_jiarugouwuche.png" alt="" />
            <i>{{shoppingCarNum}}</i>
          </router-link>
        </div>

      </div>

    </div>
    <loginBox v-if="loginClick" :loginClick.sync="loginClick"></loginBox>
  </div>
</template>

<script>
  import loginBox from '../Login.vue';

  export default {
    props:['current','custData','background'],
    data () {
      return {
        loginClick:false,
        login: 'false',
        clinetManager:"*****",
        email:"",
        phone:"158****5856",
        shoppingCarNum:0,
        CUST_ID:''
      }
    },
    components:{
      loginBox,
    },
    created(){
      if(window.sessionStorage && window.sessionStorage.getItem('login')=='true'){
        this.login = window.sessionStorage.getItem('login');
        var user = window.sessionStorage.getItem('user');
        this.clinetManager=JSON.parse(user).sysUserName;
        this.phone = JSON.parse(user).mobile;

      }
      if(window.sessionStorage && window.sessionStorage.getItem('cust')){
        var cust = window.sessionStorage.getItem('cust');
        this.CUST_ID = JSON.parse(cust).CUST_ID;
      }
      this.shoppingCarNumFun();
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
        var routerNow = this.$route.path;
        console.log(routerNow);
        if(routerNow == '/'){
          this.$router.go(0);
        } else {
          this.$router.push('/');
        }
      },
//      管理平台权限
      admin(){
        if(this.login == 'false'){
          this.$alert('请先登录', '提示', {
            confirmButtonText: '确定',
            callback:action=>{

            }
          });
        }

        if(this.login=='true'){
          var userResources = JSON.parse(window.sessionStorage.getItem('userResources'));
//            console.log(userResources);
          var max = 0;
          if(userResources==null || userResources==''){
            this.$alert('没有相关权限', '提示', {
              confirmButtonText: '确定',
              callback:action=>{

              }
            });
          } else {
            var path;
            for(var i = 0; i<userResources.length; i++){
              if(userResources[i].path != null){
                if(userResources[i].lvl > userResources[max].lvl){
                  max = i;
                }
                path = userResources[max].path;
                break;
              }
            }
            if(i< userResources.length){
              this.$router.push(path);
            } else {
              this.$alert('没有任何权限', '提示', {
                confirmButtonText: '确定',
                callback:action=>{

                }
              });
            }
          }
        }
      },
//      获取购物车数量
      shoppingCarNumFun(){
        var self = this;
        if(window.sessionStorage.getItem('cust')){
          if(window.sessionStorage && window.sessionStorage.getItem('cust')){
            var cust = window.sessionStorage.getItem('cust');
            this.CUST_ID = JSON.parse(cust).CUST_ID;
          }
          axios({
            method:'post',
            url:'/netCloudOrder/shoppingCartService/getShoppingCarts',
            data:{
              pageNo: 1,
              pageSize: 1000,
              userId: self.CUST_ID
            }
          }).then(res=>{
            self.shoppingCarNum = res.data.data.length;
          }).catch(err=>{

          })
        }
      }
    },
    watch:{
        'custData':'shoppingCarNumFun'
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
    border-bottom: 1px #ececec solid;
  }
  .nav-main{
    width: 1200px;
    height: 60px;
    margin: 0 auto;
    position: relative;
  }
  .nav-logo{
    float: left;
    width: 190px;
    height: 100%;
    line-height: 60px;
    font-size: 0;
    text-align: left;
  }
  .nav-links{
    float: left;
    /*padding: 46px 0 0 39px;*/
    li{
      float: left;
      margin-right: 34px;
      height: 60px;
    }
    a{
      display: block;
      width: 120px;
      height: 57px;
      line-height: 57px;
      color: #fff;
      font-size: 16px;
      text-align: center;
      box-sizing: content-box;
    }
    .current{
      border-bottom: #fff 4px solid;
    }
  }
  .admin{
    position: relative;
    .admin-list{
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 999;
      background: rgba(255,255,255,.2);
    }
    .admin-item{
      line-height: 40px;
      height: 40px;
      margin-bottom: 5px;
      color: #fff;
    }
  }
  .admin:hover .admin-list{
    display: block;
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
    height: 60px;
    color: #999;
    font-size: 14px;
    position: relative;
  }
  .welcome-main{
    display: block;
    color: #fff;
    font-size: 14px;
    position: relative;
    .welcome-user{
      float: left;
      position: relative;
    }
    .welcome-text{
      float: left;
      line-height: 60px;
      text-align: right;
      padding-right: 25px;
      cursor: pointer;
      width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .user-head{
      margin-right: 10px;
      vertical-align: middle;
    }
    .welcome-nav{
      width: 180px;
      height: 33px;
      float: left;
      margin-top: 13px;
      border: 1px solid #fff;
      border-radius: 5px;
      overflow: hidden;
      cursor: pointer;
      line-height: 31px;
      padding-left: 5px;
      font-size: 0;
      .welcome-img{
        width: 17px;
        height: 16px;
        margin-top: 7px;
        margin-left: 5px;
        vertical-align: top;
      }
      .welcome-span{
        display: inline-block;
        width: 120px;
        font-size: 12px;
        color: #fff;
        vertical-align: top;
      }
    }
    i{
      padding-left: 10px;
      font-style: normal;
      color: #ff6700;
      font-size: 14px;
    }
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
  .welcome-user:hover .welcome-box{
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
    /*margin-top: 60px;*/
    margin-left: 26px;
  }
</style>
