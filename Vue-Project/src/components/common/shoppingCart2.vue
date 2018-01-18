<template>
  <div class="page">
    <MyNav :current="current" :loginClick.sync="loginClick" :client="custData"></MyNav>

    <div class="myOrder-container">
      <div class="shoppingCart-topLine">
      <span class="shoppingCart-topLine-title">我的购物车</span>
      <!-- <div class="bt-switch-customer">切换客户</div>
       <div class="bt-add-product">添加产品</div>-->
    </div>

      <div class="shoppingCart-box">
        <div style="min-height: 600px;">
          <table class="customer-table">
            <thead>
            <tr>
              <td class="title-product">畅捷通产品</td>
              <td class="title-productName">商品名称</td>
              <td class="title-config">商品配置</td>
              <td class="title-amount">数量</td>
              <td class="title-discount">商品折扣</td>
              <td class="title-money">金额</td>
              <td class="title-payMethod">付费方式</td>
              <td class="title-operate">操作</td>
            </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in shoppCartList" name="items" id="items">
                <td class="info-product">
                  <input type="checkbox" :value=index class="info-product-box" name="info-product-box" id="info-product-box" @change="calculateTotalPrice()"/>
                  <input type="hidden" :value=item.applyObjId class="InputApplyObjId"/>
                  <input type="hidden" :value=item.cartItemId class="inputCartItemId"/>
                  <input type="hidden" :value=item.basePrice  class="inputBasePrice"/>
                </td>

                <td class="info-productName-title">
                  <div class="info-productName">
                    <img src="../../assets/img/bg_chanpin.png"/>
                    <div class="info-productName-tag">{{item.offerName}}</div>
                  </div>
                </td>

              <td class="info-config">
                <table class = "subTable">
                  <tr v-for="(subItem,index) in item.subProduct">
                    <td>{{subItem.subProductName}}</td>
                    <td> × </td>
                    <td> {{subItem.subProductNum}} </td>
                  </tr>
                </table>
                <div v-if="item.basePrice == '' || item.basePrice == null" class="configuration">
                  <router-link v-if="item.offerName.indexOf('普及版') > 0" :to="'/allocation2?cartItemId=' + item.cartItemId +'&offerId='+item.applyObjId">新增配置</router-link>
                  <router-link v-if="item.offerName.indexOf('标准版') > 0" :to="'/allocation?cartItemId=' + item.cartItemId +'&offerId='+item.applyObjId">新增配置</router-link>
                </div>
                <div v-if="!(item.basePrice == '' || item.basePrice == null)" class="configuration">
                  <router-link v-if="item.offerName.indexOf('普及版') > 0" :to="'/allocation2?cartItemId=' + item.cartItemId +'&offerId='+item.applyObjId">更改配置</router-link>
                  <router-link v-if="item.offerName.indexOf('标准版') > 0" :to="'/allocation?cartItemId=' + item.cartItemId +'&offerId='+item.applyObjId">更改配置</router-link>
                </div>
              </td>

                <td class="info-amount">
                  <div class="item-amount">
                    <button class="btn-minus" @click="minusAmount(item)" style="display: none;">-</button>
                    <span>{{item.applyObjSpec}}</span>
                    <button class="btn-plus" @click="plusAmount(item)"  style="display: none;">+</button>
                  </div>
                </td>

              <td class="info-discount">
<!--                <select class="select-after-label form-control"  @change="selectChange()">
                  <option value="1">无折扣</option>
                  <option value="0.7">7折</option>
                  <option value="0.65">65折</option>
                </select>-->
                <input type="text" class="select-after-label form-control" @change="selectChange($event)" value="0.7">折扣不能小于0.65

              </td>

                <td class="info-money">
                  ￥
                  <span v-if="item.basePrice == '' || item.basePrice == null">0.00</span>
<!--
                  <span v-if="(item.basePrice != '' && item.basePrice != null) && (item.disCountPrice == '' || item.disCountPrice == null)">{{parseInt(item.applyObjSpec) * parseFloat(item.basePrice).toFixed(2) * 1}}</span>
-->
<!--
                  <span v-if="(item.basePrice != '' && item.basePrice != null) && (item.disCountPrice == '' || item.disCountPrice == null)">{{parseInt(item.applyObjSpec) * parseFloat(item.basePrice).toFixed(2) * 0.7}}</span>
