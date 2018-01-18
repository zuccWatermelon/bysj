<!--天翼云购买-->
<template>
  <div class="page">
    <UserNav></UserNav>
    <div class="coludBuy">
      <ClientManagerNav></ClientManagerNav>
      <div class="coludBuyContent clearfix">
        <div class="coludBuyLeft">
          <router-link to="/cloudBuy" class="cloudBuy"><div class="tYColud">天翼云</div></router-link>
          <router-link to="/passBuy" class="passBuy"><div class="cJThrough">畅捷通</div></router-link>
        </div>
        <div class="coludBuyRight ">
          <div class="setMeal">
            <div class="setMeal1">
              <div class="setMealTitle">套餐一</div>
              <div>
                <div class="setMealImg">
                  <img src="../../src/assets/img/bg_chanpin.png"/>
                </div>
                <div class="setMealWord">
                  <p style="text-indent:16px;">弹性云主机(CT-ECS，EIASTIC Cloud Server)是一种可以随时获取、弹性可扩展的计算服务。云主机由CPU、内部、镜像、云盘
                    组成，同时结合VPC、安全组、数据多副本保存等能力，打造一个高效、可靠、安全的计算环境，确保服务持久稳定运行。</p>
                  <p>最划算、最稳定、最安全，云主机元<span>￥ 53/月</span>起</p>
                </div>
              </div>

              <router-link to="/orderForm" class="orderForm"><a class="already">立即下单</a></router-link>
            </div>
            <div class="setMeal2">
              <div class="setMealTitle">套餐二</div>
              <div>
                <div class="setMealImg">
                  <img src="../../src/assets/img/bg_chanpin.png"/>
                </div>
                <div class="setMealWord">
                  <p style="text-indent:16px;">弹性云主机(CT-ECS，EIASTIC Cloud Server)是一种可以随时获取、弹性可扩展的计算服务。云主机由CPU、内部、镜像、云盘
                    组成，同时结合VPC、安全组、数据多副本保存等能力，打造一个高效、可靠、安全的计算环境，确保服务持久稳定运行。</p>
                  <p>最划算、最稳定、最安全，云主机元<span>￥ 100/月</span>起</p>
                </div>
              </div>
              <router-link to="/orderForm" class="orderForm"><a class="already">立即下单</a></router-link>
            </div>
          </div>


          <div class="configure">
            <p class="setMealTitle">套餐一配置</p>
            <div class="setMealDetails">
              <p><span>可用分区：</span>内蒙节点</p>
              <p><span>云主机类型：</span>1核|1GB</p>
              <p><span>镜像：</span>Ubuntu 12.04 /64位</p>
              <p><span>系统盘：</span>普通IO，15GB</p>
              <p><span>数据盘：</span>普通IO，15GB</p>
              <p><span>弹性IP：</span>规格：电信线路</p>

              <p><span style="visibility:hidden">弹性IP：</span>计费模式：按宽带计费</p>
              <p><span style="visibility:hidden">弹性IP：</span>宽带：2Mbit/s</p>
              <p><span>购买时长：</span>1个月</p>
              <p><span>购买数量：</span>1台</p>
            </div>
            <div class="setMealFree">
              <div class="setMealTitle">配置费用</div>
              <P >￥ 102元</P>
            </div>

            <router-link to="/orderForm" class="orderForm"><a class="already">立即下单</a></router-link>
          </div>



        </div>
      </div>


    </div>


  </div>

</template>

<script>
  import UserNav from './common/UserHeader.vue';
  import ClientManagerNav from './common/ClientManagerNav.vue';


  export default {
    data(){
      return{
        current:"index",
      };
    },
    components: {
      UserNav,
      ClientManagerNav,

    },
    methods: {}
  }
</script>

<style>
  .coludBuy{
    width:100%;
    height:auto;
    background: #f6f6f6;
    padding-top: 46px;
    padding-bottom: 148px;
    clear: both;
    position: relative;
  }
  .coludBuyContent{
    position: relative;
    width:1200px;
    height:auto;
    margin-left: 201px;
    padding: 0 12px;
    /*margin: 0 auto;*/
    background:#f6f6f6;


  }

  .coludBuyLeft{
    position: absolute;
    width:166px;
    height:694px;
    background: #fff;
  }
  .tYColud{
    width:100%;
    height:54px;
    background: #318de7;
    color:#fff;
    font-size: 22px;
    text-align: center;
    line-height: 54px;

  }
  .cJThrough{
    width:100%;
    height:54px;
    background: #fff;
    color:#333;
    font-size: 22px;
    text-align: center;
    line-height: 54px;
    border-bottom: 1px solid #f2f2f2;
  }

  .coludBuyRight{
    float:left;
    margin-left: 202px;
    width:998px;
    height:694px;
    background: #f6f6f6;
    position: relative;
  }


  .setMeal{
    width:600px;
    height:auto;
    background: #f6f6f6;
    font-size: 14px;
    color:#bbb;
  }
  .setMeal1{
    width:100%;
    height:330px;
    background: #fff;
    padding: 26px;

  }
  .setMealTitle{
    font-size: 20px;
    color:#666;
    margin-bottom: 20px;
  }
  .setMealImg{
    float: left;
    width:150px;
  }
  .setMealImg img{

    width:100%;
  }
  .setMealWord{
    width:380px;
    float:right;
    margin-bottom: 10px;
  }

  .setMealWord span{
    color:#318de7;
    font-size: 16px;
  }
  .setMeal2{
    margin-top: 32px;
    width:100%;
    height:330px;
    background: #fff;
    padding: 26px;
  }
  .configure{
    position: absolute;
    top:0;
    right:0;
    width:342px;
    padding: 20px;
    height:100%;
    background: #fff;
  }
  .setMealDetails{
    color:#666;
  }

  .setMealDetails p span{
    color:#999;
  }
  .already{
    width:100px;
    height:36px;
    background: #2bb4ff;
    text-align: center;
    border-radius: 5px;
    line-height: 36px;
    float: right;
    color: #fff;
    font-size: 14px;
  }
  a:hover{
    color:#fff;
  }

  .setMealDetails{
    border-bottom: 1px solid #a0a0a0;
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 28px;
  }

  .setMealFree p{
    color:#318de7;
    font-size:22px ;
    margin-bottom: 52px;
  }
</style>

