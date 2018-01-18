<!---->
<template>
  <div class="userNav clearfix">
    <router-link to="/" class="logo">
      <img src="../../assets/img/logo2.png" />
    </router-link>
    <div class="user">
      <p class="user-text">欢迎，{{clinetManager}}<img class="user-head" src="../../assets/img/user.png" /></p>
    </div>
  </div>
</template>
<style scoped lang="less">
  *{
    margin:0;
    padding: 0;
  }
  img{
    border: 0 none;
  }
  a:focus{
    text-decoration: none;
  }
  .userNav{
    background: #fff;
  }
  .logo{
    float: left;
    width: 14.16%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 0;
    background: #30acee;
    img{
      vertical-align: middle;
    }
  }
  .user{
    float: right;
    padding: 0 30px 0 0;
    color: #666;
    font-size: 16px;
    position: relative;
    .user-text{
      line-height: 60px;
    }
    .user-head{
      width: 38px;
      height: 38px;
      border-radius: 50%;
      vertical-align: middle;
      margin-left: 20px;
    }
  }
</style>
<script>
  export default {
    data () {
      return {
        clinetManager:"*****"
      }
    },
    created(){
      if(window.sessionStorage && window.sessionStorage.getItem('login')=='true'){
        this.login = window.sessionStorage.getItem('login');
        this.clinetManager=JSON.parse(window.sessionStorage.getItem('user')).sysUserName;
      }
    }
  }
</script>
