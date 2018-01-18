<!--添加商品目录  弹框-->
<!--suppress JSAnnotator -->
<template>
  <div class="cont">
    <div class="box">
      <p class="title">添加商品目录<i @click="closeFun">X</i></p>
      <div class="add-main">
        <div class="add-cont clearfix">
          <section>
            <label>目录名称：</label><input type="text" v-model="navData.catalogName" />
          </section>
          <section>
            <label>目录类别：</label><el-select size="small" v-model="navData.catalogType">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          </section>
          <section>
            <label>父目录识别：</label><input type="text" v-model="navData.parent" />
          </section>
          <section>
            <label>目录状态：</label><el-select size="small" v-model="navData.statusCd">
              <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </section>
          <section>
            <input class="remark" placeholder="请输入目录备注" v-model="navData.remark" />
          </section>
          <textarea class="desc" placeholder="请输入目录描述" v-model="navData.catalogDesc"></textarea>
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
    height: 310px;
    background: #fff;
    padding: 15px 0 0 26px;
    overflow: hidden;
  }
  .add-cont{
    width: 110%;
    font-size: 14px;
    section{
      float: left;
      padding: 5px 0;
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
      width: 90px;
      text-align: right;
      padding-right: 5px;
      color: #333;
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
    props:['showBool'],
    data(){
      return{
        navData:{
          catalogName:"",
          catalogType:"",
          parent:"",
          statusCd:"00A",
          remark:"",
          catalogDesc:"",
          createStaff:""
        },
        typeList:[],
        statusList:[
          {
            value:'00A',
            label:'使用'
          },
          {
            value:'00X',
            label:'禁用'
          }
        ]
      }
    },
    created(){
        this.typeList=[
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
      ];
      this.navData.catalogType = this.typeList[0].value;
      if(window.sessionStorage.getItem('user')){
        var user = JSON.parse(window.sessionStorage.getItem('user'));
        this.navData.createStaff = user.staffId;
      }
    },
    methods:{
      closeFun(){
        this.$emit('update:showBool', false);
      },
      submitFun(){
        var self = this;
        axios({
          method:"post",
          url:"/netCloudOffer/offerCatalogService/addoffercatalog",
          data: self.navData
        }).then(res=>{
            if(res.data.code == '0' || res.data.code == 0){
              this.$emit('update:showBool', false);
              this.$emit('callback');
            }
          }
        ).catch(error=>{
            console.log(error)
        });
      }
    }
  }
</script>
