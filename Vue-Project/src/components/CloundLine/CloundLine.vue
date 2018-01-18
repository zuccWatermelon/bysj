<template>
 <div class="index">
   <div class="top">
       <!--头部-->
       <MyNav :current="current"  :custData="custData"></MyNav>
     <!--图片-->
      <ProductsPhoto></ProductsPhoto>
   </div>
     <!--尾部-->
      <ProductsFoot :loginClick.sync="loginClick"></ProductsFoot>
     <!--购物车审批-->
      <Examine v-if="loginClick" :loginClick.sync="loginClick"></Examine>
 </div>
</template>
<script>
  import MyNav         from '../common/MyNav.vue';
  import ProductsPhoto from './ProductsPhoto.vue';
  import ProductsFoot  from './ProductsFoot.vue';
  import Examine       from './Examine.vue';

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
        client:""
      };
    },
    created(){
      var cust = window.sessionStorage.getItem('cust');
      if(cust!=null && cust!=''){
        this.custData=JSON.parse(cust);
      }
    },
    components:{
      MyNav,
      ProductsPhoto,
      ProductsFoot,
      Examine
    },
  }
</script>
<style scoped lang="less">
  .index{
    background: #f9fcfe;
    .top{
      height:340px;
      width:100%;
      background: url("../../assets/img/pic_111.png") no-repeat,linear-gradient(left, #6e21aa ,#666ebe, #628ac7); /* 标准的语法 */
      background: url("../../assets/img/pic_111.png") no-repeat, -o-linear-gradient(left, #6e21aa ,#666ebe, #628ac7); /* Opera 11.1 - 12.0 */
      background: url("../../assets/img/pic_111.png") no-repeat, -moz-linear-gradient(left, #6e21aa ,#666ebe, #628ac7); /* Firefox 3.6 - 15 */
      background: url("../../assets/img/pic_111.png") no-repeat, -webkit-linear-gradient(left, #6e21aa ,#666ebe, #628ac7);
      background-position:center;
    }
  }

</style>
