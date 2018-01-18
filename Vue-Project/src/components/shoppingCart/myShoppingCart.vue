<!--IPRAN线路详情-->
<template>
  <div class="index">
    <MyNav class="nav" :current="current" :custData="custData"></MyNav>

    <div class="topic">
        <div class="topic-top">
          <div class="topic-top-cart">{{custName}}的购物车</div>
        </div>

      <div class="topic-bottom">
        <div class="topic-bottom-title" style="width:15%;"></div>
        <div class="topic-bottom-title" style="width:15%;">商品名称</div>
        <div class="topic-bottom-title" style="width:8%;">数量</div>
        <div class="topic-bottom-title" style="width:10%;">商品折扣</div>
        <div class="topic-bottom-title" style="width:12%;">收费方式</div>
        <div class="topic-bottom-title" style="width:10%;">状态</div>
        <div class="topic-bottom-title" style="width:15%;">金额</div>
        <div class="topic-bottom-title" style="width:15%;">操作</div>
      </div>
    </div>

    <div class="main" >
      <ul v-for="(item,index) in prodDataList">
        <li class="item-li" style="margin-bottom:50px;" v-if="item.offerId == '261' " data-hasinputerror=false >
          <div class="top-tip"><span class="top-tip-name"></span><span class="top-tip-num">预订单编号：{{item.cartItemId}}</span></div>
          <div class="main-top">
              <div style="float:left;width:15%;height:100%;">

                <input type="checkbox" style="width:20px;height:20px;margin-top:40px;margin-left:10px;" @click="modifyTotalPrice()"/>
                <input type="hidden" :value=item.applyObjId class="InputApplyObjId"/>
                <input type="hidden" :value=item.cartItemId class="inputCartItemId"/>
                <input type="hidden" :value=item.catalogId  class="inputCatalogId"/>
                <input type="hidden" :value=item.offerId    class="inputOfferId"/>
                <input type="hidden" :value="item.cartId"   class="inputCartId"/>

                <!--存放总价格-->
                <input type="hidden"  class="hiddenPrice" value=""/>
                <img style="width:90px;height:90px;margin-top:11px;margin-left:10px;" src="../../assets/img/bg_chanpin.png"/>
              </div>

              <div style="float:left;width:15%;height:100%;">
                  <div style="margin-top:45px;text-align: center;">{{item.offerName}}</div>
              </div>

            <div style="float:left;width:8%;height:100%;">
              <div style=" width: 100%;height:34px;text-align: center;margin-top:45px;">
                <span class="applyObjSpec">1</span>
              </div>
            </div>

            <div style="float:left;width:10%;height:100%;">
              <select style="width:80px;margin:40px auto 0px auto;" :disabled="item.statusCd != '1'" class="discount form-control" @change="discountChange($event)">
                <option value="0.95">95折</option>
                <option value="0.8">8折</option>
                <option value="0.7">7折</option>
                <option value="0.65">65折</option>
              </select>
            </div>

            <div style="float:left;width:12%;height:100%;">
              <select style="margin:40px auto 0px auto;width:110px;" :disabled="item.statusCd != '1'" class="billType form-control">
                <option value="前台收费">前台收费</option>
                <option value="计费收费">计费收费</option>
              </select>
            </div>

            <div style="float:left;width:10%;height:100%;text-align: center">
              <div style="margin-top:50px;" v-if="(curExamineCentOrNot==true && curExamineId==item.cartItemId)&&item.statusCd==1">审批中</div>
              <div style="margin-top:50px;" v-if="(curExamineCentOrNot==false && curExamineId==item.cartItemId)&&item.statusCd==1">未审批</div>
              <div style="margin-top:50px;" v-else-if="!item.statusCd">--------</div>
              <div style="margin-top:50px;" v-else-if="curExamineId!==item.cartItemId && item.statusCd">
                {{item.statusCd==1 ? '未审批':(item.statusCd==2 ? '审批中':(item.statusCd==3 ? '审批通过':(item.statusCd==4 ? '审批未通过':(item.statusCd==5?'订单已提交':(item.statusCd==6?'施工中':(item.statusCd==7?'完成':'--------'))))))}}
              </div>
            </div>

            <div style="float:left;width:15%;height:100%;color:#ff8200;">
              <div name="totalPrice" class="totalPrice" style="color:#ff8200;text-align: center;margin-top:50px;"></div>
            </div>

            <div style="float:left;width:15%;height:100%;text-align: center;padding-top:45px;">
                <span class="examine-enter" style="margin:0 5px;color:#318de7;cursor: pointer;"
                     @click="getApprove(item)"
                     v-if="(curExamineCentOrNot==false && curExamineId==item.cartItemId && item.statusCd==1) || (curExamineId!==item.cartItemId && item.statusCd==1)"
                >折扣审批</span>
                <span style="margin:0 5px;color:#318de7;cursor: pointer;" @click="deleteCart(index,item,$event)">删除</span>
            </div>

          </div>
          <div class="main-one">
            <span class="title-w1200" @click="showConfInfo($event)">IPRAN线路配置信息<img :class="{up:isUp}" src="../../assets/img/arrow.png"/></span>
            <div class="IPRAN-conf" style="display: none;" >
              <div class="conf-l">
                <div class="conf-l-t l-t-first">1. 云专线基本信息</div>
                <div class="conf-l-m conf-l-netCloudBasicInfo prod_id_prop" :dataValue="201">
                  <div class="conf-l-item">
                    <span class="item-label">选择所属域：</span>
                    <!--select内的option通过后端服务自动生成-->
                    <select class="item-in" :disabled="item.statusCd != '1'" :dataValue="123"></select>
                  </div>
                </div>
                <div class="conf-l-t">2. IPRAN线路设置</div>
                <div class="conf-l-m conf-l-IPRANSet prod_id_prop" :dataValue="203">
                  <!--算费相关-->
                  <input type="hidden" class="configure-price" value=""/>
                  <div class="conf-l-item">
                    <span class="item-label"><img src="../../assets/img/icon_sulv.png"/>CE接入速率：</span>
                    <select class="item-in" :dataValue="129" :disabled="item.statusCd != '1'" @change="propChange(item,$event)"></select>
                  </div>
                  <div class="conf-l-item">
                    <span class="item-label"><img src="../../assets/img/icon_sulv.png"/>速率类型：</span>
                    <!--select内的option通过后端服务自动生成-->
                    <select class="item-in" :dataValue="140" :disabled="item.statusCd != '1'" @change="propChange(item,$event)"></select>
                  </div>
                  <div class="conf-l-item">
                    <span class="item-label"><img src="../../assets/img/icon_sulv.png"/>电路维护等级：</span>
                    <!--select内的option通过后端服务自动生成-->
                    <select class="item-in" :dataValue="127" :disabled="item.statusCd != '1'" @change="propChange(item,$event)"></select>
                  </div>
                  <div class="conf-l-item">
                    <span class="item-label">Qos等级模式：</span>
                    <select class="item-in" :dataValue="128" :disabled="item.statusCd != '1'" @change="propChange(item,$event)"></select>
                  </div>

                  <div class="IPRANSet-default">
                    <span class="button-collapse"  @click="toggle()">默认属性 <img :class="{up:isShow}" src="../../assets/img/arrow.png"/></span>
                    <div class="div-collapse" v-show="isShow">
                      <div class="conf-l-item">
                        <span class="item-label">付费方式：</span>
                        <!--select内的option通过后端服务自动生成-->
                        <select class="item-in" :dataValue="135" :disabled="item.statusCd != '1'" @change="propChange(item,$event)"></select>
                      </div>

                      <div class="conf-l-item">
                        <span class="item-label">电路类型：</span>
                        <!--select内的option通过后端服务自动生成-->
                        <select class="item-in" :disabled="item.statusCd != '1'" :dataValue="138"></select>
                      </div>
                      <div class="conf-l-item">
                        <span class="item-label">CE端提供方：</span>
                        <!--select内的option通过后端服务自动生成-->
                        <select class="item-in" :disabled="item.statusCd != '1'" :dataValue="136"></select>
                      </div>
                      <div class="conf-l-item">
                        <span class="item-label">起租/退租系数：</span>
                        <!--select内的option通过后端服务自动生成-->
                        <select class="item-in" :disabled="item.statusCd != '1'" :dataValue="137"></select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="conf-l-t">3. 装机相关信息</div>
                <div class="conf-l-m conf-l-setupInfo prod_id_prop" :dataValue="204">
                  <div class="conf-l-item">
                    <span class="item-label">客户联系人：</span>
                    <div class="item-in"><input type="text" :disabled="item.statusCd != '1'" :dataValue = "124"/></div>
                  </div>

                  <div class="conf-l-item">
                    <span class="item-label">联系电话：</span>
                    <div class="item-in"><input type="text" :disabled="item.statusCd != '1'" :dataValue = "125" @blur="checkPhone($event)"/></div>
                  </div>

                  <div class="conf-l-item">
                    <span class="item-label">预约起租时间：</span>
                    <el-date-picker
                      v-model="rentTime"
                      type="date"
                      format="yyyy-MM-dd"
                      placeholder="选择日期"
                      class = "el-data-editor"
                      :dataValue = "126"
                      :disabled="item.statusCd != '1'">
                    </el-date-picker>
                  </div>

                  <div class="conf-l-item setup-address">
                    <addressSearch
                      :statusCd.sync = "item.statusCd"
                      :addressDataExchId.sync="addressData.exchId"
                      :addressDataBelongRegionId.sync="addressData.belongRegionId"
                      :addressDataAddressId.sync="addressData.addressId"
                      :addressDataAddressDesc.sync="addressData.addressDesc"
                    ></addressSearch>
                  </div>
                </div>
              </div>

              <!--配置详情浮动窗口-->
              <div class="conf-r">
                <span class="conf-box-t">配置详情</span>
                <div class="conf-box-cont">
                  <div class="conf-box-cont-a">
                    <div class="conf-box-t2">CE接入速率：</div>
                    <div class="a-list">
                      <span class="ce-speed">2M</span><span class="speed-type">包月</span><span class="maintain-level">A</span><span class="a-list-price">￥<span class="pro_price">1000.00</span></span>
                    </div>
                  </div>
                  <div class="conf-box-cont-b">
                    <dl>
                      <dt>Qos等级模式：</dt>
                      <dd class="QoS-level">钻</dd>
                    </dl>
                    <dl>
                      <dt>付费方式：</dt>
                      <dd class="pay-type">最终客户付费</dd>
                    </dl>
                  </div>
                </div>
                <div class="conf-box-price">
                  <div class="conf-box-t2">配置费用：</div>
                  <span><small>￥</small><span class="pro_price">2000.00</span></span>
                </div>
                <div class="conf-box-ps">
