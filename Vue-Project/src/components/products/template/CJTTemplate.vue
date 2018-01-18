<!--畅捷通产品模板-->
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
        <input type="hidden"   :value=prodList.applyObjId class="inputApplyObjId"/>
        <input type="hidden"   :value=prodList.cartItemId class="inputCartItemId"/>
        <input type="hidden"   :value=prodList.catalogId  class="inputCatalogId"/>
        <input type="hidden"   :value=prodList.offerId    class="inputOfferId"/>
        <input type="hidden"   :value=prodList.cartId     class="inputCartId"/>
        <input type="hidden"   :value=prodList.itemCd      class="inputItemCd"/>
        <input type="hidden"   :value=prodList.itemCdName  class="inputItemCdName"/>

        <!--存放总价格-->
        <input type="hidden"  v-if="prodList.amount != null" class="hiddenPrice" :value="parseFloat(prodList.amount * 0.7).toFixed(2)"/>
        <input type="hidden"  v-if="prodList.amount == null" class="hiddenPrice" :value="0"/>
        <span style="position:absolute;top:45px;left:70px;"><i class="hwsicon-service-elb font-icon product-icon"></i>{{prodList.offerName}}</span>
        <div style="color:#6ca7eb;margin-left:15px;margin-left:100px;cursor: pointer;font-size:13px;">
          <router-link v-if="prodList.offerName.indexOf('普及版') > 0" style="color:#6ca7eb;margin-left:10px;" :to="'/allocation2?cartItemId=' + prodList.cartItemId +'&offerId='+prodList.offerId + '&catalogId='+prodList.catalogId">产品配置</router-link>
          <router-link v-if="prodList.offerName.indexOf('标准版') > 0" style="color:#6ca7eb;margin-left:10px;" :to="'/allocation?cartItemId=' + prodList.cartItemId +'&offerId='+prodList.offerId + '&catalogId='+prodList.catalogId">产品配置</router-link>
        </div>
      </div>

      <div style="float:left;width:8%;height:100%;">
        <div style="margin-top:50px;font-size:15px;margin-left:20px;">使用费</div>
      </div>

      <div style="float:left;width:12%;height:100%;">
        <input type="text" class="select-after-label form-control discount" style="width:80px;margin-top:40px;margin-left:30px;" value="0.7" @change="discountChange($event)">
        <div style="font-size:.8em;margin-left:30px;">折扣不能小于0.65</div>
      </div>

      <div style="float:left;width:15%;height:100%;color:#ff8200;">
        <div style="margin-left:50px;margin-top:50px;width:15px;float:left">￥</div>
        <div style="color:#ff8200;margin-left:65px;margin-top:50px;">
          {{prodList.amount == null ? '0':parseFloat(prodList.amount).toFixed(2)}}
        </div>
        <input type="hidden" value=totalPrice/>
      </div>

      <div style="float:left;width:10%;height:100%;color:#ff8200;">
        <div style="margin-top:50px;width:15px;float:left;margin-left:20px;">￥</div>
        <div class="totalPrice" name="totalPrice" style="color:#ff8200;margin-top:50px;">
          {{prodList.amount == null ? '0':parseFloat(prodList.amount * discount).toFixed(2)}}
        </div>
      </div>

      <div style="float:left;width:8%;height:100%;">
        <div style=" width:100%;height: 34px;margin-top:45px;">
<!--
          <span class=".applyObjSpec">1</span>
-->
          <div class=".applyObjSpec" style="float:left;width:100%;height:30px;line-height:30px;text-align: center;">{{prodList.statusCdName}}</div>
        </div>
      </div>

      <div style="float:left;width:12%;height:100%;">
        <select style="margin:40px auto 0px auto;width:110px;" class="billType form-control">
          <option value="前台收费">前台收费</option>
          <option value="计费收费">计费收费</option>
        </select>
      </div>

      <div style="float:left;width:15%;height:100%;">
        <div  style="float:left;width:50px;margin-top:45px;margin-left:70px;color:#318de7;cursor: pointer;" @click="deleteCart()">删&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除</div>
      </div>

    </div>
  </div>
</template>

<script>
  import '../../../assets/css/combined-business.min.css';
  import common    from '../../../global/common.js';

  export default{
    props:['prodList','index'],
    data(){
      return{
        totalPrice:'',
        discount:'0.7',
      }
    },
    methods:{

      getOrderStatus:function (statusCd) {
        return common.getOrderStatus(statusCd);
      },

      /**触发总价格变化事件**/
      triggleSumPriceChange:function (prodList) {
        var _this = this;
        _this.$emit("partPrice",_this.prodList);
      },

      /**删除购物车**/
      deleteCart:function () {
        var _this = this;
        _this.$emit('deleteCart',_this.index,_this.prodList.cartItemId);
      },

      /**折扣修改**/
      discountChange:function ($event) {
        var _this = this;
        var el = event.currentTarget;
        var discount = $(el).val();
        /**校验折扣是否合法**/
        if(! _this.checkDiscount(discount)){
          _this.$alert('折扣必须在1到0.65之间,请重新输入!', '提示', {
            confirmButtonText: '确定',
            callback:action=>{
            }
          });

          $(el).val("0.7");
          return false;
        }
        discount = parseFloat(discount);
        _this.discount = discount;
        _this.totalPrice = parseFloat(_this.prodList.amount * discount).toFixed(2);

        /**找到自己对应的节点**/
        var node = $("input[type='hidden'][value=" + _this.prodList.cartItemId + "]").parents(".main-top");
        $(node).find(".totalPrice").text(_this.totalPrice);
        _this.$emit("partPrice", _this.prodList);
      },

      /**校验折扣是否合法**/
      checkDiscount:function(disCount){
        if(isNaN(disCount)){
          return false;
        }

        var disCountNumber = parseFloat(disCount);

        if(disCountNumber > 1 || disCountNumber < 0.65){
          return false;
        }
        return true;
      },
    },
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

  .font-icon{
    vertical-align: middle;
    font-size: 30px;
    padding-right: 10px;
  }
  .product-icon{
    font-family: homeIcomoon;
  }
</style>
