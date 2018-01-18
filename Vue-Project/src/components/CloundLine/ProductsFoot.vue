<template>
  <div class="product">
    <div class="product_title">云系列</div>
    <div class="product-box">
      <ul class="product_list clearfix">
        <li v-for="(item,index) in productlist">
          <input type="hidden" :value=item.offerId>
          <router-link to="/IPRANDetail">
            <span class="title">{{item.offerName}}</span>
          </router-link>
          <div class="content">{{item.offerDesc}}</div>
          <div class="passBuyBtn" @click="addToShoppingCart(item.offerId,item.offerNbr)">
            <img src="../../assets/img/icon_jiarugouwuche.png"/>
            加入购物车
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    props:['loginClick'],
    data(){
      return {
        prodData:[],
        productlist:[],
        current:"index",
        product:[]
      }
    },

     mounted:function(){
      var _this = this;

      /**拼接目录相关数据**/
      var lst;
      var catalogId;
      var parCatalogId;

      /**拼装菜单相关数据**/
      var prodData = [];
      var productlist = [];

      axios({
        method:'post',
        url:"/netCloudOffer/offerCatalogService/offercataloglist",
        data:{
          "catalogId":'',
          "parCatalogId":'',
        }
      }).then(function (response) {
        lst = response.data.data;
        $.each(lst,function (index,item) {
            if(item.catalogType == "A01"){
              catalogId = item.catalogId;
              parCatalogId = item.parCatalogId;
              var jsonData = {};
              jsonData.offerId = item.catalogId;
              jsonData.offerDesc = item.catalogDesc;
              jsonData.offerName = item.catalogName;
              prodData.push(jsonData);
            }
            _this.prodData = prodData;
        });

         /**继续查询产品下的商品列表**/
          axios({
            method:'post',
            url:"/netCloudOffer/offerService/getofferinfobyoffercatalog",
            data:{
              "id":catalogId,
            }
          }).then(function (response) {

            var res = response.data.data;
            $.each(res,function (index,item) {
              var jsonData = {};
              jsonData.offerName = item.offerName;
              jsonData.offerDesc = item.offerDesc;
              jsonData.catalogId = item.catalogId;
              jsonData.offerId = item.offerId;
              productlist.push(jsonData);
            });

            _this.productlist = productlist;
          });

      })
    },
    methods:{
      shopping(){
        this.$emit('update:loginClick', true);
      },

      /**添加购物车**/
      addToShoppingCart(prodId, prodFuncType){
        var _this = this;
        var user = window.sessionStorage.getItem('user');
        var cust = window.sessionStorage.getItem('cust');
        if(cust == null || cust == ""){
          this.$alert('您未选择客户，请选择', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          });
        };

        var userType = JSON.parse(user).staffType;
        var sysUserName = JSON.parse(user).sysUserName;
        var loginUserId = JSON.parse(user).staffId;
        var userId = JSON.parse(user).staffId;
        var certId = JSON.parse(cust).CUST_ID;

        if (loginUserId == "" || loginUserId == null) {
          this.$alert('您未登录，请登录', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          });
        };

        if (certId == "" || certId == null || userType == null || userType == "") {
          this.$alert('您未选择客户，请选择', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          });
        }

       axios({
          url: '/netCloudOrder/shoppingCartService/addToShoppingCart2',
          method: 'post',
          data: {
            loginUserId: loginUserId,
            shoppingCart: {
              userId:   certId,
              userType: userType
            },
            shoppingCartItem: {
              applyObjId: prodId,
              applyObjSpec: 1,
            },
            cartItemAttr: {
              attrId: 0,
              attrValue: 1,
            }
          }
        }).then(response => {
          if (response.data.code == "0") {
            this.$router.push({path: '/myShoppingCart'});
          }else{
            this.$alert('添加购物车出错!', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                return false;
              }
            });
          }
        }).catch(err => {
        })
      },
    },
  }
</script>

