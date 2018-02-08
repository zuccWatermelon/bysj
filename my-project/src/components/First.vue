<template>
  <div id="first">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      @submit.prevent="submit"
      mode="horizontal"
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
          <el-menu-item index="5"> <el-button type="text" @click="regist = true"  class="color" >注册 </el-button> </el-menu-item>
          <el-menu-item index="6"><el-button type="text" @click="login = true"  class="color" > 登录 </el-button> </el-menu-item>
        <el-dialog title="请输入登录账号" :visible.sync="login" width="30%">
          <el-form :model="form">
            <el-form-item class="telephone" label="账号" :label-width="formLabelWidth">
              <el-input v-model="form.telephone" auto-complete="off" clearable></el-input>
            </el-form-item>
            <el-form-item class="password" label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.password" auto-complete="off" type="password" clearable  @keyup.13="keyFun($event)"></el-input>
            </el-form-item>
          </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="login = false">取 消</el-button>
          <el-button type="primary" @click="submit"class="color">确 定</el-button>
          </div>
        </el-dialog>
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
  <el-col :span="6"><div class="grid-content ">
    <h3><img src='../assets/cloudNet_icon.png'></h3>云主机</div></el-col>
  <el-col :span="6"><div class="grid-content ">
    <h3><img src='../assets/cloudProduct-icon.png'></h3>云网通</div></el-col>
  <el-col :span="6"><div class="grid-content ">
    <h3><img src='../assets/cloudSpecialLine-icon.png'></h3>云宽通</div></el-col>
</el-row>
  </div>
</template>

<script>
export default {
  // 父组件通过 props 向下传递数据给子组件，子组件通过 events 给父组件发送消息。
    data() {
      return {
        activeIndex: '1',
        login: false,
        form: {
          telephone: '',
          password: '',
          code: ''
        },
        formLabelWidth: '40px'
      };
    },
    methods: {
      keyFun(ev){
        if(ev.keyCode == 13){
          this.submit();
        }
      },
      submit(){
          var self = this;
          if(self.form.telephone==''||self.form.telephone==null){
            this.$alert('账号/手机号不能为空', '提示', {
              confirmButtonText: '确定'
            });
          } else if(self.form.password==''||self.form.password==null){
            this.$alert('密码不能为空', '提示', {
              confirmButtonText: '确定'
            });
          } else {
            var formData = new FormData();
            formData.append('telephone', self.form.telephone);
            formData.append('password', self.form.password);
            axios({
              method:"post",
              url:"http://127.0.0.1:3000/api/login",
              data: formData
            }).then(
                res=>{
                  console.log(res.data);
                  if(res.data.code=='1' || res.data.code==1){
                    self.$alert('登录成功')
                    // 如果登录成功，将用户名、id存在sessionstorage
                    window.sessionStorage.setItem('username',res.data.name);
                    window.sessionStorage.setItem('userID',res.data.customerID);
                    this.$router.push({path:'Log_in'})
                  } else {
                    var errorInfo = res.data.msg;
                    self.$alert('用户名或密码错误，请重新输入', '提示', {
                      confirmButtonText: '确定',
                      callback:action=>{
                      }
                    });
                  }
                }
            ).catch(
                error=>{
                    console.log(error);
                }
            );
          }
      },

    }
}
</script>

<style>
#first {
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
