<!--添加商品  弹框-->
<template>
  <div class="cont">
    <div class="box">
      <p class="title">{{title}}<i @click="closeFun">X</i></p>
      <div class="add-main">
        <div class="add-cont clearfix">
          <section>
            <label>商品名称：</label><input type="text" placeholder="请输入商品名称" v-model="goodsData.offerName" />
          </section>
          <section>
            <label>商品编码：</label><input type="text" placeholder="请输入商品编号" v-model="goodsData.offerNbr" />
          </section>
          <section>
            <label>商品所属目录：</label><el-select size="small" v-model="goodsData.catalogId">
            <el-option
              v-for="item in navList"
              :key="item.catalogId"
              :label="item.catalogName"
              :value="item.catalogId">
            </el-option>
          </el-select>
          </section>
          <section>
            <label>商品类别：</label><el-select size="small" v-model="goodsData.offerType">
            <el-option
              v-for="item in status1"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </section>
          <section>
            <label>商品生效时间：</label><el-date-picker size="small" v-model="goodsData.effDate"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
          </section>
          <section>
            <label>商品失效时间：</label><el-date-picker size="small" v-model="goodsData.expDate"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
          </section>
          <section>
            <input class="remark" placeholder="请输入商品备注" v-model="goodsData.remark" />
          </section>
          <textarea class="desc" placeholder="请输入商品描述" v-model="goodsData.offerDesc"></textarea>
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
    height: 370px;
    position: absolute;
    top: 50%;
    /*left: 57.08%;*/
    left: 50%;
    margin: -185px 0 0 -285px;
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
    height: 350px;
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
    props:['showBool','navList','currentNav','title'],
    data(){
      return{
        goodsData:{
          offerName:"",
          offerNbr:"",
          catalogId:"",
          offerType:"",
          effDate:"",
          expDate:"",
          remark:"",
          offerDesc:"",
          createStaff:""
        },
        status1:[
          {
            value:'1',
            label:'类别1'
          },
          {
            value:'2',
            label:'类别2'
          },
          {
            value:'3',
            label:'类别3'
          }
        ],
      }
    },
    created(){
      this.goodsData.catalogId = this.currentNav;
      if(window.sessionStorage.getItem('user')){
        var user = JSON.parse(window.sessionStorage.getItem('user'));
        this.goodsData.createStaff = user.staffId;
      }
    },
    methods:{
      closeFun(){
        this.$emit('update:showBool', false);
      },
      submitFun(){
        var self = this;
        if(self.goodsData.expDate.getTime() > self.goodsData.effDate.getTime()){
          self.goodsData.effDate=self.dateFun(self.goodsData.effDate);
          self.goodsData.expDate=self.dateFun(self.goodsData.expDate);
        } else {
          this.$alert('失效时间必须大于生效时间', '提示', {
            confirmButtonText: '确定'
          });
        }


//        axios({
//          method:"post",
//          url:"/netCloudOffer/offerService/addoffer",
//          data: self.goodsData
//        }).then(res=>{
//          if(res.data.code == '0' || res.data.code == 0){
//            self.$emit('update:showBool', true);
//            self.$emit('callback');
//          }
//        }).catch(error=>{
//            console.log(error)
//        })

      },
      dateFun(date){
        var str='';
        if(date != null && date != ''){
          let y = date.getFullYear();
          let m = date.getMonth() + 1;
          m = m < 10 ? ('0' + m) : m;
          let d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          let h = date.getHours();
          let minute = date.getMinutes();
          minute = minute < 10 ? ('0' + minute) : minute;
          let second = date.getSeconds();
          second = second < 10 ? ('0' + second) : second;
          str = y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        }
        return str;
      }
    }
  }
</script>
