<template>
  <div id="shoppingcar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <div class="menu-item">
          <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
          <el-menu-item index="2"><a href="https://www.ele.me" target="_blank"> 合作伙伴 </a></el-menu-item>
          <el-submenu index="3">
          <template slot="title"> 管理平台 </template>
              <el-menu-item index="3-1"><router-link to="/">个人管理平台</router-link></el-menu-item>
          </el-submenu>
          <el-menu-item index="4"> <router-link to="/">帮助中心</router-link> </el-menu-item>
        <div class="regist-login">
<!--           <el-menu-item index="5"> <el-button type="text" @click="regist = true" >注册 </el-button> </el-menu-item> -->
          <el-menu-item index="6"><el-button type="text" @click="login = true" > 您好！ </el-button> </el-menu-item>
          <el-menu-item index="7"><el-button type="text" @click="research" > XXX </el-button> </el-menu-item>
        <el-dialog title="请输入登录账号" :visible.sync="login" width="30%">
          <el-form :model="form">
            <el-form-item label="账号" :label-width="formLabelWidth">
              <el-input v-model="form.name" auto-complete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.pwd" auto-complete="off" type="password" clearable></el-input>
            </el-form-item>
          </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="login = false">取 消</el-button>
          <el-button type="primary" @click="login = false">确 定</el-button>
          </div>
        </el-dialog>
        </div>
      </div>
    </el-menu>
    
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
      }
    }
}
</script>

<style>
#shoppingcar {
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
</style>