<style  scoped lang="less">
  .product_title{font-size:24px;color:white;text-align:center;background-color:#a371c5;padding:10px;}
  .product_list li{
    box-sizing:border-box;
    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    border:1px solid #c8c8c8;
    width:390px;
    margin-left:15px;
    float:left;
    text-align:center;
    .title{
      display: block;
      background-color:#ebecec;
      color:#333;
      font-size:20px;
      padding:10px;
    }
    .content{
      font-size:14px;
      color:#666;
      line-height:2;
      padding:20px 15px;
    }
  }
  .product_list li:nth-child(3n+1){margin-left:0;}
  .btmBorderSO{
    color:#83bbf1 !important;
    border-bottom: 2px solid #83bbf1 !important;
  }
  .marLeft{
    margin-right: 0 !important;
  }


  .passBuy{
    width:100%;
    height:auto;
    background: #f2f8fa;
    padding-top: 60px;
    padding-bottom: 148px;
    clear: both;
    position: relative;
  }
  .passBox{
    width: 1210px;
    padding: 0 12px;
    margin:0 auto;
  }

  .passBack img{
    position: absolute;
    top:30px;
    left:0;
  }

  .passBuyContent{
    position: relative;
    width:1200px;
    height:auto;
    /*margin: 0 auto;*/
    /*background:#f9fcfe;*/
  }
  .passBuyTop{
    width:100%;
    height:318px;
    font-size: 16px;
    background: #fff;
    box-shadow: 3px 4px 2px #f1f1f1;
    padding: 42px 70px;
    position: relative;
    margin-bottom: 36px;

  }
  .passBuyProduct{
    width:320px;
    height:232px;
  }

  .passBuyPWord{
    width:708px;
    height:232px;

    position: absolute;
    top:42px;
    left: 422px;
  }


  .passBuyLeft{
    position: absolute;
    width:178px;
    min-height:382px;
    height:auto;
    box-shadow: 3px 4px 2px #f1f1f1;
    background: #fff;
  }

  .passT{
    width:100%;
    height:53px;
    padding: 0 12px;
    background: #fff;
    color:#333;
    font-size: 22px;
  }
  .passT:hover{
    cursor:pointer;
  }
  .passTContent{
    width:100%;
    position: relative;
    padding: 10px 0;
    text-indent: 20px;
    border-bottom:1px dashed #f2f2f2;
  }

  .passBuyRight{
    float:left;
    margin-left: 206px;
    width:994px;
    height:auto;
    /*background: #f9fcfe;*/
    position: relative;
  }
  .passBuyBox{
    width:100%;
    height:auto;

  }
  .passBuyB{
    width:300px;
    height:382px;
    background: #fff ;
    margin-bottom: 20px;
    float: left;
    margin-right: 46px;
    box-shadow: 3px 4px 2px #f1f1f1;
    position: relative;
  }
  .passBuyImg img{
    margin-top: 10px;
    width:40%;
    height:100px;
  }
  .passBuyWord{
    width:100%;
    color:#333;
    padding: 30px;
    font-size: 16px;
  }
  .passBuyWord p{

    margin-bottom: 30px;
  }
  .passBuyWord span{

    line-height: 26px;
    display: inline-block;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
  .passBuyBtn{
    width:120px;
    outline: none;
    border: 1px solid #ff8200;
    line-height: 36px;
    color:#fff;
    background:#ff8200 ;
    text-align: center;
    border-radius: 4px;
    text-indent: 20px;
    font-size: 14px;
    display:inline-block;
    margin-bottom:20px;
    position:relative;
  }
  .passBuyBtn:hover{
    cursor:pointer;
  }
  .passBuyBtn img{
    position: absolute;
    top:9px;
    left:10px;
    width:19px;
    height:18px;
  }

  .product{
    overflow: hidden;
  }
  .product-box{
    width: 1200px;
    min-height:500px;
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 100px;
    overflow: hidden;
  }
  .product-list{
    width: 1200px;
  }
  .pro-item{
    float: left;
    width: 588px;
    height: 232px;
    margin-right: 10px;
    background: #fff;
    border: 1px solid #c7c7c7;
    position: relative;
  }
  .item-title{
    color: #666;
    font-size: 16px;
    line-height: 21px;
    margin:0;
    padding-bottom: 10px;
  }
  .item-mian{
    float: left;
    /*padding-left: 48px;*/
    height: 185px;
    position: absolute;
    top: 40px;
    left: 220px;
  }
  .item-pic{
    float: left;
    width: 146px;
    height: 145px;
    margin-top: 40px;
    margin-left: 40px;
  }
  .item-text{
    float: left;
    width: 330px;
    line-height: 24px;
    color: #999;
    font-size: 12px;
    /*text-indent: 2em;*/
    margin: 0;
  }
  .passBuy{
    position: absolute;
    bottom: 35px;
    right: 87px;
    width: 120px;
    height: 35px;
    background: #ff8200;
    color: #fff;
    border-radius: 7px;
    text-align: center;
    font-size: 14px;
    line-height: 35px;
    margin: 0;
  }
  .pro-img{
    margin-top: 7px;
    margin-right: 2px;
  }
</style>