-->
                  <span v-if="(item.basePrice != '' && item.basePrice != null) && (item.disCountPrice == '' || item.disCountPrice == null)">{{parseFloat(item.applyObjSpec * item.basePrice * 0.7).toFixed(2)}}</span>

                  <!--
                  <span v-if="(item.basePrice != '' && item.basePrice != null) && (item.disCountPrice != '' && item.disCountPrice != null)">{{parseInt(item.applyObjSpec) * item.basePrice * parseFloat(item.disCountPrice).toFixed(2)}}</span>
-->
                  <span v-if="(item.basePrice != '' && item.basePrice != null) && (item.disCountPrice != '' && item.disCountPrice != null)">{{ parseFloat(item.applyObjSpec * item.basePrice * item.disCountPrice).toFixed(2)}}</span>

                  <input v-if="item.basePrice == '' || item.basePrice == null" type="hidden" name="basePrice"  value="0.00">
                  <input v-if="!(item.basePrice == '') && !(item.basePrice == null)" type="hidden" name="basePrice"  :value="item.basePrice">
                </td>


                <td class="info-payMethod">
                  <select class="select-after-label form-control">
                    <option value="前台收费">前台收费</option>
                    <option value="计费收费">计费收费</option>
                  </select>
                </td>

                <td class="info-operate">
                  <span class="bt-delete" @click="deleteObj(index,item,$event)">删除</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="container-bottom">
          <div class="select-all">
            <input class="select-all-box" name = "select-all-box" id="select-all-box" @click="selectAll()" type="checkbox" />
            <a>全选</a>
<!--
            <div class="bt-delete-choosed" @click="deleteAllItem();">删除选中项</div>
-->
          </div>

          <div class="price-all">

              <div class="total-price">
                  <div class="total-price-amount">
                    <a>总价合计：</a><span>￥{{totalPrice}}</span>
                  </div>

                <div class="total-price-discount">
                  <a>折扣优惠：</a><span>￥{{disCountPrice}}</span>
                </div>
              </div>

            <div class="product-choose">
              已选 <span>{{totalNum}}</span>个产品
            </div>
          </div>

          <div class="submit">
              <div @click="submitOrder()">提交</div>
          </div>
        </div>
      </div>
    </div>
    <!--脚注-->
    <MyFooter></MyFooter>
  </div>
</template>


