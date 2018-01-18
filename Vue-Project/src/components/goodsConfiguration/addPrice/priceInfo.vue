<!--定价信息配置-->
<template>
  <div class="priceInfo">
    <div class="priceInfo-list clearfix">
      <section class="info"><label>定价名称：</label><input v-model="priceInfo.name" placeholder="请输入定价名称" /></section>
      <section class="info"><label>定价方式：</label><input v-model="priceInfo.mode" placeholder="请输入定价方式" /></section>
      <section class="info"><label>定价生效时间：</label><el-date-picker size="small" v-model="priceInfo.effDate"
                                                                  type="datetime"
                                                                  placeholder="选择日期时间">
      </el-date-picker></section>
      <section class="info"><label>定价失效时间：</label><el-date-picker size="small" v-model="priceInfo.effDate"
                                                                  type="datetime"
                                                                  placeholder="选择日期时间">
      </el-date-picker></section>
      <section class="info"><label>状态：</label><el-select size="small" v-model="priceInfo.status">
        <el-option
          v-for="item in status1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select></section>
      <section class="info"><label>定价类别：</label><el-select size="small" v-model="priceInfo.type">
        <el-option
          v-for="item in status1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select></section>
      <section class="info"><label>定价对象名称：</label><input v-model="priceInfo.objectName" placeholder="请输入定价对象名称" /></section>
    </div>
    <section class="info info-remark"><input v-model="priceInfo.remark" placeholder="请输入定价备注" /></section>
    <section class="info info-desc"><textarea v-model="priceInfo.desc" placeholder="请输入定价描述"></textarea></section>
    <div class="btn-box">
      <button type="reset" class="rest" @click="closeFun">取消</button>
      <button type="submit" class="submit" @click="saveFun">保存</button>
      <button type="submit" class="submit" @click="submitFun">保存并继续</button>
    </div>
  </div>
</template>
<style scoped lang="less">
  .priceInfo{
    padding-top: 9px;
    color: #333;
    overflow: hidden;
  }
  .priceInfo-list{
    width: 110%;
  }
  .info{
    float: left;
    width: 265px;
    height: 40px;
    line-height: 30px;
    padding: 5px 0;
    font-size: 14px;
    label{
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: right;
    }
    input{
      width: 146px;
      height: 30px;
      line-height: 30px;
      border: 0 none;
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      background: #e4e4e4;
      text-align: center;
    }
    .el-input,.el-select{
      width: 146px;
    }
  }
  .info-remark,.info-desc{
    float: none;
    width: 100%;
    height: auto;
    input,textarea{
      width: 100%;
      background: #f2f2f2;
      text-align: left;
      padding-left: 12px;
      border-radius: 4px;
      border: 0 none;
    }
    textarea{
      resize: none;
      line-height: 20px;
      height: 94px;
      padding: 7px 12px;
      border: 0 none;
    }
  }
  .info-desc{
    height: 104px;
  }
  .btn-box{
    padding-top: 12px;
    /*padding-right: 30px;*/
    text-align: right;
    font-size: 0;
    button{
      width: 100px;
      height: 36px;
      line-height: 36px;
      font-size: 14px;
      margin-left: 12px;
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
  export default{
      props:['currentStep'],
    data(){
      return{
        priceInfo:{
          name:'',
          mode:'',
          effDate:'',
          expDate:'',
          status:'',
          type:'',
          objectName:'',
          remark:'',
          desc:''
        },
        status1:[
          {
            value:1,
            label:'11111'
          },
          {
            value:2,
            label:'2222'
          }
        ]
      }
    },
    methods:{
      closeFun(){

      },
      saveFun(){

      },
      submitFun(){
          var self = this;
          var next = parseInt(self.currentStep) + 1;
        self.$emit('update:currentStep', next);
      }
    }
  }
</script>
