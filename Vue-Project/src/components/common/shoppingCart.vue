<!-- 我的订单 -->
<template>
  <div class="page">
    <MyNav></MyNav>
    <div>
      <!-- 模态框（Modal） skyCloud-->
      <div class="modal fade" id="skyCloud_modal" tabindex="-1" role="dialog" aria-labelledby="skyCloud_modalLabel" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-add-dialog">
          <div class="modal-content modal-add-content">
            <div class="modal-header modal-add-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
              <h4 class="modal-title" id="skyCloud_modalLabel">天翼云产品配置选择</h4>
            </div>
            <div class="modal-body">
              <div class="top-configure">
                <div class="left-operate">
                  <div class="config-part">
                    <div class="config-part-check">
                      <input type="checkbox" />
                    </div>
                    <div class="config-part-right">
                      <span class="config-p-r-title">基础信息</span>
                      <div class="config-p-r-content">
                        <span class="config-label">*资源中心：</span>
                        <div class="config-chose"><span :class="{active:item.activeOrNot}" v-for="(item,index) in resourceCenter" @click="changeActive(index,resourceCenter)">{{item.span}}</span></div>
                      </div>
                      <div class="config-p-r-content">
                        <span class="config-label">*vCPU：</span>
                        <div class="config-chose"><span :class="{active:item.activeOrNot}" v-for="(item,index) in vCPU" @click="changeActive(index,vCPU)">{{item.span}}</span></div>
                      </div>
                      <div class="config-p-r-content">
                        <span class="config-label">*内存：</span>
                        <div class="config-chose"><span :class="{active:item.activeOrNot}" v-for="(item,index) in memory" @click="changeActive(index,memory)">{{item.span}}</span></div>
                      </div>
                      <div class="config-p-r-content">
                        <span class="config-label">*镜像类型：</span>
                        <div class="config-chose"><span :class="{active:item.activeOrNot}" v-for="(item,index) in mirrorType" @click="changeActive(index,mirrorType)">{{item.span}}</span></div>
                      </div>
                      <div class="config-p-r-content">
                        <span class="config-label">*镜像：</span>
                        <div class="config-chose">
                          <select class="jx-select">
                            <option value="1">普通OI</option>
                          </select>
                        </div>
                      </div>
                      <div class="config-p-r-content">
                        <span class="config-label">*磁盘：</span>
                        <div class="config-chose">
                          <div class="cc-one">
                            <span>系统盘</span>
                            <select class="xtp-select">
                              <option value="1">普通OI</option>
                            </select>
                            <span>15G</span>
                          </div>
                          <div class="cc-one">
                            <span>系统盘</span>
                            <select class="cp-select">
                              <option value="1">普通OI</option>
                            </select>
                            <select class="cp-select">
                              <option value="1">15G</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="config-part">
                    <div class="config-part-check">
                      <input type="checkbox" />
                    </div>
                    <div class="config-part-right">
                      <span class="config-p-r-title">网络<span class="tip">如有互联网访问需求。。。</span></span>
                      <div class="config-p-r-content">
                        <span class="config-label">*弹性IP：</span>
                        <div class="config-chose">
                          <span :class="{active:item.activeOrNot}" v-for="(item,index) in flexibleIP" @click="changeActive(index,flexibleIP)">{{item.span}}</span>
                          <div class="tip">自动为每台云主机分配独享宽带的弹性IP</div></div>
                      </div>
                      <div class="config-p-r-content">
                        <span class="config-label">*规格：</span>
                        <div class="config-chose">
                          <div class="cc-one">
                            <input type="checkbox" />
                            <span>电信线路</span>
                          </div>
                        </div>
                      </div>
                      <div class="config-p-r-content">
                        <span class="config-label">*计费模式：</span>
                        <div class="config-chose">
                          <div class="cc-one">
                            <input type="checkbox" />
                            <span>按宽带计费</span>
                          </div>
                        </div>
                      </div>
                      <div class="config-p-r-content">
                        <span class="config-label">*带宽：</span>
                        <div class="config-chose">
                          <select class="jx-select">
                            <option value="1">1M</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="config-part">
                    <div class="config-part-check">
                      <input type="checkbox" />
                    </div>
                    <div class="config-part-right">
                      <span class="config-p-r-title">购买量</span>
                      <div class="config-p-r-content">
                        <span class="config-label">*购买时长：</span>
                        <div class="config-chose">
                          <select class="jx-select">
                            <option value="1">1个月</option>
                          </select>
                        </div>
                      </div>
                      <div class="config-p-r-content">
                        <span class="config-label">*购买数量：</span>
                        <div class="config-chose">
                          <select class="jx-select">
                            <option value="1">1台</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="right-show">
                  <span class="show-title">当前配置</span>
                  <div class="show-config"><span>可用分区：</span><span>内蒙节点1</span></div>
                  <div class="show-config"><span>云主机类型：</span><span>1核|1GB</span></div>
                  <div class="show-config"><span>镜像：</span><span>Ubuntn 12.04/64位</span></div>
                  <div class="show-config"><span>系统盘：</span><span>普通OI，15GB</span></div>
                  <div class="show-config"><span>数据盘：</span><span>普通OI，15GB</span></div>
                  <div class="show-config"><span>弹性IP：</span><span><p>规格：电信线路</p><p>计费模式：按宽带计费</p><p>宽带：2Mbit/s</p></span></div>
                  <div class="show-config"><span>购买时长：</span><span>1个月</span></div>
                  <div class="show-config"><span>购买数量：</span><span>1台</span></div>
                  <div class="show-bottom">
                    <span>配置费用</span>
                    <span>￥ 102元</span>
                    <span><button type="button" class="btn btn-primary">立即下单</button></span>
                  </div>
                </div>
              </div>
              <div class="bottom-confirm">
                <span>配置费用</span>
                <span>￥ 102元</span>
                <span class="confirm-add"><button type="button" class="btn btn-primary">立即下单</button><input type="checkbox"/><span>我已阅读，理解并接受<a href="#">《天翼云主机租用协议》</a><a href="#">《中国电信云业务镜像使用协议》</a></span></span>
              </div>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->
      <!-- 模态框（Modal） CJT-->
      <div class="modal fade" id="CJT_modal" tabindex="-1" role="dialog" aria-labelledby="CJT_modalLabel" aria-hidden="true" data-backdrop="static">
        <div class="modal-dialog modal-add2-dialog">
          <div class="modal-content modal-add-content">
            <div class="modal-header modal-add-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
              <h4 class="modal-title" id="CJT_modalLabel">畅捷通t+产品配置选择</h4>
            </div>
            <div class="modal-body modal-add2-body">
              <div class="shoppingCart-box">
                <div class="shoppingCart-title movePaddding">
                  <span class="title-moduleGroup">模块组</span>
                  <span class="title-module">模块</span>
                  <span class="title-modulePrice">模块价格</span>
                  <span class="title-sitePrice">站点价格</span>
                  <span class="title-siteAmount">站点数</span>
                  <span class="title-moduleGroupPrice">模块组价格</span>
                </div>
                <div class="shoppingCart-list" id="check_list">
                  <div class="list-item  border-bottom" >
                    <div class="info-cell info-moduleGroup">
                      <input class="check-item financeFlag" type="checkbox" data-type="financeFlag" @click="check_all($event)"/>
                      <span>财务管理</span>
                    </div>
                    <div class="info-cell info-module">
                      <div><input class="check-item financeFlag" type="checkbox" /><span>总账</span></div>
                      <div><input class="check-item financeFlag" type="checkbox" /><span>T-UFO</span></div>
                      <div><input class="check-item financeFlag" type="checkbox" /><span>出纳管理</span></div>
                      <div><input class="check-item financeFlag" type="checkbox" /><span>固定资产</span></div>
                    </div>
                    <div class="info-cell info-modulePrice">
                      <span>8888.00</span>
                      <span>3888.00</span>
                      <span>3888.00</span>
                      <span>3888.00</span>
                    </div>
                    <div class="info-cell info-sitePrice">
                      <span>每增加一站点增3800元</span>
                    </div>
                    <div class="info-cell info-siteAmount">
                      <div class="item-amount">
                        <a href="#" v-bind:class="{'minus':CJTConfigure.finance.amount !== 1,'no-minus':CJTConfigure.finance.amount == 1}" v-on:click="minusOrPlusTheAmount('-',CJTConfigure.finance,$event)">-</a>
                        <input type="text" style="text-align: center" class="form-control" v-model="CJTConfigure.finance.amount" v-on:input="controlContent(CJTConfigure.finance,$event)" />
                        <a href="#" v-bind:class="{'plus':CJTConfigure.finance.amount !== 100,'no-plus':CJTConfigure.finance.amount == 100}"v-on:click="minusOrPlusTheAmount('+',CJTConfigure.finance,$event)">+</a>
                      </div>
                    </div>
                    <div class="info-cell info-moduleGroupPrice">
                      <span>￥{{CJTConfigure.finance.moduleGroupPrice}}</span>
                    </div>
                  </div>
                  <div class="list-item border-bottom" >
                    <div class="info-cell info-moduleGroup">
                      <input class="check-item firmFlag" type="checkbox"  data-type="firmFlag" @click="check_all($event)"/>
                      <span>业务管理</span>
                    </div>
                    <div class="info-cell info-module">
                      <div><input class="check-item firmFlag" type="checkbox" /><span>购销管理</span></div>
                      <div><input class="check-item firmFlag" type="checkbox" /><span>库存核算</span></div>
                    </div>
                    <div class="info-cell info-modulePrice">
                      <span>16800</span>
                      <span>9800</span>
                    </div>
                    <div class="info-cell info-sitePrice">
                      <span>每增加一站点增5800元</span>
                    </div>
                    <div class="info-cell info-siteAmount">
                      <div class="item-amount">
                        <a href="#" v-bind:class="{'minus':CJTConfigure.firm.amount !== 1,'no-minus':CJTConfigure.firm.amount == 1}" v-on:click="minusOrPlusTheAmount('-',CJTConfigure.firm,$event)">-</a>
                        <input type="text" style="text-align: center" class="form-control" v-model="CJTConfigure.firm.amount" v-on:input="controlContent(CJTConfigure.firm,$event)" />
                        <a href="#" v-bind:class="{'plus':CJTConfigure.firm.amount !== 100,'no-plus':CJTConfigure.firm.amount == 100}"v-on:click="minusOrPlusTheAmount('+',CJTConfigure.firm,$event)">+</a>
                      </div>
                    </div>
                    <div class="info-cell info-moduleGroupPrice">
                      <span>￥{{CJTConfigure.firm.moduleGroupPrice}}</span>
                    </div>
                  </div>
                </div>
                <div class="shoppingCart-submit">
                  <span>应付款： ￥710.40</span>
                  <span class="out-of-btsubmit"><span class="bt-order-submit">提交订单</span></span>
                </div>
              </div>
            </div>
          </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
      </div>
      <!-- /.modal -->
    </div>
    <div class="myOrder-container">
      <div class="shoppingCart-topLine">
        <span class="shoppingCart-topLine-title">张三的购物车</span>
      </div>
      <div class="shoppingCart-box">
        <div class="shoppingCart-title">
          <span class="select-all"><input type="checkbox" id="check_all" @click="check_all($event)"/></span>
          <span class="title-productName">商品名称</span>
          <span class="title-payWay">付费方式</span>
          <span class="title-buyCycle">购买周期</span>
          <span class="title-amount">数量</span>
          <span class="title-money">资费</span>
          <span class="title-discount">优惠折扣</span>
          <span class="title-operate">操作</span>
        </div>
        <div class="shoppingCart-list">
          <div class="list-items">
            <div class="list-items-logo">
              <div class="info-cell info-select"><input class="check-item" type="checkbox" data-type="skyClouldFlag"  v-on:click="check_all($event)" /></div>
              <div class="info-cell info-logo">
                <img src="../../assets/img/shoppingcart_logo.jpg"/>
                <span>天翼云商家</span>
              </div>
            </div>
            <div class="list-item" v-for="(item,index) in skyCloudData">
              <div class="info-cell info-select"><input class="check-item skyClouldFlag" type="checkbox" /></div>
              <div class="info-cell info-productName">
                <div class="productName-h">{{item.product.name}}</div>
                <a class="configuration" data-toggle="modal" data-target="#skyCloud_modal">规格配置</a>
              </div>
              <div class="info-cell info-payWay">
                <select class="select-after-label form-control" v-model="item.wayToPay">
                  <option value="1">一次性付款</option>
                  <option value="2">包年</option>
                  <option value="3">包月</option>
                </select>
              </div>
              <div class="info-cell info-buyCycle">
                <select class="select-after-label form-control" v-model="item.buyingCycle">
                  <option value="1">永久</option>
                  <option value="2">按年</option>
                  <option value="3">按月</option>
                </select>
              </div>
              <div class="info-cell info-amount">
                <div class="item-amount">
                  <a href="#" v-bind:class="{'minus':item.amount !== 1,'no-minus':item.amount == 1}" v-on:click="minusOrPlusTheAmount('-',item,$event)">-</a>
                  <input type="text" style="text-align: center" class="form-control" v-model="item.amount" v-on:input="controlContent(item,$event)" />
                  <a href="#" v-bind:class="{'plus':item.amount !== 100,'no-plus':item.amount == 100}"v-on:click="minusOrPlusTheAmount('+',item,$event)">+</a>
                </div>
                <div class="item-amount-tip">
                  有货
                </div>
              </div>
              <div class="info-cell info-money">
                <span>￥{{item.money}}</span>
              </div>
              <div class="info-cell info-discount">
                <select class="select-after-label form-control" v-model="item.discount">
                  <option value="1">95折</option>
                  <option value="2">85折</option>
                  <option value="3">75折</option>
                </select>
              </div>
              <div class="info-cell info-operate">
                <span class="bt-delete">删除</span>
              </div>
            </div>
          </div>
          <div class="list-items">
            <div class="list-items-logo">
              <div class="info-cell info-select"><input class="check-item" type="checkbox"  data-type="CJTType"  v-on:click="check_all($event)" /></div>
              <div class="info-cell info-logo">
                <img src="../../assets/img/shoppingcart_logo.jpg"/>
                <span>畅捷通商家</span>
              </div>
            </div>
            <div class="list-item" v-for="(item2,index) in CJTData">
              <div class="info-cell info-select"><input class="check-item CJTType" type="checkbox" /></div>
              <div class="info-cell info-productName">
                <div class="productName-h">{{item2.product.name}}</div>
                <a class="configuration" data-toggle="modal" data-target="#CJT_modal">规格配置</a>
              </div>
              <div class="info-cell info-payWay">
                <select class="select-after-label form-control" v-model="item2.wayToPay">
                  <option value="1">一次性付款</option>
                  <option value="2">包年</option>
                  <option value="3">包月</option>
                </select>
              </div>
              <div class="info-cell info-buyCycle">
                <select class="select-after-label form-control" v-model="item2.buyingCycle">
                  <option value="1">永久</option>
                  <option value="2">按年</option>
                  <option value="3">按月</option>
                </select>
              </div>
              <div class="info-cell info-amount">
                <div class="item-amount">
                  <a href="#" v-bind:class="{'minus':item2.amount !== 1,'no-minus':item2.amount == 1}" v-on:click="minusOrPlusTheAmount('-',item2,$event)">-</a>
                  <input type="text" style="text-align: center" class="form-control" v-model="item2.amount" v-on:input="controlContent(item2,$event)" />
                  <a href="#" v-bind:class="{'plus':item2.amount !== 100,'no-plus':item2.amount == 100}"v-on:click="minusOrPlusTheAmount('+',item2,$event)">+</a>
                </div>
                <div class="item-amount-tip">
                  有货
                </div>
              </div>
              <div class="info-cell info-money">
                <span>￥{{item2.money}}</span>
              </div>
              <div class="info-cell info-discount">
                <select class="select-after-label form-control" v-model="item2.discount">
                  <option value="1">95折</option>
                  <option value="2">85折</option>
                  <option value="3">75折</option>
                </select>
              </div>
              <div class="info-cell info-operate">
                <span class="bt-delete">删除</span>
              </div>
            </div>
          </div>
        </div>
        <div class="shoppingCart-submit">
          <span>应付款： ￥710.40</span>
          <span class="out-of-btsubmit"><span class="bt-order-submit">提交订单</span></span>
        </div>
      </div>
    </div>
    <MyFooter></MyFooter>
  </div>
