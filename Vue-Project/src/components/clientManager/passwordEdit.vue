<!--试用中的订单-->
<template>
  <div class="passwordEdit">
    <UserNav></UserNav>
    <div class="mian clearfix">
      <ClientManagerNav></ClientManagerNav>
      <div class="right">
        <p class="title">密码修改</p>
        <div class="cont">
          <div class="edit" :style="{minHeight:minHeight+'px'}">
            <el-form :model="editInfo" status-icon :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
              <el-form-item label="旧密码" prop="oldPwd">
                <el-input type="password" size="small" v-model="editInfo.oldPwd"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="newPwd">
                <el-input type="password" size="small" v-model="editInfo.newPwd" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPwd">
                <el-input type="password" size="small" v-model="editInfo.checkPwd" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  img{
    border: 0 none;
  }
  a:focus{
    text-decoration: none;
  }
  .passwordEdit{
    overflow: hidden;
  }
  .mian{
    position: absolute;
    top:60px;
    bottom: 0;
    left:0;
    width: 100%;
    background: #f3f8fb;
  }
  .right{
    width: 100%;
    padding-left: 14.16%;
    background: #f3f8fb;
  }
  .title{
    height: 70px;
    line-height: 70px;
    font-size: 22px;
    color: #333;
    padding-left: 20px;
  }
  .cont{
    padding: 0 20px;
  }
  .edit{
    background: #fff;
    /deep/ .el-form-item{
      margin-bottom: 15px;
    }
    /deep/ .el-form-item__label{
      line-height: 35px;
      margin: 0;
    }
    /deep/ .el-form-item__content{
      line-height: 35px;
    }
    /deep/ .el-form-item__error{
      padding-top: 1px;
    }
  }
  .el-form{
    width: 400px;
    padding: 30px 0 0 0;
  }

  .el-button{
    width: 100px;
    height: 30px;
  }
</style>
<script>
  import UserNav from '../common/UserHeader.vue';
  import ClientManagerNav from '../common/ClientManagerNav.vue';

  export default{
    components:{
      UserNav,
      ClientManagerNav,
    },
    data(){
//        验证旧密码
      var validatePass_old = (rule, value, callback) => {
        if(!value) {
          callback(new Error('请输入旧密码'));
        } else {
          callback();
        }
      };
//      验证新密码
      var validatePass_new = (rule, value, callback) => {
        if(!value) {
          callback(new Error('请输入新密码'));
        } else {
          if (this.editInfo.checkPwd !== '') {
            this.$refs.ruleForm2.validateField('checkPwd');
          }
          callback();
        }
      };
//      验证确认密码
      var validatePass_check = (rule, value, callback) => {
        if(!value) {
          callback(new Error('请再次输入新密码'));
        } else if(value !== this.editInfo.newPwd){
          callback(new Error('两次输入密码不一致!'));
        } else {
            callback();
        }
      };
      return{
        minHeight:0,
        editInfo:{
          oldPwd:'',
          newPwd:'',
          checkPwd:''
        },
        rules: {
          oldPwd:[
            { validator: validatePass_old, trigger: 'blur' }
          ],
          newPwd:[
            { validator: validatePass_new, trigger: 'blur' }
          ],
          checkPwd: [
            { validator: validatePass_check, trigger: 'blur' }
          ],
        }
      }
    },
    created(){
      var self = this;
      //        最小全屏高度
      var height=document.documentElement.clientHeight;
      this.minHeight = height-60-70;
      if(this.minHeight <= 0){
        this.minHeight = 0;
      }
    },
    methods:{
      submitForm(){
        var self = this;
        let user = JSON.parse(sessionStorage.getItem('user'));
        let formData = new FormData();
        formData.append('userId', user.staffId);
        formData.append('oldPassWord', self.editInfo.oldPwd);
        formData.append('newPassWord', self.editInfo.newPwd);
        this.$refs.ruleForm2.validate((valid) => {
          if(valid){
            axios({
              url:'/netCloudUser/userService/updatePassWord',
              method:'post',
              headers:{
                "content-Type":"application/x-www-form-urlencoded"
              },
              data:formData
            }).then(res=>{
              if(res.data.code == '0' ||res.data.code == 0){
                self.$alert('密码修改成功,请重新登录', '提示', {
                  confirmButtonText: '确定',
                  callback:action=>{
                    sessionStorage.removeItem('login');
                    sessionStorage.removeItem('user');
                    sessionStorage.removeItem('userResources');
                    sessionStorage.removeItem('cust');
                    self.$router.push('/');
                  }
                });
              } else {
                self.$alert(res.data.msg, '提示', {
                  confirmButtonText: '确定',
                  callback:action=>{

                  }
                });
              }
            }).catch(err=>{})
          } else {
            self.$alert('请根据提示填写正确的信息', '提示', {
              confirmButtonText: '确定',
              callback:action=>{

              }
            });
          }
        });
      },
      resetForm(){
        this.$refs.ruleForm2.resetFields();
      }
    }
  }
</script>
