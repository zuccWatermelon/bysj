<!--T+标准版配置-->
<template>
  <div class="index">
    <MyNav :current="current"></MyNav>
    <div class="coludBuy">
      <div class="coludBuyContent clearfix">
        <div class="coludBuyLeft">
          <router-link to="" class="cloudBuy"><div class="tYColud">天翼云</div></router-link>
          <router-link to="/TConfiguration" class="passBuy"><div class="cJThrough active">畅捷通</div></router-link>
        </div>
        <div class="coludBuyRight">
          <p class="coludBuyRight-top">
            <span>畅捷通 > T+系列 > 标准版 ></span>
          </p>
          <div class="shoppingCart-box t-configuration">
            <div class="shoppingCart-title movePaddding">
              <span class="title-moduleGroup">模块组</span>
              <span class="title-module">模块</span>
              <span class="title-modulePrice">模块价格</span>
              <span class="title-sitePrice">站点价格</span>
              <span class="title-siteAmount">站点数</span>
              <span class="title-moduleGroupPrice">模块组价格</span>
            </div>
            <div class="shoppingCart-list" id="check_list">
              <div class="list-item  border-bottom" >
                <div class="info-cell info-moduleGroup">
                  <input class="check-item financeFlag" type="checkbox" data-type="financeFlag" @click="check_all($event)"/>
                  <span>财务管理</span>
                </div>
                <div class="info-cell info-module">
                  <div><input class="check-item financeFlag" type="checkbox" /><span>总账</span></div>
                  <div><input class="check-item financeFlag" type="checkbox" /><span>T-UFO</span></div>
                  <div><input class="check-item financeFlag" type="checkbox" /><span>出纳管理</span></div>
                  <div><input class="check-item financeFlag" type="checkbox" /><span>固定资产</span></div>
                </div>
                <div class="info-cell info-modulePrice">
                  <span>8888.00</span>
                  <span>3888.00</span>
                  <span>3888.00</span>
                  <span>3888.00</span>
                </div>
                <div class="info-cell info-sitePrice">
                  <span>每增加一站点增3800元</span>
                </div>
                <div class="info-cell info-siteAmount">
                  <div class="item-amount">
                    <a href="#" v-bind:class="{'minus':CJTConfigure.finance.amount !== 1,'no-minus':CJTConfigure.finance.amount == 1}" v-on:click="minusOrPlusTheAmount('-',CJTConfigure.finance,$event)">-</a>
                    <input type="text" style="text-align: center" class="form-control" v-model="CJTConfigure.finance.amount" v-on:input="controlContent(CJTConfigure.finance,$event)" />
                    <a href="#" v-bind:class="{'plus':CJTConfigure.finance.amount !== 100,'no-plus':CJTConfigure.finance.amount == 100}"v-on:click="minusOrPlusTheAmount('+',CJTConfigure.finance,$event)">+</a>
                  </div>
                </div>
                <div class="info-cell info-moduleGroupPrice">
                  <span>￥388.00</span>
                </div>
              </div>
              <div class="list-item border-bottom" >
                <div class="info-cell info-moduleGroup">
                  <input class="check-item firmFlag" type="checkbox"  data-type="firmFlag" @click="check_all($event)"/>
                  <span>业务管理</span>
                </div>
                <div class="info-cell info-module">
                  <div><input class="check-item firmFlag" type="checkbox" /><span>购销管理</span></div>
                  <div><input class="check-item firmFlag" type="checkbox" /><span>库存核算</span></div>
                </div>
                <div class="info-cell info-modulePrice">
                  <span>16800</span>
                  <span>9800</span>
                </div>
                <div class="info-cell info-sitePrice">
                  <span>每增加一站点增5800元</span>
                </div>
                <div class="info-cell info-siteAmount">
                  <div class="item-amount">
                    <a href="#" v-bind:class="{'minus':CJTConfigure.firm.amount !== 1,'no-minus':CJTConfigure.firm.amount == 1}" v-on:click="minusOrPlusTheAmount('-',CJTConfigure.firm,$event)">-</a>
                    <input type="text" style="text-align: center" class="form-control" v-model="CJTConfigure.firm.amount" v-on:input="controlContent(CJTConfigure.firm,$event)" />
                    <a href="#" v-bind:class="{'plus':CJTConfigure.firm.amount !== 100,'no-plus':CJTConfigure.firm.amount == 100}"v-on:click="minusOrPlusTheAmount('+',CJTConfigure.firm,$event)">+</a>
                  </div>
                </div>
                <div class="info-cell info-moduleGroupPrice">
                  <span>￥388.00</span>
                </div>
              </div>
            </div>
            <div class="shoppingCart-submit">
              <span>软件合计： ￥710.40</span>
              <span class="out-of-btsubmit"><span class="bt-order-submit">确认配置</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <MyFooter></MyFooter>
  </div>

</template>

