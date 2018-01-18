<!-- 轮播插件模板 -->
<template>
  <div id="myCarousel" class="carousel slide">
    <el-carousel trigger="click" height="340px">
      <el-carousel-item v-for="item in banner" :key="item.img">
        <img :src="item.img" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<style lang="less" scoped>
  #myCarousel{
    position: relative;
    height: 340px;
    overflow: hidden;
  }
  .el-carousel{
    img{
      position: absolute;
      top:0;
      left: 50%;
      max-width: none!important;
      height: 100%!important;
      margin-left: -720px;
    }
  }




</style>
<script>
  export default{
      data(){
          return{
              banner:[
                {
                  img:require("../../assets/img/banner1.jpg")
                },
                {
                  img:require("../../assets/img/banner2.jpg")
                }
              ]
          }
      }
  }
</script>