</template>

<script>
  import MyNav from '../common/MyNav.vue';
  import MyFooter from '../common/MyFooter.vue';
  import axios from 'axios';
  export default{
    components:{
      MyNav,
      MyFooter,
    },
    data(){
      return{
        skyCloudData:[
          {
            "product":{
              "type": 1,
              "name": '云服务器ECS（包年包月）',
              "kyfq": '内蒙节点1',
              "yzjlx": '1核|1GB',
              "xtp": '15GB 高IO',
              "sjp": '40GB 高IO',
              "txIP":{
                "gg": '电信线路',
                "jfms": '按宽带计费',
                "kd": '2M',
              },
              "jx": 'Windows Server 2016 数据中心版 64位中文版',
              "aqjg": '免费开通',
              "mm": '已设置',
            },
            "wayToPay": '1',
            "buyingCycle": '1',
            "amount": '1',
            "unitPrice": 888.00,
            "money": 888.00,
            "discount": 1
          },
          {
            "product":{
              "type": 1,
              "name": '云服务器ECS（包年包月）',
              "kyfq": '内蒙节点1',
              "yzjlx": '1核|1GB',
              "xtp": '15GB 高IO',
              "sjp": '40GB 高IO',
              "txIP":{
                "gg": '电信线路',
                "jfms": '按宽带计费',
                "kd": '2M',
              },
              "jx": 'Windows Server 2016 数据中心版 64位中文版',
              "aqjg": '免费开通',
              "mm": '已设置',
            },
            "wayToPay": '1',
            "buyingCycle": '1',
            "amount": '1',
            "unitPrice": 888.00,
            "money": 888.00,
            "discount": 1
          }
        ],
        CJTData:[
          {
            "product":{
              "type": 2,
              "name": '畅捷通T1标准版',
            },
            "wayToPay": '2',
            "buyingCycle": '2',
            "amount": '1',
            "unitPrice": 888.00,
            "money": 888.00,
            "discount": 1
          },
          {
            "product":{
              "type": 2,
              "name": '畅捷通T1标准版',
            },
            "wayToPay": '2',
            "buyingCycle": '2',
            "amount": '1',
            "unitPrice": 888.00,
            "money": 888.00,
            "discount": 1
          }
        ],
        //**************************以*下*是畅捷通配置中选择项数据*********************
        CJTConfigure:{
          "finance":{
            "amount": '1',
            "unitPrice": 338,
            "moduleGroupPrice": 338
          },
          "firm":{
            "amount": '1',
            "unitPrice": 338,
            "moduleGroupPrice": 338
          }
        },
        //**************************以*上*是畅捷通配置中选择项数据*********************

        //**************************以*下*是天翼云配置中选择项数据*********************
        //资源中心
        resourceCenter:[
          {
            "span": '内蒙古节点',
            "activeOrNot": 0
          },
          {
            "span": '香港及海外',
            "activeOrNot": 1
          }
        ],
        //vCPU
        vCPU:[
          {
            "span": '1核',
            "activeOrNot": 1
          },
          {
            "span": '2核',
            "activeOrNot": 0
          },
          {
            "span": '4核',
            "activeOrNot": 0
          },
          {
            "span": '8核',
            "activeOrNot": 0
          },
          {
            "span": '16核',
            "activeOrNot": 0
          }
        ],
        //内存
        memory:[
          {
            "span": '1G',
            "activeOrNot": 1
          },
          {
            "span": '2G',
            "activeOrNot": 0
          },
          {
            "span": '4G',
            "activeOrNot": 0
          }
        ],
        //镜像类型
        mirrorType:[
          {
            "span": '公共镜像',
            "activeOrNot": 1
          },
          {
            "span": '镜像市场',
            "activeOrNot": 0
          }
        ],
        //弹性IP
        flexibleIP:[
          {
            "span": '自动分配',
            "activeOrNot": 1
          },
          {
            "span": '不使用',
            "activeOrNot": 0
          }
        ]
        //**************************以*上*是天翼云配置中选择项数据*********************
      }
    },
    methods:{
      //全选全不选
      check_all: function(event){
        var el = event.currentTarget;
        if(el.checked && $(el).attr("id") == "check_all"){
          //全选
          $("input[type=checkbox].check-item").prop("checked", true);
        }else if(!(el.checked) && $(el).attr("id") == "check_all"){
          //全不选
          $("input[type=checkbox].check-item").prop("checked", false);
        }else if(el.checked && $(el).attr("id") !== "check_all"){
          //天翼云或是畅捷通的全选
          var flag = $(el).attr('data-type');
          $("input[type=checkbox]."+flag).prop("checked", true);
        }else if(!el.checked && $(el).attr("id") !== "check_all"){
          //天翼云或是畅捷通的全不选
          var flag = $(el).attr('data-type');
          $("input[type=checkbox]."+flag).prop("checked", false);
        }
      },
      //数量input输入时确保输入为1到max_amount间的数字。
      controlContent:function(item,event){
        var max_amount = 100;
        var el = event.currentTarget;
        var amount_input = $(el).val();
        console.log(isNaN(amount_input));
        if(isNaN(amount_input)){
          console.log('in a');
          item.amount = 1;
        }else if(amount_input < 1){
          console.log('in b');
          item.amount = 1;
        }else if(amount_input > max_amount){
          console.log('in c');
          item.amount = max_amount;
        }else{
          console.log('in d');
          item.amount = amount_input;
          console.log('in d:'+item.amount);
        }
        item.money = item.amount * item.unitPrice;
        item.moduleGroupPrice = item.amount * item.unitPrice;

      },
      //amount的加减
      minusOrPlusTheAmount:function(m_or_p,item,event){
        event.preventDefault();
        console.log("before minus "+item.amount)
        if(m_or_p == '-' && item.amount > 1){
          item.amount--;
        }else if(m_or_p == '+' && item.amount < 100){
          item.amount++;
        }
        item.money = item.amount * item.unitPrice;
        item.moduleGroupPrice = item.amount * item.unitPrice;
      },
      //天翼云配置中蓝色底色的条件的点选
      changeActive:function(indexa,activeData){
        activeData.forEach((item,index)=>{
          if(indexa == index){
            item.activeOrNot = 1;
          }else{
            item.activeOrNot = 0;
          }
        })
      }
    },
/*    created(){
     axios({
       url:'http://134.96.231.87:8094/NetCloudorder/shoppingCart/getCarts?',
       method:'post',
       params:{
         userId:"2",
         params:{
           pageSize:"5",
           pageNo:'1'
         }
       }
     }).then(response =>{

      console.log(response.data);


    }).catch(err =>{

      })

    }*/
  }

