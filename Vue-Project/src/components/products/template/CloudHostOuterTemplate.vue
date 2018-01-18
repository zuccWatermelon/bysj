<!--云主机外层模板-->
<template>
  <div>
    <div class="top-tip"><span class="top-tip-name"></span><span class="top-tip-num">预订单编号：{{prodList.cartItemId}}</span></div>

    <div class="main-top">
      <div style="float:left;width:20%;height:100%;position:relative;">
        <img  v-if="prodList.itemCd == '6'" style="position:absolute;left:20px;top:0;width:40px;" src="../../../assets/img/myShoppingCart/productTransfer.png">
        <img  v-if="prodList.itemCd == '3'" style="position:absolute;left:20px;top:0;width:40px;" src="../../../assets/img/myShoppingCart/productChange.png">
        <img  v-if="prodList.itemCd == '5'" style="position:absolute;left:20px;top:0;width:40px;" src="../../../assets/img/myShoppingCart/productSubscription.png">
        <img  v-if="prodList.itemCd == '1'" style="position:absolute;left:20px;top:0;width:40px;" src="../../../assets/img/myShoppingCart/productNew.png">
        <img  v-if="prodList.itemCd == '2'" style="position:absolute;left:20px;top:0;width:40px;" src="../../../assets/img/myShoppingCart/productTrial.png">

        <input type="checkbox" style="width:20px;height:20px;margin-top:50px;margin-left:30px;" @change="triggleSumPriceChange(prodList)"/>
        <input type="hidden"   :value=prodList.applyObjId  class="inputApplyObjId"/>
        <input type="hidden"   :value=prodList.cartItemId  class="inputCartItemId"/>
        <input type="hidden"   :value=prodList.catalogId   class="inputCatalogId"/>
        <input type="hidden"   :value=prodList.offerId     class="inputOfferId"/>
        <input type="hidden"   :value=prodList.cartId      class="inputCartId"/>
        <input type="hidden"   :value=prodList.itemCd      class="inputItemCd"/>
        <input type="hidden"   :value=prodList.itemCdName   class="inputItemCdName"/>
        <input type="hidden"   :value=prodList.statusCd    class="inputStatusCd"/>

        <span style="position:absolute;top:45px;left:70px;"><i class="hwsicon-service-ecm font-icon product-icon"  style="cursor:pointer;" ></i>{{prodList.offerName}}</span>
        <div style="font-size:13px;margin-left:110px;color:#6ca7eb;cursor:pointer;" @click="showDetailPanel()">配置详情</div>
      </div>

      <div style="float:left;width:8%;height:100%;">
        <div style="margin-top:50px;font-size:15px;margin-left:20px;">使用费</div>
      </div>

      <div style="float:left;width:12%;">

        <input type="text"
                class="discount form-control configChargeDiscount"
                style="width:80px;margin-top:40px;margin-left:30px;"
                :disabled="prodList.statusCd == '2' || prodList.statusCd == '3'"
                v-model="discount"
                @change="discountChange($event)"/>
        <div style="font-size: .8em;margin-left:30px;margin-top:3px;">请输入0到1之间的数(1代表无折扣)</div>
      </div>

      <div style="float:left;width:15%;height:100%;color:#ff8200;">
        <div style="margin-left:70px;margin-top:50px;width:15px;float:left">￥</div>
        <div class="singlePrice" style="color:#ff8200;margin-left:65px;margin-top:50px;">
          {{price_and_num.price !== ''? price_and_num.price : ''}}
        </div>
      </div>

      <div style="float:left;width:10%;height:100%;color:#ff8200;">
        <div style="margin-left:25px;margin-top:50px;width:15px;float:left">￥</div>
        <div class="totalPrice" style="color:#ff8200;margin-top:50px;" >
          {{isNaN((parseInt(price_and_num.price) * parseInt(price_and_num.num) * parseFloat(discount)).toFixed(2)) ? '' : (parseInt(price_and_num.price) * parseInt(price_and_num.num) * parseFloat(discount)).toFixed(2)}}
        </div>
        <input type="hidden" :value="(parseInt(price_and_num.price) * parseInt(price_and_num.num)).toFixed(0)" class="rowPrice"/>
      </div>

      <div style="float:left;width:8%;height:100%;">
        <div style=" width:100%;height: 34px;margin-top:45px;">
          <div class=".applyObjSpec" style="float:left;width:100%;height:30px;line-height:30px;text-align: center;">{{prodList.statusCdName}}</div>
        </div>
      </div>

      <div style="float:left;width:12%;height:100%;">
        <select style="margin:40px auto 0px auto;width:110px;" class="billType form-control"
                :disabled="prodList.statusCd == '2' || prodList.statusCd == '3'"
                v-model="billType">
          <option value="前台收费">前台收费</option>
          <option value="计费收费">计费收费</option>
        </select>
      </div>

      <div style="float:left;width:13%;height:100%;text-align: center;">
        <div  style="margin-left:15px;margin-top:30px;color:#318de7;cursor: pointer;"
              :class="{'div-disabled':(prodList.itemCd == '2')||(prodList.itemCd == '1' && prodList.statusCd != '11')||(prodList.itemCd == '6' && prodList.statusCd != '13')}"
              @click="(prodList.itemCd == '2')||(prodList.itemCd == '1' && prodList.statusCd != '11')||(prodList.itemCd == '6' && prodList.statusCd != '13') ? '':getApprove(prodList)">折扣审批</div>
        <div  style="float:left;width:50px;margin-left:60px;margin-top:10px;color:#318de7;cursor:pointer;"
              @click="deleteCart()">删&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除</div>
      </div>
    </div>

    <!--购物车审批-->
    <CloudHostExamine v-if="isExamine"
                        :isExamine.sync="isExamine"
                        :message="dataToExamine(prodList)">
    </CloudHostExamine>

    <div class="main-one" :style="{'display':!isShow? 'none':'block'}">
        <!--新装-->
        <CloudHostTemplate v-if="(prodList.itemCdName == '新装') || (prodList.itemCdName == '试用')" :prodList.sync="prodList" :chanel.sync="chanel" :price_and_num.sync="price_and_num"></CloudHostTemplate>
        <!--试转商以及续订-->
        <Ttcu v-if="(prodList.itemCdName == '转商') || (prodList.itemCdName == '续订')"  :price_and_num.sync="price_and_num" :prodList.sync="prodList"  :chanel.sync="chanel" :orderTransInstance.sync="orderTransInstance" :index.sync="index"></Ttcu>
        <!--变更-->
        <Change v-if="prodList.itemCdName == '变更'" :prodList.sync="prodList"></Change>
    </div>
  </div>