<script>
  import MyNav from '../common/MyNav.vue';
  import MyFooter from '../common/MyFooter.vue';

  export default {
    data(){
      return{
        custData:{},
        loginClick:false,
        current:"index",
        totalPrice:"0.00",
        totalNum:"0",
        disCountPrice:"0.00",
        sysUserName:[],
        shoppCartList:[
        ]
      };
    },
    components:{
      MyNav,
      MyFooter,
    },
    mounted:function(){
      var _this = this;

      var user = window.sessionStorage.getItem('user');
      this.sysUserName=JSON.parse(user).sysUserName;

      var cust = window.sessionStorage.getItem('cust');
      _this.custData = JSON.parse(cust);

      /**获取客户**/
      var cust = window.sessionStorage.getItem('cust');
      var custId = JSON.parse(cust).CUST_ID;
       axios({
              method:'post',
              url:"/netCloudOrder/shoppingCartService/getShoppingCarts",
         data:{
           userId:custId
         }
        }).then(function (response) {
          var lst = response.data.data;
          _this.shoppCartList = lst;
        }).catch(err =>{
        })
    },
    methods:{
      submitOrder:function(){
        var param = {};
        var cartItemList = [];

        $("input[name='info-product-box']").each(function(){
          if($(this).prop("checked") == true){

            var tr = $(this).parents("tr");
                var temp = {};
                var cartItemId = tr.find(".info-product").find(".inputCartItemId").val();
                var applyObjId = tr.find(".info-product").find(".InputApplyObjId").val();
                var applyObjSpec = parseInt(tr.find(".info-amount").find(".item-amount").find("span").text());
                //var disCount = tr.find(".info-discount").find("select").val();
                var disCount = tr.find(".info-discount").find("input").val();

                var basePrice = tr.find(".info-product").find(".inputBasePrice").val();
                var billType = tr.find(".info-payMethod").find("select").val();
                //如果未配置,则直接报错
                if(basePrice == null || basePrice == ''){
                  this.$alert('有未配置的购物车,无法提交!','提示',{
                    confirmButtonText: '确定',
                    callback: action => {
                        return false;
                    }
                  })
                }
                temp.cartItemId = cartItemId;
                temp.applyObjId = applyObjId;
                temp.applyObjSpec = applyObjSpec;
                temp.discount = disCount;
                temp.billType = billType;
                cartItemList.push(temp);
          }
        });
        param.cartItemList  = cartItemList;
        axios({
          method:'post',
          url:"/netCloudOrder/orderService/submitOrderFromCart",
          data:param
        }).then(res=>{
            if(res.data.code == "0") {
              window.location.reload();
            }
        }).catch(error=>{

        })
      },

      /**删除全部被选中项**/
      deleteAllItem:function () {
        $("input[name='info-product-box']").each(function(){
            if($(this).prop("checked") == true){
              $(this).parents("tr").remove();
            }
        });
      },

      /**删除购物车**/
      deleteObj:function (index,item,event){
          var _this = this;
          var cartItemId = item.cartItemId;
          console.log(cartItemId);
          if($("input[type='checkbox'][value=" + index + "]").prop("checked")){

            axios({
            method:'get',
            url:"/netCloudOrder/shoppingCartService/deleteShopCartItem",
              params:{
                cartItemId:cartItemId,
              }
          }).then(res =>{
              if(res.data.code == "0"){
                this.$alert('删除成功!','提示',{
                  confirmButtonText: '确定',
                  callback: action => {
                    var node = $("input[type='checkbox'][value=" + index + "]");
                    $(node).parents("tr").remove();
                  }
                })
              }else{
                this.$alert('删除失败!','提示',{
                  confirmButtonText: '确定',
                  callback: action => {

                  }
                })
              }

          }).catch(err =>{
          })
          }else{
            this.$alert('请先选中要删除的项', '提示', {
              confirmButtonText: '确定'
            });
          }
      },

      calculateTotalPrice:function(){
        var _this = this;
        var totalNum = 0;
        var totalPrice = 0;
        var disCount = 0;
        var basePrice = 0;
        /**优惠金额**/
        var disCountPrice = 0;

        /**选中的商品个数**/
        var choosedNum = 0;

        $("input[name='info-product-box']").each(function(){
              if($(this).prop("checked")){
                choosedNum++;
                var tr =  $(this).parent().parent();

                /**获取总数**/
                totalNum = parseInt(tr.find($(".info-amount")).find("div").find("span").text());

                /**当前折扣**/
                //disCount = tr.find($(".info-discount")).find("select").val();
                disCount = tr.find($(".info-discount")).find("input").val();

                /**获取总价**/
                totalPrice = totalPrice + parseFloat(tr.find($(".info-money")).find("span").text());

                basePrice = basePrice + parseFloat(tr.find($(".info-money")).find("input").val()) * totalNum;

              }
            }
        )

        totalPrice = totalPrice.toFixed(2);
        disCountPrice = (basePrice - totalPrice).toFixed(2);
        _this.totalNum = choosedNum;
        _this.totalPrice = totalPrice;
        _this.disCountPrice = disCountPrice;
      },

      selectAll:function () {
        if(!$("input[name='select-all-box']").prop("checked")){
          $("input[name='info-product-box']").prop("checked",false);
        }else{
          $("input[name='info-product-box']").prop("checked",true);
        }
        this.calculateTotalPrice();
      },

      /**校验折扣是否合法**/
      checkDiscount:function(disCount){
          if(isNaN(disCount)){
            return false;
          }

          var disCountNumber = parseFloat(disCount);

          if(disCountNumber > 1 || disCountNumber < 0.65){
            return false;
          }
          return true;
      },

      selectChange:function(event){
        var el = event.currentTarget;
        var _this = this;
        var disCount;
        var count;
        var basePrice;
        var finalPrice;
        /**遍历更新显示价格**/
        $("input[name='info-product-box']").each(function(){
          var tr = $(this).parent().parent();

          disCount = tr.find($(".info-discount")).find("input").val();
          /**校验折扣是否合法**/
          if(! _this.checkDiscount(disCount)){
            _this.$alert('折扣必须在1到0.65之间,请重新输入!', '提示', {
              confirmButtonText: '确定',
              callback:action=>{
                return false;
              }
            });
          }
          disCount = parseFloat(disCount);

          basePrice =  parseFloat(tr.find($(".info-money")).find("input").val());
          count = tr.find($(".info-amount")).find($(".item-amount")).find("span").text();
          count = parseInt(count);
          finalPrice = (disCount * basePrice * count).toFixed(1);
          tr.find($(".info-money")).find("span").text(finalPrice);
        });
        _this.calculateTotalPrice();
      },

      minusAmount:function(item){
        var _this = this;
        if(!(item.applyObjSpec == 1)){
          item.applyObjSpec--;
        }
        _this.$nextTick(function () {
          _this.selectChange();
        })
      },

      plusAmount:function(item){
        var _this = this;
        item.applyObjSpec++;
        _this.$nextTick(function () {
         _this.selectChange();
       })
      }
    }
  }
