<template>
  <div class="index">
    <MyNav class="nav" :current="current" :custData="custData"></MyNav>
    <div class="header">
      <div class="header-one">
        <router-link to="/shoppingCartFrame" class="header-one-on">
          返回
        </router-link>
        <p class="header-one-p">添加配置</p>

        <!--start of 付费账户-->
        <div class="pay-account">
          <div>
            <span>付费账户:</span>
            <el-select size="mini" v-model="account" placeholder="请选择付费账户">
              <el-option
                v-for="item in accountList"
                :key="item.acctId"
                :label="item.acctCode"
                :value="item.acctCode">
              </el-option>
            </el-select>
          </div>
        </div>
        <!--end of 付费账户-->

      </div>
      <div class="header-two">
        <div class="header-two-on"></div>
        <p class="header-two-tw">T+普及版 V12.2模块选择</p>
        <div class="allpng">
          <a href="javascript:void(0)"><img v-if="add==true" src="../assets/img/alloction.png" alt="" @click="aff"></a>
          <a href="javascript:void(0)"><img v-if="add==false" src="../assets/img/alloc.png" alt="" @click="acc"></a>
        </div>
      </div>
      <div class="header-three" v-show="add">
        <table>
          <tr class="header-three-one">
            <td style=" width: 100px">
              <!--<input type="checkbox" v-model="checkBoxArr[0]" @click="selectAll(0,custDataList)">-->
              <!--全选-->
            </td>
            <td style=" width:160px;">模块组</td>
            <td style= "width:460px;">模块说明</td>
            <td style= "width:245px;">站点数</td>
            <td>价格合计</td>
          </tr>
          <tr class="header-three-two" v-for="(item,index0) in custDataList">
            <td style=" width: 100px">
              <input type="checkbox" v-model="item.checkBox" @change="itemSelect(index0,custDataList,0,'sumPrice1')" />
            </td>
            <td style="width:160px;">
              <p style="display: inline-block;text-align: left;">{{item.productList.prodName}}</p>
            </td>

            <td style="width:460px;">
              <p style="display: inline-block;text-align: left;width:300px;">{{item.productList.prodDesc}}</p>
            </td>

            <td class="coludBuybRight-fec">
                      <span class="whole-fred">
                          <div class="numTag" v-if="item.siteList == '' || item.siteList == null">1</div>
                          <div v-if="item.siteList != null && item.siteList != ''">
                               <select class="select-after-label form-control J_num" :data="item.sitNum" v-model="item.sitNum" @change="sitNumChange(index0,$event)">
                                  <option :value="subItem.objAttrValue"  v-for="(subItem,index1) in item.siteList" style="text-align: center;">{{subItem.objAttrValue}}</option>
                              </select>
                          </div>
                      </span>
            </td>
            <td class="coludBuybRight-fed">
              {{item.productList.basePrice}}
            </td>
          </tr>
        </table>
      </div>
      <div class="header-two">
        <div class="header-two-on"></div>
        <p class="header-two-tw">App应用</p>
        <div class="allpng">
          <a href="javascript:void(0)"><img v-if="agg==true" src="../assets/img/alloction.png" alt="" @click="num"></a>
          <a href="javascript:void(0)"><img v-if="agg==false" src="../assets/img/alloc.png" alt="" @click="sum"></a>
        </div>
      </div>

      <!--互联网产品-->
      <div class="header-body" v-show="agg">
        <table>
          <tr class="header-three-one">
            <td style=" width: 100px">
              <!--<input type="checkbox" id="check_all" v-model="checkBoxArr[1]"  v-on:click="selectAll(1,demoEvent)">-->
              <!--全选-->
            </td>
            <td style=" width: 160px">APP应用名称</td>
            <td style=" width: 460px">APP说明</td>
            <td style=" width: 245px">价格</td>
            <td>价格合计</td>
          </tr>
          <tr class="header-three-thr" v-for="(item,index) in demoEvent">
            <td style=" width: 100px;text-align: center">
              <input type="checkbox"  class="checkec" v-model="item.checkBox" :value=item.productList.prodId @change="itemSelect(index,demoEvent,1,'sumPrice2')" />
            </td>
            <td class="coludBuybRight-fee">
              {{item.productList.prodName}}
            </td>
            <td class="coludBuybRight-fea">
              <p style="display: inline-block;text-align: left;">
                {{item.productList.prodDesc}}
              </p>
            </td>
            <td class="coludBuybRight-feb">
              {{item.productList.basePrice}}
            </td>
            <!--<td class="coludBuybRight-fec">-->
            <!--{{sumPrice2[index]}}-->
            <!--</td>-->
            <td class="coludBuybRight-fed">
              {{item.productList.basePrice}}
            </td>
          </tr>
        </table>
      </div>
      <div class="header-two">
        <div class="header-two-on"></div>
        <p class="header-two-tw">产品服务选择</p>
        <div class="allpng">
          <a href="javascript:void(0)"><img v-if="aed==true" src="../assets/img/alloction.png" alt="" @click="odd"></a>
          <a href="javascript:void(0)"><img v-if="aed==false" src="../assets/img/alloc.png" alt="" @click="off"></a>
        </div>
      </div>
      <!--产品服务选择-->
      <div class="header-nav" v-show="aed">
        <table>
          <tr class="header-three-one">
            <td style=" width: 100px">
              <!--<input type="checkbox" @click="subnum($event)" v-model="checkBoxArr[2]" id="check_aller">-->
              <!--全选-->
            </td>
            <td style=" width: 160px">产品服务名称</td>
            <td style=" width: 460px">服务内容概要</td>
            <!--<td style=" width: 245px">选配组件</td>-->
            <td style=" width: 245px">价格</td>
            <td>价格合计</td>
          </tr>
          <tr class="header-three-thr" v-for="(item,index) in custClick">
            <td style=" width: 100px">

            </td>
            <td class="header-nav-on">
              <p style="width: 110px">
                <input type="radio" name="proCheck" class="check" :value="index" v-model="serValue" @change="sumPrice">
                {{item.productList.prodName}}</p>
            </td>
            <td class="header-nav-two">
              <p>
                {{item.productList.prodDesc}}
              </p>
            </td>
            <!--<td class="coludBuybRight-fec">-->

            <!--</td>-->
            <td class="header-nav-thr">
              <input class="proInput" @change="productSumPrice" v-model="item.price" />%
              <!--<p>{{parseInt(item.productList.basePrice)}}%</p>-->
            </td>
            <td style="text-align: center" class="coludBuybRight-fed">
              {{sumPrice3[index]}}
            </td>
          </tr>
        </table>
      </div>
      <div class="header-footer">
        <!--<p id="header-footer-on"><input type="checkbox" class="checkone" @click="need" v-model="cust">全选 <span id="header-footer-tw">* “零售管理” 不支持单独订购，至少要订购库存核算和购销管理</span>-->
        <!--<span id="header-footer-thr">已选 <span style="color: #e88215"></span> 个模块</span>-->
        <!--</p>-->
        <p id="header-footer-ower">总价合计&nbsp;: <span>{{amount}}</span></p>
        <!--<p id="header-footer-owerder">折扣优惠&nbsp;:￥1850</p>-->
        <div id="header-footer-ow" v-bind:style="{ background: activeColor}" @click="submit">保存配置</div>
      </div>
    </div>
    <MyFooter></MyFooter>
  </div>
