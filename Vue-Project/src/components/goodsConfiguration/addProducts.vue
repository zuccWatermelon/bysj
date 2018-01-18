<!--添加产品  弹框-->
<template>
  <div class="cont">
    <div class="box">
      <p class="title">添加产品<i @click="closeFun">X</i></p>
      <div class="add-main">
        <div class="add-cont clearfix">
          <section>
            <label>产品名称：</label><input type="text" placeholder="请输入产品名称" v-model="proData.serviceName" />
          </section>
          <section>
            <label>产品编码：</label><input type="text" placeholder="请输入产品编号" v-model="proData.serviceNbr" />
          </section>
          <section>
            <label>产品价格：</label><input type="text" placeholder="请输入产品编号" v-model="proData.price" />
          </section>
          <section>
            <label>产品价格参考：</label><input type="text" placeholder="请输入产品价格参考" v-model="proData.priceRef" />
          </section>
          <section>
            <label>产品类别：</label><el-select size="small" v-model="proData.type">
            <el-option
              v-for="item in status2"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          </section>
          <section>
            <label>产品状态：</label><el-select size="small" v-model="proData.status">
            <el-option
              v-for="item in status2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </section>
          <section>
            <label>产品生效时间：</label><el-date-picker size="small" v-model="proData.effDate"
                type="date"
                placeholder="选择日期">
          </el-date-picker>
          </section>
          <section>
            <label>产品失效时间：</label><el-date-picker size="small" v-model="proData.expDate"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
          </section>
          <section>
            <label>产品优先级：</label><el-select size="small" v-model="proData.level">
            <el-option
              v-for="item in status2"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </section>
          <section>
            <label>站点价格：</label><input type="text" placeholder="请输入产品站点价格" v-model="proData.sitePrice" />
          </section>
          <section>
            <input class="remark" placeholder="请输入产品备注" v-model="proData.remark" />
          </section>
          <textarea class="desc" placeholder="请输入产品描述" v-model="proData.desc"></textarea>
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
    width: 570px;
    height: 485px;
    position: absolute;
    top: 50%;
    /*left: 57.08%;*/
    left: 50%;
    margin: -242.5px 0 0 -285px;
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
    height: 430px;
    background: #fff;
    padding: 15px 0 0 27px;
    overflow: hidden;
  }
  .add-cont{
    width: 110%;
    font-size: 14px;
    section{
      float: left;
      padding: 5px 18px 5px 0;
      input{
        width: 147px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 4px;
        border: 0 none;
        background: #e4e4e4;
      }
      .el-select{
        width: 147px;
      }
    }
    label{
      width: 100px;
      text-align: right;
      padding-right: 2px;
      color: #333;
    }
    .el-date-editor{
      width: 147px;
    }
    .remark{
      display: block;
      width: 515px;
      height: 32px;
      padding: 0 12px;
      background: #f2f2f2;
      border-radius: 5px;
      border: 0 none;
      text-align: left;
    }
    .desc{
      display: block;
      width: 515px;
      height: 113px;
      border-radius: 5px;
      background: #f2f2f2;
      line-height: 20px;
      padding: 7px 12px;
      resize: none;
      border: 0 none;
      margin-top: 5px;
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
  export default{
    props:['showBool','currentGoodID'],
    data(){
      return{
        proData:{
          createStaff:"",
          serviceName:"",
          serviceNbr:"",
          code:"",
          price:"",
          priceRef:"",
          type:"",
          status:"",
          effDate:"",
          expDate:"",
          level:"",
          sitePrice:"",
          remark:"",
          desc:""
        },
        status2:[
          {
            label:"选择1",
            value:"11"
          },
          {
            label:"选择2",
            value:"22"
          },
          {
            label:"选择3",
            value:"33"
          }
        ]
      }
    },
    methods:{
      closeFun(){
        this.$emit('update:showBool', false);
      },
      submitFun(){
        var self = this;
        if(self.proData.expDate.getTime() > self.proData.effDate.getTime()){
          self.proData.effDate=self.dateFun(self.proData.effDate);
          self.proData.expDate=self.dateFun(self.proData.expDate);
        } else {
          this.$alert('失效时间必须大于生效时间', '提示', {
            confirmButtonText: '确定'
          });
        }
//          添加成功关闭弹框
        this.$emit('update:showBool', false);

      }
    }
  }
</script>
