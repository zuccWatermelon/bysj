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
          <el-menu-item index="6"><el-button type="text" @click="login = true" class="color" > 您好！XXX </el-button> </el-menu-item>
          <el-menu-item index="7"> <router-link to="ShoppingCar" class="color">我的购物车 </router-link> </el-menu-item>
      <!--   <el-dialog title="请输入登录账号" :visible.sync="login" width="30%">
          <el-form :model="form">
            <el-form-item label="账号" :label-width="formLabelWidth">
              <el-input v-model="form.name" auto-complete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.pwd" auto-complete="off" type="password" clearable></el-input>
            </el-form-item>
          </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="login = false" >取 消</el-button>
          <el-button type="primary" @click="login = false" class="color">确 定</el-button>
          </div>
        </el-dialog> -->
       <!--  这个dialog改成可以退出的框，鼠标放上去就显示出来。 -->
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
          <div class="passBuyBtn">
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
        formLabelWidth: '40px'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        return 0;
      },
      research(){
         this.$prompt('请输入客户姓名/证件号码/业务号码/服务号码', '查询客户', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        });
      },
            /**添加购物车**/

      // addToShoppingCart(prodId, prodFuncType,statusCd){
      //   var _this = this;
      //   var user = window.sessionStorage.getItem('user');
      //   var cust = window.sessionStorage.getItem('cust');
      //   if(cust == null || cust == ""){
      //     this.$alert('您未选择客户，请选择', '提示', {
      //       confirmButtonText: '确定',
      //       callback: action => {
      //         return false;
      //       }
      //     });
      //   };

      //   var userType = JSON.parse(user).staffType;
      //   var sysUserName = JSON.parse(user).sysUserName;
      //   var loginUserId = JSON.parse(user).staffId;
      //   var userId = JSON.parse(user).staffId;
      //   var certId = JSON.parse(cust).CUST_ID;

      //   if (loginUserId == "" || loginUserId == null) {
      //     this.$alert('您未登录，请登录', '提示', {
      //       confirmButtonText: '确定',
      //       callback: action => {
      //         return false;
      //       }
      //     });
      //   };

      //   if (certId == "" || certId == null || userType == null || userType == "") {
      //     this.$alert('您未选择客户，请选择', '提示', {
      //       confirmButtonText: '确定',
      //       callback: action => {
      //         return false;
      //       }
      //     });
      //   }
      //   if(prodId == '301'){
      //     axios({
      //       url: '/netCloudOrder/shoppingCartService/addShoppingCart',
      //       method: 'post',
      //       data: {
      //         code:prodId,
      //         itemCd:'1',     //1新装 2 试用
      //         statusCd:statusCd,
      //         actionCode:'添加',
      //         loginUserId: loginUserId,
      //         shoppingCart: {
      //           userId: certId,
      //           userType: userType
      //         },
      //         shoppingCartItem: {
      //           applyObjId: prodId,
      //           applyObjSpec: 1,
      //         },
      //         cartItemAttr: {
      //           attrId: 0,
      //           attrValue: 1,
      //         },
      //         offerId: prodId,
      //       }
      //     }).then(response => {
      //       if (response.data.code == "0") {
      //         this.$router.push({path: '/shoppingCartFrame'});
      //       } else {
      //         this.$alert(response.data.msg, '提示', {
      //           confirmButtonText: '确定',
      //           callback: action => {
      //             return false;
      //           }
      //         });
      //       }
      //     }).catch(err => {
      //     })
      //   }else {
      //     axios({
      //       url: '/netCloudOrder/shoppingCartService/addToShoppingCart2',
      //       method: 'post',
      //       data: {
      //         loginUserId: loginUserId,
      //         shoppingCart: {
      //           userId: certId,
      //           userType: userType
      //         },
      //         shoppingCartItem: {
      //           applyObjId: prodId,
      //           applyObjSpec: 1,
      //         },
      //         cartItemAttr: {
      //           attrId: 0,
      //           attrValue: 1,
      //         }
      //       }
      //     }).then(response => {
      //       if (response.data.code == "0") {
      //         this.$router.push({path: '/shoppingCartFrame'});
      //       } else {
      //         this.$alert('添加购物车出错!', '提示', {
      //           confirmButtonText: '确定',
      //           callback: action => {
      //             return false;
      //           }
      //         });
      //       }
      //     }).catch(err => {
      //     })
      //   }
      // },
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
