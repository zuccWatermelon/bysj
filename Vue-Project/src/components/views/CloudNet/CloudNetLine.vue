<!--云网通模板-专线部分-->
<template>
  <div class="cloud-net-line">
    <span class="cloud-net-line-title" >云专线</span>
    <div class="cloud-net-line-detail">
        <dl class="config-group-list">
          <!--start of 基本信息-->
          <dd class="config-group">
            <div class="group-title">1.云专线 基本信息</div>
            <div class="group-box">
              <ul class="config-item-list">
                <li class="config-item-long">
                  <span class="item-label">选择所属域：</span>
                  <select disabled="disabled" class="item-select" v-model="main_data['201']['123']">
                    <option  v-for="(option,index) in select_data['201']['123']"  :value="index">{{option}}</option>
                  </select>
                </li>
              </ul>
            </div>
          </dd>
          <!--end of 基本信息-->
          <!--start of 配置-->
          <dd class="config-group">
            <div class="group-title">2.IPRAN线路 配置</div>
            <div class="group-box">
              <ul class="config-item-list">
                <li class="config-item">
                  <span class="item-label">CE接入速率：</span>
                  <select disabled="disabled" class="item-select" v-model="main_data['203']['129']">
                    <option  v-for="(option,index) in select_data['203']['129']"  :value="index">{{option}}</option>
                  </select>
                </li>
                <li class="config-item">
                  <span class="item-label">速率类型：</span>
                  <select disabled="disabled" class="item-select" v-model="main_data['203']['140']">
                    <option  v-for="(option,index) in select_data['203']['140']"  :value="index">{{option}}</option>
                  </select>
                </li>
                <li class="config-item">
                  <span class="item-label">电路维护等级：</span>
                  <select disabled="disabled" class="item-select" v-model="main_data['203']['127']" >
                    <option  v-for="(option,index) in select_data['203']['127']"  :value="index">{{option}}</option>
                  </select>
                </li>
                <li class="config-item">
                  <span class="item-label">Qos等级模式：</span>
                  <select disabled="disabled" class="item-select" v-model="main_data['203']['128']">
                    <option  v-for="(option,index) in select_data['203']['128']"  :value="index">{{option}}</option>
                  </select>
                </li>
                <li class="config-item">
                  <span class="item-label">付费方式：</span>
                  <select disabled="disabled" class="item-select" v-model="main_data['203']['135']">
                    <option  v-for="(option,index) in select_data['203']['135']"  :value="index">{{option}}</option>
                  </select>
                </li>

                <li class="config-item">
                  <span class="item-label">电路类型：</span>
                  <select disabled="disabled" class="item-select"  v-model="main_data['203']['138']">
                    <option  v-for="(option,index) in select_data['203']['138']"  :value="index">{{option}}</option>
                  </select>
                </li>

                <li class="config-item">
                  <span class="item-label">CE提供方：</span>
                  <select disabled="disabled" class="item-select"  v-model="main_data['203']['136']">
                    <option  v-for="(option,index) in select_data['203']['136']"  :value="index">{{option}}</option>
                  </select>
                </li>

                <li class="config-item">
                  <span class="item-label">起租/退租系数：</span>
                  <select disabled="disabled" class="item-select" v-model="main_data['203']['137']">
                    <option  v-for="(option,index) in select_data['203']['137']"  :value="index">{{option}}</option>
                  </select>
                </li>

              </ul>
            </div>
          </dd>
          <!--end of 配置-->
          <!--start of 装机相关信息-->
          <dd class="config-group">
            <div class="group-title">3.装机相关信息</div>
            <div class="group-box">
              <ul class="config-item-list">
                <li class="config-item">
                  <span class="item-label">客户联系人：</span>
                  <input type="text"  :disabled="prodList.statusCd == '3'" class="item-input" v-model="main_data[201][124]" @blur="checkConnectPerson()"/>
                  <div v-if="tip_for_callBackFunc['201']['124']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['201']['124']}}</div>
                </li>
                <li class="config-item long-item">
                  <span class="item-label">联系人电话：</span>
                  <input type="text" :disabled="prodList.statusCd == '3'" class="item-input long-input" v-model="main_data[201][125]" @blur="checkConnectPhone()"/>
                  <div v-if="tip_for_callBackFunc['201']['125']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['201']['125']}}</div>
                </li>
                <li class="config-item long-item">
                  <span class="item-label">预约起租时间：</span>
                  <el-date-picker
                    :picker-options="pickerOptions1"
                    v-model="main_data[201][126]"
                    type="date"
                    format="yyyy-MM-dd"
                    placeholder="选择日期"
                    class = "el-data-editor"
                    @change="checkDate()"
                    value-format="yyyy-MM-dd"
                    :disabled="prodList.statusCd == '3'">
                  </el-date-picker>
                  <div v-if="tip_for_callBackFunc['201']['126']" class='has-tip-time'><i class='el-icon-error'></i> {{tip_for_callBackFunc['201']['126']}}</div>
                </li>

                <!--装机地址-->
                <li class="config-item-address">
                  <addressSearch
                    :statusCd.sync = "prodList.statusCd"
                    :addressDataExchId.sync="main_data['201']['_item_p'].exchId"
                    :addressDataExch.sync="city_name"
                    :addressDataBelongRegionId.sync="main_data['201']['_item_p'].belongRegionId"
                    :addressDataAddressId.sync="main_data['201']['_item_p'].addressId"
                    :addressDataAddressDesc.sync="main_data['201']['_item_p'].addressDesc">
                  </addressSearch>
                </li>
                <div v-if="tip_for_callBackFunc['201']['address']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['201']['address']}}</div>
              </ul>
            </div>
          </dd>
          <!--end of 装机相关信息-->

          <!--start of 一次性费用-->
          <dd class="config-group without-border">
            <div class="group-title">4.一次性费用</div>
            <div class="group-box">
              <ul class="config-item-list">
                <li class="config-item">
                  <span class="item-label">一次性费用：</span>
                  <el-input :disabled="true"
                            size="small"
                            style="width:120px;"
                            v-model="main_data[222]"
                            placeholder="5200"></el-input>
                </li>
              </ul>
            </div>
          </dd>
          <!--end of 一次性费用-->
        </dl>
    </div>

  </div>
