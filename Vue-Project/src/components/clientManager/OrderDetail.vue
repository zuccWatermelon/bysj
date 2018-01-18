<!-- 订单详情 -->
<template>
  <div class="bomb">
    <div class="bomb-box">
      <p class="bomb-title">订单详情<i @click="close"></i></p>
      <div class="bomb_con">
        <div class="order_info">
          <div class="title">订单信息</div>
          <div class="pL10">
            <table>
            <tr>
              <td><span class="td_attr">订单编号：</span>172828929292920</td>
              <td><span class="td_attr">商品名称：</span>云专线</td>
              <td><span class="td_attr">客户名称：</span>浙江图灵软件</td>
              <td><span class="td_attr">创建时间：</span>2017-10-30</td>
            </tr>
            <tr>
              <td><span class="td_attr">金额：</span>12000元</td>
              <td><span class="td_attr">订单状态：</span>施工中</td>
              <td colspan="2"></td>
            </tr>
          </table>
          </div>
        </div>
        <div class="arrow_wrap">
          <p class="arrow_title" @click="pannelData1.isShow=!pannelData1.isShow">IPRAN线路<span :class="{red:pannelData1.status=='施工中'}">（{{pannelData1.status}}）</span><img :class="{up:pannelData1.isShow}" src="../../assets/img/arrow.png"></p>
          <div class="arrow_main" v-show="pannelData1.isShow">
            <!--大概信息-->
            <div class="attr_about">
              <table class="table">
                <tr>
                  <td><span>配置费用：</span>{{pannelData1.content.attrAbout.pzfy}}元</td>
                  <td><span>数量：</span>{{pannelData1.content.attrAbout.num}}</td>
                  <td><span>一次性费用(初装费)：</span>{{pannelData1.content.attrAbout.oncePrice}}元</td>
                </tr>
              </table>
            </div>
            <!--基本信息-->
            <div class="arrow_part">
              <p class="title">1.基本信息</p>
              <div class="pL10">
                <table class="table val_table">
                  <tr><td><span class="td_attr">选择所属域：</span>{{pannelData1.content.baseInfo.area}}</td></tr>
                </table>
              </div>
            </div>
            <!--配置-->
            <div class="arrow_part">
              <p class="title">2.配置</p>
              <div class="pL10">
                <table class="table val_table">
                  <tr>
                    <td><span class="td_attr">CE接入速率：</span>{{pannelData1.content.setData.CESpeed}}</td>
                    <td><span class="td_attr">电路维护等级：</span>{{pannelData1.content.setData.level}}</td>
                    <td><span class="td_attr">速率类型：</span>{{pannelData1.content.setData.speedStyle}}</td>
                    <td><span class="td_attr">Qos等级模式：</span>{{pannelData1.content.setData.QosLevel}}</td>
                  </tr>
                  <tr>
                    <td><span class="td_attr">付费方式：</span>{{pannelData1.content.setData.payStyle}}</td>
                    <td><span class="td_attr">电路类型：</span>{{pannelData1.content.setData.style}}</td>
                    <td><span class="td_attr">CE端提供方：</span>{{pannelData1.content.setData.CEOffers}}</td>
                    <td><span class="td_attr">起租/退租系数：</span>{{pannelData1.content.setData.quotiety}}</td>
                  </tr>
                </table>
              </div>
            </div>
            <!--装机相关信息-->
            <div class="arrow_part">
              <p class="title">3.装机相关信息</p>
              <div class="pL10">
                <table class="table val_center_table">
                  <tr>
                    <td><span class="td_attr">客户联系人：</span>{{pannelData1.content.zjData.client}}</td>
                    <td><span class="td_attr">客户人电话：</span>{{pannelData1.content.zjData.tel}}</td>
                    <td><span class="td_attr">预约起租时间：</span>{{pannelData1.content.zjData.time}}</td>
                  </tr>
                  <tr>
                    <td colspan="3"><span class="td_attr">装机地址：</span>{{pannelData1.content.zjData.address}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="arrow_wrap">
          <p class="arrow_title" @click="pannelData2.isShow=!pannelData2.isShow">CN2线路<span :class="{red:pannelData2.status=='施工中'}">（{{pannelData2.status}}）</span><img :class="{up:pannelData2.isShow}" src="../../assets/img/arrow.png"></p>
          <div class="arrow_main" v-show="pannelData2.isShow">
            <!--大概信息-->
            <div class="attr_about">
              <table class="table">
                <tr>
                  <td><span>配置费用：</span>{{pannelData2.content.attrAbout.pzfy}}元</td>
                  <td><span>数量：</span>{{pannelData2.content.attrAbout.num}}</td>
                  <td><span>一次性费用(初装费)：</span>{{pannelData2.content.attrAbout.oncePrice}}元</td>
                </tr>
              </table>
            </div>
            <!--基本信息-->
            <div class="arrow_part">
              <p class="title">1.基本信息</p>
              <div class="pL10">
                <table class="table val_table">
                  <tr><td><span class="td_attr">选择所属域：</span>{{pannelData2.content.baseInfo.area}}</td></tr>
                </table>
              </div>
            </div>
            <!--配置-->
            <div class="arrow_part">
              <p class="title">2.配置</p>
              <div class="pL10">
                <table class="table val_table">
                  <tr>
                    <td><span class="td_attr">CE接入速率：</span>{{pannelData2.content.setData.CESpeed}}</td>
                    <td><span class="td_attr">电路维护等级：</span>{{pannelData2.content.setData.level}}</td>
                    <td><span class="td_attr">速率类型：</span>{{pannelData2.content.setData.speedStyle}}</td>
                    <td><span class="td_attr">Qos等级模式：</span>{{pannelData2.content.setData.QosLevel}}</td>
                  </tr>
                  <tr>
                    <td><span class="td_attr">付费方式：</span>{{pannelData2.content.setData.payStyle}}</td>
                    <td><span class="td_attr">电路类型：</span>{{pannelData2.content.setData.style}}</td>
                    <td><span class="td_attr">CE端提供方：</span>{{pannelData2.content.setData.CEOffers}}</td>
                    <td><span class="td_attr">起租/退租系数：</span>{{pannelData2.content.setData.quotiety}}</td>
                  </tr>
                </table>
              </div>
            </div>
            <!--装机相关信息-->
            <div class="arrow_part">
              <p class="title">3.装机相关信息</p>
              <div class="pL10">
                <table class="table val_center_table">
                  <tr>
                    <td><span class="td_attr">客户联系人：</span>{{pannelData2.content.zjData.client}}</td>
                    <td><span class="td_attr">客户人电话：</span>{{pannelData2.content.zjData.tel}}</td>
                    <td><span class="td_attr">预约起租时间：</span>{{pannelData2.content.zjData.time}}</td>
                  </tr>
                  <tr>
                    <td colspan="3"><span class="td_attr">装机地址：</span>{{pannelData2.content.zjData.address}}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  p{margin:0;}
  .bomb{
    width: 100%;
    height: 100%;
    position:fixed;
    top:0;
    left:0;
    background:rgba(0,0,0,0.41);
    z-index:999;
  }
  .bomb-box {
    position:absolute;
    top:50%;
    left:50%;
    width: 900px;
    height: 600px;
    background: white;
    margin:-300px 0 0 -450px;
  }
  .bomb-title{
    height: 60px;
    line-height: 60px;
    color: white;
    background: #2facee;
    font-size: 20px;
    text-align: center;
    position:relative;
    margin: 0;
    i{
      font-style: normal;
      position: absolute;
      top:19px;
      right:22px;
      height:20px;
      width:20px;
      background: url("../../assets/img/cha.png") center no-repeat;
      cursor:pointer;
    }
  }
  .bomb_con{padding:10px 20px;height:540px;overflow:auto;}
  .pL10{padding-left:15px;}
  .order_info{
    .title{
      color:#333;
      font-size:15px;
      font-weight:bold;
      padding:10px 0;
    }
    table{
      width:100%;
      padding-left:10px;
      td {
        width: 25%;
        color: #000;
        line-height:30px;
        .td_attr {
          display:inline-block;
          width:70px;
          color: #666;
        }
      }
    }
  }
  .val_table{
    tr td{
      color:#000;
      .td_attr{
        color:#666;
      }
    }
  }
  .val_center_table{
    tr td{
      color:#333;
      .td_attr{
        color:#666;
      }
    }
  }
  .arrow_wrap{margin-top:10px;}
  .arrow_title{
    background:#ebecec;
    font-size:16px;
    font-weight:bold;
    padding:10px;
    span{
      font-size:14px;
      color:#666;
      font-weight:normal;
    }
    span.red{
      color:red;
    }
    img{
      float:right;
      height:25px;
      margin-top:-2px;
    }
    img.up{
      transform:rotate(180deg);
      -webkit-transform:rotate(180deg);
      -moz-transform:rotate(180deg);
      -ms-transform:rotate(180deg);
      -o-transform:rotate(180deg);
    }
  }
  .table{
    width:100%;
    margin:0;
    td{
      line-height:30px;
    }
  }
  .attr_about{
    padding:10px 0;
    table td{
      color:#333;
      span {
        color: #333;
        font-weight: bold;
      }
    }
  }
  .arrow_part{
    border-top:1px dashed #ddd;
    padding:15px 0 10px;
    .title{
      font-weight:bold;
      margin-bottom:5px;
    }
  }
</style>
<script>
  export default{
    props:[
        'showBool'
    ],
    data(){
        return {
            pannelData1:{
              isShow:true,
              status:'施工中',
              content:{
                attrAbout:{
                  pzfy:'8000',
                  num:'2',
                  oncePrice:'4000'
                },
                baseInfo:{
                  area:'绍兴天翼云资源池'
                },
                setData:{
                  CESpeed:'2Mbps',
                  level:'普通',
                  speedStyle:'包月',
                  QosLevel:'钻',
                  payStyle:'最终客户付费',
                  style:'本地电路',
                  CEOffers:'客户自备',
                  quotiety:'按天计费'
                },
                zjData:{
                  client:'王晓阳',
                  tel:'15986638976',
                  time:'2017年10月30日',
                  address:'杭州市滨江区江南打动1088号'
                }
              }
            },
            pannelData2:{
              isShow:false,
              status:'已完成',
              content:{
                attrAbout:{
                  pzfy:'7000',
                  num:'5',
                  oncePrice:'40000'
                },
                baseInfo:{
                  area:'绍兴天翼云资源池'
                },
                setData:{
                  CESpeed:'2Mbps',
                  level:'普通',
                  speedStyle:'包月',
                  QosLevel:'钻',
                  payStyle:'最终客户付费',
                  style:'本地电路',
                  CEOffers:'客户自备',
                  quotiety:'按天计费'
                },
                zjData:{
                  client:'王晓阳',
                  tel:'15986638976',
                  time:'2017年10月30日',
                  address:'杭州市滨江区江南打动1088号'
                }
              }
            }
        }
    },
    created(){
    },
    methods:{
      close(){
        this.$emit('update:showBool',false);
      }
    }
  }
</script>

