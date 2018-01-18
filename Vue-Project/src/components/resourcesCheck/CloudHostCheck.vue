<!-- 资源审核 -->
<template>
  <div class="whiteBg">
    <div class="w1200">
      <div class="base_info">
        <!--客户信息&&&客户经理信息-->
        <p class="clientInfo">客户信息</p>
        <div class="clientInfo-list clearfix">
          <section><label>客户类型：</label>{{custInfo.custType}}</section>
          <section><label>证件类型：</label>{{custInfo.certName}}</section>
          <section><label>证件号码：</label>{{custInfo.certNum}}</section>
          <section><label>客户地址：</label>{{custInfo.contactAddr}}</section>
          <section><label>联系电话：</label>{{custInfo.mobile}}</section>
        </div>
        <p class="clientInfo">客户经理信息</p>
        <div class="clientInfo-list clearfix">
          <section><label>客户经理：</label>{{custManagerInfo.name}}</section>
          <section><label>联系电话：</label>{{custManagerInfo.tel}}</section>
        </div>
      </div>
      <div class="out-of-product-part">
        <div class="out-of-product-part-l">
          <div class="product_part">
            <div class="product_bar clearfix">
              <span class="attr_name">订购类型</span>
              <div class="attr_val">
                <div class="input_wrap" v-for="(item,index) in select_data[143]">
                  <input type="radio" name="order_style" :value="index" v-model="main_data[241][143]">{{item}}
                </div>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">开通时间</span>
              <div class="attr_val clearfix">
                <div class="time_area clearfix">
                  <span class="minus" v-bind:class="{'no-minus':time_set.amount == 1}" v-on:click="minusOrPlusTheAmount('-',time_set,$event)">-</span>
                  <input v-model="time_set.amount" v-on:input="controlContent(time_set,$event)" >
                  <span class="plus" v-bind:class="{'no-plus':time_set.amount == 100}"v-on:click="minusOrPlusTheAmount('+',time_set,$event)">+</span>
                  <select v-model="time_set.type">
                    <option  v-for="(option,index) in select_data[179]"  :value="index">{{option}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">开通平台</span>
              <div class="attr_val">
                <ul class="val_list clearfix">
                  <li v-for="(item,index) in select_data[146]" :class="{active:main_data[241][146]==index}" @click="changeActive(index,main_data,241,146,item)">{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">资源池</span>
              <div class="attr_val">
                <ul class="val_list clearfix">
                  <li v-for="(item,key) in select_data[145]"
                      :class="{active:main_data[241][145]==key}"
                      :data-id="key"
                      @click="resChange(key)" >{{item}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="product_part">
            <div class="product_bar clearfix">
              <span class="attr_name">CPU(虚拟核数)</span>
              <div class="attr_val">
                <ul class="val_list clearfix">
                  <li v-for="(item,index) in select_data[147]" :class="{active:main_data[241][147]==index}" @click="changeActive(index,main_data,241,147,item);getPrice();" :data-value="index">{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">内存</span>
              <div class="attr_val">
                <ul class="val_list clearfix">
                  <li v-for="(item,index) in select_data[148]" :class="{active:main_data[241][148]==index}" @click="changeActive(index,main_data,241,148,item);getPrice();" :data-value="index">{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">镜像类型</span>
              <div class="attr_val">
                <ul class="val_list clearfix">
                  <li v-for="(item,index) in select_data[152]" :class="{active:main_data[241][152]==index}" @click="setmirror(index)">{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">镜像</span>
              <!--公有镜像-->
              <div class="attr_val" v-if="main_data[241][152] == '208'">
                <select class="jx_select" :data-value="main_data[241][207]" v-model="main_data[241][207]" @change="changeMirrorSys(main_data[241][207])">
                  <option v-for="option in mirror_type" :value="option">{{option}}</option>
                </select>
                <select class="jx_version" :data-id="main_data[241][153]" v-model="main_data[241][153]">
                  <option v-for="(option,index) in mirror_version" :value="index">{{option}}</option>
                </select>
              </div>
              <!--私有镜像-->
              <div class="attr_val" v-if="main_data[241][152] == '209'">
                <select class="jx_version" v-model="main_data[241][153]">
                  <option v-for="(option,index) in mirror_version" :value="index">{{option}}</option>
                </select>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">磁盘</span>
              <div class="attr_val">
                <div class="disk">
                  <span>系统盘</span>
                  <select v-model="main_data[241][149]">
                    <option v-for="(option,index) in select_data[149]" :value="index">{{option}}</option>
                  </select>
                  <span>{{main_data[241][183]}}G</span>
                </div>
                <div class="data_disk" v-if="data_disk_bool==true">
                  <div class="disk">
                    <span>数据盘</span>
                    <select v-model="main_data[241][150]" @change="getPrice();">
                      <option v-for="(option,index) in select_data[150]" :value="index">{{option}}</option>
                    </select>
                    <input type="number" min="10" v-model="main_data[241][151]" @blur="getPrice();">G
                  </div>
                  <span class="delete_disk" @click="deleteDisk();getPrice();">删除</span>
                </div>
                <div class="add_disk" v-if="data_disk_bool==false">
                  <a href="javascript:;" @click="addDisk"><span>+</span>新增一块数据盘</a>
                  <!--您还可以挂载9块磁盘（云硬盘）-->
                </div>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">虚拟私有云</span>
              <div class="attr_val">
                <!--选项-->
                <ul class="val_list clearfix">
                  <li v-for="(item,key) in select_data['210']" :class="{active:main_data['241']['210']==key}" @click="privateCloudChange(key)">{{item}}</li>
                </ul>
                <!--值-->
                <!--已有私有云-->
                <ul v-if="main_data['241']['210']=='246'" class="attr_list exist_list">
                  <li>
                    <span>虚拟私有云：</span>
                    <select v-model="main_data['241']['168']" @change="VPCChange">
                      <option v-for="(item,key) in VPCObj" :value="key">{{item}}</option>
                    </select>
                  </li>
                  <li>
                    <span>安全组：</span>
                    <select v-model="main_data['241']['206']">
                      <option v-for="(item,key) in securityGroupObj" :value="key">{{item}}</option>
                    </select>
                  </li>
                  <li>
                    <span>网卡：</span>
                    <select v-model="main_data['241']['205']">
                      <option v-for="(item,key) in networkCardObj" :value="key">{{item}}</option>
                    </select>
                    <p>自动分配IP地址</p>
                    <!--<input placeholder="自动分配IP地址" /><p>查看已有IP地址</p>-->
                  </li>
                </ul>
                <!--新增-->
                <ul v-if="main_data['241']['210']=='247'" class="attr_list add_attr_list">
                  <li>
                    <span>虚拟私有云：</span>
                    <input type="text" v-model="main_data['241']['165']" />
                  </li>
                  <li>
                    <span>子网范围：</span>
                    <input type="text" v-model="newVPC1" /> / <input v-model="newVPC2" type="text" style="width: 30px;" />
                  </li>
                  <li class="ps">可使用网段：10.0.0.0/8~24，172.16.0.0/12~24，192.168.0.0/16~24</li>
                </ul>
              </div>
            </div>
            <div class="product_bar clearfix">
              <!--<span class="attr_name">弹性IP</span>-->
              <div class="attr_val">
                <!--选项-->
                <!--<ul class="val_list clearfix">-->
                  <!--<li :class="{active:IP_select==0}" @click="IP_select=0">不使用</li>-->
                  <!--<li :class="{active:IP_select==1}" @click="IP_select=1">自动分配</li>-->
                  <!--&lt;!&ndash;<li :class="{active:IP_select==2}" @click="IP_select=2">使用已有</li>&ndash;&gt;-->
                <!--</ul>-->
                <!--值-->
                <div v-if="IP_select==1" class="attr_list add_attr_list">
                  <span class="attr_name bandwidth-label-width">带宽</span>
                  <div class="attr_val bandwidth-width">
                    <div class="ranger-width">
                      <el-slider v-model="ranger_val" :step="1" :show-tooltip="ranger_sameWithBandwidthOrNot" :max="ranger_max" :min="ranger_min" @change="getPrice()">
                      </el-slider>
                      <div class="scale-of-ranger">
                        <div v-for="(item,index) in width_of_scale_part" :style="{width:item+'px',height:'18px',float:'left','text-align':'right',position:'relative'}">
                          <span @click="quickSetRanger(ranger_lib[index][1]);getPrice();">{{ranger_lib[index][0]}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="bandwidth-get">
                      <input type="text" :readonly="!ranger_sameWithBandwidthOrNot" v-model="main_data['241']['154']" @blur="inputBandwidth();getPrice();"/>
                      <span>Mb</span>
                    </div>
                  </div>
                </div>
                <ul v-if="IP_select==2" class="attr_list exist_list">
                  <li class="bandwidth-setted">
                    <select>
                      <option value="">default</option>
                    </select>
                    <span>当前弹性IP 带宽：{{main_data['241']['154']}}Mb</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="product_part">
            <div class="product_bar clearfix">
              <span class="attr_name">订购数量</span>
              <div class="attr_val clearfix">
                <div class="time_area clearfix">
                  <span class="minus" v-bind:class="{'no-minus':buy_amount.amount == 1}" v-on:click="minusOrPlusTheAmount('-',buy_amount,$event)">-</span>
                  <input type="number" v-model="buy_amount.amount" v-on:input="controlContent(buy_amount,$event)">
                  <span class="plus" v-bind:class="{'no-plus':buy_amount.amount == 100}" v-on:click="minusOrPlusTheAmount('+',buy_amount,$event)">+</span>
                  <!--<input readonly style="border:none;text-align:left;width:10px;"  type="text" v-model="buy_amount.amount" v-on:input="controlContent(buy_amount,$event)">-->
                  <span>&nbsp;&nbsp;台</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a href="javascript:void(0);" class="submit" @click="submit('261','')">提交</a>
  </div>
</template>
<style scoped lang="less">
  .has-tip{
    position:absolute;
    left:0;
    top:30px;
    font-size: 12px;
    color:red;
    line-height:16px;
  }
  .jx_select,.jx_version{height:30px;}
  .whiteBg{background:white;padding-bottom: 20px;}
  .linH30{line-height:30px;}
  p,table,ul{margin:0;padding:0;}
  .w1200{overflow: hidden}
  .base_info{
    padding-bottom:10px;
    .title{
      font-weight:bold;
      font-size:16px;
      padding:15px 0;
    }
    .content{
      background:#f2f2f2;
      padding:20px 10px 10px;
      ul{
        width:1180px;
        li{
          float:left;
          width:295px;
          margin-bottom:15px;
          .attr_name{
            width:120px;
            line-height:30px;
            margin-right:5px;
            float:left;
            text-align:right;
          }
          .attr_val{
            float:left;
            width:170px;
            height:30px;
            position: relative;
            input{
              width:170px;
              height:30px;
            }
          }
        }
      }
    }
  }
  .out-of-product-part{
    width:1200px;
    border-top:1px solid #e8e8e8;
  }
  .out-of-product-part:after{
    content: ' ';
    display: block;
    overflow: hidden;
    height: 0;
    font-size: 0;
    clear: both;
  }
  .out-of-product-part-l{
    /*width: 918px;*/
    padding-right: 20px;
    float: left;
    .product_part:first-child{
      border-top:none;
      padding-top:0;
    }
  }
  .out-of-product-part-r{
    width:282px;
    margin-top:20px;
    float:left;
    background-color: #efefef;
    font-size: 14px;
    .conf-box-t{
      width:282px;
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
      width:282px;
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
          span{
            margin:0;
          }
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
      width:282px;
      padding:8px 15px;
      border-top: 1px dashed #e5e5e5;
      span{
        margin-left:25px;
        font-size: 24px;
        color:#ff8200;
      }
    }
    .conf-box-ps{
      width:282px;
      height:60px;
      padding:8px 15px;
      border-top: 1px solid #e5e5e5;
      line-height: 40px;
      text-align: center;
      a,a:link,a:visited{
        color:#999;
      }
    }
  }
  .configure_detail{
    background:#efefef;
    .title{
      height:40px;
      line-height:40px;
      color:#333;
      padding:0 15px;
      background:#e5e5e5;
      font-size:16px;
    }
    .content{
      padding:10px 15px;
      .content_bar{
        line-height:30px;
        .attr{
          display:inline-block;
          width:70px;
          color:#999;
        }
        .val{
          display:inline-block;
          width:182px;
        }
      }
    }
  }
  .product_part{
    border-top:1px solid #e8e8e8;
    padding-top:5px;
    padding-bottom:20px;
    .product_bar{
      padding-top:15px;
      .attr_name{
        float:left;
        display:block;
        width:130px;
        line-height:30px;
        font-weight:bold;
        text-align: right;
        padding-right: 25px;
      }
      .attr_val{
        float:left;
        line-height:30px;
        /*width:798px;*/
        input[type=radio]{
          margin-left:40px;
          margin-right:10px;
          position:relative;
          top:2px;
        }
        .input_wrap{display:inline-block;}
        .input_wrap:first-child{
          input[type=radio]{
            margin-left:0;
          }
        }
        .attr_list{
          li{
            height:30px;
            margin-top:15px;
            span{
              float:left;
              width:90px;
            }
            select{
              min-width:100px;
              height:30px;
            }
            .attr_val{
              float:left;
              height:30px;
              width:157px;
              position:relative;
              input{
                height:30px;
              }
            }
          }
        }
      }
    }
  }
  .time_area{
    padding-bottom: 2px;
    float:left;
    text-align:center;
    .minus{
      float:left;
      height:30px;
      line-height:30px;
      width:20px;
      border:1px solid #999;
      border-right:none;
      border-radius:3px 0 0 3px;
      cursor:pointer;
    }
    input{
      float:left;
      width:50px;
      text-align:center;
      height:30px;
    }
    .plus{
      float:left;
      height:30px;
      line-height:30px;
      width:20px;
      border:1px solid #999;
      border-left:none;
      border-radius:0 3px 3px 0;
      cursor:pointer;
    }
    select{
      float:left;
      margin-left:20px;
      height:30px;
    }
    .no-minus{
      border:1px solid #ccc;
      border-right:none;
      color:#ccc;
      cursor: default;
    }
    .no-plus{
      border:1px solid #ccc;
      border-left:none;
      color:#ccc;
      cursor: default;
    }
  }
  .time_detail{
    float:left;
    margin-left:50px;
    input{
      height:30px;
    }
  }
  .val_list{
    li{
      float:left;
      margin-right:5px;
      background:#E8E8E8;
      width:100px;
      text-align:center;
      line-height:30px;
      color:#666;
      cursor: pointer;
      margin-bottom:5px;
    }

    li.active{
      background:#FF8200;
      color:white;
    }
  }
  .disk{
    width:350px;
    border:1px solid #999;
    padding:10px;
    select,input{
      height:30px;
    }
  }
  .data_disk{
    position:relative;
    .disk{
      margin-top:5px;
    }
    .delete_disk{
      color:#2883D6;
      position:absolute;
      left:370px;
      bottom:10px;
      white-space:nowrap;
      cursor:pointer;
    }
  }
  .add_disk{
    margin:5px 0;
    color:#999;
    a{
      color:#2883D6;
      margin-right:10px;
      text-decoration:none;
      span{
        display:inline-block;
        width:16px;
        height:16px;
        text-align:center;
        line-height:16px;
        border-radius:8px;
        background:#2883D6;
        color:white;
        margin-right:5px;
      }
    }
  }
  .user_name{
    span{
      display:inline-block;
      width:115px;
    }
  }
  .bot_price{
    background:#f2f2f2;
    .w1200{
      p{
        margin-top:15px;
        float:left;
        .price_num{
          font-size:25px;
          color:#ff8200;
          position:relative;
          top:5px;
          left:20px;
        }
      }
      .gocart_btn{
        cursor:pointer;
        float:right;
        text-align:center;
        width:150px;
        line-height:70px;
        text-align:center;
        background:#ff8200;
        color:white;
        font-size:20px;
      }
    }
  }
  .pass_tip{
    float:left;
    line-height:30px;
    color:#999;
    margin-left:10px;
  }

  //宽带
  .ranger-width{
    width:500px;
    padding-bottom: 10px;
    position: relative;
    float:left;
    .scale-of-ranger{
      width:500px;
      height:18px;
      position: absolute;
      top:20px;
      left:4px;
      div.scale-part{
        height:18px;
        float: left;
      }
      div span{
        position: absolute;
        right:-6%;
        cursor: pointer;
      }
    }
  }
  .bandwidth-get{
    height:38px;
    padding-top: 6px;
    margin:0 30px;
    float:left;
    input{
      width:35px;
      height:25px;
      border:1px solid #ccc;
      margin:0;
      padding:0 3px;
      float: left;
      line-height: 25px;
      background-color: white;
    }
    span{
      height:25px;
      padding: 0 3px;
      margin:0;
      border:1px solid #ccc;
      display: block;
      float: left;
      line-height: 25px;
      background-color: #ccc;
      color:#fff;
    }
  }
  .red-border{
    border:1px solid red;
  }



  .clientInfo{
    border-left: #2aabd2 4px solid;
    line-height: 20px;
    font-size: 16px;
    margin: 20px 0 10px 25px;
    padding-left: 15px;
  }
  .clientInfo-list{
    padding-left: 50px;
    section{
      float: left;
      width: 33%;
      font-size: 12px;
      padding: 5px 0;
      line-height: 18px;
    }
  }
  .exist_list{
    input{
      min-width: 100px;
      height: 30px;
      line-height: 30px;
      margin-left: 5px;
      text-align: center;
    }
    p{
      display: inline-block;
      color: #2aabd2;
      margin-left: 5px;
    }

  }
  .add_attr_list{
    /*padding-top: 20px;*/
    input{
      height: 30px;
    }
    .ps{
      color: #ddd;
    }
  }

  .bandwidth-label-width{
    line-height: 48px!important;
    width: 128px !important;
    font-weight: 400!important;
  }

  .submit{
    display: block;
    width: 142px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #FF8200;
    margin: 0 auto;
    color: #fff;
    font-size: 20px;
  }

</style>
<script>
  export default{
    props:[],
    data(){
      return {
        originalOrderData:'',
        custInfo:{
          custType:"",
          certName:"",
          certNum:"",
          contactAddr:"",
          mobile:"",

        },
        custManagerInfo:{
          name:"",
          tel:"",
          STAFF_ID:''
        },
        VPCObj:{},
        securityGroupObj:{},
        networkCardObj:{},
        resArr:[], //资源池
        currentRes:'', //当前资源地
        mainProdData:{},//主产品信息

        valueDataList:[],
        IP_select:1,
        system_data_num:'',//系统盘大小
        system_data_str:'',//系统盘类型
        catalogId:'301',//云产品固定商品id
        password_confirm:'',
        main_data:{
          '241':{
            '143':'',//订购类型
            '145':'',//资源池
            '146':'',//开通平台
            '147':'',//CPU
            '148':'',//内存
            '149':'',//系统盘
            '183':'',//系统盘大小
            '150':'',//数据盘类型
            '151':'',//数据盘大小
            '152':'',//镜像类型
            '153':'',//镜像
            '154':'',//带宽
            '155':'',//VPC
            '156':'',//账号
            '157':'',//密码
            '164':'',//订购时长
            '165':'',//虚拟私有云名称
            '166':'',//VPC申请起始IP
            '167':'',//VPC申请终止IP
            '168':'',//已有VPCID
            '205':'',//子网ID  网关
            '206':'',//安全组ID
            '179':'',//订购时长单位
            '180':'',//订购数量
            '207':'',//操作系统
            '208':'',//版本显示值
            '210':'',//虚拟私有云
            amount:0
          }
        },
        newVPC1:'',
        newVPC2:'',
        select_data:{
          '143':{},//订购类型
          '146':{},//开通平台
          '147':{},//CPU
          '148':{},//内存
          '149':{},//系统盘
          '150':{},//数据盘类型
          '152':{},//镜像类型
          '164':{},//订购时长单位
          '210':{}
        },
        data_disk_bool:true,
        system_disk_data:{},

        mirror_type:[],
        mirror_version:{},
        mirror_data:{},

//        mirror_type_val:'',
//        images_data:[],
//        images_val_txt:'',
//        images_version_data:{},
//        copy_images_data:{},
        relation_data:[],
//        cloud_select:0,
        time_set:{
          amount:'1',
          type:'年',
          start_day:'',
          end_day:'',
        },
        buy_amount:{
          amount:'1'
        },
        ranger_val:0,
        ranger_max:300,
        ranger_min:1,
        ranger_sameWithBandwidthOrNot:true,
        ranger_lib:[
          [1,1],
          [20,20],
          [50,50],
          [100,100],
          [200,200],
          [300,300]
        ],
        hasInputError:false,
        usedIPArr:[]
      }
    },
    computed:{
      //根据ranger_lib设置带宽滑动条的标尺
      width_of_scale_part:function(){
        let length_of_lib = this.ranger_lib.length;
        let attr_scale = [];
        for(let i = 0; i < length_of_lib; i++){
          let width_of_scale_part;
          if(i == 0){
            width_of_scale_part = ((this.ranger_lib[i][1]/this.ranger_lib[length_of_lib-1][1]).toFixed(4)*500).toString();
          }else {
            width_of_scale_part = (((this.ranger_lib[i][1] - this.ranger_lib[i - 1][1]) / this.ranger_lib[length_of_lib - 1][1]).toFixed(4)*500).toString();
          }
          attr_scale.push(width_of_scale_part);
        }
        return attr_scale;
        //返回的是每个刻度相对于前一个刻度的距离组成的数组
      }
    },
    watch:{

      ranger_val:function(val){
        if(!this.ranger_sameWithBandwidthOrNot){
          //带宽滑动条滑动位置限制，只能选择刻度标示的档位的宽带值
          let data_from_lib = this.getShowDataOfRanger(val);
          this.ranger_val = parseInt(data_from_lib[1]);
          this.main_data['241']['154'] = data_from_lib[0];
        }else{
          //不限制
          this.main_data['241']['154'] = val;
        }

      },

      ['time_set.amount'](val){
        this.endDayChange(this.time_set);
        this.main_data['241']['164'] = this.time_set.amount;
      },
      ['time_set.type'](val){
        for(let i in this.select_data['179']){
          if(this.select_data['179'][i] == this.time_set.type){
            this.main_data['241']['179'] = i;
          }
        }
      },
      //订购数量绑定
      ['buy_amount.amount'](val){
        this.main_data['241']['180'] = this.buy_amount.amount;
      },
      main_data:{
        handler(curVal,oldVal){
          //系统盘大小变化绑定和系统盘类型变化绑定
//          this.system_data_num = this.system_disk_data[this.main_data["241"]["149"]][1];
//          this.system_data_str = this.system_disk_data[this.main_data["241"]["149"]][2];

          //订购数量绑定
          if(parseInt(this.main_data["241"]["151"]) < 10){
            this.$alert('数据盘最小值为10', '提示', {
              confirmButtonText: '确定',
              callback:action=>{
                this.main_data["241"]["151"] = 10;
              }
            });
          }
          this.buy_amount.amount = this.main_data["241"]["180"];
          this.time_set.amount = this.main_data["241"]["164"];
          this.time_set.type = this.main_data["241"]["179"];
          this.buy_type_itemCd = this.main_data["241"]["143"] == '181' ? '1' : '2';
//          console.log('151zzzz',this.main_data['241']['151']);
          if(!this.ranger_sameWithBandwidthOrNot){
            //带宽滑动条滑动位置限制，只能选择刻度标示的档位的宽带值
            //当实际贷款值和标尺刻度不一致时需要进行数值转化，业务暂时不需要，未实现
          }else{
            //不限制
            this.ranger_val = parseInt(this.main_data['241']['154']);
          }
        },
        deep:true
      }
    },
    mounted(){
      var _this=this;
      let orderItemId = this.$route.query.id;
      axios.all([_this.getOrderInfoAxios(orderItemId),_this.getInfoAxios()])
        .then(axios.spread(function(orderRes,infoRes){
          _this.setInfo(infoRes);
          _this.setOrderInfo(orderRes);
          _this.checkInit();

        }));
    },
    methods:{
//        获取订单信息
      getOrderInfoAxios(orderItemId){
        var _this = this;
        return axios({
          method:"post",
          url:"/netCloudOrder/cartItemAttrService/queryCartItemAttr2",
          data:{
            orderItemId:orderItemId
          }
        })
      },
//      设置订单信息
      setOrderInfo(res){
        var _this = this;
        _this.originalOrderData = res.data.data.productAttrList;
        _this.custInfo.custType = res.data.data.productAttrList[0].custType;
        _this.custInfo.certName = res.data.data.productAttrList[0].certName;
        _this.custInfo.certNum = res.data.data.productAttrList[0].certNum;
        _this.custInfo.contactAddr = res.data.data.productAttrList[0].contactAddr;
        _this.custInfo.mobile = res.data.data.productAttrList[0].mobile;
        res.data.data.productAttrList.forEach((v)=>{
          if(v.productId == '241' && _this.valueDataList.length <= 0){
            _this.valueDataList = _this.valueDataList.concat(v.serviceAttrList);
          }
        });
        _this.custManagerInfo.name = _this.originalOrderData[0].customerManager.SYS_USER_NAME;
        _this.custManagerInfo.tel = _this.originalOrderData[0].customerManager.MOBILE;
        _this.custManagerInfo.STAFF_ID = _this.originalOrderData[0].customerManager.STAFF_ID;
      },
//        获取配置信息
        getInfoAxios(){
          var _this = this;
          return axios({
            method:"post",
            url:'/netCloudOffer/productsService/productlistByParam',
            data:{id:_this.catalogId}
          });
        },
//    设置配置信息
      setInfo(res){
        var _this = this;
        if(res.data.code == 0) {
          var muniData = res.data;
          //云产品基本属性
          var baseInfo = muniData.data[1].offerProductObjectAttrList;
          var baseInfoObj = {};
          for (var i in baseInfo) {
            var attrId = baseInfo[i].objectAttrInfo.attrId;
            baseInfoObj[attrId] = baseInfo[i].objectAttrInfo.defaultValue;
          }
          _this.main_data[261] = baseInfoObj;
          //配置属性
          var info = muniData.data[0].offerProductObjectAttrList;
          var infoObj = {};//基本属性对象
          var infoListObj = {};//联动列表的对象
          var relationArr = {};//联动关系
          var systemDataObj = {};//系统盘下拉字符串和数值的分开
          for (var i in info) {
            var attrId = info[i].objectAttrInfo.attrId;
            infoObj[attrId] = info[i].objectAttrInfo.displayValue;
            if (info[i].objectAttrValueList.length > 0 && info[i].objectAttrValueList !== null) {
              var perObj = {};
              for (var k in info[i].objectAttrValueList) {
                if (info[i].objectAttrValueList[k].objAttrValue == info[i].objectAttrInfo.defaultValue) {
                  infoObj[attrId] = info[i].objectAttrValueList[k].attrValueId;
                }

                perObj[info[i].objectAttrValueList[k].attrValueId] = info[i].objectAttrValueList[k].displayValue;
              }
              infoListObj[attrId] = perObj;
              //            资源池值
              if(attrId == '145'){
                _this.resArr = info[i].objectAttrValueList;
              }
            }
            if (info[i].attrRefDefList.length>0) {
              relationArr[info[i].attrRefDefList[0].refObject]=info[i].attrRefDefList[0].attrId;
            }

          }
          _this.main_data[241] = infoObj;
          _this.select_data = infoListObj;
          _this.relation_data = relationArr;
          _this.buy_amount.amount = _this.main_data['241']['180'];
          _this.time_set.amount = _this.main_data['241']['164'];
          _this.time_set.type = _this.select_data['179'][_this.main_data['241']['179']];

          // console.log(_this.system_disk_data);
        }else{
          this.$alert(res.data.msg, '提示', {
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          });
        }
      },

//      获取镜像
      getmirror(){
        var self = this;

        //获取资源地的值
        for(let i in self.resArr){
          if(self.resArr[i].attrValueId == self.main_data['241']['145']){
            self.currentRes = self.resArr[i].objAttrValue;
          }
        }
        var dataObj = {
          "imageType": 'gold', //gold:公有  private：私有
//          "regionId": "cn-gzT",
          'regionId':self.currentRes,
        };
        if (self.main_data[241][152] == '208') { //公有
          dataObj.imageType = 'gold'
        } else if(self.main_data[241][152] == '209'){
          dataObj.imageType = 'private'
        }
        return axios({
          method: "post",
          url:'/netCloudBusiness/queryYunRes/queryImages',
          data: dataObj
        });
      },

//      设置镜像
      setmirror(key){
        var self = this;
        self.main_data[241][152] = key;

        self.mirror_type = [];
        axios.all([self.getmirror()])
          .then(axios.spread(function(mirrorRes){
            var jxData = mirrorRes.data;
            self.mirror_data = jxData;
//                公有
            if(self.main_data[241][152] == '208'){
              for (let i in jxData) {
                self.mirror_type.push(i);
                for (let n in jxData[i]) {
                  if (jxData[i][n].id == self.main_data['241']['208']) {
                    self.main_data[241][207] = i;
                  }
                }
              }
              if(!self.main_data[241][207]){
                self.main_data[241][207] = self.mirror_type[0];
              }
              self.$set(self.mirror_type,self.mirror_type);
              self.mirror_version = {};
              self.changeMirrorSys(self.main_data[241][207]);

            } else if(self.main_data[241][152] == '209'){
              //                私有
              self.mirror_version = {};
              if(jxData.returnObj.length > 0){
                jxData.returnObj.forEach((v)=>{
                  self.mirror_version[v.id] = v.name;
                });
              }
              self.$set(self.mirror_version,self.mirror_version);
            }
          }));
      },

//      镜像系统修改
      changeMirrorSys(sys_val){
        var self = this;
        self.mirror_version = {};
        let bool = false; //当前镜像id是否存在该系统下
        self.main_data[241][207] = sys_val;
        self.mirror_data[sys_val].forEach((v)=>{
          self.mirror_version[v.id] = v.name;
          if(self.main_data[241][153] == v.id){
            bool = true;
          }
        });
        if(!bool){
          if(self.mirror_data[sys_val].length > 0){
            self.main_data[241][153] = self.mirror_data[sys_val][0].id;
          }

        }
      },

//      资源地修改
      resChange(key){
        var self = this;
        self.main_data[241][145] = key;
        self.setmirror(self.main_data[241][152]);
        self.privateCloudChange(self.main_data['241']['210']);
      },

//      私有云  已有时
      getVPC(){
        var self = this;
        for(let i in self.resArr){
          if(self.resArr[i].attrValueId == self.main_data['241']['145']){
            self.currentRes = self.resArr[i].objAttrValue;
          }
        }
        if(JSON.stringify(self.VPCObj)=="{}"){
          axios({
            method:'post',
            url:"/netCloudBusiness/sourceQueryService/queryVPCs",
            data:{
              "regionId":self.currentRes,
              "orderItemId":self.$route.query.id,
              prodId:'241'
            }
          }).then(res=>{
            res.data.returnObj.forEach((v)=>{
              self.VPCObj[v.resVpcId]=v.name;
            })
            if(!self.main_data['241']['168']){
              self.main_data['241']['168'] = res.data.returnObj[0].resVpcId;
            }
//            console.log('qaaaaa');
            self.VPCChange();
          }).catch(err=>{

          })
        } else {
          self.VPCChange();
        }


      },
//      私有云类型转变时触发
      privateCloudChange(key){
        var self = this;
        self.main_data['241']['210'] = key;
        if(self.main_data['241']['210'] == '246'){
          self.getVPC();
        }
      },
//      VPC改变时触发
      VPCChange(){
        var self = this;
        self.securityGroupObj={};
        self.networkCardObj = {};
        axios({
          method:'post',
          url:"/netCloudBusiness/sourceQueryService/querySecurityGroups",
          data:{
            "regionId":self.currentRes,
            "vpcId":self.main_data['241']['168'],
            'orderItemId':self.$route.query.id,
            prodId:'241'

          }
        }).then(res=>{
          res.data.returnObj.forEach((v)=>{
            self.$set(self.securityGroupObj,v.resSecurityGroupId,v.name);
          })
          if(!self.main_data['241']['206']){
            self.main_data['241']['206'] = res.data.returnObj[0].resSecurityGroupId;
          }
        }).catch(err=>{

        })
        axios({
          method:'post',
          url:"/netCloudBusiness/sourceQueryService/querySubnets",
          data:{
            "regionId":self.currentRes,
            "vpcId":self.main_data['241']['168'],
            'orderItemId':self.$route.query.id,
            prodId:'241'
          }
        }).then(res=>{
          res.data.returnObj.forEach((v)=>{
            self.$set(self.networkCardObj,v.id,v.cidr);
          })
          if(!self.main_data['241']['205']){
            self.main_data['241']['205']=res.data.returnObj[0].id;
          }
        }).catch(err=>{

        })
      },
      //          初始化
      checkInit(){
        var self = this;

//        赋值
        self.valueDataList.forEach((v)=>{
          if(v.attrId == '147'){
            self.changeActive(v.attrValue,self.main_data,241,147,self.select_data[v.attrId][v.attrValue]);
          }
          self.main_data['241'][v.attrId] = v.attrValue;
        });

        //获取初始化价格
        self.getPrice();
        self.buy_amount.amount = this.main_data['241']['180'];
        self.time_set.amount = this.main_data["241"]["164"];
        self.time_set.type = this.main_data["241"]["179"];
        self.ranger_val = parseInt(self.main_data['241']['154']);
        self.setmirror(self.main_data['241']['152']);
        self.privateCloudChange(self.main_data['241']['210']);

      },



//      审核提交
      submit(){
        var self = this;
        let itemCd = '1';
        if(self.main_data['241']['143'] == '181'){
          itemCd = '1';
        } else if(self.main_data['241']['143'] == '182'){
          itemCd = '2';
        }
        let data = {
          "loginUserId": self.custManagerInfo.STAFF_ID,
          "cartItemId": self.$route.query.id,
          "offerId": self.$route.query.offerId,
          'statusCd':'11',
          itemCd:itemCd,
          "productAttrList": []//产品列表
        };
        let itemData = {}; //辅产品
//        把主产品的信息放在第一个 【客户】
        self.originalOrderData.forEach((v)=>{
          if(v.productId == '261'){
            data.productAttrList.push(v);
          } else if(v.productId == '241'){
            itemData = JSON.parse(JSON.stringify(v));
            itemData.num = self.main_data['241']['180'];
            itemData.amount = self.main_data['241'].amount;
            itemData.newProdFlag = 'Y';
            itemData.prodInstId = '';
            itemData.serviceAttrList = [];
          }
        });
//        处理私有云新增时的数据   【只需要传attrId=166里的值   格式为 10.10.0.0/10】
        self.main_data['241']['166'] = self.newVPC1 + '/' + self.newVPC2;
//        console.log(self.mirror_version,111111);
        self.main_data['241']['208'] = self.mirror_version[self.main_data['241']['153']];
        if(self.main_data['241']['210'] == '245'){
//           默认已有
          self.main_data['241']['155'] = '默认';
        } else if(self.main_data['241']['210'] == '246'){
//            已有
          self.main_data['241']['155'] = self.VPCObj[self.main_data['241']['168']];
        } else if(self.main_data['241']['210']){
//            新增
          self.main_data['241']['155'] = self.main_data['241']['165'];
        }

        if(self.main_data['241']['210']=='247' && !self.isIP(self.main_data['241']['166'])){
          self.$alert('请填写正确的互联网地址，如10.10.10.10/10', '提示', {
            confirmButtonText: '确定',
            callback:action=>{
              return false;
            }
          });
          return false;
        }
        for (let key in self.main_data['241']){
          if (key != 'amount') {
            let serviceAttr = {
              attrId:key,
              attrValue:self.main_data['241'][key]
            }
            itemData.serviceAttrList.push(serviceAttr);
          }
        };
        data.productAttrList.push(itemData);
        axios({
          method:"post",
          url:"/netCloudOrder/shoppingCartService/updateShoppingCart2",
          data:data
        }).then(res=>{
          if(res.data.code){
            this.$alert('保存成功', '提示', {
              confirmButtonText: '确定',
              callback:action=>{
                self.$router.push('/resourcesCheck');
              }
            });

          } else {
            this.$alert('保存配置错误', '提示', {
              confirmButtonText: '确定',
              callback:action=>{

              }
            });
          }
        }).catch(err=>{

        });
      },

      //开通时间到期时间随天数和起始时间变化而变化
      endDayChange(val){
        if(val.type == '天'){
          if(val.start_day){
            val.end_day = new Date();
            val.end_day.setTime(val.start_day.getTime() + 3600 * 1000 * 24 * val.amount);
          }
        }else{
          val.start_day = '';
          val.end_day = '';
        }
      },

      ////////////滑动条相关*****************************************************************
      /**********滑动条设置接口函数*********/
      //参数：宽带值对应ranger值数组，ranger最大值，ranger最小值，默认宽带值，默认ranger值，lib中宽带值和ranger值是否都相等
//      rangerChangeFunc(lib_attr,max,min,bandwidth,ranger,same){
//        this.ranger_lib = [];
//        this.ranger_lib = lib_attr;
//        this.ranger_max = max;
//        this.ranger_min = max;
//        this.main_data['241']['154'] = bandwidth;
//        this.ranger_val = ranger;
//        this.ranger_sameWithBandwidthOrNot = same;
//      },
      //点击显示的刻度时快速选择相对应的宽带值
      quickSetRanger(val){
        if(!this.ranger_sameWithBandwidthOrNot){
          let data_from_lib = this.getShowDataOfRanger(val);
          this.ranger_val = data_from_lib[1];
          this.main_data['241']['154'] = data_from_lib[0];
        }else{
          this.main_data['241']['154'] = val;
          this.ranger_val = val;
        }
      },
      inputBandwidth(){
        let reg=/^\d+$/;
        if(!reg.test(this.main_data['241']['154'])){
          this.main_data['241']['154'] = 0;
        }
        if(this.ranger_sameWithBandwidthOrNot) {
          this.ranger_val = Number(this.main_data['241']['154']);
        }
      },
      //根据ranger滑动后得到的值来判断显示的带宽数和滑动条位置
      //当滑动条取值和所需属性值不一一对等时有用
      getShowDataOfRanger(val){
        let length_of_lib = this.ranger_lib.length;
        for(let i = 0; i < length_of_lib-1; i++){
          if(val >= this.ranger_lib[i][1] && val < (this.ranger_lib[i][1]+this.ranger_lib[i+1][1])/2){
            return this.ranger_lib[i];
          }else if(val < this.ranger_lib[i+1][1] && val >= (this.ranger_lib[i][1]+this.ranger_lib[i+1][1])/2){
            return this.ranger_lib[i+1];
          }else if(i == length_of_lib-2 && val == this.ranger_lib[i+1][1]){
            return this.ranger_lib[i+1];
          }
        }
      },

      /////////////滑动条end*****************************************************************

      changeActive:function(index,obj,attrId,attrValId,val){
        var _this=this;
        obj[attrId][attrValId] = index;
        for(var i in _this.relation_data){
          if(attrValId==i){
            var dataObj={
              "tarAttrId":_this.relation_data[attrValId]+'',//对象属性值ID
              "linkageInfoList": [
                {
                  "attrId":attrValId+'',//属性标识ID
                  "objAttVal": val+''//对象属性选用值(页面选择的参数值,cpu值)
                }
              ]
            };
            axios({
              method:"post",
              url:'/netCloudOffer/productsService/getLinkageInfo',
              data:dataObj
            }).then(res=>{
              if(res.data.code == 0) {
                var mainData=res.data.objectAttrValueList;
                var objData = {};
                var newAttrId = res.data.tarAttrId;
                for(var i in mainData){
                  if(!_this.main_data[attrId][newAttrId]){
                    _this.main_data[attrId][newAttrId] = mainData[0].attrValueId;
                  } else {

                  }
//                  if (i == 0 && !_this.main_data[attrId][newAttrId]) {
//                    _this.main_data[attrId][newAttrId] = mainData[i].attrValueId;
//                  }
                  objData[mainData[i].attrValueId] = mainData[i].objAttrValue;
                }
                _this.select_data[newAttrId] = objData;
              }else{
                this.$alert(res.data.msg, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    return false;
                  }
                });
              }
            }).catch(err=>{

            })
          }
        }
      },
      //数量input输入时确保输入为1到max_amount间的数字。
      controlContent:function(item,event){
        var max_amount = 100;
//        var el = event.currentTarget;
        var amount_input = item.amount;
        //console.log(isNaN(amount_input));
        if(isNaN(amount_input)){
          item.amount = 1;
        }else if(amount_input < 1){
          item.amount = 1;
        }else if(amount_input > max_amount){
          item.amount = max_amount;
        }else{
          item.amount = amount_input;
        }
      },
      //amount的加减
      minusOrPlusTheAmount:function(m_or_p,item,event){
        event.preventDefault();
        if(m_or_p == '-' && item.amount > 1){
          item.amount--;
        }else if(m_or_p == '+' && item.amount < 100){
          item.amount++;
        }
      },
      deleteDisk(){
        this.data_disk_bool=false;
        this.main_data['241']['210'] = 0;
      },
      addDisk(){
        this.data_disk_bool=true;
        /*var addObj={currentSelect:this.dataDisk.selectVal,currentInput:this.dataDisk.inputVal};
         this.dataDisk.dataList.push(addObj);*/
      },


      setTypePassword(event){
        let el = event.currentTarget;
        $(el).attr('type','password');
      },

      //获取产品价格
      getPrice:function(){
        let that = this;
        let confList = {
          "offerInfo":{
            "offerId":that.$route.query.offerId,// 商品id
            "offerObjectAttr": [
            ]
          },
          "productInfoList": [// 产品信息集合
            {
              "productInfo": {// 产品信息
                "product": {// 产品信息
                  "prodId": '241',// 产品ID
                  "offerId":that.$route.query.offerId
                },
                "objectAttr": []
              }
            }
          ]
        };
        for(let one in this.main_data['241']){
          if(one !== 'amount') {
            let data ={
              "objAttrId": one,// 对象属性ID
              "objAttVal": this.main_data['241'][one]
            }
            for(let key in this.select_data){
              if(one == key){
                if(JSON.stringify(that.select_data[one]) != '{}'){
                  for(let b in that.select_data[one]){
                    if(this.main_data['241'][one] == b){
                      data.objAttVal = that.select_data[one][b];
                      break;
                    }
                  }
                }
                break;
              }
            }
            confList.productInfoList[0].productInfo.objectAttr.push(data);
          }
        }
        if(that.main_data['241']['143'] == '182'){ //试用
          that.main_data['241'].amount = 0;
        } else { //商用
          axios({
            method:'post',
            url:"/netCloudOffer/priceDefService/getObjAttrPrice",
            data:confList,
          }).then(function (response) {
            let lst = response.data.data;
            let code = response.data.code;
            if(code == '0'){
              that.main_data['241'].amount = lst.productInfoList[0].price.toString().split('.')[0];
            }else if(code == '1'){
              this.$alert(response.data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  return false;
                }
              });
            }
          }).catch(err =>{
          })
        }
      },

      ///////////////验证********************************************/
      /*提示语和红边框提示*/
      //      验证Ip地址
      isIP(ip){
        var reSpaceCheck = /^(\d+)\.(\d+)\.(\d+)\.(\d+)\/(\d+)$/;
        if (reSpaceCheck.test(ip)) {
          ip.match(reSpaceCheck);
          if (RegExp.$1<=255&&RegExp.$1>=0
            &&RegExp.$2<=255&&RegExp.$2>=0
            &&RegExp.$3<=255&&RegExp.$3>=0
            &&RegExp.$4<=255&&RegExp.$4>=0
            &&RegExp.$5<=255&&RegExp.$5>=0){
            return true;
          }else
          {
            return false;
          }
        }else
        {
          return false;
        }
      },
      callBackFunc:function(event,tip){
        var _this = this;
        let el = event.currentTarget;
        tip = (tip == '') ? tip : ("<i class='el-icon-error'></i> "+tip);
        if($(el).parent().find('.has-tip').length > 0){
          $(el).parent().find('.has-tip').html(tip);
        }else{
          let tip_html = "<div class='has-tip' style='position:absolute;left:0;top:30px;font-size: 12px;color:red;line-height:16px;'> "+tip+"</div>";
          $(el).parent().append(tip_html);
        }
        if(tip){
          $(el).addClass('red-border');
          _this.hasInputError = true;
        }else{
          $(el).removeClass('red-border');
          _this.hasInputError = false;
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
      checkEmail:function(event){
        let el = event.currentTarget;
        let value = $(el).val();
        if (!value) {
          this.callBackFunc(event,'邮箱地址不能为空');
        }else{
          let re = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
          if (!re.test(value)) {
            this.callBackFunc(event,'邮箱地址格式有误');
          } else {
            this.callBackFunc(event,'');
          }
        }
      },
      checkPassword:function(event){
        let el = event.currentTarget;
        let value = $(el).val();
        if (!value) {
          this.callBackFunc(event,'密码不能为空');
        }else{
          let re = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
          if (!re.test(value)) {
            this.callBackFunc(event,'密码格式有误');
          } else {
            this.callBackFunc(event,'');
          }
        }
      },
      checkPasswordConfirm:function(event){
        let el = event.currentTarget;
        let value = $(el).val();
        if (!value) {
          this.callBackFunc(event,'请输入确认密码');
        }else if(value !== this.main_data['241']['157']){
          this.callBackFunc(event,'两次输入不一致');
        }else if(value == this.main_data['241']['157']){
          this.callBackFunc(event,'');
        }
      },
      //////////////验证结束***************************************/
    }
  }
</script>

