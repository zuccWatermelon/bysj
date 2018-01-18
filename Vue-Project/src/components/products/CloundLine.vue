<template>
 <div class="index">
     <!--头部-->
      <ProductsHeader  :current="current"
                       :loginClick.sync="loginClick"
                       :client="custData"
      ></ProductsHeader>
     <!--图片-->
      <ProductsPhoto></ProductsPhoto>
     <!--尾部-->
      <ProductsFoot></ProductsFoot>
 </div>
</template>
<script>
  import ProductsHeader from '../common/ProductsHeader.vue';
  import ProductsPhoto from '../common/ProductsPhoto.vue';
  import ProductsFoot from '../common/ProductsFoot.vue';

  export default {
    data(){
      return{
        loginClick:false,
        current:"CloundLine",
        customer_search:"0",
        custData:{},
        custDataList:[],
        customerSelectBox:false,
        custChange:false,
        client:""
      };
    },
    components:{
      ProductsHeader,
      ProductsPhoto,
      ProductsFoot
    },
  }
</script>
<style>
  .index{
    height:700px;
    background: #f9fcfe;
  }
</style>