</template>
<script>
  import MyNav from './common/MyNav.vue';
  import MyFooter from './common/MyFooter.vue';

  export default {
    components:{
      MyNav,
      MyFooter
    },
    data(){
      return{
        /**付费账户**/
        account:'',
        /**付费账户对应的id**/
        accountId:'',
        /**付费账户列表**/
        accountList:[],
        current:"index",
        custData:{},
        test:"",
        //siteList:[],
        siteList:[1,2,3],
        add : true,
        agg : true,
        aed : true,
        cust : false,
        amount : 0,
        custDataList : [],
        custClick : [],
        demoEvent : [],
        affed : [],
        activeColor : "#ff8200",
        sumPrice1:[],
        sumPrice2:[],
        sumPrice3:[],
        checkBoxArr:[],
        changeData:[],
        serValue:''
      }
    },
    mounted:function () {
      var self = this;
      var cust = window.sessionStorage.getItem('cust');
      self.custData = JSON.parse(cust);

      axios({
        method:'post',
        url:'/netCloudOrder/cartItemAttrService/queryCartItemAttr',
        data: {
          cartItemId:self.$route.query.cartItemId,
          offerId:self.$route.query.offerId,
          catalogId:self.$route.query.catalogId,
        }
      }).then(
        res=>{
          if(res.data.code == '0'){
            self.changeData = res.data.data.productAttrList;
            /**获取付费账户**/
            self.accountId = res.data.data.accountId;
            self.getAccount();
          }
          axios({
            method:'post',
            url:"/netCloudOffer/productsService/getproductlistbyofferidandproducttype",
            params: {
              offerId:self.$route.query.offerId,
              prodFuncType:0,
            }
          })
            .then(response => {
              self.custDataList = response.data.data;
              for(var i = 0; i< self.custDataList.length; i++){
                self.custDataList[i].checkBox = false;
                var num = 1;
                if(self.custDataList[i].siteList.length == 0){
                  num = 1;
                } else {
                  num =self.custDataList[i].siteList[0].objAttrValue;
                }
                self.custDataList[i].sitNum = num;
                self.changeData.forEach((v,j)=>{
                  if(v.prodId == self.custDataList[i].productList.prodId){
                    self.custDataList[i].checkBox = true;
                    let num = v.num;
                    self.custDataList[i].sitNum = num;
                    self.custDataList[i].productList.basePrice = v.amount;
                    self.sumPrice1[i] = v.amount;
                  }
                });
              }
              self.productSumPrice();
              self.sumPrice();
            })
            .catch(err => {
            });

          axios({
            method:'post',
            url:"/netCloudOffer/productsService/getproductlistbyofferidandproducttype",
            params: {
              offerId:self.$route.query.offerId,
              prodFuncType:2,
            }
          }).then(response => {
              self.demoEvent = response.data.data;
              self.demoEvent.forEach((v,i)=>{
                v.checkBox = false;
                self.$set(self.sumPrice2,i,0);
                if(self.changeData.length > 0){
                  self.changeData.forEach((b,j)=>{
                    if(b.prodId == self.demoEvent[i].productList.prodId){
                      self.demoEvent[i].checkBox = true;
                      self.$set(self.sumPrice2,i,parseFloat(b.amount));
                    }
                  });
                }
              });
              self.productSumPrice();
              self.sumPrice();
            })
            .catch(err => {
            });
//          产品服务
          axios({
            method:'post',
            url:"/netCloudOffer/productsService/getproductlistbyofferidandproducttype",
            params: {
              offerId:self.$route.query.offerId,
              prodFuncType:1,
            }
          })
            .then(response => {
              self.custClick = JSON.parse(JSON.stringify(response.data.data));
              self.custClick.forEach((v,i)=>{
                v.checkBox = false;
                self.$set(self.sumPrice3,i,0);
                v.productList.basePrice = parseInt(v.productList.basePrice);
                v.price = v.productList.basePrice;
                if(self.changeData.length > 0){
                  self.changeData.forEach((b,j)=>{
                    if(b.prodId == v.productList.prodId){
                      self.custClick[i].checkBox = true;
                      self.serValue = i;
                      v.price = b.num;
                      self.$set(self.sumPrice3,i,parseFloat(b.amount));
                    }
                  });
                }

              });

              self.productSumPrice();
              self.sumPrice();

            })
            .catch(err => {

            });

        }
      ).catch(err=>{

      })
      self.sumPrice();
    },
    methods:{
      /**获取付费账户**/
      getAccount:function () {
        let _this = this;
        let custId = '';
        if(window.sessionStorage && window.sessionStorage.getItem('cust')){
          var cust = window.sessionStorage.getItem('cust');
            custId = JSON.parse(cust).CUST_ID;
        }
        if(custId != ''){
          axios({
            method: "post",
            url: '/netCloudCustomer/acctService/queryAcctInfo',
            data: {
              "custId":custId
            }
          }).then(res =>{
              /**给付费账户列表赋值**/
              if(res.data.code == '0'){
                res.data.data.forEach((v) =>{
                  let tmp = {};
                    tmp.acctId = v.acctId;
                    tmp.acctCode = v.acctCode;
                    if(v.acctId == _this.accountId){
                        _this.account = v.acctCode;
                    }
                    _this.accountList.push(tmp);
                })
              }
          })
        }
      },

//      T+普及版 V12.2模块价格查询
      TSumPrice(id,num,index){
        var self = this;
        axios({
          method:'post',
          url:'/netCloudOffer/productsService/getsiteprice',
          params: {
            prodId:id,
            siteNum:num,
          }
        })
          .then(response => {
            this.custDataList[index].productList.basePrice = response.data.data;
            self.sumPrice1[index] = response.data.data;
            self.productSumPrice();
          })
          .catch(err => {

          });
      },
//      站点修改时  价格跟着变
      sitNumChange(index,event){
        var target = event.currentTarget;
        var id = this.custDataList[index].productList.prodId;
        var num = target.value;
        this.custDataList[index].sitNum = num;
        this.TSumPrice(id,num,index);
      },
//      列表全选
      selectAll(index, object){
        var self = this;
        object.forEach((v,i)=>{
          v.checkBox = self.checkBoxArr[index];
        });
        this.sumPrice();
      },
//      子模块选择
      itemSelect(index,object,parentIndex,sum){
        var self = this;
        var count = 0;
        var length = object.length;
        object.forEach((v,i)=>{
          if(v.checkBox){
            count++;
            self[sum][i] = parseFloat(v.productList.basePrice);
          } else {
            self[sum][i] = 0;
          }
        });


        if(count < length){
          this.$set(self.checkBoxArr,parentIndex,false);
        } else {
          this.$set(self.checkBoxArr,parentIndex,true);
        }
        this.productSumPrice();
        this.sumPrice();
      },
//      产品服务总价合计
      productSumPrice(){
        var self = this;
        var price = 0;

        self.sumPrice1.forEach((v,i)=>{
          price += parseFloat(v);
        });
        self.sumPrice2.forEach((v,i)=>{
          price += parseFloat(v);
        });
        price = price.toFixed(2);
        self.custClick.forEach((v,i)=>{
          if(parseInt(v.price) <= 100 && parseInt(v.price) >= parseInt(v.productList.basePrice)){
            self.$set(self.sumPrice3,i,(parseFloat(v.price) / 100 * price).toFixed(2));
          } else if(parseInt(v.price) < parseInt(v.productList.basePrice)){
            v.price = v.productList.basePrice;
            var str = '不得低于最低值' + parseInt(v.productList.basePrice) + '%';
            this.$alert(str, '提示', {
              confirmButtonText: '确定',
              callback:action=>{

              }
            });
          } else {
            v.price = v.productList.basePrice;
            this.$alert('输入错误！', '提示', {
              confirmButtonText: '确定',
              callback:action=>{

              }
            });
          }
        });
      },
//      总价合计
      sumPrice(){
        this.amount = 0;
        var self = this;
        this.custDataList.forEach((v,i)=>{
          if(v.checkBox == true){
            self.amount += parseFloat(self.sumPrice1[i]);
          }
        });
        this.demoEvent.forEach((v,i)=>{
          if(v.checkBox == true){
            self.amount += parseFloat(self.sumPrice2[i]);
          }
        });
        this.custClick.forEach((v,i)=>{
          if(i == self.serValue && self.serValue.toString().length > 0){
            v.checkBox = true;
          } else {
            v.checkBox = false;
          }
          if(v.checkBox == true){
            self.amount += parseFloat(self.sumPrice3[i]);
          }
        });
        self.amount = self.amount.toFixed(2);
      },
      //模块选择收缩
      aff:function () {
        this.add=false;
      },
      acc:function () {
        this.add=true;
      },
      //互联网产品选择收缩
      num:function () {
        this.agg=false;
      },
      sum:function () {
        this.agg=true;
      },
      //产品服务选择收缩
      odd:function () {
        this.aed=false;
      },
      off:function () {
        this.aed=true;
      },
      //点击变色
      need:function () {
        if(this.cust==true){
          this.activeColor="#ff8200"
        }else {
          this.activeColor="darkgray"
        }
      },

      //提交
      submit:function () {
        var self = this;
        var user = window.sessionStorage.getItem('user');
        var userId = JSON.parse(user).staffId;
        var count = 0;
        var serCount = 0;

        /**获取account对应的id**/
        self.accountList.forEach((v)=>{
           if(v.acctCode == self.account){
              self.accountId = v.acctId;
            }
        })

        var data = {
          "cartItemId":self.$route.query.cartItemId,
          "offerId":self.$route.query.offerId,
          "loginUserId":userId,
          "accountId":self.accountId,
          "productAttrList":[]
        };

        if(self.account == '' || self.account == null){
          this.$alert('请选择对应的付费账户!','提示',{
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          })
        }else{
          /**基础模块**/
          self.custDataList.forEach((v,i)=>{
            if(v.checkBox){
              count++;
              var newData = {
                productId:v.productList.prodId,
                num:v.sitNum,
                amount:self.sumPrice1[i],
                serviceAttrList:[]
              }
              data.productAttrList.push(newData);
            }
          });
          /**App模块**/
          self.demoEvent.forEach((v,i)=>{
            if(v.checkBox) {
              count++;
              var newData = {
                productId: v.productList.prodId,
                num: 1,
                amount: self.sumPrice2[i],
                serviceAttrList: []
              }
              data.productAttrList.push(newData);
            }
          });
//        产品服务
          self.custClick.forEach((v,i)=>{
            if(v.checkBox) {
              serCount++;
              var newData = {
                productId: v.productList.prodId,
                num: v.price,
                amount: self.sumPrice3[i],
                serviceAttrList: []
              }
              data.productAttrList.push(newData);
            }
          });
          if(count > 0 && serCount > 0){
            console.log(data);
            axios({
              method:'post',
              url:"/netCloudOrder/cartItemAttrService/insertCartItemAttr",
              data: data
            }).then(
              res=>{
                if(res.data.code == '0' || res.data.code == 0){
                  this.$router.push('/shoppingCartFrame');
                } else {
                  this.$alert('保存失败', '提示', {
                    confirmButtonText: '确定',
                    callback:action=>{

                    }
                  });
                }
              }
            ).catch(err=>{
            })
          } else if(count <= 0){
            this.$alert('请选择模块', '提示', {
              confirmButtonText: '确定',
              callback:action=>{

              }
            });
          } else if(serCount <= 0){
            this.$alert('请选择产品服务', '提示', {
              confirmButtonText: '确定',
              callback:action=>{

              }
            });
          }
        }
      }
    },
    watch:{
      "sumPrice1":"productSumPrice",
      "sumPrice2":"productSumPrice",
      "sumPrice3":"sumPrice"
    }
  }
