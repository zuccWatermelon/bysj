<template>
  <div id="management">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <div class="menu-item">
          <el-menu-item index="1"><router-link to="/" class="color" >首页</router-link></el-menu-item>
          <el-menu-item index="2"><a href="https://www.ele.me" target="_blank" class="color" > 合作伙伴 </a></el-menu-item>
          <el-submenu index="3">
          <template slot="title" class="color" > 管理平台 </template>
            <div v-if="userID === null">
              <el-menu-item index="3-1"><router-link to="/" class="color">个人管理平台</router-link></el-menu-item>
            </div>
            <div v-else>
              <el-menu-item index="3-1"><router-link to="SelfManagement" class="color">个人管理平台</router-link></el-menu-item>
            </div>
          </el-submenu>
          <el-menu-item index="4"> <router-link to="/" class="color" >帮助中心</router-link> </el-menu-item>
        <div class="regist-login">
          <el-submenu index="6">
          <template slot="title" class="color"> 您好！{{username}} </template>
              <el-menu-item index="6-1"><router-link to="Assets" class="color">资产</router-link> </el-menu-item>
              <el-menu-item index="6-2"><el-button type="text" @click="logout" class="color" > 退出  </el-button> </el-menu-item>
        </el-submenu>
          <el-menu-item index="7"> <router-link to="ShoppingCar" class="color">我的购物车 </router-link> </el-menu-item>
        </div>
      </div>
    </el-menu>

      <el-row class="tac">
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
           
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title"><router-link to="SelfManagement" class="color" >密码修改</router-link></span>
            </el-menu-item>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title"><router-link to="resetPsw" class="color" >重置密码</router-link></span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-menu"></i>
              <span slot="title"><router-link to="ToDoList" class="color" >资源审核</router-link></span>
            </el-menu-item>
            <!-- <el-menu-item index="4">
                <i class="el-icon-menu"></i>
                <span slot="title"><router-link to="UserManagement" class="color" >用户管理</router-link></span>
              </el-menu-item> -->

          </el-menu>

        </el-col>
        <div class="right-con">
          <h2>重置密码</h2>
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户账号" prop="acc">
              <el-input  v-model="ruleForm2.acc" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认用户账号" prop="checkAcc">
              <el-input  v-model="ruleForm2.checkAcc" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
              <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(ruleForm2)">提交</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>

            </el-form-item>
          </el-form>
        </div>
      

      </el-row>
        


      <p class="foot">版权所有 ©2017 中国电信浙江公司 [ 增值电信业务经营许可证 A2.B1.B2-XXXXXXXX ] ICP 证号:浙 ICP 备 XXXXXXXX号</p>
  </div>
</template>

<script>
export default {
    data() {
      var validateAcc = (rule,value,callback) => {
        if (value === '') {
          callback(new Error('请输入用户账号'));
        } else {
          if (this.ruleForm2.checkAcc !== '') {
            this.$refs.ruleForm2.validateField('checkAcc');
          }
          callback();
        }
      };
      var validateCheckAcc = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入用户账号'));
        } else if (value !== this.ruleForm2.acc) {
          callback(new Error('两次输入账号不一致!'));
        } else {
          callback();
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        activeIndex: '3',
        dataHardDiskSize: '40',
        inputDiscount: '0.8',
        login: false,
        form: {
          name: '',
          pwd: '',
        },
        username:window.sessionStorage.getItem('username'),
        userID:window.sessionStorage.getItem('userID'),
        ruleForm2: {
          acc: '',
          checkAcc: '',
          pass: '',
          checkPass: '',
        },
        rules2: {
          acc: [
            { validator: validateAcc, trigger: 'blur' }
          ],
          checkAcc: [
            { validator: validateCheckAcc, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        },  
      };
    },
    created(){
      var self = this;

      var userID = window.sessionStorage.getItem('userID');
      if(!userID){
        this.$router.push({path: '/'});
      }
      var formData = new FormData();
      formData.append('userID', userID);
      // axios({
      //         method:"post",
      //         url:"http://127.0.0.1:3000/api/test",
      //         data: formData
      // }).then(
      //     res=>{
      //       self.tableData = res.data.message
      //     }
      // ).catch(
      //     error=>{
      //         console.log(error);
      //     }
      // );
    },
    methods: {
      handleSelect(key, keyPath) {
        return 0;
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      logout(){
        this.$confirm('是否退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          window.sessionStorage.removeItem('username');
          window.sessionStorage.removeItem('userID');
          location.reload();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        }); 
      },
      submitForm(ruleForm2) {
        console.log(ruleForm2);
        console.log(ruleForm2.acc);
        console.log(ruleForm2.pass);
        
        var userID = window.sessionStorage.getItem('userID');
        var acc = ruleForm2.acc;
        var pass = ruleForm2.pass;
        var formData = new FormData();
        formData.append('userID', userID);
        formData.append('acc',acc);
        formData.append('pass',pass);

        axios({
              method:"post",
              url:"http://127.0.0.1:3000/api/resetPsw",
              data: formData
      }).then(
          res=>{
            alert(res.data.message);
            // window.sessionStorage.removeItem('username');
            // window.sessionStorage.removeItem('userID');
            location.reload();
          }
      ).catch(
          error=>{
              console.log(error);
          }
      );

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    
    }
}
</script>

<style>
#management {
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
  .color{
    color: white;
    text-decoration:none;
  }
   .foot{
    width:100%;
    text-align: center;
    font-size: 18px;
    color: #999;
    line-height: 30px;
    /*padding-bottom: 26px;*/
    position: fixed;
    bottom: 26px;
    margin: 0;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 600px;
  }
  .psw{
    margin-left: 50px;
    padding-left: 50px;
  }
  .right-con{
    float:left;
    padding-left: 15px;
  }
  #management /deep/ .el-col-12{width:auto;}/*强行改掉了系统里的样式*/
</style>
 