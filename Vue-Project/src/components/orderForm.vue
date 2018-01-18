<template>
  <div class="index">
    <!--<MyNav :current="current"></MyNav>-->
    <UserNav></UserNav>
    <div class="coludBuya">
      <ClientManagerNav></ClientManagerNav>
      <div class="coludBuyContenta clearfix">
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
        <div class="coludBuyLeft">
          <router-link to="/orderForm" class="cloudBuy"><div class="tYColud">天翼云</div></router-link>
          <router-link to="/orderwhole" class="passBuy"><div class="cJThrough">畅捷通</div></router-link>
        </div>
        <div class="coludBuyRight">
          <p class="coludBuyRight-top">
            <span>确认订单</span>
          </p>
          <table class="coludBuyRight-one">
            <thead class="coludBuyRight-list">
            <tr>
              <th style="width: 357px"><span class="coludBuyRight-only">商品名称</span></th>
              <th class="coludBuyRight-trd">付费方式</th>
              <th class="coludBuyRight-trd">购买周期</th>
              <th class="coludBuyRight-trd">数量</th>
              <th class="coludBuyRight-trd">资费</th>
              <th class="coludBuyRight-trd">操作</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th style="width: 357px">
                 <span  class="coludBuyRight-fore">
                    <p  class="coludBuyRight-fee">云服务器ECS（包年包月）</p>
                    <div class="wholesale">
                      <div class="wholesale-one">
                        <p><span class="wholesale-col">可用分区:</span>&nbsp;&nbsp;内蒙节点1</p>
                        <p><span class="wholesale-col">系统盘:</span>&nbsp;&nbsp;15GB 高IO</p>
                        <p><span class="wholesale-col">数据盘:</span>&nbsp;&nbsp;40GB 高IO</p>
                        <p><span class="wholesale-col">弹性IP:</span> &nbsp;&nbsp;规格：电信线路 <br><span class="wholesale-foll">计费模式：按带宽计费</span><br><span  class="wholesale-fole">带宽：2M</span></p>
                      </div>
                      <div class="wholesale-two">
                        <p><span class="wholesale-col">镜像:</span> &nbsp;&nbsp;Windows Server 2016 <br><span  class="wholesale-fola">数据中心版 64位中文版</span></p>
                        <p><span class="wholesale-col">安全加固:</span>&nbsp;&nbsp;免费开通</p>
                        <p><span class="wholesale-col">密码:</span>&nbsp;&nbsp;已设置</p>
                      </div>
                    </div>
                </span>
              </th>
              <th class="whole-aree">
                <select  class="whole-free">
                  <option value ="volvo">一次性付款</option>
                  <option value ="saab">按月付款</option>
                </select>
              </th>
              <th  class="whole-bree">
                <select  class="whole-frea">
                  <option value ="volvo">按月</option>
                  <option value ="saab">按年</option>
                </select>
              </th>
              <th  class="whole-cree">
                <span class="whole-fred">
                  <button class="btn2" v-on:click="op('add')">-</button>
                    {{sum}}
			            <button class="btn1" @click="op('sub')">+</button>
                </span>
              </th>
              <th  class="whole-dree">
                <span  class="whole-fref">￥{{num}}</span>
              </th>
              <th style="width: 97px;position: relative">
                <p>
                  <a class="opentwo" href="javascript:void(0)" target="_blank">删除</a>
                  <a class="openthree" href="javascript:void(0)" target="_blank">申请优惠</a>
                </p>
              </th>
            </tr>
            </tbody>
          </table>
          <table class="coludBuyRight-one">
            <thead class="coludBuyRight-list">
            <tr>
              <th style="width: 200px"><span  class="coludBuyRight-whole">客户所属客户</span></th>
              <th class="coludBuyRight-whale">联系方式</th>
              <th class="coludBuyRight-whale">详细地址</th>
              <th class="coludBuyRight-whale"><span  class="coludBuyRight-wholea">操作</span></th>
            </tr>
            </thead>
            <tbody>
            <tr style="height: 44px;">
              <th style="width: 200px;"><span class="wholeone">张三</span></th>
              <th class="coludBuyRight-whble">18057191234</th>
              <th class="coludBuyRight-whele">浙江省杭州市拱墅区莫干山路118号</th>
              <th class="coludBuyRight-whble"><span  class="coludBuyRight-wholea"><a href="javascript:void(0)" class="coludBuyRight-whvle">编辑</a></span></th>
            </tr>
            </tbody>
          </table>
          <div class="payment">
            <p  class="payment-whale">应付款: <span>￥{{money}}</span></p>
            <p  class="payment-whole">代理商8折优惠</p>
            <p>
              <a class="open" href="javascript:void(0)" target="_blank">加入购物车</a>
              <a class="openone" href="javascript:void(0)" target="_blank">提交订单</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    <!--<MyFooter></MyFooter>-->
  </div>

