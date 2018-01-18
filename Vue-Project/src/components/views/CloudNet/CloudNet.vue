<!--云主机配置详情-->
<template>
  <div class="index">
    <div class="top">
      <MyNav  :current="current"
              :custData="custData"
      ></MyNav>
      <CloudNetIntro :offerId="offerId"></CloudNetIntro>
    </div>
    <CloudNetMiddleTemplate></CloudNetMiddleTemplate>
  </div>
</template>

<style scoped lang="less">
  .clear{
    clear:both;
  }
  .red-border{
    border:1px solid red;
  }
  .top{
    height:340px;
    width:100%;
    background-color: #0182de;
    background-image: url("../../../assets/img/pic_2.png");
    background-repeat: no-repeat;
    background-position:center;
  }
  .main{
    width:100%;
  }
</style>
<script>
  import MyNav from '../../common/MyNav.vue';
  import CloudNetIntro from './CloudNetIntro.vue';
  import CloudNetMiddleTemplate from './CloudNetMiddleTemplate.vue';



  export default {
    data(){
      return{
        loginClick:false,
        current:"index",
        customer_search:"0",
        custData:{},
        custDataList:[],
        customerSelectBox:false,
        custChange:false,
        client:"",
        offerId:''
      };
    },
    computed:{
    },

    components:{
      MyNav,
      CloudNetIntro,
      CloudNetMiddleTemplate,
    },

    mounted:function(){

      /**获取用户对应的session**/
      var user = window.sessionStorage.getItem('user');
      /**获取客户对应的session**/
      var cust = window.sessionStorage.getItem('cust');

      this.sysUserName=JSON.parse(user).sysUserName;
      this.custData = JSON.parse(cust);
      this.offerId=this.$route.query.offerId

    },

    methods:{

    },
  }
</script>