<!--
                  <a>IPRAN线路配置价格说明 >> </a>
-->
                </div>
                <div class="conf-save">
                  <el-button type="warning" plain @click="saveConfig(item,$event)">订单校验</el-button>
                </div>
              </div>

            </div>
            <div>
              <span class="title-w1200" @click="showExpense($event)">一次性费用(初装费)<img :class="{up:isUpTwo}" src="../../assets/img/arrow.png"/></span>

              <div class="IPRAN-price-one prod_id_prop"  style="display: none" :dataValue="222">
                <span class="price-one-l"><img src="../../assets/img/step.png"/> 一次性费用(初装费)：</span>
                <div class="price-one-r"><input class="calculate-amount" type="text"  value="5200" readonly :disabled="item.statusCd != '1'" :dataValue="130" @blur="onceChargeChange($event)"/></div>
              </div>
            </div>
          </div>
        </li>

        <li class="item-li" style="margin-bottom:50px;" v-if="item.offerId == '244' || item.offerId == '247'">
          <div class="top-tip"><span class="top-tip-name"></span><span class="top-tip-num">预订单编号：{{item.cartItemId}}</span></div>
            <div class="main-top">
              <div style="float:left;width:15%;height:100%;">
                <input type="checkbox" style="width:20px;height:20px;margin-top:40px;margin-left:10px;" @click="modifyTotalPrice()"/>
                <input type="hidden" :value=item.applyObjId class="inputApplyObjId"/>
                <input type="hidden" :value=item.cartItemId class="inputCartItemId"/>
                <input type="hidden" :value=item.catalogId  class="inputCatalogId"/>
                <input type="hidden" :value=item.offerId  class="inputOfferId"/>
                <!--存放总价格-->
                <input type="hidden"  v-if="item.amount != null" class="hiddenPrice" :value="parseFloat(item.amount * 0.7).toFixed(2)"/>
                <input type="hidden"  v-if="item.amount == null" class="hiddenPrice" :value="0"/>
                <img style="width:90px;height:90px;margin-top:15px;margin-left:10px;" src="../../assets/img/bg_chanpin.png"/>
              </div>

            <div style="float:left;width:15%;height:100%;">
              <div style="margin-top:40px;margin-left:40px;">{{item.offerName}}</div>
              <div style="color:#6ca7eb;margin-left:35px;cursor: pointer;">
                <router-link v-if="item.offerName.indexOf('普及版') > 0" style="color:blue;margin-left:25px;" :to="'/allocation2?cartItemId=' + item.cartItemId +'&offerId='+item.offerId + '&catalogId='+item.catalogId">产品配置</router-link>
                <router-link v-if="item.offerName.indexOf('标准版') > 0" style="color:blue;margin-left:25px;" :to="'/allocation?cartItemId=' + item.cartItemId +'&offerId='+item.offerId + '&catalogId='+item.catalogId">产品配置</router-link>
              </div>
            </div>

            <div style="float:left;width:10%;height:100%;">
              <div style=" width: 90px;height: 34px;margin-left:45px;margin-top:45px;">
                <span class=".applyObjSpec">1</span>
                <input type="hidden" :value=item.amount class="hidden"/>
              </div>
            </div>

            <div style="float:left;width:10%;height:100%;">
             <input type="text" class="select-after-label form-control discount" style="width:80px;margin-top:40px;" @blur="inputChange(item,$event)" value="0.7">
              <div style="font-size: 6px;">折扣不能小于0.65</div>
            </div>

            <div style="float:left;width:10%;height:100%;">
              <select style="margin:40px auto 0px auto;width:110px;" class="billType form-control">
                <option value="前台收费">前台收费</option>
                <option value="计费收费">计费收费</option>
              </select>
            </div>

            <div style="float:left;width:10%;height:100%;text-align: center">
              <div style="margin-top:50px;" v-if="(curExamineCentOrNot==true && curExamineId==item.cartItemId)&&item.statusCd==1">审批中</div>
              <div style="margin-top:50px;" v-if="(curExamineCentOrNot==false && curExamineId==item.cartItemId)&&item.statusCd==1">未审批</div>
              <div style="margin-top:50px;" v-else-if="!item.statusCd">--------</div>
              <div style="margin-top:50px;" v-else-if="curExamineId!==item.cartItemId && item.statusCd">
                {{item.statusCd==1 ? '未审批':(item.statusCd==2 ? '审批中':(item.statusCd==3 ? '审批通过':(item.statusCd==4 ? '审批未通过':(item.statusCd==5?'订单已提交':(item.statusCd==6?'施工中':(item.statusCd==7?'完成':'--------'))))))}}
              </div>
            </div>

            <div style="float:left;width:15%;height:100%;color:#ff8200;">
              <div style="margin-left:50px;margin-top:50px;width:15px;float:left">￥</div>
              <div class="totalPrice" name="totalPrice" style="color:#ff8200;margin-left:65px;margin-top:50px;">
                  {{item.amount == null ? '0':parseFloat(item.amount * 0.7).toFixed(2)}}
              </div>
            </div>

            <div style="float:left;width:15%;height:100%;">
              <div style="float:left;width:50px;margin-top:45px;margin-left:70px;color:#318de7;cursor: pointer;" @click="deleteCart(index,item,$event)">删除</div>
            </div>
          </div>
        </li>

      </ul>

      <!--购物车审批-->
      <Examine v-if="loginClick"
               :loginClick.sync="loginClick"
               :curExamineCentOrNot.sync="curExamineCentOrNot"
               :message="dataToExamine">
      </Examine>
    </div>

    <div class="main-two">
      <div class="main-two-center">
        <div class="add-to-cart" @click="submitOrder()">提交</div>
        <div class="final-price">
          <p>总价：<span class="orange sumPrice"><small>￥</small></span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">

  .index{
    width: 100%;
    heigth:100%;

    .nav{
      background: linear-gradient(left, #6e21aa ,#666ebe, #628ac7); /* 标准的语法 */
      background: -o-linear-gradient(left, #6e21aa ,#666ebe, #628ac7); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(left, #6e21aa ,#666ebe, #628ac7); /* Firefox 3.6 - 15 */
      background: -webkit-linear-gradient(left, #6e21aa ,#666ebe, #628ac7);
    }
  }

  .topic{
    width:1200px;
    height:145px;
    margin:0 auto;

    .topic-top{
      width:1200px;
      height:67px;
      border-bottom: solid 1px #929292;

      .topic-top-cart{
        width:408px;
        height:40px;
        font-size: 30px;
        float:left;
        margin-top:10px;
      }

      .topic-top-asset{
        width:90px;
        height:28px;
        margin-top:20px;
        border:solid 1px #dddddd;
        border-radius:3px;
        cursor:pointer;
        float:right;
        text-align: center;
        line-height:26px;
        margin-left:25px;
      }

      .topic-top-switch-customer{
        width:90px;
        height:28px;
        margin-top:20px;
        border:solid 1px #dddddd;
        border-radius:3px;
        cursor:pointer;
        float:right;
        text-align: center;
        line-height:26px;
        margin-left:25px;
      }

      .topic-top-add-production{
        width:90px;
        height:28px;
        margin-top:20px;
        border-radius:3px;
        cursor:pointer;
        background-color:#00cc33;
        float:right;
        text-align: center;
        line-height: 26px;
        color:white;
      }
    }

    .topic-bottom{
      .topic-bottom-title{
        height:78px;
        font-size:20px;
        line-height:78px;
        text-align: center;
        float:left;
      }
    }
  }
  .main-top{
    width:1200px;
    height:115px;
    margin:0 auto;
    border:solid 1px #e8e8e8;
    border-radius: 5px;
  }

  .clear{
    clear:both;
  }
  .hidden{
    display: none;
  }
  .top{
    height:340px;
    width:100%;
    background-color: #0182de;
    background-repeat: no-repeat;
    background-position:center;
  }
  .main{
    width:100%;
  }
  .main-one{
    width:1200px;
    margin:0 auto;
  }
  .title-w1200{
    width:1200px;
    height:50px;
    padding-left:15px;
    margin-top: 20px;
    display: block;
    background-color: #5c6f8a;
    line-height: 50px;
    font-size: 18px;
    color:#fff;
    cursor: pointer;
  }
  .IPRAN-conf{
    width:1200px;
  }
  .IPRAN-conf:after{
    content: ' ';
    display: block;
    overflow: hidden;
    height: 0;
    font-size: 0;
    clear: both;
  }
  .conf-l{
    width:918px;
    padding-right:20px;
    float:left;
    .conf-l-t{
      width:100%;
      height:55px;
      border-top: 1px solid #e6e6e6;
      line-height: 55px;
      font-size: 16px;
      font-weight: bold;
      color:#333;
    }
    .l-t-first{
      border-top: 0px;
    }
    .conf-l-m{

      width:100%;
      margin-bottom: 5px;
    }
    .conf-l-item{
      width:33.3%;
      height:40px;
      margin-bottom: 10px;
      float:left;
      .item-label{
        display: block;
        width:50%;
        height:40px;
        float: left;
        line-height: 40px;
        text-align: right;
        img{
          margin:10px 5px 0 0;
        }
      }
      .item-in{
        width:45%;
        height:30px;
        margin:5px;
        float: left;
        position: relative;
        input{
          width:100%;
          height:30px;
        }
      }
      .el-data-editor{
        width:50%;
      }
    }
    .conf-l-m:after,.conf-l-item:after{
      content: ' ';
      display: block;
      overflow: hidden;
      height: 0;
      font-size: 0;
      clear: both;
    }
    .item-margin-right{
      margin-right:50px;
    }
    .setup-address{
      width:100%;
      .item-label{
        width:16.65%;
      }
      select.item-in{
        width:10%;
      }
      input.item-in{
        width:49%;
      }
    }
    .IPRANSet-default{
      width:100%;
      min-height:45px;
      margin-bottom: 10px;
      float: left;
      .button-collapse{
        display: block;
        width:100%;
        height:40px;
        border:1px solid #d5d5d5;
        cursor: pointer;
        line-height: 40px;
        text-align: left;
        padding-left:10px;
        background-color: #ededed;
        color:#666;
        img{
          width:20px;
          margin-top:10px;
          margin-right:10px;
          float:right;
        }
        img.up{
          transform:rotate(180deg);
          -webkit-transform:rotate(180deg);
          -moz-transform:rotate(180deg);
          -ms-transform:rotate(180deg);
          -o-transform:rotate(180deg);
        }
      }
      .div-collapse{
        margin-top:10px;
      }
    }
  }
  .conf-r{
    width:282px;
    margin-top:20px;
    float:left;
    background-color: #efefef;
    font-size: 14px;
    .conf-box-t{
      width:100%;
      height:40px;
      padding-left:15px;
      display: block;
      line-height:40px;
      background-color: #e5e5e5;
      font-size: 16px;
      color:#333;
    }
    .conf-box-t2{
      width:100%;
      height:25px;
      line-height: 25px;
      color:#666;
    }
    .conf-box-cont{
      width:100%;
      padding:0 15px;
    }
    .conf-box-cont-a{
      width:252px;
      padding:8px 0;
      .a-list{
        width:100%;
        span{
          margin:8px 15px 8px 0;
          line-height:25px;
        }
        .a-list-price{
          font-weight: bold;
        }
      }
    }
    .conf-box-cont-b{
      width:252px;
      padding:8px 0;
      border-top: 1px dashed #e5e5e5;
      dl{
        width:100%;
        margin:8px 0;
      }
      dl:after {
        content: ' ';
        display: block;
        overflow: hidden;
        height: 0;
        font-size: 0;
        clear: both;
      }
      dt{
        width:110px;
        margin-right:8px;
        float:left;
        font-weight:normal;
        text-align: right;
        color:#666;
      }
      dd{
        margin-left:120px;
      }
    }
    .conf-box-price{
      width:100%;
      padding:8px 15px;
      border-top: 1px dashed #e5e5e5;
      span{
        margin-left:25px;
        font-size: 24px;
        color:#ff8200;
      }
    }
    .conf-box-ps{
      width:100%;
      height:60px;
      padding:8px 15px;
      border-top: 1px solid #e5e5e5;
      line-height: 40px;
      text-align: center;
      a,a:link,a:visited{
        color:#999;
      }
    }

    .conf-save{
      width:100%;
      height:60px;
      padding:8px 15px;
      border-top: 1px solid #e5e5e5;
      line-height: 40px;
      text-align: center;
    }
  }
  .IPRAN-price-one{
    width:100%;
    height:75px;
    .price-one-l{
      display: block;
      width:200px;
      height:75px;
      float: left;
      line-height: 75px;
      img{
        width:25px;
        margin-top:25px;
        margin-right:10px;
      }
    }
    .price-one-r{
      width: 165px;
      height: 30px;
      margin:22.5px 5px;
      float: left;
      position: relative;
      input{
        width:100%;
        height:30px;
        line-height: 30px;
        text-align: center;
      }
    }
  }
  /*以下为加入购物车行 */
  .main-two{
    width:100%;
    margin-top:50px;
    background-color: #e5e5e5;
  }
  .main-two-center{
    width:1200px;
    margin:0 auto;
    .add-to-cart{
      width:130px;
      height:70px;
      float: right;
      text-align: center;
      line-height: 70px;
      background-color: #ff8200;
      font-size: 25px;
      color:#fff;
      cursor: pointer;
    }
    .final-price{
      width:650px;
      height:50px;
      margin-top: 20px;
      margin-right:10px;
      float:right;
      text-align: right;
      p{
        line-height: 35px;
      }
      .orange{
        font-weight: bold;
        font-size: 26px;
        color:#ff8200;
      }
      .light-word{
        font-size: 12px;
        color:#999;
      }
    }
  }
  .main-two-center:after{
    content: ' ';
    display: block;
    overflow: hidden;
    height: 0;
    font-size: 0;
    clear: both;
  }
  .item-li{
    width:1202px;
    margin:0 auto;
    padding-bottom:20px;
    border:1px solid #e8e8e8;
    border-radius:5px;
    .top-tip{
      width:100%;
      height:40px;
      line-height:40px;
      border-bottom:1px solid #e8e8e8;
      color:#999;
      .top-tip-name{
        float:left;
        margin-left:15px;
      }
      .top-tip-num{
        float:right;
        margin-right:15px;
      }
    }
    .main-out-border{
      width:1202px;
      padding-bottom:20px;
      margin:0 auto;
      border:1px solid #e8e8e8;
      border-radius:5px;
    }
    .main-top{
      border: 0px;
      border-radius:0;
    }
    .IPRAN-conf{
      margin:0 10px;
    }
    .conf-l{
      width:908px;
    }
    .conf-r{
      width:272px;
    }
    .price-one-l{
      margin-left:10px;
    }
    .title-w1200{
      margin-top:10px;
      background-color: #e5e5e5;
      color:#666;
      img{
        float:right;
        margin-top:8px;
        margin-right:10px;
      }
      img.up{
        transform:rotate(180deg);
        -webkit-transform:rotate(180deg);
        -moz-transform:rotate(180deg);
        -ms-transform:rotate(180deg);
        -o-transform:rotate(180deg);
      }
    }

  }

</style>
<script>
  import IPRANIntro from '../CloundLine/IPRAN/IPRANIntro.vue';
  import MyNav from '../common/MyNav.vue';
  import addressSearch from '../CloundLine/IPRAN/addressSearch.vue';
  import Examine from '../CloundLine/Examine.vue';

  export default {
    data(){
      return{
        isUp:false,
        isUpTwo:false,
        prodDataList:[],
        loginClick:false,
        current:"index",
        customer_search:"0",
        custData:[],
        custDataList:[],
        customerSelectBox:false,
        custChange:false,
        client:"",
        custName:[],
        sysUserName:'',
        rentTime:[],
        isShow:false,
        curExamineId:'',
        curExamineOfferName:'',
        curExamineCentOrNot:false,
        curCatalogId:'',
        addressData:{
          addressId:'',
          exchId:'',
          belongRegionId:'',
          addressDesc:'',
        },
        statusCd:'',
      };
    },
    components:{
      IPRANIntro,
      MyNav,
      addressSearch,
      Examine
    },

    computed:{
      dataToExamine:function(){
        let datas = {};
        if(this.curExamineId){
          let cur_li = $("input[type='hidden'][value="+this.curExamineId+"]").parent().parent().parent('li');
          datas.conf_price = cur_li.find("input.configure-price").val();
          datas.calculate_amount = cur_li.find("input.calculate-amount").val();
          datas.discount = cur_li.find("select.discount").val();
          datas.curExamineId = this.curExamineId;
          datas.sysUserName = this.sysUserName;
          datas.custName = this.custName;
          datas.offerName = this.curExamineOfferName;
          datas.catalogId = this.curCatalogId;
        }
        return datas;
      }
    },

    /**模板初始化同时，加载客户的购物车**/
    mounted:function(){
      var _this = this;
      /**获取用户对应的session**/
      var user = window.sessionStorage.getItem('user');
      /**获取客户对应的session**/
      var cust = window.sessionStorage.getItem('cust');

      /**获取加载购物车的查询条件**/
      var custId = JSON.parse(cust).CUST_ID;

      /**获取购物车对应的客户名并显示**/
      var custName = JSON.parse(cust).custName;
      _this.custName = custName;

      var lst;
      _this.sysUserName=JSON.parse(user).sysUserName;
      _this.custData = JSON.parse(cust);

     axios({
        method:'post',
        url:"/netCloudOrder/shoppingCartService/getShoppingCarts",
        data:{
          userId:custId,
          pageSize:"1000",
          pageNo:"1",
        }
      }).then(function(response) {
          /**查询成功,展示购物车项列表**/
          if(response.data.code == "0"){
            _this.prodDataList = response.data.data;
          }
         /**获取云产品的产品id**/
         axios({
           method:'post',
           url:"/netCloudOffer/productsService/productlistByParam",
           data:{
             "id":'261'
           },
         }).then(function (response) {
           lst = response.data.data;

           for(var i = 0;i < lst.length;i++){
             for(var j = 0;j < lst[i].offerProductObjectAttrList.length;j++){
               var tmp = lst[i].offerProductObjectAttrList[j];
               /**遍历所有的li**/
               $(".item-li").each(function () {
                 var node = this;
                 /**遍历li里面的所有select**/
                 $(node).find("select").each(function () {
                   var select_node = this;
                   /**获取默认值**/
                   var defaultValue = tmp.objectAttrInfo.defaultValue;
                   if($(select_node).attr("datavalue") == tmp.objectAttrInfo.attrId){
                     for(var n = 0;n < tmp.objectAttrValueList.length;n++){
                       $(select_node).append("<option value=" + tmp.objectAttrValueList[n].attrValueId + " text=" + tmp.objectAttrValueList[n].remark + ">" + tmp.objectAttrValueList[n].remark + "</option>");
                     }
                     /**设置对应的option为选中**/
                     if(defaultValue != null) {
                       $(select_node).find("option[text='" + defaultValue + "']").prop("selected",true);
                     }
                   }
                 });
               });
             }
           }
           /**遍历所有的购物车并加载配置**/
           $(".item-li").each(function () {
             var node = this;
             var cartItemId = $(node).find(".inputCartItemId").val();
             var offerId = $(node).find(".inputOfferId").val();
             var catalogId = $(node).find(".inputCatalogId").val();

             if(offerId == "261") {
               axios({
                 method: 'post',
                 url: "/netCloudOrder/cartItemAttrService/queryCartItemAttr",
                 data: {
                   cartItemId: cartItemId,
                   offerId: offerId,
                   catalogId: catalogId,
                 }
               }).then(function (response) {
                 if (response.data.code == "0") {
                   var data = response.data.data;
                   /**加载所有配置**/
                   _this.initConfig(data, node);
                   /**设置价格**/
                   _this.getPrice(cartItemId);
                   /**设置每个li的金额**/
                   _this.initPrice(data, node);
                 }
               })
             }
           });
         }).catch(err =>{
         })
      }).catch(err =>{
      })
    },

    methods:{
      /**校验地址**/
      checkAddress:function (exchId,belongRegionId,addressDesc) {
        if(($.trim(exchId) == "") || ($.trim(exchId) == null) || ($.trim(belongRegionId) == "") || ($.trim(belongRegionId) == null) || ($.addressDesc == "") || ($.addressDesc == null)){
              return false;
        }
      },

      /**设置每个li的金额**/
      initPrice:function(data,node){
          /**一次性费用默认值**/
          var onetime_charge = "5200";
          /**配置费用默认值**/
          var config_charge = "10000";
          $.each(data,function(index,item){
              if(item.productId == "222"){
                /**一次性费用**/
                onetime_charge = (item.amount == null)?"5200":item.amount;
              }else if(item.productId == "203"){
                /**配置费用**/
                config_charge  = (item.amount == null)?"10000":item.amount;
              }
          });

          /**设置一次性费用**/
          $(node).find(".price-one-r input").val(onetime_charge);

          var discount = $(node).find(".discount").val();
          var totalPrice = parseFloat((onetime_charge + config_charge) * discount).toFixed(2);
          $(node).find(".totalPrice").text("￥" + totalPrice);
      },

      /**审批弹框**/
      getApprove:function (item) {
        var _this = this;
        _this.loginClick = true;
        _this.curExamineId = item.cartItemId;
        _this.curExamineOfferName = item.offerName;
        _this.curCatalogId = item.catalogId;
      },

      /**初始化配置信息**/
      initConfig:function(data,tag){
        var _this = this;
        /**一次性费用**/
        var oneTimeCharge = "";
        /**配置费用**/
        var configCharge = "";
        /**遍历返回的数组**/

        if(data != null && data != '') {
          $.each(data, function (index, item) {
            if(item.serviceAttrList != null){

              $.each(item.serviceAttrList, function (index, token) {
                /**给select和input赋值**/
                $(tag).find("select,input").each(function () {
                  var node = this;
                  if (($(node).attr("dataValue") == token.attrId) && (token.attrValue != null)) {
                    /**设置select对应的值为选中**/
                    $(node).val(token.attrValue);
                  }
                });

                /**给预约起租时间赋值**/
                $(tag).find(".el-data-editor").each(function () {
                  var node = this;
                  if (($(node).attr("dataValue") == token.attrId) && (token.attrValue != null)) {
                    /**设置select对应的值为选中**/
                    _this.rentTime = token.attrValue;
                  }
                })
              })

              if (data.length != 0) {
                /**地址初始化**/
                /**地址id**/
                _this.addressData.addressId = data[0].addressId;
                _this.addressData.exchId = data[0].exchId;
                _this.addressData.belongRegionId = data[0].belongRegionId;
                _this.addressData.addressDesc = data[0].addressDesc;
              }

              /**配置悬浮窗初始化**/
              var suspendedWindow = $(tag).find(".conf-r");
              $(tag).find("select").each(function () {
                var node = this;
                if($(node).attr("dataValue") == "128"){
                  /***设置QoS等级模式*/
                  var txt = $(node).find("option:selected").text();
                  $(suspendedWindow).find(".QoS-level").text(txt);
                }else if($(node).attr("dataValue") == "129"){
                  /**CE接入速率**/
                  var txt = $(node).find("option:selected").text();
                  $(suspendedWindow).find(".ce-speed").text(txt);
                }else if($(node).attr("dataValue") == "140"){
                  /**速率类型**/
                  var txt = $(node).find("option:selected").text();
                  $(suspendedWindow).find(".speed-type").text(txt);
                }else if($(node).attr("dataValue") == "135"){
                  /**付费方式**/
                  var txt = $(node).find("option:selected").text();
                  $(suspendedWindow).find(".pay-type").text(txt);
                }else if($(node).attr("dataValue") == "127"){
                  /**维护等级**/
                  var txt = $(node).find("option:selected").text();
                  $(suspendedWindow).find(".maintain-level").text(txt);
                }
              })
            }
          });
        }
      },

      /**从购物车提交订单**/
      submitOrder:function () {
        var _this = this;

        var param = {};
        var orderItemList = [];
        var num = 0;

        /**遍历所有的购物车行,一次只允许提交一个**/
        $(".item-li").each(function () {
            var node = $(this).find("input[type='checkbox']");
            if($(node).prop("checked")) {
              num++;
            }
        });

        if(num != 1){
          this.$alert('一次只能提交一个购物车!','提示',{
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          })
        }

        if(num == 0){
          this.$alert('请选中对应的购物车再提交!','提示',{
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          })
        }

        /**组装提交的数据**/
        $(".item-li").each(function () {
            var node = this;
            var checkBox = $(node).find("input[type='checkbox']");
            if($(checkBox).prop("checked")){
              var cartId = $(node).find(".inputCartId").val();
              var orderItemId = $(node).find(".inputCartItemId").val();
              var applyObjId = $(node).find(".inputOfferId").val();
              var catalogId = $(node).find(".inputCatalogId").val();
              var applyObjSpec = "1";
              var discount = $(node).find(".discount").val();
              var billType = $(node).find(".billType").val();

              param.cartId = cartId;
              param.orderItemId = orderItemId;
              param.applyObjId = applyObjId;
              param.applyObjSpec = applyObjSpec;
              param.discount = discount;
              param.billType = billType;
              param.catalogId = catalogId;

              return true;
            }
        });
        /**报错信息**/
        var msg = "";
          /**判断购物车能否提交**/
        axios({
          method:'post',
          url:'/netCloudOrder/shoppingCartService/checkShoppingCart',
          data:{
            cartItemId:param.orderItemId,
            catalogId:param.catalogId,
          },
        }).then(res=>{
          /**如果可以提交**/
          if(res.data.code == "0"){
            axios({
              method:'post',
              url:'/netCloudOrder/orderService/submitOrderFromCart2',
              data:param,
            }).then(function (response) {
              /**提交成功,刷新当前页面**/
              if(response.data.code == "0"){
                _this.$alert('单子已到云计算中心，待补录信息结束后收费!', '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    window.location.reload();
                  }
                });
              }
            })
          }else{
            msg = res.data.msg;
            _this.$alert(msg,'提示',{
              confirmButtonText: '确定',
              callback: action => {
              }
            })
          }
        })
      },

      /**保存修改后的配置**/
      saveConfig:function(item,event){

          var _this = this;
          let el = event.currentTarget;
          /**获取父级的li**/
          var cur_li = $("input[type='hidden'][value="+item.cartItemId+"]").parent().parent().parent('li');

          var configure_price = $(cur_li).find(".configure-price").val();

          /**购物车项id**/
          var cartItemId = item.cartItemId;

          /**产品id**/
          var offerId = item.offerId;

          /**获取客户的session**/
          var user = window.sessionStorage.getItem('user');
          /**获取客户对应的session**/
          var cust = window.sessionStorage.getItem('cust');

          /**获取加载购物车的查询条件**/
          var userId = JSON.parse(cust).CUST_ID;
          var loginUserId = JSON.parse(user).staffId;
          var param = {};
          param.loginUserId = loginUserId;
          param.cartItemId = cartItemId;
          param.shoppingCart = {
            "userId": userId,
            "userType": "客户经理"
          };

          param.shoppingCartItem = {
            "applyObjId": "261",
            "applyObjSpec": 1
          };

          param.cartItemAttr = {
            "attrId": 0,
            "attrValue": 1
          };

          param.offerId = 261;

          /**传参字符串**/
          var productAttrList = [];
          /**基础相关信息字符串**/
          var lst_basic = {};
          var serviceAttrList_basic = [];

          /**拼装安装地址信息**/
          /**地址id**/
          var addressId = $(cur_li).find(".addressId").val();

          /**本地网id**/
          var exchId = $(cur_li).find(".exchId").val();

          /**区县id**/
          var belongRegionId = $(cur_li).find(".belongRegionId").val();

          /**详细地址**/
          var addressDesc = $(cur_li).find(".addressDesc").val();

          /**退出标识**/
          var exitFlag = true;

        if(_this.checkAddress(exchId,belongRegionId,addressDesc)){
            _this.$alert('地址不能为空', '提示', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
            return false;
          }
          /**遍历,循环取出value值并加以保存**/
          $(cur_li).find(".prod_id_prop").each(function () {
              var node = $(this);
              var jsonData = {};
              var serviceAttrList = [];
              jsonData.productId = node.attr("dataValue");
              jsonData.addressId = addressId;
              jsonData.exchId = exchId;
              jsonData.belongRegionId = belongRegionId;
              jsonData.addressDesc = addressDesc;

              lst_basic.addressId = addressId;
              lst_basic.exchId = exchId;
              lst_basic.belongRegionId = belongRegionId;
              lst_basic.addressDesc = addressDesc;

              if(node.attr("dataValue") == '201' || node.attr("dataValue") == '204'){
                /**基本信息以(201)及装机相关信息(204),注意:客户联系人、联系电话以及预约起租时间的展示是放在装机相关信息里面的
                 * 但是, 送接口的时候是放在基础信息里面送**/
                if(node.attr("dataValue") == '201'){
                    lst_basic.productId = node.attr("dataValue");
                    /**处理资源池信息**/
                    node.find("select").each(function () {
                    var sel = $(this);
                    var tmp = {};
                    tmp.attrId = $(sel).attr("dataValue");
                    tmp.attrValue = $(sel).val();
                    serviceAttrList_basic.push(tmp);
                  });
                }else{
                    /**客户联系人,联系电话**/
                    node.find(".item-in input").each(function () {
                    var input = $(this);
                    var tmp = {};

                    if(($(input).val() == "") || ($(input).val() == null)){
                      exitFlag = false;
                    }

                    tmp.attrId = $(input).attr("dataValue");
                    tmp.attrValue =  $(input).val();
                    serviceAttrList_basic.push(tmp);
                  });

                  /**预约时间**/
                  node.find(".el-data-editor").each(function () {
                      var editor = this;
                      var tmp = {};
                      tmp.attrId = $(editor).attr("dataValue");
                      tmp.attrValue =  _this.rentTime;
                      serviceAttrList_basic.push(tmp);
                  });
                }
              }else if(node.attr("dataValue") == '203'){
                /**线路配置拼装**/
                /**线路配置部分,遍历所有的select**/
                node.find("select").each(function () {
                  var sel = $(this);
                  var tmp = {};
                  tmp.attrId = $(sel).attr("dataValue");
                  tmp.attrValue = $(sel).val();
                  serviceAttrList.push(tmp);
                });
                jsonData.serviceAttrList = serviceAttrList;
                productAttrList.push(jsonData);
                jsonData.amount = configure_price;
              }else{
                /**一次性费用拼装**/
                var txt = $(node).find(".price-one-r input").val();
                jsonData.amount = txt;
                jsonData.serviceAttrList = [];
                productAttrList.push(jsonData);
              }
          })

        if(!exitFlag){
          _this.$alert('联系人以及联系电话不能为空!', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
          return false;
        }
        let hasinputerror = $(el).parents('.item-li').attr('data-hasinputerror');
        if(hasinputerror == 'true'){
          _this.$alert('存在输入格式错误，请先根据提示进行检查修改后再保存!', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
          return false;
        }

        lst_basic.serviceAttrList = serviceAttrList_basic;
        productAttrList.push(lst_basic);
        param.productAttrList = productAttrList;

        axios({
          method:'post',
          url:"/netCloudOrder/shoppingCartService/updateShoppingCart2",
          data:param,
        }).then(function (response) {
            if(response.data.code == '0'){
              _this.$alert('保存成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  return false;
                }
              });
            }else{
              _this.$alert('保存失败', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  return false;
                }
              });
            }
        })
      },


      priceShow:function(node){
        /**修改价格显示**/
        var once_charge = $(node).find(".price-one-r input").val();
        var conf_charge = $(node).find(".pro_price").val();
        var discount = $(node).find(".discount").val();
        var totalPrice = parseFloat((once_charge + conf_charge) * discount).toFixed(2);
        $(node).find(".totalPrice").text("￥" + totalPrice);
      },

      /**等级模式,接入速率,速率类型,付费方式,电路维护等级修改**/
      propChange:function (item,event) {
          var _this = this;
          var el = event.currentTarget;

          /**对应的父元素标签**/
          var cur_li = $(el).parents(".item-li");

          /**根据标签类型判断**/
          if($(el).attr("dataValue") == "128"){
            /**等级模式**/
            var txt = $(el).find("option:selected").text();
            var node = $(el).parents("li").find(".conf-r").find(".QoS-level");
            $(node).text(txt);
          }else if($(el).attr("dataValue") == "129"){
            /**CE接入速率(影响价格)**/
            var txt = $(el).find("option:selected").text();
            var node =  $(el).parents("li").find(".conf-r").find(".ce-speed");
            $(node).text(txt);
            _this.getPrice(item.cartItemId);
            $(node).find(".totalPrice").text("￥" + totalPrice);

            /**修改隐藏价格显示**/
            $(cur_li).find(".hiddenPrice").val(totalPrice);
            /**修改总价格**/
            _this.modifyTotalPrice();

          }else if($(el).attr("dataValue") == "140"){
            /**速率类型**/
            var txt = $(el).find("option:selected").text();
            var node =  $(el).parents("li").find(".conf-r").find(".speed-type");
            $(node).text(txt);
            _this.getPrice(item.cartItemId);

            var once_charge = $(node).find(".price-one-r input").val();
            var conf_charge = $(node).find(".pro_price").val();
            var discount = $(node).find(".discount").val();
            var totalPrice = parseFloat((once_charge + conf_charge) * discount).toFixed(2);
            $(node).find(".totalPrice").text("￥" + totalPrice);

            /**修改隐藏价格显示**/
            $(cur_li).find(".hiddenPrice").val(totalPrice);
            /**修改总价格**/
            _this.modifyTotalPrice();

          }else if($(el).attr("dataValue") == "135"){
            /**付费方式**/
            var txt = $(el).find("option:selected").text();
            var node =  $(el).parents("li").find(".conf-r").find(".pay-type");
            $(node).text(txt);
          }else if($(el).attr("dataValue") == "127"){
            /**维护等级**/
            var txt = $(el).find("option:selected").text();
            var node =  $(el).parents("li").find(".conf-r").find(".maintain-level");
            $(node).text(txt);
            _this.getPrice(item.cartItemId);

            var once_charge = $(node).find(".price-one-r input").val();
            var conf_charge = $(node).find(".pro_price").val();
            var discount = $(node).find(".discount").val();
            var totalPrice = parseFloat((once_charge + conf_charge) * discount).toFixed(2);
            $(node).find(".totalPrice").text("￥" + totalPrice);

            /**修改隐藏价格显示**/
            $(cur_li).find(".hiddenPrice").val(totalPrice);
            /**修改总价格**/
            _this.modifyTotalPrice();
          }
      },

      /**删除购物车**/
      deleteCart:function (index,item,event) {
          var _this = this;
          var el = event.currentTarget;
          var node = $(el).parent().parent().parent();
          /**获取需要删除的购物车id**/
          var cartItemId = item.cartItemId;

          this.$alert('是否删除对应的购物车!','提示',{
          confirmButtonText: '确定',
          callback: action => {
            axios({
              method:'post',
              url:'/netCloudOrder/shoppingCartService/deleteShopCartItem',
              data:{
                cartItemId:cartItemId,
              },
            }).then(res =>{
                /**删除成功**/
                if(res.data.code == "0"){
                      this.$alert('删除成功', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                      });
                      /**去除对应的dom元素节点**/
                     node.remove();
                    _this.modifyTotalPrice();
                   }
              })
            }
        });
      },

      /**线路配置展开**/
      showConfInfo:function(event){
          var _this = this;
          var el = event.currentTarget;
          var target = $(el).parent().find(".IPRAN-conf");
          if($(target).css("display") == "none"){
            $(target).css("display","block");
            this.isUp=true;
          }else{
            $(target).css("display","none");
            this.isUp=false;
      }
      },

      /**一次性费用展开**/
      showExpense:function (event) {
        var _this = this;
        var el = event.currentTarget;
        var target = $(el).parent().find(".IPRAN-price-one");

        if($(target).css("display") == "none"){
            $(target).css("display","block");
            this.isUpTwo=true;
        }else{
            $(target).css("display","none");
            this.isUpTwo=false;
        }
      },

      toggle:function(){
        this.isShow = !this.isShow;
      },

      //获取产品价格
      getPrice:function(item_cartItemId){
        var that = this;
        var result = '';
        //先确定在操作的购物车对应的li项，保存在cur_li中
        var cur_li = $("input[type='hidden'][value="+item_cartItemId+"]").parent().parent().parent('li');
        var confList = {
          "productInfoList": [// 产品信息集合
            {
              "productInfo": {// 产品信息
                "product": {// 产品信息
                  "prodId": 201// 产品ID
                },
                "objectAttr": [
                  {
                    "objAttrId": 123,// 对象属性ID
                    "objAttVal": cur_li.find("select[datavalue='123']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  }
                ]
              }
            },
            {
              "productInfo": {// 产品信息
                "product": {// 产品信息
                  "prodId": 203// 产品ID
                },
                "objectAttr": [
                  {
                    "objAttrId": 128,// 对象属性ID
                    "objAttVal": cur_li.find("select[datavalue='128']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  },
                  {
                    "objAttrId": 129,// 对象属性ID
                    "objAttVal": cur_li.find("select[datavalue='129']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  },
                  {
                    "objAttrId": 140,// 对象属性ID
                    "objAttVal": cur_li.find("select[datavalue='140']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  }
                  ,
                  {
                    "objAttrId": 135,// 对象属性ID
                    "objAttVal": cur_li.find("select[datavalue='135']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  },
                  {
                    "objAttrId": 127,// 对象属性ID
                    "objAttVal": cur_li.find("select[datavalue='127']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  },
                  {
                    "objAttrId": 138,// 对象属性ID
                    "objAttVal": cur_li.find("select[datavalue='138']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  },
                  {
                    "objAttrId": 136,// 对象属性ID
                    "objAttVal": cur_li.find("select[datavalue='136']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  },
                  {
                    "objAttrId": 137,// 对象属性ID
                    "objAttVal": cur_li.find("select[datavalue='137']").find("option:selected").text()// 对象属性选用值(页面选择的参数值)
                  }
                ]
              }
            }
          ]
        };
        axios({
          method:'post',
          url:"/netCloudOffer/priceDefService/getObjAttrPrice",
          data:confList,
        }).then(function (response) {
          let lst = response.data.data;
          let code = response.data.code;
          if(code == '0'){
            let profPrice = parseFloat(lst.productInfoList[0].price) + parseFloat(lst.productInfoList[1].price);
            cur_li.find('span.pro_price').html(profPrice);
            cur_li.find('input.configure-price').val(profPrice);

            /**修改金额的值**/
            var once_charge = parseFloat($(cur_li).find(".price-one-r input").val());
            var discount = parseFloat($(cur_li).find(".discount").val());
            profPrice = parseFloat(profPrice);

            var totalPrice = parseFloat((once_charge + profPrice) * discount).toFixed(2);
            $(cur_li).find(".totalPrice").text("￥" + totalPrice);

            /**设置隐藏价格**/
            $(cur_li).find(".hiddenPrice").val(totalPrice);
          }
        }).catch(err =>{
        })
      },

      /**input输入框修改**/
      inputChange:function (item,event) {
        var _this = this;
        var el = event.currentTarget;

        /**找到父元素标签**/
        var cur_li = $(el).parents(".item-li");

        var discount = $(el).val();

        /**校验折扣是否合法**/
        if(! _this.checkDiscount(discount)){
          _this.$alert('折扣必须在1到0.65之间,请重新输入!', '提示', {
            confirmButtonText: '确定',
            callback:action=>{
            }
          });

          $(el).val("0.7");
          $(cur_li).find(".totalPrice").text(parseFloat(item.amount * 0.7).toFixed(2));
          return false;
        }
        discount = parseFloat(discount);

        if(item.amount != null){

          var price = parseFloat(item.amount);

          var totalPrice = parseFloat(price * discount).toFixed(2);

          $(cur_li).find(".totalPrice").text( totalPrice);

        }else{
          $(cur_li).find(".totalPrice").text("0");
        }
      },

      /**校验折扣是否合法**/
      checkDiscount:function(disCount){
        if(isNaN(disCount)){
          return false;
        }

        var disCountNumber = parseFloat(disCount);

        if(disCountNumber > 1 || disCountNumber < 0.65){
          return false;
        }
        return true;
      },

      /**折扣修改**/
      discountChange:function(event){
        var _this = this;
        var el = event.currentTarget;

        /**找到父元素标签**/
        var cur_li = $(el).parents(".item-li");

        /**云主机折扣修改**/
        if($(cur_li).find(".inputOfferId").val() == "261"){

          var once_charge = parseFloat($(cur_li).find(".price-one-r input").val());
          var discount = parseFloat($(cur_li).find(".discount").val());
          var profPrice = parseFloat($(cur_li).find(".conf-box-price").find(".pro_price").text());


          var totalPrice = parseFloat((once_charge + profPrice) * discount).toFixed(2);
          $(cur_li).find(".totalPrice").text("￥" + totalPrice);

          var node = $(cur_li).find("input[type='checkbox']");

          /**修改隐藏域价格**/
          $(cur_li).find(".hiddenPrice").val(totalPrice);

          /**修改总价格**/
          if($(node).prop("checked")){
            _this.modifyTotalPrice();
          }
        /**畅捷通产品折扣修改**/
        }else{
          /**折扣**/
          var discount = parseFloat($(cur_li).find(".discount").val());
          /**总价格**/
          var price = parseFloat($(cur_li).find(".hiddenPrice").val());
          var totalPrice = parseFloat(price * discount).toFixed(2);
          $(cur_li).find(".totalPrice").text("￥" + totalPrice);
        }
      },

      /**计算总价**/
      modifyTotalPrice:function () {
          var sumPrice = "0";
          $(".item-li").each(function () {
              var node = this;
              /**计算总价**/
              if($(node).find("input[type='checkbox']").prop("checked")){
                  sumPrice = parseFloat(sumPrice) + parseFloat($(node).find(".hiddenPrice").val());
              }
          });
          sumPrice = parseFloat(sumPrice).toFixed(2);
          $(".sumPrice").text(sumPrice);
      },

      /**修改一次性费用**/
      onceChargeChange:function (event) {
        var _this = this;
        var el = event.currentTarget;

        let value = $(el).val();
        if (!value) {
          _this.callBackFunc(event,'不能为空');
        }else{
          let re1 = /^\d+(\.{0,1}\d+){0,1}$/ ;
          if (!re1.test(value)) {
            _this.callBackFunc(event,'只能为数字');
          } else {
            _this.callBackFunc(event,'');
            /**输入为数字,计算价格变动**/
            var cur_li = $(el).parents(".item-li");
            var once_charge = parseFloat($(cur_li).find(".price-one-r input").val());
            var conf_charge = parseFloat($(cur_li).find(".conf-box-price").find(".pro_price").text());
            var discount = parseFloat($(cur_li).find(".discount").val());
            var totalPrice = parseFloat((once_charge + conf_charge) * discount).toFixed(2);
            $(cur_li).find(".totalPrice").text("￥" + totalPrice);
            /**修改隐藏价格显示**/
            $(cur_li).find(".hiddenPrice").val(totalPrice);

            /**修改总价格**/
            _this.modifyTotalPrice();
          }
        }
      },

      /*********验证********************************************/
      //提示语和红边框提示
      callBackFunc:function(event,tip){
        let _this = this;
        let el = event.currentTarget;
        if($(el).parent().find('.has-tip').length > 0){
          $(el).parent().find('.has-tip').html(tip);
        }else{
          let tip_html = "<div class='has-tip' style='position:absolute;left:0;top:30px;font-size: 12px;color:red;'>"+tip+"</div>";
          $(el).parent().append(tip_html);
        }
        if(tip){
          $(el).addClass('red-border');
          $(el).parents(".item-li").attr("data-hasinputerror",true);
        }else{
          $(el).removeClass('red-border');
          $(el).parents(".item-li").attr("data-hasinputerror",false);
        }
      },
      checkPhone:function(event){
        let el = event.currentTarget;
        let value = $(el).val();
        if (!value) {
          this.callBackFunc(event,'联系电话不能为空');
        }else{
          let re1 = /^1\d{10}$/;
          let re2 = /^0\d{2,3}-?\d{7,8}$/;
          if (!re1.test(value) && !re2.test(value)) {
            this.callBackFunc(event,'电话格式有误');
          } else {
            this.callBackFunc(event,'');
          }
        }
      },
      /*******验证结束***************************************/
    },
  }
</script>
