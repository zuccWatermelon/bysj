<!-- 云主机配置组件 -->
<template>
  <div class="whiteBg">
    <div class="w1200">
      <div class="base_info">
        <p class="title">客户基本属性</p>
        <div class="content">
          <ul class="clearfix">
            <li class="clearfix">
              <span class="attr_name">客户名称：</span>
              <div class="attr_val"><input type="text" :value="base_info.custName" readonly/></div>
            </li>
            <li class="clearfix">
              <span class="attr_name">客户类型：</span>
              <div class="attr_val"><input type="text" :value="base_info.custType"  readonly/></div>
            </li>
            <li class="clearfix">
              <span class="attr_name">证件类型：</span>
              <div class="attr_val"><input type="text" :value="base_info.certName" readonly/></div>
            </li>
            <li class="clearfix">
              <span class="attr_name">证件号码：</span>
              <div class="attr_val"><input type="text" :value="base_info.certNum" readonly/></div>
            </li>
            <li class="clearfix">
              <span class="attr_name">客户地址：</span>
              <div class="attr_val"><input type="text" :value="base_info.contactAddr" readonly/></div>
            </li>
            <li class="clearfix">
              <span class="attr_name">联系电话：</span>
              <div class="attr_val"><input type="text"  :value="base_info.mobile" readonly/></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="out-of-product-part">
        <div class="out-of-product-part-l">
          <div class="product_part">
            <div class="product_bar clearfix">
              <span class="attr_name">订购类型</span>
              <div class="attr_val">
                <div class="input_wrap">
                  <input type="text" name="order_style" :value="main_data[241][143]" readonly>
                </div>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">开通时间</span>
              <div class="attr_val clearfix">
                <div class="time_area clearfix">
                  <span class="minus" v-bind:class="{'no-minus':time_set.amount == 1}" v-on:click="minusOrPlusTheAmount('-',$event)">-</span>
                  <input type="text" v-model="main_data[241][164]" >
                  <span class="plus" v-bind:class="{'no-plus':time_set.amount == 100}"v-on:click="minusOrPlusTheAmount('+',$event)">+</span>
                  <select v-model="main_data[241][179]">
                    <option value="231">月</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="product_bar clearfix" v-if="isPayStyle">
              <span class="attr_name">付费方式</span>
              <div class="attr_val">
                <div class="input_wrap" v-for="(item,index) in select_data['163']">
                  <input type="checkbox" name="pay_style"
                         :checked="main_data['241']['163'] == index"
                         :disabled="main_data['241']['163'] == index"
                         @click="setCheckBox(index,'163');getPrice(true);"/>
                  {{item}}
                </div>
              </div>
            </div>
           <!-- <div class="product_bar clearfix">
              <span class="attr_name">付费账户</span>
              <div class="attr_val">
                <select :disabled="cant_edit" class="jx_version" v-model="main_data['241']['209']">
                  <option v-for="(option,index) in pay_account" :value="index">{{option}}</option>
                </select>
              </div>
            </div>-->
            <div class="product_bar clearfix">
              <span class="attr_name">开通平台</span>
              <div class="attr_val">
                <input type="text" :value="main_data[241][146]" readonly />
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">资源池</span>
              <div class="attr_val">
                <input type="text" :value="main_data[241][145]" readonly />
              </div>
            </div>
          </div>
          <div class="product_part">
            <div class="product_bar clearfix">
              <span class="attr_name">CPU(虚拟核数)</span>
              <div class="attr_val">
                <input type="text" :value="main_data[241][147]" readonly />
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">内存</span>
              <div class="attr_val">
                <input type="text" :value="main_data[241][148]+'G'" readonly />
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">镜像类型</span>
              <div class="attr_val">
                <input type="text" :value="main_data[241][152]" readonly />
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">镜像</span>
              <div class="attr_val">
                <input type="text" :value="image_system.style+' '+image_system.version" readonly style="width:inherit;" />
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">磁盘</span>
              <div class="attr_val">
                <div class="disk">
                  <span>系统盘</span>
                  <input type="text" :value="main_data[241][149]+' '+main_data[241][183]+'G'"  readonly/>
                </div>
                <div class="data_disk">
                  <div class="disk">
                    <span>数据盘</span>
                    <input type="text" :value="main_data[241][150]+' '+main_data[241][151]+'G'" readonly />
                  </div>
                </div>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">虚拟私有云</span>
              <div class="attr_val">
                <input type="text" :value="main_data[241][210]" readonly />
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">带宽</span>
              <div class="attr_val">
                <input type="text" :value="main_data[241][154]+'Mb'" readonly />
              </div>
            </div>
          </div>
          <div class="product_part">
            <div class="product_bar clearfix">
              <span class="attr_name">订购数量</span>
              <div class="attr_val ">
                <input type="text" :value="main_data[241][180]+'台'" readonly />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  .has-tip{
    position:absolute;
    left:0;
    top:30px;
    font-size: 12px;
    color:red;
    line-height:16px;
  }
  .jx_select,.jx_version{height:30px;}
  .whiteBg{background:white;}
  .linH30{line-height:30px;}
  p,table,ul{margin:0;padding:0;}
  .w1200{margin:0 20px;border-top:1px solid #e8e8e8;}
  .base_info{
    .title{
      font-weight:bold;
      font-size:16px;
      padding-top:15px;
    }
    .content{
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
            color:#999;
          }
          .attr_val{
            float:left;
            width:200px;
            height:30px;
            position: relative;
            input{
              border:none;
              width:200px;
              height:30px;
            }
          }
        }
      }
    }
  }
  .out-of-product-part{
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
    .product_part:first-child{
      border-top:none;
      padding-top:0;
    }
    input[type=text]{
      border:none;
    }

  }
  .out-of-product-part-r{
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
        width:110px;
        padding-right:10px;
        text-align:right;
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
        }
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
      border:1px solid #999 !important;
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
    li.active{
      background:#FF8200;
      color:white;
    }
  }
  .disk{
    width:350px;
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
</style>
<script>
  export default{
    props:['orderTransInstance','prodList','price_and_num','index'],
    data(){
        return {
          resource_pool:[],
          indexStr:'',
          paramObj:{
            "prodInstId":'',
            "duration":'',
          },//传参
          catalogId:'301',//云产品固定商品id
          inputVal:'123',
          //存储文字值
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
              '163':'',//付费方式
              '165':'',//虚拟私有云名称
              '166':'',//VPC申请起始IP
              '167':'',//VPC申请终止IP
              '164':'',//订购时长
              '179':'',//订购时长单位
              '180':'',//订购数量
              '_item_p':{
                'amount':'',
                'num':''
              }
            }
          },
          base_info:{
            'custName':'',//客户名称
            'custType':'',//客户类型
            'userType':'',
            'certName':'',//证件类型
            'certNum':'',//证件号码
            'contactAddr':'',//客户地址
            'mobile':'',//联系电话
          },
          select_data:{
            '163':{}//收费方式
          },
          time_set:{
            amount:'',
            type:'',
            start_day:'',
            end_day:'',
          },
          image_system:{
            style:'',
            version:''
          },//镜像系统
          isPayStyle:true//付费方式的隐藏
        }
    },
    computed:{
    },
    watch:{
      ['time_set.amount'](val){
        this.endDayChange(this.time_set);
        this.main_data['241']['164'] = this.time_set.amount;
      }
    },
    mounted(){
       var _this=this;
       var dataObj={
         "orderItemId": _this.prodList.cartItemId
       };
       if(_this.prodList.itemCdName=='变更'){
        _this.isPayStyle=false;
       }else if(_this.prodList.itemCdName=='转商'){
         _this.isPayStyle=true;
       }
       axios({
         method:"post",
         url:'/netCloudOrder/cartItemAttrService/queryCartItemAttr2',
         data:dataObj
       }).then(res=>{
         if(res.data.code==0){
           var mainData=res.data.data.productAttrList;
           //console.log('mainData:',mainData)
           for(var i in mainData[0]){
               for(var key in _this.base_info){
                 if(key==i){
                   _this.base_info[key]=mainData[0][i];
                 }
               }
           }
           var num241=0;
           var insIdStr='';//实例id数组
           for(var index in mainData){
             if(mainData[index].productId=='241'){
               num241++;
               if(num241==1){
                 insIdStr+=mainData[index].prodInstId;
                 _this.paramObj.prodInstId=insIdStr;
                 var info=mainData[index].serviceAttrList;//产品信息
                 var infoObj={};//空的产品信息241
                 for(var i in info){
                   if(info[i].attrId=='180'){
                     infoObj[info[i].attrId]=num241;
                   }else{
                     infoObj[info[i].attrId]=info[i].attrValue;
                   }
                 }
                 infoObj._item_p = {
                   amount:'',
                   num:infoObj['180']
                 };
                 _this.main_data[241]=infoObj;//产品基本信息

                 this.paramObj.duration=this.main_data[241][164];
                 this.paramObj.payType=this.main_data[241][163];
                // console.log('paramObj:',this.paramObj)
                 this.$emit('update:orderTransInstance', this.paramObj);
               }else{
                 insIdStr+=','+mainData[index].prodInstId;
               }
               _this.main_data[241][180]=num241;
             }
           }
          /* this.indexStr=this.index;
           this.$emit('update:index', this.indexStr);*/
           _this.matchVal();
         }else{

         }
       }).catch(err=>{

       })
    },
    methods: {
      //id与值匹配
      matchVal: function () {
        var _this=this;
        axios({
          method: "post",
          url: '/netCloudOffer/productsService/productlistByParam',
          data: {"id":_this.catalogId}
        }).then(res => {
           if(res.data.code==0){
             var mainData=res.data.data;
             //console.log('mainData:',mainData);
             var info;
             for(var index in mainData){
                 if(mainData[index].productInfo.prodId=='241'){
                   info=mainData[index].offerProductObjectAttrList;//产品信息
                 }
             }

//             console.log('241:',_this.main_data[241]);
             for(var key in _this.main_data[241])
             {
                 for(var index in info){
                   if(key==info[index].objectAttrInfo.attrId){
                       if(key==179){
                         _this.main_data[241][179]=info[index].objectAttrValueList[0].attrValueId;
                       }else if(key==148){
                         _this.getCpu(_this.main_data[241][147]);
                       }else if(key==145){
                          _this.resource_pool=info[index].objectAttrValueList;
                       }else if(key==163){
                          // console.log('_this.main_data[241][163]:',_this.main_data[241][163]);
                           var obj={};
                           for(var i in info[index].objectAttrValueList){
                               obj[info[index].objectAttrValueList[i].attrValueId]=info[index].objectAttrValueList[i].displayValue;
                           }
                          _this.select_data[163]=obj;
                       }else{
                         for(var i in info[index].objectAttrValueList){
                           if(info[index].objectAttrValueList[i].attrValueId==_this.main_data[241][key]){
                             _this.main_data[241][key]=info[index].objectAttrValueList[i].displayValue;
                           }
                         }
                         if(key==153){
                           _this.imagesFun(_this.main_data[241][152]);
                         }
                       }
                   }
                 }
             }
             _this.getPrice(true);
           }else{
             this.$alert(res.data.msg, '提示', {/*for()*/
               confirmButtonText: '确定',
               callback: action => {
                 return false;
               }
             });
           }
        }).then(res => {
        })
      },
      //amount的加减
      minusOrPlusTheAmount:function(m_or_p,event){
        event.preventDefault();
        if(m_or_p == '-' && this.main_data[241][164] > 1){
          this.main_data[241][164]--;
        }else if(m_or_p == '+' && this.main_data[241][164] < 100){
          this.main_data[241][164]++;
        }
        this.paramObj.duration=this.main_data[241][164];
        this.$emit('update:orderTransInstance', this.paramObj);
        this.getPrice(true);
        /*this.indexStr=this.index;
        this.$emit('update:index', this.indexStr);*/
      },
      //数量input输入时确保输入为1到max_amount间的数字。
      controlContent:function(item,event){
        var max_amount = 100;
//        var el = event.currentTarget;
        var amount_input = item.amount;
        //console.log(isNaN(amount_input));
        if(isNaN(amount_input)){
          item.amount = 1;
        }else if(amount_input < 1){
          item.amount = 1;
        }else if(amount_input > max_amount){
          item.amount = max_amount;
        }else{
          item.amount = amount_input;
        }
      },
      //镜像接口
      imagesFun:function(imageStyle){
        var _this=this;
        var _imageStyle=imageStyle;
        if(_imageStyle=='私有镜像'){_imageStyle="private"}
        else if(_imageStyle=="公共镜像"){_imageStyle="gold"}
        var regionIdStr='';
        for(var i in _this.resource_pool){
          if(_this.resource_pool[i].attrValueId==_this.main_data['241']['145']){
            regionIdStr=_this.resource_pool[i].objAttrValue;
            this.main_data['241']['145']=_this.resource_pool[i].displayValue;
          }
        }
        //console.log(_imageStyle,regionIdStr)
        var dataObj = {
          "imageType": _imageStyle,
          "regionId": regionIdStr
        };
        axios({
          method: "post",
          url:'/netCloudBusiness/queryYunRes/queryImages',
          /*url: 'http://134.98.100.71:8081/netcloud-businesscenter-web/queryYunRes/queryImages',*/
          data: dataObj
        }).then(res => {
          var jxData = res.data;
          //console.log('jxData:',jxData)
          var currentJxVal=_this.main_data[241][153];
          if(_imageStyle=='gold'){
            for(var key in jxData){
              for(var index in jxData[key]){
                if(currentJxVal==jxData[key][index].id){
                  _this.image_system.style=key;
                  _this.image_system.version=jxData[key][index].name;
                }
              }
            }
          }else{
            for(var index in jxData.returnObj){
                if(currentJxVal==jxData.returnObj[index].id){
                  _this.image_system.style='';
                  _this.image_system.version=jxData.returnObj[index].name;
                }
            }
          }
        }).catch(err => {
        })
      },
      //获取价格
      //获取产品价格
      getPrice:function(flag_getP_182){
        let that = this;
//        if(that.main_data['241']['143'] == '181') {
          let confList = {
            "offerInfo":{
              "offerId":301,// 商品id
              "offerObjectAttr": [
              ]
            },
            "productInfoList": [// 产品信息集合
              {
                "productInfo": {// 产品信息
                  "product": {// 产品信息
                    "prodId": 241,// 产品ID
                    "offerId": 301//商品ID
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
              if(that.main_data['241']['163'] == '229'){
                count = parseInt(that.main_data['241']['164']);
              }
              that.main_data['241']._item_p.amount = parseInt(lst.productInfoList[0].price) * count;
              that.$emit('update:price_and_num', {
                price: that.main_data['241']._item_p.amount,
                num: that.main_data['241']['180']
              });


              //that.main_data['241']._item_p.amount = lst.productInfoList[0].price;
              if(that.prodList) {
                //console.log('getprice1',that.prodList.cartItemId,that.main_data['241']._item_p.amount);
                if (flag_getP_182) {
                    //console.log('getprice2',that.prodList.cartItemId,that.main_data['241']._item_p.amount);
                  that.$emit('update:price_and_num', {
                    price: that.main_data['241']._item_p.amount,
                    num: that.main_data['241']['180']
                  });
                }
              }else{
                that.$emit('update:price_and_num', {
                  price: that.main_data['241']._item_p.amount,
                  num: that.main_data['241']['180']
                });
              }

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
/*        }else if(that.main_data['241']['143'] == '182') {
          that.main_data['241']._item_p.amount = 0;
          that.$emit('update:price_and_num', {
            price:that.main_data['241']._item_p.amount,
            num:that.main_data['241']['180']
          });
        }*/


      },
      //获取cpu联动
      getCpu:function(val){
        var _this=this;
        var dataObj={
          "tarAttrId":148+'',//对象属性值ID
          "linkageInfoList": [
            {
              "attrId":147+'',//属性标识ID
              "objAttVal": val+''//对象属性选用值(页面选择的参数值,cpu值)
            }
          ]
        };
        axios({
          method:"post",
          url:'/netCloudOffer/productsService/getLinkageInfo',
          data:dataObj
        }).then(res=>{
          if(res.data.code == 0){
            var mainData=res.data.objectAttrValueList;
            //console.log(mainData)
            for(var i in mainData){
              if(_this.main_data['241']['148']==mainData[i].attrValueId){
                _this.main_data['241']['148']=mainData[i].remark;
              }
            }
            _this.getPrice(true);
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
      },
      //checkbox模拟radio，点击赋值
      setCheckBox(index,key){
        this.main_data['241'][key] = index;
        this.paramObj.payType=this.main_data['241'][key];
        //console.log('paramObj:',this.paramObj)
        this.$emit('update:orderTransInstance', this.paramObj);
      }
    }
  }
</script>

