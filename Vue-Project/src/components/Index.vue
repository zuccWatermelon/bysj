<!--客户信息查询模板-->
<template>
  <div class="index">
    <div class="top">
      <!--轮播插件-->
      <Carousel></Carousel>
      <!--<div class="cont">-->
        <MyNav class="nav" :current="current"
               :custData="custData"></MyNav>
        <welcome v-if="customer_search=='0'"
                 :customerSelectBox.sync="customerSelectBox"
                 :custDataList="custDataList"
                 @callback="custDataChange"
                 @queryCustInfo="queryCustInfo">
        </welcome>

        <customerSearch v-if="customer_search=='1'"
                        @custOut="custOut"
                        :data="custData"
                        :custChange.sync="custChange"
        ></customerSearch>
      <!--</div>-->
    </div>
    <!--切换客户-->
    <!--<custChange v-if="custChange"-->
                <!--:custChange.sync="custChange"-->
                <!--@callback="custDataChange"-->
    <!--&gt;</custChange>-->

    <!--产品列表插件-->
    <product></product>

    <!--脚注-->
    <MyFooter></MyFooter>

  </div>
</template>

<script>
  import MyNav from './common/MyNav.vue';
  import Carousel from './common/Carousel.vue';
  import MyFooter from './common/MyFooter.vue';
  import product from './common/product.vue';
  import welcome from './common/welcome.vue';
  import customerSearch from './common/customerSearch.vue';
  import custChange from './common/custChange.vue';
  export default {
    data(){
      return{
        current:"index",
        customer_search:"0",
        custData:{},
        custDataList:[],
        customerSelectBox:false,
        custChange:false,
        client:""
      };
    },
    components:{
      MyNav,
      MyFooter,
      product,
      Carousel,
      welcome,
      customerSearch,
      custChange
    },
    created(){
      var cust = window.sessionStorage.getItem('cust');
      if(cust!=null && cust!=''){
        this.custData=JSON.parse(cust);
        this.customer_search='1';
      }
    },
    methods:{
      custOut(customer_search){
        this.customer_search = customer_search;
        this.custData = {};
        this.customerSelectBox = false;
      },
      queryCustInfo(custInfo){
        if(custInfo.contactName == '' || !custInfo.contactName){
          this.$alert('请输入查询条件', '提示', {
            confirmButtonText: '确定',
            callback:action=>{

            }
          });
          return false;
        } else {
          var login=window.sessionStorage.getItem('login');
          if(login == null || login=='false' || login == false){
            this.$alert('请先登录', '提示', {
              confirmButtonText: '确定',
              callback:action=>{
              }
            });
          }else{
            var userStr = window.sessionStorage.getItem('user');
            var user = JSON.parse(userStr);
            var userId = user.staffId;
            axios({
              method:'post',
              url:"/netCloudCustomer/customerService/queryCustomerInfoList",
              data: {
                keywords:{
                  value:custInfo.contactName,
                  userId:userId
                },
                pageSize:-1,
                pageNo:-1
              }
            })
              .then(response => {
//             查询出有数据
                if(response.data.code=="0"){
                  var length=response.data.data.length;
//                只有一个数据
                  if(length == 1){
                    this.customer_search = "1";
                    var cust = response.data.data;
                    this.custData = cust[0];
//                    将客户信息存到sessionStorage 客户 防止刷新丢失
                    var obj = this.custData;
                    var str = JSON.stringify(obj);
                    window.sessionStorage.setItem('cust',str);
                  }else if(length > 1){
//                    有多个数据
                    this.customer_search = "0";
                    this.custDataList = response.data.data;
                    this.customerSelectBox = true;
                  }else{
                    this.$alert('未查询到对应的客户信息', '提示', {
                      confirmButtonText: '确定',
                      callback:action=>{
                      }
                    });
                  }
                } else {
                  this.$alert('查询出错', '提示', {
                    confirmButtonText: '确定',
                    callback:action=>{

                    }
                  });
                }})
              .catch(err => {

              })
          }
        }
      },
      custDataChange(data){

        this.customer_search='1';
        this.custChange=false;
        this.custData=data;
        //            将客户信息存到sessionStorage中  防止刷新丢失
        var str = JSON.stringify(data);
        window.sessionStorage.setItem('cust',str);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .index{
    background: #f9fcfe;
  }
  .top{
    position: relative;
    .nav{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 99;
    }
    .cont{
      position: absolute;
      top:0;
      left: 0;
      width: 100%;
      z-index: 999;
    }
  }

</style>
