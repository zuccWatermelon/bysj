<!--定价参考对象配置-->
<template>
  <div class="priceRef">
    <div class="add-priceRef"><a href="javascript:void(0);" @click="addFun">添加价目</a></div>
    <table>
      <thead class="title">
      <tr>
        <td v-for="item in priceRefList">{{item.name}}</td>
        <td>价格</td>
        <td>价格单位</td>
      </tr>
      </thead>
      <tbody class="cont">
      <tr v-for="(item,index) in priceList">
        <td v-for="priceRefitem in priceRefList">
          <el-select size="small" v-model="item[priceRefitem.name]">
            <el-option
              v-for="item in status1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
        <td>
          <el-select size="small" v-model="item.priceValue">
            <el-option
              v-for="item in status1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
        <td>
          <el-select size="small" v-model="item.priceUnit">
            <el-option
              v-for="item in status1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </td>
        <td>
          <i class="el-icon-delete" @click="deleteFun(index)"></i>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="btn-box">
      <button type="reset" class="rest" @click="closeFun">取消</button>
      <button type="submit" class="submit" @click="saveFun">保存</button>
      <button type="submit" class="submit" @click="submitFun">确定</button>
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
  table{
    width: 100%;
    text-align: center;
  }
  .title{
    color: #333;
    td{
      padding: 5px 2px 0 2px;
      line-height: 24px;
      font-size: 14px;
    }
  }
  tbody{
    tr{
      border-bottom: 1px solid #bbb;
    }
    td{
      padding: 5px 2px;
    }
  }
  .el-icon-delete{
    font-size: 20px;
    color: #bbb;
    cursor: pointer;
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
        priceList:[],
        newPrice:{
          priceValue: '',
          priceUnit:''
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
    created(){
      this.newPriceInit();
    },
    methods:{
      newPriceInit(){
        var self = this;
        self.priceRefList.forEach((v,i)=>{
          self.newPrice[v.name] = '';
        });
        self.newPrice.priceValue = '';
        self.newPrice.priceUnit = '';
        self.addFun();
      },
      addFun(){
          var self = this;
          var data = JSON.parse(JSON.stringify(self.newPrice));
          this.priceList.push(data);
      },
      closeFun(){
        this.$emit('update:showBool', false);
      },
      saveFun(){

      },
      submitFun(){
        var self = this;
        console.log(self.priceList,self.priceRefList,11111)
      },
      deleteFun(index){
        var self = this;
        if(index >= (self.priceList.length-1)){
          for (var key in self.priceList){
            self.priceList[key] = '';
          }
        }else{
          this.priceList.splice(index,1);
        }
      }
    }
  }
</script>
