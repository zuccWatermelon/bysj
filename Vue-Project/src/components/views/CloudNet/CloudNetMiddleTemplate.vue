<!-- 云网通配置外层组件 -->
<template>
  <div class="whiteBg">
    <CloudNetHost :dataBool_host.sync="dataBool_host" :mainData_host.sync="mainData_host" :prodList.sync="prodList_copy" :payType="pay_type"
                  ref="cloudNetHostFunc"
                  :cant_edit="cant_edit"
                  :prodInstId.sync = "prodInstId['261']"
                  @GetPrice="getPrice"
                  :payNum = 'pro_data[280]'></CloudNetHost>
    <CloudNetLine :dataBool_line.sync="dataBool_line" :mainData_line.sync="mainData_line" :prodList.sync="prodList_copy" :payType="pay_type" ref="cloudNetLineFunc"></CloudNetLine>
    <CloudNetConfig v-if="dataBool_host && dataBool_line" :prodList.sync="prodList_copy" :mainData_host="mainData_host" :mainData_line="mainData_line" :chanel="chanel" @updateConf="updateCartConf"></CloudNetConfig>

    <div class="product_part pay-way">
      <div class="product_bar clearfix">
        <span class="attr_name">付费方式</span>
        <div class="attr_val">
          <div class="input_wrap" v-for="(item,index) in select_data['252']">
            <input type="checkbox" name="pay_style"
                   :checked="pro_data['252'] == index"
                   :disabled="pro_data['252'] == index || cant_edit"
                   @change="cant_edit ? '':setCheckBox(index,'252')"/>
            {{item[0]}}
          </div>
        </div>
      </div>
    </div>

    <div class="product_part pay-way">
      <div class="product_bar clearfix">
        <span class="attr_name">付费账户</span>
        <div class="attr_val">
          <!--<div class="input_wrap" v-for="(item,index) in select_data['280']">-->
          <select :disabled="cant_edit" v-model="pro_data['280']">
            <option v-for="(item,index) in select_data['280']" :value="index">{{item}}</option>
          </select>
          <!--</div>-->
        </div>
      </div>
    </div>

    <div class="bot_price" v-if="chanel !== 'shoppingCart'">
      <div class="w1200 clearfix">
        <p>配置费用：<span class="price_num">¥{{pro_data._item_p.amount}}</span></p>
        <div class="gocart_btn" @click="cant_edit ? '':addToShoppingCart(offerId,'','1')">加入购物车</div>
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
    border-top:1px solid #e8e8e8;
    padding-top:5px;
    padding-bottom:20px;
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
  import CloudNetHost from './CloudNetHost.vue';
  import CloudNetLine from './CloudNetLine.vue';
  import CloudNetConfig from './CloudNetConfig.vue';

  export default{
    props:[
      'prodList','chanel','price_and_num'
    ],
    data(){
      return {
        dataBool_line:false,//判断云专线数据是否加载完全
        dataBool_host:false,//判断云产品数据是否加载完全
        CUST_ID:'',//客户Id
        readValBool:false,//是否是有配置信息
        cant_edit:false,//判断所有属性能不能修改
        catalogId:'181',//商品目录id
        offerId:'',//商品id
        prodInstId:{
          '261':'',//云主机实例ID
        },
        prodList_copy:{},
        pay_type:'',
        mainData_host:{
          parProdId:'',//主产品id
          main_data:{},//配置信息
        },
        mainData_line:{
          parProdId:'',
          main_data:{},
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
        show_data:{},
        //该模板中select_data最后一层key:[displayValue,objAttrValue]
        select_data:{
          '252':{},//商品信息中的收费方式
         },

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
    computed:{
      main_data:function(){
        let _this = this;
        let main_data_copy = Object.assign({}, _this.mainData_host.main_data, _this.mainData_line.main_data);
        for(let i in _this.mainData_host.main_data){
          if(i !== _this.mainData_host.parProdId){
            main_data_copy[i]._item_p = main_data_copy[i]._item_p || {};
            main_data_copy[i]._item_p.parProdId = _this.mainData_host.parProdId;
          }else{
            main_data_copy[i]._item_p = main_data_copy[i]._item_p || {};
            main_data_copy[i]._item_p.parProdId = '';
          }
        }
        for(let i in _this.mainData_line.main_data){
          if(i !== _this.mainData_line.parProdId){
            main_data_copy[i]._item_p = main_data_copy[i]._item_p || {};
            main_data_copy[i]._item_p.parProdId = _this.mainData_line.parProdId;
          }else{
            main_data_copy[i]._item_p = main_data_copy[i]._item_p || {};
            main_data_copy[i]._item_p.parProdId = '';
          }
        }
        return main_data_copy;
      },
/*      pay_type:function(){
        return this.select_data['252'][this.pro_data['252']][1];
      }*/
    },
    watch:{
      pro_data:{
        handler(curVal,oldVal){
          this.pay_type = this.select_data['252'][this.pro_data['252']][1];
        },
        deep:true
      }
    },
    components:{
      CloudNetHost,
      CloudNetLine,
      CloudNetConfig,
    },
    mounted(){
      let _this = this;

      if(_this.prodList){
        _this.offerId = _this.prodList.offerId;
        _this.prodList_copy = _this.prodList;
        //子组件初始化
        _this.$refs.cloudNetHostFunc.initializtion(_this.prodList);
        _this.$refs.cloudNetLineFunc.initializtion(_this.prodList);
        //初始化商品配置中的收费方式
        _this.setProdConf(_this.prodList);
      }else {
        _this.offerId = _this.$route.query.offerId;
        axios({
          method: "post",
          url: '/netCloudOffer/productsService/productlistByParam',
          data: {id: _this.offerId}
        }).then(res => {
          if (res.data.code == 0) {
            axios({
              method:'post',
              url:"/netCloudOffer/offerService/getofferinfobyoffercatalog",
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
                  _this.$refs.cloudNetHostFunc.initializtion(_this.prodList_copy);
                  _this.$refs.cloudNetLineFunc.initializtion(_this.prodList_copy);
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
        let prod_data = confList.confListOfProd;
        let info = prod_data.offerObjInfo;
        let infoObj = {};//基本属性对象
        let infoListObj = {};//联动列表的对象
        let relationArr = {};//联动关系
        for (let i in info) {
          let attrId = info[i].objAttrInfo.attrId;
          infoObj[attrId] = info[i].objAttrInfo.displayValue;
          infoListObj[attrId] = {};
          if (info[i].objAttrValList.length > 0) {
            let perObj = {};
            for (let k in info[i].objAttrValList) {
              if (info[i].objAttrValList[k].objAttrValue == info[i].objAttrInfo.defaultValue) {
                infoObj[attrId] = info[i].objAttrValList[k].attrValueId;
              }
              perObj[info[i].objAttrValList[k].attrValueId] = [info[i].objAttrValList[k].displayValue,info[i].objAttrValList[k].objAttrValue];
            }
            infoListObj[attrId] = perObj;
          }
        }
        infoObj._item_p = {
          amount:'',
          num:1
        };

        _this.pro_data = infoObj;

        //获取所有产品的下拉列表
        var confListData=confList.confList;
        let select_data={};
        for(let index in confListData){
          var perIndexArr=confListData[index].offerProductObjectAttrList;
          for(let m in perIndexArr){
            var obj={};
            var attrId=perIndexArr[m].objectAttrInfo.attrId;
            var valListArr=perIndexArr[m].objectAttrValueList;
            if(valListArr.length>0){
              for(let n in valListArr){
                obj[valListArr[n].attrValueId]=[valListArr[n].displayValue,valListArr[n].objAttrValue];
              }
              select_data[attrId]=obj;
            }
          }

        }
        //合并商品信息和产品中的有属性列表的属性
        _this.select_data = Object.assign({}, select_data, infoListObj);

        if(_this.prodList){
          _this.getCartConf();
        }
        _this.getPrice();

          /**获取付费账户**/
          let cust = window.sessionStorage.getItem('cust');
          if (cust == null || cust == "") {
            this.$alert('您未选择客户，请选择', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                return false;
              }
            });
          }
          ;
          let custId = JSON.parse(cust).CUST_ID;
          axios({
            method: 'post',
            url: '/netCloudCustomer/acctService/queryAcctInfo',
            data: {
              custId: custId
            }
          }).then(res => {
            if (res.data.data.length > 0) {
              res.data.data.forEach((v) => {
                res.data.data.forEach((v) => {
                  infoListObj['280'][v.acctId] = v.acctCode;
                  if (!infoObj['280']) {
                    infoObj['280'] = v.acctId;
                  }
                });
                _this.pro_data = infoObj;
                //合并商品信息和产品中的有属性列表的属性
                _this.select_data = Object.assign({}, select_data, infoListObj);
/*                if(_this.prodList){
                  _this.getCartConf();
                }
                _this.getPrice();*/
              });

            } else {
              _this.$alert('该客户无付款账户，无法购买该产品', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.$router.push('/');
                }
              });
            }

          }).catch(err => {
          });

      },
      //checkbox模拟radio，点击赋值
      setCheckBox(index,key){
        this.pro_data[key] = index;
      },
      //数量input输入时确保输入为1到max_amount间的数字。
      controlContent:function(item,event){
        let max_amount = 100;
//        let el = event.currentTarget;
        let amount_input = item.amount;
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
      //amount的加减
      minusOrPlusTheAmount:function(m_or_p,item,event){
        event.preventDefault();
        if(m_or_p == '-' && item.amount > 1){
          item.amount--;
        }else if(m_or_p == '+' && item.amount < 100){
          item.amount++;
        }
      },

      //获取产品价格
      getPrice:function(){
        let that = this;
        let confList = {
          "offerInfo": {
            "offerId": that.offerId,
            "offerObjectAttr": []
          },
          "productInfoList": [// 产品信息集合
          ]
        };

        for(let x in that.pro_data){
          if(x !== '_item_p'){
            if(that.select_data[x] != null && that.select_data[x][that.pro_data[x]] != undefined && that.select_data[x][that.pro_data[x]][1] != undefined){
              //可能会出现select_data不存在x的情况，暂时不会有错，待优化
              confList.offerInfo.offerObjectAttr.push({
                "objAttrId": x,// 对象属性ID
                "objAttVal": that.select_data[x][that.pro_data[x]][1]
              });
            }
          }
        }
        for(let x in this.main_data) {
          confList.productInfoList.push({
            "productInfo": {// 产品信息
              "product": {// 产品信息
                "prodId": x, // 产品ID
                "offerId": that.offerId//商品ID
              },
              "objectAttr": []
            }
          });
          let length_of_productInfoList = confList.productInfoList.length;
          for (let one in this.main_data[x]) {
            if (one !== '_item_p') {
              //main_data['241']中保存的是id值还是属性值的标示
              let flag = true;
              for (let item in this.select_data) {
                //如果是id值，在select_data中遍历获取属性值
                if (one == item) {

                  if(that.select_data[one] != null && that.select_data[one][that.main_data[x][one]] != undefined && that.select_data[one][that.main_data[x][one]][1] != undefined) {
                    //可能会出现select_data不存在x的情况，暂时不会有错，待优化
                    confList.productInfoList[length_of_productInfoList - 1].productInfo.objectAttr.push({
                      "objAttrId": one,// 对象属性ID
                      "objAttVal": this.select_data[item][this.main_data[x][one]][1]
                    });
                  }
                  flag = false;
                }
              }
              //如果是属性值就直接保存
              if (flag) {
                confList.productInfoList[length_of_productInfoList-1].productInfo.objectAttr.push({
                  "objAttrId": one,// 对象属性ID
                  "objAttVal": this.main_data[x][one] || '0'
                });
              }
            }
          }
          //241的163属性临时赋值，待优化
          if(x == '241'){
            let val = '';
            let flag_163 = true;
            for(let xx in confList.offerInfo.offerObjectAttr){
              if(confList.offerInfo.offerObjectAttr[xx].objAttrId == '252'){
                val = confList.offerInfo.offerObjectAttr[xx].objAttVal;
              }
            }
            for(let one in confList.productInfoList[length_of_productInfoList - 1].productInfo.objectAttr){
              if(confList.productInfoList[length_of_productInfoList - 1].productInfo.objectAttr[one].objAttrId == '163'){
                confList.productInfoList[length_of_productInfoList - 1].productInfo.objectAttr[one].objAttVal = val;
                flag_163 = false;
              }
            }
            if(flag_163){
              confList.productInfoList[length_of_productInfoList - 1].productInfo.objectAttr.push({
                "objAttrId": '163',// 对象属性ID
                "objAttVal": val
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
            that.pro_data._item_p.amount = parseInt(lst.offerInfo.offerPrice);
            for(let i in lst.productInfoList){
              let prodId = lst.productInfoList[i].prodId;
              let price = parseInt(lst.productInfoList[i].price);
              if(price){
                that.mainData_host.main_data[prodId]._item_p.amount = price;
              }
            }

            that.$emit('update:price_and_num', {
              price: that.pro_data._item_p.amount,
              num: 1,
            });
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

      /////////////////////////加入购物车************************
      addToShoppingCart(prodId, prodFuncType,statusCd){
        let _this = this;
        let user = window.sessionStorage.getItem('user');
        let cust = window.sessionStorage.getItem('cust');

        /**加入购物车数据拼装**/
/*        for(let key in _this.mainData_host.main_data){
          _this.main_data[key]=_this.mainData_host.main_data[key];
        }
        for(let key in _this.mainData_line.main_data){
          _this.main_data[key]=_this.mainData_line.main_data[key];
        }*/

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
        if(_this.$refs.cloudNetHostFunc.hasErrorWhenSubmit() || _this.$refs.cloudNetLineFunc.hasErrorWhenSubmit()){
          this.$alert('存在输入格式错误，请先根据提示进行检查修改后再加入购物车','提示',{
            confirmButtonText: '确定',
            callback: action => {
              _this.submit_flag = false;
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
                parProdId:_this.parProdId,
                amount: obj,
                serviceAttrList: []
              }
              product_List.push(pro_item);
            } else if ((typeof obj == 'object') && obj.constructor == Object) {
              let pro_item = {};
              pro_item = {
                productId: item,
                parProdId:obj._item_p.parProdId,
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
/*              if(pro_item.productId == "201" || pro_item.productId == "261"){
                  pro_item.parProdId = "";
              }else if(pro_item.productId == "241"){
                  pro_item.parProdId = "261";
              }else if(pro_item.productId == "203" || pro_item.productId == "204" || pro_item.productId == "222"){
                pro_item.parProdId = "201";
              }*/
              /**如果账号非新建，送对应的prodInstId,否则送空**/
              if(_this.prodInstId[pro_item.productId]){
                pro_item.newProdFlag = 'N';
                pro_item.prodInstId = _this.prodInstId[pro_item.productId];
              }else{
                pro_item.newProdFlag = 'Y';
                pro_item.prodInstId = '';
              }
              product_List.push(pro_item);
            }
          }
          let pro_data_list = [];
          for(let item in _this.pro_data){
            if(item !== '_item_p'){
              let pro_item_in = {
                attrId: item,
                attrValue: _this.pro_data[item]
              }
              pro_data_list.push(pro_item_in);
            }
          }
          //----IPRAN加入购物车并保存配置----------------------------------------------------------------
         axios({
            url: '/netCloudOrder/shoppingCartService/addShoppingCart',
            method: 'post',
            data: {
              code:prodId,
              itemCd:1,     //1新装 2 试用
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
              amount:_this.pro_data._item_p.amount,
              serviceAttrList:pro_data_list,
              productAttrList: product_List
            }
          }).then(response => {
            if (response.data.code == "0") {
              this.$router.push({path: '/shoppingCartFrame'});
            } else {
              this.$alert(response.data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.submit_flag = false;
                  return false;
                }
              });
            }
          }).catch(err => {
            _this.submit_flag = false;
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

        if(_this.$refs.cloudNetHostFunc.hasErrorWhenSubmit() || _this.$refs.cloudNetLineFunc.hasErrorWhenSubmit()){
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
                parProdId:_this.parProdId,
                amount: obj,
                serviceAttrList: []
              }
              product_List.push(pro_item);
            } else if ((typeof obj == 'object') && obj.constructor == Object) {
              let pro_item = {};
              if(_this.parProdId == item){
                pro_item = {
                  productId: item,
                  parProdId:'',
                  serviceAttrList: []
                }
              }else{
                pro_item = {
                  productId: item,
                  parProdId:_this.parProdId,
                  serviceAttrList: []
                }
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
              /**如果账号非新建，送对应的prodInstId,否则送空**/
              if(_this.prodInstId[pro_item.productId]){
                pro_item.newProdFlag = 'N';
                pro_item.prodInstId = _this.prodInstId[pro_item.productId];
              }else{
                pro_item.newProdFlag = 'Y';
                pro_item.prodInstId = '';
              }
              product_List.push(pro_item);
            }
          }

          let pro_data_list = [];
          for(let item in _this.pro_data){
            if(item !== '_item_p'){
              let pro_item_in = {
                attrId: item,
                attrValue: _this.pro_data[item]
              }
              pro_data_list.push(pro_item_in);
            }
          }
          //一次性费用
          let tmpVar = {};
          tmpVar.productId = '222';
          tmpVar.amount = '5200';
          tmpVar.serviceAttrList = [];
          tmpVar.parProdId = '201';
          product_List.push(tmpVar);

          //----IPRAN加入购物车并保存配置----------------------------------------------------------------
          axios({
            url: '/netCloudOrder/shoppingCartService/updateShoppingCart2',
            method: 'post',
            data: {
              statusCd:statusCd,
              itemCd:1,     //1新装 2 试用
              cartItemId:_this.prodList.cartItemId,
              loginUserId: loginUserId,
              offerId: prodId,
              amount:_this.pro_data._item_p.amount,
              serviceAttrList:pro_data_list,
              productAttrList: product_List
            }
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
              this.$alert('保存配置出错!', '提示', {
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

      //加载购物车配置
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
        //_this.getPrice();
        if(_this.prodList.statusCd == '15' || _this.prodList.statusCd == '12' || _this.prodList.statusCd == '1'){
          _this.cant_edit = false;
        }else{
          _this.cant_edit = true;
        }
        if(1 == 0){
          this.$emit('update:prodList', '');
        }
      },
    }
  }
</script>

