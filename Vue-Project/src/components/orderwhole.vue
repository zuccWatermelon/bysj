<template>
  <div class="index">
    <UserNav></UserNav>
    <div class="coludBuyb">
      <ClientManagerNav></ClientManagerNav>
      <div class="coludBuybContent clearfix">
        <div class="userchange">
          <div class="passback">
            <img src="../assets/img/passBack.png"/>
            返回&nbsp;| 您当前正在为客户“张三”选购服务
          </div>
        </div>
        <div class="changebtn configuration" data-toggle="modal" data-target="#skyCloud_modal">

          <img src="../assets/img/passChange.png"/>
          切换用户
        </div>
        <div class="passbuytop">
          <div class="chooseSever">选择服务</div>
          <div class="chooseinquiry">
            <img src="../assets/img/passFind.png"/>
            <input type="text" placeholder="请输入关键字">
          </div>
        </div>
        <div class="coludBuybLeft">
          <router-link to="/orderForm" class="cloudBuy"><div class="tYColud">天翼云</div></router-link>
          <router-link to="/orderwhole" class="passBuy"><div class="cJThrough">畅捷通</div></router-link>
        </div>
        <div class="coludBuybRight">
          <p class="coludBuybRight-top">
            <span>畅捷通 > T+系列 > 标准版 ></span>
          </p>
          <table class="coludBuybRight-one">
            <thead class="coludBuybRight-list">
            <tr>
              <th class="coludBuybRight-trd"><span class="coludBuybRight-only">模块组</span></th>
              <th class="coludBuybRight-trd">模块</th>
              <th class="coludBuybRight-trd">模块价格</th>
              <th class="coludBuybRight-trd">站点价格</th>
              <th class="coludBuybRight-trd">站点数</th>
              <th class="coludBuybRight-trd">模块组价格</th>
              <th class="coludBuybRight-trd">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr style="height: 110px;position: relative" class="coludBuybRight-yes">
              <th>
                <p  class="coludBuybRight-fee">财务管理</p>
              </th>
              <th>
                <p class="coludBuybRight-feea" style="margin-top: 10px">总账</p>
                <p class="coludBuybRight-feea">T-UFO</p>
                <p class="coludBuybRight-feea">出纳管理</p>
                <p class="coludBuybRight-feea">固定资产</p>
              </th>
              <th>
                <p class="coludBuybRight-feea" style="margin-top: 10px">8800</p>
                <p class="coludBuybRight-feea">3000</p>
                <p class="coludBuybRight-feea">3800</p>
                <p class="coludBuybRight-feea">3000</p>
              </th>
              <th>
                <p class="coludBuybRight-feea" style="margin-top: 10px">每增1站点</p>
                <p class="coludBuybRight-feea">增3800元</p>
              </th>
              <th style="position: relative">
                 <span class="whole-fred">
                  <button class="btn2" v-on:click="op('add')">-</button>
                    {{sum}}
			            <button class="btn1" @click="op('sub')">+</button>
                </span>
              </th>
              <th style="position: relative">
                <span  class="whole-fref">¥{{money}}</span>
              </th>
              <th style="position: relative">
                <p>
                  <a class="opentwo" href="javascript:void(0)" target="_blank">删除</a>
                  <a class="openthree" href="javascript:void(0)" target="_blank">申请优惠</a>
                </p>
              </th>
            </tr>
            </tbody>
            <hr class="wholeone-aff">
            <tbody>
            <tr style="height: 90px">
              <th>
                <p  class="coludBuybRight-fee">财务管理</p>
              </th>
              <th>
                <p class="coludBuybRight-feea" style="margin-top: 10px">购销管理</p>
                <p class="coludBuybRight-feea">库存核算</p>
              </th>
              <th>
                <p class="coludBuybRight-feea" style="margin-top: 10px">16800</p>
                <p class="coludBuybRight-feea">9800</p>
              </th>
              <th>
                <p class="coludBuybRight-feea" style="margin-top: 10px">每增1站点</p>
                <p class="coludBuybRight-feea">增5800元</p>
              </th>
              <th style="position: relative">
                 <span class="whole-fred">
                  <button class="btn2" v-on:click="ap('aff')">-</button>
                    {{num}}
			            <button class="btn1" @click="ap('sua')">+</button>
                </span>
              </th>
              <th style="position: relative">
                <span  class="whole-fref">¥{{anowy}}</span>
              </th>
            </tr>
            </tbody>
          </table>
          <table class="coludBuybRight-one">
            <thead class="coludBuybRight-list">
            <tr>
              <th style="width: 200px"><span  class="coludBuybRight-whole">客户所属客户</span></th>
              <th class="coludBuybRight-whale">联系方式</th>
              <th class="coludBuybRight-whale">详细地址</th>
              <th class="coludBuybRight-whale"><span class="coludBuybRight-wheable">操作</span></th>
            </tr>
            </thead>
            <tbody>
            <tr style="height: 44px;">
              <th style="width: 200px;"><span class="wholeone">张三</span></th>
              <th class="coludBuybRight-whble">18057191234</th>
              <th class="coludBuybRight-whele">浙江省杭州市拱墅区莫干山路118号</th>
              <th class="coludBuybRight-whble"><span class="coludBuybRight-wheable"><a href="javascript:void(0)" class="coludBuybRight-whvle">编辑</a></span></th>
            </tr>
            </tbody>
          </table>
          <div class="payment">
            <p  class="payment-whale">软件合计: <span style="color: #39b9ff">¥{{moneyanowy}}</span></p>
            <p>
              <a class="open" href="javascript:void(0)" target="_blank" @click="addToShoppingCart">加入购物车</a>
              <a class="openone" href="javascript:void(0)" target="_blank">提交订单</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import UserNav from './common/UserHeader.vue';
  import ClientManagerNav from './common/ClientManagerNav.vue'
  import axios from 'axios';

  export default {
    components:{
      UserNav,
      ClientManagerNav,
    },
    data(){
      return {
        current:"index",
        sum:1,
        num:1,
        money:3800,
        anowy:5800,
        moneyanowy:9600,
      }
    },
    methods:{
      op:function(type){
        if (type == 'sub') {
          this.sum++;
        }
        if (type == 'add') {
          if (this.sum <= 0) {
            this.$alert('不能为负数', {
                confirmButtonText: '确定',
                callback:acion=>{

              }
          });
            return;
          } else {
            this.sum--;
          }
        }
        this.money=this.sum*3800;
        this.moneyanowy= this.anowy+this.money
      },
      ap:function(type){
        if (type == 'sua') {
          this.num++;
        }
        if (type == 'aff') {
          if (this.num <= 0) {
            this.$alert('不能为负数', {
                confirmButtonText: '确定',
                callback:acion=>{

              }
          });
            return;
          } else {
            this.num--;
          }
        }
        this.anowy=this.num*5800;
        this.moneyanowy= this.anowy+this.money
      },
      addToShoppingCart:function(){
        alert(111);

        axios({
          url:'http://134.96.231.87:8094/shoppingCart/addToShoppingCart?',
          method:'post',
          params:{
            loginUserId:"22",
            shoppingCart:{
              remark: "购物车",
              statusCd: "购物车状态",
              userId: "2",
              userType: "2"
            },
            shoppingCartItem:{
              applyObjId: "31",
              applyObjSpec: "1",
              cartItemCd: "畅捷通",
              remark: "购物项",
              statusCd: "可用"
            },
            cartItemAttr:{
              attrId: "10",
              attrValue: "10",
              remark: "购物项属性",
              statusCd: "状态",
              parAttrId: "1"
            }

          }
        }).then(response =>{

          console.log(response.data);
        if(response.data.code=="0"){
          this.$router.push({path:'/shoppingCart'});

        }


      }).catch(err =>{

        })


      }
    },
//    data(){
//      return{
//        clientData:[
//          {
//            "wordOrderNum":'1001011706120911',
//            "orderNum":'1001011706120911',
//            "customer":'张三',
//            "phoneNum":'12345678900',
//            "address":'杭州市拱墅区118号',
//            "status":'待处理',
//          },
//          {
//            "wordOrderNum":1001011706120911,
//            "orderNum":1001011706120911,
//            "customer":'张三',
//            "phoneNum":'12345678900',
//            "address":'杭州市拱墅区118号',
//            "status":'待处理',
//          }
//        ]
//      }
//   }
  }
