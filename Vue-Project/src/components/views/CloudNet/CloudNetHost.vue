<!-- 云主机配置组件 -->
<template>
    <div class="w1200">
      <!--产品名称-->
      <div class="product_tit">云主机</div>
      <!--261客户基本信息-->
      <div class="base_info">
        <p class="title">客户基本信息</p>
        <div class="select_account" v-if="!isHide">
          选择账号：
          <select v-model="existAccount.current" @change="changeMainInfo(existAccount.current)" :disabled="cant_edit">
            <option v-for="(item,index) in existAccount.list" :value="index">{{item['175']}}</option>
          </select>
          <a v-if="!cant_edit || !existBool" href="javascript:;" class="new_accout" @click="formEmpty()">新建账号</a>
        </div>
        <div class="content">
          <ul class="clearfix">
            <li class="clearfix">
              <span class="attr_name">管理员用户名</span>
              <div class="attr_val">
                <input :class="{'red-border':tip_for_callBackFunc['261']['170']}" :disabled="cant_edit || existBool" type="text" v-model="main_data['261']['170']"   @blur="checkUserName('261','170')"/>
                <div v-if="tip_for_callBackFunc['261']['170']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['261']['170']}}</div>
              </div>
            </li>
            <li class="clearfix">
              <span class="attr_name">密码</span>
              <div class="attr_val">
                <input :class="{'red-border':tip_for_callBackFunc['261']['171']}" :disabled="cant_edit || existBool" v-bind:type="[main_data['261']['171']!==''? 'password':'text']" v-model="main_data['261']['171']" @focus="setTypePassword($event)" @blur="checkPassword('261','171')"/>
                <div v-if="tip_for_callBackFunc['261']['171']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['261']['171']}}</div>
              </div>
            </li>
            <li class="clearfix">
              <span class="attr_name">行业标识</span>
              <div class="attr_val">
                <input :class="{'red-border':tip_for_callBackFunc['261']['172']}" :disabled="cant_edit || existBool" type="text"  v-model="main_data['261']['172']" @blur="checkNull('261','172')"/>
                <div v-if="tip_for_callBackFunc['261']['172']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['261']['172']}}</div>
              </div>
            </li>
            <li class="clearfix">
              <span class="attr_name">联系人姓名</span>
              <div class="attr_val">
                <input :class="{'red-border':tip_for_callBackFunc['261']['173']}" :disabled="cant_edit || existBool" type="text"  v-model="main_data['261']['173']" @blur="checkNull('261','173')"/>
                <div v-if="tip_for_callBackFunc['261']['173']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['261']['173']}}</div>
              </div>
            </li>
            <li class="clearfix">
              <span class="attr_name">联系人电话</span>
              <div class="attr_val">
                <input :class="{'red-border':tip_for_callBackFunc['261']['174']}" :disabled="cant_edit || existBool" type="text"  v-model="main_data['261']['174']"  @blur="checkPhone('261','174')"/>
                <div v-if="tip_for_callBackFunc['261']['174']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['261']['174']}}</div>
              </div>
            </li>
            <li class="clearfix">
              <span class="attr_name">邮箱地址</span>
              <div class="attr_val">
                <input :class="{'red-border':tip_for_callBackFunc['261']['175']}" :disabled="cant_edit || existBool" type="text"  v-model="main_data['261']['175']"  @blur="checkEmail('261','175')"/>
                <div v-if="tip_for_callBackFunc['261']['175']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['261']['175']}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--241产品信息-->
      <div class="out-of-product-part">
        <div class="out-of-product-part-l">
          <div class="product_part">
            <div class="product_bar clearfix">
              <span class="attr_name">开通平台</span>
              <div class="attr_val">
                <ul class="val_list clearfix">
                  <li v-for="(item,index) in select_data['146']" :class="{active:main_data['241']['146']==index}" @click="cant_edit ? '':changeActive(index,main_data,'241','146',item,false)">{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">资源池</span>
              <div class="attr_val">
                <ul class="val_list clearfix">
                  <li v-for="(item,index) in select_data['145']" :class="{active:main_data['241']['145']==index}" @click="cant_edit ? '':changeActive(index,main_data,'241','145',item,false)">{{item}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="product_part">
            <div class="product_bar clearfix">
              <span class="attr_name">CPU(虚拟核数)</span>
              <div class="attr_val">{{select_data['147'][main_data['241']['147']]}}C</div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">内存</span>
              <div class="attr_val">{{select_data['148'][main_data['241']['148']]}}G</div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">镜像</span>
              <div class="attr_val" v-if="mirror_show==true">
                <select :disabled="cant_edit" class="jx_select" v-model="main_data['241']['207']" @change="changeName(main_data['241']['207'])">
                  <option v-for="option in mirror_type" :value="option">{{option}}</option>
                </select>
                <select :disabled="cant_edit" class="jx_version" v-model="main_data['241']['153']">
                  <option v-for="(option,index) in mirror_version" :value="index">{{option}}</option>
                </select>
              </div>
              <div class="attr_val" v-if="mirror_show==false">
                <select :disabled="cant_edit" class="jx_version" v-model="main_data['241']['153']">
                  <option v-for="(option,index) in mirror_version" :value="index">{{option}}</option>
                </select>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">磁盘</span>
              <div class="attr_val">
                <div class="disk">
                  系统盘&nbsp;&nbsp;{{select_data['149'][main_data['241']['149']]}}&nbsp;&nbsp;{{main_data['241']['183']}}G
                </div>
                <div class="data_disk">
                  <div class="disk">
                    数据盘&nbsp;&nbsp;{{select_data['150'][main_data['241']['150']]}}&nbsp;&nbsp;{{main_data['241']['151']}}G
                  </div>
                </div>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">虚拟私有云</span>
              <div class="attr_val">{{select_data['210'][main_data['241']['210']]}}</div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">带宽</span>
              <div class="attr_val">{{main_data['241']['154']}}Mb</div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<style scoped lang="less">
  /**选择账户**/
  .select_account{
    font-size:14px;
    margin-bottom:10px;
    select{
      margin-right:10px;
      width:200px;
      height:30px;
    }
    .new_accout{
      color:#2883D6;
      font-size:14px;
    }
  }
  .w1200{width:1200px;margin:0 auto;border:1px solid #e8e8e8;margin-top:20px;}
  .product_tit{background:#F1F6FA;color:#09f;padding:10px;font-size:18px;font-weight:bold;}
  .has-tip{
    position:absolute;
    left:0;
    top:30px;
    width:300px;
    font-size: 12px;
    color:red;
    line-height:16px;
    word-wrap: break-word;
    word-break: normal;
  }
  .jx_select,.jx_version{height:30px;}
  .whiteBg{background:white;}
  .linH30{line-height:30px;}
  p,table,ul{margin:0;padding:0;}
  .base_info{
    padding:0 10px;
    .title{
      font-weight:bold;
      font-size:16px;
      padding:15px 0;
    }
    .content{
      background:#f2f2f2;
      padding:20px 15px 10px;
      ul{
        width:1170px;
        li{
          float:left;
          width:390px;
          margin-bottom:15px;
          .attr_name{
            width:120px;
            line-height:30px;
            margin-right:5px;
            float:left;
            text-align:right;
          }
          .attr_val{
            float:left;
            width:200px;
            height:30px;
            position: relative;
            input{
              width:200px;
              height:30px;
            }
          }
        }
      }
    }
  }
  .out-of-product-part{
    padding:0 20px;
  }
  .out-of-product-part:after{
    content: ' ';
    display: block;
    overflow: hidden;
    height: 0;
    font-size: 0;
    clear: both;
  }
  .out-of-product-part-l{
    .product_part:first-child{
      border-top:none;
      padding-top:0;
    }
  }
  .out-of-product-part-r{
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
  .configure_detail{
    background:#efefef;
    .title{
      height:40px;
      line-height:40px;
      color:#333;
      padding:0 15px;
      background:#e5e5e5;
      font-size:16px;
    }
    .content{
      padding:10px 15px;
      .content_bar{
        line-height:30px;
        .attr{
          display:inline-block;
          width:70px;
          color:#999;
        }
        .val{
          display:inline-block;
          width:182px;
        }
      }
    }
    .conf-save{
      width:100%;
      height:60px;
      padding:8px 0;
      border-top: 1px solid #e5e5e5;
      line-height: 40px;
      text-align: center;
    }
  }
  .product_part{
    border-top:1px solid #e8e8e8;
    padding-top:5px;
    padding-bottom:20px;
    .product_bar{
      padding-top:15px;
      .attr_name{
        float:left;
        display:block;
        width:120px;
        margin-right:10px;
        text-align:right;
        line-height:30px;
        font-weight:bold;
      }
      .attr_val{
        float:left;
        line-height:30px;
        width:798px;
        .input_wrap{
          display:inline-block;
          min-width:100px;
          margin-right:20px;
          input{
            margin-right:5px;
          }
        }
        .input_wrap:first-child{
          input[type=radio]{
            margin-left:0;
          }
        }
        .attr_list{
          li{
            height:30px;
            margin-top:15px;
            span{
              float:left;
              width:115px;
            }
            select{
              float:left;
              min-width:100px;
              height:30px;
            }
            .attr_val{
              float:left;
              height:30px;
              width:157px;
              position:relative;
              input{
                height:30px;
              }
            }
          }
          li.bandwidth-setted{
            span{
              margin-left:15px;
              width:170px;
            }
          }
        }
      }
    }
  }
  .val_list{
    li{
      float:left;
      margin-left:5px;
      background:#E8E8E8;
      width:100px;
      text-align:center;
      line-height:30px;
      color:#666;
      cursor: pointer;
      margin-bottom:5px;
    }
    li:nth-child(7n+1){
      margin-left:0;
    }
    li.active{
      background:#FF8200;
      color:white;
    }
  }
  .disk{
    select,input{
      height:30px;
    }
  }
  .data_disk{
    position:relative;
    .disk{
      margin-top:5px;
    }
    .delete_disk{
      color:#2883D6;
      position:absolute;
      left:370px;
      bottom:10px;
      white-space:nowrap;
      cursor:pointer;
    }
  }
  .user_name{
    span{
      display:inline-block;
      width:115px;
    }
  }
  .pass_tip{
    float:left;
    line-height:30px;
    color:#999;
    margin-left:10px;
  }
</style>
<script>
  export default{
    props:[
      'mainData_host','dataBool_host','payType','cant_edit','payNum','prodInstId'
    ],
    data(){
      return {
        emailList:{},//存储邮箱地址{email:integrationId}
        accountProdInstId:{},//账号{integrationId:prodInstId}
        isHide:true,//账号选择条是否隐藏
        existAccount:{//账号下拉对象
          current:'',//当前值
          list:{//下拉存储主信息

          }
        },//存储账户的列表对象
        existBool:false,//是否已经存在值
        CUST_ID:'',//客户ID
        regionIdStr:'',//资源池接口调用值
        readValBool:false,//是否是有配置信息
       /* cant_edit:false,//判断所有属性能不能修改*/
        offerId:'',//云产品固定商品id
        host_data:{},//传给父级的值
        config_data:[],//传给父配置文字值
        main_data:{
          '241':{
            '143':'',//订购类型
            '145':'',//资源池
            '146':'',//开通平台
            '147':'',//CPU
            '148':'',//内存
            '149':'',//系统盘
            '183':'',//系统盘大小
            '150':'',//数据盘类型
            '151':'',//数据盘大小
            '152':'',//镜像类型
            '153':'',//镜像
            '154':'',//带宽
            '155':'',//VPC
            '156':'',//账号
            '157':'',//密码
            '163':'',//收费方式
            '165':'',//虚拟私有云名称
            '166':'',//VPC申请起始IP
            '167':'',//VPC申请终止IP
            '164':'',//订购时长
            '179':'',//订购时长单位
            '180':'',//订购数量
            '207':'',//操作系统OS_STYLE
            '208':'',//操作系统版本
            '209':'',//付费账号
            '210':'',//vpc
            '_item_p':{
              'amount':'',
              'num':''
            }
          },
          '261':{
            '169':'',//企业账号
            '170':'',//企业管理员用户名
            '171':'',//密码
            '172':'',//行业标识
            '173':'',//企业联系人姓名
            '174':'',//联系电话
            '175':'',//邮箱地址
            '176':'',//企业通信地址
            '177':'',//企业归属地编码
            '178':''//企业名称
          }
        },
        select_data:{
          '143':{},//订购类型
          '145':{},//资源池
          '146':{},//开通平台
          '147':{},//CPU
          '148':{},//内存
          '149':{},//系统盘
          '150':{},//数据盘类型
          '152':{},//镜像类型
          '163':{},//收费方式
          '210':{},//vpc
          '179':{}//订购时长单位
        },
        buy_type_itemCd:'',
        resource_pool:[],//资源池列表
        //镜像
        mirror_type:[],
        mirror_version:{},
        mirror_data:{},
        mirror_show:true,
        images_version_data:{},
        copy_images_data:{},
        relation_data:{},
        tip_for_callBackFunc:{
          '261':{
            '169':'',//企业账号
            '170':'',//企业管理员用户名
            '171':'',//密码
            '172':'',//行业标识
            '173':'',//企业联系人姓名
            '174':'',//联系电话
            '175':'',//邮箱地址
            '176':'',//企业通信地址
            '177':'',//企业归属地编码
            '178':''//企业名称
          }
        }
      }
    },
    watch:{
      main_data:{
        handler(val,oldVal){
          var _this=this;
          var configArr=[
            {title:'开通平台',value:_this.select_data['146'][_this.main_data['241']['146']]+' '+_this.select_data['145'][_this.main_data['241']['145']]},
            {title:'规格',value:_this.select_data['147'][_this.main_data['241']['147']]+'核 | '+_this.select_data['148'][_this.main_data['241']['148']]+'GB'},
            {title:'镜像',value:_this.main_data['241']['207']+' '+_this.mirror_version[_this.main_data['241']['153']]},
            {title:'磁盘',value:_this.select_data['150'][_this.main_data['241']['150']]+' '+_this.main_data['241']['151']+'G'},
            {title:'带宽',value:_this.main_data['241']['154']+'M'}
          ];
          _this.config_data=configArr;
          var obj={
            'parProdId':'261',
            'main_data':_this.main_data,
            'config_data':_this.config_data,
          };
          _this.host_data=obj;
         //console.log("_this.main_data['241']['164']:",_this.main_data['241']['164']);
          _this.$emit('update:mainData_host',_this.host_data);
        },
        // 深度观察
        deep:true
      },
      //      付费方式的变化
      payType(){
          var self = this;
          if(self.payType=='包月'){
            self.main_data['241']['163']='230';
            self.getPriceInFatherTemp();
          }else if(self.payType=='包年'){
            self.main_data['241']['163']='229';
            self.getPriceInFatherTemp();
          }
          //console.log('self.payType222:',self.main_data['241']['163'])
      },
      //付费账户
      payNum(){
        var self = this;
        self.main_data['241']['280']=self.payNum;
        //console.log('self.payNum.watch:',self.main_data['241']['280'])
      }
    },
    mounted(){
      let _this = this;
    },
    methods: {
      //初始化
      initializtion(prodList){
        let _this = this;
        _this.offerId=this.$route.query.offerId?this.$route.query.offerId:prodList.offerId;
        //云产品基本属性
        let baseInfo;
        let info;
        let product_list_by_param = prodList.confList;
        let prodConfList = prodList.prodConfList;
        for(var index in product_list_by_param){
          if(product_list_by_param[index].productInfo.prodId=='261'){
            baseInfo=product_list_by_param[index].offerProductObjectAttrList;
          }else if(product_list_by_param[index].productInfo.prodId=='241'){
            info = product_list_by_param[index].offerProductObjectAttrList;
          }
        }
        let baseInfoObj = {};
        for (let i in baseInfo) {
          let attrId = baseInfo[i].objectAttrInfo.objAttrId;
          baseInfoObj[attrId] = baseInfo[i].objectAttrInfo.defaultValue;
        }
        _this.main_data['261'] = baseInfoObj;

        /**新增功能:先获取用户基本信息**/
        _this.getHostInfo();

        //配置属性
        let infoObj = {};//基本属性对象
        let infoListObj = {};//联动列表的对象
        let relationArr = {};//联动关系
        let systemDataObj = {};//系统盘下拉字符串和数值的分开
        let imagesVal='';
        for (let i in info) {
          let attrId = info[i].objectAttrInfo.objAttrId;
          infoObj[attrId] = info[i].objectAttrInfo.displayValue;
          if (info[i].objectAttrValueList.length > 0) {
            let perObj = {};
            for (let k in info[i].objectAttrValueList) {
              if (info[i].objectAttrValueList[k].objAttrValue == info[i].objectAttrInfo.defaultValue) {
                infoObj[attrId] = info[i].objectAttrValueList[k].attrValueId;
              }

              perObj[info[i].objectAttrValueList[k].attrValueId] = info[i].objectAttrValueList[k].displayValue;
            }

            //镜像的初始化
            if (info[i].objectAttrInfo.attrId == 152) {
              imagesVal=info[i].objectAttrInfo.defaultValue;
            }
            if(info[i].objectAttrInfo.attrId == 145){
              _this.resource_pool=info[i].objectAttrValueList;
            }
            infoListObj[attrId] = perObj;
          }else if(info[i].objectAttrValueList.length==0){
            infoObj[attrId] = info[i].objectAttrInfo.displayValue;
            infoObj['164']=12;
            //根据版本不同，数据盘大小和带宽大小不同
            if(_this.offerId=='321'){
              infoObj['151']=200;
              infoObj['154']=2;
            }else if(_this.offerId=='322'){
              infoObj['151']=300;
              infoObj['154']=5;
            }else if(_this.offerId=='323'){
              infoObj['151']=500;
              infoObj['154']=5;
            }else if( _this.offerId=='326'){
              infoObj['151']=500;
              infoObj['154']=5;
            }else if(_this.offerId=='325'){
              infoObj['151']=200;
              infoObj['154']=5;
            }else if(_this.offerId=='324'){
              infoObj['151']=100;
              infoObj['154']=2;
            }
          }
          if (info[i].attrRefDefList.length>0) {
            relationArr[info[i].attrRefDefList[0].refObject]=info[i].attrRefDefList[0].attrId;
          }
        }
        infoObj._item_p = {
          amount:'',
          num:infoObj['180']
        };
        _this.main_data['241'] = infoObj;
        _this.select_data = infoListObj;
        _this.relation_data = relationArr;
        _this.ranger_val = parseInt(_this.main_data['241']['154']);
        var configArr=[
          {title:'开通平台',value:_this.select_data['146'][_this.main_data['241']['146']]+' '+_this.select_data['145'][_this.main_data['241']['145']]},
          {title:'规格',value:_this.select_data['147'][_this.main_data['241']['147']]+'核 | '+_this.select_data['148'][_this.main_data['241']['148']]+'GB'},
          {title:'镜像',value:_this.main_data['241']['207']+' '+_this.mirror_version[_this.main_data['241']['153']]},
          {title:'磁盘',value:_this.select_data['150'][_this.main_data['241']['150']]+' '+_this.main_data['241']['151']+'G'},
          {title:'带宽',value:_this.main_data['241']['154']+'M'}
        ];
        _this.config_data=configArr;
        var obj={
          'parProdId':'261',
          'main_data':_this.main_data,
          'config_data':_this.config_data
        };
        _this.host_data=obj
        _this.$emit('update:mainData_host',_this.host_data);

        //当在购物车页面，调用getCartConf函数会进行重新配置
        if(prodConfList.productAttrList != null && prodConfList.productAttrList.length != undefined && prodConfList.productAttrList.length != 0){
           _this.$emit('update:dataBool_host',false);
            _this.getCartConf(prodConfList);
        }
        for(var i in _this.resource_pool){
          if(_this.resource_pool[i].attrValueId==_this.main_data['241']['145']){
            _this.regionIdStr=_this.resource_pool[i].objAttrValue;
          }
        }
        _this.getMirrorList(imagesVal);
        _this.$emit('update:dataBool_host',true);
      },
      //新建主产品信息
      formEmpty(){
        this.existBool=false;
        for(let key in this.main_data['261']){
          this.main_data['261'][key]='';
          this.callBackFunc('261',key,'');
        }
        this.existAccount.current='';
        this.$emit('update:prodInstId','');
      },
      //是否有云主机账户
      getHostInfo(){
        var _this=this;
        if(window.sessionStorage && window.sessionStorage.getItem('cust')){
          var cust = window.sessionStorage.getItem('cust');
          _this.CUST_ID = JSON.parse(cust).CUST_ID;
        }
        axios({
          method: "post",
          url: '/netCloudOrder/cartItemAttrService/queryCartItemAttrByCustId',
          data: {"custId":_this.CUST_ID}
        }).then(res => {
          if (res.data.code == 0) {
            var obj={};
            if(res.data.data.length>0){
              _this.existBool=true;
              _this.isHide=false;
              let numindex=-1;
              let objAll={};
              let emailObj={};
              for(let item of res.data.data){
                numindex++;
                for(let perItem of item.productAttrList){
                  if(perItem.productId=='261'){
                    let obj={};
                    for(let value of perItem.serviceAttrList){
                      if(numindex==0){
                        _this.existAccount.current=perItem.integrationId;
                      }
                      obj[value.attrId]=value.attrValue;
                      _this.accountProdInstId[perItem.integrationId]=perItem.prodInstId;
                      if(value.attrId=='175'){
                        emailObj[value.attrValue]=perItem.integrationId;
                      }
                    }
                    objAll[perItem.integrationId]=obj;
                  }
                }
              }
              if(_this.readValBool){
                if(_this.main_data['261']['175']){
                  if(!_this.emailList.hasOwnProperty(_this.main_data['261']['175'])){
                    _this.existAccount.current='';
                  }else{
                    _this.existAccount.current=_this.emailList[_this.main_data['261']['175']];
                  }
                }
              }
              _this.existAccount.list=objAll;
              _this.emailList=emailObj;
              //console.log(_this.accountProdInstId)
              //_this.prodInstId=this.accountProdInstId[this.existAccount.current];
              _this.$emit('update:prodInstId',_this.accountProdInstId[_this.existAccount.current]);
              _this.main_data['261']=JSON.parse(JSON.stringify(_this.existAccount.list[_this.existAccount.current]));
            }

          } else {
            this.$alert(res.data.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                return false;
              }
            });
          }
        }).catch(err => {
        })
      },
      //改变云主机账户信息
      changeMainInfo(str){
        this.existBool=true;
        this.$set(this.main_data,'261',JSON.parse(JSON.stringify(this.existAccount.list[this.existAccount.current])));
        this.$emit('update:prodInstId',this.accountProdInstId[this.existAccount.current]);
        for(let key in this.main_data['261']){
          this.callBackFunc('261',key,'');
        }
      },
      //checkbox模拟radio，点击赋值
      setCheckBox(index,key){
        this.main_data['241'][key] = index;
      },
      //改变用户名
      changeName(val){
        //this.mirror_data
        let obj={};
        for(let i in this.mirror_data[val]){
          if(!this.readValBool) {
            if (i == 0) this.main_data["241"]["153"] = this.mirror_data[val][i].id;
          }
          obj[this.mirror_data[val][i].id]=this.mirror_data[val][i].name;
        }
        this.mirror_version=obj;
        //console.log('镜像：',this.main_data['241']['207'],this.mirror_version[this.main_data['241']['153']]);
        if(val=='Windows'){
          this.main_data['241']['156']='administrator';
        }else{
          this.main_data['241']['156']='root';
        }

        var configArr=[
          {title:'开通平台',value:this.select_data['146'][this.main_data['241']['146']]+' '+this.select_data['145'][this.main_data['241']['145']]},
          {title:'规格',value:this.select_data['147'][this.main_data['241']['147']]+'核 | '+this.select_data['148'][this.main_data['241']['148']]+'GB'},
          {title:'镜像',value:this.main_data['241']['207']+' '+this.mirror_version[this.main_data['241']['153']]},
          {title:'磁盘',value:this.select_data['150'][this.main_data['241']['150']]+' '+this.main_data['241']['151']+'G'},
          {title:'带宽',value:this.main_data['241']['154']+'M'}
        ];
        this.config_data=configArr;
        var obj1={
          'parProdId':'261',
          'main_data':this.main_data,
          'config_data':this.config_data
        };
        this.host_data=obj1;
        this.$emit('update:mainData_host',this.host_data);
      },
      //镜像联动版本
      imageFun(){
        let obj={};
        for(let i in this.copy_images_data[val]){
          if(i==0){this.images_val_txt=this.copy_images_data[val][i].name};
          obj[this.copy_images_data[val][i].id]=this.copy_images_data[val][i].name;
        }
        this.images_version_data=obj;
      },
      //选项点击事件
      changeActive:function(index,obj,attrId,attrValId,val){
        let _this=this;
        obj[attrId][attrValId]=index;
        for(let i in _this.relation_data){
          if(attrValId==i){
            let dataObj={
              "tarAttrId":_this.relation_data[attrValId]+'',//对象属性值ID
              "linkageInfoList": [
                {
                  "attrId":attrValId+'',//属性标识ID
                  "objAttVal": val+''//对象属性选用值(页面选择的参数值,cpu值)
                }
              ]
            };
            axios({
              method:"post",
              url:'/netCloudOffer/productsService/getLinkageInfo',
              data:dataObj
            }).then(res=>{
              if(res.data.code == 0) {
                let mainData=res.data.objectAttrValueList;
                let objData = {};
                let newAttrId = res.data.tarAttrId;
                for(let i in mainData){
                  if(!_this.readValBool){
                    if (i == 0) {
                      _this.main_data[attrId][newAttrId] = mainData[i].attrValueId;
                    }
                  }else{
                    let flag_curList_include = false;
                    for(let n in mainData){
                      if(mainData[n].attrValueId == _this.main_data[attrId][newAttrId]){
                        flag_curList_include = true;
                      }
                    }
                    if(!flag_curList_include && i == 0){
                      _this.main_data[attrId][newAttrId] = mainData[i].attrValueId;
                    }
                  }

                  objData[mainData[i].attrValueId] = mainData[i].objAttrValue;
                }
                _this.select_data[newAttrId] = objData;
                //_this.getPrice(true);
              }else{
                this.$alert(res.data.msg, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    return false;
                  }
                });
              }
            }).catch(err=>{

            })
          }
        }
        if(attrValId=='152'){
          if(val=='公共镜像'){
            _this.mirror_show=true;
            _this.getMirrorList('gold');
          }else if(val=='私有镜像'){
            _this.mirror_show=false;
            _this.getMirrorList('private');
          }
        };
        if(attrValId=='145'){
          var val='';
          for(var key in _this.select_data['152']){
            if(_this.main_data['241']['152']==key){
              val=_this.select_data['152'][key];
              if(val=='公共镜像'){
                _this.mirror_show=true;
                _this.getMirrorList('gold');
              }else if(val=='私有镜像'){
                _this.mirror_show=false;
                _this.getMirrorList('private');
              }
            }
          }
        }
      },
      setTypePassword(event){
        let el = event.currentTarget;
        $(el).attr('type','password');
      },
      //获取产品价格
      getPrice:function(flag_getP_182){
        let that = this;
        if(that.prodList) {
          //判断是否为购物车配置对应的价格
          if (flag_getP_182) {
            that.getPriceAxios();
          }
        }else{
          that.getPriceAxios();
        }
      },
      getPriceAxios:function(){
        let that = this;
        let confList = {
          "productInfoList": [// 产品信息集合
            {
              "productInfo": {// 产品信息
                "product": {// 产品信息
                  "prodId": 241,// 产品ID
                  "offerId": that.offerId//商品ID
                },
                "objectAttr": []
              }
            }
          ]
        };

        for (let one in this.main_data['241']) {
          if (one !== '_item_p') {
            //main_data['241']中保存的是id值还是属性值的标示
            let flag = true;
            for (let item in this.select_data) {
              //如果是id值，在select_data中遍历获取属性值
              if (one == item) {
                confList.productInfoList[0].productInfo.objectAttr.push({
                  "objAttrId": one,// 对象属性ID
                  "objAttVal": this.select_data[item][this.main_data['241'][one]]
                });
                flag = false;
              }
            }
            //如果是属性值就直接保存
            if (flag) {
              confList.productInfoList[0].productInfo.objectAttr.push({
                "objAttrId": one,// 对象属性ID
                "objAttVal": this.main_data['241'][one] || '0'
              });
            }
          }
        }
        axios({
          method: 'post',
          url: "/netCloudOffer/priceDefService/getObjAttrPrice",
          data: confList,
        }).then(function (response) {
          let lst = response.data.data;
          let code = response.data.code;
          if (code == '0') {
            let count = 1;
            that.main_data['241']._item_p.amount = parseInt(lst.productInfoList[0].price);
            that.$emit('update:price_and_num', {
              price: that.main_data['241']._item_p.amount,
              num: that.main_data['241']['180']
            });
            var obj={
              'parProdId':'261',
              'main_data':that.main_data
            };
            that.host_data=obj
            that.$emit('update:mainData_host',{
              'parProdId':'261',
              'main_data':that.main_data
            });
            that.$emit('update:aa','3333');
           // console.log(that.main_data['241']._item_p)
          } else if (code == '1') {
            this.$alert(response.data.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                return false;
              }
            });
          }
        }).catch(err => {
        })
      },
      ///////////////验证********************************************/
      /*提示语和红边框提示*/
      callBackFunc:function(key1,key2,tip){
        let _this = this;
        _this.tip_for_callBackFunc[key1][key2] = tip;
      },
      checkNull(key1,key2){
        if (!this.main_data[key1][key2]) {
          this.callBackFunc(key1,key2,'不能为空');
        } else {
          this.callBackFunc(key1,key2,'');
        }
      },
      checkPhone:function(key1,key2){
        if (!this.main_data[key1][key2]) {
          this.callBackFunc(key1,key2,'联系电话不能为空');
        }else{
          let re1 = /^1\d{10}$/;
          let re2 = /^0\d{2,3}-?\d{7,8}$/;
          if (!re1.test(this.main_data[key1][key2]) && !re2.test(this.main_data[key1][key2])) {
            this.callBackFunc(key1,key2,'电话格式有误');
          } else {
            this.callBackFunc(key1,key2,'');
          }
        }
      },
      checkEmail:function(key1,key2){
        if (!this.main_data[key1][key2]) {
          this.callBackFunc(key1,key2,'邮箱地址不能为空');
        }else{
          let re = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
          if (!re.test(this.main_data[key1][key2])) {
            this.callBackFunc(key1,key2,'邮箱地址格式有误');
          } else {
            for(let item in this.emailList){
              if(this.main_data['261']['175']==item){
                this.callBackFunc(key1,key2,'此邮箱地址已有，请输入新邮箱地址');
                return false;
              }
            }
            this.callBackFunc(key1,key2,'');
          }
        }
      },
      checkPassword:function(key1,key2){
        if (!this.main_data[key1][key2]) {
          this.callBackFunc(key1,key2,'密码不能为空');
        }else{
          let re = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,26}$/;
          if (!re.test(this.main_data[key1][key2])) {
            this.callBackFunc(key1,key2,'8-26位，至少有大小写字母/数字/字符中3类');
          } else {
            this.callBackFunc(key1,key2,'');
          }
        }
      },
      checkUserName:function(key1,key2){
        if (!this.main_data[key1][key2]) {
          this.callBackFunc(key1,key2,'用户名不能为空');
        }else{
          let re = /^[a-zA-Z]+$/;
          if (!re.test(this.main_data[key1][key2])) {
            this.callBackFunc(key1,key2,'用户名只能包含字母');
          } else {
            this.callBackFunc(key1,key2,'');
          }
        }
      },
      //提交表单前检验是否有错误
      hasErrorWhenSubmit(){
        let _this = this;
        if(!_this.existBool){
          _this.checkUserName('261','170');
          _this.checkPassword('261','171');
          _this.checkNull('261','172');
          _this.checkNull('261','173');
          _this.checkPhone('261','174');
          _this.checkEmail('261','175');
        }

        for(let key1 in _this.tip_for_callBackFunc){
          for(let key2 in _this.tip_for_callBackFunc[key1]){
            if(_this.tip_for_callBackFunc[key1][key2]){
              return true;
            }
          }
        }
        return false;
      },
      //////////////验证结束***************************************/

      /////////////////////////加入购物车************************
      addToShoppingCart(prodId, prodFuncType,statusCd){
        let _this = this;
        let user = window.sessionStorage.getItem('user');
        let cust = window.sessionStorage.getItem('cust');
        if(cust == null || cust == ""){
          this.$alert('您未选择客户，请选择', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          });
        };

        let userType = JSON.parse(user).staffType;
        let sysUserName = JSON.parse(user).sysUserName;
        let loginUserId = JSON.parse(user).staffId;
        let userId = JSON.parse(user).staffId;
        let certId = JSON.parse(cust).CUST_ID;

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

        if(_this.hasErrorWhenSubmit()){
          this.$alert('存在输入格式错误，请先根据提示进行检查修改后再加入购物车','提示',{
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          })
        }else {
          //----得到配置详情存到productAttrList中------------------
          let product_List = [];
          for (let item in _this.main_data) {
            let obj = _this.main_data[item];

            //判断第二层的值是对象还是字符串
            if ((typeof obj == 'string') && obj.constructor == String) {
              //此处为筛选出一次性费用作用
              let pro_item = {
                productId: item,
                amount: obj,
                serviceAttrList: []
              }
              product_List.push(pro_item);
            } else if ((typeof obj == 'object') && obj.constructor == Object) {
              let pro_item = {
                productId: item,
                serviceAttrList: []
              }
              for (let item_in in obj) {
                let obj_in = obj[item_in];
                //判断第三层的值的类型
                if(!isNaN(obj_in) && obj_in){
                  obj_in = obj_in.toString();
                  //alert(obj_in);
                }
                if (((typeof obj_in == 'string') && obj_in.constructor == String) || item_in == '126' || !obj_in) {
                  //筛选出配置属性
                  let pro_item_in = {
                    attrId: item_in,
                    attrValue: obj_in
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
          //----IPRAN加入购物车并保存配置----------------------------------------------------------------
          axios({
            url: '/netCloudOrder/shoppingCartService/addShoppingCart',
            method: 'post',
            data: {
              code:prodId,
              itemCd:_this.buy_type_itemCd,     //1新装 2 试用
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
              productAttrList: product_List
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
        }
      },

      /////////////////////////配置保存************************
      updateCartConf(prodId, prodFuncType,statusCd){
        let _this = this;
        let user = window.sessionStorage.getItem('user');
        let cust = window.sessionStorage.getItem('cust');
        if(cust == null || cust == ""){
          this.$alert('您未选择客户，请选择', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          });
        };

        let userType = JSON.parse(user).staffType;
        let sysUserName = JSON.parse(user).sysUserName;
        let loginUserId = JSON.parse(user).staffId;
        let userId = JSON.parse(user).staffId;
        let certId = JSON.parse(cust).CUST_ID;

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

        if(_this.hasErrorWhenSubmit()){
          this.$alert('存在输入格式错误，请先根据提示进行检查修改后再加入购物车','提示',{
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          })
        }else {
          //----得到配置详情存到productAttrList中------------------
          let product_List = [];
          for (let item in _this.main_data) {
            let obj = _this.main_data[item];

            //判断第二层的值是对象还是字符串
            if ((typeof obj == 'string') && obj.constructor == String) {
              //此处为筛选出一次性费用作用
              let pro_item = {
                productId: item,
                amount: obj,
                serviceAttrList: []
              }
              product_List.push(pro_item);
            } else if ((typeof obj == 'object') && obj.constructor == Object) {
              let pro_item = {
                productId: item,
                serviceAttrList: []
              }
              for (let item_in in obj) {
                let obj_in = obj[item_in];
                //判断第三层的值的类型
                if(!isNaN(obj_in) && obj_in){
                  obj_in = obj_in.toString();
                  //alert(obj_in);
                }
                if (((typeof obj_in == 'string') && obj_in.constructor == String) || item_in == '126' || !obj_in) {
                  //筛选出配置属性
                  let pro_item_in = {
                    attrId: item_in,
                    attrValue: obj_in
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

          //----IPRAN加入购物车并保存配置----------------------------------------------------------------
          axios({
            url: '/netCloudOrder/shoppingCartService/updateShoppingCart2',
            method: 'post',
            data: {
              statusCd:statusCd,
              itemCd:_this.buy_type_itemCd,     //1新装 2 试用
              cartItemId:_this.prodList.cartItemId,
              loginUserId: loginUserId,
              offerId: prodId,
              productAttrList: product_List
            }
          }).then(response => {
            if (response.data.code == "0") {
              if(statusCd == '15'){
                this.$router.push({path: '/shoppingCartFrame'});
              }else if(statusCd == '10'){
                this.$alert('资源审核已提交!', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    _this.cant_edit = true;
                    _this.prodList.statusCd = '10';
                    return false;
                  }
                });
              }
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

      getCartConf(prodConfList){
        let _this = this;
        //购物车中读取当前购物车项配置信息
        _this.readValBool=true;
        let curCartItem_confList = prodConfList.productAttrList;
        for(let attr_item in curCartItem_confList){
          if(curCartItem_confList[attr_item].productId=='241' || curCartItem_confList[attr_item].productId=='261'){
            for(let attr_item_in in curCartItem_confList[attr_item].serviceAttrList){
              let id_of_attr = curCartItem_confList[attr_item].serviceAttrList[attr_item_in].attrId;
              let value_of_attr = curCartItem_confList[attr_item].serviceAttrList[attr_item_in].attrValue;
              _this.main_data[curCartItem_confList[attr_item].productId][id_of_attr] = value_of_attr;
            }
          }

        }
        if(!_this.emailList.hasOwnProperty(_this.main_data['261']['175'])){
          _this.existAccount.current='';
        }else{
          _this.existAccount.current=_this.emailList[_this.main_data['261']['175']];
        }
        _this.getHostInfo();
        for(var key in _this.select_data['152']){
          if(_this.select_data['152'][key]=='公共镜像'){
            _this.getMirrorList('gold');
          }else if(_this.select_data['152'][key]=='私有镜像'){
            _this.getMirrorList('private');
          }
        }
        if(1 == 0){
          this.$emit('update:prodList', '');
        }
        _this.$emit('update:dataBool_host',true);
      },


      getMirrorList(val){
        let _this = this;
        //镜像
        let mirror_style=val;
        for(var i in _this.resource_pool){
          if(_this.resource_pool[i].attrValueId==_this.main_data['241']['145']){
            _this.regionIdStr=_this.resource_pool[i].objAttrValue;
          }
        }
        //console.log('regionIdStr:',_this.regionIdStr)
        //镜像id ：_this.main_data['241']['153']，资源池id：_this.main_data['241']['145']
        //console.log('镜像类型：',_this.main_data['241']['152'],'镜像id：',_this.main_data['241']['153'],'资源池id：',_this.main_data['241']['145']);
        let dataObj = {
          "imageType": mirror_style,
          "regionId": _this.regionIdStr
        };
        axios({
          method: "post",
          url:'/netCloudBusiness/queryYunRes/queryImages',
          /*url: 'http://134.98.100.71:8081/netcloud-businesscenter-web/queryYunRes/queryImages',*/
          data: dataObj
        }).then(res => {
          let jxData = res.data;
          if(mirror_style=='gold'){
            let obj = [];
            _this.mirror_data = jxData;
            //mirror_type
            let num = -1;
            for (let n in jxData) {
              num++;
              if (num == 0) {
                _this.main_data['241']['207']=n;
              }
              obj.push(n);
            }
            _this.mirror_type = obj;
            for (let i in jxData) {
              for (let n in jxData[i]) {
                if (jxData[i][n].id == _this.main_data['241']['153']) {
                  _this.main_data['241']['207']=i;
                }
              }
            }
            _this.changeName(_this.main_data['241']['207']);
          }else if(mirror_style='private') {
            let privData = jxData.returnObj;
            let obj = {};
            for (let index in privData) {
              obj[privData[index].id] = privData[index].name;
            }
            _this.mirror_version = obj;
          }
        }).catch(err => {
        })
      },

      getPriceInFatherTemp:function () {
       // console.log('in getPriceInFatherTemp');
        this.$emit('GetPrice');
      },
    }
  }
</script>

