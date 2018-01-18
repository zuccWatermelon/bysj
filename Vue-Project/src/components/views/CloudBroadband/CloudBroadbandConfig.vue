<template>
  <div class="out-of-product-part-r configure_detail">
    <p class="title">云主机配置</p>
    <div class="content">
      <div class="content_bar"><span class="attr">开通平台：</span><span class="val">{{mainData_host.config_data[0].value}}</span></div>
      <div class="content_bar"><span class="attr">规格：</span><span class="val">{{mainData_host.config_data[1].value}}</span></div>
      <div class="content_bar"><span class="attr">镜像：</span><span class="val">{{mainData_host.config_data[2].value}}</span></div>
      <div class="content_bar"><span class="attr">磁盘：</span><span class="val">{{mainData_host.config_data[3].value}}</span></div>
      <div class="content_bar"><span class="attr">带宽：</span><span class="val">{{mainData_host.config_data[4].value}}</span></div>
    </div>
    <p class="title">商务专线配置</p>
    <div class="content">
      <div class="content_bar"><span class="attr">下载速度：</span><span class="val">{{mainData_line.config_data[0].value}}</span></div>
      <div class="content_bar"><span class="attr">上传速度：</span><span class="val">{{mainData_line.config_data[1].value}}</span></div>
      <div class="content_bar"><span class="attr">线路类型：</span><span class="val">{{mainData_line.config_data[2].value}}</span></div>
      <div class="content_bar"><span class="attr">接入线类型：</span><span class="val">{{mainData_line.config_data[3].value}}</span></div>
    </div>

    <div v-if="chanel=='shoppingCart'" class="content">
      <el-button style="margin-left:50px;" type="warning" plain  @click="saveConfig()">订单校验</el-button>
    </div>
  </div>
</template>
<style scoped lang="less">
  .configure_detail{
    position:absolute;
    right:50%;
    top:300px;
    z-index: 1000;
    margin-right:-580px;
    background:#efefef;
    .title{
      border-top:1px solid #ddd;
      height:40px;
      line-height:40px;
      color:#333;
      padding:0 15px;
      font-size:16px;
      margin-bottom:0;
    }
    .title:nth-of-type(1){
      border-top:none;
    }
    .content{
      padding:0 15px 10px;
      .content_bar{
        line-height:25px;
        .attr{
          display:inline-block;
          width:105px;
          color:#999;
          float:left;
        }
        .val{
          display:inline-block;
          width:147px;
          word-break:break-all;
        }
      }
    }
    .conf-save{
      width:100%;
      height:60px;
      padding:8px 0;
      border-top: 1px solid #e5e5e5;
      line-height: 40px;
      text-align: center;
    }
  }
</style>
<script>
  import userMap from '../../../assets/js/userMap.js';

  export default{
    props:[
      'mainData_host','mainData_line','prodList','chanel'
    ],
    data(){
      return {
      }
    },
    watch:{

    },
    mounted(){
      let _this = this;
    },
    methods:{
      /**订单校验(保存配置)**/
      saveConfig:function () {
        this.$emit('updateConf', this.prodList.offerId,'','1');
      }
    }
  }
</script>