</template>

<script>
  import '../../../assets/css/combined-business.min.css';
  import CloudHostTemplate from '../../../components/products/template/CloudHostTemplate.vue';
  import CloudHostExamine  from '../../../components/products/template/CloudHostExamine.vue';
  import Change            from '../../../components/products/host/Change.vue';
  import Ttcu              from '../../../components/products/host/Ttcu.vue';
  import common            from '../../../global/common.js';

  export default{
    props:['prodList','chanel','parentOrderTransInstance','index','parentIndex'],
    data(){
      return{
        billType:'前台收费',
        isShow:false,
        isExamine:false,
        dataList:{},
        price_and_num:{
          price:'',
          num:'',
        },
        discount:'0.95',
        orderTransInstance:{},
      }
    },
    components:{
      CloudHostTemplate,
      CloudHostExamine,
      Change,
      Ttcu,
      common,
    },

    mounted(){
        var _this = this;
        var prodConfList = _this.prodList.prodConfList;

        /**折扣初始化**/
        if(_this.prodList.prodConfList.discount == '0'){
          _this.discount = _this.prodList.prodConfList.discount;
        }else if(_this.prodList.prodConfList.discount != null && _this.prodList.prodConfList.discount != ''){
          _this.discount = _this.prodList.prodConfList.discount / 100;
        }

      /**收费方式初始化**/
      if(_this.prodList.billType != null && _this.prodList.billType != ''){
        _this.billType = _this.prodList.billType;
      }

    },
    methods:{

      /**修改折扣**/
     discountChange:function (event) {
        var _this = this;
        var el = event.currentTarget;

        var discount = $(el).val();

        /**校验输入的值(0到1之间),如果校验不通过,则直接将其置为默认值0.95**/
        let reg = /^[0-1]$|^0\.[0-9]+$/;
        if(!reg.test(discount)){
          _this.discount = '0.95';
        }
        discount = _this.discount;

        /**修改总价格**/
        var node = $("input[type='hidden'][value=" + _this.prodList.cartItemId + "]").parents(".main-top");
        var totalPrice = (parseInt(_this.price_and_num.price) * parseInt(_this.price_and_num.num) * parseFloat(discount)).toFixed(2);
        $(node).find(".totalPrice").text(totalPrice);
        _this.$emit("partPrice", _this.prodList);
     },

      getOrderStatus:function (statusCd) {
          return common.getOrderStatus(statusCd);
      },

      /**拼装审核数据**/
      dataToExamine:function (prodList) {
          var _this = this;
          var datas = {};

          /**预订单编号**/
          datas.cartItemId = prodList.cartItemId;
          datas.catalogId = prodList.catalogId;
          datas.curExamineId = prodList.cartItemId;
          /**客户姓名**/
          var cust = window.sessionStorage.getItem('cust');
          var user = window.sessionStorage.getItem('user');
          var custName = JSON.parse(cust).custName;
          var sysUserName = JSON.parse(user).sysUserName;
          datas.custName = custName;
          datas.sysUserName = sysUserName;

          /**商品名称**/
          datas.offerName = prodList.offerName;
          datas.offerId = prodList.offerId;
          /**使用费用**/
          datas.amount = parseInt(_this.price_and_num.price) * parseInt(_this.price_and_num.num);

          /**折扣**/
          /**找到自己对应的节点**/
          var node = $("input[type='hidden'][value=" + _this.prodList.cartItemId + "]").parents(".main-top");
          var discount = $(node).find(".discount").val();
          datas.discount = discount;

          /**付费方式**/
          datas.billType = _this.billType;
          return datas;
      },

      /**折扣审批弹框**/
      getApprove:function (prodList) {
        var _this = this;
        _this.isExamine = true;
      },

      /**展示详情面板**/
      showDetailPanel:function () {
        var _this = this;
        _this.isShow = !(_this.isShow);
      },

      /**删除购物车**/
      deleteCart:function () {
        var _this = this;
        _this.$emit('deleteCart',_this.index,_this.prodList.cartItemId);
      },

      /**触发总价格变化事件**/
      triggleSumPriceChange:function (prodList) {
        var _this = this;
        _this.$emit("partPrice",_this.prodList);
      },
    },
    watch:{
      orderTransInstance:function(){
        var _this = this;
        _this.$emit('update:parentOrderTransInstance', _this.orderTransInstance);
        _this.$emit('update:parentIndex', _this.index);

      },
      price_and_num:function () {
        var _this = this;

        /**修改总价格**/
        /**找到父节点**/
        var node = $("input[type='hidden'][value=" + _this.prodList.cartItemId + "]").parents(".main-top");
        var discount = $(node).find(".discount").val();
        var totalPrice = (parseInt(_this.price_and_num.price) * parseInt(_this.price_and_num.num) * parseFloat(discount)).toFixed(2);
        $(node).find(".totalPrice").text(totalPrice);
        _this.$emit("partPrice", _this.prodList);
      }
    }
  }
</script>

<style scoped lang="less">

  @font-face {
    font-family:homeIcomoon;
    src:url('../../../assets/fonts/homeIcomoon.woff');
  }
  @font-face {
    font-family:comoon;
    src:url('../../../assets/fonts/ecm_icomoon.woff');
  }

  .product-icon{
    font-family: homeIcomoon;
  }

  .font-icon{
    vertical-align: middle;
    font-size: 30px;
    padding-right: 10px;
  }

  .div-disabled{
    color:gray !important;
    cursor: default !important;
  }

  .top-tip{
    width:100%;
    height:40px;
    line-height:40px;
    border-bottom:1px solid #e8e8e8;
    color:#999;
    .top-tip-name{
      float:left;
      margin-left:15px;
    }
    .top-tip-num{
      float:right;
      margin-right:15px;
    }
  }

  .main-top{
    width:1200px;
    height:115px;
    margin:0 auto;
  }

  .main-one{
    width:1200px;
    margin:0 auto;
  }

</style>
