<!--云宽通商务专线-->
<template>
  <div class="line" data-mean="云宽通商务专线" v-if="flag">
    <p class="title">商务专线</p>
    <section class="addr-section">
      <p class="point">1.装机信息</p>
      <addressSearch class="clearfix addr" ref="addressSearch"
                     :endBool.sync="endBool"
                     :statusCd.sync = "prodList.statusCd"
                     :addressDataExchId.sync="addr.exchId"
                     :addressDataExch.sync="city_name"
                     :addressDataBelongRegionId.sync="addr.belongRegionId"
                     :addressDataAddressId.sync="addr.addressId"
                     :addressDataAddressDesc.sync="addr.addressDesc"
                     :tip_for_callBackFunc="tip_for_callBackFunc.addr.addressId"
                     @checkAddress="checkAddressId">
      </addressSearch>

    </section>
    <section>
      <p class="point">2.基本属性</p>
      <ul class="baseInfo clearfix">
        <li class="item"><label>下载速率：</label><span>{{selectData['231'][0].valueText}}</span></li>
        <li class="item"><label>对称或非对称：</label><span>{{selectData['230'][0].valueText}}</span></li>
        <li class="item"><label>上传速率：</label><span>{{selectData['229'][0].valueText}}</span></li>
        <li class="item"><label>产品类型：</label><span>{{selectData['233'][0].valueText}}</span></li>
        <li class="item"><label>甲乙种客户：</label><span>{{selectData['226'][0].valueText}}</span></li>
       <li class="item"><label>计费方式：</label><span>{{selectData['234'][0].valueText}}</span></li>
        <li class="item"><label>计费方法：</label><span>{{selectData['225'][0].valueText}}</span></li>
        <li class="item"><label>线路类型：</label>
          <select v-model="config[287][223]" @change="changeLineType" :disabled="!changeBool">
            <option v-for="item in selectData[223]" :value="item.valueId">{{item.valueText}}</option>
          </select>
        </li>
        <li class="item"><label>链接方式：</label><span>{{selectData['224'][0].valueText}}</span></li>
        <li class="item"><label>电路维护等级：</label><span>{{selectData['228'][0].valueText}}</span></li>
        <li class="item"><label>接入线类型：</label>
          <select v-model="config[287][235]" :disabled="!changeBool">
            <option v-for="item in selectData[235]" :value="item.valueId">{{item.valueText}}</option>
          </select>
        </li>
        <li class="item"><label>经光纤：</label><span>{{selectData['236'][0].valueText}}</span></li>
        <li class="item"><label>必须桥接：</label><span>{{selectData['237'][0].valueText}}</span></li>
        <li class="item"><label>经营性：</label><span>{{selectData['227'][0].valueText}}</span></li>
        <!--<li class="item"><label>细分接入方式：</label>-->
          <!--<select v-model="config[287][240]" :disabled="!changeBool">-->
            <!--<option v-for="item in selectData[240]" :value="item.valueId">{{item.valueText}}</option>-->
          <!--</select>-->
        <!--</li>-->
      </ul>
    </section>
    <!--<section>-->
    <!--<p class="point">3.拨号相关属性</p>-->
    <!--<ul class="numInfo clearfix">-->
    <!--<li class="item">-->
    <!--<label>是否绑定端口：</label>-->
    <!--<select v-model="value">-->
    <!--<option v-for="item in options" :value="item.value">{{item.label}}</option>-->
    <!--</select>-->
    <!--</li>-->
    <!--<li class="item">-->
    <!--<label>用户进程数目：</label>-->
    <!--<input /><i>&nbsp;&nbsp;(选填)</i>-->
    <!--</li>-->
    <!--</ul>-->
    <!--</section>-->
    <section>
      <p class="point">3.信息补录</p>
      <ul class="addInfo clearfix">
        <li class="item addInfo-theme">
          <label>主题：</label><input type="text" v-model="config[288][241]" :disabled="!changeBool" @blur="checkNull('288','241')" :class="{'red-border':tip_for_callBackFunc['288']['241']}" />
          <div v-if="tip_for_callBackFunc['288']['241']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['288']['241']}}</div>
        </li>
        <li class="item addInfo-themenpm">
          <label>合同协议号：</label><input type="text"  @blur="checkNull('288','266')" :class="{'red-border':tip_for_callBackFunc['288']['266']}" v-model="config[288][266]" :disabled="!changeBool" />
          <div v-if="tip_for_callBackFunc['288']['266']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['288']['266']}}</div>
        </li>
        <li class="item">
          <label>客户经理：</label><input type="text" v-model="config[288][247]" :disabled="!changeBool" @blur="checkNull('288','247')" :class="{'red-border':tip_for_callBackFunc['288']['247']}" />
          <div v-if="tip_for_callBackFunc['288']['247']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['288']['247']}}</div>
        </li>
        <li class="item">
          <label>客户经理电话：</label><input type="text" :class="{'red-border':tip_for_callBackFunc['288']['248']}" v-model="config[288][248]" @blur="checkPhone('288','248')" :disabled="!changeBool" />
          <div v-if="tip_for_callBackFunc['288']['248']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['288']['248']}}</div>
        </li>
        <li class="item">
          <label>建议PON模式：</label>
          <select v-model="config[288][251]" :disabled="!changeBool">
            <option v-for="item in selectData[251]" :value="item.valueId">{{item.valueText}}</option>
          </select>
        </li>
        <li class="item">
          <label>业务经理：</label><input type="text" v-model="config[288][249]" :disabled="!changeBool" @blur="checkNull('288','249')" :class="{'red-border':tip_for_callBackFunc['288']['249']}" />
          <div v-if="tip_for_callBackFunc['288']['249']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['288']['249']}}</div>
        </li>
        <li class="item">
          <label>业务经理电话：</label><input type="text" :class="{'red-border':tip_for_callBackFunc['288']['250']}" v-model="config[288][250]" @blur="checkPhone('288','250')" :disabled="!changeBool" />
          <div v-if="tip_for_callBackFunc['288']['250']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['288']['250']}}</div>
        </li>
        <li class="item">
          <label>业务区域：</label>
          <select v-model="config[288][242]" :disabled="!changeBool">
            <option v-for="item in selectData[242]" :value="item.valueId">{{item.valueText}}</option>
          </select>
          <div v-if="tip_for_callBackFunc['288']['242']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['288']['242']}}</div>
        </li>
        <li class="item item-deal">
          <label>经办人证件类型：</label>
          <select v-model="config[288][263]"
                  :disabled="!changeBool"
                   class = "idTypeClass"
                  :class="{'red-border':tip_for_callBackFunc['288']['263']}">
            <option v-for="item in selectData[263]" :value="item.valueId">{{item.valueText}}</option>
          </select>
          <div v-if="tip_for_callBackFunc['288']['263']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['288']['263']}}</div>
        </li>
        <li class="item item-deal">
          <label>经办人证件号码：</label><input type="text"  class = "idNumberClass" @blur="checkNull('288','265')" :class="{'red-border':tip_for_callBackFunc['288']['265']}" v-model="config[288][265]" :disabled="!changeBool" />
          <div v-if="tip_for_callBackFunc['288']['265']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['288']['265']}}</div>
        </li>
        <li class="item item-deal">
          <label>经办人地址：</label><input type="text"  @blur="checkNull('288','264')" :class="{'red-border':tip_for_callBackFunc['288']['264']}" v-model="config[288][264]" :disabled="!changeBool" />
          <div v-if="tip_for_callBackFunc['288']['264']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['288']['264']}}</div>
        </li>

      </ul>
    </section>
  </div>
