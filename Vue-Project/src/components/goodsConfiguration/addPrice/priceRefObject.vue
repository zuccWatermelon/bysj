<!--定价参考对象配置-->
<template>
  <div class="priceRef">
    <div class="add-priceRef"><a href="javascript:void(0);" @click="addFun">添加定价参考对象</a></div>
    <div class="title">
      <ul class="title-box clearfix">
        <li>参考对象名称</li>
        <li>参考对象类别</li>
        <li>参考对象序列</li>
        <li>状态</li>
      </ul>
    </div>
    <div class="priceRef-list clearfix" v-for="(item,index) in newPriceRefList">
      <i class="el-icon-delete" @click="deleteFun(index)"></i>
      <section class="info">
        <el-select size="small" v-model="item.name">
          <el-option
            v-for="item in status1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </section>
      <section class="info">
        <el-select size="small" v-model="item.type">
          <el-option
            v-for="item in status1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </section>
      <section class="info">
        <el-select size="small" v-model="item.code">
          <el-option
            v-for="item in status1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </section>
      <section class="info">
        <el-select size="small" v-model="item.status">
          <el-option
            v-for="item in status1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </section>
    </div>
    <div class="btn-box">
      <button type="reset" class="rest" @click="closeFun">取消</button>
      <button type="submit" class="submit" @click="saveFun">保存</button>
      <button type="submit" class="submit" @click="submitFun">保存并继续</button>
    </div>
  </div>
</template>
<style scoped lang="less">
  p,ul{
    margin: 0;
    padding: 0;
  }
  a:focus{
    text-decoration: none;
  }
  .priceRef{
    color: #333;
    overflow: hidden;
  }
  .add-priceRef{
    width: 100%;
    padding: 12px 0 7px 0;
    text-align: right;
    border-bottom: #bbb 1px solid;
    a{
      display: inline-block;
      width: 132px;
      height: 30px;
      line-height: 28px;
      text-align: center;
      border: #dddddd 1px solid;
      border-radius: 4px;
      font-size: 14px;
      color: #333;
    }
  }
  .title{
    width: 100%;
    overflow: hidden;
  }
  .title-box{
    width: 110%;
    li{
      float: left;
      width: 135px;
      padding: 5px 25px 0 0;
      font-size: 14px;
      height: 28px;
      line-height: 28px;
      text-align: center;
    }
  }
  .priceRef-list{
    width: 110%;
    border-bottom: #bbb 1px solid;
    position: relative;
    .el-icon-delete{
      font-size: 20px;
      position: absolute;
      top: 10px;
      left: 524px;
      color: #bbb;
      cursor: pointer;
    }
  }
  .info{
    float: left;
    width: 135px;
    height: 40px;
    padding: 5px 25px 0 0;
    font-size: 14px;
    .el-select{
      width: 100%;
    }
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
    props:['currentStep','priceRefList'],
    data(){
      return{
        newPriceRefList:[],
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
    created(){

    },
    methods:{
      addFun(){
          var data = {
            name:'',
            type:'',
            code:'',
            status:''
          };
          this.newPriceRefList.push(data);
      },
      closeFun(){

      },
      saveFun(){

      },
      submitFun(){
        var self = this;
        var next = self.currentStep + 1;
        self.$emit('update:currentStep', next);
        self.$emit('update:priceRefList', self.newPriceRefList);
      },
      deleteFun(index){
        this.newPriceRefList.splice(index,1);
      }
    }
  }
</script>
