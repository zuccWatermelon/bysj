<!--合作伙伴功能模板-->
<template>
  <div class="index">
    <MyNav class="nav" :current="current"
           :loginClick.sync="loginClick"
           :client="custData"
    ></MyNav>

    <Carousel></Carousel>

    <div class="container">
      <div id="flat">
        <!--<router-link to="/RealNameCompany"  class="join-partner-tag"><div class="join-partner">加入合作伙伴</div></router-link>-->
        <a href="javascript:void(0);" class="join-partner-tag"><div class="join-partner">加入合作伙伴</div></a>
        <a class="control-panel-tag"><div class="control-panel">合作伙伴控制台</div></a>
      </div>
    </div>

    <MyFooter></MyFooter>
  </div>
</template>

<script>
  import MyNav from '../common/MyNav.vue';
  import Carousel from '../common/Carousel.vue';
  import MyFooter from '../common/MyFooter.vue';

  export default{
    data(){
      return{
        current:"partner",
        custData:{},
        loginClick:false
      };
    },
    created() {
      var cust = window.sessionStorage.getItem('cust');
      if(cust!=null && cust!=''){
        this.custData=JSON.parse(cust);
      }
    },
    components:{
      MyNav,
      MyFooter,
      Carousel
    }
  }
</script>

<style scoped lang="less">
  .nav{
    background: #ff8200;
  }
  .index{
    background: #f9fcfe;
  }

  #flat{
    width:100%;
    height: 300px;
  }

  .join-partner{
    float:left;
    border-radius: 7px;
    text-align: center;
    margin-left:0;
    margin-top:70px;
    padding-top: 20px;
    width: 400px;
    height: 150px;
    color: white;
    font-size: 30px;
    line-height: 100px;
    background: #2bb4ff;
    cursor: pointer;
  }
  .control-panel{
    float:right;
    border-radius: 7px;
    text-align: center;
    margin-left:0;
    margin-top:70px;
    padding-top: 20px;
    width: 400px;
    height: 150px;
    color: white;
    font-size: 30px;
    line-height: 100px;
    background: #2bb4ff;
    cursor: pointer;
  }

  .join-partner-tag{
    color: white;
  }
  .join-partner-tag:visited{
    color:white;
  }
  .join-partner-tag:hover{
    color:white;
  }

  .control-panel-tag{
    color: white;
  }
  .control-panel-tag:visited{
    color: white;
  }

  .control-panel-tag:hover {
    color: white;
  }

</style>
