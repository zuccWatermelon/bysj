<!--IPRAN线路详情-->
<template>
  <div class="index">
    <div class="top">
      <MyNav  :current="current"
              :custData="custData"
      ></MyNav>
      <IPRANIntro></IPRANIntro>
    </div>
    <div class="main">
      <div class="main-one">
        <span class="title-w1200">IPRAN线路配置信息</span>
        <div class="IPRAN-conf">
          <div class="item-li conf-l">
            <div class="conf-l-t l-t-first">1. 云专线 基本信息</div>
            <div class="conf-l-m conf-l-netCloudBasicInfo">
              <div class="conf-l-item">
                <span class="item-label">选择所属域：</span>
                <select class="item-in" :dataValue="123" @change="changeText($event)" v-model="productData['201']['123']">
                </select>
              </div>
            </div>
            <div class="conf-l-t">2. IPRAN线路设置</div>
            <div class="conf-l-m conf-l-IPRANSet">
              <div class="conf-l-item">
                <span class="item-label"><img src="../../../assets/img/icon_sulv.png"/>CE接入速率：</span>
                <select class="item-in" :dataValue="129" @change="changeText($event);getPrice();" v-model="productData['203']['129']">
                </select>
              </div>
              <div class="conf-l-item">
                <span class="item-label"><img src="../../../assets/img/icon_sulv.png"/>速率类型：</span>
                <select class="item-in" :dataValue="140" @change="changeText($event);getPrice()" v-model="productData['203']['140']">
                </select>
              </div>
              <div class="conf-l-item">
                <span class="item-label"><img src="../../../assets/img/icon_sulv.png"/>电路维护等级：</span>
                <select class="item-in" :dataValue="127" @change="changeText($event);getPrice()" v-model="productData['203']['127']">
                </select>
              </div>
              <div class="conf-l-item">
                <span class="item-label">Qos等级模式：</span>
                <select class="item-in" :dataValue="128" @change="changeText($event)" v-model="productData['203']['128']">
                </select>
              </div>
              <div class="IPRANSet-default">
                <span class="button-collapse"  @click="toggle()">默认属性 <img :class="{up:isShow}" src="../../../assets/img/arrow.png"/></span>
                <div class="div-collapse " v-show="isShow">
                  <div class="conf-l-item">
                    <span class="item-label">付费方式：</span>
                    <select class="item-in" :dataValue="135" @change="changeText($event)" v-model="productData['203']['135']">
                    </select>
                  </div>
                  <div class="conf-l-item">
                    <span class="item-label">电路类型：</span>
                    <select class="item-in" :dataValue="138" @change="changeText($event)" v-model="productData['203']['138']">
                    </select>
                  </div>
                  <div class="conf-l-item">
                    <span class="item-label">CE端提供方：</span>
                    <select class="item-in" :dataValue="136" @change="changeText($event)" v-model="productData['203']['136']">
                    </select>
                  </div>
                  <div class="conf-l-item">
                    <span class="item-label">起租/退租系数：</span>
                    <select class="item-in" :dataValue="137" @change="changeText($event)" v-model="productData['203']['137']">
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="conf-l-t">3. 装机相关信息</div>
            <div class="conf-l-m conf-l-setupInfo">
              <div class="conf-l-item">
                <span class="item-label">客户联系人：</span>
                <div class="item-in"><input type="text" v-model="productData['201']['124']"/></div>
              </div>
              <div class="conf-l-item">
                <span class="item-label">联系电话：</span>
                <div class="item-in"><input type="text" v-model="productData['201']['125']" @blur="checkPhone($event)" /></div>
              </div>
              <div class="conf-l-item">
                <span class="item-label">预约起租时间：</span>
                <el-date-picker
                  v-model="productData['201']['126']"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="选择日期"
                  :picker-options="pickerOptions1"
                >
                </el-date-picker>
              </div>
              <div class="conf-l-item setup-address">

                <addressSearch
                  :addressDataExchId.sync="productData['201']._item_p.exchId"
                  :addressDataBelongRegionId.sync="productData['201']._item_p.belongRegionId"
                  :addressDataAddressId.sync="productData['201']._item_p.addressId"
                  :addressDataAddressDesc.sync="productData['201']._item_p.addressDesc"
                ></addressSearch>
<!--
                <input class="item-in" type="text"/>