</script>

<style scoped lang="less">
  .page{
    width: 100%;
    background-color: #f6f6f6;
    heigth:100%;
  }

  .myOrder-container{
    width:1290px;
    min-height:200px;
    margin:60px auto;
    padding:0;
    border:1px solid #f2f2f2;
    background-color: #fff;
    /*position: relative;*/
    /*height: 600px;*/
    height:auto;
  }

  .shoppingCart-topLine{
    width:100%;
    height:60px;
    border-bottom:1px solid #f2f2f2;
    .shoppingCart-topLine-title{
      height:60px;
      padding-left:20px;
      display: block;
      line-height:60px;
      color:#318de7;
      font-size:18px;
      float:left;
    }
    .bt-add-product{
        float:right;
        margin-top: 15px;
        width:100px;
        height:30px;
        background-color: green;
        text-align: center;
        line-height: 30px;
        background-color: #00cc33;
        border-radius: 5px;
        color: white;
        margin-right:109px;
        cursor:pointer;
    }
    .bt-switch-customer{
        float:right;
        margin-top: 15px;
        width:100px;
        height:30px;
        text-align: center;
        line-height: 30px;
        margin-right:72px;
        border: solid 1px #cccccc;
        border-radius: 5px;
        cursor:pointer;
    }
  }

  .shoppingCart-box {
    width: 100%;
  }

  .customer-table {
    background: #fff;
    width: 100%;
    thead{
      background: #fafafa;
    }

    tr{
      height: 60px;
      line-height: 18px;
      text-align: center;
    }

    /*表头第一列,产品标识*/
    .title-product{
      width:10%;
      color:#7aaeec;
      font-size: 16px;
    }
    /*对应表头第一列*/
    .info-product{
      width:10%;
      color:#7aaeec;
      font-size: 16px;
      border-bottom:1px solid #ccc;
      .info-product-box{
        width:20px;
        height:20px;
      }
    }

    /*表头第二列,商品名称*/
    .title-productName{
      width:10%;
      font-size: 16px;
      color: #5b5b5b;
    }
    /*对应表头第二列*/
    .info-productName-title{
      width:10%;
      font-size: 16px;
      border-bottom:1px solid #ccc;

      .info-productName{
        min-width:15%;
        text-align: left;
        font-size: 14px;
        img{
          width:92px;
          height:85px;
          margin-left:18px;
          margin-top:20px;
        }
        .info-productName-tag{
          width:100%;
          min-height: 40px;
          line-height:40px;
          text-align: center;
          color:#989898;
        }
      }
    }


    /*表头第三列,产品配置*/
    .title-config{
      width:10%;
      font-size: 16px;
      color: #5b5b5b;
    }

    /*对应表头第三列*/
    .info-config{
      width:10%;
      border-bottom:1px solid #ccc;
      .configuration{
        line-height: 50px;
        a{
          font-size: 14px;
          cursor:pointer;
          color:#017bec;
        }
      }
    }
    .subTable{
      width:180px;
      tr td{
        font-size: 14px;
        color: #6b6c6c;
        border-bottom:1px solid #ccc;
      }
    }



    /*表头第四列,产品数量*/
    .title-amount{
      width:15%;
      font-size: 16px;
      color: #5b5b5b;
    }
    /*对应表头第四列*/
    .info-amount{
      width:15%;
      border-bottom:1px solid #ccc;
      .item-amount {
        width: 90px;
        height: 34px;
        margin-left: 75px;
        span {
          width: 30px;
          float: left;
          text-align: center;
          margin-top: 8px;
        }
        .btn-minus{
          width: 20px;
          height: 20px;
          font-size: 12px;
          float: left;
          margin-top: 6px;
        }
        .btn-plus{
          width: 20px;
          height: 20px;
          font-size: 12px;
          float: left;
          margin-top: 6px;
        }
      }
    }


    /*新增付费方式*/
    .title-payMethod{
      width:10%;
      font-size: 16px;
      color: #5b5b5b;
    }

    /*对应付费方式*/
    .info-payMethod{
      width:10%;
      border-bottom:1px solid #ccc;

      .select-after-label{
        width:100px;
        height: 31px;
        margin-left: 35px;
      }
    }

    /*表头第五列,商品折扣*/
    .title-discount{
      width:15%;
      font-size: 16px;
      color: #5b5b5b;
    }
    /*对应表头第五列*/
    .info-discount{
      width:15%;
      border-bottom:1px solid #ccc;

      .select-after-label{
        width:100px;
        height: 31px;
        margin-left: 60px;
        font-size: 14px;
      }
    }
    /*表头第六列,商品价格*/
    .title-money{
      width:10%;
      font-size: 16px;
      color: #5b5b5b;
    }
    /*对应表头第六列*/
    .info-money{
      width:10%;
      border-bottom:1px solid #ccc;
      color:#ff8200;
      span{
        color:#ff8200;
      }
    }

    /*表头第七列,操作*/
    .title-operate{
      width:10%;
      font-size: 16px;
      color: #5b5b5b;
    }

    /*对应表头第七列*/
    .info-operate{
      width:10%;
      border-bottom:1px solid #ccc;

      .bt-delete{
        width:70px;
        height:30px;
        line-height:30px;
        text-align: center;
        display: block;
        margin-left: 40px;
        right:0;
        -moz-border-radius: 5px; /* Firefox */
        -webkit-border-radius: 5px; /* Safari 和 Chrome */
        border-radius: 5px;
        color:#6da7ec;
        font-size:16px;
        cursor:pointer;
      }
    }
  }

  .container-bottom{
    width:100%;
    height: 120px;
    border-bottom:1px solid #ccc;
   /* position: absolute;
    bottom: 0;*/
    .select-all{
      width:20%;
      height:100%;
      float:left;
      background-color: #fbfbfb;
      .select-all-box{
        width:20px;
        height: 20px;
        margin-left:60px;
        margin-top:50px;
      }
      a{
        margin-top:20px;
        margin-left:10px;
        font-size: 16px;
      }
      div{
        float:right;
        margin-top: 45px;
        margin-right:20px;
        width:100px;
        height:30px;
        text-align: center;
        line-height: 30px;
        border: solid 1px #cccccc;
        border-radius: 5px;
        cursor:pointer;
      }
    }

    .price-all{
      width:65%;
      height:100%;
      float:left;
      background-color: #fbfbfb;
      .product-choose{
          width:30%;
          height:100%;
          float:right;
          padding-top: 50px;
          padding-left: 70px;
          span{
            color:#ff8200;
          }
      }
      .total-price{
          width:30%;
          height:100%;
          float:right;
         .total-price-amount{
            width:100%;
            height:50%;
            text-align: center;
            padding-top: 30px;
           a{
             float:left;
           }
            span{
              color: #ff8200;
              font-size:16px;
              float:left;
            }
        }
        .total-price-discount{
            width:100%;
            height:50%;
            padding-top:10px;
            a{
              float:left;
            }
          span{
            float:left;
          }
        }
      }
    }

    .submit{
      width:15%;
      height:100%;
      float:left;
      background-color: #ff8200;
      div{
        font-size: 20px;
        color: white;
        margin-top: 40px;
        margin-left:80px;
        cursor: pointer;
      }
    }
  }

</style>

