<!--云网通外层模板-->
<template>
  <div>
    <div class="top-tip"><span class="top-tip-name"></span><span class="top-tip-num">预订单编号：{{prodList.cartItemId}}</span></div>

    <div class="main-top">
      <div style="float:left;width:20%;height:100%;position:relative;">

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
        <div style="margin-top:40px;font-size: 13px;margin-left:30px;">使用费</div>
        <div style="margin-top:20px;font-size: 13px;margin-left:30px;">一次性费用</div>
      </div>

      <div style="float:left;width:12%;">
        <div>
          <input type="text"
                 class="discount form-control configChargeDiscount"
                 style="width:80px;margin-top:30px;margin-left:30px;height:28px;"
                 :disabled="prodList.statusCd == '2' || prodList.statusCd == '3'"
                 v-model="discount"
                 @change="discountChange($event)"/>
        </div>

        <div>
          <input type="text"
                 class="discount form-control onceChargeDiscount"
                 style="width:80px;margin-top:15px;margin-left:30px;height:28px;"
                 :disabled="prodList.statusCd == '2' || prodList.statusCd == '3'"
                 v-model="onceChargeDiscount"
                 @change="onceChargeDiscountChange($event)"/>
        </div>

      </div>

      <div style="float:left;width:15%;height:100%;color:#ff8200;">
        <del>
          <div style="margin-left:70px;margin-top:30px;width:15px;float:left;font-size: 12px;">￥</div>
          <div class="singlePrice" style="color:#ff8200;margin-left:65px;margin-top:30px;font-size: 12px;">
            {{price_and_num.price !== ''? price_and_num.price : ''}}
          </div>
        </del>

        <div style="margin-left:70px;width:15px;float:left;font-size:12px;">￥</div>
        <div class="singlePrice" style="color:#ff8200;margin-left:65px;font-size: 12px;">
          {{price_and_num.price !== ''? parseFloat(price_and_num.price * discount).toFixed(2) : ''}}
        </div>

        <del>
          <div style="margin-left:70px;margin-top:10px;width:15px;float:left;font-size:12px;">￥</div>
          <div class="singlePrice" style="color:#ff8200;margin-left:65px;margin-top:10px;font-size:12px;">
            {{onceChargePrice !== ''? onceChargePrice : ''}}
          </div>
        </del>
        <div style="margin-left:70px;width:15px;float:left;font-size:12px;">￥</div>
        <div class="singlePrice" style="color:#ff8200;margin-left:65px;font-size:12px;">
          {{onceChargePrice !== ''? parseFloat(onceChargePrice * onceChargeDiscount).toFixed(2) : ''}}
        </div>
      </div>

      <div style="float:left;width:10%;height:100%;color:#ff8200;">
        <div style="margin-left:25px;margin-top:60px;width:15px;float:left">￥</div>
        <div class="totalPrice" style="color:#ff8200;margin-top:60px;" >
          {{getSumPrice}}
        </div>
      </div>

      <div style="float:left;width:8%;height:100%;">
        <div style=" width:100%;height: 34px;margin-top:55px;">
          <div class=".applyObjSpec" style="float:left;width:100%;height:30px;line-height:30px;text-align: center;">{{prodList.statusCdName}}</div>
        </div>
      </div>

      <div style="float:left;width:12%;height:100%;">
        <select style="margin:50px auto 0px auto;width:110px;"
                :disabled="prodList.statusCd == '2' || prodList.statusCd == '3'"
                class="billType form-control" v-model="billType">
          <option value="前台收费">前台收费</option>
          <option value="计费收费">计费收费</option>
        </select>
      </div>

      <div style="float:left;width:13%;height:100%;text-align: center;">
        <div   style="margin-left:15px;margin-top:30px;color:#318de7;cursor: pointer;"
               :class="{'div-disabled':prodList.statusCd == '2' || prodList.statusCd == '3' }"
               @click="prodList.statusCd == '2' || prodList.statusCd == '3'? '':getApprove(prodList)">折扣审批</div>
        <div  style="float:left;width:50px;margin-left:60px;margin-top:10px;color:#318de7;cursor:pointer;" @click="deleteCart()">删&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除</div>
      </div>
    </div>

    <!--购物车审批-->
    <CloudNetExamine v-if="isExamine"
                      :isExamine.sync="isExamine"
                      :message="dataToExamine(prodList)">
    </CloudNetExamine>

    <div class="main-one" :style="{'display':!isShow? 'none':'block'}">
       <CloudNetMiddleTemplate :price_and_num.sync="price_and_num" :prodList.sync="prodList"  :chanel.sync="chanel" :orderTransInstance.sync="orderTransInstance" :index.sync="index" :discount="discount"></CloudNetMiddleTemplate>
    </div>
  </div>
</template>

