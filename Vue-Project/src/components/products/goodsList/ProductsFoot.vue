<template>
  <div class="product">
    <div class="product_title">{{banner.catalogName}}</div>
    <div class="product-box">
      <ul class="product_list clearfix" v-if="banner.catalogId != '181' && banner.catalogId != '182'">
        <li v-for="(item,index) in productlist">
          <input type="hidden" :value=item.offerInfo.offerId>
          <router-link :to="item.url">
            <span class="title">{{item.offerInfo.offerName}}</span>
          </router-link>
          <div class="content">{{item.offerInfo.offerDesc}}</div>
          <div class="passBuyBtn" @click="getPay(item.offerInfo.offerId,item.offerInfo.offerNbr,'15')">
            <img src="../../../assets/img/icon_jiarugouwuche.png"/>
            加入购物车
          </div>
        </li>
      </ul>
      <!--<ul class="product_list prod_cloudNet clearfix" v-if="banner.catalogId == '181' || banner.catalogId == '182'">
        <li v-for="(item,index) in productlist">
          <input type="hidden" :value=item.offerInfo.offerId>
          <router-link :to="item.url">
            <span class="title">{{item.offerInfo.offerName}}</span>
          </router-link>
          <div class="content">
            <p class="desc">{{item.offerInfo.offerDesc}}</p>
            <div class="main">
              <p class="item">云主机：CPU {{item.config[147]}}C | 内存 {{item.config[148]}}G | {{item.config[151] == 0?'使用系统硬盘':'硬盘 '+item.config[151]+'G'}}{{item.config[154] == 0?'':'| 带宽 '+item.config[154]+'M'}}</p>
              <p class="item">商务专线：{{item.config[129]?item.config[129]:item.config[231]}}</p>
            </div>
          </div>
          <div class="passBuyBtn" @click="getPay(item.offerInfo.offerId,item.offerInfo.offerNbr,'15')">
            <img src="../../../assets/img/icon_jiarugouwuche.png"/>
            加入购物车
          </div>
        </li>
      </ul-->>
    </div>
  </div>
</template>

<script>

  export default {
    props:['catalogId','banner'],
    data(){
      return {
        productlist:[]
      }
    },

    created:function(){
      var self = this;
      //      查询产品下的商品列表
      axios({
        method:'post',
        url:"/netCloudOffer/offerService/getofferinfobyoffercatalog",
        data:{
          "id":self.catalogId,
        }
      }).then(function (response) {
        var res = response.data.data;
        self.productlist = JSON.parse(JSON.stringify(res));
        self.productlist.forEach((v)=>{
          if(v.offerInfo.offerName == 'IPRAN') {
            self.$set(v,'url','/IPRANDetail');
          } else if(v.offerInfo.offerName == '云产品'){
            self.$set(v,'url','/CloudHost');
          } else if(v.offerInfo.catalogId == '181'){ //云网通
            self.$set(v,'url','/CloudNet?offerId='+v.offerInfo.offerId);
            self.getConfig(v,v.offerInfo.offerId);
          } else if(v.offerInfo.catalogId == '182'){ //云宽通
            self.$set(v,'url','/CloudBroadband?offerId='+v.offerInfo.offerId);
            self.getConfig(v,v.offerInfo.offerId);
          }
        })
      });
    },
    methods:{
//        判断是否有账户
      getPay(prodId, prodFuncType,statusCd){
        var self = this;
        var cust = window.sessionStorage.getItem('cust');
        if(cust == null || cust == ""){
          this.$alert('您未选择客户，请选择', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          });
        };
        let custId = JSON.parse(cust).CUST_ID;
        if(self.catalogId == '161' || self.catalogId == '181' || self.catalogId == '182'){
          axios({
            method:'post',
            url:'/netCloudCustomer/acctService/queryAcctInfo',
            data:{
              custId:custId
            }
          }).then(res=>{
            if(res.data.data.length > 0){
              self.addToShoppingCart(prodId, prodFuncType,statusCd);
            } else {
              self.$alert('该账号没有付费账户,请到CRM录入信息', '提示', {
                confirmButtonText: '确定',
                callback: action => {
//                  self.$router.push('/');
                  return false;
                }
              });
            }

          }).catch(err=>{});
        } else {
          self.addToShoppingCart(prodId, prodFuncType,statusCd);
        }
      },
      /**添加购物车**/
      addToShoppingCart(prodId, prodFuncType,statusCd){
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
        if(prodId == '301'){
          axios({
            url: '/netCloudOrder/shoppingCartService/addShoppingCart',
            method: 'post',
            data: {
              code:prodId,
              itemCd:'1',     //1新装 2 试用
              statusCd:statusCd,
              actionCode:'添加',
              loginUserId: loginUserId,
              shoppingCart: {
                userId: certId,
                userType: userType
              },
              shoppingCartItem: {
                applyObjId: prodId,
                applyObjSpec: 1,
              },
              cartItemAttr: {
                attrId: 0,
                attrValue: 1,
              },
              offerId: prodId,
            }
          }).then(response => {
            if (response.data.code == "0") {
              this.$router.push({path: '/shoppingCartFrame'});
            } else {
              this.$alert(response.data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  return false;
                }
              });
            }
          }).catch(err => {
          })
        }else {
          axios({
            url: '/netCloudOrder/shoppingCartService/addToShoppingCart2',
            method: 'post',
            data: {
              loginUserId: loginUserId,
              shoppingCart: {
                userId: certId,
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
              this.$router.push({path: '/shoppingCartFrame'});
            } else {
              this.$alert('添加购物车出错!', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  return false;
                }
              });
            }
          }).catch(err => {
          })
        }
      },