-->
              </div>
            </div>
          </div>
          <div class="conf-r">
            <span class="conf-box-t">配置详情</span>
            <div class="conf-box-cont">
              <div class="conf-box-cont-a">
                <div class="conf-box-t2">CE接入速率：</div>
                <div class="a-list">
                  <span><span :dataText="129"></span> - <span :dataText="140"></span> - <span :dataText="127"></span></span><span class="a-list-price">￥{{profPrice}}</span>
                </div>
              </div>
              <div class="conf-box-cont-b">
                <dl>
                  <dt>Qos等级模式：</dt>
                  <dd><span :dataText="128"></span></dd>
                </dl>
                <dl>
                  <dt>付费方式：</dt>
                  <dd><span :dataText="135"></span></dd>
                </dl>
                <dl>
                  <dt>电路类型：</dt>
                  <dd><span :dataText="138"></span></dd>
                </dl>
                <dl>
                  <dt>起租/退租系数：</dt>
                  <dd><span :dataText="137"></span></dd>
                </dl>
                <dl>
                  <dt>CE提供方：</dt>
                  <dd><span :dataText="136"></span></dd>
                </dl>
              </div>
            </div>
            <div class="conf-box-price">
              <div class="conf-box-t2">配置费用：</div>
              <span><small>￥</small>{{profPrice}}</span>
            </div>
            <div class="conf-box-ps">
              <a>IPRAN线路配置价格说明 >> </a>
            </div>
          </div>
        </div>
        <span class="title-w1200">一次性费用（初装费）</span>
        <div class="IPRAN-price-one">
          <span class="price-one-l"><img src="../../../assets/img/step.png"/> 一次性费用（初装费）：</span>
          <div class="price-one-r"><input type="text"  value="5200" readonly v-model="productData['222']"  @blur="checkNum($event)"/></div>
        </div>
      </div>
      <div class="main-two">
        <div class="main-two-center">
          <div class="add-to-cart" @click="addToShoppingCart('261','')"><span>加入购物车</span></div>
          <div class="final-price">
            <p>总价：<span class="orange"><small>￥</small>{{profPrice+parseFloat(productData['222'] | 0)}}</span></p>
            <p class="light-word"><span>{{profPrice}}</span>（配置费用）<span v-if="productData['222']">+ {{productData['222']}}（一次性费用）</span></p>
          </div>
        </div>
      </div>
    </div>


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
  .main-one{
    width:1200px;
    margin:0 auto;
  }
  .title-w1200{
    width:1200px;
    height:50px;
    padding-left:15px;
    margin-top: 20px;
    display: block;
    background-color: #5c6f8a;
    line-height: 50px;
    font-size: 18px;
    color:#fff;
  }
  .IPRAN-conf{
    width:1200px;
  }
  .IPRAN-conf:after{
    content: ' ';
    display: block;
    overflow: hidden;
    height: 0;
    font-size: 0;
    clear: both;
  }
    .conf-l{
      width:918px;
      padding-right:20px;
      float:left;
      .conf-l-t{
        width:100%;
        height:55px;
        border-top: 1px solid #e6e6e6;
        line-height: 55px;
        font-size: 16px;
        font-weight: bold;
        color:#333;
      }
      .l-t-first{
        border-top: 0px;
      }
      .conf-l-m{
        width:100%;
        margin-bottom: 5px;
      }
      .conf-l-item{
        width:33.3%;
        height:40px;
        margin-bottom: 10px;
        float:left;
        .item-label{
          display: block;
          width:50%;
          height:40px;
          float: left;
          line-height: 40px;
          text-align: right;
          img{
            margin:10px 5px 0 0;
          }
        }
        .item-in{
          width:45%;
          height:30px;
          margin:5px;
          float: left;
          position: relative;
          input{
            width:100%;
            height:30px;
          }
        }
        .el-date-editor{
          width:50%;
        }
      }
      .conf-l-m:after,.conf-l-item:after{
        content: ' ';
        display: block;
        overflow: hidden;
        height: 0;
        font-size: 0;
        clear: both;
      }
      .item-margin-right{
        margin-right:50px;
      }
      .setup-address{
        width:100%;
        .item-label{
          width:16.65%;
        }
        select.item-in{
          width:10%;
        }
        input.item-in{
          width:49%;
        }
      }
      .IPRANSet-default{
        width:100%;
        min-height:45px;
        margin-bottom: 10px;
        float: left;
        .button-collapse{
          display: block;
          width:100%;
          height:40px;
          border:1px solid #d5d5d5;
          cursor: pointer;
          line-height: 40px;
          text-align: left;
          padding-left:10px;
          background-color: #ededed;
          color:#666;
          img{
            width:20px;
            margin-top:10px;
            margin-right:10px;
            float:right;
          }
          img.up{
            transform:rotate(180deg);
            -webkit-transform:rotate(180deg);
            -moz-transform:rotate(180deg);
            -ms-transform:rotate(180deg);
            -o-transform:rotate(180deg);
          }
        }
        .div-collapse{
          margin-top:10px;
        }
      }
    }
    .conf-r{
      width:282px;
      margin-top:20px;
      float:left;
      background-color: #efefef;
      font-size: 14px;
      .conf-box-t{
        width:282px;
        height:40px;
        padding-left:15px;
        display: block;
        line-height:40px;
        background-color: #e5e5e5;
        font-size: 16px;
        color:#333;
      }
      .conf-box-t2{
        width:100%;
        height:25px;
        line-height: 25px;
        color:#666;
       }
      .conf-box-cont{
        width:282px;
        padding:0 15px;
      }
        .conf-box-cont-a{
          width:252px;
          padding:8px 0;
          .a-list{
            width:100%;
            span{
              margin:8px 15px 8px 0;
              line-height:25px;
              span{
                margin:0;
              }
            }
            .a-list-price{
               font-weight: bold;
            }
          }
        }
        .conf-box-cont-b{
          width:252px;
          padding:8px 0;
          border-top: 1px dashed #e5e5e5;
          dl{
            width:100%;
            margin:8px 0;
          }
          dl:after {
            content: ' ';
            display: block;
            overflow: hidden;
            height: 0;
            font-size: 0;
            clear: both;
          }
          dt{
            width:110px;
            margin-right:8px;
            float:left;
            font-weight:normal;
            text-align: right;
            color:#666;
          }
          dd{
            margin-left:120px;
          }
        }
      .conf-box-price{
        width:282px;
        padding:8px 15px;
        border-top: 1px dashed #e5e5e5;
        span{
          margin-left:25px;
          font-size: 24px;
          color:#ff8200;
        }
      }
      .conf-box-ps{
        width:282px;
        height:60px;
        padding:8px 15px;
        border-top: 1px solid #e5e5e5;
        line-height: 40px;
        text-align: center;
        a,a:link,a:visited{
          color:#999;
        }
      }
    }
    .IPRAN-price-one{
      width:100%;
      height:75px;
      .price-one-l{
        display: block;
        width:200px;
        height:75px;
        float: left;
        line-height: 75px;
        img{
          width:25px;
          margin-top:25px;
          margin-right:10px;
        }
      }
      .price-one-r{
        width: 165px;
        height: 30px;
        margin:22.5px 5px;
        float: left;
        position: relative;
        input{
          width:100%;
          height:30px;
          line-height: 30px;
          text-align: center;
        }
      }
    }
  /*以下为 加入购物车 行 */
  .main-two{
    width:100%;
    background-color: #e5e5e5;
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
      font-size: 16px;
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
        line-height: 12px;
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
  .main-two-center:after{
    content: ' ';
    display: block;
    overflow: hidden;
    height: 0;
    font-size: 0;
    clear: both;
  }
</style>
<script>
  import MyNav from '../../common/MyNav.vue';
  import IPRANIntro from './IPRANIntro.vue';
  import addressSearch from './addressSearch.vue';


  export default {
    data(){
      return{
        pickerOptions1:{
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        loginClick:false,
        current:"index",
        customer_search:"0",
        custData:{},
        custDataList:[],
        customerSelectBox:false,
        custChange:false,
        client:"",

        productData:{
          //云专线基本属性
          '201':{
            '123':'',
            '124':'',
            '125':'',
            '126':'',
            '_item_p':{
              'exchId':'',
              'belongRegionId':'',
              'addressId':'',
              'addressDesc':'',
              'amount':''
            }
          },
          //IPRAN线路类型基本属性
          '203':{
            '128':'',
            '129':'',
            '140':'',
            '135':'',
            '127':'',
            '138':'',
            '136':'',
            '137':'',
            '_item_p': {
              'amount': ''
            }
          },
          //一次性费用
          '222':'5200',
        },
        hasInputError:false,
        isShow:false,
        parProdId:'',
      };
    },
    computed:{
      //配置总价
      profPrice:function(){
        return parseFloat(this.productData['201']._item_p.amount) + parseFloat(this.productData['203']._item_p.amount) | 0;
      },
    },

    components:{
      MyNav,
      IPRANIntro,
      addressSearch,
    },

    mounted:function(){

      /**获取用户对应的session**/
      var user = window.sessionStorage.getItem('user');
      /**获取客户对应的session**/
      var cust = window.sessionStorage.getItem('cust');

      this.sysUserName=JSON.parse(user).sysUserName;
      this.custData = JSON.parse(cust);

        /**获取云产品的产品id**/
        var that = this;
        axios({
          method: 'post',
          url: "/netCloudOffer/productsService/productlistByParam",
          data: {
            "id": '261'
          },
        }).then(function (response) {
          var lst = response.data.data;

          for (var i = 0; i < lst.length; i++) {
           if(lst[i].productInfo.parProdId != null){
              that.parProdId = lst[i].productInfo.parProdId;
            }
            for (var j = 0; j < lst[i].offerProductObjectAttrList.length; j++) {
              var tmp = lst[i].offerProductObjectAttrList[j];
              /**遍历所有的li**/
              $(".item-li").each(function () {
                var node = this;
                /**遍历li里面的所有select**/
                $(node).find("select").each(function () {
                  var select_node = this;
                  if ($(select_node).attr("datavalue") == tmp.objectAttrInfo.attrId) {
                    let defaultSelectId;
                    for (var n = 0; n < tmp.objectAttrValueList.length; n++) {
                      $(select_node).append("<option value=" + tmp.objectAttrValueList[n].attrValueId + ">" + tmp.objectAttrValueList[n].remark + "</option>");
                      if(tmp.objectAttrValueList[n].remark == tmp.objectAttrInfo.defaultValue){
                        defaultSelectId = tmp.objectAttrValueList[n].attrValueId;
                      }
                    }
                    //设置默认配置

                    $(select_node).val(defaultSelectId);
                    that.productData[tmp.objectAttrInfo.objId][tmp.objectAttrInfo.attrId] = defaultSelectId;
                    $("span[dataText='"+tmp.objectAttrInfo.attrId+"']").html(tmp.objectAttrInfo.defaultValue);
                  }
                })
              });
            }
          }
          //初始默认配置时获取价格
          that.getPrice();
        }).catch(err => {
        })
    },

    methods:{
      //div折叠方法
      toggle:function(){
        this.isShow = !this.isShow;
      },

      changeText:function(event){
        var el = event.currentTarget;
        $("span[dataText='"+$(el).attr('dataValue')+"']").html($(el).find("option:selected").text());
      },

      //获取产品价格
      getPrice:function(){
        var that = this;
        var confList = {
          "offerInfo":{
            "offerId":'261',
            "offerObjectAttr":[]
          },
          "productInfoList": [// 产品信息集合
            {
              "productInfo": {// 产品信息
                "product": {// 产品信息
                  "prodId": 201,// 产品ID
                  "offerId":261,
                },
                "objectAttr": [
                  {
                    "objAttrId": 123,// 对象属性ID
                    "objAttVal": $("select[datavalue='123']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  }
                ]
              }
            },
            {
              "productInfo": {// 产品信息
                "product": {// 产品信息
                  "prodId": 203,// 产品ID
                  "offerId":261,
                },
                "objectAttr": [
                  {
                    "objAttrId": 128,// 对象属性ID
                    "objAttVal": $("select[datavalue='128']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  },
                  {
                    "objAttrId": 129,// 对象属性ID
                    "objAttVal": $("select[datavalue='129']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  },
                  {
                    "objAttrId": 140,// 对象属性ID
                    "objAttVal": $("select[datavalue='140']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  }
                  ,
                  {
                    "objAttrId": 135,// 对象属性ID
                    "objAttVal": $("select[datavalue='135']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  },
                  {
                    "objAttrId": 127,// 对象属性ID
                    "objAttVal": $("select[datavalue='127']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  },
                  {
                    "objAttrId": 138,// 对象属性ID
                    "objAttVal": $("select[datavalue='138']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  },
                  {
                    "objAttrId": 136,// 对象属性ID
                    "objAttVal": $("select[datavalue='136']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  },
                  {
                    "objAttrId": 137,// 对象属性ID
                    "objAttVal": $("select[datavalue='137']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  }
                ]
              }
            }
          ]
        };
        axios({
          method:'post',
          url:"/netCloudOffer/priceDefService/getObjAttrPrice",
          data:confList,
        }).then(function (response) {
          let lst = response.data.data;
          let code = response.data.code;
          if(code == '0'){
            that.productData['201']._item_p.amount = lst.productInfoList[0].price;
            that.productData['203']._item_p.amount = lst.productInfoList[1].price;
          }

        }).catch(err =>{
        })
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

        if(_this.hasInputError){
          this.$alert('存在输入格式错误，请先根据提示进行检查修改后再加入购物车','提示',{
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          })
        }else {
          //----得到配置详情存到productAttrList中-------------------------------------------------------------
          var product_List = [];
          for (let item in _this.productData) {
            let obj = _this.productData[item];
            //判断第二层的值是对象还是字符串
            if ((typeof obj == 'string') && obj.constructor == String) {
              //此处为筛选出一次性费用作用
              let pro_item = {
                productId: item,
                amount: obj,
                parProdId:_this.parProdId,
                serviceAttrList: []
              }
              product_List.push(pro_item);
            } else if ((typeof obj == 'object') && obj.constructor == Object) {
              let pro_item = {
                productId: item,
                serviceAttrList: [],
                parProdId:_this.parProdId,
              }
              for (let item_in in obj) {
                let obj_in = obj[item_in];
                //判断第三层的值的类型
                if (((typeof obj_in == 'string') && obj_in.constructor == String) || item_in == '126') {
                  //筛选出配置属性
                  let pro_item_in = {
                    attrId: item_in,
                    attrValue: obj[item_in]
                  }
                  pro_item.serviceAttrList.push(pro_item_in);
                } else if ((typeof obj_in == 'object') && obj_in.constructor == Object) {
                  //筛选出地址相关信息，和价格信息
                  for (let item_in_in in obj_in) {
                    pro_item[item_in_in] = obj_in[item_in_in];
                  }
                }
              }
              product_List.push(pro_item);
            }
          }

          for(let v in product_List){
              if(product_List[v].parProdId == product_List[v].productId){
                product_List[v].parProdId = "";
              }
          }

         //----IPRAN加入购物车并保存配置----------------------------------------------------------------
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
              },
              offerId: prodId,
              productAttrList: product_List
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

      /*********验证********************************************/
      //提示语和红边框提示
      callBackFunc:function(event,tip){
        var _this = this;
        let el = event.currentTarget;
        if($(el).parent().find('.has-tip').length > 0){
          $(el).parent().find('.has-tip').html(tip);
        }else{
          let tip_html = "<div class='has-tip' style='position:absolute;left:0;top:30px;font-size: 12px;color:red;'>"+tip+"</div>";
          $(el).parent().append(tip_html);
        }
        if(tip){
          $(el).addClass('red-border');
          _this.hasInputError = true;
        }else{
          $(el).removeClass('red-border');
          _this.hasInputError = false;
        }
      },
      checkPhone:function(event){
        let el = event.currentTarget;
        let value = $(el).val();
        if (!value) {
          this.callBackFunc(event,'联系电话不能为空');
        }else{
          let re1 = /^1\d{10}$/;
          let re2 = /^0\d{2,3}-?\d{7,8}$/;
          if (!re1.test(value) && !re2.test(value)) {
            this.callBackFunc(event,'电话格式有误');
          } else {
            this.callBackFunc(event,'');
          }
        }
      },
      checkNum:function(event){
        let el = event.currentTarget;
        let value = $(el).val();
        if (!value) {
          this.callBackFunc(event,'不能为空');
        }else{
          let re1 = /^\d+(\.{0,1}\d+){0,1}$/ ;
          if (!re1.test(value)) {
            this.callBackFunc(event,'只能为数字');
          } else {
            this.callBackFunc(event,'');
          }
        }
      },
      /*******验证结束***************************************/
    }
  }
</script>
