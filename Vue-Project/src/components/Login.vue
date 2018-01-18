<template>
  <div class="login">
    <div class="login-box">
      <p class="login-title">个人登录<i @click="close"></i></p>
      <form class="login-main" @submit.prevent="submit">
        <section class="name"><i class="icon"></i><input type="text" placeholder="手机/用户名" v-model="info.sysUserCode" /></section>
        <section class="pwd"><i class="icon"></i><input type="password" placeholder="密码" v-model="info.password" @keyup.13="keyFun($event)" /></section>
        <section class="code" v-if="codeImg"><input type="text" placeholder="验证码" v-model="info.code"  /><img src="../assets/img/logo.png"/></section>
        <button class="submit" type="submit">登录</button>
        <section class="other">
          <input type="checkbox" id="remember" v-model="remember" /><label for="remember">记住用户名</label>
          <!--<a href="##" target="##">忘记密码?</a>-->
        </section>
      </form>
    </div>
  </div>
</template>
<style scoped lang="less">
  .login{
    width: 100%;
    height: 100%;
    position:fixed;
    top:0;
    left:0;
    background:rgba(0,0,0,0.41);
    z-index:999;
  }
  .login-box {
    position:absolute;
    top:50%;
    left:50%;
    width: 544px;
    height: 520px;
    background: url("../assets/img/login_box.png") center no-repeat;
    padding: 10px;
    margin:-260px 0 0 -272px;
  }
  .login-title{
    width: 524px;
    height: 61px;
    line-height: 61px;
    color: #fff;
    background: #ff8200;
    font-size: 24px;
    text-align: center;
    position:relative;
    i{
      font-style: normal;
      position: absolute;
      top:17px;
      right:22px;
      height:24px;
      width:24px;
      background: url("../assets/img/cha.png") center no-repeat;
      cursor:pointer;
    }
  }
  .login-main{
    section{
      width: 365px;
      height: 87px;
      padding-top: 42px;
      margin: 0 auto;
      position: relative;
    }
    input,input:-webkit-autofill{
      width:100%;
      height: 100%;
      line-height: 43px;
      border: #ccc 1px solid;
      padding-left: 50px;
      font-size: 18px;
    }
    .submit{
      display: block;
      width: 366px;
      height: 45px;
      border: 0 none;
      border-radius: 10px;
      line-height: 45px;
      text-align: center;
      margin: 26px auto 0 auto;
      background: #ff8200;
      color: #fff;
      font-size: 18px;
      outline: none;
      padding:0;
    }
  }
  .icon{
    width: 50px;
    height: 43px;
    position: absolute;
    top: 43px;
    left: 0;
    background: url("../assets/img/login-icon.png") no-repeat;
  }
  .name .icon{
    background-position: 0 0;
  }
  .pwd .icon{
    background-position: 0 -43px;
  }
  .code{
    input{
      width:190px;
      padding-left:18px;
    }
    img{
      width: 146px;
      height: 45px;
      margin-left: 29px;
      border: #ccc 1px solid;
      cursor: pointer;
    }
  }
  .login-main .other{
    width:366px;
    height: 38px;
    font-size: 0px;
    padding: 20px 0 0 0;
    line-height: 18px;
    margin:0 auto;
    input{
      width: 17px;
      height: 17px;
      margin: 0 10px 0 0;
      vertical-align:middle;
    }
    label{
      width: 100px;
      height: auto;
      font-size: 18px;
      color: #999;
      line-height: 18px;
      font-weight: 400;
      vertical-align:middle;
    }
    a{
      float: right;
      color: #fe9a1e;
      font-size: 18px;
      line-height: 18px;
    }
  }
</style>
<script >
  export default{
    props:['loginClick'],
    data(){
      return{
        info: {
          sysUserCode:"",
          password: "",
          code:''
        },
        codeImg:'',
        returnInfo: false,
        text: "",
        remember:false
      }
    },
    created(){
      var accountInfo = this.getCookie('accountInfo');
      //如果cookie里没有账号信息
      if(Boolean(accountInfo) == false){
        this.remember = false;
      } else{
        //如果cookie里有账号信息
        this.info.sysUserCode = accountInfo;
//        this.getCodeImg();
        this.remember = true;
      }
    },
    methods:{
      keyFun(ev){
        if(ev.keyCode == 13){
          this.submit();
        }
      },
      submit(){
          var self = this;
          if(self.info.sysUserCode==''||self.info.sysUserCode==null){
            /*self.returnInfo=true;
            self.text="用户名不能为空";*/
            this.$alert('用户名不能为空', '提示', {
              confirmButtonText: '确定'
            });

          } else if(self.info.password==''||self.info.password==null){
          /*  self.returnInfo=true;
            self.text="密码不能为空";*/
            this.$alert('密码不能为空', '提示', {
              confirmButtonText: '确定'
            });
          } else {
            var formData = new FormData();
            formData.append('sysUserCode', self.info.sysUserCode);
            formData.append('password', self.info.password);
            axios({
              method:"post",
              //url:"http://134.96.231.86:8090/netCloudUser/loginService/ensureUserInfo",
              url:"/netCloudUser/loginService/ensureUserInfo",
              headers:{
                "content-Type":"application/x-www-form-urlencoded"
              },
              data: formData
            }).then(
                res=>{
                  if(res.data.code=='0' || res.data.code==0){
                    //如果登录成功，将用户名、id存在sessionstorage
                    window.sessionStorage.setItem('login',true);
                    window.sessionStorage.setItem('user',JSON.stringify(res.data.data));
                    window.sessionStorage.setItem('userResources',JSON.stringify(res.data.msg.data));
                    //如果登录成功进行是否记住用户名操作
                    if(self.remember){
                      self.setCookie('accountInfo',self.info.sysUserCode, 30);
                    }else{
                      self.delCookie('accountInfo');
                    }
                    self.$router.go(0);
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
      close(){
        this.$emit('update:loginClick', false);
      },
      //获取验证码
/*      getCodeImg(){
          var self = this;
          axios({
            method:"get",
            url:"http://134.98.100.73:80/netCloudUser/loginService/verifyCodeServlet",
            params:{
              sysUserCode:self.info.sysUserCode
            }
          }).then(res=>{
          }).catch(err=>{
          });
      },*/
      //设置cookie
      setCookie: function(c_name,value,day){
        var exdate = new Date();
        exdate.setTime(exdate.getTime() + day*24*60*60*1000);
        document.cookie= c_name + "=" + escape(value)+((day==null) ? "" : ";expires="+exdate.toGMTString());
      },

      // 读取cookie
      getCookie: function(c_name){
        if (document.cookie.length>0)
        {
          var c_start=document.cookie.indexOf(c_name + "=");
          if (c_start!=-1)
          {
            c_start=c_start + c_name.length+1;
            var c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1)
              c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
          }
        }
        return ""
      },

      // 删除cookie
      delCookie: function(c_name){
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(c_name);
        if(cval!=null){
          document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();
        }
      },
    }
  }

</script>
