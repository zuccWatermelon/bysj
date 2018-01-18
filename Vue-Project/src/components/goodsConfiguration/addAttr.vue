<!--属性配置-->
<template>
  <div class="cont">
    <div class="box">
      <p class="title">属性配置<i @click="closeFun">X</i></p>
      <p class="addBtn"><a href="javascript:void(0);" @click="addAttrFun">添加属性配置</a></p>
      <div class="attr-main">
        <!--新添-->
        <section class="item" v-for="(item,index) in newAttrList">
          <i @click="item.show=!item.show" :class="['el-icon-arrow-down',{show:item.show}]"></i>
          <div class="item-title clearfix">
            <p>属性规格标识：<input v-model="item.objAttrId" /></p>
            <p>属性默认值：<input v-model="item.defaultValue" /></p>
            <p>父级属性标识：<input v-model="item.parObjAttrId" /></p>
          </div>
          <div class="item-cont" v-if="item.show">
            <p class="attr-info">属性备注：<input v-model="item.remark" /></p>
            <p class="attr-info">属性描述：<input v-model="item.objAttrDesc" /></p>
            <table class="attr-select">
              <thead>
              <tr>
                <td style="width: 190px;border-right-color: #aaa;">属性选用值</td>
                <td >选用值备注</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(selectItem,selectIndex) in item.selectList">
                <td>{{selectItem.name}}</td>
                <td>{{selectItem.desc}}
                  <p class="item-icon">
                    <i class="el-icon-delete" @click="deleteSelectFun(index,selectIndex)"></i>
                  </p>
                </td>
              </tr>
              <tr>
                <td><input v-model="newSelectValue.name" /></td>
                <td><input v-model="newSelectValue.desc" />
                  <p class="item-icon">
                    <i class="el-icon-delete" @click="deleteSelectFun(index,item.selectList.length)"></i>
                    <i class="el-icon-circle-plus-outline" @click="addSelectFun(index)"></i>
                  </p>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <div class="btn-box">
        <button type="reset" class="rest" @click="closeFun">取消</button>
        <button type="submit" class="submit" @click="submitFun">确认</button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  *{
    margin: 0;
  }
  a:focus{
    text-decoration: none;
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
    background: #fff;
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
  .attr-main{
    width: 100%;
    height: 345px;
    overflow: auto;
  }
  .addBtn{
    width: 100%;
    padding: 0 28px;
    text-align: right;
    line-height: 46px;
    a{
      display: inline-block;
      width: 90px;
      height: 24px;
      line-height: 22px;
      border: 1px solid #d4d4d4;
      border-radius: 3px;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
  }
  .attr-main{
    padding: 0 20px;

  }
  .item{
    overflow: hidden;
    position: relative;
    border: 1px #ccc dashed;
    margin-bottom: 10px;
    .el-icon-arrow-down{
      position: absolute;
      top: 10px;
      right: 20px;
      font-size: 20px;
      cursor: pointer;
      z-index: 9;
    }
    input{
      width: 90px;
      height: 24px;
      line-height: 24px;
      background: #fff;
      border: #ccc 1px solid;
      padding-left: 5px;
      color: #333;
    }
  }
  .item-title{
    width: 110%;
    background: #f6f6f6;
    height: 39px;
    line-height: 38px;
    font-size: 14px;
    color: #666;
    padding-left: 20px;
    position: relative;
    p{
      float: left;
      padding-right: 30px;
    }
    i{
      position: absolute;
      top: 5px;
      right: 10px;
      cursor: pointer;
    }
    .show{
      transform:rotate(180deg);
      -ms-transform:rotate(180deg); 	/* IE 9 */
      -moz-transform:rotate(180deg); 	/* Firefox */
      -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
      -o-transform:rotate(180deg);
    }
  }
  .item-cont{
    padding: 10px 0;
    border-top: 1px #ccc dashed;
    overflow: hidden;
    .attr-remark,.attr-desc{
      width: 100%;
      padding-left: 10px;
      text-align: left;
    }
    input{
      width: 85%;
    }
  }
  .attr-info{
    height: 28px;
    color: #666;
    line-height: 24px;
    padding-left: 22px;
  }
  .attr-info1{
    width: 100%;
  }
  .attr-desc{
    resize: none;
    background: #e4e4e4;
    border: 0 none;
    border-radius: 4px;
    color: #999;
  }
  .attr-select{
    width: 640px;
    margin: 4px 0 0 22px;
    text-align: center;
    border-collapse: collapse;
    color: #333;
    line-height: 28px;
    thead{
      td{
        border: 1px #ccc solid;
      }
    }
    tbody{
      td{
        border: 1px #ccc solid;
        position: relative;
      }
    }
    input{
      border: 0 none;
      width: 100%;
      height: 100%;
      text-align: center;
    }
  }
  .item-icon{
    position: absolute;
    top: 0;
    right: -60px;
    width: 50px;
    font-size: 0;
    text-align: left;
    height: 28px;
    line-height: 28px;
   .el-icon-delete{
     font-size: 18px;
     margin-right: 10px;
     color: #7d7d7d;
     line-height: 28px;
     cursor: pointer;
   }
    .el-icon-circle-plus-outline{
      color: #2facee;
      font-size: 20px;
      line-height: 28px;
      cursor: pointer;
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
    props:['currentGoodID'],
    data(){
      return{
        newSelectValue:{
          name:'',
          desc:''
        },
        newAttrList:[]
      }
    },
    created(){

    },
    methods:{
      deleteSelectFun(parentIndex,index){
        console.log(this.newAttrList[parentIndex],1111);
        if( index < this.newAttrList[parentIndex].selectList.length){
          this.newAttrList[parentIndex].selectList.splice(index,1);
        } else {
          this.newSelectValue.name = '';
          this.newSelectValue.desc = '';
        }
      },
//      添加属性选用值
      addSelectFun(index){
        var self = this;
        if(this.newSelectValue.name == '' || this.newSelectValue.name == null){
          this.$alert('请输入属性选用值！', '提示', {
            confirmButtonText: '确定'
          });
        } else {
          var data={};
          data.name = self.newSelectValue.name;
          data.desc = self.newSelectValue.desc;
          this.newAttrList[index].selectList.push(data);
          self.newSelectValue.name = '';
          self.newSelectValue.desc = '';
        }
        console.log(this.newAttrList,11111);
      },
//      添加属性
      addAttrFun(){
        var newAttr = {
          objAttrId: '',
          attrId: '',
          createDate: '',
          createStaff: '',
          defaultValue: '',
          parObjAttrId: '',
          objAttrDesc: '',
          objType: '',
          objId: '',
          remark:'',
          statusCd: '',
          statusDate: '',
          updateStaff: '',
          show:false,
          selectList:[]
        };
        this.newAttrList.push(newAttr);
      },
      closeFun(){
        this.$emit('update:showBool', false);
      },
      submitFun(){

      }
    }
  }
</script>
