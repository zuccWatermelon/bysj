<!--IPRAN线路详情-->
<template>
  <div class="index">
    <div class="top">
      <MyNav2 :current="current"
             :loginClick.sync="loginClick"
             :client="custData"
      ></MyNav2>
      <IPRANIntro></IPRANIntro>
    </div>
    <div class="main">
      <div class="main-one">
        <span class="title-w1200">IPRAN线路配置信息</span>
        <div class="IPRAN-conf">
          <div class="conf-l">
            <div class="conf-l-t l-t-first">1. 云专线 基本信息</div>
            <div class="conf-l-m conf-l-netCloudBasicInfo">
              <div class="conf-l-item">
                <span class="item-label">选择所属域：</span>
                <select class="item-in">
                  <option value="0">绍兴天翼云资源地</option>
                </select>
              </div>
            </div>
            <div class="conf-l-t">2. IPRAN线路设置</div>
            <div class="conf-l-m conf-l-IPRANSet">
              <div class="conf-l-item">
                <span class="item-label">Qos等级模式：</span>
                <select class="item-in">
                  <option value="0">砖</option>
                </select>
              </div>
              <div class="conf-l-item">
                <span class="item-label"><img src="../../../assets/img/icon_sulv.png"/>CE接入速率：</span>
                <select class="item-in">
                  <option value="0">2Mbps</option>
                </select>
              </div>
              <div class="conf-l-item">
                <span class="item-label"><img src="../../../assets/img/icon_sulv.png"/>速率类型：</span>
                <select class="item-in">
                  <option value="0">包月</option>
                </select>
              </div>
              <div class="IPRANSet-default">
                <span class="button-collapse" data-collapse="default" @click="clickCollapse($event)">默认属性 ▽</span>
                <div class="div-collapse" id="default">
                  <div class="conf-l-item">
                    <span class="item-label">付费方式：</span>
                    <select class="item-in">
                      <option value="0">最终客户付费</option>
                    </select>
                  </div>
                  <div class="conf-l-item">
                    <span class="item-label"><img src="../../../assets/img/icon_sulv.png"/>电路维护等级：</span>
                    <select class="item-in">
                      <option value="0">普通</option>
                    </select>
                  </div>
                  <div class="conf-l-item">
                    <span class="item-label">电路类型：</span>
                    <select class="item-in">
                      <option value="0">本地电路</option>
                    </select>
                  </div>
                  <div class="conf-l-item">
                    <span class="item-label">CE端提供方：</span>
                    <select class="item-in">
                      <option value="0">中国电信</option>
                    </select>
                  </div>
                  <div class="conf-l-item">
                    <span class="item-label">起租/退租系数：</span>
                    <select class="item-in">
                      <option value="0">收半月</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="conf-l-t">3. 装机相关信息</div>
            <div class="conf-l-m conf-l-setupInfo">
              <div class="conf-l-item">
                <span class="item-label">客户联系人：</span>
                <input class="item-in" type="text"/>
              </div>
              <div class="conf-l-item item-margin-right">
                <span class="item-label">联系电话：</span>
                <input class="item-in" type="text"/>
              </div>
              <div class="conf-l-item setup-address">
                <span class="item-label">装机地址：</span>
                <select class="item-in">
                  <option value="0">杭州市</option>
                </select>
                <select class="item-in">
                  <option value="0">江干区</option>
                </select>
                <input class="item-in" type="text"/>
              </div>
            </div>
          </div>
          <div class="conf-r">
            <span class="conf-box-t">配置详情</span>
            <div class="conf-box-cont">
              <div class="conf-box-cont-a">
                <div class="conf-box-t2">CE接入速率：</div>
                <div class="a-list">
                  <span>2Mbps</span><span>包月</span><span>AA</span><span class="a-list-price">￥1000.00</span>
                </div>
              </div>
              <div class="conf-box-cont-b">
                <dl>
                  <dt>Qos等级模式：</dt>
                  <dd>钻</dd>
                </dl>
                <dl>
                  <dt>付费方式：</dt>
                  <dd>最终客户付费</dd>
                </dl>
              </div>
            </div>
            <div class="conf-box-price">
              <div class="conf-box-t2">配置费用：</div>
              <span><small>￥</small>2000.00</span>
            </div>
            <div class="conf-box-ps">
              <a>IPRAN线路配置价格说明 >> </a>
            </div>
          </div>
        </div>
        <span class="title-w1200">一次性费用（初装费）</span>
        <div class="IPRAN-price-one">
          <span class="price-one-l"><img src="../../../assets/img/step.png"/> 一次性费用（初装费）：</span>
          <input class="price-one-r" type="text" placeholder="1000" value="1000"/>
        </div>
      </div>
      <div class="main-two">
        <div class="main-two-center">
          <div class="add-to-cart"><span>加入购物车</span></div>
          <div class="final-price">
            <p>总价：<span class="orange"><small>￥</small>2000.00</span></p>
            <p class="light-word"><span>1000</span>（配置费用）+ <span>1000</span>（一次性费用）</p>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<style scoped lang="less">
  .clear{
    clear:both;
  }
  .hidden{
    display: none;
  }
  .top{
    height:340px;
    width:100%;
    background-color: #0182de;
    background-image: url("../../../assets/img/pic_2.png");
    background-repeat: no-repeat;
    background-position:center;
  }
  .main{
    width:100%;
  }
  .main-one{
    width:1200px;
    margin:0 auto;
  }
  .title-w1200{
    width:1200px;
    height:50px;
    padding-left:15px;
    margin-top: 20px;
    display: block;
    background-color: #5c6f8a;
    line-height: 50px;
    font-size: 18px;
    color:#fff;
  }
  .IPRAN-conf{
    width:1200px;
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
      width:918px;
      padding-right:20px;
      float:left;
      .conf-l-t{
        width:100%;
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
          width:49%;
        }
      }
      .IPRANSet-default{
        width:100%;
        min-height:45px;
        margin-bottom: 10px;
        float: left;
        .button-collapse{
          display: block;
          width:100%;
          height:40px;
          border:1px solid #d5d5d5;
          cursor: pointer;
          line-height: 40px;
          text-align: center;
          background-color: #ededed;
          color:#666;
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
</style>
<script>
  import MyNav2 from '../../common/MyNav2.vue';
  import IPRANIntro from '../../common/IPRANIntro.vue';

  export default {
    data(){
      return{
        loginClick:false,
        current:"index",
        customer_search:"0",
        custData:{},
        custDataList:[],
        customerSelectBox:false,
        custChange:false,
        client:""
      };
    },
    components:{
      MyNav2,
      IPRANIntro,
    },
    created(){
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
      },
    }
  }
</script>
