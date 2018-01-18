<template>
  <div class="product">
    <div class="product-box">
      <ul class="product-list clearfix">

       <li v-for="(item,index) in product" >
         <a href="javascript:void(0);" style="cursor:pointer;" @click="urlFun(index)">
            <div class="item-img">
              <img :src="item.pic" alt="" class="item-pic" />
            </div>
            <div class="item-mian">
              <p class="item-title">{{item.catalogName}}</p>
            </div>
         </a>
        </li>

<!--        <li v-for="(item,index) in product" >
          <a href="javascript:void(0);" class="pro-item clearfix" @click="urlFun(index)">
            <div class="item-img">
              <img :src="item.pic" alt="" class="item-pic" />
            </div>
            <div class="item-mian">
              <p class="item-title">{{item.catalogName}}</p>
              <p class="item-text">{{item.catalogDesc}}</p>
            </div>
          </a>
        </li>-->
      </ul>
    </div>
  </div>

</template>

<script>
  export default {
    data(){
      return {
        current:"index",
        product:[]
      }
    },
    created(){
      var self = this;
      axios({
        method:'post',
        url:"/netCloudOffer/offerCatalogService/offercataloglist",
        data:{
          "catalogId":'',
          "parCatalogId":'',
        }
      }).then(res=>{
        self.product = res.data.data;
        self.product.forEach((v)=>{
          self.$set(v,'pic','');
          self.$set(v,'url','');
          if(v.catalogId == '61'){
            v.pic = require("../../assets/img/productIcon/cjt-icon.png");
            v.url = '/passBuy';
          } else if(v.catalogId == '101'){
            v.pic = require("../../assets/img/productIcon/cloudSpecialLine-icon.png");
            v.url = '/goodsList?catalogId=' + v.catalogId;
          } else if(v.catalogId == '161'){
            v.pic = require("../../assets/img/productIcon/cloudProduct-icon.png");
            v.url = '/goodsList?catalogId=' + v.catalogId;
          } else if(v.catalogId == '181'){
            v.pic = require("../../assets/img/productIcon/cloudNet_icon.png");
            v.url = '/goodsList?catalogId=' + v.catalogId;
          }else if(v.catalogId == '182'){
            v.pic = require("../../assets/img/productIcon/cloudBroad_icon.png");
            v.url = '/goodsList?catalogId=' + v.catalogId;
          }
        });
      })
    },
    methods:{
      urlFun(index){
        var self = this;
        var loginBool = window.sessionStorage && window.sessionStorage.getItem('login')=='true';
        var custBool = window.sessionStorage && window.sessionStorage.getItem('cust');
        if(loginBool && custBool){
          self.$router.push(self.product[index].url);
        } else if(!loginBool){
          self.$alert('请登录', '提示', {
            confirmButtonText: '确定',
            callback:action=>{

            }
          });
        } else if(!custBool){
          self.$alert('请选择客户', '提示', {
            confirmButtonText: '确定',
            callback:action=>{

            }
          });
        }
      }
    }
  }
</script>

<style  scoped lang="less">
  .product{
    overflow: hidden;
  }
  .product-box{
    width: 1200px;
    margin: 0 auto;
    padding-top: 40px;
    padding-bottom: 50px;
  }
  .product-list{
    width: 1400px;
    li{
      float: left;
      width:160px;
      margin-right: 90px;
    }
  }
  .pro-item{
    display: block;
    width: 400px;
    height: 200px;
    margin-right: 10px;
    background: #fff;
    border: #c7c7c7 1px solid;
    position: relative;
  }
  .item-img{
    float: left;
    width: 160px;
    line-height: 200px;
    text-align: center;
    padding: 0 10px;
    img{
      display: inline-block;
      vertical-align: middle;
      width: 100%;
      height: auto;
    }
  }
  .item-mian{
    float: left;
    width: 160px;
    height: 50px;
  }
  .item-title{
    color: #333;
    font-size: 16px;
    line-height: 46px;
    text-align: center;
  }
  .item-text{
    line-height: 24px;
    color: #666;
    font-size: 14px;
    margin: 0;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
  .passBuy{
    position: absolute;
    bottom: 0px;
    right: 87px;
    width: 120px;
    height: 35px;
    background: #00cc33;
    color: #fff;
    border-radius: 7px;
    text-align: center;
    font-size: 14px;
    line-height: 35px;
    margin: 0;
  }
</style>