</template>

<script>
  import addressSearch from '../../CloundLine/IPRAN/addressSearch.vue';
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue";

  export default {
    props:[
      'mainData_line','dataBool_line','payType','prodList'
    ],
    data(){
      return{
        city_name:'',
        pickerOptions1:{
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
        }, //时间选择器
        catalogId:'',
        host_data:{},  //传给父级的值
        config_data:[],//传给父配置文字值
        /**初始化用**/
        select_data:{
          "201":{
            "123":{}, //系统所属域
          },
          "203":{
            "127":{}, //电路维护等级
            "128":{}, //Qos等级模式
            "129":{}, //CE接入速率
            "135":{}, //付费方式
            "136":{}, //CE端提供方
            "137":{}, //起租/退租系数
            "138":{}, //电路类型
            "140":{}, //速率类型
          },
        },
        /**提交购物车传值用**/
        main_data:{
            "201":{
              "123":'', //系统所属域
              "124":'', //客户联系人
              "125":'', //联系电话
              "126":'', //预约时间
              '_item_p':{     //装机地址相关
                'exchId':'',
                'belongRegionId':'',
                'addressId':'',
                'addressDesc':'',
              }
            },
            "203":{
              "127":'', //电路维护等级
              "128":'', //Qos等级模式
              "129":'', //CE接入速率
              "135":'', //付费方式
              "136":'', //CE端提供方
              "137":'', //起租/退租系数
              "138":'', //电路类型
              "140":'', //速率类型
            },
            "204":{
              "130":'', //未使用
            }
        },
        /**主产品id**/
        parProdId:'201',

        /**提示相关**/
        tip_for_callBackFunc:{
          "201":{
            "123":'', //系统所属域
            "124":'', //客户联系人
            "125":'', //联系电话
            "126":'', //预约时间
            'address':'',
          }
        },

        addressDesc:'default',
      }
    },
    components:{
      ElInput,
      addressSearch,
    },
    mounted:function () {
      let _this = this;
      _this.catalogId = _this.$route.query.offerId;
    },
    watch:{
      main_data:{
        handler(val,oldVal){
          let _this  = this;
          let lst  =  _this.select_data['203']['129'][_this.main_data['203']['129']] + 'bps '
                    + _this.select_data['203']['140'][_this.main_data['203']['140']] + ' '
                    + _this.select_data['203']['127'][_this.main_data['203']['127']] + ' '
                    + _this.select_data['203']['128'][_this.main_data['203']['128']];
          _this.config_data = [
            {title:'规格',value:lst},
            {title:'付费方式',value:_this.select_data['203']['135'][_this.main_data['203']['135']]},
            {title:'电路类型',value:_this.select_data['203']['138'][_this.main_data['203']['138']]},
            {title:'起租/退租系数',value:_this.select_data['203']['137'][_this.main_data['203']['137']]},
            {title:'CE端提供方',value:_this.select_data['203']['136'][_this.main_data['203']['136']]}
          ];

          /**判断地址是否已经填充**/
          let addressDesc = _this.main_data['201']['_item_p'].addressDesc;
          let addressId =  _this.main_data['201']['_item_p'].addressId;
          let belongRegionId = _this.main_data['201']['_item_p'].belongRegionId;
          let exchId = _this.main_data['201']['_item_p'].exchId;

          /**如果地址提示栏提示不为空,且地址已全部填完,则重新将地址提示栏置为空**/
          let flagTip = _this.tip_for_callBackFunc.address != null && _this.tip_for_callBackFunc.address != '';
          let flagAddressDesc = addressDesc != null && addressDesc != '';
          let flagAddressId = addressId != null && addressId != '';
          let flagBelongRegionId = belongRegionId != null && belongRegionId != '';
          let flagExchId = exchId!= null && exchId != '';
          if(!flagTip && flagAddressDesc && flagAddressId && flagBelongRegionId && flagExchId){
            _this.tip_for_callBackFunc['201'].address = "";
          }

          var obj={
            'parProdId':'201',
            'main_data':_this.main_data,
            'config_data':_this.config_data
          };
          _this.host_data = obj;
          _this.$emit('update:mainData_line',_this.host_data);
        },
        // 深度观察
        deep:true
      },
      payType:function () {
        let _this = this;
        if(_this.payType == '包月'){
            _this.main_data['203']['140'] = '138';
        }else{
            _this.main_data['203']['140'] = '137';
        }
      }
    },
    methods:{

      /**start of  验证相关**/
      /**验证联系人**/
      checkConnectPerson:function () {
        let _this = this;
        if(_this.main_data['201']['124'] == null || _this.main_data['201']['124'] == ''){
            _this.callBackFunc('201','124','联系人不能为空!');
            return false;
        }else{
          _this.callBackFunc('201','124','');
          return true;
        }
      },

      /**验证联系电话**/
      checkConnectPhone:function(){
        let _this = this;
        if(_this.main_data['201']['125'] == null || _this.main_data['201']['125'] == ''){
          _this.callBackFunc('201','125','联系电话不能为空!');
          return false;
        }

        let re1 = /^1\d{10}$/;
        let re2 = /^0\d{2,3}-?\d{7,8}$/;
        if(!re1.test(_this.main_data['201']['125']) && !re2.test(_this.main_data['201']['125'])){
          _this.callBackFunc('201','125','电话格式输入有误!');
          return false;
        }
        _this.callBackFunc('201','125','');
        return true;
      },

      /**验证预约日期**/
      checkDate:function () {
        let _this = this;
        if(_this.main_data['201']['126'] == null || _this.main_data['201']['126'] == ''){
          _this.callBackFunc('201','126','预约日期不能为空!');
          return false;
        }else{
          _this.callBackFunc('201','126','');
          return true;
        }
      },

      /**验证装机地址**/
      checkAddress:function () {
          let _this = this;
          let exchId = _this.main_data['201']['_item_p']['exchId'];
          let belongRegionId = _this.main_data['201']['_item_p']['belongRegionId'];
          let addressId = _this.main_data['201']['_item_p']['addressId'];
          let addressDesc = _this.main_data['201']['_item_p']['addressDesc'];
          if((exchId == null) ||(exchId == '') || (belongRegionId == null) ||(belongRegionId == '') || (addressId == null) ||(addressId == '')|| (addressDesc == null) ||(addressDesc == '')){
            _this.callBackFunc('201','address','装机地址不能为空!');
            return false;
          }
          return true;
      },
      /**提交表单前校验是否有误**/
      hasErrorWhenSubmit:function () {
          let _this = this;
          let res1 = _this.checkConnectPerson();
          let res2 = _this.checkConnectPhone();
          let res3 = _this.checkDate();
          let res4 = _this.checkAddress();
          if((res1 && res2 && res3 && res4) == true){
            return false;
          }else{
            return true;
          }
      },

      callBackFunc:function(key1,key2,tip){
        let _this = this;
        _this.tip_for_callBackFunc[key1][key2] = tip;
      },
      /**end of  验证相关**/

      /**加载初始配置**/
      initializtion:function (data) {
        let _this = this;
        let confList = data.confList;
        let prodConfList = data.prodConfList;
        _this.loadConfigData(confList);
        if(prodConfList.productAttrList != null && prodConfList.productAttrList.length != undefined && prodConfList.productAttrList.length != 0){
          _this.loadOrderData(prodConfList);
        }
      },

      /**加载默认配置**/
      loadConfigData:function (data) {
          let _this = this;
         /**select数组配置初始化**/
          for(var m in _this.select_data){
            for(var n in _this.select_data[m]){
              for(var index in data){
                for(var index_1 in data[index].offerProductObjectAttrList){
                    if(data[index].offerProductObjectAttrList[index_1].objectAttrInfo.attrId == n){
                      /**获取默认值文本**/
                      var defaultValueTxt = data[index].offerProductObjectAttrList[index_1].objectAttrInfo.defaultValue;
                      /**默认值Value**/
                      var defaultValue = "";
                      for(var index_2 in data[index].offerProductObjectAttrList[index_1].objectAttrValueList){
                        var idx = data[index].offerProductObjectAttrList[index_1].objectAttrValueList[index_2].attrValueId;
                        var option = data[index].offerProductObjectAttrList[index_1].objectAttrValueList[index_2].displayValue;

                        if(option == defaultValueTxt){
                          defaultValue = idx;
                        }
                        _this.select_data[m][n][idx] = option;
                      }
                      /**设置默认值**/
                      _this.main_data[m][n] = defaultValue;
                    }
                }
              }
            }
          }

        let lst = _this.select_data['203']['129'][_this.main_data['203']['129']] + 'bps '
                + _this.select_data['203']['140'][_this.main_data['203']['140']] + ' '
                + _this.select_data['203']['127'][_this.main_data['203']['127']] + ' '
                + _this.select_data['203']['128'][_this.main_data['203']['128']];
        _this.config_data = [
          {title:'规格',value:lst},
          {title:'付费方式',value:_this.select_data['203']['135'][_this.main_data['203']['135']]},
          {title:'电路类型',value:_this.select_data['203']['138'][_this.main_data['203']['138']]},
          {title:'起租/退租系数',value:_this.select_data['203']['137'][_this.main_data['203']['137']]},
          {title:'CE端提供方',value:_this.select_data['203']['136'][_this.main_data['203']['136']]}
        ];

        var obj={
          'parProdId':'201',
          'main_data':_this.main_data,
          'config_data':_this.config_data
        };
        _this.host_data = obj;
        _this.$emit('update:mainData_line',_this.host_data);
        _this.$emit('update:dataBool_line',true);
      },

      /**加载订单初始配置**/
      loadOrderData:function (data) {
        let _this = this;

        let dataList = data.productAttrList;
        /**加载联系人和联系电话**/
        for(var idx in dataList){
            /**拼装装机相关信息**/
            if(dataList[idx].productId == '201'){

              /**拼装装机地址相关信息**/
              _this.main_data[201]["_item_p"]["exchId"] = dataList[idx].exchId;
              _this.main_data[201]["_item_p"]["belongRegionId"] = dataList[idx].belongRegionId;
              _this.main_data[201]["_item_p"]["addressId"] = dataList[idx].addressId;
              _this.main_data[201]["_item_p"]["addressDesc"] = dataList[idx].addressDesc;

              for(var n in dataList[idx].serviceAttrList){
                let tag;
                if((dataList[idx].serviceAttrList)[n].attrId != null && (dataList[idx].serviceAttrList)[n].attrId != ''){
                  tag = (dataList[idx].serviceAttrList)[n].attrId;
                  _this.main_data[201][tag] = (dataList[idx].serviceAttrList)[n].attrValue;
                }
              }
            }else if(dataList[idx].productId == '222'){
            }
        }
      }
    }
  }

