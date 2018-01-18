<!--云主机配置详情-->
<template>
  <div class="index">
    <div class="top">
      <MyNav  :current="current"
              :custData="custData"
      ></MyNav>
      <CloudBroadbandIntro :offerId="offerId"></CloudBroadbandIntro>
    </div>
    <CloudBroadbandMiddleTemplate></CloudBroadbandMiddleTemplate>
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
    background-image: url("../../../assets/img/CloudBroadband_banner.jpg");
    background-repeat: no-repeat;
    background-position:center;
  }
  .main{
    width:100%;
  }
</style>
<script>
  import MyNav from '../../common/MyNav.vue';
  import CloudBroadbandIntro from './CloudBroadbandIntro.vue';
  import CloudBroadbandMiddleTemplate from './CloudBroadbandMiddleTemplate.vue';


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
        offerId:'',

      };
    },
    computed:{
    },

    components:{
      MyNav,
      CloudBroadbandIntro,
      CloudBroadbandMiddleTemplate,
    },

    mounted:function(){

      /**获取用户对应的session**/
      var user = window.sessionStorage.getItem('user');
      /**获取客户对应的session**/
      var cust = window.sessionStorage.getItem('cust');

      this.sysUserName=JSON.parse(user).sysUserName;
      this.custData = JSON.parse(cust);

//      获取offerId
      this.offerId = this.$route.query.offerId;

    },

    methods:{

    },
  }
</script>


