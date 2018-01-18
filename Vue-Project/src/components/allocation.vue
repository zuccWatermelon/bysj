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
        <p class="header-two-tw">T+标准版 V12.2模块选择</p>
        <div class="allpng">
          <a href="javascript:void(0)"><img v-if="add==true" src="../assets/img/alloction.png" alt="" @click="aff"></a>
          <a href="javascript:void(0)"><img v-if="add==false" src="../assets/img/alloc.png" alt="" @click="acc"></a>
        </div>
      </div>
      <div class="header-three" v-show="add">
        <table>
          <tr class="header-three-one">
            <td style=" width: 100px">
              <!--<input type="checkbox" v-model="TCheckAll" @click="allSelect($event)">-->
              <!--全选-->
            </td>
            <td style=" width: 160px">模块组</td>
            <td style=" width: 260px">模块</td>
            <td style=" width: 200px">模块价格</td>
            <td style=" width: 245px">站点数</td>
            <td style=" width: 245px">价格合计</td>
          </tr>
          <tr :class="['header-three-two','header-three-two'+index1]" :data-index="index1" v-for="(item1,index1) in TData">
            <td style=" width: 100px"></td>
            <td class="coludBuybRight-fee coludBuybRight-fee1">
              <p>{{item1.productInfo.prodName}}</p>
            </td>
            <!--<input type="hidden" :value=item1.productInfo.productId class="hiddenProductId1"/>-->
            <td class="coludBuybRight-fea">
              <p v-for="(item2,index2) in item1.producabilityInfoList">
                <input name="nuem" type="checkbox" v-model="item2.checkBox" class="checkedd" @change="itemChange(index1,index2,TData,TCheckAll)">{{item2.SERVICE_NAME}}
              </p>
            </td>
            <td class="coludBuybRight-feba">
              <p v-for="item2 in item1.producabilityInfoList" :class="'serrone' + index1" :data="item2.BASE_PRICE" :data-value=item2.SERVICE_ABILITY_ID>￥{{item2.BASE_PRICE}}</p>
            </td>
            <td class="coludBuybRight-fec">
                           <span class="whole-fred">
                             <button class="btn2" @click="nuum('-',index1,TData)" >-</button>
                              {{item1.productInfo.quantity}}
			                       <button class="btn1" @click="nuum('+',index1,TData)" >+</button>
                           </span>
              <p>每增一个站点，增{{item1.productInfo.sitePrice}}元</p>
            </td>
            <td class="coludBuybRight-fed" :data = "item1.productInfo.totalPrice">
              ￥{{item1.productInfo.totalPrice}}
            </td>
          </tr>
        </table>
      </div>
      <div class="header-two">
        <div class="header-two-on"></div>
        <p class="header-two-tw">互联网产品选择</p>
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
              <!--<input type="checkbox" id="check_all" v-model="AppCheckAll" @click="checkAll(AppData,AppCheckAll)">-->
              <!--全选-->
            </td>
            <td style=" width: 160px">APP应用名称</td>
            <td style=" width: 260px">定价方式</td>
            <td style=" width: 340px">应用价格</td>
            <td style=" width: 345px">价格合计</td>
          </tr>
          <tr class="header-three-thr" v-for="(item,index) in AppData">
            <td style=" width: 100px"></td>
            <td class="coludBuybRight-fee coludBuybRight-fee1">
              <p><input type="checkbox"  class="checkec" v-model="item.producabilityInfoList[0].checkBox" @change="itemChange(index,0,AppData,AppCheckAll)">{{item.productInfo.prodName}}</p>
            </td>
            <td name ="sumthree" class="coludBuybRight-fea">
              <p v-for="item4 in item.producabilityInfoList">
                {{item4.SERVICE_NAME}}</p>
            </td>
            <td name ="bbb" class="coludBuybRight-feb" style=" width: 340px">
              <p v-for="item5 in item.producabilityInfoList" class="ccc" style="margin-left: 134px" :data="item5.BASE_PRICE" :data-value="item5.SERVICE_ABILITY_ID">￥{{item5.BASE_PRICE}}</p>
            </td>
            <td class="coludBuybRight-fed" style=" width: 345px">
              <p v-for="item5 in item.producabilityInfoList">￥{{item5.BASE_PRICE}}</p>
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
          <tr class="header-three-thr" v-for="(item,index) in ProData">
            <td style=" width: 100px">

            </td>
            <td class="header-nav-on">
              <p style="width: 110px">
                <input type="radio" class="check" name="ProValue" :value="index" v-model="ProValue" @change="sumAllPrice" />
                {{item.productInfo.prodName}}</p>
            </td>
            <td class="header-nav-two">
              <p>
                {{item.producabilityInfoList[0].SERVICE_DESC}}
              </p>
            </td>
            <td class="header-nav-thr">
              <input class="proInput" style="width: 30px" v-model="item.producabilityInfoList[0].price" @change="proPrice" />%
              <!--<p>{{parseInt(item.productList.basePrice)}}%</p>-->
            </td>
            <td style="text-align: center" class="coludBuybRight-fed">
              {{item.productInfo.totalPrice}}
            </td>
          </tr>
        </table>
      </div>
      <div class="header-footer">
        <p id="header-footer-ower">总价合计&nbsp;: <span>{{allPrice}}</span></p>
        <div id="header-footer-ow" v-bind:style="{ background: activeColor}" @click="submit($event)">保存配置</div>
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
        cartItemId:"",
        offerId:"",
        loginUserId:"",
        add : true,
        agg : true,
        aed : true,
        cust : false,
        changeData:[],
        TData:[],
        AppData:[],
        ProData:[],
        TCheckAll:false,
        AppCheckAll:false,
        ProCheckAll:false,
        ProValue: '',
        allPrice:0,
        activeColor : "#ff8200",
      }
    },
    mounted(){
      var self = this ;
      var user = window.sessionStorage.getItem('user');
      self.loginUserId = JSON.parse(user).staffId;

      var cust = window.sessionStorage.getItem('cust');
      self.custData = JSON.parse(cust);

//    查询
      axios({
        method:'post',
        url:'/netCloudOrder/cartItemAttrService/queryCartItemAttr',
        data: {
          cartItemId:self.$route.query.cartItemId,
          offerId:self.$route.query.offerId,
          catalogId:self.$route.query.catalogId,
        }
      }).then(res=>{
        //        判断查询是否有记录
        if(res.data.code == '0' || res.data.code == 0){
          if(res.data.data.productAttrList.length > 0){
            self.changeData = res.data.data.productAttrList;
          }
          /**获取付费账户**/
          self.accountId = res.data.data.accountId;
          self.getAccount();

        }axios({
          method: 'post',
          url:"/netCloudOffer/productsService/getproductinfobyofferid_model",
          params: {
            offerId: self.$route.query.offerId,
            prodFuncType: 0,
          }
        }).then(response => {
            self.TData = response.data.data;
            self.TData.forEach((v1,i)=>{
              v1.producabilityInfoList.forEach((v2,j)=>{
                v2.checkBox = false;
                self.changeData.forEach((c1,k)=>{
                  if(c1.prodId == v1.productInfo.prodId){
                    v1.productInfo.quantity = c1.num;
                    v1.productInfo.totalPrice = c1.amount;
                  }
                  c1.serviceAttrList.forEach((c2,n)=>{
                    if(c2.attrId == v2.SERVICE_ABILITY_ID){
                      v2.checkBox = true;
                    }
                  });
                });
              });
              self.$set(self.TData,i,self.TData[i]);
            });
            //加载完成后重新计算服务价格
            self.proPrice();
          })
          .catch(err => {
          });
        axios({
          method: 'post',
          url:"/netCloudOffer/productsService/getproductinfobyofferid_model",
          params: {
            offerId: self.$route.query.offerId,
            prodFuncType: 1,
          }
        })
          .then(response => {
            self.AppData = response.data.data;
            self.AppData.forEach((v1,i)=>{
              v1.producabilityInfoList.forEach((v2,j)=>{
                v2.checkBox = false;
                self.changeData.forEach((c1,k)=>{
                  if(c1.prodId == v1.productInfo.prodId){
                    v1.productInfo.quantity = c1.num;
                    v1.productInfo.totalPrice = c1.amount;
                  }
                  c1.serviceAttrList.forEach((c2,n)=>{
                    if(c2.attrId == v2.SERVICE_ABILITY_ID){
                      v2.checkBox = true;
                    }
                  });
                });
              });
              self.$set(self.AppData,i,self.AppData[i]);
            });
            //加载完成后重新计算总价
            self.proPrice();
          })
          .catch(err => {
          });
        axios({
          method: 'post',
          url:"/netCloudOffer/productsService/getproductinfobyofferid_model",
          params: {
            offerId: self.$route.query.offerId,
            prodFuncType: 2,
          }
        })
          .then(response => {
            self.ProData = response.data.data;
            self.ProData.forEach((v1,i)=>{
              v1.producabilityInfoList.forEach((v2,j)=>{
                v2.checkBox = false;
                v2.price = v2.BASE_PRICE;
                self.changeData.forEach((c1,k)=>{
                  if(c1.prodId == v1.productInfo.prodId){
                    self.ProValue = i;
                    v2.price = c1.num;
                    v1.productInfo.totalPrice = c1.amount;
                  }
                  c1.serviceAttrList.forEach((c2,n)=>{
                    if(c2.attrId == v2.SERVICE_ABILITY_ID){
                      v2.checkBox = true;
                    }
                  });
                });
              });
              self.$set(self.ProData,i,self.ProData[i]);
            });
            //加载完成后重新计算总价
            self.proPrice();

          })
          .catch(err => {
          });


      }).catch(err=>{

      });

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

//      单个选择
      itemChange(parentIndex,index,data,AllCheck){
        var self = this;
        data.forEach((v,i)=>{
          v.producabilityInfoList.forEach((b,j)=>{
            if(b.checkBox == false){
              AllCheck = false;
            }
          });
        });
        this.itemSum(parentIndex,data);
      },
//      item里的总数合计
      itemSum(parentIndex,data){
        var sum = 0.00;
        data[parentIndex].producabilityInfoList.forEach((v,i)=>{
          if(v.checkBox == true){
            sum += parseFloat(v.BASE_PRICE);
          }
        });
        var money = Number(data[parentIndex].productInfo.sitePrice)
        data[parentIndex].productInfo.totalPrice = sum + money * (parseInt(data[parentIndex].productInfo.quantity) - 1);
        this.proPrice();
      },
//     站点数修改
      nuum(str,index,data){
        var count = 0;
//        data.forEach((v,i)=>{
        data[index].producabilityInfoList.forEach((b,j)=>{
            if(b.checkBox == true){
              count++;
            }
          });
//        });
        if(count == 0){
          this.$alert('请先选择模块', '提示', {
            confirmButtonText: '确定',
            callback:action=>{

            }
          });
        } else {
          if(str == '-'){
            if(data[index].productInfo.quantity == '1' || data[index].productInfo.quantity == 1){
              data[index].productInfo.quantity = 1
            } else {
              data[index].productInfo.quantity = parseInt(data[index].productInfo.quantity) - 1;
            }
          } else if(str == '+'){
            data[index].productInfo.quantity = parseInt(data[index].productInfo.quantity) + 1;
          }
        }
//        重新计算总价
        this.itemSum(index,data);
      },
//      全选
      checkAll(data,AllCheck){
        var self = this;
        var bool = AllCheck;
        data.forEach((v,i)=>{
          v.producabilityInfoList.forEach((b,j)=>{
            b.checkBox = bool;
            self.itemChange(i,j,data,AllCheck);
          });
        });
      },
//      计算产品服务价格
      proPrice(){
        var self = this;
        var price = 0.00;
        self.TData.forEach((v,i)=>{
          price += parseFloat(v.productInfo.totalPrice);
        });
        self.AppData.forEach((v,i)=>{
          price += parseFloat(v.productInfo.totalPrice);
        });
        self.ProData.forEach((v,i)=>{
          var currentPrice = parseInt(v.producabilityInfoList[0].price);
          var basePrice = parseInt(v.producabilityInfoList[0].BASE_PRICE);
          if(currentPrice <= 100 && currentPrice >= basePrice){
            v.productInfo.totalPrice = (price * currentPrice / 100).toFixed(2)
          } else if(currentPrice < basePrice){
            v.producabilityInfoList[0].price = v.producabilityInfoList[0].BASE_PRICE;
            var str = '不得低于最低值' + basePrice + '%';
            this.$alert(str, '提示', {
              confirmButtonText: '确定',
              callback:action=>{

              }
            });
          } else {
            v.producabilityInfoList[0].price = v.producabilityInfoList[0].BASE_PRICE;
            var str = '不得低于最低值' + basePrice + '%';
            this.$alert(str, '提示', {
              confirmButtonText: '确定',
              callback:action=>{

              }
            });
          }

        });
        self.sumAllPrice();
      },
//      计算总价
      sumAllPrice(){
        var self = this;
        self.allPrice = 0.00;
        self.TData.forEach((v,i)=>{
          self.allPrice += parseFloat(v.productInfo.totalPrice);
        });
        self.AppData.forEach((v,i)=>{
          self.allPrice += parseFloat(v.productInfo.totalPrice);
        });
        var index = parseInt(self.ProValue);
        if(index==0 || index == '0' || index){
          self.ProData.forEach((v,i)=>{
            if(i == index){
              v.producabilityInfoList[0].checkBox = true;
            } else {
              v.producabilityInfoList[0].checkBox = false;
            }
          });
          self.allPrice += parseFloat(self.ProData[index].productInfo.totalPrice);
        }
        self.allPrice = self.allPrice.toFixed(2)
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
      //提交
      submit:function () {
        var self = this;
        var count = 0;
        var count1 = 0;

        if(self.account == '' || self.account == null){
          this.$alert('请选择对应的付费账户!','提示',{
            confirmButtonText: '确定',
            callback: action => {
                return false;
            }
          })
        }else{
          self.TData.forEach((v,i)=>{
            v.producabilityInfoList.forEach((b,j)=>{
              if(b.checkBox == true){
                count++;
              }
            });
          });
          self.AppData.forEach((v,i)=>{
            v.producabilityInfoList.forEach((b,j)=>{
              if(b.checkBox == true){
                count++;
              }
            });
          });
          self.ProData.forEach((v,i)=>{
            v.producabilityInfoList.forEach((b,j)=>{
              if(b.checkBox == true){
                count1++;
              }
            });
          });

          /**获取account对应的id**/
          self.accountList.forEach((v)=>{
            if(v.acctCode == self.account){
              self.accountId = v.acctId;
            }
          })



          if(count > 0 && count1 > 0){
            var data = {
              accountId:self.accountId,
              cartItemId:self.$route.query.cartItemId,
              offerId:self.$route.query.offerId,
              loginUserId:self.loginUserId,
              productAttrList:[]
            };
            self.AjsxDataFun(data,self.TData,0);
            self.AjsxDataFun(data,self.AppData,0);
            self.AjsxDataFun(data,self.ProData,1);

            axios({
              method:'post',
              url:"/netCloudOrder/cartItemAttrService/insertCartItemAttr",
              data: data
            }).then(res=>{
                if(res.data.code == '0' || res.data.code == 0){
                  this.$router.push('/shoppingCartFrame');
                } else {
                  this.$alert('保存失败', '提示', {
                    confirmButtonText: '确定',
                    callback:action=>{}
                  });
                }
              }
            ).catch(err=>{})
          } else if(count == 0){
            this.$alert('请先选择模块', '提示', {
              confirmButtonText: '确定',
              callback:action=>{}
            });
          } else if(count1 == 0){
            this.$alert('请先选择产品服务', '提示', {
              confirmButtonText: '确定',
              callback:action=>{}
            });
          }
        }
      },

      AjsxDataFun(data,listData,type){

        listData.forEach((v,i)=>{
          var newProductAttrList = {};
          newProductAttrList.serviceAttrList = [];
          v.producabilityInfoList.forEach((b,j)=>{
            if(b.checkBox == true){
              newProductAttrList.productId = v.productInfo.prodId;
              if(type){
                newProductAttrList.num = b.price;
              } else {
                newProductAttrList.num = v.productInfo.quantity;
              }
              newProductAttrList.amount = v.productInfo.totalPrice;
              var serviceItem = {};
              serviceItem.attrId = b.SERVICE_ABILITY_ID;
              serviceItem.num = 1;
              newProductAttrList.serviceAttrList.push(serviceItem);
            }
          });
          if(newProductAttrList.productId!=undefined && newProductAttrList.productId != null){
            data.productAttrList.push(newProductAttrList);
          }
        });
      }
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
    width: 100%;
    /*height: 170px;*/
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
    margin-left: 30px;
    vertical-align: top;
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
    margin-left: 30px;
    vertical-align: top;
    font-weight: 500;
    width: 200px;
  }
  .coludBuybRight-feb p{
    margin-top: 21px;
    text-align: left;
    margin-left: 63px;
  }
  .coludBuybRight-feba{
    color: #666666;
    margin-left: 30px;
    vertical-align: top;
    font-weight: 500;
    width: 200px;
  }
  .coludBuybRight-feba p{
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
    color: #666666
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
</style>