</template>
<script>
  import addressSearch from '../../CloundLine/IPRAN/addressSearch.vue';
  export default{
    props:['prodList','payType','mainData_line','dataBool_line'],
    components:{
      addressSearch
    },
    data(){
      return{
        city_name:'',
        testData: '571',    //TEST
        endBool:false,
        prodListCopy:{},
        flag:false,
        changeBool:true,
        config:{},
        selectData:{},
        relation_data:{},
        showData:[],
        init:1,
        originalLineData:[],
        addr:{
          exchId:'',
          belongRegionId:'',
          addressId:'',
          addressDesc:''
        },
        oldAddr:{
          exchId:'',
          belongRegionId:'',
          addressId:'',
          addressDesc:''
        },
        tip_for_callBackFunc:{
          addr:{
            'exchId':'',
            'belongRegionId':'',
            'addressId':'',
            'addressDesc':''
          },
          '287':{

          },
          '288':{
            '241':'',
            '242':'',
            '247':'',
            '249':'',
            '248':'', //客户经理电话
            '250':'', //电话
            '265':'',
            '264':'',
            '263':'',//证件
            '266':'',
          }
        }
      }
    },
//    created(){
//      var self = this;
//      if(self.prodList){ //购物车过来
//        let lineConfig = [];
//        self.prodList.confList.forEach((v)=>{
//          if(v.productInfo && (v.productInfo.prodId == '287' || v.productInfo.prodId == '288')){
//            lineConfig = lineConfig.concat(v);
//          }
//        });
//        self.initializtion(lineConfig);
//      } else { //配置页面
//        axios.all([self.getConfigAxios()])
//          .then(axios.spread(function (res) {
//            let lineConfig = [];
//            res.data.data.forEach((v)=>{
//              if(v.productInfo && (v.productInfo.prodId == '287' || v.productInfo.prodId == '288')){
//                lineConfig = lineConfig.concat(v);
//              }
//            });
//            self.initializtion(lineConfig);
//          }));
//      }
//    },
    methods:{
      getConfigAxios(){
        var self = this;
        return axios({
          method:"post",
          url:'/netCloudOffer/productsService/productlistByParam',
//          data:{id:offerId}
          data:{id:'326'}
        });
      },
//      处理成main_data的形式
      initializtion(prodList){
        var self = this;
        self.prodListCopy = prodList;
        let lineConfig = [];
        prodList.confList.forEach((v)=>{
          if(v.productInfo && (v.productInfo.prodId == '287' || v.productInfo.prodId == '288')){
            lineConfig = lineConfig.concat(v);
          }
        });
        let config = {};
        let selectData = {};
        let relationArr = {};
        lineConfig.forEach((v)=>{
          if(v.productInfo){
            config[v.productInfo.prodId] = {};
            if(v.productInfo.prodId == '287'){
              config[v.productInfo.prodId]._item_p = self.addr;
            }
            v.offerProductObjectAttrList.forEach((attrItem)=>{
              config[v.productInfo.prodId][attrItem.objectAttrInfo.attrId] = attrItem.objectAttrInfo.defaultValue;

              if(attrItem.objectAttrValueList.length > 0){ //有下拉框
//                下拉框数据
                selectData[attrItem.objectAttrInfo.attrId] = [];
                attrItem.objectAttrValueList.forEach((valueItem)=>{
//                    默认值不为空  获取ID
                  if(config[v.productInfo.prodId][attrItem.objectAttrInfo.attrId] == valueItem.displayValue){
                    config[v.productInfo.prodId][attrItem.objectAttrInfo.attrId] = valueItem.attrValueId;
                  }
                  let item = {
                    valueId: valueItem.attrValueId,
                    valueText: valueItem.displayValue
                  };
                  selectData[attrItem.objectAttrInfo.attrId].push(item);
                })
              }
//              console.log(attrItem,'qqqqqqq');
              if (attrItem.attrRefDefList.length > 0) {
                relationArr[attrItem.attrRefDefList[0].refObject]=attrItem.attrRefDefList[0].attrId;
              }
            });
          }
        });
        self.config = config;
        self.selectData = selectData;
        self.relation_data = relationArr;
        self.flag = true;
//        self.flag = true;
//        如果已经价格审批的话  不能更改
        if(prodList.statusCd == '2' || prodList.statusCd == '3'){
          self.changeBool = false;
        }
//        如果已有配置
        if(JSON.stringify(prodList.prodConfList) != '{}' && self.endBool){
          self.init = 0; //购物车页面
          self.setConfig(prodList.prodConfList.productAttrList);
        } else {
          self.setMainDataLine();
        }
      },
//      如果已有配置
      setConfig(prodConfList){
        var self = this;
        var aa = {};
        prodConfList.forEach((v)=>{

          if(v.productId == '287' || v.productId == '288'){
            if(v.productId == '287'){
//              self.addr.exchId = v.exchId;
//              self.addr.belongRegionId = v.belongRegionId;
//              self.addr.addressId = v.addressId;
//              self.addr.addressDesc = v.addressDesc;
              aa.exchId = v.exchId;
              aa.belongRegionId = v.belongRegionId;
              aa.addressId = v.addressId;
              aa.addressDesc = v.addressDesc;
            }
            v.serviceAttrList.forEach((b)=>{
              if(b.attrId){
                self.config[v.productId][b.attrId] = b.attrValue;
              }
            });
          }
        });
        self.addr = aa;
      },
      setMainDataLine(){
        var self = this;
        self.showDataFun();
        let idType = '';
        for( let i=0; i<self.selectData[263].length; i++){
          if(self.config[288][263] == self.selectData[263][i].valueId){
            idType = self.selectData[263][i].valueText;
            break;
          }
        }
        let mainData_line = {
          parProdId:'287',
          main_data:self.config,
          config_data:self.showData,
          idType:idType
        };
        self.$emit('update:mainData_line',mainData_line);
        self.$emit('update:dataBool_line',true);

      },
      showDataFun(){
        var self = this;
//        规格
        let showBoxData = [
          {
            title:'下载速率',
            value: self.selectData['231'][0].valueText,
          },
          {
            title:'上传速率',
            value: self.selectData['229'][0].valueText,
          },
          {
            title:'线路类型',
            value:self.selectData[223][0].valueText,
          },
          {
            title:'接入线类型',
            value:self.selectData[235][0].valueText,
          }
        ];
        self.showData = showBoxData;
      },
//      装机地址发生编变化
      changeAddr(){
        var self = this;
        if(self.addr.exchId && self.addr.addressId && JSON.stringify(self.addr) != JSON.stringify(self.oldAddr)){
          axios({
          method:'post',
          url:"/netCloudOrder/addressService/queryResCoverInfo",
          data:{
            city:self.addr.exchId,
            resCoverId:self.addr.addressId
          }
          }).then(res=>{
            self.oldAddr = JSON.parse(JSON.stringify(self.addr));
//                线路类型223   接入线类型235  细分接入方式240
//              当“线路类型”为FTTH线路，则“细分接入方式”为FTTH_GPON或者FTTH_EPON，其余为非FTTH；
            let originalData = res.data.data;
            self.originalLineData = res.data.data;
//              默认 self.init=1时  是初始化  =0时是获取已有配置值
            if(!self.config['287']['223']){
              self.config['287']['223'] = originalData[0].lineType;
            }
            self.selectData['223'] = [];
            originalData.forEach((v)=>{
              let item = {
                valueId:'',
                valueText:v.lineType
              }
              self.selectData['223'].push(item);
            });
            self.changeLineType(); //细分接入方式跟随改变   接入线类型改变
          }).catch(err=>{
            self.oldAddr = {
              exchId:'',
              belongRegionId:'',
              addressId:'',
              addressDesc:''
            };
          });
        }
      },
//      当线路类型发生变化时
      changeLineType(){
        var self = this;
        if(self.config['287']['223'] == 'FTTH线路'){
          self.selectData['240'] = [
            {
              valueId:'',
              valueText:'FTTH_GPON',
            },
            {
              valueId:'',
              valueText:'FTTH_EPON',
            }
          ];
        } else {
          self.selectData['240'] = [
            {
              valueId:'',
              valueText:'非FTTH',
            }
          ];
        }
        if(!self.config[287][240]){
          self.config[287][240] = self.selectData[240][0].valueText;
        }
//        接入线类型
        self.selectData['235'] = [];
        self.originalLineData.forEach((v)=>{
          if(self.config[287][223] == v.lineType){
            if(!self.config[287][235]){
              self.config[287][235] = v.kdConn;
            }
            self.selectData['235'].push({valueText:v.kdConn,valueId:''});
          }
        });
        self.$set(self.selectData,self.selectData);
      },
//    验证号码
      checkPhone:function(key1,key2){
        if (!this.config[key1][key2]) {
          this.callBackFunc(key1,key2,'联系电话不能为空');
        }else{
          let re1 = /^1\d{10}$/;
          let re2 = /^0\d{2,3}-?\d{7,8}$/;
          if (!re1.test(this.config[key1][key2]) && !re2.test(this.config[key1][key2])) {
            this.callBackFunc(key1,key2,'电话格式有误');
          } else {
            this.callBackFunc(key1,key2,'');
          }
        }
      },
      checkNull(key1,key2){
        if (!this.config[key1][key2]) {
          this.callBackFunc(key1,key2,'不能为空');
        } else {
          this.callBackFunc(key1,key2,'');
        }
      },
      checkAddressId(key1,key2){
        if(!this.addr.addressId){
          this.callBackFunc(key1,key2,'请查询选择正确的地址');
        } else {
          this.callBackFunc(key1,key2,'');
        }
      },
      /*提示语和红边框提示*/
      callBackFunc:function(key1,key2,tip){
        let _this = this;
        _this.tip_for_callBackFunc[key1][key2] = tip;
      },
      //提交表单前检验是否有错误
      hasErrorWhenSubmit(){
        let _this = this;
        _this.checkNull('288','241');
        _this.checkNull('288','247');
        _this.checkNull('288','249');
        _this.checkNull('288','242');
        _this.checkNull('288','263');
        _this.checkNull('288','266');
        _this.checkNull('288','265');
        _this.checkAddressId('addr','addressId');
        _this.checkPhone('288','250');
        _this.checkPhone('288','248');
        console.log(_this.tip_for_callBackFunc)
        for(let key1 in _this.tip_for_callBackFunc){
          for(let key2 in _this.tip_for_callBackFunc[key1]){
            if(_this.tip_for_callBackFunc[key1][key2]){
              return true;
            }
          }
        }
        return false;
      },
//      联动
      relatedFun(attrId,objAttVal){
//        当前的这个的属性的attrId  和 objAttVal 属性中文值
        var self = this;
        let targetId = '';
        for(let key in self.relation_data){
          if(key == attrId){
            targetId = self.relation_data[attrId];
            break;
          }
        }
        let data = {
          "tarAttrId":targetId +'',//对象属性值ID
          "linkageInfoList": [
            {
              "attrId":attrId +'',//属性标识ID
              "objAttVal": objAttVal +''//对象属性选用值(页面选择的参数值,cpu值)
            }
          ]
        };
        self.oldAddr = JSON.parse(JSON.stringify(self.addr));
        axios({
          method:"post",
          url:'/netCloudOffer/productsService/getLinkageInfo',
          data:data
        }).then(res=>{
          self.selectData[targetId] = [];
          let bool = true;
          if(res.data.objectAttrValueList && res.data.objectAttrValueList.length > 0){
            res.data.objectAttrValueList.forEach((v)=>{
              if(self.config['288'][targetId] == v.attrValueId){
                bool = false;
              }
              self.selectData[targetId].push({
                valueId: v.attrValueId,
                valueText: v.displayValue
              });
            });
          }
          if(bool){
            if(self.selectData[targetId].length > 0){
              self.config['288'][targetId] = self.selectData[targetId][0].valueId;
            } else {
              self.config['288'][targetId] = '';
            }
          }
          self.$set(self.selectData[targetId],self.selectData[targetId]);

        }).catch(err=>{})
      }
    },
    watch:{
      config:{
        handler() {
          var self = this;
          self.setMainDataLine();
        },
        deep:true
      },
//      装机地址发生变化
      addr:{
        handler() {
          var self = this;
          self.config['287']._item_p = self.addr;
          //          tarAttrId  联动目标attrid   linkageInfoList当前的这个的属性的attrId  和 objAttVal 属性中文值
          if(self.addr.exchId != self.oldAddr.exchId && self.city_name!=''){
            self.relatedFun('283',self.city_name);
          }
//          self.changeAddr();
        },
        deep:true
      },
//      city_name:{
//        handler() {
//          var self = this;
//          self.config['287']._item_p = self.addr;
//          //          tarAttrId  联动目标attrid   linkageInfoList当前的这个的属性的attrId  和 objAttVal 属性中文值
//          if(self.addr.exchId != self.oldAddr.exchId){
//            self.relatedFun('283',self.city_name);
//          }
////          self.changeAddr();
//        }
//      },
//      付费方式的变化
      payType:{
        handler() {
          var self = this;
          self.selectData['252'].forEach((v)=>{
            if(v.valueText == self.payType){
              self.config['287']['252'] = v.valueId;
            }
          });
        }
      },
      endBool:{
        handler() {
          var self = this;
          if(JSON.stringify(self.prodListCopy.prodConfList) != '{}' && self.endBool){
            self.init = 0; //购物车页面
            self.setConfig(self.prodListCopy.prodConfList.productAttrList);
          } else {
            self.setMainDataLine();
          }
        }
      }
    }
  }

