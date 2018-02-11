<template>
  <div id="shoppingcar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <div class="menu-item">
          <el-menu-item index="1"><router-link to="/" class="color" >首页</router-link></el-menu-item>
          <el-menu-item index="2"><a href="https://www.ele.me" target="_blank" class="color" > 合作伙伴 </a></el-menu-item>
          <el-submenu index="3">
          <template slot="title" class="color" > 管理平台 </template>
              <el-menu-item index="3-1"><router-link to="/" class="color" >个人管理平台</router-link></el-menu-item>
          </el-submenu>
          <el-menu-item index="4"> <router-link to="/" class="color" >帮助中心</router-link> </el-menu-item>
        <div class="regist-login">
<!--           <el-menu-item index="5"> <el-button type="text" @click="regist = true" class="color" >注册 </el-button> </el-menu-item> 登录之后就不要注册啦-->
          <el-submenu index="6">
          <template slot="title" class="color"> 您好！{{username}} </template>
              <el-menu-item index="6-1"><el-button type="text" @click="login = true" class="color" > 资产  </el-button> </el-menu-item>
              <el-menu-item index="6-2"><el-button type="text" @click="logout" class="color" > 退出  </el-button> </el-menu-item>
        </el-submenu>
          <el-menu-item index="7"> <router-link to="ShoppingCar" class="color">我的购物车 </router-link> </el-menu-item>
        </div>
      </div>
    </el-menu>
    <div class="customer_name">
    <h4 align="left">{{username}}的购物车</h4>
    <hr />
    </div>
<!-- 当el-table元素中注入data对象数组后，在el-table-column中用prop属性来对应对象中的键名即可填入数据，用label属性来定义表格的列名。可以使用width属性来定义列宽。 -->

<div class="selectedTable">
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <!-- 以下是展开的内容 -->
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="开通时间">
            <el-input-number style="margin-left:10px" 
              v-model="time" 
              @change="handleTime" 
              :min="1" 
              :max="10">
            </el-input-number>
            <span>月</span>
          </el-form-item>
          <el-form-item label="CPU">
            <el-radio-group style="margin-left:35px" v-model="cpu">
              <el-radio-button label="1"></el-radio-button>
              <el-radio-button label="2"></el-radio-button>
              <el-radio-button label="4"></el-radio-button>
              <el-radio-button label="8"></el-radio-button>
              <el-radio-button label="16"></el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="内存">
            <el-radio-group style="margin-left:37px"  v-model="memory">
              <div v-if="cpu === '1'">
                <el-radio-button label="1"></el-radio-button>
                <el-radio-button label="2"></el-radio-button>
                <el-radio-button label="4"></el-radio-button>
                <el-radio-button label="8"></el-radio-button>
              </div>
              <div v-if="cpu === '2'">
                <el-radio-button label="2"></el-radio-button>
                <el-radio-button label="4"></el-radio-button>
                <el-radio-button label="8"></el-radio-button>
                <el-radio-button label="16"></el-radio-button>
              </div>
              <div v-if="cpu === '4'">
                <el-radio-button label="4"></el-radio-button>
                <el-radio-button label="8"></el-radio-button>
                <el-radio-button label="16"></el-radio-button>
                <el-radio-button label="32"></el-radio-button>
              </div>
              <div v-if="cpu === '8'">
                <el-radio-button label="8"></el-radio-button>
                <el-radio-button label="16"></el-radio-button>
                <el-radio-button label="32"></el-radio-button>
                <el-radio-button label="64"></el-radio-button>
              </div>
              <div v-if="cpu === '16'">
                <el-radio-button label="16"></el-radio-button>
                <el-radio-button label="32"></el-radio-button>
                <el-radio-button label="64"></el-radio-button>
                <el-radio-button label="128"></el-radio-button>
              </div>
            </el-radio-group>
          </el-form-item> 
          <el-form-item label="系统">
            <div style="margin-left:37px;width:400px;">
              <el-select size="small" style="width: 150px"
                         v-model="selectType"
                         placeholder="请选择操作系统类型"
                         v-on:change="getType($event)">
                <el-option
                        v-for="item in type"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
              <el-select size="small" style="width: 150px"
                         v-if="selectType!=''"
                         v-model="selectSystem"
                         placeholder="请选择操作系统"
                         v-on:change="getSystem($event)">
                <el-option
                        v-for="item in Systems"
                        :label="item.label"
                        :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="系统盘">
            <el-select style="width: 150px ;margin-left:24px"
            v-model="selectDisk1" placeholder="请选择系统盘类型">
              <el-option 
                v-for="item in disk" 
                :label="item.label" 
                :value="item.value">
              </el-option>
            </el-select>
            <span style="margin-left:10px">40G</span>
          </el-form-item>
          <el-form-item label="数据盘">
            <el-select style="width: 150px;margin-left:24px"
            v-model="selectDisk2" placeholder="请选择数据盘类型">
              <el-option 
                v-for="item in disk" 
                :label="item.label" 
                :value="item.value">
              </el-option>
            </el-select>
            <el-input style='width:100px'
            placeholder="请输入内容"
            v-model="inputDisk"
            clearable>
            </el-input>
            <span>G</span>
          </el-form-item>
          <el-form-item label="带宽">
            <div class="block" style='width:400px ; margin-left:38px' >
              <el-slider v-model="bandWidth" show-input> </el-slider>
            </div>
          </el-form-item>
          <!-- <el-form-item label="订购数量">
            <el-input-number style="margin-left:10px" 
              v-model="num" 
              @change="handleNum" 
              :min="1" 
              :max="10">
            </el-input-number>
            <span>台</span>
          </el-form-item> -->
        </el-form>
      </template>
    </el-table-column>
      <!-- 以下是标题 -->
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
        prop="orderId"
        label="订单编号"
        width="180">
    </el-table-column>
    <el-table-column
        prop="name"
        label="商品名称"
        width="180">
    </el-table-column>
    <el-table-column
        prop="price"
        label="单价"
        width="180">
    </el-table-column>