<script>
  import MyNav from './common/MyNav.vue';
  import MyFooter from './common/MyFooter.vue';

  export default{
    components:{
      MyNav,
      MyFooter
    },
    data(){
      return{
        CJTConfigure:{
          "finance":{
            "amount": 5,
            "moduleGroupPrice": 338
          },
          "firm":{
            "amount": 3,
            "moduleGroupPrice": 338
          }
        }
      }
    },
    methods:{
      //全选全不选
      check_all: function(event){
        var el = event.currentTarget;
        if(el.checked && $(el).attr("id") == "check_all"){
          //全选
          $("input[type=checkbox].check-item").prop("checked", true);
        }else if(!(el.checked) && $(el).attr("id") == "check_all"){
          //全不选
          $("input[type=checkbox].check-item").prop("checked", false);
        }else if(el.checked && $(el).attr("id") !== "check_all"){
          //天翼云或是畅捷通的全选
          var flag = $(el).attr('data-type');
          $("input[type=checkbox]."+flag).prop("checked", true);
        }else if(!el.checked && $(el).attr("id") !== "check_all"){
          //天翼云或是畅捷通的全不选
          var flag = $(el).attr('data-type');
          $("input[type=checkbox]."+flag).prop("checked", false);
        }
      },
      //数量input输入时确保输入为1到max_amount间的数字。
      controlContent:function(item,event){
        var max_amount = 100;
        var el = event.currentTarget;
        var amount_input = $(el).val();
        console.log(isNaN(amount_input));
        if(isNaN(amount_input)){
          console.log('in a');
          item.amount = 1;
        }else if(amount_input < 1){
          console.log('in b');
          item.amount = 1;
        }else if(amount_input > max_amount){
          console.log('in c');
          item.amount = max_amount;
        }else{
          item.amount = amount_input;
        }
      },
      //amount的加减
      minusOrPlusTheAmount:function(m_or_p,item,event){
        event.preventDefault();
        if(m_or_p == '-' && item.amount !== 1){
          item.amount--;
        }else if(m_or_p == '+' && item.amount !== 100){
          item.amount++;
        }
      }
    }
  }

</script>

