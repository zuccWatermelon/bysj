<!--优惠配置-->
<template>
  <section class="discount">
    <p class="discount-title">优惠配置<span @click="editFun">{{discountObject.edit?'确定':'修改'}}</span><i @click="discount.show=!discount.show" :class="{show:discount.show}"></i></p>
    <div v-if="discount.show">
      <!--定价信息配置-->
      <p class="item-title">优惠信息配置</p>
      <div class="discount-cont clearfix">
        <p class="discount-info discount-info1">优惠类别：<input v-model="discountObject.info.planName"
                                                      :disabled="!discountObject.edit"
                                                      :class="{active:discountObject.edit}"
        /></p>
        <p class="discount-info discount-info1">状态：<input v-model="discountObject.info.planName" style="width: 220px;"
                                                      :disabled="!discountObject.edit"
                                                      :class="{active:discountObject.edit}"
        /></p>
        <p class="discount-info discount-info1">优惠是否可选：<input v-model="discountObject.info.planName" style="width: 192px;"
                                                        :disabled="!discountObject.edit"
                                                        :class="{active:discountObject.edit}"
        /></p>
        <p class="discount-info discount-info1">是否自动带出：<input v-model="discountObject.info.planName" style="width: 193px;"
                                                        :disabled="!discountObject.edit"
                                                        :class="{active:discountObject.edit}"
        /></p>
        <p class="discount-info discount-info1">优惠生效时间：<input v-model="discountObject.info.planName" style="width: 193px;"
                                                    :disabled="!discountObject.edit"
                                                    :class="{active:discountObject.edit}"
        /></p>
        <p class="discount-info discount-info1">优惠失效时间：<input v-model="discountObject.info.planName" style="width: 193px;"
                                                      :disabled="!discountObject.edit"
                                                      :class="{active:discountObject.edit}"
        /></p>
        <p class="discount-info discount-info2">优惠信息备注：<input v-model="discountObject.info.planName" style="width: 193px;"
                                                        :disabled="!discountObject.edit"
                                                        :class="{active:discountObject.edit}"
        /></p>
      </div>
      <!--优惠条件参考对象配置-->
      <p class="item-title">优惠条件参考对象配置</p>
      <div class="discount-cont">
        <table>
          <thead>
          <tr>
            <td>参考对象名称</td>
            <td>参考对象类别</td>
            <td>参考对象序列</td>
            <td>状态</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in discountObject.reference">
            <td><input v-model="item.name"
                       :disabled="!discountObject.edit"
                       :class="{active:discountObject.edit}"
            /></td>
            <td><input v-model="item.type"
                       :disabled="!discountObject.edit"
                       :class="{active:discountObject.edit}"
            /></td>
            <td><input v-model="item.code"
                       :disabled="!discountObject.edit"
                       :class="{active:discountObject.edit}"
            /></td>
            <td><input v-model="item.status"
                       :disabled="!discountObject.edit"
                       :class="{active:discountObject.edit}"
            /></td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--优惠条件表达式配置-->
      <p class="item-title">优惠条件表达式配置</p>
      <div class="discount-cont">
        <table>
          <thead>
          <tr>
            <td>优惠表达式</td>
            <td>状态</td>
            <td>备注</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in discountObject.discountList">
            <td><input v-model="item.value"
                       :disabled="!discountObject.edit"
                       :class="{active:discountObject.edit}"
            /></td>
            <td><input v-model="item.value"
                       :disabled="!discountObject.edit"
                       :class="{active:discountObject.edit}"
            /></td>
            <td><input v-model="item.value"
                       :disabled="!discountObject.edit"
                       :class="{active:discountObject.edit}"
            /></td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--优惠参考对象配置-->
      <p class="item-title">优惠参考对象配置</p>
      <div class="discount-cont">
        <table>
          <thead>
          <tr>
            <td>参考对象名称</td>
            <td>参考对象类别</td>
            <td>参考对象序列</td>
            <td>状态</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in discountObject.discountList">
            <td><input v-model="item.value"
                       :disabled="!discountObject.edit"
                       :class="{active:discountObject.edit}"
            /></td>
            <td><input v-model="item.value"
                       :disabled="!discountObject.edit"
                       :class="{active:discountObject.edit}"
            /></td>
            <td><input v-model="item.value"
                       :disabled="!discountObject.edit"
                       :class="{active:discountObject.edit}"
            /></td>
            <td><input v-model="item.value"
                       :disabled="!discountObject.edit"
                       :class="{active:discountObject.edit}"
            /></td>
          </tr>
          </tbody>
        </table>
      </div>
      <!--优惠参考对象配置-->
      <p class="item-title">优惠价目表配置</p>
      <div class="discount-cont">
        <table>
          <thead>
          <tr>
            <td>参考对象值1</td>
            <td>参考对象值2</td>
            <td>参考对象值3</td>
            <td>价格</td>
            <td>价格单位</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in discountObject.discountList">
            <td><input v-model="item.value"
                       :disabled="!discountObject.edit"
                       :class="{active:discountObject.edit}"
            /></td>
            <td><input v-model="item.value"
                       :disabled="!discountObject.edit"
                       :class="{active:discountObject.edit}"
            /></td>
            <td><input v-model="item.value"
                       :disabled="!discountObject.edit"
                       :class="{active:discountObject.edit}"
            /></td>
            <td><input v-model="item.value"
                       :disabled="!discountObject.edit"
                       :class="{active:discountObject.edit}"
            /></td>
            <td>元</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
