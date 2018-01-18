<!--添加商品  弹框-->
<template>
  <div class="cont">
    <div class="box">
      <p class="title">配置详情<i @click="closeFun">X</i></p>
      <div class="add-main">
        <div class="add-cont clearfix">
          <!--属性配置-->
          <attributes></attributes>
          <!--定价配置-->
          <price></price>
          <!--优惠配置-->
          <discount></discount>
        </div>
        <div class="btn-box">
          <button type="reset" class="rest" @click="closeFun">取消</button>
          <button type="submit" class="submit" @click="submitFun">确认</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  *{
    margin: 0;
  }
  .cont{
    position: fixed;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.2);
    padding-left: 14.16%;
  }
  .box{
    width: 800px;
    height: 500px;
    position: absolute;
    top: 50%;
    /*left: 57.08%;*/
    left: 50%;
    margin: -250px 0 0 -400px;
    .title{
      width: 100%;
      height: 55px;
      line-height: 55px;
      background: #2facee;
      text-align: center;
      font-size: 18px;
      color: #fff;
      position: relative;
      i{
        position: absolute;
        top: 10px;
        right: 20px;
        width: 30px;
        height: 30px;
        font-style: normal;
        font-size: 17px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
      }
    }
  }
  .add-main{
    width: 100%;
    background: #fff;
    padding: 20px;
    overflow: hidden;
  }
  .add-cont{
    height: 397px;
    overflow: auto;
  }
  .attributes-title{
    width: 100%;
    background: #5c6f8a;
    color: #fff;
    font-size: 16px;
    line-height: 40px;
    padding-left: 14px;
    margin-bottom: 20px;
    position: relative;
    i{
      position: absolute;
      top: 0;
      right: 10px;
      width: 40px;
      height: 40px;
      background: url("../../assets/img/select.png") no-repeat;
      cursor: pointer;
    }
  }
  .attributes-item{
    height: auto;
    border: 1px #ccc dashed;
    margin-bottom: 20px;
    overflow: hidden;
    position: relative;
    .item-title{
      width: 110%;
      background: #f6f6f6;
      height: 39px;
      border-bottom: 1px #ccc dashed;
      line-height: 38px;
      font-size: 14px;
      color: #666;
      padding-left: 20px;
      position: relative;
      p{
        float: left;
        padding-right: 30px;
      }
    }
    span{
      position: absolute;
      top: 0;
      right: 70px;
      line-height: 38px;
      color: #30acee;
      cursor: pointer;
      z-index: 9;
    }
    i{
      font-style: normal;
      position: absolute;
      top: 0;
      right: 10px;
      width: 38px;
      height: 38px;
      background: url("../../assets/img/alloction.png") center no-repeat;
      background-size: 25px 20px;
      z-index: 9;
      cursor: pointer;
    }
    input{
      width: 90px;
      height: 24px;
      line-height: 24px;
      background: none;
      border: 0 none;
      padding-left: 5px;
      color: #666;
    }
    textarea{
      resize:none
    }
    .active{
      background: #fff;
      border: #ccc 1px solid;
    }
  }
  .item-cont{
    padding-top: 4px;
    padding-bottom: 11px;
    p{
      height: 28px;
      color: #333;
      line-height: 24px;
      padding-left: 22px;
    }
    table{
      width: 720px;
      margin: 5px auto 0 auto;
      border-collapse: collapse;
      text-align: center;
      .active{
        border: 0 none;
      }
      input,textarea{
        text-align: center;
        width: 100%;
      }
    }
    td{
      border: 1px solid #ccc;
      word-break:break-all;
    }
  }

  .btn-box{
    padding-top: 12px;
    padding-right: 30px;
    text-align: right;
    font-size: 0;
    button{
      width: 100px;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      margin-left: 50px;
      border-radius: 5px;
      border: 0 none;
      outline: none;
    }
    .rest{
      background: #e4e4e4;
      color: #999;
    }
    .submit{
      background: #2facee;
      color: #fff;
    }
  }
</style>
<script>
  import attributes from './configuration/attributes.vue';
  import price from './configuration/price.vue';
  import discount from './configuration/discount.vue';
  export default{
    props:['addBool','currentGoodID'],
    components:{
      attributes,
      price,
      discount
    },
    data(){
      return{

      }
    },
    methods:{
      closeFun(){
          this.$emit('update:showBool',false);
      },
      submitFun(){

      }
    }
  }
</script>
