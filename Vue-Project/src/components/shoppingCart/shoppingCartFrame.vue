<template>
  <div class="index">
    <MyNav :current="current" :custData="custData" :background="'#eee'"></MyNav>
    <div class="topic">
      <div class="topic-top">
        <div class="topic-top-cart" :title="custName"><span><nobr>{{custName}}</nobr></span><span>的购物车</span></div>
      </div>

      <div class="topic-bottom">
        <div class="topic-bottom-title" style="width:20%;">商品名称</div>
        <div class="topic-bottom-title" style="width:8%;">费用类型</div>
        <div class="topic-bottom-title" style="width:12%;">商品折扣</div>
        <div class="topic-bottom-title" style="width:15%;">单价</div>
        <div class="topic-bottom-title" style="width:10%;">总计</div>
        <div class="topic-bottom-title" style="width:8%;">状态</div>
        <div class="topic-bottom-title" style="width:12%;">收费方式</div>
        <div class="topic-bottom-title" style="width:15%;">操作</div>
      </div>
    </div>

    <div class="main">
      <ul>
        <li v-for="(item,index) in prodDataList" class="item-li" style="margin-bottom:50px;">
          <!--畅捷通相关产品模板-->
          <CJTTemplate v-on:partPrice="calculateSumPrice"  v-if="(item.offerId == '244' || item.offerId == '247' || item.offerId == '245')" :prodList.sync="item" :index.sync="index" v-on:deleteCart="deleteCart"></CJTTemplate>

          <!--IPRan相关产品模板-->
          <IPRanTemplate v-on:partPrice="calculateSumPrice" v-if="item.offerId == '261'" :prodList.sync="item" :index.sync="index" v-on:deleteCart="deleteCart"></IPRanTemplate>

          <!--云主机相关产品模板-->
          <CloudHostOuterTemplate  v-on:partPrice="calculateSumPrice"
                                     v-if="item.offerId == '301'"
                                   :prodList.sync="item"
                                   :index.sync="index"
                                   :parentIndex.sync="parentIndex"
                                   :parentOrderTransInstance.sync="parentOrderTransInstance"
                                   v-on:deleteCart="deleteCart"
                                   :chanel.sync="chanel" ></CloudHostOuterTemplate>

          <!--云网通相关产品模板-->
          <CloudNetOuterTemplate  v-on:partPrice="calculateSumPrice"
                                   v-if="item.offerId == '321' || item.offerId == '322' || item.offerId == '323'"
                                   :prodList.sync="item"
                                   :index.sync="index"
                                   :parentIndex.sync="parentIndex"
                                   :parentOrderTransInstance.sync="parentOrderTransInstance"
                                   v-on:deleteCart="deleteCart"
                                   :chanel.sync="chanel"
          ></CloudNetOuterTemplate>

          <!--云宽通相关产品模板-->
          <CloudbroadbandOuterTemplate v-on:partPrice="calculateSumPrice"
                                          v-if="item.offerId == '324' || item.offerId == '325' || item.offerId == '326'"
                                          :prodList.sync="item"
                                          :parentIndex.sync="parentIndex"
                                          :parentOrderTransInstance.sync="parentOrderTransInstance"
                                           v-on:deleteCart="deleteCart"
                                          :chanel.sync="chanel">

          </CloudbroadbandOuterTemplate>
        </li>
      </ul>
    </div>

    <div class="main-two">
      <div class="main-two-center">
        <div class="add-to-cart" @click="submitOrder()">提交</div>
        <div class="final-price">
          <p>总价：<span class="orange sumPrice"><small>￥{{sumPrice}}</small></span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MyNav                       from '../common/MyNav.vue';
  import IPRanTemplate               from '../products/template/IPRanTemplate.vue';
  import CJTTemplate                 from '../products/template/CJTTemplate.vue';
  import CloudHostOuterTemplate      from '../products/template/CloudHostOuterTemplate.vue';
  import CloudNetOuterTemplate       from '../products/template/CloudNetOuterTemplate.vue';
  import CloudbroadbandOuterTemplate from '../../components/views/CloudBroadband/CloudbroadbandOuterTemplate.vue';

  export default{
    data(){
      return{
        current:"index",
        custData:{},
        /**数据数组**/
        prodDataList:[],
        custName:'',
        prodIdList:['261'],
        sumPrice:'0.00',
        chanel:'shoppingCart',
        /**试转商专用**/
        parentOrderTransInstance:{},
        parentIndex:'',
        AAA:'VUE'
      };
    },
    components:{
      MyNav,
      IPRanTemplate,
      CJTTemplate,
      CloudHostOuterTemplate,
      CloudNetOuterTemplate,
      CloudbroadbandOuterTemplate
    },
    mounted:function (){
      var _this = this;

      /**获取用户对应的session**/
      var user = window.sessionStorage.getItem('user');
      /**获取客户对应的session**/
      var cust = window.sessionStorage.getItem('cust');
      /**存放购物车信息**/
      var prodDataList = [];

      /**存放配置信息**/
      var confDataList = {
        /**存放IPRAN产品默认配置信息**/
        '261':[],
        /**存放云主机产品默认配置信息**/
        '301':[],
        /**存放云网通标准版产品默认配置信息**/
        '321':[],
        /**存放云网通精英版产品默认配置信息**/
        '322':[],
        /**存放云网通尊享版产品默认配置信息**/
        '323':[],
        /**存放云宽通标准版产品默认配置信息**/
        '324':[],
        /**存放云宽通精英版产品默认配置信息**/
        '325':[],
        /**存放云宽通尊享版产品默认配置信息**/
        '326':[],
      };

      //存放商品默认配置信息
      let confListOfProd = {
        /**存放云网通标准版默认商品信息**/
        '321':[],
        /**存放云网通精英版默认商品信息**/
        '322':[],
        /**存放云网通尊享版默认商品信息**/
        '323':[],
        /**存放云宽通标准版默认商品信息**/
        '324':[],
        /**存放云宽通精英版默认商品信息**/
        '325':[],
        /**存放云宽通尊享版默认商品信息**/
        '326':[],
      };

      /**存放对应购物车的配置信息**/
      var prodConfDataList = [];

      /**获取用户对应的session**/
      var user = window.sessionStorage.getItem('user');
      /**获取客户对应的session**/
      var cust = window.sessionStorage.getItem('cust');
      _this.custData = JSON.parse(cust);

      /**获取加载购物车的查询条件**/
      var custId = JSON.parse(cust).CUST_ID;

      /**获取购物车对应的客户名并显示**/
      var custName = JSON.parse(cust).custName;
      _this.custName = custName;

      var lst;
      _this.sysUserName=JSON.parse(user).sysUserName;

      axios({
        method:'post',
        url:"/netCloudOrder/shoppingCartService/getShoppingCarts",
        data:{
          userId:custId,
          pageSize:"1000",
          pageNo:"1",
        }
      }).then(function(response) {
        /**查询成功,展示购物车项列表**/
        if(response.data.code == "0"){
          prodDataList = response.data.data
        }
        /**获取云产品的产品id**/
        axios({
          method:'post',
          url:"/netCloudOffer/productsService/productlistByParam",
          data:{
            "id":'261'
          },
        }).then(function (response) {
          lst = response.data.data;
          confDataList['261'] = lst;

          /**获取云主机产品的id**/
          axios({
              method:'post',
              url:"/netCloudOffer/productsService/productlistByParam",
              data:{
                "id":'301'
              },
            }).then(function(response){
              lst = response.data.data;
              confDataList['301'] = lst;

              /**获取云网通标准版的产品id**/
              axios({
                method:'post',
                url:"/netCloudOffer/productsService/productlistByParam",
                data:{
                  "id":'321'
                },
              }).then(function (response) {
                lst = response.data.data;
                confDataList['321'] = lst;

                /**获取云网通精英版的产品id**/
                axios({
                  method:'post',
                  url:"/netCloudOffer/productsService/productlistByParam",
                  data:{
                    "id":'322'
                  },
                }).then(function (response) {
                  lst = response.data.data;
                  confDataList['322'] = lst;

                  /**获取云网通尊享版的产品id**/
                  axios({
                    method:'post',
                    url:"/netCloudOffer/productsService/productlistByParam",
                    data:{
                      "id":'323'
                    },
                  }).then(function (response) {
                    lst = response.data.data;
                    confDataList['323'] = lst;

                    /**获取云宽通标准版的产品id**/
                    axios({
                      method:'post',
                      url:"/netCloudOffer/productsService/productlistByParam",
                      data:{
                        "id":'324'
                      },
                    }).then(function (response) {
                      lst = response.data.data;
                      confDataList['324'] = lst;

                      /**获取云宽通精英版的产品id**/
                      axios({
                        method:'post',
                        url:"/netCloudOffer/productsService/productlistByParam",
                        data:{
                          "id":'325'
                        },
                      }).then(function (response) {
                        lst = response.data.data;
                        confDataList['325'] = lst;

                        /**获取云宽通尊享版的产品id**/
                        axios({
                          method:'post',
                          url:"/netCloudOffer/productsService/productlistByParam",
                          data:{
                            "id":'326'
                          },
                        }).then(function (response) {
                          lst = response.data.data;
                          confDataList['326'] = lst;
                    //查询云网通商品默认信息
                     axios({
                        method:'post',
                        url:"/netCloudOffer/offerService/getofferinfobyoffercatalog",
                        data:{
                          "id":'181',
                        }
                     }).then(function (response) {
                        var res = response.data.data;
                        res.forEach((v)=>{
                            confListOfProd[v.offerInfo.offerId] = v;
                        });
                       //查询云宽通商品默认信息
                       axios({
                         method:'post',
                         url:"/netCloudOffer/offerService/getofferinfobyoffercatalog",
                         data:{
                           "id":'182',
                         }
                       }).then(function (response) {
                         var res = response.data.data;
                         res.forEach((v)=>{
                           confListOfProd[v.offerInfo.offerId] = v;
                         })


                         /**遍历所有的购物车并加载配置**/
                         $.each(prodDataList,function(index,item) {
                           var cartItemId = item.cartItemId;
                           var offerId = item.offerId;
                           var catalogId = item.catalogId;

                           /**设置价格,用于购物车计算总价用**/
                           _this.$set(item, 'allPrice', '');
                           //给购物车项产品默认配置信息
                           item.confList = confDataList[offerId];
                           //给购物车项商品默认配置信息
                           let have_prod_conf = false;
                           for(let i in confListOfProd){
                             if(i == offerId){
                               item.confListOfProd = confListOfProd[offerId];
                               have_prod_conf = true;
                             }
                           }
                           if(!have_prod_conf){
                             item.confListOfProd = {};
                           }

                           axios({
                             method: 'post',
                             url: "/netCloudOrder/cartItemAttrService/queryCartItemAttr",
                             data: {
                               cartItemId: cartItemId,
                               offerId: offerId,
                               catalogId: catalogId,
                             }
                           }).then(function (response) {
                             if (response.data.code == "0") {
                               var data = response.data.data;
                               item.prodConfList = data;
                               item.orderTransInstance = {};
                               _this.prodDataList.push(item);
                             }
                           })
                         });
                       });
                     });
                        }).catch(err =>{})
                      }).catch(err =>{})
                    }).catch(err =>{})
                }).catch(err =>{})
              }).catch(err =>{})
            }).catch(err =>{})
          }).catch(err =>{})
        }).catch(err =>{})
      }).catch(err =>{})
    },
    watch:{
      parentOrderTransInstance:function(){
        let _this = this;
        _this.calculateSumPrice();
      },
    },
    methods:{
      getAllPrice:function () {
          var _this = this;
          var sumPrice = '';
          _this.prodData.forEach((v)=>{
                sumPrice = v.allPrice + sumPrice;
          })
        return sumPrice;
      },

      /**提交订单**/
      submitOrder:function () {
        var _this = this;
        var param = {};
        var orderItemList = [];
        var num = 0;

        /**遍历所有的购物车行,一次只允许提交一个**/
        $(".item-li").each(function () {
          var node = $(this).find("input[type='checkbox']");
          if($(node).prop("checked")) {
            num++;
          }
        });

        if(num != 1){
          this.$alert('不支持一次性提交多项!','提示',{
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          })
        }

        if(num == 0){
          this.$alert('请先选中再提交!','提示',{
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          })
        }

        /**提交成功后返回信息**/
        var successMsg = "";
        /**提交失败信息**/
        var errorMsg = "";
        /**组装提交的数据**/
        $("li.item-li").each(function () {
          var node = this;
          /**如果该checkbox被选中**/
          if($(node).find(".main-top").find("input[type='checkbox']").prop("checked")) {
            var cartId = $(node).find(".inputCartId").val();
            var orderItemId = $(node).find(".inputCartItemId").val();
            var applyObjId = $(node).find(".inputOfferId").val();
            var catalogId = $(node).find(".inputCatalogId").val();
            var applyObjSpec = "1";
            var discount = $(node).find(".discount").val();
            var billType = $(node).find(".billType").val();
            var offerId = $(node).find(".inputOfferId").val();
            var itemCdName = $(node).find(".inputItemCdName").val();
            var itemCd = $(node).find(".inputItemCd").val();
            var statusCd = $(node).find(".inputStatusCd").val();

            var amount = $.trim($(node).find(".totalPrice").text());

            /**IPRAN产品需要增加一次性费用原价以及一次性费用折扣**/
            var discountOne = "";   //一次性费用折扣
            var amountOne = "";     //一次性费用金额
            if(offerId == '261' || offerId == '321' || offerId == '322' || offerId == '323'){
              discountOne = $(node).find(".onceChargeDiscount").val();
              let txt = $(node).find(".onceChargePriceAfterDiscount").text();
              amountOne = txt.substring(1,txt.length);
            }

            if(offerId == "301" || offerId == "244" || offerId == "245" || offerId == "247" ){
              successMsg = "订单已成功提交!"
            }else if (offerId == "321" || offerId == "322" || offerId == "323" || offerId == "324" || offerId == "325" || offerId == "326"){
              successMsg = "订单已成功提交!"
            }else{
              successMsg = "单子已到云计算中心，待补录信息结束后收费!";
            }
            param.inputItemCdName = itemCdName;
            param.code = offerId;
            param.cartId = cartId;
            param.itemId = orderItemId;
            param.applyObjId = applyObjId;
            param.applyObjSpec = applyObjSpec;
            param.discount = discount;
            param.billType = billType;
            param.catalogId = catalogId;
            param.statusCd = statusCd;
            param.itemCd = itemCd;
            param.amount = amount;
            param.offerId = offerId;
            param.discountOne = discountOne;
            param.amountOne = amountOne;
            if(_this.parentOrderTransInstance.duration != null && _this.parentOrderTransInstance.duration != ''){
              param.duration = _this.parentOrderTransInstance.duration;
            }

            if(_this.parentOrderTransInstance.payType != null && _this.parentOrderTransInstance.payType != ''){
              param.payType = _this.parentOrderTransInstance.payType;
            }

            /**如果是云主机的话,statusCd送16**/
            var offerId = $(node).find(".inputOfferId").val();
            if(offerId == '301'){
              param.statusCd = '16';
            }
          }
        });
        /**报错信息**/
        var msg = "";
        /**判断购物车能否提交**/
          axios({
            method:'post',
            url:'/netCloudOrder/shoppingCartService/checkShoppingCart',
            data:{
              cartItemId:param.itemId,
              catalogId:param.catalogId,
            },
          }).then(res=>{
            /**如果可以提交**/
            if(res.data.code == "0"){
              /**如果是云宽通,需要校验实名制**/
              if(param.offerId == '324' || param.offerId == '325' || param.offerId == '326'){
                var currentNode = $("input[type='hidden'][value=" + param.itemId + "]").parents(".main-top").parent().find(".main-one");

                let idType = $(currentNode).find(".idTypeClass").find("option:selected").text();
                let idNumber = $(currentNode).find(".idNumberClass").val();
                let user = window.sessionStorage.getItem('user');
                let sysUserName = JSON.parse(user).sysUserName;
                let loginUserId = JSON.parse(user).staffId;

                axios({
                  method:'post',
                  url:'/netCloudBusiness/certification/idCardCert',
                  data:{
                    staffId:loginUserId,
                    name:sysUserName,
                    idNumber:idNumber,
                    idType:idType
                  }
                }).then(res=>{
                  if(res.data.code == '1'){
                            axios({
                                    method:'post',
                                    url:'/netCloudOrder/orderService/submitOrderFrom',
                                    data:param,
                                  }).then(function (response) {
                                    /**提交成功,刷新页面**/
                                    if(response.data.code == "0"){
                                      _this.$alert(successMsg, '提示', {
                                        confirmButtonText: '确定',
                                        callback: action => {
                                          window.location.reload();
                                        }
                                      });
                                    }
                                  })
                  }else{
                    _this.$alert('实名认证未通过,请到销售助手进行实名认证后重新提交!','提示',{
                      confirmButtonText: '确定',
                      callback: action => {
                      }
                    })
                  }
                })
              }else{
                axios({
                  method:'post',
                  url:'/netCloudOrder/orderService/submitOrderFrom',
                  data:param,
                }).then(function (response) {
                  /**提交成功,刷新页面**/
                  if(response.data.code == "0"){
                    _this.$alert(successMsg, '提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                        window.location.reload();
                      }
                    });
                  }
                })
              }
            }else{
              msg = res.data.msg;
              _this.$alert(msg,'提示',{
                confirmButtonText: '确定',
                callback: action => {
                }
              })
            }
          })
      },

      calculateSumPrice:function () {
          var _this = this;
          var sumPrice = parseFloat("0");
          $("li.item-li").each(function () {
              var node = this;
              /**如果该checkbox被选中**/
              if($(node).find(".main-top").find("input[type='checkbox']").prop("checked")){
                  /**获取总价格**/
                  var price = $(node).find(".totalPrice").text();
                  sumPrice = sumPrice + parseFloat(price);
              }
          })
        _this.sumPrice = parseFloat(sumPrice).toFixed(2);
      },

      /**删除购物车**/
      deleteCart:function (index,cartItemId) {
        var _this = this;
        var el = event.currentTarget;
        _this.$confirm('是否删除对应的购物车','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
            method:'post',
            url:'/netCloudOrder/shoppingCartService/deleteShopCartItem',
            data:{
              cartItemId:cartItemId,
            },
          }).then(res =>{
            /**删除成功**/
            if(res.data.code == "0"){
              this.$alert('删除成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              });
              _this.prodDataList.splice(index,1);
              _this.$set(_this.prodDataList,_this.prodDataList);

              /**重新计算费用**/
              _this.calculateSumPrice();
            }
          })
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .index{
    width: 100%;
    heigth:100%;
    .nav{
      background: linear-gradient(left, #6e21aa ,#666ebe, #628ac7); /* 标准的语法 */
      background: -o-linear-gradient(left, #6e21aa ,#666ebe, #628ac7); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(left, #6e21aa ,#666ebe, #628ac7); /* Firefox 3.6 - 15 */
      background: -webkit-linear-gradient(left, #6e21aa ,#666ebe, #628ac7);
    }
  }
  .topic{
    width:1200px;
    height:145px;
    margin:0 auto;

    .topic-top{
      width:1200px;
      height:67px;
      border-bottom: solid 1px #929292;

      .topic-top-cart{
        width:600px;
        height:40px;
        font-size: 18px;
        float:left;
        margin-top:25px;

        span:first-child{
          max-width:500px;
          height:40px;
          display: block;
          float:left;
          overflow:hidden;
          text-overflow:ellipsis;
        }
        span:nth-child(2){
          width:100px;
          height:40px;
          display: block;
          float:left;
        }
      }

      .topic-top-asset{
        width:90px;
        height:28px;
        margin-top:20px;
        border:solid 1px #dddddd;
        border-radius:3px;
        cursor:pointer;
        float:right;
        text-align: center;
        line-height:26px;
        margin-left:25px;
      }

      .topic-top-switch-customer{
        width:90px;
        height:28px;
        margin-top:20px;
        border:solid 1px #dddddd;
        border-radius:3px;
        cursor:pointer;
        float:right;
        text-align: center;
        line-height:26px;
        margin-left:25px;
      }

      .topic-top-add-production{
        width:90px;
        height:28px;
        margin-top:20px;
        border-radius:3px;
        cursor:pointer;
        background-color:#00cc33;
        float:right;
        text-align: center;
        line-height: 26px;
        color:white;
      }
    }

    .topic-bottom{
      .topic-bottom-title{
        height:78px;
        font-size:15px;
        line-height:78px;
        text-align: center;
        float:left;
      }
    }
  }

  .main{
    width:100%;
    padding-bottom:50px;
    .item-li {
      width: 1202px;
      margin: 0 auto;
      border: 1px solid #e8e8e8;
      border-radius: 5px;
    }
  }

  .main-two{
    width:100%;
    margin-top:50px;
    position: fixed;
    bottom: 0px;
    background-color: #e5e5e5;
    z-index: 10000;
  }

  .main-two-center{
    width:1200px;
    margin:0 auto;
    .add-to-cart{
      width:130px;
      height:70px;
      float: right;
      text-align: center;
      line-height: 70px;
      background-color: #ff8200;
      font-size: 25px;
      color:#fff;
      cursor: pointer;
    }
    .final-price{
      width:650px;
      height:50px;
      margin-top: 20px;
      margin-right:10px;
      float:right;
      text-align: right;
      p{
        line-height: 35px;
      }
      .orange{
        font-weight: bold;
        font-size: 26px;
        color:#ff8200;
      }
      .light-word{
        font-size: 12px;
        color:#999;
      }
    }
  }
</style>
