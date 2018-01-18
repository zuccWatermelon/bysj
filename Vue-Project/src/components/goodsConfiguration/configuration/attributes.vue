<template>
  <section class="attributes">
    <p class="attributes-title">属性配置<i @click="attributes.show=!attributes.show" :class="{show:attributes.show}"></i></p>
    <div v-if="attributes.show">
      <div class="attributes-item" v-for="(item,index) in attributes.list">
        <span @click="editFun(item,index)">{{attributesEdit[index].bool?'确定':'修改'}}</span>
        <i :class="['el-icon-arrow-down',{show:attributesShow[index].bool}]" @click="attributesShow[index].bool=!attributesShow[index].bool"></i>
        <div class="item-title clearfix">
          <p>属性规格标识：<input :class="{active:attributesEdit[index].bool}" :disabled="!attributesEdit[index].bool" v-model="item.parObjAttrId" /></p>
          <p>属性默认值：<input :class="{active:attributesEdit[index].bool}" :disabled="!attributesEdit[index].bool" v-model="item.parObjAttrId" /></p>
          <p>父级属性标识：<input :class="{active:attributesEdit[index].bool}" :disabled="!attributesEdit[index].bool" v-model="item.parObjAttrId" /></p>
        </div>
        <div class="item-cont" v-if="attributesShow[index].bool">
          <p>属性备注：<input :class="{active:attributesEdit[index].bool}" :disabled="!attributesEdit[index].bool" v-model="item.remark" /></p>
          <p>属性描述：<input :class="{active:attributesEdit[index].bool}" :disabled="!attributesEdit[index].bool" v-model="item.objAttrDesc" /></p>
          <table>
            <!--原有-->
            <tr>
              <td style="width: 163px">属性选用值</td>
              <td>选用值备注</td>
            </tr>
            <tr v-for="(selectItem,selectIndex) in item.selectList">
              <td><input :class="{active:attributesEdit[index].bool}" :disabled="!attributesEdit[index].bool" v-model="selectItem.name" /></td>
              <td><input :class="{active:attributesEdit[index].bool}" :disabled="!attributesEdit[index].bool" v-model="selectItem.desc" />
                <p class="item-icon" v-if="attributesEdit[index].bool">
                  <i class="el-icon-delete" @click="deleteSelectFun(index,selectIndex)"></i>
                </p>
              </td>
            </tr>
            <!--添加-->
            <tr v-if="attributesEdit[index].bool">
              <td><input v-model="newSelectValue.name" /></td>
              <td><input v-model="newSelectValue.desc" />
                <p class="item-icon">
                  <i class="el-icon-delete" @click="deleteSelectFun(index,item.selectList.length)"></i>
                  <i class="el-icon-circle-plus-outline" @click="addSelectFun(index)"></i>
                </p>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped lang="less">
  *{
    margin: 0;
  }
  .attributes{
    .show{
      transform:rotate(180deg);
      -ms-transform:rotate(180deg); 	/* IE 9 */
      -moz-transform:rotate(180deg); 	/* Firefox */
      -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
      -o-transform:rotate(180deg);
    }
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
      background: url("../../../assets/img/select.png") no-repeat;
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
    border-top: 1px #ccc dashed;
    p{
      height: 28px;
      color: #333;
      line-height: 24px;
      padding-left: 22px;
      color: #666;
    }
    input{
      width: 85%;
      color: #333;
    }
    table{
      width: 640px;
      margin: 5px 0 0 22px;
      border-collapse: collapse;
      text-align: center;
      line-height: 30px;
      .active{
        border: 0 none;
      }
      input{
        text-align: center;
        width: 100%;
        height: 100%;
      }
    }
    td{
      border: 1px solid #ccc;
      word-break:break-all;
      position: relative;
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
    padding: 0!important;
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

</style>
<script>
  export default{
    data(){
      return{
        attributesEdit:[
          {
              bool:false
          },
          {
            bool:false
          }
        ],
        attributesShow:[
          {
            bool:false
          },
          {
            bool:false
          }
        ],
        attributes:{
          show:false,
          list:[
            {
              "objAttrId": 23,//对象属性标识
              "attrId": 23,//属性标识
              "createDate": "2017-08-25",//创建时间
              "createStaff": 1,//创建人
              "defaultValue": "23",//默认值
              "parObjAttrId": 23,//父级属性标识
              "objAttrDesc": "23",//对象属性说明
              "objType": "23",//对象类别
              "objId": 1,//对象标识
              "remark": "23",//备注
              "statusCd": "23",//状态
              "statusDate": "2017-08-25",//修改时间
              "updateStaff": 23,//修改人
              show:false,
              selectList:[
                {
                  name:'2M',
                  desc:"2M2M2M2M2M2M2M2M2M2M"
                },
                {
                  name:'4M',
                  desc:"4M4M4M4M4M4M4M4M4M4M4M"
                }
              ]
            },
            {
              "objAttrId": 24,
              "attrId": 2,
              "createDate": "2017-08-25",
              "createStaff": 2,
              "defaultValue": "2",
              "parObjAttrId": 2,
              "objAttrDesc": "2",
              "objType": "2",
              "objId": 2,
              "remark": "2",
              "statusCd": "2",
              "statusDate": "2017-08-25",
              "updateStaff": 2,
              show:false,
              selectList:[
                {
                  name:'2M',
                  desc:"2M2M2M2M2M2M2M2M2M2M"
                },
                {
                  name:'4M',
                  desc:"4M4M4M4M4M4M4M4M4M4M4M"
                }
              ]
            }
          ]
        },
        newSelectValue:{
          name:'',
          desc:''
        },
      }
    },
    created(){

    },
    methods:{
      editFun(item,index){
        this.attributesEdit[index].bool = !this.attributesEdit[index].bool;
        if(this.attributesEdit[index].bool){
//            开始修改
          console.log('修改');

        } else {
//            确认提交修改
          console.log('提交修改');
        }
      },
      deleteSelectFun(parentIndex,index){
        if( index < this.attributes.list[parentIndex].selectList.length){
          this.attributes.list[parentIndex].selectList.splice(index,1);
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
          this.attributes.list[index].selectList.push(data);
          self.newSelectValue.name = '';
          self.newSelectValue.desc = '';
        }
      }
    }
  }
</script>
