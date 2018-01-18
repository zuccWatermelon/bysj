<template>
  <div class="box">
    <p class="box-header">{{prodData.offerInfo.offerName}}</p>
    <p class="box-nav">{{prodData.offerInfo.offerDesc}}</p>
    <!--<span class="detail-button">查看详情</span>-->
  </div>
</template>
<script>
  export default{
    props:['offerId'],
    data(){
      return{
          prodData:{
            offerInfo:{}
          }
      }
    },
    methods:{
      getProd(){
        var self = this;
        axios({
          method:'post',
          url:'/netCloudOffer/offerService/offerinfo',
          data:{
            id:self.offerId
          }
        }).then(res=>{
          self.prodData = res.data.data;
        }).catch(err=>{})
      }
    },
    watch:{
      'offerId':'getProd'
    }
  }
</script>
<style>
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

