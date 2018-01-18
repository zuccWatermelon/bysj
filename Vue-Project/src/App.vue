<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  *{margin: 0; padding: 0;}
  body{
    font-family: "PingFang","微软雅黑";
    background: #fff;
    padding-right: 0px !important;
    overflow: inherit !important;
  }
  li{list-style: none;}
  img{vertical-align: top; border: 0 none;}
  a{color: #000; text-decoration: none;}
  a:hover{color: #000;text-decoration: none;}
  a:visited{
    color: #000;
    text-decoration: none !important;
  }
  a:focus{
    text-decoration: none !important;
    outline:none !important;
  }
  .clearfix {
    *zoom: 1;
  }
  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
    font-size: 0;
  }

</style>
