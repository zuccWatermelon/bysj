<!--商品列表-->
<template>
  <div class="index">
    <div class="top">
      <!--头部-->
      <MyNav :current="current"  :custData="custData"></MyNav>
      <!--图片-->
      <ProductsPhoto :banner="banner"></ProductsPhoto>
    </div>
    <!--尾部-->
    <ProductsFoot :banner = "banner"
                  :catalogId = "catalogId"
    ></ProductsFoot>
    <!--&lt;!&ndash;购物车审批&ndash;&gt;-->
    <!--<Examine v-if="loginClick" :loginClick.sync="loginClick"></Examine>-->
  </div>
</template>
<script>
  import MyNav         from '../common/MyNav.vue';
  import ProductsPhoto from './goodsList/ProductsPhoto.vue';
  import ProductsFoot  from './goodsList/ProductsFoot.vue';
//  import Examine       from './goodsList/Examine.vue';

  export default {
    data(){
      return{
        banner:{},
        current:"index",
        catalogId:"",
        custData:{},

        productlist:[],
      };
    },
    created(){
      var self = this;
      var cust = window.sessionStorage.getItem('cust');
      if(cust!=null && cust!=''){
        self.custData=JSON.parse(cust);
      }
//      获取目录id
      self.catalogId = self.$route.query.catalogId;
//      获取目录
      axios({
        method:'post',
        url:"/netCloudOffer/offerCatalogService/offercataloginfo",
        data:{
          id:self.catalogId
        }
      }).then(res=>{
        self.banner = res.data.data;
      })
    },
    components:{
      MyNav,
      ProductsPhoto,
      ProductsFoot,
//      Examine
    },
  }
</script>
<style scoped lang="less">
  .index{
    background: #f9fcfe;
    .top{
      height:340px;
      width:100%;
      background: url('../../assets/img/pic_111.png') no-repeat,linear-gradient(left, #6e21aa ,#666ebe, #628ac7); /* 标准的语法 */
      background: url('../../assets/img/pic_111.png')  no-repeat, -o-linear-gradient(left, #6e21aa ,#666ebe, #628ac7); /* Opera 11.1 - 12.0 */
      background: url('../../assets/img/pic_111.png')  no-repeat, -moz-linear-gradient(left, #6e21aa ,#666ebe, #628ac7); /* Firefox 3.6 - 15 */
      background: url('../../assets/img/pic_111.png')  no-repeat, -webkit-linear-gradient(left, #6e21aa ,#666ebe, #628ac7);
      background-position:center;
    }
  }

</style>