</script>
<style scoped lang = "less">
  select,input{height:30px;}
  .cloud-net-line{
    width:1200px;
    margin:0 auto;
    border:1px solid #e8e8e8;
    margin-top:20px;
    .cloud-net-line-title{
      width:1200px;
      height:50px;
      padding-left:15px;
      display: block;
      background-color: #F1F6FA;
      line-height: 50px;
      font-size: 18px;
      color:#09f;
      font-weight: bold;
      cursor: pointer;
    }
    .cloud-net-line-detail{
        width:1200px;
      }
  }

  .config-group-list{
    .without-border.config-group{
      border-bottom:none;
    }
    .config-group{
      padding-bottom:5px;
      border-bottom:1px solid #e5e5e5;
      width:1178px;
      margin-left:11px;

      .group-title{
        margin-left:10px;
        line-height:48px;
        font-weight:bold;
      }
      .group-box{
        width:90%;
        .config-item-list{
          .config-item-address{
            float:left;
            width:78%;
            margin-bottom:5px;
            margin-top: 5px;
          }

          .config-item-long{
            float:left;
            width:50%;
            margin-bottom:5px;
            margin-top: 5px;

            .item-label{
              display:inline-block;
              width:25%;
              margin-right:5px;
              text-align: right;
            }
          }

          .config-item{
            float:left;
            width:25%;
            margin-bottom:10px;
            margin-top: 10px;

            .item-label{
              display:inline-block;
              width:50%;
              margin-right:5px;
              text-align: right;
            }

            .item-select{
              min-width:100px;
            }

            .item-input{
              width:100px;
            }

            .long-input.item-input{
              width:150px;
            }

            .el-data-editor{
              width:140px;
            }
          }
          .long-item.config-item{
            width:33%;
          }
          .has-tip{
            margin-top:2px;
            margin-left: 140px;
            width:300px;
            font-size: 12px;
            color:red;
            line-height:16px;
            word-wrap: break-word;
            word-break: normal;
          }
          .has-tip-time{
            margin-top:2px;
            margin-left: 180px;
            width:300px;
            font-size: 12px;
            color:red;
            line-height:16px;
            word-wrap: break-word;
            word-break: normal;
          }
        }
        .config-item-list:after{
          content:'';
          clear:both;
          display:table;
        }
      }
    }
  }

</style>