<!--        <el-table-column
        prop="num"
        label="数量"
        width="180">
      </el-table-column> -->
    <el-table-column
        prop="systemType"
        label="系统类型"
        width="180">
    </el-table-column>
    <el-table-column
        prop="state"
        label="订单状态"
        width="180">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除
        </el-button>
       </template>
     </el-table-column>
    </el-table>
  </div>
      <div class="bottom">
      <div class="bottom-center">
        <div class="submit" @click="submitOrder()">提交</div>
        <div class="final-price">
          <p class="word">总价：<span class="orange sumPrice"><small>￥80</small></span></p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
    data() {
      return {
        activeIndex: '1',
         inputDisk: '40',
         inputDiscount: '0.8',
        type:[{
          label:"Windows",
          value:"Windows"
        },{
          label:"Linux",
          value:"Linux"
        }],
        Systems: [{
          label:"Windows7",
          value:"Windows7"
        },{
          label:"Windows10",
          value:"Windows10"
        }],
        selectType: 'Windows',
        selectSystem: 'Windows7',
        login: false,
        cpu: '1',
        memory: '1',
        bandWidth: 1,
        time: 1,
        num: 1,
        selectDisk1: 'SATA',
        selectDisk2: 'SATA',
        disk: [{
          value: 'SATA',
          label: 'SATA'
        }, {
          value: 'SSD',
          label: 'SSD'
        }],
        form: {
          name: '',
          pwd: ''
        },
        formLabelWidth: '40px',
        tableData: [{
            name: '云主机',
            price:'100',
            amount:'100',
            state:'待提交',
            num: '1',
            orderId: '1',
            systemType: 'Windows',
          },{
            name: '云主机',
            price:'100',
            amount:'100',
            state:'待提交',
            num: '1',
            orderId: '2',
            systemType: 'Windows',
          }],
        multipleSelection: [],   
        username:window.sessionStorage.getItem('username'),
        userID:window.sessionStorage.getItem('userID')  
      };
    },
    created(){
      var userID = window.sessionStorage.getItem('userID');
      if(!userID){
        this.$router.push({path: '/'});
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        return 0;
      },
       handleTime(value) {
        console.log(value);
      },
      handleNum(value) {
        console.log(value);
      },
      logout(){
          window.sessionStorage.removeItem('username');
          window.sessionStorage.removeItem('userID');
          location.reload();
      },
        toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      getType: function (Type) {
                let tempSystem=[];              
                this.Systems=[];
                this.selectSystem='';               
                let allSystem=[{                    
                    Type: "Windows",
                    label: "Windows7"
                }, {
                    Type: "Windows",
                    label: "Windows10"
                    
                }, {
                    Type: "Linux",
                    label: "CentOS 6"
                }, {
                    Type: "Linux",
                    label: "Ubuntu 16.04"
                }];
                for (var val of allSystem){
                    if (Type == val.Type){
                        console.log(val);
                        tempSystem.push({label: val.label, value: val.label})
                    }
                }
                this.Systems = tempSystem;
            },
            getSystem: function (System) {
                console.log(System);
                console.log(this.selectSystem)
            },
      submitOrder:function (){

      }
      //       /**提交订单**/
      // submitOrder:function () {
      //   var _this = this;
      //   var param = {};
      //   var orderItemList = [];
      //   var num = 0;

      //   /**遍历所有的购物车行,一次只允许提交一个**/
      //   $(".item-li").each(function () {
      //     var node = $(this).find("input[type='checkbox']");
      //     if($(node).prop("checked")) {
      //       num++;
      //     }
      //   });

      //   if(num != 1){
      //     this.$alert('不支持一次性提交多项!','提示',{
      //       confirmButtonText: '确定',
      //       callback: action => {
      //         return false;
      //       }
      //     })
      //   }

      //   if(num == 0){
      //     this.$alert('请先选中再提交!','提示',{
      //       confirmButtonText: '确定',
      //       callback: action => {
      //         return false;
      //       }
      //     })
      //   }

      //   /**提交成功后返回信息**/
      //   var successMsg = "";
      //   /**提交失败信息**/
      //   var errorMsg = "";
      //   /**组装提交的数据**/
      //   $("li.item-li").each(function () {
      //     var node = this;
      //     /**如果该checkbox被选中**/
      //     if($(node).find(".main-top").find("input[type='checkbox']").prop("checked")) {
      //       var cartId = $(node).find(".inputCartId").val();
      //       var orderItemId = $(node).find(".inputCartItemId").val();
      //       var applyObjId = $(node).find(".inputOfferId").val();
      //       var catalogId = $(node).find(".inputCatalogId").val();
      //       var applyObjSpec = "1";
      //       var discount = $(node).find(".discount").val();
      //       var billType = $(node).find(".billType").val();
      //       var offerId = $(node).find(".inputOfferId").val();
      //       var itemCdName = $(node).find(".inputItemCdName").val();
      //       var itemCd = $(node).find(".inputItemCd").val();
      //       var statusCd = $(node).find(".inputStatusCd").val();

      //       var amount = $.trim($(node).find(".totalPrice").text());

      //       /**IPRAN产品需要增加一次性费用原价以及一次性费用折扣**/
      //       var discountOne = "";   //一次性费用折扣
      //       var amountOne = "";     //一次性费用金额
      //       if(offerId == '261' || offerId == '321' || offerId == '322' || offerId == '323'){
      //         discountOne = $(node).find(".onceChargeDiscount").val();
      //         let txt = $(node).find(".onceChargePriceAfterDiscount").text();
      //         amountOne = txt.substring(1,txt.length);
      //       }

      //         successMsg = "订单已成功提交!"
          
      //       param.inputItemCdName = itemCdName;
      //       param.code = offerId;
      //       param.cartId = cartId;
      //       param.itemId = orderItemId;
      //       param.applyObjId = applyObjId;
      //       param.applyObjSpec = applyObjSpec;
      //       param.discount = discount;
      //       param.billType = billType;
      //       param.catalogId = catalogId;
      //       param.statusCd = statusCd;
      //       param.itemCd = itemCd;
      //       param.amount = amount;
      //       param.offerId = offerId;
      //       param.discountOne = discountOne;
      //       param.amountOne = amountOne;
      //       if(_this.parentOrderTransInstance.duration != null && _this.parentOrderTransInstance.duration != ''){
      //         param.duration = _this.parentOrderTransInstance.duration;
      //       }

      //       if(_this.parentOrderTransInstance.payType != null && _this.parentOrderTransInstance.payType != ''){
      //         param.payType = _this.parentOrderTransInstance.payType;
      //       }
      //     }
      //   });
      //   /**报错信息**/
      //   var msg = "";
      //   /**判断购物车能否提交**/
      //     axios({
      //       method:'post',
      //       url:'/netCloudOrder/shoppingCartService/checkShoppingCart',
      //       data:{
      //         cartItemId:param.itemId,
      //         catalogId:param.catalogId,
      //       },
      //     }).then(res=>{
      //       /**如果可以提交**/
      //         msg = res.data.msg;
      //         _this.$alert(msg,'提示',{
      //           confirmButtonText: '确定',
      //           callback: action => {
      //           }
      //         })
      //     })
      // },
    }
}
</script>

<style>
#shoppingcar {
  font-family: Helvetica, sans-serif;
  text-align: center;
}

.regist-login{
  float: right;
  margin-right: 100px; 
}
.menu-item{
  margin-left: 100px; 
}
.customer_name{
  margin-left: 100px;
  margin-right: 100px; 
}
.selectedTable{
  margin-left: 100px;
  margin-right: 100px;
  text-align: left;
}

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
   /* width: 45px;*/
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
   .bottom{
    width:99%;
    margin-top:50px;
    position: fixed;
    bottom: 0px;
    background-color: #e5e5e5;
    z-index: 10000;
  }

  .bottom-center{
    width:1200px;
    margin:0 auto;
}
.final-price{
      width:650px;
      height:50px;
      margin-right:10px;
      float:right;
      text-align: right;
    }
.word{
        line-height: 35px;
}
.submit{
      width:130px;
      height:70px;
      float: right;
      text-align: center;
      line-height: 70px;
      background-color: #ff8200;
      font-size: 25px;
      color:#fff;
      cursor: pointer;
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
    .color{
    color: white;
    text-decoration:none;
  }
</style>
