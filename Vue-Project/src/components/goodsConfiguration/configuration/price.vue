<!--定价配置-->
<template>
  <section class="price">
    <p class="price-title">定价配置<span @click="editFun">{{priceObject.edit?'确定':'修改'}}</span><i @click="price.show=!price.show" :class="{show:price.show}"></i></p>
    <div v-if="price.show">
      <!--定价信息配置-->
      <p class="item-title">定价信息配置</p>
      <div class="price-cont clearfix">
        <p class="price-info price-info1">定价名称：<input v-model="priceObject.info.planName"
                                                      :disabled="!priceObject.edit"
                                                      :class="{active:priceObject.edit}"
        /></p>
        <p class="price-info price-info1">定价方式：<input v-model="priceObject.info.planName"
                                                      :disabled="!priceObject.edit"
                                                      :class="{active:priceObject.edit}"
        /></p>
        <p class="price-info price-info1">定价生效时间：<input v-model="priceObject.info.planName" style="width: 192px;"
                                                        :disabled="!priceObject.edit"
                                                        :class="{active:priceObject.edit}"
        /></p>
        <p class="price-info price-info1">定价失效时间：<input v-model="priceObject.info.planName" style="width: 192px;"
                                                        :disabled="!priceObject.edit"
                                                        :class="{active:priceObject.edit}"
        /></p>
        <p class="price-info price-info1">状态：<input v-model="priceObject.info.planName" style="width: 248px;"
                                                    :disabled="!priceObject.edit"
                                                    :class="{active:priceObject.edit}"
        /></p>
        <p class="price-info price-info1">定价类别：<input v-model="priceObject.info.planName"
                                                      :disabled="!priceObject.edit"
                                                      :class="{active:priceObject.edit}"
        /></p>
        <p class="price-info price-info2">定价对象名称：<input v-model="priceObject.info.planName" style="width: 193px;"
                                                        :disabled="!priceObject.edit"
                                                        :class="{active:priceObject.edit}"
        /></p>
        <p class="price-info price-info2">属性备注：<input v-model="priceObject.info.planName" style="width: 535px;"
                                                      :disabled="!priceObject.edit"
                                                      :class="{active:priceObject.edit}"
        /></p>
        <p class="price-info price-info2">属性描述：<input v-model="priceObject.info.planName" style="width: 535px;"
                                                      :disabled="!priceObject.edit"
                                                      :class="{active:priceObject.edit}"
        /></p>
      </div>
      <!--定价参考对象配置-->
      <p class="item-title">定价参考对象配置</p>
      <div class="price-cont">
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
            <tr v-for="item in priceObject.reference">
              <td><input v-model="item.name"
                         :disabled="!priceObject.edit"
                         :class="{active:priceObject.edit}"
              /></td>
              <td><input v-model="item.type"
                         :disabled="!priceObject.edit"
                         :class="{active:priceObject.edit}"
              /></td>
              <td><input v-model="item.code"
                         :disabled="!priceObject.edit"
                         :class="{active:priceObject.edit}"
              /></td>
              <td><input v-model="item.status"
                         :disabled="!priceObject.edit"
                         :class="{active:priceObject.edit}"
              /></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!--价目表配置-->
      <p class="item-title">价目表配置</p>
      <div class="price-cont">
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
          <tr v-for="item in priceObject.priceList">
            <td><input v-model="item.value"
                       :disabled="!priceObject.edit"
                       :class="{active:priceObject.edit}"
            /></td>
            <td><input v-model="item.value"
                       :disabled="!priceObject.edit"
                       :class="{active:priceObject.edit}"
            /></td>
            <td><input v-model="item.value"
                       :disabled="!priceObject.edit"
                       :class="{active:priceObject.edit}"
            /></td>
            <td><input v-model="item.value"
                       :disabled="!priceObject.edit"
                       :class="{active:priceObject.edit}"
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
  .price{
    .show{
      transform:rotate(180deg);
      -ms-transform:rotate(180deg); 	/* IE 9 */
      -moz-transform:rotate(180deg); 	/* Firefox */
      -webkit-transform:rotate(180deg); /* Safari 和 Chrome */
      -o-transform:rotate(180deg);
    }
  }
  .price-title{
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
  .price-cont{
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
  .price-info{
    float: left;
    line-height: 28px;
    color: #666;

  }
  .price-info1{
    width: 313px;
  }
  .price-info2{
    width: 720px;
  }
</style>
<script>
  export default{
      data(){
          return{
            price:{
              show:false
            },
            priceObject:{
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
                "pricePlanId": 201,
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
              priceList:[
                {
                  value: '11111',
                }
              ]
            }
          }
      },
    methods:{
      editFun(){
        this.priceObject.edit = !this.priceObject.edit;
        if(this.priceObject.edit){
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
