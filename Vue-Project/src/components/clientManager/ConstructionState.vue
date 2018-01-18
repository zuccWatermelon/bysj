<!-- 施工状态 -->
<template>
  <div class="login">
    <div class="login-box">
      <p class="login-title">施工状态<i @click="close"></i></p>
      <div class="order-list" >
        <table class="order-table">
          <thead>
            <tr>
              <th>专线编号</th>
              <!--<th>流水号</th>-->
              <th>工单状态</th>
              <th>施工环节</th>
              <th>接单时间</th>
              <!--<th>到单时间</th>-->
              <th>处理人</th>
              <!--<th>处理人岗位</th>-->
              <th>处理人电话</th>
            </tr>
          </thead>
          <tbody>
          <tr v-for="(item, index) in buildStatuData" :class="{tr2:index%2==1}">
            <td>{{item. MAINSN}}</td>
            <!--<td>{{item.AREFADDRID}}</td>-->
            <td>{{item.BILLSTATUS}}</td>
            <td>{{item.BILLTACHE}}</td>
            <td>{{item.ACCEPTTIME}}</td>
            <!--<td>{{item.RECEPTTIME}}</td>-->
            <td>{{item.DEALOPERNAME}}</td>
            <!--<td>{{item.DEALOPERPOS}}</td>-->
            <td>{{item.DEALOPERTEL}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    props:['buildStatuData'],
    data(){
        return {}
    }
  }
</script>
<style scoped lang="less">
  .login{
    width: 100%;
    height: 100%;
    position:fixed;
    top:0;
    left:0;
    background:rgba(0,0,0,0.41);
    z-index:999;
  }
  .login-box {
    position:absolute;
    top:50%;
    left:50%;
    width: 800px;
    /*height: 460px;*/
    background: white;
    margin:-260px 0 0 -272px;
  }
  .login-title{
    height: 61px;
    line-height: 61px;
    color: #ffe6cc;
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
  .order-list{
    background: #fff;
    position: relative;
    height:440px;
    overflow:auto;
  }
  .order-table {
    background: #fff;
    width: 100%;
    thead {
      background: #fafafa;
    }
    tr {
      height: 40px;
      line-height: 18px;
      text-align: center;
    }
    .tr2 {
      background: #fafafa;
    }
    th{
      text-align:center;
    }
    td {
      word-break: break-all;
    }
  }
</style>
<script>
  export default{
    props:[
      'buildStatus',
      'buildStatuData'
    ],
    data(){
        return {
          orderData:[ ]
        }
    },
    created(){
      var self = this;
      for(var i=0;i<10;i++){
        var newData = {};
        newData.id=i+1;
        newData.build="施工中";
        newData.client="张三";
        newData.connect="177********";
        newData.status="派单中";
        newData.time="2017-10-10";
        self.orderData.push(newData);
      }
    },
    methods:{
      close(){
        this.$emit('update:buildStatus', false);
      }
    }
  }
</script>

