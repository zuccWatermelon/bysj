<template>
  <div class="page">
    <MyNav :current="current" style="background: #ff8200;" :custData="custData"></MyNav>
    <div class="passBuy">
      <div class="passBox">
        <div class="passBuyContent clearfix">
          <div class="passBuyTop">
            <div class="passBuyProduct">
              <img src="../assets/img/passBuy.png"/>
            </div>
            <div class="passBuyPWord">
              <p style="margin-bottom: 38px">畅捷通产品</p>
              <p style="text-indent: 18px;font-size:14px;line-height: 28px">该产品是中国电信为政企客户量身打造的人、财、货、客一体化解决方案，并提供工作圈APP等互联网移动办公应用，满足企业经营过程中全面应用需求，提升企业竞争力。</p>
            </div>
          </div>

          <div class="passBuyLeft" >
            <div class="passT " v-for="(item,index) in prodData">
              <div class="passTContent " :class="{btmBorderSO:btmBorderSO===index+1}"  @click="passTContent1(index+1,item.catalogId)"  >
                {{item.catalogName}}
              </div>
            </div>
          </div>

          <div class="passBuyRight " >
            <div class="passBuyBox "  v-for="(item,index) in productlist" >
              <div class="passBuyB" :class="{marLeft:((index+1)%3 == 0)}">
                <div class="passBuyImg">
                  <img src="../assets/img/passBuy.png"/>
                </div>
                <div class="passBuyWord">
                  <p>{{item.offerInfo.offerName}}</p>
                  <span v-bind:title="item.offerInfo.offerDesc">{{item.offerInfo.offerDesc}}</span>
                  <input type="hidden" :value=item.offerInfo.offerId>
                  <div class="passBuyBtn" @click="addToShoppingCart(item.offerInfo.offerId,item.offerInfo.offerNbr)">
                    <img src="../assets/img/passBuyCart.png"/>
                    加入购物车
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">

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
    width:100%;
    height:146px;
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
    height:32px;
    outline: none;
    border: 1px solid #ff8200;
    line-height: 30px;
    color:#fff;
    background:#ff8200 ;
    text-align: center;
    border-radius: 4px;
    position: absolute;
    right:30px;
    bottom: 30px;
    text-indent: 20px;
    font-size: 14px;
  }
  .passBuyBtn:hover{
    cursor:pointer;
  }
  .passBuyBtn img{
    position: absolute;
    top:4px;
    left:2px;
    width:26px;
  }
</style>
<script>
  import MyNav from './common/MyNav.vue';
  import axios from 'axios';
  export default {
    props:['loginClick'],
    data(){
      return{
        custData:{},
        current:"index",
        catalogId:"",
        btmBorderSO:1,
        loginUserId:"",
        userId:"",
        prodId:'',
        prodFuncType:'',
        prodData:[],
        productlist:[],
        sysUserName:"",
      };
    },
    components: {
      MyNav,
    },
    methods: {
      passTContent1: function (num, catalogId) {
        var _this = this;
        _this.btmBorderSO = num;
        _this.catalogId = catalogId;
        axios({
          url:'/netCloudOffer/offerService/getofferinfobyoffercatalog',
          method: 'post',
          data: {
            id: catalogId,
            pageSize:'50'
          }
        }).then(response => {
          this.productlist = response.data.data;
        }).catch(err => {

        });
      },
      addToShoppingCart: function (prodId, prodFuncType) {

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

        var sysUserName = JSON.parse(user).sysUserName;
        var loginUserId = JSON.parse(user).staffId;
        var userId = JSON.parse(user).staffId;
        var certId = JSON.parse(cust).CUST_ID;
        var userType = JSON.parse(cust).custType;


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
            url: '/netCloudOrder/shoppingCartService/addToShoppingCart',
            method: 'post',
            data: {
              loginUserId: loginUserId,
              shoppingCart: {
                userId:   certId,
                userType: userType
              },
              shoppingCartItem: {
                applyObjId: prodId,
                applyObjSpec: '',
              },
              cartItemAttr: {
                attrId: 0,
                attrValue: 1,
              }
            }
          }).then(response => {
            if (response.data.code == "0") {
              this.$router.push({path: '/shoppingCartFrame'});
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
        }
      },

    //  商品信息数据加载
    created() {

      var _this = this;

      var cust = window.sessionStorage.getItem('cust');
      var user = window.sessionStorage.getItem('user');
      _this.custData = JSON.parse(cust);
        axios({
          url:'/netCloudOffer/offerCatalogService/offercataloglist',
          method: 'post',
          data:{
            catalogId:"",
            parCatalogId:""
          }
        }).then(response => {
          /**畅捷通在结果数组中的下标，默认为0**/
          let idx = '0';
          response.data.data.forEach((v,count)=>{
           if(v.catalogId == 61){
             idx = count;
            }
          })
          let dataList = (response.data.data)[idx];
          _this.prodData.push(dataList);
          //_this.prodData = response.data.data;
          _this.catalogId = this.prodData[0].catalogId
          _this.passTContent1(1,_this.catalogId);
        });
      },
  }
</script>