</script>
<style scoped lang="less">
  a:focus{
    text-decoration: none;
  }
  p,label,ul,li{
    margin: 0;
    padding: 0;
  }
  i{
    font-style: normal;
    color: #666;
  }
  .addr-section{
    position: relative;
    z-index: 99;
    /deep/ .has-tip{
      bottom: -15px;
    }
  }
  .has-tip{
    position:absolute;
    left:0;
    bottom:5px;
    width:300px;
    font-size: 12px;
    color:red;
    line-height:16px;
    word-wrap: break-word;
    word-break: normal;
    text-align: center;
    i{
      color:red;
    }
  }
  .red-border{
    border:1px solid red;
  }
  .line{
    border:#e8e8e8 1px solid;
    font-size: 14px;
    width:1200px;
    margin: 10px auto;
  }
  .title{
    color: #0099ff;
    background: #f1f6fa;
    line-height: 45px;
    font-size: 18px;
    padding-left: 10px;
    font-weight: bold;
  }
  section{
    padding: 5px 20px 0 20px;
    line-height: 40px;
  }
  select,input,option{
    line-height: 30px;
    height: 30px;
    width: 45%;
    font-size: 14px;
  }
  .point{
    color: #333;
    line-height: 50px;
    font-weight: bold;
    font-size: 16px;
  }
  .addr{
    margin-left: -122px;
  }
  .item{
    float: left;
    width: 25%;
    padding-bottom: 10px;
    font-size: 0;
    position: relative;
    label{
      color: #666;
      font-size: 14px;
    }
    span{
      font-size: 14px;
    }
  }
  .addInfo{
    .item{
      width: 33.33%;
    }
    label{
      width: 120px;
    }
    select,input{
      width: 220px;
    }
    .addInfo-theme{
      width: 66.66%;
      input{
        width: 604px;
      }
    }
  }
  .out-for-tip{
    position:relative;
    padding-bottom: 15px;
  }

</style>
