<template>
  <div class="page">
    <MyNav :current="current"></MyNav>
    <div class="main">
      <div class="main-box" v-if="!success">
        <!--tab切换按钮-->
        <ul class="tab clearfix">
          <li :class="{current:tab=='company'}" @click="tabFun('company')">企业</li>
          <li :class="{current:tab=='personal'}" @click="tabFun('personal')">个人</li>
        </ul>
        <!--tab切换内容-->
        <!--添加企业客户的表单-->
        <CompanyForm v-if="tab=='company'" @successFun="successFun"></CompanyForm>
        <!--添加个人客户的表单-->
        <PersonalForm v-if="tab=='personal'" @successFun="successFun"></PersonalForm>
      </div>
      <!--添加成功后的-->
      <div class="success"  v-if="success">
        <p class="title">客户新增</p>
        <img src="../assets/img/client_success.png"/>
        <p class="success-info">{{client}}客户资料已上传完成</p>
        <div class="success-btn clearfix">
          <!--<a class="close" href="javascript:void(0);">关闭</a>-->
          <router-link to="/" class="close">关闭</router-link>
          <router-link to="/buy">帮他购物</router-link>
        </div>
    </div>
    </div>
    <MyFooter></MyFooter>
  </div>
</template>
<style scoped lang="less">
  .page{
    min-width: 1300px;
    background: url("../assets/img/login_bg.jpg") center bottom no-repeat;
  }
  .main{
    height: 912px;
    padding-top: 50px;
  }
  .main-box{
    width: 596px;
    height: 850px;
    background: url("../assets/img/add_client_box.png") center no-repeat;
    padding: 10px;
    margin: 0 auto;
  }
  .tab{
    width: 576px;
    height: 60px;
    border-bottom: #347aea 1px solid;
    li{
      float: left;
      width: 288px;
      height: 60px;
      color: #347aea;
      text-align: center;
      line-height: 60px;
      font-size: 24px;
      cursor: pointer;
    }
    .current{
      background: #347aea;
      color: #fff;
    }
  }
  .success{
    width: 804px;
    height: 444px;
    padding: 10px;
    margin: 120px auto 0 auto;
    background: url("../assets/img/add_box_success.png") center no-repeat;
    .title{
      width: 100%;
      height: 61px;
      line-height: 61px;
      font-size: 24px;
      color: #fff;
      text-align: center;
      background: #347aea;
      margin: 0;
    }
    img{
      display: block;
      margin: 50px auto 0 auto;
    }
  }
  .success-info{
    font-size: 24px;
    text-align: center;
    color: #333;
    line-height: 84px;
    margin: 0;
  }
  .success-btn{
    width: 420px;
    margin: 0 auto;
    a{
      float: left;
      width: 190px;
      height: 40px;
      color: #fff;
      background: #347aea;
      border: #ccc 1px solid;
      font-size: 18px;
      text-align: center;
      line-height: 40px;
    }
    .close{
      margin-right: 40px;
      filter: alpha(opacity=100);
      opacity: 1;
      font-weight: 400;
      text-shadow: none;
    }
  }
</style>
<script>
  import MyNav from './common/MyNav.vue';
  import CompanyForm from './CompanyForm.vue';
  import MyFooter from './common/MyFooter.vue';
  import PersonalForm from './PersonalForm.vue';

  export default{
    components:{
      MyNav,
      CompanyForm,
      PersonalForm,
      MyFooter
    },
    data(){
        return {
          current:"index",
          tab: 'company',
          client:"张三",
          success: false
        }
    },
    created(){
        var type=this.$route.query.type;
        console.log(type);
        if(!type||type=='company'){
          this.tabFun('company');
        } else if(type=='personal'){
          this.tabFun('personal');
        }
    },
    methods:{
      tabFun(str){
          this.tab=str;
          this.$router.replace('/addClient?type='+str);
      },
      successFun(success,name){
        this.success=success;
        this.client=name;
      }
    }
  }
</script>