<style scoped lang="less">
  .coludBuy{
    width:100%;
    height:auto;
    background: #f6f6f6;
    padding-top: 46px;
    padding-bottom: 148px;
    clear: both;
  }
  .coludBuyContent{
    position: relative;
    width:1200px;
    height:auto;
    margin: 0 auto;
    clear: both;

  }

  .coludBuyLeft{
    position: absolute;
    width:166px;
    height:506px;
    background: #fff;
  }
  .tYColud{
    width:166px;
    height:54px;
    background: #fff;
    color:#333;
    text-align: center;
    line-height: 54px;
    font-size: 22px;
  }
  .cJThrough{
    width:166px;
    height:54px;
    background: #318de7;
    color:#fff;
    text-align: center;
    line-height: 54px;
    font-size: 22px;
    border-bottom: 1px solid #f2f2f2;
  }
  .cJThrough.active{
    color:#fff;
  }
  .coludBuyRight{
    float:left;
    margin-left: 170px;
    width:998px;
    height:506px;
    background-color: white;
  }
  .coludBuyRight-top{
    height: 55px;
    background: white;
    border-bottom: 1px solid #318de7;
  }
  .coludBuyRight-top span{
    display: inline-block;
    line-height: 54px;
    margin-left: 28px;
    color: #318de7;
  }
  .price{
    width: 120px;
    height: 40px;
    color: #666;
    font-size: 18px;
    line-height: 40px;
    background: url("../assets/img/icon_gengduo.png") right center no-repeat;
  }
  .wholesale{
    width: 357px;
    height: 150px;
    font-size: 12px;
  }
  .wholesale-one{
    width: 50%;
    height: 100%;
    float: left;
  }
  .wholesale-two{
    float: right;
    width: 50%;
    background-color:white ;
  }
  .wholesale-two p{
    color: #666666;
    font-weight: 500;
  }
  .wholesale-col{
    color: #a0a0a0;
    font-weight: 500;
  }
  .wholesale-one p{
    color: #666666;
    font-weight: 500;
  }
  .payment-whole{
    margin-top: 5px;
    margin-left:10px
  }
  .payment-whale{
    margin: 0;
    margin-top: 40px;
    margin-bottom: 20px;
  }
  .open{
    position: absolute;
    right: 170px;
    width: 70px;
    height: 30px;
    background: #2bb4ff;
    color: #fff;
    border-radius: 7px;
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    margin: 0;
    font-size: 12px;
  }
  .openone{
    position: absolute;
    right: 80px;
    width: 70px;
    height: 30px;
    background: #2bb4ff;
    color: #fff;
    border-radius: 7px;
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    margin: 0;
    font-size: 12px;
  }
  .payment{
    float: right;
    margin-right: 30px;
  }
  .opentwo{
    position: absolute;
    top:10px;
    right: 76px;
    width: 70px;
    height: 30px;
    background: #2bb4ff;
    color: #fff;
    border-radius: 7px;
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    margin: 0;
    font-size: 12px;
  }
  .openthree{
    position: absolute;
    top:50px;
    right: 76px;
    width: 70px;
    height: 30px;
    background: #2bb4ff;
    color: #fff;
    border-radius: 7px;
    text-align: center;
    font-size: 16px;
    line-height: 30px;
    margin: 0;
    font-size: 12px;
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
  .wholeone{
    display: inline-block;
    margin-left: 50px;
    color: #858585;
    text-align: center;
    font-weight: 500;
  }
  .whole-fred{
    position: absolute;
    top: 22px;
    left: -6px;
    color: #666666
  }
  .whole-fref{
    position: absolute;
    top: 23px;
    left: 8px;
    color: #39b9ff
  }
  .wholeone-aff{
    position: absolute;
    top:200px;
    width: 800px;
  }

  /*********add by gy********/

  .shoppingCart-box {
    width: 100%;
  }
  .t-configuration{
    margin-top:-10px;
  }
  .t-configuration .shoppingCart-title{
    height:44px;
    padding:0 30px;
    background-color: #fafafa;
    color:#333;
    font-weight: 600;
    font-size:14px;
    span{
      line-height:44px;
      padding:0 5px;
      display: inline-block;
      vertical-align:middle;
      text-align: center;

    }
    .select-all{
      padding-right:30px;
    }
    .title-productName{
      width:235px;
      text-align: left;
    }
    .title-payWay{
      width:195px;
    }
    .title-buyCycle{
      width:170px;
    }
    .title-amount{
      width:140px;
    }
    .title-money{
      width:130px;
    }
    .title-discount{
      width:170px;
    }
    .title-operate{
      width:100px;
      text-align: right;
    }
  }
  .shoppingCart-list{
    width:100%;
  }
  .list-items{
    height:auto;
    padding:10px 30px;
    border-bottom: 1px solid #ccc;
  }

  .list-item {
    height: auto;
    margin:15px 0;
  }
  .info-cell{
    display: inline-block;
    vertical-align: top;
    text-align: center;
    padding: 0 5px;
    margin:0 20px;
  }
  .info-select{
    padding-right:30px;
    margin:0;
  }
  .productName-h{
    width:100%;
    font-size:14px;
    color:#333;
  }
  a.configuration{
    color:#017bec;
    font-size: 12px;
  }
  a.configuration:link,a.configuration:visited{
    color:#017bec;
  }
  .spmc-left,.spmc-right{
    width:40%;
    margin-right:8%;
    float:left;
    font-size:14px;
    div{
      margin:10px 0;
      white-space:nowrap;
      span{
        display: inline-block;
        vertical-align: top;
        white-space: normal;
        color:#666;
      }
      .span-label{
        color:#999;
      }
    }
  }
  .item-amount{
    width:90px;
    height:34px;
    input{
      width:50px;
      margin:0 5px;
      float:left;
    }
    .minus,.plus{
      width:15px;
      height:34px;
      float:left;
      line-height:34px;
      text-align: center;
      cursor: pointer;
    }
    .minus:hover,.plus:hover{
      color:red;
      background-color: #eee;
    }
    .no-minus,.no-plus{
      width:15px;
      height:34px;
      float:left;
      line-height:34px;
      text-align: center;
      color:#999;
      cursor: default;
    }
  }
  .bt-delete{
    width:70px;
    height:30px;
    line-height:30px;
    text-align: center;
    display: block;
    position: absolute;
    right:0;
    -moz-border-radius: 5px; /* Firefox */
    -webkit-border-radius: 5px; /* Safari 和 Chrome */
    border-radius: 5px;
    background-color: #49bfff;
    color:#fff;
    font-size:14px;
  }

  .shoppingCart-submit{
    width:100%;
    padding:10px 30px;
    text-align: right;
    span{
      display: block;
      font-size:18px;
      margin:10px 0;
      color:#333;
    }
    .out-of-btsubmit{
      height:60px;
    }
    .bt-order-submit{
      width:110px;
      height:40px;
      -moz-border-radius: 5px; /* Firefox */
      -webkit-border-radius: 5px; /* Safari 和 Chrome */
      border-radius: 5px;
      display:block;
      float: right;
      text-align: center;
      line-height:40px;
      color:#fff;
      background-color: #49bfff;

    }
  }

  .t-configuration .movePaddding{
    padding:0;
  }
  .t-configuration {
    .title-moduleGroup {
      width: 135px;
      text-align: left;
    }
    .title-module {
      width: 160px;
      text-align: left;
    }
    .title-modulePrice {
      width: 150px;
    }
    .title-sitePrice {
      width: 160px;
    }
    .title-siteAmount {
      width: 160px;
    }
    .title-moduleGroupPrice {
      width: 203px;
    }
    .info-moduleGroup {
      line-height: 35px;
      width: 95px;
    }
    .info-modulePrice {
      margin: 0 10px;
      span {
        display: block;
        width: 130px;
        line-height: 35px;
      }
    }
    .info-module {
      margin: 0 36px;
      div {
        height: 35px;
        line-height: 35px;
        text-align: left;
        input {
          margin-right: 8px;
        }
      }
    }
    .info-sitePrice {
      width: 120px;
    }
    .info-siteAmount {
      margin: 0 30px;
    }
    .info-moduleGroupPrice{
      width:160px;
    }
  }
  .border-bottom{
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }
  /********end add***********/
</style>