<script>
  import '../../../assets/css/combined-business.min.css';
  import CloudNetMiddleTemplate from '../../../components/views/CloudNet/CloudNetMiddleTemplate.vue';
  import CloudNetExamine   from '../../../components/views/CloudNet/CloudNetExamine.vue';
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
          /**使用费**/
          price:'',
          num:'',
        },
        /**一次性费用**/
        onceChargePrice:'5200',
        discount:'0.95',
        onceChargeDiscount:'0.95',
        orderTransInstance:{},
        /**折后费用**/
        configPriceAfterDiscount:'',
      }
    },
    computed:{
        getSumPrice:function () {
          var _this = this;
          let tmp1 = parseFloat(_this.price_and_num.price * _this.price_and_num.num * _this.discount).toFixed(2);
          let tmp2 = parseFloat(_this.onceChargePrice * _this.onceChargeDiscount).toFixed(2)
          return (parseFloat(tmp1) + parseFloat(tmp2)).toFixed(2);
        }
    },
    components:{
      CloudNetMiddleTemplate,
      CloudNetExamine,
      common,
    },

    mounted(){
      var _this = this;

      /**折扣初始化**/
      if(_this.prodList.prodConfList.discount != null && _this.prodList.prodConfList.discount != ''){
          _this.discount = _this.prodList.prodConfList.discount / 100;
      }
      /**一次性费用折扣初始化**/
      if(_this.prodList.prodConfList && _this.prodList.prodConfList.productAttrList){
        for(var tmp of _this.prodList.prodConfList.productAttrList){
            if(tmp.productId == '222'){
              _this.onceChargeDiscount = tmp.discount/100;
            }
        }
      }

      /**收费方式初始化**/
      if(_this.prodList.billType != null && _this.prodList.billType != ''){
        _this.billType = _this.prodList.billType;
      }
    },
    methods:{
      /**获取价格**/
      getPrice:function (data) {
          let _this = this;

          /**默认配置信息**/
          let confList = data.confList;

          /**订单配置信息**/
          let prodConfList = data.prodConfList;
      },

      /**价格初始化**/
      initializationPrice:function (data) {
        let _this = this;


      },
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

        /**校验使用费折扣,云网通标准版和云网通精英版最低折扣为0.2，云网通尊享版最低折扣为0.25**/
        if(_this.prodList.offerId == '321' || _this.prodList.offerId == '322'){
            if(_this.discount < 0.2){
              _this.$alert('标准版或精英版使用费最低折扣不能小于0.2','提示',{
                confirmButtonText: '确定',
                callback: action => {
                  _this.discount = '0.2';
                  /**修改总价格**/
                  _this.modifyTotalPrice();
                }
              });
            }else{
              /**修改总价格**/
              _this.modifyTotalPrice();
            }
        }else{
          if(_this.discount < 0.25){
            _this.$alert('尊享版使用费最低折扣不能小于0.25','提示',{
              confirmButtonText: '确定',
              callback: action => {
                _this.discount = '0.25';
                /**修改总价格**/
                _this.modifyTotalPrice();
              }
            });
          }else{
            /**修改总价格**/
            _this.modifyTotalPrice();
          }
        }
      },

      /**修改总价格**/
      modifyTotalPrice:function () {
        let _this = this;
        var node = $("input[type='hidden'][value=" + _this.prodList.cartItemId + "]").parents(".main-top");
        let tmp1 = parseFloat(_this.price_and_num.price * _this.price_and_num.num * _this.discount).toFixed(2);
        let tmp2 = parseFloat(_this.onceChargePrice * _this.onceChargeDiscount).toFixed(2)

        var totalPrice = (parseFloat(tmp1) + parseFloat(tmp2)).toFixed(2);
        $(node).find(".totalPrice").text(totalPrice);
        _this.$emit("partPrice", _this.prodList);
      },

      /**一次性费用折扣变化**/
      onceChargeDiscountChange:function (event) {
        var _this = this;
        var el = event.currentTarget;

        var onceChargeDiscount = $(el).val();
        /**校验输入的值(0到1之间),如果校验不通过,则直接将其置为默认值0.95**/
        let reg = /^[0-1]$|^0\.[0-9]+$/;
        if(!reg.test(onceChargeDiscount)){
          _this.onceChargeDiscount = '0.95';
        }
        onceChargeDiscount = _this.onceChargeDiscount;

        /**修改总价格**/
        var node = $("input[type='hidden'][value=" + _this.prodList.cartItemId + "]").parents(".main-top");

        let tmp1 = parseFloat(_this.price_and_num.price * _this.price_and_num.num * _this.discount).toFixed(2);
        let tmp2 = parseFloat(_this.onceChargePrice * _this.onceChargeDiscount).toFixed(2)
        var totalPrice = (parseFloat(tmp1) + parseFloat(tmp2)).toFixed(2);
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
        datas.offerId = prodList.offerId;
        /**客户姓名**/
        var cust = window.sessionStorage.getItem('cust');
        var user = window.sessionStorage.getItem('user');
        var custName = JSON.parse(cust).custName;
        var sysUserName = JSON.parse(user).sysUserName;
        datas.custName = custName;
        datas.sysUserName = sysUserName;

        /**商品名称**/
        datas.offerName = prodList.offerName;

        /**使用费用**/
        datas.amount = parseInt(_this.price_and_num.price) * parseInt(_this.price_and_num.num);

        /**折扣**/
        /**找到自己对应的节点**/
        var node = $("input[type='hidden'][value=" + _this.prodList.cartItemId + "]").parents(".main-top");
        var discount = $(node).find(".discount").val();
        datas.discount = discount;

        /**收费方式**/
        datas.billType = _this.billType;

        /**一次性费用**/
        datas.onceChargePrice = 5200;
        datas.onceChargeDiscount = _this.onceChargeDiscount;
        datas.onceChargePriceAfterDiscount = parseFloat(datas.onceChargePrice * _this.onceChargeDiscount).toFixed(2);

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
      triggleSumPriceChange:function () {
        var _this = this;
        _this.$emit("partPrice",_this.prodList);
      },

      /**手动输入减免费用**/
      inputOnceChargePrice:function (event) {
        var _this = this;
        var el = event.currentTarget;

        var onceChargePriceAfterDiscount = $(el).val();

        if(onceChargePriceAfterDiscount == null || onceChargePriceAfterDiscount == ''){
          _this.onceChargePriceAfterDiscount = '0';
        }else if(isNaN(onceChargePriceAfterDiscount)){
          _this.$alert('减免金额必须为数字!','提示',{
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          });
          $(el).val("0");
          _this.onceChargePriceAfterDiscount = '0';
          return false;
        }else if(onceChargePriceAfterDiscount > 5200){
          _this.$alert('减免金额不能大于5200!','提示',{
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          });
          $(el).val("0");
          _this.onceChargePriceAfterDiscount = '0';
          return false;
        }else{
          _this.onceChargePriceAfterDiscount = 5200 - onceChargePriceAfterDiscount;
        }

        /**找到自己对应的节点**/
        var node = $("input[type='hidden'][value=" + _this.prodList.cartItemId + "]").parents(".main-top");
        $(node).find(".totalPrice").text(_this.totalPrice);
        _this.$emit("partPrice", _this.prodList);
      },

      /**配置费用折扣变化**/
      configPriceChange:function (event) {
        var _this = this;
        var el = event.currentTarget;
        var discount = $(el).val();
        _this.configPriceAfterDiscount = parseFloat(discount * _this.price_and_num.price).toFixed(2);

        /**找到自己对应的节点**/
        var node = $("input[type='hidden'][value=" + _this.prodList.cartItemId + "]").parents(".main-top");
        $(node).find(".totalPrice").text(_this.totalPrice);
        _this.$emit("partPrice",_this.prodList);
      },

      /**一次性费用修改**/
      onceChargeChange:function (event) {
        var _this = this;
        var el = event.currentTarget;

        /**对应的父元素标签**/
        var tag = $("input[type='hidden'][value=" + _this.prodList.cartItemId + "]").parents(".main-top").parent().find(".main-one");
        /**单选框**/
        var selectNode = $("input[type='hidden'][value=" + _this.prodList.cartItemId + "]");
        let value = $(el).val();

        if(!value){
          _this.callBackFunc(event,'不能为空');
        }else{
          let re1 = /^\d+(\.{0,1}\d+){0,1}$/ ;
          if (!re1.test(value)) {
            _this.callBackFunc(event,'只能为数字');
          }else{

            /**找到自己对应的节点**/
            var node = $("input[type='hidden'][value=" + _this.prodList.cartItemId + "]").parents(".main-top");
            $(node).find(".totalPrice").text(_this.totalPrice);
            _this.$emit("partPrice", _this.prodList);
          }
        }
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
        let tmp1 = parseFloat(_this.price_and_num.price * _this.price_and_num.num * _this.discount).toFixed(2);
        let tmp2 = parseFloat(_this.onceChargePrice * _this.onceChargeDiscount).toFixed(2)
        /*
               var totalPrice = (parseInt(_this.price_and_num.price) * parseInt(_this.price_and_num.num) * parseFloat(discount)).toFixed(2);
        */
        var totalPrice = (parseFloat(tmp1) + parseFloat(tmp2)).toFixed(2);
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
  .div-disabled{
    color:gray !important;
    cursor: default !important;
  }
  .font-icon{
    vertical-align: middle;
    font-size: 30px;
    padding-right: 10px;
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