</template>

<script>
  import UserNav from './common/UserHeader.vue';
  import ClientManagerNav from './common/ClientManagerNav.vue'

  export default {
    components:{
      UserNav,
      ClientManagerNav,
    },
    data(){
      return {
        current:"index",
        sum:1,
        num:888,
        money:888,
      }
    },
    methods:{
      op:function(type){
        if (type == 'sub') {
          this.sum++;
        }
        if (type == 'add') {
          if (this.sum <= 0) {
            alert("不能是负数");
            return;
          } else {
            this.sum--;
          }
        }
        this.num=this.sum*888;
        this.money=this.num
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
  .coludBuya{
    width:100%;
    height:auto;
    background: #f6f6f6;
    padding-bottom: 148px;
    clear: both;
    position: relative;
  }
  .coludBuyContenta{
    position: relative;
    width:1200px;
    height:auto;
    margin: 0 auto;
    clear: both;

  }

  .coludBuyLeft{
    position: absolute;
    left: 110px;
    width:166px;
    height:506px;
    background: #fff;
  }
  .tYColud{
    width:166px;
    height:54px;
    background: #318de7;
    color:#fff;
    text-align: center;
    line-height: 54px;
    font-size: 22px;

  }
  .coludBuyRight-fore{
    display: inline-block;
    margin-left: 30px
  }
  .coludBuyRight-fee{
    line-height: 45px;
    color: #333333
  }
  .wholesale-foll{
    display: inline-block;
    margin-left: 42px
  }
  .wholesale-fola{
    display: inline-block;
    margin-left: 33px
  }
  .wholesale-fole{
    display: inline-block;
    margin-left: 42px
  }
  .whole-aree{
    width: 97px;
    position: relative
  }
  .whole-bree{
    width: 97px;
    position: relative
  }
  .whole-frea{
    position: absolute;
    top: 13px;
    left: 3px;
    color: #cfcfcf;
  }
  .whole-free{
    position: absolute;
    top: 13px;left: -20px;
    color: #cfcfcf;
    font-size: 12px
  }
  .whole-cree{
    width: 97px;
    position: relative;
  }
  .whole-dree{
    width: 97px;
    position: relative
  }
  .coludBuyRight-whole{
    display: inline-block;
    margin-left: 30px
  }
  .coludBuyRight-wholea{
    margin-left: 100px;
  }
  .coludBuyRight-whale{
    width: 200px;
    text-align: center
  }
  .whole-fref{
    position: absolute;
    top: 13px;
    left: -13px;
    color: #39b9ff
  }
  .whole-fred{
    position: absolute;
    top: 13px;
    left: -12px;
    color: #666666
  }
  .cJThrough{
    width:166px;
    height:54px;
    background: #fff;
    color:#333;
    text-align: center;
    line-height: 54px;
    font-size: 22px;
    border-bottom: 1px solid #f2f2f2;
  }
  .coludBuyRight-only{
    display: inline-block;
    margin-left: 30px
  }
  .coludBuyRight{
    float:left;
    margin-left: 280px;
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
  .coludBuyRight-trd{
    width: 140px;
  }
  .coludBuyRight-one{
    background: white;
    margin-top: -10px;
  }
  .coludBuyRight-list tr{
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
  .coludBuyRight-whble{
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
    margin-top: 5px;
  }
  .coludBuyRight-whele{
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
  .coludBuyRight-whvle{
    color: #8ed7ff;
    font-weight: bold
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