<style scoped lang="less">
  *{
    padding: 0;
    margin: 0;
  }
  .discount{
    .show{
      transform:rotate(180deg);
      -ms-transform:rotate(180deg); 	/* IE 9 */
      -moz-transform:rotate(180deg); 	/* Firefox */
      -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
      -o-transform:rotate(180deg);
    }
  }
  .discount-title{
    width: 100%;
    background: #5c6f8a;
    color: #fff;
    font-size: 16px;
    line-height: 40px;
    padding-left: 14px;
    margin-bottom: 20px;
    position: relative;
    span{
      position: absolute;
      top: 12px;
      right: 58px;
      line-height: 16px;
      color: #fff;
      cursor: pointer;
    }
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
  .item-title{
    border-left: #2facee 4px solid;
    font-size: 16px;
    line-height: 16px;
    padding-left: 10px;
    color: #333;
  }
  .discount-cont{
    border-bottom: #ccc 1px solid;
    padding: 13px 0 13px 14px;
    margin-bottom: 20px;
    input{
      color: #333;
      width: 220px;
      height: 22px;
      line-height: 22px;
      padding-left: 5px;
      background: none;
      border: 0 none;
    }
    .active{
      border: #ccc 1px solid;
    }
    table{
      width: 720px;
      margin-top: 7px;
      border-collapse: collapse;
      text-align: center;
      thead{
        color: #333;
      }
      tbody{
        color: #666;
      }
      td{
        border: 1px solid #ccc;
      }
      input{
        width: 100%;
        text-align: center;
        padding: 0;
        color: #666;
      }
      .active{
        border: 0 none;
      }
    }
  }
  .discount-info{
    float: left;
    line-height: 28px;
    color: #666;

  }
  .discount-info1{
    width: 313px;
  }
  .discount-info2{
    width: 720px;
  }
</style>
<script>
  export default{
    data(){
      return{
        discount:{
          show:false
        },
        discountObject:{
          edit:false,
          info:{
            "planId": 41,
            "planName": "总账定价",
            "planDesc": "总账定价",
            "palnType": 3,
            "palnObject": "63",
            "createDate": "2017-09-19 00:00:00",
            "createStaff": 1,
            "effDate": "2017-09-19 00:00:00",
            "expDate": "2037-09-19 00:00:00",
            "remark": "remark",
            "statusCd": "00A",
            "statusDate": "2017-09-19 00:00:00",
            "discountPlanId": 201,
            "pricMode": "定价方式"
          },
          reference:[
            {
              name: '参考对象名称1',
              type:'参考对象类别1',
              code:'参考对象序列1',
              status:'状态1'
            },
            {
              name: '参考对象名称2',
              type:'参考对象类别2',
              code:'参考对象序列2',
              status:'状态2'
            },
            {
              name: '参考对象名称3',
              type:'参考对象类别3',
              code:'参考对象序列3',
              status:'状态3'
            }
          ],
          discountList:[
            {
              value: '11111',
            }
          ]
        }
      }
    },
    methods:{
      editFun(){
        this.discountObject.edit = !this.discountObject.edit;
        if(this.discountObject.edit){
//            修改
          console.log('修改');
        } else {
//            提交
          console.log('提交');
        }
      }
    }
  }
</script>