</script>
<style scoped lang="less">

  /**付费账户相关样式**/
  .pay-account{
    width:300px;
    height:70px;
    margin-left: 20px;
    div{
      margin-top: 10px;
    }
    /deep/ .el-input{
      width:160px;
      margin-left: 20px;
    }
  }

  .nav{
    background: #ff8200;
  }
  .index{
    background-color: #f9fcfe;
  }
  .header{
    width: 1200px;
    margin: 0 auto;
    margin-top: 1px;
    background-color: #0f0f0f;
  }
  .header-one{
    width: 1200px;
    height: 122px;
    background-color: white;
    border-bottom: 1px solid #ffb466;
    padding: 0.1px;
  }
  .header-one-on{
    width: 60px;
    height: 30px;
    margin-top: 15px;
    margin-left: 23px;
    border: 1px solid #d2d2d2;
    border-radius: 5px;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    display: inline-block;
  }
  .header-one-p{
    display: inline-block;
    margin-left: 24px;
    font-size: 16px;
    color: #ff8200;
  }
  .header-two{
       width: 1200px;
       height: 60px;
       background-color: white;
       padding: 0.1px;
       position: relative;
     }
  .header-two-on{
    height: 25px;
    border-left: 2px solid #ff8200 ;
    margin-top: 17px;
    margin-left: 23px;
    display: inline-block;
  }
  .header-two-tw{
    position: absolute;
    top: 18px;
    left: 33px;
    font-size: 16px;
  }
  .header-three{
    width: 1200px;
    background-color: #f9fcfe;
    padding: 0.1px;
  }
  .header-three-one{
    width: 1200px;
    height: 50px;
  }
  .header-three-one td{
    text-align: center;
    font-size: 16px;
    font-weight: 400;
  }
  .header-three-two{
    width: 1200px;
    height: 170px;
    padding: 0.1px;
    background-color: white;
    border-bottom: 1px solid #cccccc;
  }
  .header-three-two td{
    text-align: center;
  }
  .allpng{
    position: absolute;
    right: 30px;
    top: 20px;
  }
  .coludBuybRight-fee{
    color: #666666;
    /*margin-left: 30px;*/
    vertical-align: middle;
    text-align: center;
    font-weight: 500;
    width: 160px;
    padding: 0.1px;
  }
  .coludBuybRight-fee p {
    margin-top: 20px;
    text-align: center;
  }
  .coludBuybRight-fea{
    color: #666666;
    text-align: center;
    vertical-align: top;
    font-weight: 500;
    width: 210px;
  }
  .coludBuybRight-fea p{
    margin-top: 20px;
    text-align: left;
    margin-left: 95px;
  }
  .check{
    margin-right: 5px;
  }
  #checky{
    margin-right: 5px;
  }
  .checkecd{
    margin-right: 5px;
  }
  .checkec{
    margin-right: 5px;
  }
  .checkedc{
    margin-right: 5px;
  }
  .checkedd{
    margin-right: 5px;
  }
  .coludBuybRight-feb{
    color: #666666;
    vertical-align: middle;
    text-align: center;
    font-weight: 500;
    width: 200px;
  }
  .coludBuybRight-feb p{
    margin-top: 21px;
    text-align: left;
    margin-left: 63px;
  }
  .btn2{
    width: 20px;
    height: 20px;
    font-size: 12px;
  }
  .btn1{
    width: 20px;
    height: 20px;
    font-size: 12px;
  }
  .whole-fred{
    position: absolute;
    top: 60px;
    left: 90px;
    color: #666666;

    .numTag{
      margin-left:30px;
    }

    .select-after-label{
      width:100px;
    }
  }
  .whole-freda{
    position: absolute;
    top: 20px;
    left: 90px;
    color: #666666
  }
  .whole-fredb{
    position: absolute;
    top: 30px;
    left: 90px;
    color: #666666
  }
  .coludBuybRight-fec{
    color: #666666;
    margin-left: 30px;
    vertical-align: top;
    font-weight: 500;
    width: 200px;
    position: relative;
  }
  .coludBuybRight-fec p{
    margin-top: 90px;
    text-align: left;
    margin-left: 45px;
    color: #a7a7a7;
  }
  .coludBuybRight-fed{
    width: 245px;
    color: #e88215;
    font-weight: bold;
    text-align: center;
  }
  .header-three-thr{
    font-size: 14px;
    width: 1200px;
    height: 90px;
    background-color: white;
    border-bottom: 1px solid #cccccc;
  }
  .header-three-thr:last-child{
    border-bottom: none;
  }
  #passecp{
    margin-top: 50px;
    text-align: left;
    margin-left: 45px;
    color: #a7a7a7;
  }
  #passecpa{
    margin-top: 60px;
    text-align: left;
    margin-left: 45px;
    color: #a7a7a7;
  }
  .header-three-free{
    width: 1200px;
    height: 90px;
    background-color: white;
  }
  .header-body{
    width: 1200px;
    background-color: #f9fcfe;
  }
  .header-nav{
    width: 1200px;
    background-color: #f9fcfe;
  }
  .header-nav-on{
    text-align: center;
    font-size: 14px;
    position: relative;
  }
  .header-nav-two{
    text-align: center;
  }
  .header-nav-thr{
    text-align: center;
  }
  .header-footer{
    width: 1200px;
    height: 120px;
    background-color: #fbfbfb;
    padding:0.1px;
    position: relative;
  }
  #header-footer-on{
    margin-top: 50px;
    margin-left: 25px;
    display: inline-block;
  }
  #header-footer-tw{
    display: inline-block;
    margin-left: 27px;
    font-size: 12px;
    color: red;
    font-weight: 400;
  }
  .checkone{
    position: absolute;
    top:48px;
    left: 5px;
    width: 18px;
    height:17px;
    margin-right: 5px;
    text-align: center;
    vertical-align: top;
  }
  #header-footer-thr{
    display: inline-block;
    margin-left: 210px;
  }
  #header-footer-ower{
    position: absolute;
    top: 45px;
    right: 230px;
    font-size: 16px;
    font-weight: 400;
  }
  #header-footer-ower span{
    margin-left: 28px;
    color: #e88215
  }
  #header-footer-owerder{
    position: absolute;
    top: 90px;
    right: 300px;
    color: #a7a7a7;
  }
  #header-footer-ow{
    position: absolute;
    top: 0;
    right: 0;
    width: 170px;
    height: 120px;
    font-size: 24px;
    text-align: center;
    line-height: 120px;
    color: white;
    font-weight: 400;
    cursor: pointer;
    /*background-color: darkgray;*/
  }

  .proInput{
    width: 30px;
    text-align: center;
  }
</style>
