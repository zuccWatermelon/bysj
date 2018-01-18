<!--待补录订单详情-->
<template>
  <div class="page" id="toMakeInfo">
    <UserNav></UserNav>
    <div class="page-cont">
      <ClientManagerNav :routerlinks="routerlinks"></ClientManagerNav>
      <div class="right">
        <div class="right-main">
          <div class="top-btns">
            <router-link to="/ToMakeupOrder"><img src="../../assets/img/back.png">返回</router-link>
          </div>
          <div class="main-one">
            <div class="part-one">
              <span class="title-w1200">客户基本信息</span>
              <div class="IPRAN-conf">
                <div class="conf-l">
                  <div class="conf-l-m conf-l-netCloudBasicInfo">
                    <div class="conf-l-item">
                      <span class="item-label">客户类型：</span>
                      <input class="item-in" type="text" readonly v-model="clientInfo.clientStyle"/>
                    </div>
                    <div class="conf-l-item">
                      <span class="item-label">证件类型：</span>
                      <input class="item-in" type="text"  readonly v-model="clientInfo.idStyle"/>
                    </div>
                    <div class="conf-l-item">
                      <span class="item-label">证件号码：</span>
                      <input class="item-in" type="text"  readonly v-model="clientInfo.idNum"/>
                    </div>
                    <div class="conf-l-item">
                      <span class="item-label">联系电话：</span>
                      <input class="item-in" type="text"  readonly v-model="clientInfo.clientTel"/>
                    </div>
                    <div class="conf-l-item conf-l-item-addr">
                      <span class="item-label">客户地址：</span>
                      <input class="item-in" type="text"  readonly v-model="clientInfo.clientAddress"/>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div class="part-one">
              <span class="title-w1200">IPRAN线路配置信息</span>
              <div class="IPRAN-conf">
                <div class="conf-l">
                  <div class="conf-l-t l-t-first">1. 云专线 基本信息</div>
                  <div class="conf-l-m conf-l-netCloudBasicInfo">
                    <div class="conf-l-item conf-l-item-addr">
                      <span class="item-label">选择所属域：</span>
                      <input class="item-in" type="text"  readonly v-model="ipranInfo['123']"/>
                    </div>
                  </div>
                  <div class="conf-l-t">2. IPRAN线路设置</div>
                  <div class="conf-l-m conf-l-IPRANSet">
                    <div class="conf-l-item">
                      <span class="item-label">Qos等级模式：</span>
                      <input class="item-in" type="text" readonly v-model="ipranInfo['128']"/>
                    </div>
                    <div class="conf-l-item">
                      <span class="item-label"><img src="../../assets/img/icon_sulv.png"/>CE接入速率：</span>
                      <input class="item-in" type="text" readonly v-model="ipranInfo['129']"/>
                    </div>
                    <div class="conf-l-item">
                      <span class="item-label"><img src="../../assets/img/icon_sulv.png"/>速率类型：</span>
                      <input class="item-in" type="text"  readonly v-model="ipranInfo['140']"/>
                    </div>
                    <div class="IPRANSet-default">
                      <div class="button-collapse" data-collapse="default" @click="clickCollapse($event)">默认属性 <i :class="['el-icon-caret-bottom',{show:isShow}]"></i></div>
                      <div class="div-collapse" id="default">
                        <div class="conf-l-item">
                          <span class="item-label">付费方式：</span>
                          <input class="item-in" type="text" data-value="135"  readonly v-model="ipranInfo['135']"/>
                        </div>
                        <div class="conf-l-item">
                          <span class="item-label">电路维护等级：</span>
                          <input class="item-in" type="text" data-value="127" readonly v-model="ipranInfo['127']"/>
                        </div>
                        <div class="conf-l-item">
                          <span class="item-label">电路类型：</span>
                          <input class="item-in" type="text" data-value="138"  readonly v-model="ipranInfo['138']"/>
                        </div>
                        <div class="conf-l-item">
                          <span class="item-label">CE端提供方：</span>
                          <input class="item-in" type="text" data-value="136" readonly v-model="ipranInfo['136']"/>
                        </div>
                        <div class="conf-l-item">
                          <span class="item-label">起租/退租系数：</span>
                          <input class="item-in" type="text" data-value="137" readonly  v-model="ipranInfo['137']"/>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="conf-l-t">3. 装机相关信息</div>
                  <div class="conf-l-m conf-l-setupInfo">
                    <div class="conf-l-item">
                      <span class="item-label">客户联系人：</span>
                      <input class="item-in" type="text" data-value="124" value="" readonly v-model="ipranInfo['124']"/>
                    </div>
                    <div class="conf-l-item">
                      <span class="item-label">联系电话：</span>
                      <input class="item-in" type="text" data-value="125" readonly v-model="ipranInfo['125']"/>
                    </div>
                    <div class="conf-l-item">
                      <span class="item-label">预约起租时间：</span>
                      <input class="item-in" type="text" data-value="126"  readonly v-model="ipranInfo['126']"/>
                    </div>
                    <div class="conf-l-item setup-address">
                      <span class="item-label">装机地址：</span>
                      <input class="item-in" type="text" readonly v-model="ipranInfo.address"/>
                    </div>
                  </div>
                  <div class="conf-l-t" v-if="ipranInfo.amount">4. 一次性费用 (初装费)：</div>
                  <div class="conf-l-m conf-l-setupInfo"  v-if="ipranInfo.amount">
                    <div class="conf-l-item" style="width: 50%;">
                      <span class="item-label">一次性费用 (初装费)：</span>
                      <span>{{ipranInfo.amount}}元</span>
                      <!--<input class="item-in" type="text" data-value="130" readonly v-model="ipranInfo.amount"/>元-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="part-one input-gray">
              <span class="title-w1200">IPRAN线路配置信息</span>
              <div class="IPRAN-conf">
                <div class="conf-l">
                  <div class="conf-l-m conf-l-netCloudBasicInfo">
                    <div class="conf-l-item">
                      <span class="item-label">互联网地址：</span>
                      <input class="item-in" type="text" placeholder="" v-model="ipranSetInfo.internalAddress"/>
                    </div>
                    <div class="conf-l-item">
                      <span class="item-label">VLAN号：</span>
                      <input class="item-in" type="text" placeholder="" v-model="ipranSetInfo.vlanNum"/>
                    </div>
                    <div class="conf-l-item">
                      <span class="item-label">通道号：</span>
                      <el-select v-model="ipranSetInfo.nchan" size="small" placeholder="请选择">
                        <el-option
                          v-for="(item,index) in typeList"
                          :key="item.attrValueId"
                          :label="item.remark"
                          :value="item.attrValueId">
                        </el-option>
                      </el-select>
                      <!--<input class="item-in" type="text" placeholder="" v-model="ipranSetInfo.nchan"/>-->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom-btns">
            <router-link class="btn btn-gray" to="/ToMakeupOrder" >取消</router-link>
            <a class="btn btn-blue" href="javascript:void(0);" @click="cofirmInfo()">确定</a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<style scoped lang="less">
  a:fouse{
    text-decoration: none;
  }
  .page{
    background: #f3f8fb;
    overflow: hidden;
  }
  .page-cont{
    position: relative;
  }
  .right{
    width: 100%;
    padding-left: 14.16%;
  }
  .right-main{
    padding: 0 20px;
  }
  .top-btns{
    line-height:60px;
    font-size:18px;
    color:#ddd;
    img{
      width:20px;
      height:20px;
      vertical-align:middle;
      margin-right:5px;
    }
  }
  .main-one{
    background:white;
    padding:0 30px 20px;
  }
  .part-one{border-top:1px solid #e6e6e6;padding-top:35px;}
  .part-one.input-gray input{background:#dbdbdb;border-radius:4px;border:none;box-shadow:none;}
  .main-one .part-one:first-child{border-top:none;}
  .title-w1200{
    font-weight:bold;
    padding-left:15px;
    display: block;
    font-size: 18px;
    color:#fff;
    cursor: pointer;
    border-left:5px solid #30acee;
    color:#333;
    line-height:1;
    margin-bottom:10px;
  }
  .IPRAN-conf{

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
    .conf-l-t{
      margin-left:40px;
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
      line-height: 40px;
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
        border:none;
        outline:none;
      }
      .el-select{
        width: 45%;
      }
    }
    .conf-l-item-addr{
      width: 60%;
      .item-label{
        width: 28%;
      }
      input{
        width: 72%;
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
        width:48.3%;
      }
    }
    .IPRANSet-default{
      width:100%;
      min-height:45px;
      margin-bottom: 10px;
      float: left;
      .button-collapse{
        display: block;
        height:40px;
        border:1px solid #d5d5d5;
        cursor: pointer;
        line-height: 40px;
        text-align: center;
        background-color: #ededed;
        color:#666;
        margin-left:40px;
        margin-right:40px;
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
      line-height: 30px;
      text-align: center;
    }
  }
  /*以下为 加入购物车 行 */
  .main-two{
    width:100%;
    margin-top:50px;
    background-color: #e5e5e5;
  }
  .main-two-center{
    width:1200px;
    margin:0 auto;
    .add-to-cart{
      width:130px;
      height:70px;
      float: right;
      text-align: center;
      line-height: 70px;
      background-color: #ff8200;
      font-size: 16px;
      color:#fff;
    }
    .final-price{
      width:650px;
      height:50px;
      margin-top: 20px;
      margin-right:10px;
      float:right;
      text-align: right;
      p{
        line-height: 12px;
      }
      .orange{
        font-weight: bold;
        font-size: 26px;
        color:#ff8200;
      }
      .light-word{
        font-size: 12px;
        color:#999;
      }
    }
  }
  .main-two-center:after{
    content: ' ';
    display: block;
    overflow: hidden;
    height: 0;
    font-size: 0;
    clear: both;
  }
  .bottom-btns{
    padding:15px 0;
    text-align:right;
    .btn{
      width:100px;
      text-align:center;
      margin-left:15px;
      color:white;
    }
    .btn-gray{
      background-color:#e4e4e4;
    }
    .btn-blue{
      background-color:#2facee;
    }
  }
  .show{
    display: inline-block!important;
    transform:rotate(180deg);
    -ms-transform:rotate(180deg); 	/* IE 9 */
    -moz-transform:rotate(180deg); 	/* Firefox */
    -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
    -o-transform:rotate(180deg);
  }
</style>
<script>
  import UserNav from '../common/UserHeader.vue';
  import ClientManagerNav from '../common/ClientManagerNav.vue';
  import '../../assets/css/el-select-type1.css';
  export default {
    components:{
      UserNav,
      ClientManagerNav
    },
    data(){
      return{
        routerlinks:{
          current:'/waitRecord',
          links:[
            {
              name:'待补录订单',
              link:'/waitRecord'
            }
          ]
        },
        clientInfo:{
          clientStyle:'',
          idStyle:'',
          idNum:'',
          clientAddress:'',
          clientTel:''
        },
        ipranInfo:{
          '123':"",//选择所属域
          '128':'', //Qos等级模式
          '129':'',//CE接入速率
          '140':'',// 速率类型
          '135':'',// 付费方式
          '127':'',// 电路维护等级
          '138':'',// 电路类型
          '136':'',// CE端提供方
          '137':'',// // 起租/退租系数
          address:'', //
          '124':'',// //客户联系人
          '125':'',// // 联系电话
          '126':'',// //预约起租时间
          amount:'',// //一次性费用
        },
        ipranSetInfo:{
          internalAddress:'',
          vlanNum:'',
          nchan:''
        },
        isShow:false,
        typeList:[]
      };
    },
    created(){
      var self = this;
      var idnum = this.$route.query.idnum;
      axios({
        method:"post",
        url:"/netCloudOrder/cartItemAttrService/queryCartItemAttr2",
        data: {
          orderItemId:idnum,
        }
      }).then(
          res=>{
            var allIdList = [];
            res.data.data.productAttrList.forEach((v,i)=>{
              if(v.productId == '201' || v.parProdId == '201'){
                allIdList = allIdList.concat(v.serviceAttrList);
                if(v.productId == '201'){
                  self.ipranInfo.address = v.addressDesc;
                }
              }
              if(v.productId == '222'){
                self.ipranInfo.amount = v.amount;
              }
            });
            var allValueList = [];
//              获取中文值
            self.clientInfo.clientStyle = res.data.data.productAttrList[0].custType;
            self.clientInfo.idStyle = res.data.data.productAttrList[0].certName;
            self.clientInfo.idNum = res.data.data.productAttrList[0].certNum;
            self.clientInfo.clientAddress = res.data.data.productAttrList[0].contactAddr;
            self.clientInfo.clientTel = res.data.data.productAttrList[0].mobile;
            axios({
              method:"post",
              url:'/netCloudOffer/productsService/productlistByParam',
              data:{
                id:'261'
              }
            }).then(res=>{
              let dataList = res.data.data;
              dataList.forEach((item,index)=>{
                item.offerProductObjectAttrList.forEach((v,i)=>{
                  let key = v.objectAttrInfo.attrId;
                  allValueList[key] = v.objectAttrValueList;
                  //        获取通道号选值
                  if(v.objectAttrInfo.attrId == '132'){
                    self.typeList = v.objectAttrValueList;
                  }
                });
              });
              allIdList.forEach((item)=>{
                let valueArr = allValueList[item.attrId];
                self.ipranInfo[item.attrId] = item.attrValue;
                if(valueArr.length > 0){
                  valueArr.forEach((v)=>{
                    if(item.attrValue == v.attrValueId){
                      self.ipranInfo[item.attrId] = v.displayValue;
                    }
                  });
                } else {
                  self.ipranInfo[item.attrId] = item.attrValue;
                }
              });
//              起租时间转换
              if(self.ipranInfo['126']){
                self.ipranInfo['126'] = self.dateChange(self.ipranInfo['126']);
              }
            }).catch(err=>{
              console.log(err);
            });
          }
      ).catch(err=>{
          console.log(err)
      });

//      self.typeFun();
    },
    methods:{
      clickCollapse:function(event){
        var el = event.currentTarget;
        var flag = el.getAttribute('data-collapse');
        var className = document.getElementById(flag).className;
        if(className.indexOf('hidden') > -1){
          className = className.replace("hidden","");
          document.getElementById(flag).setAttribute("class",className );
        }else{
          className = className.concat(" hidden");
          document.getElementById(flag).setAttribute("class",className );
        }
        this.isShow = !this.isShow;
      },
      cofirmInfo:function(){
        var self = this;
        self.ipranSetInfo.vlanNum = self.ipranSetInfo.vlanNum.replace(/^\s+|\s+$/g,"");
        let cartItemId = self.$route.query.idnum;
        let productId = self.$route.query.prodId;
        let custOrderId = self.$route.query.custOrderId;
        let data = {
          cartItemId:cartItemId,
          custOrderId: custOrderId,
          itemCd:'1',
          productAttrList:[
            {
              productId:'204',
              amount:0,
              serviceAttrList:[
                {
                  attrId:'130',
                  attrValue: self.ipranSetInfo.internalAddress
                },
                {
                  attrId:'131',
                  attrValue: self.ipranSetInfo.vlanNum
                },
                {
                  attrId:'132',
                  attrValue: self.ipranSetInfo.nchan
                }
              ]
            }
          ]
        };
        if(self.ipranSetInfo.internalAddress && self.ipranSetInfo.vlanNum && self.ipranSetInfo.nchan.toString().length > 0){
            let isIPBool = self.isIP(self.ipranSetInfo.internalAddress);
//            let domain = self.isDomain(self.ipranSetInfo.internalAddress);
            console.log(isIPBool);
            if(isIPBool){
              axios({
                method:"post",
                url:"/netCloudOrder/shoppingCartService/updateShoppingCart3",
                data:data
              }).then(res=>{
                if(res.data.code == '0' || res.data.code == 0){
                  self.$alert('补录成功，请联系客户经理~', '提示', {
                    confirmButtonText: '确定',
                    callback:action=>{
                      self.$router.push('/toMakeupOrder');
                    }
                  });
                } else {
                  self.$alert('补录出错', '提示', {
                    confirmButtonText: '确定',
                    callback:action=>{

                    }
                  });
                }
              }).catch(err=>{
                console.log(err);
              })
            } else {
              self.$alert('请填写正确的互联网地址，如10.10.10.10/10', '提示', {
                confirmButtonText: '确定',
                callback:action=>{

                }
              });
            }
        } else {
          self.$alert('请填写完整信息', '提示', {
            confirmButtonText: '确定',
            callback:action=>{

            }
          });
        }
      },
      goBack:function(){
          window.history.go(-1);
          window.location.reload();
      },
      typeFun(){
        var self = this;
        axios({
          method:"post",
          url:"/netCloudOffer/dictionaryService/dictionaryTypeList",
          data:{
            type:"channel"
          }
        }).then(res=>{
          self.typeList = res.data.data;
        }).catch(err=>{

        });
      },
//      验证Ip地址
      isIP(ip){
        var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)\/(\d+)$/;
        if (reSpaceCheck.test(ip)) {
          ip.match(reSpaceCheck);
          if (RegExp.$1<=255&&RegExp.$1>=0
            &&RegExp.$2<=255&&RegExp.$2>=0
            &&RegExp.$3<=255&&RegExp.$3>=0
            &&RegExp.$4<=255&&RegExp.$4>=0
            &&RegExp.$5<=255&&RegExp.$5>=0){
            return true;
          }else
          {
            return false;
          }
        }else
        {
          return false;
        }
      },
//      验证域名
      isDomain(ip){
        var str = "^((https|http|ftp|rtsp|mms)?://)"
          + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
          + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
          + "|" // 允许IP和DOMAIN（域名）
          + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
          + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
          + "[a-z]{2,6})" // first level domain- .com or .museum
          + "(:[0-9]{1,4})?" // 端口- :80
          + "((/?)|" // a slash isn't required if there is no file name
          + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
        var reSpaceCheck = new RegExp(str);
        if(reSpaceCheck.test(ip)){
            return true;
        } else {
            return false;
        }
      },
      dateChange(date) {
        let date1 = new Date(date.toString());
        let y = date1.getFullYear();
        let m = date1.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date1.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date1.getHours();
        let minute = date1.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        let second = date1.getSeconds();
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
      }
    }
  }
</script>