</script>

<style scoped lang="less">
  .clear{
    clear:both;
  }
  .page{
    width: 100%;
    background-color: #f6f6f6;
  }
  .myOrder-container{
    width:1290px;
    min-height:500px;
    margin:60px auto;
    padding:0;
    border:1px solid #f2f2f2;
    background-color: #fff;
  }
  .shoppingCart-topLine{
    width:100%;
    height:60px;
    border-bottom:1px solid #f2f2f2;
  }
  .shoppingCart-topLine-title{
    height:60px;
    padding-left:30px;
    display: block;
    line-height:60px;
    color:#318de7;
    font-size:18px;
  }
  .shoppingCart-box {
    width: 100%;
  }
  .shoppingCart-title{
    height:60px;
    padding:0 30px;
    background-color: #fafafa;
    color:#333;
    font-weight: 600;
    font-size:18px;
    span{
      line-height:60px;
      padding:0 5px;
      display: inline-block;
      vertical-align:middle;
      text-align: center;

    }
    .select-all{
      padding-right:30px;
    }
    .title-productName{
      width:235px;
      text-align: left;
    }
    .title-payWay{
      width:195px;
    }
    .title-buyCycle{
      width:170px;
    }
    .title-amount{
      width:140px;
    }
    .title-money{
      width:130px;
    }
    .title-discount{
      width:170px;
    }
    .title-operate{
      width:100px;
      text-align: right;
    }
  }
  .shoppingCart-list{
    width:100%;
  }
  .list-items{
    height:auto;
    padding:10px 30px;
    border-bottom: 1px solid #ccc;
  }
  .list-items-logo{
    height:30px;
    line-height:30px;
    .info-logo{
      width:1130px;
      text-align: left;
      margin:0;
    }
  }
  .list-item {
    height: auto;
    margin:15px 0;
  }
  .info-cell{
    display: inline-block;
    vertical-align: top;
    text-align: center;
    padding: 0 5px;
    margin:0 20px;
  }
  .info-select{
    padding-right:30px;
    margin:0;
  }
  .info-productName{
    width:235px;
    text-align: left;
    margin:0;
  }
  .info-payWay{
    width:155px;
  }
  .info-buyCycle{
    width:130px;
  }
  .info-amount{
    width:100px;
  }
  .info-money{
    width:100px;
  }
  .info-discount{
    width:130px;
  }
  .info-operate{
    width:100px;
    text-align: right;
    margin:0;
    position: relative;
  }
  .productName-h{
    width:100%;
    font-size:14px;
    color:#333;
  }
  a.configuration{
    color:#017bec;
    font-size: 12px;
  }
  a.configuration:link,a.configuration:visited{
    color:#017bec;
  }
  .spmc-left,.spmc-right{
    width:40%;
    margin-right:8%;
    float:left;
    font-size:14px;
    div{
      margin:10px 0;
      white-space:nowrap;
      span{
        display: inline-block;
        vertical-align: top;
        white-space: normal;
        color:#666;
      }
      .span-label{
        color:#999;
      }
    }
  }
  .item-amount{
    width:90px;
    height:34px;
    input{
      width:50px;
      margin:0 5px;
      float:left;
    }
    .minus,.plus{
      width:15px;
      height:34px;
      float:left;
      line-height:34px;
      text-align: center;
      cursor: pointer;
    }
    .minus:hover,.plus:hover{
      color:red;
      background-color: #eee;
    }
    .no-minus,.no-plus{
      width:15px;
      height:34px;
      float:left;
      line-height:34px;
      text-align: center;
      color:#999;
      cursor: default;
    }
  }
  .item-amount-tip{
    color:#ccc;
    margin-top:3px;
  }
  .bt-delete{
    width:70px;
    height:30px;
    line-height:30px;
    text-align: center;
    display: block;
    position: absolute;
    right:0;
    -moz-border-radius: 5px; /* Firefox */
    -webkit-border-radius: 5px; /* Safari 和 Chrome */
    border-radius: 5px;
    background-color: #49bfff;
    color:#fff;
    font-size:14px;
  }

  .shoppingCart-submit{
    width:100%;
    padding:10px 30px;
    text-align: right;
    span{
      display: block;
      font-size:18px;
      margin:10px 0;
      color:#333;
    }
    .out-of-btsubmit{
      height:60px;
    }
    .bt-order-submit{
      width:110px;
      height:40px;
      -moz-border-radius: 5px; /* Firefox */
      -webkit-border-radius: 5px; /* Safari 和 Chrome */
      border-radius: 5px;
      display:block;
      float: right;
      text-align: center;
      line-height:40px;
      color:#fff;
      background-color: #49bfff;

    }
  }

  /****modal start ******/
  .modal-add-dialog{
    width:940px;
  }
  .modal-add2-dialog{
    width:785px;
  }
  .modal-add-content{
    border-radius:0;
  }
  .modal-add-header{
    height:60px;
    background-color: #347aea;
    color:#fff;
    text-align: center;
    button{
      color:#fff;
    }
  }
  .top-configure{
    height:560px;
    padding:10px 15px;
    .left-operate{
      width:545px;
      float:left;
    }
    .right-show{
      width:280px;
      height: 530px;
      margin:0 25px;
      padding:20px;
      border:1px solid #333;
      float:right;
    }
  }
  .tip{
    font-size:10px;
    color:#bfc1c4;
  }
  .config-part{
    width:100%;
    .config-part-check,.config-part-right{
      display: inline-block;
      vertical-align: top;
    }
    .config-part-check{
      width:30px;
      line-height: 25px;
    }
    .config-part-right{
      width:500px;
      .config-p-r-title{
        display: block;
        margin-bottom: 10px;
        line-height:25px;
        font-size:14px;
        color:#333;
        font-weight: bold;
        .tip{
          padding-left:10px;
          font-weight:normal;
        }
      }
      .config-p-r-content{
        margin-bottom:10px;
      }
      .config-p-r-content .config-label{
        width:70px;
        height:20px;
        margin-left:10px;
        display: inline-block;
        line-height:20px;
        text-align: left;
        vertical-align: top;
        color:#666;
        font-size:12px;
      }
      .config-p-r-content .config-chose{
        width:400px;
        line-height: 20px;
        display: inline-block;
        vertical-align: top;
        span{
          height:20px;
          padding:0 8px;
          display: block;
          float:left;
          border-top:1px solid #ccc;
          border-right:1px solid #ccc;
          border-bottom:1px solid #ccc;
          text-align: center;
          font-size: 12px;
          color:#000;
          cursor: default;
        }
        span:first-child{
          border-left:1px solid #ccc;
        }
        span.active{
          background-color: #55b9f0;
          color:#fff;
        }
        .jx-select{
          width:130px;
          font-size: 12px;
          margin:0 8px 0 0;
        }
        .cc-one{
          height:30px;
          span{
            border: 0px;
            padding:0 8px 0 0;
          }
          select{
            width:85px;
            margin:0 8px 0 0;
            float: left;
            font-size: 12px;
          }
          input{
            float: left;
            margin-right:8px;
          }
        }
        .tip{
          display: block;
          float:left;
          width:400px;
          line-height:30px;
        }
      }
    }
  }
  .show-title{
    display: block;
    width:100%;
    line-height: 30px;
    font-size:18px;
    color:#000;
  }
  .show-config{
    width:100%;
    span{
      display: inline-block;
      vertical-align: top;
      line-height: 35px;
      font-size:14px;
      color:#666;
      p{
        margin:0;
      }
    }
    span:first-child{
      color:#999;
      margin-right:15px;
    }
  }
  .show-bottom{
    width:100%;
    border-top:1px solid #999;
    span{
      display: block;
      width:100%;
      height:35px;
      line-height:35px;
      color:#000;
      font-size:18px;
    }
  }
  .bottom-confirm{
    height:140px;
    width:100%;
    padding-top:15px;
    padding-left:50px;
    span{
      display: block;
      width:100%;
      height:35px;
      line-height:35px;
      color:#000;
      font-size:18px;
    }
    .confirm-add input{
      margin:0 10px 0 20px;
    }
    .confirm-add span{
      display: inline;
      font-size: 10px;
      color:#333;
      a:link,a:visited,a:hover{
        color:blue;
      }
    }
  }


  /**************/
  .modal-add2-body{
    padding:0;
  }

  .movePaddding{
    padding:0;
  }
  .title-moduleGroup{
    width:105px;
    text-align: left;
  }
  .title-module{
    width:130px;
    text-align: left;
  }
  .title-modulePrice{
    width:120px;
  }
  .title-sitePrice{
    width:130px;
  }
  .title-siteAmount{
    width:130px;
  }
  .title-moduleGroupPrice{
    width:143px;
  }
  .info-moduleGroup{
    line-height:35px;
  }
  .info-modulePrice{
    margin:0 10px;
    span{
      display: block;
      width:100px;
      line-height:35px;
    }
  }
  .info-module{
    margin:0 10px;
    div{
      height:35px;
      line-height:35px;
      text-align: left;
      input{
        margin-right:8px;
      }
    }
  }
  .info-sitePrice{
    width:100px;
  }
  .border-bottom{
    padding-bottom: 10px;
    border-bottom: 1px solid #ccc;
  }

  /**********modal end*************/
</style>
