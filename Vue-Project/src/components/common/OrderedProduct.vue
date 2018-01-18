<template>
  <div class="page">
      <MyNav></MyNav>

      <div class="orderedProduct-container">
        <div class="orderedProduct-top">
          <span class="orderedProduct-top-title">已购买产品</span>
          <a class="orderedProduct-top-back">返回</a>
        </div>

        <div class="orderedProduct-table" id="orderedProduct-table" orderedProduct="order-table">
          <table class="table">
            <thead>
            <tr>
              <td style="width:10%;">产品名称</td>
              <td style="width:10%;">数量</td>
              <td style="width:10%;">类型</td>
              <td style="width:20%;">配置</td>
              <td style="width:15%;">付款方式</td>
              <td style="width:13%;">起止时间</td>
              <td style="width:12%;">操作</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in productData" :class="{tr2:index%2==1}">
              <td style="width:10%;">{{item.productName}}</td>
              <td style="width:10%;"> {{item.number}}</td>
              <td style="width:10%;"><p style="display: inline-block;text-align: left;">{{item.type}}</p></td>
              <td style="width:20%;"><p style="display: inline-block;text-align: left;">{{item.config}}</p></td>
              <td style="width:15%;">{{item.payMethod}}</td>
              <td style="width:13%;">{{item.time}}</td>
              <td style="width:12%;">
                <div class="orderedProduct-detail"   id="orderedProduct-detail"     name="orderedProduct-detail">详情</div>
                <div class="orderedProduct-renew"    id="orderedProduct-renew"      name="orderedProduct-renew">续费</div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <MyFooter></MyFooter>
  </div>
</template>

<script>
  import MyNav from '../common/MyNav.vue';
  import MyFooter from '../common/MyFooter.vue';

  export default {
    data(){
      return{
        productData:[
          {
              "productName":'云服务器',
              "number":'1',
              "type":'云主机',
              "config":'标注型云服务器',
              "payMethod":'按年(1年)',
              "time":'2017-06-02 09:00:01 2018-06-02 09:00:01',
          },
          {
              "productName":'畅捷通',
              "number":'1',
              "type":'服务软件',
              "config":'财务系统,CRM系统',
              "payMethod":'按年(1年)',
              "time":'2017-06-02 09:00:01 2018-06-02 09:00:01',
          },
          {
              "productName":'天气查询',
              "number":'1',
              "type":'API',
              "config":'0分钟更新一次,免费版限制并发1秒1次,可根据地名,经纬度GPS和IP查询对应地区的预报。包括7日天气,预警,PM2.5空气质量指数,生活指数。4千万用户的选择,日调用量数千万次。',
              "payMethod":'按年(1年)',
              "time":'2017-06-02 09:00:01 2018-06-02 09:00:01',
          },
          {
            "productName":'畅捷通',
            "number":'1',
            "type":'服务软件',
            "config":'财务系统,CRM系统',
            "payMethod":'按年(1年)',
            "time":'2017-06-02 09:00:01 2018-06-02 09:00:01',
          }
        ]
      }
    },

    components:{
      MyNav,
      MyFooter
    }
  }
</script>

<style scoped lang="less">
  .page{
    min-width: 1312px;
    background: #f6f6f6;
    overflow: hidden;
  }

  .orderedProduct-container{
    width:1290px;
    min-height:500px;
    margin:60px auto;
    padding:0;
    border:1px solid #f2f2f2;
    background-color: #fff;

    .orderedProduct-top{
      width:100%;
      height:56px;
      border-bottom:1px solid #f2f2f2;

      .orderedProduct-top-title{
        width:212px;
        height:56px;
        border-right:1px solid #f2f2f2;
        display: block;
        float: left;
        line-height:56px;
        text-align: center;
        background-color:#318de7;
        color:#fff;
        font-size:24px;
      }

      .orderedProduct-top-back{
        width:52px;
        height:28px;
        margin:16px 40px 0 0;
        -webkit-border-radius: 5px; /* Safari 和 Chrome */
        border-radius: 5px;
        float:right;
        line-height:28px;
        text-align: center;
        background-color: #75c579;
        color:#fff;
        font-size: 14px;
      }
    }

    .orderedProduct-table{
        .table{
          width:100%;
          text-align: center;
          table-layout: fixed;
          line-height: 60px;

          thead{
            font-size: 18px;
            color: #333;
            background: #fafafa;
          }

          td{
            line-height: 30px;
            vertical-align: middle;
          }

          tr{
            line-height: 30px;
            vertical-align: middle;
          }

          .tr2{
            line-height: 30px;
            vertical-align: middle;
            background-color:#fafafa;
          }
        }
    }

    #orderedProduct-detail{
      width:50%;
      font-size: 15px;
      color:#2bb4ff;
      float:left;
    }

    #orderedProduct-renew{
      width:50%;
      font-size: 15px;
      color:#2bb4ff;
      float:left;
      cursor: pointer;
    }
  }
</style>
