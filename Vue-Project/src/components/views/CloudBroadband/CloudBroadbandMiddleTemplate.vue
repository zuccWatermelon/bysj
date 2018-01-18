<!-- 云网通配置外层组件 -->
<template>
  <div class="whiteBg">
    <CloudBroadbandHost :dataBool_host.sync="dataBool_host"
                        :mainData_host.sync="mainData_host"
                        :prodInstId.sync = "prodInstId['261']"
                        :prodList.sync="prodList_copy"
                        :payType="select_data['252'][pro_data['252']]"
                        ref="CloudBroadbandHostFunc"
                        :cant_edit="cant_edit"
                        :payNum = 'pro_data[280]'></CloudBroadbandHost>
    <CloudBroadbandLine :dataBool_line.sync="dataBool_line" class="line" :mainData_line.sync="mainData_line" :prodList.sync="prodList_copy" :payType="select_data['252'][pro_data['252']]" ref="CloudBroadbandLineFunc"></CloudBroadbandLine>
    <CloudBroadbandConfig v-if="dataBool_host && dataBool_line" :prodList.sync="prodList_copy" :mainData_host="mainData_host" :mainData_line="mainData_line" :chanel="chanel"  @updateConf="updateCartConf"></CloudBroadbandConfig>

    <div class="product_part pay-way">
      <div class="product_bar clearfix">
        <span class="attr_name">付费方式</span>
        <div class="attr_val">
          <div class="input_wrap" v-for="(item,key) in select_data['252']">
            <input type="checkbox" name="pay_style"
                   :checked="pro_data['252'] == key"
                   :disabled="pro_data['252'] == key || cant_edit"
                   @click="cant_edit ? '':setCheckBox(key,'252')"/>
            <!--{{item[0]}}-->{{item.displayValue}}
          </div>
        </div>
      </div>
    </div>

    <div class="product_part pay-way">
      <div class="product_bar clearfix">
        <span class="attr_name">付费账户</span>
        <div class="attr_val">
          <!--<div class="input_wrap" v-for="(item,index) in select_data['280']">-->
          <select class="billAccount" v-model="pro_data[280]" :disabled="cant_edit">
            <option v-for="(item,index) in select_data['280']" :value="index">{{item}}</option>
          </select>
          <!--</div>-->
        </div>
      </div>
    </div>
    <div class="bot_price" v-if="chanel !== 'shoppingCart'">
      <div class="w1200 clearfix">
        <p>配置费用：<span class="price_num">¥{{pro_data._item_p.amount}}</span></p>
        <div class="gocart_btn" @click="cant_edit ? '':addToShoppingCart(offerId)">加入购物车</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
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
  .whiteBg{
    background:white;
    position:relative;
  }
  .linH30{line-height:30px;}
  p,table,ul{margin:0;padding:0;}
  .w1200{width:1200px;margin:0 auto;}
  .base_info{
    border-top:1px solid #e8e8e8;
    margin-bottom:20px;
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
    width:1200px;
    border-top:1px solid #e8e8e8;
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
    width: 918px;
    padding-right: 20px;
    float: left;
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
    /*border-top:1px solid #e8e8e8;*/
    /*padding-top:5px;*/
    padding-bottom:20px;
    padding-left: 5px;
    .product_bar{
      padding-top:15px;
      .attr_name{
        float:left;
        display:block;
        width:100px;
        line-height:30px;
        font-weight:bold;
      }
      .attr_val{
        float:left;
        line-height:30px;
        width:798px;
        input[type=radio]{
          margin-left:40px;
          margin-right:10px;
          position:relative;
          top:2px;
        }
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
      .bandwidth-label-width{
        width:60px;
        line-height: 38px;
      }
      .bandwidth-width{
        width:650px;
      }

    }
  }
  .time_area{
    padding-bottom: 2px;
    float:left;
    text-align:center;
    .minus{
      float:left;
      height:30px;
      line-height:30px;
      width:20px;
      border:1px solid #999;
      border-right:none;
      border-radius:3px 0 0 3px;
      cursor:pointer;
    }
    input{
      float:left;
      width:50px;
      text-align:center;
      height:30px;
    }
    .plus{
      float:left;
      height:30px;
      line-height:30px;
      width:20px;
      border:1px solid #999;
      border-left:none;
      border-radius:0 3px 3px 0;
      cursor:pointer;
    }
    select{
      float:left;
      margin-left:20px;
      height:30px;
    }
    .no-minus{
      border:1px solid #ccc;
      border-right:none;
      color:#ccc;
      cursor: default;
    }
    .no-plus{
      border:1px solid #ccc;
      border-left:none;
      color:#ccc;
      cursor: default;
    }
  }
  .time_detail{
    float:left;
    margin-left:50px;
    input{
      height:30px;
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
    width:350px;
    border:1px solid #999;
    padding:10px;
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
  .add_disk{
    margin:5px 0;
    color:#999;
    a{
      color:#2883D6;
      margin-right:10px;
      text-decoration:none;
      span{
        display:inline-block;
        width:16px;
        height:16px;
        text-align:center;
        line-height:16px;
        border-radius:8px;
        background:#2883D6;
        color:white;
        margin-right:5px;
      }
    }
  }
  .user_name{
    span{
      display:inline-block;
      width:115px;
    }
  }
  .bot_price{
    background:#f2f2f2;
    .w1200{
      p{
        margin-top:15px;
        float:left;
        .price_num{
          font-size:25px;
          color:#ff8200;
          position:relative;
          top:5px;
          left:20px;
        }
      }
      .gocart_btn{
        cursor:pointer;
        float:right;
        text-align:center;
        width:150px;
        line-height:70px;
        text-align:center;
        background:#ff8200;
        color:white;
        font-size:20px;
      }
    }
  }
  .pass_tip{
    float:left;
    line-height:30px;
    color:#999;
    margin-left:10px;
  }

  //宽带
  .ranger-width{
    width:500px;
    padding-bottom: 10px;
    position: relative;
    float:left;
    .scale-of-ranger{
      width:500px;
      height:18px;
      position: absolute;
      top:20px;
      left:4px;
      div.scale-part{
        height:18px;
        float: left;
      }
      div span{
        position: absolute;
        right:-6%;
        cursor: pointer;
      }
    }
  }
  .bandwidth-get{
    height:38px;
    padding-top: 6px;
    margin:0 30px;
    float:left;
    input{
      width:35px;
      height:25px;
      border:1px solid #ccc;
      margin:0;
      padding:0 3px;
      float: left;
      line-height: 25px;
      background-color: white;
    }
    span{
      height:25px;
      padding: 0 3px;
      margin:0;
      border:1px solid #ccc;
      display: block;
      float: left;
      line-height: 25px;
      background-color: #ccc;
      color:#fff;
    }
  }
  .red-border{
    border:1px solid red;
  }

  .p15{
    width:1200px;
    padding:0 20px;
    .out-of-product-part{
      width:1160px;
    }
    .out-of-product-part-l{
      width:878px;
    }
    .product_part .product_bar .attr_val{
      width:758px;
    }
  }

  .cant-edit{
    .val_list li.active{
      background:#999;
    }
    .val_list li{
      cursor: not-allowed;
    }
    input,select,span.plus,span.minus,.scale-of-ranger div span,.delete_disk{
      cursor: not-allowed;
    }
    span.minus {
      border: 1px solid #ccc;
      border-right: none;
      color: #ccc;
    }
    span.plus{
      border: 1px solid #ccc;
      border-left: none;
      color: #ccc;
    }
  }
  .pay-way{
    width:1200px;
    margin:0 auto;
    borde:0;
  }
</style>
<script>
  import CloudBroadbandHost from '../CloudNet/CloudNetHost.vue';
  import CloudBroadbandLine from './CloudBroadbandLine.vue';
  import CloudBroadbandConfig from './CloudBroadbandConfig.vue';
  import userMap from '../../../assets/js/userMap'

  export default{
    props:[
      'prodList','chanel','price_and_num'
    ],
    data(){
      return {
        dataBool_line:false,//判断云专线数据是否加载完全
        dataBool_host:false,//判断云产品数据是否加载完全
        regionIdStr:'',//资源池接口调用值
        CUST_ID:'',//客户Id
        readValBool:false,//是否是有配置信息
        cant_edit:false,//判断所有属性能不能修改
        system_data_num:'',//系统盘大小
        system_data_str:'',//系统盘类型
        catalogId:'182',//商品目录id
        offerId:'',//商品id
        password_confirm:'',

        prodList_copy:{},
        mainData_host:{
          parProdId:'',//主产品id
          main_data:{},//配置信息
        },
        prodInstId:{
            '261':'',//云主机实例ID
        },
        mainData_line:{
          parProdId:'',
          main_data:{},
          idType:''
        },
        //配置的商品信息
        pro_data:{
          '252':'',//收费方式
          '_item_p':{
            'amount':'',
            'num':1
          }
        },
        parProdId:'',//主产品id
        //配置的产品信息
        main_data:{
          '241':{
            '_item_p':{
              'amount':'',
              'num':'1'
            }
          }
        },
        show_data:{},
        select_data:{
          '252':{}//商品信息中的收费方式
        },
        buy_type_itemCd:'',
        resource_pool:[],//资源池列表

        data_disk_bool:true,
        system_disk_data:{},
        //付费账户
        pay_account:{},//key为索引，value为acctId
        //镜像
        mirror_type:[],
        mirror_version:{},
        mirror_data:{},
        mirror_show:true,
        images_data:[],
        images_val_txt:'',
        images_version_data:{},
        copy_images_data:{},
        relation_data:{},
        cloud_select:0,
        IP_select:0,
        time_set:{
          amount:'',
          type:'',
          start_day:'',
          end_day:'',
        },
        buy_amount:{
          amount:'1'
        },
        hasInputError:false,
      }
    },
    components:{
      CloudBroadbandHost,
      CloudBroadbandLine,
      CloudBroadbandConfig,
    },
    mounted(){
      let _this = this;
      if(_this.prodList){
        _this.offerId = _this.prodList.offerId;
        _this.prodList_copy = _this.prodList;
        //子组件初始化
        _this.$refs.CloudBroadbandHostFunc.initializtion(_this.prodList);
        _this.$refs.CloudBroadbandLineFunc.initializtion(_this.prodList);
        //初始化商品配置中的收费方式
        _this.setProdConf(_this.prodList);
      }else {
        _this.offerId=_this.$route.query.offerId;
        axios({
          method: "post",
          url: '/netCloudOffer/productsService/productlistByParam', //商品下的产品信息及信息属性
          data: {id: _this.offerId}
        }).then(res => {
          if (res.data.code == 0) {
            axios({
              method:'post',
              url:"/netCloudOffer/offerService/getofferinfobyoffercatalog",//根据商品目录ID查询商品列表
              data:{
                "id":_this.catalogId,
              }
            }).then(function (response) {
              response.data.data.forEach((v)=>{
                if(v.offerInfo.offerId == _this.offerId){
                  _this.prodList_copy = {
                    confList:res.data.data,
                    confListOfProd:v,
                    prodConfList:{}
                  };
                  //子组件初始化
                  _this.$refs.CloudBroadbandHostFunc.initializtion(_this.prodList_copy);
                  _this.$refs.CloudBroadbandLineFunc.initializtion(_this.prodList_copy);
                  //初始化商品配置中的收费方式
                  _this.setProdConf(_this.prodList_copy);
                }
              })
            });
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
      }
    },
    methods:{
      //商品信息初始化
      setProdConf(confList){
        let _this = this;
        let info = confList.confListOfProd.offerObjInfo;
        let infoObj = {};
        let infoListObj = {};
        info.forEach((v)=>{
          infoObj[v.objAttrInfo.attrId] = v.objAttrInfo.defaultValue;
          infoListObj[v.objAttrInfo.attrId] = {};
          if(v.objAttrValList.length > 0){
            v.objAttrValList.forEach((b)=>{
              if(b.objAttrValue == infoObj[v.objAttrInfo.attrId]){
                infoObj[v.objAttrInfo.attrId] = b.attrValueId;
              }
              infoListObj[v.objAttrInfo.attrId][b.attrValueId] = {
                displayValue:b.displayValue,
                objAttrValue:b.objAttrValue
              };
            });
          }
        });
        infoObj._item_p = {
          amount:'',
          num:1
        };

        let cust = window.sessionStorage.getItem('cust');
        if(cust == null || cust == ""){
          this.$alert('您未选择客户，请选择', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          });
        };
        let custId = JSON.parse(cust).CUST_ID;
        axios({
          method:'post',
          url:'/netCloudCustomer/acctService/queryAcctInfo',
          data:{
            custId:custId
          }
        }).then(res=>{
          if(res.data.data.length > 0){
            res.data.data.forEach((v)=>{
              infoListObj['280'][v.acctId] = v.acctCode;
              if(!infoObj['280']){
                infoObj['280'] = v.acctId;
              }
            });
            _this.pro_data = infoObj;
            _this.select_data = infoListObj;
          } else {
            _this.$alert('该账号没有付费账户,请到CRM录入信息', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$router.push('/');
              }
            });
          }

        }).catch(err=>{});
        _this.pro_data = infoObj;
        _this.select_data = infoListObj;
        if(_this.prodList){
          _this.getCartConf();
        } else {
          _this.getPrice();
        }

      },
      //checkbox模拟radio，点击赋值
      setCheckBox(index,key){
        this.pro_data[key] = index;
        this.getPrice();
      },

      //获取产品价格
      getPrice:function(){
        var self = this;
//        包年包月sync改变时无法同步
        let data = {
          "offerInfo": {
            "offerId": self.offerId,
            "offerObjectAttr": [
              {
                objAttrId:'252',
                objAttVal:self.select_data['252'][self.pro_data['252']].objAttrValue
              }
            ]
          },
          "productInfoList": [// 产品信息集合
          ]
        };
        self.setProductInfoList(self.mainData_host.main_data,data.productInfoList);
        self.setProductInfoList(self.mainData_line.main_data,data.productInfoList);
        axios({
          method: 'post',
          url: "/netCloudOffer/priceDefService/getObjAttrPrice",
          data: data,
        }).then(function (response) {
          let lst = response.data.data;
          let code = response.data.code;
          if (code == '0') {
            self.pro_data._item_p.amount = parseInt(lst.offerInfo.offerPrice);
            self.$emit('update:price_and_num', {
              price: self.pro_data._item_p.amount,
              num: 1
            });
//              let price_after_minus = self.pro_data._item_p.amount * (self.discount || 1);
            lst.productInfoList.forEach((v)=>{
              for(let key in self.mainData_host.main_data){
                if(key == v.prodId){
                  self.$set(self.mainData_host.main_data[key],'amount',v.price);
                }
              }
              for(let key in self.mainData_line.main_data){
                if(key == v.prodId){
                  self.$set(self.mainData_line.main_data[key],'amount',v.price);
                }
              }
//                price_after_minus = price_after_minus - parseInt(v.price);
            });
//              self.mainData_line.main_data['287']._item_p.amount = price_after_minus;
          } else if (code == '1') {
            self.$alert(response.data.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                return false;
              }
            });
          }
        }).catch(err => {
        })
//        },1000);


      },
//      将单个产品变成产品信息   放到集合里
      setProductInfoList(data,productInfoList){
        var self = this;
        for(let key in data){
          let item = {
            productInfo:{
              product:{
                prodId:key,
                offerId:self.offerId
              },
              objectAttr:[]
            }
          };
          for(let b in data[key]){
            if(b!='_item_p' && b != 'amount'){
              if((key == '241' && b == '163') || (key == '287' && b == '252')){
                item.productInfo.objectAttr.push({
                  objAttrId:b,
                  objAttVal:self.select_data['252'][self.pro_data['252']].objAttrValue
                });
              } else {
                item.productInfo.objectAttr.push({
                  objAttrId:b,
                  objAttVal:data[key][b]
                });
              }
            }
          }
          productInfoList.push(item);
        }
      },

//      加入购物车   云宽通
      addToShoppingCart(prodId){
        var _this = this;
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
        if(_this.$refs.CloudBroadbandHostFunc.hasErrorWhenSubmit() || _this.$refs.CloudBroadbandLineFunc.hasErrorWhenSubmit()){
          this.$alert('存在输入格式错误，请先根据提示进行检查修改后再加入购物车','提示',{
            confirmButtonText: '确定',
            callback: action => {
              _this.submit_flag = false;
              return false;
            }
          })
        }else {
          let data = {
            code: prodId,
            itemCd: '1',
            statusCd: '1',
            actionCode: '添加',
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
            amount: _this.pro_data._item_p.amount,
            serviceAttrList: [],
            productAttrList: []
          };
//          商品列表
          for(let serviceAttr in _this.pro_data){
            if(serviceAttr != '_item_p'){
              data.serviceAttrList.push({
                attrId: serviceAttr,
                attrValue: _this.pro_data[serviceAttr]
              });
            }
          }
          //        产品列表
          _this.setShoppingCartProdList(_this.mainData_host, data.productAttrList);
          _this.setShoppingCartProdList(_this.mainData_line, data.productAttrList);
          axios({
            url: '/netCloudOrder/shoppingCartService/addShoppingCart',
            method: 'post',
            data: data
          }).then(response => {
            if (response.data.code == "0") {
              this.$router.push({path: '/shoppingCartFrame'});
            } else {
              this.$alert(response.data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                }
              });
            }
          }).catch(err => {
            _this.submit_flag = false;
          })
        }
      },
//      购物车里的产品列表
      setShoppingCartProdList(data,productAttrList){
        for(let key in data.main_data){
          let item = {
            "productId": key,
            "parProdId":'',
            "amount": data.main_data[key].amount,
            newProdFlag:'Y',
            prodInstId:'',
            serviceAttrList:[]
          };
          if(this.prodInstId[key]){
            item.newProdFlag = 'N';
            item.prodInstId = this.prodInstId[key];
          }
//         辅产品
          if(key != data.parProdId){
            item.parProdId = data.parProdId;
          }
          for(let b in data.main_data[key]){
            if(b!='_item_p' && b != 'amount'){
              item.serviceAttrList.push({
                "attrId": b,
                "attrValue": data.main_data[key][b]
              });
            } else if(b == '_item_p'){
              for(let addrItem in  data.main_data[key][b]){
                if(addrItem != 'amount'){
                  item[addrItem] = data.main_data[key][b][addrItem];
                }
              }
            }
          }
          productAttrList.push(item);
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

        if(_this.$refs.CloudBroadbandHostFunc.hasErrorWhenSubmit() || _this.$refs.CloudBroadbandLineFunc.hasErrorWhenSubmit()){
          this.$alert('存在输入格式错误，请先根据提示进行检查修改后再加入购物车','提示',{
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          })
        }else {
//          axios({
//            method:'post',
//            url:'/test/netcloud-businesscenter-web/certification/idCardCert',
//            data:{
//              staffId:loginUserId,
//              name:sysUserName,
//              idNumber:_this.mainData_line.main_data[288][265],
//              idType:_this.mainData_line.idType
//            }
//          }).then(res=>{
//            if(res.data.code == '0' || res.data.code == 0){
          let data = {
            statusCd:statusCd,
            itemCd:1,     //1新装 2 试用
            cartItemId:_this.prodList.cartItemId,
            loginUserId: loginUserId,
            offerId: prodId,
            amount: _this.pro_data._item_p.amount,
            serviceAttrList: [],
            productAttrList: []
          };
//          商品列表
          for(let serviceAttr in _this.pro_data){
            if(serviceAttr != '_item_p'){
              data.serviceAttrList.push({
                attrId: serviceAttr,
                attrValue: _this.pro_data[serviceAttr]
              });
            }
          }
          //        产品列表
          _this.setShoppingCartProdList(_this.mainData_host, data.productAttrList);
          _this.setShoppingCartProdList(_this.mainData_line, data.productAttrList);
          /**287产品下的付费方式修改
           * 之前送的是中文,现在需要送id
           * 这里先简单赋值，后续优化**/
          for(let idx1 in data.productAttrList){
            let dataLst1 = data.productAttrList;
            if(dataLst1[idx1].productId == '287'){
              let dataLst2 = dataLst1[idx1].serviceAttrList;
              for(let idx2 in dataLst2){
                if(dataLst2[idx2].attrId == '252'){
                  dataLst2[idx2].attrValue = _this.pro_data['252'];
                }
              }
            }
          }
          //----保存配置----------------------------------------------------------------
          axios({
            url: '/netCloudOrder/shoppingCartService/updateShoppingCart2',
            method: 'post',
            data: data
          }).then(response => {
            if (response.data.code == "0") {
              if(statusCd == '1'){
                this.$alert('配置校验成功并保存!', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.$router.push({path: '/shoppingCartFrame'});
                    return false;
                  }
                });
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
              _this.$alert('保存配置出错!', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  return false;
                }
              });
            }
          }).catch(err => {
          })
//            } else {
//              _this.$alert('未实名认证!', '提示', {
//                confirmButtonText: '确定',
//                callback: action => {
//                  return false;
//                }
//              });
//            }
//          }).catch(err=>{});


        }
      },

      getCartConf(){
        let _this = this;

        //获取购物车当前的商品配置信息
        let curCartItem_confList = _this.prodList.prodConfList;
        for(let i in curCartItem_confList.serviceAttrList){
          for(let q in _this.pro_data){
            if(curCartItem_confList.serviceAttrList[i].attrId == q){
              _this.pro_data[q] = curCartItem_confList.serviceAttrList[i].attrValue;
            }
          }
        }
        _this.getPrice();
        if(_this.prodList.statusCd == '15' || _this.prodList.statusCd == '12' || _this.prodList.statusCd == '1'){
          _this.cant_edit = false;
        }else{
          _this.cant_edit = true;
        }

      },

//      校验是否实名
      checkReal(){
        axios({
          method:'post',
          url:'/test/netcloud-businesscenter-web/certification/idCardCert',
          data:{
            staffId:loginUserId,
            name:sysUserName,
            idNumber:_this.mainData_line.main_data[288][265],
            idType:_this.mainData_line.idType
          }
        }).then(res=>{
          if(res.data.code == '0'){
            return true;
          } else {
            return false;
          }
        }).catch(err=>{});

      }
    },
    watch:{
//        ['mainData_line.idType'](){
//            let self = this;
//            if(self.prodList) {
//              let data = JSON.parse(JSON.stringify(self.prodList));
//              data.idType = self.mainData_line.idType;
//              self.$emit('update:prodList', data);
//            }
//        }
    }
  }
</script>

