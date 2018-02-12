<template>
  <div id="CloudProduct">
    <div class="top">
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
          <template slot="title" class="color"> 管理平台 </template>
              <el-menu-item index="3-1"><router-link to="/" class="color">个人管理平台</router-link></el-menu-item>
          </el-submenu>
          <el-menu-item index="4"> <router-link to="/" class="color">帮助中心</router-link> </el-menu-item>
        <div class="regist-login">
<!--           <el-menu-item index="5"> <el-button type="text" @click="regist = true" class="color" >注册 </el-button> </el-menu-item> 登录之后就不要注册啦-->
          <el-submenu index="6">
          <template slot="title" class="color"> 您好！{{username}} </template>
              <el-menu-item index="6-1"><el-button type="text" @click="login = true" class="color" > 资产  </el-button> </el-menu-item>
              <el-menu-item index="6-2"><el-button type="text" @click="logout" class="color" > 退出  </el-button> </el-menu-item>
        </el-submenu>
          <el-menu-item index="7"> <router-link to="ShoppingCar" class="color">我的购物车 </router-link> </el-menu-item>
        </div>
      </div>
    </el-menu> 
    <div class="box">
    <p align="left" class="box-header">云产品</p>
    <p align="left" class="box-nav">
      依托发达的基础网络，通过“2+31+X”和数据中心互联网（DCI）等资源布局，实现云网融合和统一调度，已形成平台+应用的云计算和大数据产品体系，为用户提供云产品服务。
      </p>
    </div>
    <div class="product_title">云产品</div>
        <div class="product">
            <span class="title">云产品</span>
          <div class="content">云主机是云计算在基础设施应用上的重要组成部分，位于产业链金字塔底层，产品源自云计算平台</div>
          <div class="passBuyBtn"  @click="submit">
            <img src="../assets/icon_jiarugouwuche.png"/>
            <router-link class="color" to="/shoppingCar">
            加入购物车
            </router-link>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
        activeIndex: '1',
        login: false,
        form: {
          name: '',
          pwd: ''
        },
        formLabelWidth: '40px',
        username:window.sessionStorage.getItem('username'),
        userID:window.sessionStorage.getItem('userID')
      };
    },
    created(){
      var userID = window.sessionStorage.getItem('userID');
      if(!userID){
        this.$router.push({path: '/'});
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        return 0;
      },
      logout(){
          window.sessionStorage.removeItem('username');
          window.sessionStorage.removeItem('userID');
          location.reload();
      },
      submit(){
        axios({
          method:"post",
          url:"http://127.0.0.1:3000/api/addOrder",
        }).then(
            res=>{
              console.log(res.data);
            }
        ).catch(
            error=>{
              console.log(error);
            }
          ); 
        },
    }
}
</script>

<style>
#CloudProduct {
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
.box{
    width: 1200px;
    height: 225px;
    margin: 0 auto;
  }
  .box-header{
    font-size: 30px;
    color: white;
    margin-top: 45px;
  }
  .box-nav{
    width: 800px;
    margin-top: 16px;
    font-size: 14px;
    color: white;
  }
   .detail-button{
    display: block;
    width:140px;
    height:36px;
    margin-top: 16px;
    border:1px solid #fff;
    line-height: 36px;
    text-align: center;
    color:#fff;
  }
 .top{
    height:340px;
    width:100%;
    background-color: #0182de;
    background-image: url("../assets/pic_1.png");
    background-repeat: no-repeat;
    background-position:center;
  }
  .product_title{
    font-size:24px;
    color:white;
    text-align:center;
    background-color:#a371c5;
    padding:10px;
  }
.product-box{
    width: 1200px;
    margin: 0 auto;
    padding-top: 20px;
    overflow: hidden;
  }
  .product-list{
    width: 1200px;
  }
    .title{
    display: block;
    background-color:#ebecec;
    color:#333;
    font-size:20px;
    padding:10px;
  }
    .content{
    font-size:14px;
    color:#666;
    height: 76px;
    line-height:2;
    padding:20px 15px 0 15px;
    margin-bottom: 20px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
    .product{
    box-sizing:border-box;
    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    border:1px solid #c8c8c8;
    width:390px;
    margin-left:15px;
    margin-top: 15px;
    float:left;
    text-align:center;
  }
  
  .product_list li:nth-child(3n+1){margin-left:0;}
  .passBuyBtn{
    width:120px;
    outline: none;
    border: 1px solid #ff8200;
    line-height: 36px;
    color:#fff;
    background:#ff8200 ;
    text-align: center;
    border-radius: 4px;
    text-indent: 20px;
    font-size: 14px;
    display:inline-block;
    margin-bottom:20px;
    position:relative;
    margin-right: 17px;
  }
  .passBuyBtn:hover{
    cursor:pointer;
  }
  .passBuyBtn img{
    position: absolute;
    top:9px;
    left:10px;
    width:19px;
    height:18px;
  }
  .color{
    color: white;
    text-decoration:none;
  }
</style>
