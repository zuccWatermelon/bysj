<template>
  <div id="log_in">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <div class="menu-item">
          <el-menu-item index="1"><router-link to="/" class="color">首页</router-link></el-menu-item>
          <el-menu-item index="2"><a href="https://www.ele.me" target="_blank" class="color"> 合作伙伴 </a></el-menu-item>
          <el-submenu index="3">
          <template slot="title" class="color" > 管理平台 </template>
              <el-menu-item index="3-1"><router-link to="/"  class="color">个人管理平台</router-link></el-menu-item>
          </el-submenu>
          <el-menu-item index="4"> <router-link to="/"  class="color">帮助中心</router-link> </el-menu-item>
        <div class="regist-login">
<!--           <el-menu-item index="5"> <el-button type="text" @click="regist = true" class="color" >注册 </el-button> </el-menu-item> 登录之后就不要注册啦-->
          <el-menu-item index="6" class = "name"><el-button type="text" @click="login = true"  class="color" > 您好！{{username}} </el-button> </el-menu-item>
          <el-menu-item index="7"> <router-link to="ShoppingCar" class="color">我的购物车 </router-link> </el-menu-item>
      <!--   <el-dialog title="请输入登录账号" :visible.sync="login" width="30%">
          <el-form :model="form">
            <el-form-item label="账号" :label-width="formLabelWidth">
              <el-input v-model="form.telephone" auto-complete="off" clearable></el-input>
            </el-form-item>
          </el-form>
        </el-dialog> -->
       <!--  这个dialog改成可以退出的框，鼠标放上去就显示出来。 -->
        </div>
      </div>
    </el-menu>
    <el-carousel indicator-position="outside">
    <el-carousel-item>
      <h3><img src='../assets/logo.png'></h3>
    </el-carousel-item>
    <el-carousel-item>
      <h3><img src='../assets/cjt-icon.png'></h3>
    </el-carousel-item>
    <el-carousel-item>
      <h3><img src='../assets/cloudBroad_icon.png'></h3>
    </el-carousel-item>
    <el-carousel-item>
      <h3><img src='../assets/cloudNet_icon.png'></h3>
    </el-carousel-item>
    <el-carousel-item>
      <h3><img src='../assets/cloudProduct-icon.png'></h3>
    </el-carousel-item>
    <el-carousel-item>
      <h3><img src='../assets/cloudSpecialLine-icon.png'></h3>
    </el-carousel-item>
  </el-carousel>
  <el-row type="flex" class="row-bg" justify="space-around">
  <el-col :span="6"><div class="grid-content">
    <h3><img src='../assets/cjt-icon.png'></h3>畅捷通</div></el-col>
  <el-col :span="6"><div class="grid-content ">
    <h3><img src='../assets/cloudBroad_icon.png'></h3>云专线</div></el-col>
  <el-col :span="6"><router-link  to="CloudProduct" class="color1"><div class="grid-content ">
    <h3><img src='../assets/cloudNet_icon.png'></h3>云主机</div></router-link></el-col>
  <el-col :span="6"><div class="grid-content ">
    <h3><img src='../assets/cloudProduct-icon.png'></h3>云网通</div></el-col>
  <el-col :span="6"><div class="grid-content ">
    <h3><img src='../assets/cloudSpecialLine-icon.png'></h3>云宽通</div></el-col>
</el-row>
  </div>
</template>

<script>
export default {
    data() {
      return {
        activeIndex: '1',
        login: false,
        name: '',
        form: {
          telephone: '',
          pwd: '',
          code: 1
        },
        formLabelWidth: '40px',
        username:window.sessionStorage.getItem('username')
      };
    },
    created(){
    },
    methods: {
      handleSelect(key, keyPath) {
        return 0;
      }
    }
}
</script>

<style>
#log_in {
  font-family: Helvetica, sans-serif;
  text-align: center;
}

.regist-login{
  float: right;
  margin-right: 100px; 
}
.menu-item{
  margin-left: 100px; 
}
 .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;

  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
   .color{
    color: white;
    text-decoration:none;
  }
  .color1{
    color: black;
    text-decoration:none;
  }
</style>
