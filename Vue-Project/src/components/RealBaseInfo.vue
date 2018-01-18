<!--实名企业步骤1---基本信息-->
<template>
  <form class="companyBaseInfo">
    <section><label>账号：</label><input type="text" v-model="baseform.num" /></section>
    <section><label>手机号：</label><input type="text" v-model="baseform.phone" /></section>
    <section><label>验证码：</label><input type="text" v-model="baseform.code" /></section>
    <section><label>登录密码：</label><input type="text" v-model="baseform.pwd" /></section>
    <section class="checkPwd"><label>确认密码：</label><input type="text" v-model="checkPwd" /></section>
    <section class="accept"><input type="checkbox" v-model="accept" />我已阅读并同意《浙江电信合作伙伴注册协议》</section>
    <a class="submit" href="javascript:void(0);" @click="submit">下一步</a>
  </form>
</template>
<style scoped lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  a:focus{
    text-decoration: none;
  }
  .companyBaseInfo{
    width: 470px;
    margin: 0 auto;
    padding-top: 19px;
  }
  section{
    padding-bottom: 30px;
  }
  label{
    width: 93px;
    height: 34px;
    color: #676a6c;
    font-size: 18px;
    font-weight: 400;
    line-height: 34px;
  }
  input{
    width: 377px;
    height: 34px;
    border: 1px #e5e6e7 solid;
    border-radius: 4px;
    padding-left: 10px;
  }
  .checkPwd{
    padding-bottom: 20px;
  }
  .accept{
    padding-left: 93px;
    line-height: 20px;
    font-size: 14px;
    color: #333;
    input{
      width: 20px;
      height: 20px;
      margin: 0 10px 0 0;
      padding-left: 0;
      vertical-align: middle;
    }
  }
  .submit{
    display: block;
    width: 304px;
    height: 40px;
    background: #347aea;
    color: #fff;
    font-size: 18px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 0;
    padding: 0;
    margin-left: 93px;
  }

</style>
<script>
  export default{
    data(){
        return{
          baseform:{
            num:"",
            phone:"",
            code:"",
            pwd:""
          },
          checkPwd:"",
          accept:""
        }
    },
    methods:{
      submit(){
      /*  if (this.baseform.num==''||this.baseform.num==null||this.baseform.num=='undefined'){
          alert("请输入用户名");
        } else if (this.baseform.phone==''||this.baseform.phone==null||this.baseform.phone=='undefined'){
          alert("请输入手机号");
        } else if (this.baseform.code==''||this.baseform.code==null||this.baseform.code=='undefined'){
          alert("请输入验证码");
        } else if (this.baseform.pwd==''||this.baseform.pwd==null||this.baseform.pwd=='undefined'){
          alert("请输入密码");
        } else if (this.checkPwd==''||this.checkPwd==null||this.checkPwd=='undefined'){
          alert("请确认密码");
        } else if (this.accept==''||this.accept==null||this.accept=='undefined'){
          alert("请阅读并确认注册协议");
        } else if(this.baseform.pwd!=this.checkPwd){
          alert("两次输入密码不正确");
        } else {
            console.log(this.baseform);
            this.$emit('step',2)
        }*/
        this.$emit('step',2);
      }
    }
  }

</script>
