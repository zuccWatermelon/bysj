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

        <!--存放总价格(折前)-->
        <input type="hidden"  v-if="prodList.amount != null" class="hiddenPriceBeforeDiscount" :value="parseFloat(prodList.amount).toFixed(2)"/>
        <input type="hidden"  v-if="prodList.amount == null" class="hiddenPriceBeforeDiscount" :value="0"/>

        <!--存放总价格(折后)-->
        <input type="hidden"  v-if="prodList.amount != null" class="hiddenPriceAfterDiscount" :value="parseFloat(prodList.amount * 0.7).toFixed(2)"/>
        <input type="hidden"  v-if="prodList.amount == null" class="hiddenPriceAfterDiscount" :value="0"/>
        <span style="position:absolute;top:45px;left:70px;"><i class="hwsicon-service-dbs font-icon product-icon"></i>{{prodList.offerName}}</span>
      </div>

      <div style="float:left;width:8%;height:100%;">
        <div style="margin-top:40px;font-size: 13px;margin-top:30px;margin-left:20px;">使用费</div>
        <div style="margin-top:30px;font-size: 13px;margin-left:10px;">一次性费用</div>
      </div>

      <div style="float:left;width:12%;">
      <div>
        <input type="text"
                style="float:left;width:80px;margin:20px auto 0px auto;margin-left:30px;height:30px;"
                :disabled="prodList.statusCd != '1'"
                 class="discount form-control configChargeDiscount"
                 @change="configPriceChange($event)"/>
      </div>

      <div>
        <input type="text"
                style="float:left;width:80px;margin:20px auto 0px auto;margin-left:30px;height:30px;font-size:13px;"
               :disabled="prodList.statusCd != '1'"
               @change="onceChargeDiscountChange($event)"
               class="discount form-control onceChargeDiscount"/>

       <!-- <select style="float:left;width:80px;margin:20px auto 0px auto;margin-left:30px;height:30px;font-size:13px;"
                :disabled="prodList.statusCd != '1'"
                @change="onceChargeDiscountChange($event)"
                class="discount form-control onceChargeDiscount">
          <option value="0.9">9折</option>
          <option value="0.8">8折</option>
          <option value="0.7">7折</option>
          <option value="0.6">6折</option>
          <option value="0.5">5折</option>
          <option value="0.4">4折</option>
          <option value="0.3">3折</option>
          <option value="0.2">2折</option>
          <option value="0.1">1折</option>
          <option value="0"> 减免</option>
        </select>-->
      </div>
    </div>

      <div style="float:left;width:15%;height:100%;color:#ff8200;">
          <div style="width:100%;height:50%;padding-top:15px;margin-left:50px;">
            <div style="color:#999;"><del>￥{{configPrice}}</del></div>
            <div >￥{{configPriceAfterDiscount}}</div>
          </div>
          <div style="width:100%;height:50%;margin-left:50px;">
            <div style="color:#999;"><del>￥{{onceChargePrice}}</del></div>
            <div class="onceChargePriceAfterDiscount">￥{{onceChargePriceAfterDiscount}}</div>
          </div>
      </div>

      <div style="float:left;width:10%;height:100%;color:#ff8200;">
        <div style="margin-top:50px;width:15px;float:left;margin-left:20px;">￥</div>
        <div class="totalPrice" style="color:#ff8200;margin-top:50px;">
          {{totalPrice}}
        </div>
      </div>

      <div style="float:left;width:8%;height:100%;">
        <div style=" width:100%;height: 34px;margin-top:45px;">
          <div class=".applyObjSpec" style="width:100%;height:30px;line-height:30px;text-align: center;">{{prodList.statusCdName}}</div>
        </div>
      </div>

      <div style="float:left;width:12%;height:100%;">
        <select style="margin:40px auto 0px auto;width:110px;"
                :disabled="prodList.statusCd != '1'"
                class="billType form-control"
                v-model="billType">
          <option value="前台收费">前台收费</option>
          <option value="计费收费">计费收费</option>
        </select>
      </div>

      <div style="float:left;width:13%;height:100%;text-align: center;">
        <div  style="margin-left:15px;margin-top:30px;color:#318de7;cursor: pointer;"
              :class="{'div-disabled':prodList.statusCd == '2' || prodList.statusCd == '3'}"
              @click="prodList.statusCd == '2' || prodList.statusCd == '3'? '':getApprove(prodList)">折扣审批</div>
        <div  style="float:left;width:50px;margin-left:60px;margin-top:10px;color:#318de7;cursor: pointer;" @click="deleteCart()">
              删&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;除</div>
      </div>
    </div>


    <!--购物车审批-->
    <Examine v-if="loginClick"
             :loginClick.sync="loginClick"
             :curExamineCentOrNot.sync="curExamineCentOrNot"
             :message="message">
    </Examine>

    <div class="main-one">
      <span class="title-w1200" @click="showConfInfo($event)">IPRAN线路配置信息<img :class="{up:isUp}" src="../../../assets/img/arrow.png"/></span>
      <div class="IPRAN-conf" style="display: none;" >
        <div class="conf-l">
          <div class="conf-l-t l-t-first">1. 云专线基本信息</div>
          <div class="conf-l-m conf-l-netCloudBasicInfo prod_id_prop" :dataValue="201">
            <div class="conf-l-item">
              <span class="item-label">选择所属域：</span>
              <!--select内的option通过后端服务自动生成-->
              <select class="item-in" :disabled="prodList.statusCd != '1'" :dataValue="123"></select>
            </div>
          </div>
          <div class="conf-l-t">2. IPRAN线路设置</div>
          <div class="conf-l-m conf-l-IPRANSet prod_id_prop" :dataValue="203">
            <!--算费相关-->
            <input type="hidden" class="configure-price" value=""/>
            <div class="conf-l-item">
              <span class="item-label"><img src="../../../assets/img/icon_sulv.png"/>CE接入速率：</span>
              <select class="item-in" :dataValue="129" :disabled="prodList.statusCd != '1'" @change="propChange(prodList,$event)"></select>
            </div>
            <div class="conf-l-item">
              <span class="item-label"><img src="../../../assets/img/icon_sulv.png"/>速率类型：</span>
              <!--select内的option通过后端服务自动生成-->
              <select class="item-in" :dataValue="140" :disabled="prodList.statusCd != '1'" @change="propChange(prodList,$event)"></select>
            </div>
            <div class="conf-l-item">
              <span class="item-label"><img src="../../../assets/img/icon_sulv.png"/>电路维护等级：</span>
              <!--select内的option通过后端服务自动生成-->
              <select class="item-in" :dataValue="127" :disabled="prodList.statusCd != '1'" @change="propChange(prodList,$event)"></select>
            </div>
            <div class="conf-l-item">
              <span class="item-label">Qos等级模式：</span>
              <select class="item-in" :dataValue="128" :disabled="prodList.statusCd != '1'" @change="propChange(prodList,$event)"></select>
            </div>

            <div class="IPRANSet-default">
              <span class="button-collapse"  @click="toggle()">默认属性</span>
              <div class="div-collapse">
                <div class="conf-l-item">
                  <span class="item-label">付费方式：</span>
                  <!--select内的option通过后端服务自动生成-->
                  <select class="item-in" :dataValue="135" :disabled="prodList.statusCd != '1'" @change="propChange(prodList,$event)"></select>
                </div>

                <div class="conf-l-item">
                  <span class="item-label">电路类型：</span>
                  <!--select内的option通过后端服务自动生成-->
                  <select class="item-in" :disabled="prodList.statusCd != '1'" :dataValue="138" @change="propChange(prodList,$event)"></select>
                </div>
                <div class="conf-l-item">
                  <span class="item-label">CE端提供方：</span>
                  <!--select内的option通过后端服务自动生成-->
                  <select class="item-in" :disabled="prodList.statusCd != '1'" :dataValue="136" @change="propChange(prodList,$event)"></select>
                </div>
                <div class="conf-l-item">
                  <span class="item-label">起租/退租系数：</span>
                  <!--select内的option通过后端服务自动生成-->
                  <select class="item-in" :disabled="prodList.statusCd != '1'" :dataValue="137"></select>
                </div>
              </div>
            </div>
          </div>
          <div class="conf-l-t">3. 装机相关信息</div>
          <div class="conf-l-m conf-l-setupInfo prod_id_prop" :dataValue="204">
            <div class="conf-l-item">
              <span class="item-label">客户联系人：</span>
              <div class="item-in" ><input  type="text" :disabled="prodList.statusCd != '1'" :dataValue = "124"/></div>
            </div>

            <div class="conf-l-item">
              <span class="item-label">联系电话：</span>
              <div  class="item-in"><input  type="text" :disabled="prodList.statusCd != '1'" :dataValue = "125" /></div>
            </div>

            <div class="conf-l-item">
              <span class="item-label">预约起租时间：</span>
              <el-date-picker
                v-model="rentTime"
                type="date"
                format="yyyy-MM-dd"
                placeholder="选择日期"
                class = "el-data-editor"
                :picker-options="pickerOptions1"
                :dataValue = "126"
                :disabled="prodList.statusCd != '1'">
              </el-date-picker>
            </div>

            <div class="conf-l-item setup-address">
                              <addressSearch
                                :statusCd.sync = "prodList.statusCd"
                                :addressDataExchId.sync="addressData.exchId"
                                :addressDataBelongRegionId.sync="addressData.belongRegionId"
                                :addressDataAddressId.sync="addressData.addressId"
                                :addressDataAddressDesc.sync="addressData.addressDesc">
                              </addressSearch>
            </div>
          </div>
        </div>

        <!--配置详情浮动窗口-->
        <div class="conf-r">
          <span class="conf-box-t">配置详情</span>
          <div class="conf-box-cont">
            <div class="conf-box-cont-a">
              <div class="conf-box-t2">CE接入速率：</div>
              <div class="a-list">
                <span class="ce-speed">2M</span><span class="speed-type">包月</span><span class="maintain-level">A</span><span class="a-list-price">￥<span class="pro_price">1000.00</span></span>
              </div>
            </div>
            <div class="conf-box-cont-b">
              <dl>
                <dt>Qos等级模式：</dt>
                <dd class="QoS-level">钻</dd>
              </dl>
              <dl>
                <dt>付费方式：</dt>
                <dd class="pay-type">最终客户付费</dd>
              </dl>
            </div>
          </div>
          <div class="conf-box-price">
            <div class="conf-box-t2">配置费用：</div>
            <span><small>￥</small><span class="pro_price">{{configPrice}}</span></span>
          </div>
          <div class="conf-box-ps">
          </div>

          <div class="conf-save">
            <el-button type="warning" plain @click="saveConfig(prodList,$event)">订单校验</el-button>
          </div>

        </div>

      </div>
      <div>
        <span class="title-w1200" @click="showExpense($event)">一次性费用(初装费)<img  :class="{up:isUpTwo}"  src="../../../assets/img/arrow.png"/></span>

        <div class="IPRAN-price-one prod_id_prop"  style="display: none" :dataValue="222">
          <span class="price-one-l"><img src="../../../assets/img/step.png"/> 一次性费用(初装费)：</span>
          <div class="price-one-r"><input class="calculate-amount" type="text"  value="5200" disabled :dataValue="130" @blur="onceChargeChange($event)"/></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import addressSearch from '../../CloundLine/IPRAN/addressSearch.vue';
  import Examine       from '../../CloundLine/Examine.vue';
  import common        from '../../../global/common.js';
  import '../../../assets/css/combined-business.min.css';

  export default{

    props:['prodList','index'],
    data(){
      return{

        pickerOptions1:{
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        billType:'前台收费',
        /**折扣审批相关**/
        loginClick:false,
        curExamineId:'',
        curExamineOfferName:'',
        curExamineCentOrNot:false,
        curCatalogId:'',
        sysUserName:'',
        custName:'',
        isUp:false,
        isUpTwo:false,
        rentTime:'',
        isShow:false,
        /**总价格**/
        /**配置费用**/
        configPrice:'',
        configPriceAfterDiscount:'',
        /**一次性费用**/
        onceChargePrice:'5200.00',
        onceChargePriceAfterDiscount:'4680.00',
        addressData:{
          addressId:'',
          exchId:'',
          belongRegionId:'',
          addressDesc:'',
        },
        message:{},
      }
    },
    components:{
      addressSearch,
      Examine
    },
    mounted:function () {
      var _this = this;
      /**获取用户对应的session**/
      var user = window.sessionStorage.getItem('user');
      var cust = window.sessionStorage.getItem('cust');
      _this.sysUserName = JSON.parse(user).sysUserName;
      _this.custName = JSON.parse(cust).custName;

      /**初始化select配置**/
      var confList = _this.prodList.confList;
      var prodConfList = _this.prodList.prodConfList;

      /**获取父节点**/
      var node = $("input[type='hidden'][value=" + _this.prodList.cartItemId + "]").parents(".main-top").siblings(".main-one");

      /**收费方式**/
      if(_this.prodList.billType){
        _this.billType = _this.prodList.billType;
      }

      for(var i = 0;i < confList.length;i++){
        for(var j = 0;j < confList[i].offerProductObjectAttrList.length;j++){
          var tmp = confList[i].offerProductObjectAttrList[j];


          $(node).find("select").each(function () {
            var select_node = this;
            /**获取默认值**/
            var defaultValue = tmp.objectAttrInfo.defaultValue;
            if($(select_node).attr("datavalue") == tmp.objectAttrInfo.attrId){
              for(var n = 0;n < tmp.objectAttrValueList.length;n++){
                $(select_node).append("<option value=" + tmp.objectAttrValueList[n].attrValueId + " text=" + tmp.objectAttrValueList[n].remark + ">" + tmp.objectAttrValueList[n].remark + "</option>");
              }
              /**设置对应的option为选中**/
              if(defaultValue != null) {
                $(select_node).find("option[text='" + defaultValue + "']").prop("selected",true);
              }
            }
          });
        }
      }
      /**如果订单已经保存过,则加载对应的配置**/
      _this.initConfig(_this.prodList.cartItemId,prodConfList);
    },

    computed:{
      totalPrice:function () {
          var _this = this;
          return parseFloat(parseFloat(_this.configPriceAfterDiscount) + parseFloat(_this.onceChargePriceAfterDiscount)).toFixed(2);
      },
    },
    methods:{
      getOrderStatus:function (statusCd) {
        return common.getOrderStatus(statusCd);
      },

      dataToExamine:function () {
        var _this = this;
        let datas = {};
        if(_this.curExamineId){
          /**获取父元素节点**/
          let cur_li = $("input[type='hidden'][value=" + _this.curExamineId + "]").parent().parent().parent().find(".main-one");
          let node = $("input[type='hidden'][value=" + _this.curExamineId + "]").parents(".main-top");
          var discount = $(node).find(".configChargeDiscount").val();

          datas.conf_price = _this.configPrice;
          datas.calculate_amount = cur_li.find("input.calculate-amount").val();
          datas.discount = discount;

          datas.onceChargePriceAfterDiscount = _this.onceChargePriceAfterDiscount;
          datas.curExamineId = _this.curExamineId;
          datas.sysUserName = _this.sysUserName;
          datas.custName = _this.custName;
          datas.offerName = _this.curExamineOfferName;
          datas.catalogId = _this.curCatalogId;
          datas.offerId = _this.prodList.offerId;
          /**一次性费用折扣**/
          datas.workRate = $(node).find(".onceChargeDiscount").val();
          /**付费方式**/
          datas.billType = _this.billType;
        }
        return datas;
      },

      /**折扣审批**/
      getApprove:function(prodList) {
        var _this = this;

        _this.loginClick = true;
        _this.curExamineId = prodList.cartItemId;
        _this.curExamineOfferName = prodList.offerName;

        _this.curCatalogId = prodList.catalogId;

        _this.message = _this.dataToExamine();
      },

      /**校验地址**/
      checkAddress:function (addressId,exchId,belongRegionId,addressDesc) {
        if(($.trim(addressId) == "") || ($.trim(addressId) == null) || ($.trim(exchId) == "") || ($.trim(exchId) == null) || ($.trim(belongRegionId) == "") || ($.trim(belongRegionId) == null) || ($.trim(addressDesc) == "") || ($.trim(addressDesc) == null)){
          return false;
        }else{
          return true;
        }
      },

      /**保存修改后的配置**/
      saveConfig:function(prodList,event){

        var _this = this;
        let el = event.currentTarget;

        /**获取父元素**/
        var cur_li = $("input[type='hidden'][value=" + prodList.cartItemId + "]").parents(".main-top").parent().find(".main-one");

        var configure_price = _this.configPrice;

        /**购物车项id**/
        var cartItemId = prodList.cartItemId;

        /**产品id**/
        var offerId = prodList.offerId;

        /**获取客户的session**/
        var user = window.sessionStorage.getItem('user');
        /**获取客户对应的session**/
        var cust = window.sessionStorage.getItem('cust');

        /**获取加载购物车的查询条件**/
        var userId = JSON.parse(cust).CUST_ID;
        var loginUserId = JSON.parse(user).staffId;
        var param = {};
        param.loginUserId = loginUserId;
        param.cartItemId = cartItemId;
        param.shoppingCart = {
          "userId": userId,
          "userType": "客户经理"
        };

        param.shoppingCartItem = {
          "applyObjId": "261",
          "applyObjSpec": 1
        };

        param.cartItemAttr = {
          "attrId": 0,
          "attrValue": 1
        };

        param.offerId = 261;

        /**传参字符串**/
        var productAttrList = [];
        /**基础相关信息字符串**/
        var lst_basic = {};
        var serviceAttrList_basic = [];

        /**拼装安装地址信息**/
        /**地址id**/
        var addressId = _this.addressData.addressId;
        /**本地网id**/
        var exchId = _this.addressData.exchId;
        /**区县id**/
        var belongRegionId = _this.addressData.belongRegionId;
        /**详细地址**/
        var addressDesc = _this.addressData.addressDesc;

        /**联系人是否已填校验**/
        var hasConnectFlag = true;
        /**电话号码是否为空校验**/
        var hasPhoneFlag = true;
        /**校验电话格式**/
        var phoneFlag = true;
        /**预约时间校验**/
        if(!_this.rentTime){
          _this.$alert('预约时间不能为空!', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
          return false;
        }

        if(!_this.checkAddress(addressId,exchId,belongRegionId,addressDesc)){
          _this.$alert('地址不能为空', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
          return false;
        }

        /**遍历,循环取出value值并加以保存**/
        $(cur_li).find(".prod_id_prop").each(function () {
          var node = $(this);
          var jsonData = {};
          var serviceAttrList = [];
          jsonData.productId = node.attr("dataValue");
          jsonData.addressId = addressId;
          jsonData.exchId = exchId;
          jsonData.belongRegionId = belongRegionId;
          jsonData.addressDesc = addressDesc;

          lst_basic.addressId = addressId;
          lst_basic.exchId = exchId;
          lst_basic.belongRegionId = belongRegionId;
          lst_basic.addressDesc = addressDesc;

          if(node.attr("dataValue") == '201' || node.attr("dataValue") == '204'){
            /**基本信息以(201)及装机相关信息(204),注意:客户联系人、联系电话以及预约起租时间的展示是放在装机相关信息里面的
             * 但是, 送接口的时候是放在基础信息里面送**/
            if(node.attr("dataValue") == '201'){
              lst_basic.productId = node.attr("dataValue");
              /**处理资源池信息**/
              node.find("select").each(function () {
                var sel = $(this);
                var tmp = {};
                tmp.attrId = $(sel).attr("dataValue");
                tmp.attrValue = $(sel).val();
                serviceAttrList_basic.push(tmp);
              });
            }else{
              /**客户联系人,联系电话**/
              node.find(".item-in input").each(function () {
                var input = $(this);
                var tmp = {};
                /**客户联系人非空校验**/
                if($(input).attr("dataValue") == '124'){
                  if(($(input).val() == "") || ($(input).val() == null)){
                    hasConnectFlag = false;
                  }
                }

                /**联系电话校验**/
                if($(input).attr("dataValue") == '125'){
                  if(($(input).val() == "") || ($(input).val() == null)){
                    hasPhoneFlag = false;
                  }

                  /**电话号码是否满足格式要求**/
                  let re1 = /^1\d{10}$/;
                  let re2 = /^0\d{2,3}-?\d{7,8}$/;
                  if(!re1.test($(input).val()) && !re2.test($(input).val())){
                    phoneFlag =  false;
                  }
                }
                tmp.attrId = $(input).attr("dataValue");
                tmp.attrValue =  $(input).val();
                serviceAttrList_basic.push(tmp);
              });

              /**预约时间**/
              node.find(".el-data-editor").each(function () {
                var editor = this;
                var tmp = {};
                tmp.attrId = $(editor).attr("dataValue");
                tmp.attrValue =  _this.rentTime;
                serviceAttrList_basic.push(tmp);
              });
            }
          }else if(node.attr("dataValue") == '203'){
            /**线路配置拼装**/
            /**线路配置部分,遍历所有的select**/
            node.find("select").each(function () {
              var sel = $(this);
              var tmp = {};
              tmp.attrId = $(sel).attr("dataValue");
              tmp.attrValue = $(sel).val();
              serviceAttrList.push(tmp);
            });
            jsonData.serviceAttrList = serviceAttrList;
            productAttrList.push(jsonData);
            jsonData.amount = configure_price;

          }else{
            /**一次性费用拼装**/
            var txt = $(node).find(".price-one-r input").val();
            jsonData.amount = txt;
            jsonData.serviceAttrList = [];
            productAttrList.push(jsonData);
          }
        })


        if(!hasConnectFlag){
          _this.$alert('联系人不能为空!', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
          return false;
        }

        if(!hasPhoneFlag){
          _this.$alert('联系电话不能为空!', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
          return false;
        }

        if(!phoneFlag){
          _this.$alert('联系电话格式有误!', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
          return false;
        }

        lst_basic.serviceAttrList = serviceAttrList_basic;
        productAttrList.push(lst_basic);
        param.productAttrList = productAttrList;

        /**遍历,添加parProdId**/
        for(var m in param.productAttrList){
          for(var n in _this.prodList.confList){
             if((param.productAttrList)[m].productId == (_this.prodList.confList)[n].productInfo.prodId){
                (param.productAttrList)[m].parProdId = (_this.prodList.confList)[n].productInfo.parProdId;
              }
          }
        }
       axios({
          method:'post',
          url:"/netCloudOrder/shoppingCartService/updateShoppingCart2",
          data:param,
        }).then(function (response) {
          if(response.data.code == '0'){
            _this.$alert('订单校验成功', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                return false;
              }
            });
          }else{
            _this.$alert('订单校验失败', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                return false;
              }
            });
          }
        })
      },

      /**初始化配置**/
      initConfig:function (cartItemId,dataList) {
        var _this = this;

        let data = dataList.productAttrList;
        /**一次性费用**/
        var oneTimeCharge = "";
        /**配置费用**/
        var configCharge = "";

        /**获取父节点**/
        var tag = $("input[type='hidden'][value=" + cartItemId + "]").parents(".main-top").parent().find(".main-one");
        var node = $("input[type='hidden'][value=" + cartItemId + "]").parents(".main-top");

        /**设置折扣相关**/
        /**配置折扣**/
        let configChargeDiscount = "0.95";
        /**使用费折扣**/
        let onceChargeDiscount = "0.9";
        let tmp = dataList.productAttrList;

        if(dataList.discount == '0'){
          configChargeDiscount = '0';
        }else if(dataList.discount != null && dataList.discount != ''){
          configChargeDiscount = dataList.discount / 100;
        }
        if(dataList.productAttrList && dataList.productAttrList.length != null && dataList.productAttrList.length != undefined){
          for(var idx in tmp){

            if(tmp[idx].productId == "222"){
              if(tmp[idx].discount !== null && tmp[idx].discount !== ""){
                onceChargeDiscount = tmp[idx].discount / 100;
              }
            }
          }
        }
        /**一次性折扣赋值**/
        $(node).find(".onceChargeDiscount").val(onceChargeDiscount);
        $(node).find(".configChargeDiscount").val(configChargeDiscount);
        _this.onceChargePriceAfterDiscount = parseFloat(5200 * onceChargeDiscount).toFixed(2);

        if(data != null && data != '') {
          $.each(data, function (index, item) {
            if(item.serviceAttrList != null){
              $.each(item.serviceAttrList, function (index, token) {

                  /**给select和input赋值**/
                  $(tag).find("select,input").each(function () {
                    var node = this;
                    if (($(node).attr("dataValue") == token.attrId) && (token.attrValue != null)) {
                      /**设置select对应的值为选中**/
                      $(node).val(token.attrValue);
                    }
                  });

                /**给预约起租时间赋值**/
                $(tag).find(".el-data-editor").each(function () {
                  var node = this;
                  if (($(node).attr("dataValue") == token.attrId) && (token.attrValue != null)) {
                    /**设置select对应的值为选中**/
                    _this.rentTime = token.attrValue;
                  }
                })
              });
            }
          });

          if (data.length != 0) {
            /**地址初始化**/
            /**地址id**/
            _this.addressData.addressId = data[0].addressId;
            _this.addressData.exchId = data[0].exchId;
            _this.addressData.belongRegionId = data[0].belongRegionId;
            _this.addressData.addressDesc = data[0].addressDesc;
          }

          /**配置悬浮窗初始化**/
          var suspendedWindow = $(tag).find(".conf-r");
          $(tag).find("select").each(function () {
            var node = this;
            if($(node).attr("dataValue") == "128"){
              /***设置QoS等级模式*/
              var txt = $(node).find("option:selected").text();
              $(suspendedWindow).find(".QoS-level").text(txt);
            }else if($(node).attr("dataValue") == "129"){
              /**CE接入速率**/
              var txt = $(node).find("option:selected").text();
              $(suspendedWindow).find(".ce-speed").text(txt);
            }else if($(node).attr("dataValue") == "140"){
              /**速率类型**/
              var txt = $(node).find("option:selected").text();
              $(suspendedWindow).find(".speed-type").text(txt);
            }else if($(node).attr("dataValue") == "135"){
              /**付费方式**/
              var txt = $(node).find("option:selected").text();
              $(suspendedWindow).find(".pay-type").text(txt);
            }else if($(node).attr("dataValue") == "127"){
              /**维护等级**/
              var txt = $(node).find("option:selected").text();
              $(suspendedWindow).find(".maintain-level").text(txt);
            }
          })
        }
        /**配置价格初始化**/
        _this.getPrice(cartItemId);
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

        /**校验输入的值(0到1之间),如果校验不通过,则直接将其置为默认值0.95**/
        let reg = /^[0-1]$|^0\.[0-9]+$/;
        if(!reg.test(discount)){
          $(el).val('0.95');
          discount = 0.95;
        }
        _this.configPriceAfterDiscount = parseFloat(discount * _this.configPrice).toFixed(2);
        /**找到自己对应的节点**/
        var node = $("input[type='hidden'][value=" + _this.prodList.cartItemId + "]").parents(".main-top");
        $(node).find(".totalPrice").text(_this.totalPrice);
        _this.$emit("partPrice",_this.prodList);
      },

      /**一次性费用折扣变化**/
      onceChargeDiscountChange:function (event) {
        var _this = this;
        var el = event.currentTarget;

        var discount = $(el).val();

        /**校验输入的值(0到1之间),如果校验不通过,则直接将其置为默认值0.95**/
        let reg = /^[0-1]$|^0\.[0-9]+$/;
        if(!reg.test(discount)){
          $(el).val('0.9');
          discount = 0.9
        }
        _this.onceChargePriceAfterDiscount = parseFloat(discount * _this.onceChargePrice).toFixed(2);

        /**找到自己对应的节点**/
        var node = $("input[type='hidden'][value=" + _this.prodList.cartItemId + "]").parents(".main-top");
        $(node).find(".totalPrice").text(_this.totalPrice);
        _this.$emit("partPrice", _this.prodList);
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

      /**提示语和红边框提示**/
      callBackFunc:function(event,tip){
        let _this = this;
        let el = event.currentTarget;
        if($(el).parent().find('.has-tip').length > 0){
          $(el).parent().find('.has-tip').html(tip);
        }else{
          let tip_html = "<div class='has-tip' style='position:absolute;left:0;top:30px;font-size: 12px;color:red;'>"+tip+"</div>";
          $(el).parent().append(tip_html);
        }

      },

      /**等级模式,接入速率,速率类型,付费方式,电路维护等级修改**/
      propChange:function (prodList,event) {
        var _this = this;
        var el = event.currentTarget;

        /**对应的父元素标签**/
        var tag = $("input[type='hidden'][value=" + prodList.cartItemId + "]").parents(".main-top").parent().find(".main-one");

        /**根据标签类型判断**/
        if($(el).attr("dataValue") == "128"){
          /**等级模式**/
          var txt = $(el).find("option:selected").text();
          var node = $(tag).find(".conf-r").find(".QoS-level");
          $(node).text(txt);

        }else if($(el).attr("dataValue") == "129"){
          /**CE接入速率(影响价格)**/
          var txt = $(el).find("option:selected").text();
          var node =  $(tag).find(".conf-r").find(".ce-speed");
          $(node).text(txt);
          _this.getPrice(prodList.cartItemId);
        }else if($(el).attr("dataValue") == "140"){
          /**速率类型(影响价格)**/
          var txt = $(el).find("option:selected").text();
          var node =  $(tag).find(".conf-r").find(".speed-type");
          $(node).text(txt);
          _this.getPrice(prodList.cartItemId);
        }else if($(el).attr("dataValue") == "135"){
          /**付费方式**/
          var txt = $(el).find("option:selected").text();
          var node =  $(tag).find(".conf-r").find(".pay-type");
          $(node).text(txt);
        }else if($(el).attr("dataValue") == "127"){
          /**维护等级(影响价格)**/
          var txt = $(el).find("option:selected").text();
          var node =  $(tag).find(".conf-r").find(".maintain-level");
          $(node).text(txt);
          _this.getPrice(prodList.cartItemId);
        }
        /**找到自己对应的节点**/
/*        var node = $("input[type='hidden'][value=" + _this.prodList.cartItemId + "]").parents(".main-top");
        $(node).find(".totalPrice").text(_this.totalPrice);
        _this.$emit("partPrice", _this.prodList);*/
      },

      /**获取价格变化**/
      getPrice:function (cartItemId) {
        var _this = this;
        /**获取父节点**/
        var cur_li = $("input[type='hidden'][value=" + cartItemId + "]").parents(".main-top").parent().find(".main-one");
        var node = $("input[type='hidden'][value=" + cartItemId + "]").parents(".main-top").parent().find(".main-top");
        var discount = $(node).find(".configChargeDiscount").val();
        /**拼装参数**/
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
                    "objAttVal": cur_li.find("select[datavalue='123']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
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
                    "objAttVal": cur_li.find("select[datavalue='128']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  },
                  {
                    "objAttrId": 129,// 对象属性ID
                    "objAttVal": cur_li.find("select[datavalue='129']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  },
                  {
                    "objAttrId": 140,// 对象属性ID
                    "objAttVal": cur_li.find("select[datavalue='140']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  }
                  ,
                  {
                    "objAttrId": 135,// 对象属性ID
                    "objAttVal": cur_li.find("select[datavalue='135']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  },
                  {
                    "objAttrId": 127,// 对象属性ID
                    "objAttVal": cur_li.find("select[datavalue='127']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  },
                  {
                    "objAttrId": 138,// 对象属性ID
                    "objAttVal": cur_li.find("select[datavalue='138']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  },
                  {
                    "objAttrId": 136,// 对象属性ID
                    "objAttVal": cur_li.find("select[datavalue='136']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  },
                  {
                    "objAttrId": 137,// 对象属性ID
                    "objAttVal": cur_li.find("select[datavalue='137']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
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
          var lst = response.data.data;

          if(response.data.code == '0'){
            /**返回配置价格**/
            var profPrice = parseFloat(lst.productInfoList[0].price) + parseFloat(lst.productInfoList[1].price);
            /**显示配置价格**/
            _this.configPrice = profPrice;
            _this.configPriceAfterDiscount = parseFloat(parseFloat(_this.configPrice) * parseFloat(discount)).toFixed(2);

            /**文本修改**/
            var node = $("input[type='hidden'][value=" + _this.prodList.cartItemId + "]").parents(".main-top");
            $(node).find(".totalPrice").text(_this.totalPrice);
            _this.$emit("partPrice", _this.prodList);
          }else{
              /***Fix me**/
            /***如果接口返回不正常,会导致价格显示异常
             * 需要加以处理***/
          }
        })

      },

      /**删除购物车**/
      deleteCart:function () {
        var _this = this;
        _this.$emit('deleteCart',_this.index,_this.prodList.cartItemId);
      },
      toggle:function(){
        this.isShow = !this.isShow;
      },
      /**线路配置展开**/
      showConfInfo:function(event){
        var _this = this;
        var el = event.currentTarget;
        var target = $(el).parent().find(".IPRAN-conf");
        if($(target).css("display") == "none"){
          $(target).css("display","block");
          this.isUp=true;
        }else{
          $(target).css("display","none");
          this.isUp=false;
        }
      },
      /**一次性费用展开**/
      showExpense:function (event) {
        var _this = this;
        var el = event.currentTarget;
        var target = $(el).parent().find(".IPRAN-price-one");

        if($(target).css("display") == "none"){
          $(target).css("display","block");
          this.isUpTwo=true;
        }else{
          $(target).css("display","none");
          this.isUpTwo=false;
        }
      },
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

  .div-disabled{
    color:gray !important;
    cursor: default !important;
  }

  .product-icon{
    font-family: homeIcomoon;
  }

  .font-icon{
    vertical-align: middle;
    font-size: 30px;
    padding-right: 10px;
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
        width:408px;
        height:40px;
        font-size: 30px;
        float:left;
        margin-top:10px;
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
        font-size:20px;
        line-height:78px;
        text-align: center;
        float:left;
      }
    }
  }
  .main-top{
    width:1200px;
    height:135px;
    margin:0 auto;
    border:solid 1px #e8e8e8;
    border-radius: 5px;
  }

  .clear{
    clear:both;
  }
  .hidden{
    display: none;
  }
  .top{
    height:340px;
    width:100%;
    background-color: #0182de;
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
    cursor: pointer;
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
      .el-data-editor{
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
      width:100%;
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
      width:100%;
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
      width:100%;
      padding:8px 15px;
      border-top: 1px dashed #e5e5e5;
      span{
        margin-left:25px;
        font-size: 24px;
        color:#ff8200;
      }
    }
    .conf-box-ps{
      width:100%;
      height:60px;
      padding:8px 15px;
      border-top: 1px solid #e5e5e5;
      line-height: 40px;
      text-align: center;
      a,a:link,a:visited{
        color:#999;
      }
    }

    .conf-save{
      width:100%;
      height:60px;
      padding:8px 15px;
      border-top: 1px solid #e5e5e5;
      line-height: 40px;
      text-align: center;
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
  .item-li{
    width:1202px;
    margin:0 auto;
    padding-bottom:20px;
    border:1px solid #e8e8e8;
    border-radius:5px;
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
    .main-out-border{
      width:1202px;
      padding-bottom:20px;
      margin:0 auto;
      border:1px solid #e8e8e8;
      border-radius:5px;
    }
    .main-top{
      border: 0px;
      border-radius:0;
    }
    .IPRAN-conf{
      margin:0 10px;
    }
    .conf-l{
      width:908px;
    }
    .conf-r{
      width:272px;
    }
    .price-one-l{
      margin-left:10px;
    }
    .title-w1200{
      margin-top:10px;
      background-color: #e5e5e5;
      color:#666;
      img{
        float:right;
        margin-top:8px;
        margin-right:10px;
      }
      img.up{
        transform:rotate(180deg);
        -webkit-transform:rotate(180deg);
        -moz-transform:rotate(180deg);
        -ms-transform:rotate(180deg);
        -o-transform:rotate(180deg);
      }
    }

  }
</style>