//      获取配置
      getConfig(prod,offerId){
        var self = this;
        self.$set(prod,'config',{});
        axios({
          method:"post",
          url:'/netCloudOffer/productsService/productlistByParam',
          data:{id:offerId}
        }).then(res=> {
          let config = {};
          let configData = [];
          for (let i = 0; i < res.data.data.length; i++) {
//              云主机  云专线   商务专线
//            云网通 = 云主机+ 云专线
//            云宽筒 = 云主机+ 商务专线
            if(res.data.data[i].productInfo){
              if (res.data.data[i].productInfo.prodId == '241' ||
                res.data.data[i].productInfo.prodId == '203' ||
                res.data.data[i].productInfo.prodId == '287' ||
                res.data.data[i].productInfo.prodId == '288') {
                configData = configData.concat(res.data.data[i].offerProductObjectAttrList);
              }
            }
          }
          configData.forEach((v) => {
            config[v.objectAttrInfo.attrId] = v.objectAttrInfo.displayValue;
            if (v.objectAttrValueList.length > 0) {
              config[v.objectAttrInfo.attrId] = v.objectAttrValueList[0].displayValue;
            }
          });


//          需要手动输入的值  油前端写死
          if(offerId == '321'){ //云网通标准版
            config['151'] = '200';  //数据盘
            config['154'] = '2';  //带宽
          } else if(offerId == '322'){ //云网通精英版
            config['151'] = '300';  //数据盘
            config['154'] = '5';  //带宽
          } else if(offerId == '323'){ //云网通尊享版
            config['151'] = '500';  //数据盘
            config['154'] = '5';  //带宽
          } else if(offerId == '324'){ //云宽通标准版
            config['151'] = '100';  //数据盘
            config['154'] = '2';  //带宽
          }else if(offerId == '325'){ //云宽通精英版
            config['151'] = '200';  //数据盘
            config['154'] = '5';  //带宽
          }else if(offerId == '326'){ //云宽通尊享版
            config['151'] = '500';  //数据盘
            config['154'] = '5';  //带宽
          }
          prod.config = config;
        }).catch(err=>{});
      }
    },
  }
</script>

<style  scoped lang="less">
  p{
    margin: 0;
    padding: 0;
  }
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
  }
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
    height: 76px;
    line-height:2;
    padding:20px 15px 0 15px;
    margin-bottom: 20px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .product_list li:nth-child(3n+1){margin-left:0;}

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
    background: #fff;
  }
  .product-box{
    width: 1200px;
    margin: 0 auto;
    padding-top: 20px;
    overflow: hidden;
  }
  .product-list{
    width: 1200px;
  }

  .prod_cloudNet{
    .title{
      background: #5eb0fd;
      font-size: 16px;
      color: #fff;
      text-align: center;
    }
    .content{
      height: auto;
      padding: 0 20px;
      margin:0 0 30px 0;
      text-align: left;
    }
    .desc{
      line-height: 52px;
      font-size: 12px;
      color: #666;
      border-bottom: #ccc 1px solid;
    }
    .main{
      color: #333;
      line-height: 26px;
      font-size: 13px;
      padding-top: 12px;
    }
    li{
      text-align: right;
    }
    .passBuyBtn{
      margin-right: 17px;
    }
  }
</style>
