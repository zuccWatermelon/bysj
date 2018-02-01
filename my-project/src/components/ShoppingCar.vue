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
          <el-menu-item index="1"><router-link to="/">首页</router-link></el-menu-item>
          <el-menu-item index="2"><a href="https://www.ele.me" target="_blank"> 合作伙伴 </a></el-menu-item>
          <el-submenu index="3">
          <template slot="title"> 管理平台 </template>
              <el-menu-item index="3-1"><router-link to="/">个人管理平台</router-link></el-menu-item>
          </el-submenu>
          <el-menu-item index="4"> <router-link to="/">帮助中心</router-link> </el-menu-item>
        <div class="regist-login">
<!--           <el-menu-item index="5"> <el-button type="text" @click="regist = true" >注册 </el-button> </el-menu-item> -->
          <el-menu-item index="6"><el-button type="text" @click="login = true" > 您好！ </el-button> </el-menu-item>
          <el-menu-item index="7"><el-button type="text" @click="research" > XXX </el-button> </el-menu-item>
        <el-dialog title="请输入登录账号" :visible.sync="login" width="30%">
          <el-form :model="form">
            <el-form-item label="账号" :label-width="formLabelWidth">
              <el-input v-model="form.name" auto-complete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input v-model="form.pwd" auto-complete="off" type="password" clearable></el-input>
            </el-form-item>
          </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="login = false">取 消</el-button>
          <el-button type="primary" @click="login = false">确 定</el-button>
          </div>
        </el-dialog>
        </div>
      </div>
    </el-menu>
    <div class="customer_name">
    <h4 align="left">杭州XXX有限公司的购物车</h4>
    <hr />
    </div>
<!-- 当el-table元素中注入data对象数组后，在el-table-column中用prop属性来对应对象中的键名即可填入数据，用label属性来定义表格的列名。可以使用width属性来定义列宽。 -->

<div class="selectedTable">
    <el-table
    ref="multipleTable"
    :data="tableData3"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column type="expand">
 <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="单价">
            <span>{{ props.row.price }}</span>
          </el-form-item>
          <el-form-item label="折扣">
            <span>{{ props.row.discount }}</span>
          </el-form-item>
          <el-form-item label="总价">
            <span>{{ props.row.amount }}</span>
          </el-form-item>
          <el-form-item label="状态">
            <span>{{ props.row.state }}</span>
          </el-form-item>
          <el-form-item label="CPU数">
            <span>{{ props.row.cupnum }}</span>
          </el-form-item>
          <el-form-item label="宽带">
            <span>{{ props.row.net }}</span>
          </el-form-item>
        </el-form>
      </template>
      </el-table-column>
    <el-table-column
      type="selection"
      width="55">
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
       <el-table-column
        prop="discount"
        label="折扣"
        width="180">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="总价"
        width="180">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态"
        width="180">
      </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        login: false,
        form: {
          name: '',
          pwd: ''
        },
        formLabelWidth: '40px',

        tableData3: [{
            name: '云主机',
            price:'100',
            discount:'0.8',
            amount:'80',
            state:'待提交',
            cupnum:'2',
            net:'2m'
           
          },{
            name: '云主机',
            price:'100',
            discount:'0.8',
            amount:'80',
            state:'待提交',
            cupnum:'2',
            net:'2m'
          }],
        multipleSelection: [],     
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        return 0;
      },
      research(){
         this.$prompt('请输入客户姓名/证件号码/业务号码/服务号码', '查询客户', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        });
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
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
   .bottom{
    width:100%;
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
      margin-top: 20px;
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
</style>