</script>

<style scoped lang="less">
  .coludBuyb{
    width:100%;
    height:auto;
    background: #f6f6f6;
    padding-bottom: 148px;
    clear: both;
    position: relative;
  }
  .coludBuybContent{
    position: relative;
    width:1200px;
    height:auto;
    margin: 0 auto;
    clear: both;

  }

  .coludBuybLeft{
    position: absolute;
    left: 110px;
    width:166px;
    height:506px;
    background: #fff;
  }
  .coludBuybRight-fore{
    display: inline-block;
    margin-left: 30px
  }
  .coludBuybRight-fee{
    line-height: 40px;
    color: #666666;
    margin-left: 30px;
    vertical-align: top;
    font-weight: 500;
  }
  .coludBuybRight-feea{
    line-height: 18px;
    color: #666666;
    font-weight: 500;
  }
  .coludBuybRight-whole{
    display: inline-block;
    margin-left: 30px
  }
  .coludBuybRight-whale{
    width: 200px;
    text-align: center
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
  .coludBuybRight-only{
    width: 160px;
    display: inline-block;
    margin-left: 40px
  }
  .coludBuybRight{
    float:left;
    margin-left: 280px;
    width:998px;
    height:506px;
    background-color: white;
  }
  .coludBuybRight-yes th{
    vertical-align: top;
  }
  .coludBuybRight-top{
    height: 54px;
    background: white;
    border-bottom: 1px solid #318de7;

  }
  .coludBuybRight-top span{
    display: inline-block;
    line-height: 54px;
    margin-left: 28px;
    color: #318de7;
  }
  .coludBuybRight-trd{
    width: 140px;
  }
  .coludBuybRight-one{
    background: white;
    margin-top: -10px;
  }
  .coludBuybRight-list tr{
    height: 54px;
    background-color: #fafafa;
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
  }
  .wholesale-col{
    color: #a0a0a0;
  }
  .wholesale-one p{
    color: #666666;
  }
  .coludBuybRight-whble{
    width: 400px;
    text-align: center;
    color: #858585;
    font-weight: 500;
  }
  .payment-whole{
    margin-top: 5px;
    margin-left:10px
  }
  .payment-whale{
    margin: 0;
    margin-top: 24px;
    margin-bottom: 20px;
  }
  .coludBuybRight-whele{
    width: 230px;
    text-align: center;
    color: #858585;
    font-weight: 500;
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
    font-size: 12px;
    line-height: 30px;
    margin: 0;
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
    font-size: 12px;
    line-height: 30px;
    margin: 0;
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
    top:370px;
    width: 800px;
  }
  .coludBuybRight-whvle{
    color: #8ed7ff;
    font-weight: bold
  }
  .coludBuybRight-wheable{
    margin-left: 90px;
  }
  .userchange{
    width:1200px;
    height:80px;
    /*margin: 0 auto;*/
    font-size: 20px;
    line-height: 80px;
    text-indent: 76px;
    margin-left: 130px;
    position: relative;
  }
  .passback{
    width:100%;
    height:80px;
    position: absolute;
    text-indent: 26px;
    top:0;
    left:0;
  }
  .passback img{
    position: absolute;
    top:30px;
    left:0;
  }
  .passbuytop{
    width: 1168px;
    height: 80px;
    line-height: 80px;
    font-size: 20px;
    border-bottom: 2px solid #f2f2f2;
    margin-left: 110px;
    background-color: white;
    position: relative;
  }
  .chooseinquiry{
    width:400px;
    height:40px;
    position: absolute;
    top:0;
    right: 40px;
  }
  .chooseinquiry img{
    position: absolute;
    right:10px;
    top:32px;
  }
  .chooseinquiry input{
    width:400px;
    height:40px;
    font-size: 16px;
    line-height: 40px;
    background: #e1f1f2;
    outline: none;
    border:none;
    text-indent: 10px;
  }
  .chooseinquiry input::-webkit-input-placeholder{
    color: #b8b8b8;
  }
  .chooseSever{
    margin-left: 20px;
  }
  .changebtn{
    position: absolute;
    top:26px;
    left: 550px;
    width:95px;
    height:30px;
    outline: none;
    border: 1px solid #30acee;
    line-height: 28px;
    color:#30acee ;
    text-indent: 28px;
    border-radius: 4px;
  }
  .changebtn img{
    position: absolute;
    left: 10px;
    top:7px;
  }
</style>
