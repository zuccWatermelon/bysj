<template>
  <div class="box">
    <p class="box-header">{{banner.catalogName}}</p>
    <p class="box-nav">{{banner.catalogDesc}}</p>
    <!--<span class="detail-button">查看详情</span>-->
  </div>
</template>
<style scoped>
  .box{
    width: 1200px;
    height: 280px;
    margin: 0 auto;
  }
  .box-header{
    font-size: 30px;
    color: white;
    margin-top: 45px;
  }
  .box-nav{
    width: 800px;
    margin-top: 16px;
    font-size: 14px;
    color: white;
  }
  .detail-button{
    display: block;
    width:140px;
    height:36px;
    margin-top: 16px;
    border:1px solid #fff;
    line-height: 36px;
    text-align: center;
    color:#fff;
  }
</style>
<script>
  export default{
      props:['banner']
  }
</script>
