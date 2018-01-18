<!-- 云主机配置组件 -->
<template>
  <div class="whiteBg">
    <div class="w1200">
      <div class="base_info">
        <p class="title">客户基本信息</p>
        <div class="content">
          <ul class="clearfix">
            <li class="clearfix">
              <span class="attr_name">客户名称：</span>
              <div class="attr_val"><input type="text" value="浙江图灵" readonly/></div>
            </li>
            <li class="clearfix">
              <span class="attr_name">客户类型：</span>
              <div class="attr_val"><input type="text" value="政企客户" readonly/></div>
            </li>
            <li class="clearfix">
              <span class="attr_name">证件类型：</span>
              <div class="attr_val"><input type="text" value="营业执照" readonly/></div>
            </li>
            <li class="clearfix">
              <span class="attr_name">证件号码：</span>
              <div class="attr_val"><input type="text" value="331081199208061811" readonly/></div>
            </li>
            <li class="clearfix">
              <span class="attr_name">客户地址：</span>
              <div class="attr_val"><input type="text"  value="秋涛北路93号秋云旅馆411室" readonly/></div>
            </li>
            <li class="clearfix">
              <span class="attr_name">联系电话：</span>
              <div class="attr_val"><input type="text"  value="15068106930" readonly/></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="out-of-product-part">
        <div class="out-of-product-part-l">
          <div class="product_part">
            <div class="product_bar clearfix">
              <span class="attr_name">订购类型</span>
              <div class="attr_val">
                <input type="text"  value="商用" readonly>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">开通时间</span>
              <div class="attr_val">
                <input type="text" value="3个月" readonly />
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">开通平台</span>
              <div class="attr_val">
                <input type="text" value="ctyun平台" readonly>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">资源池</span>
              <div class="attr_val">
                <input type="text"  value="杭州" readonly>
              </div>
            </div>
          </div>
          <div class="product_part">
            <div class="product_bar clearfix">
              <span class="attr_name">CPU(虚拟核数)</span>
              <div class="attr_val">
                <ul class="val_list clearfix">
                  <li v-for="(item,index) in select_data[147]" :class="{active:main_data[241][147]==index}" @click="changeActive(index,main_data,241,147,item)">{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">内存</span>
              <div class="attr_val">
                <ul class="val_list clearfix">
                  <li v-for="(item,index) in select_data[148]" :class="{active:main_data[241][148]==index}" @click="changeActive(index,main_data,241,148,item)">{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="product_bar clearfix no_border">
              <span class="attr_name">镜像类型</span>
              <div class="attr_val">
                <!--<ul class="val_list clearfix">
                  <li v-for="(item,index) in select_data[152]" :class="{active:main_data[241][152]==index}" @click="changeActive(index,main_data,241,152,item)">{{item}}</li>
                </ul>-->
                <input type="text" value="公共镜像" readonly>
              </div>
            </div>
            <div class="product_bar clearfix no_border">
              <span class="attr_name">镜像</span>
              <div class="attr_val">
                <!--<select class="jx_select" v-model="mirror_type_val" @change="changeName(mirror_type_val)">
                  <option v-for="option in mirror_type" :value="option">{{option}}</option>
                </select>
                <select class="jx_version" v-model="main_data[241][153]">
                  <option v-for="(option,index) in mirror_version" :value="index">{{option}}</option>
                </select>-->
                <input type="text" value="CentOS 6.4 64bit" readonly>
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
                  <span>{{main_data[241][183]}}</span>
                </div>
                <div class="data_disk" v-if="data_disk_bool==true">
                  <div class="disk">
                    <span>数据盘</span>
                    <select v-model="main_data[241][150]">
                      <option v-for="(option,index) in select_data[150]" :value="index">{{option}}</option>
                    </select>
                        <input type="number" :value="main_data[241][151]">G
                  </div>
                  <span class="delete_disk" @click="deleteDisk">删除</span>
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
                  <li :class="{active:cloud_select==0}" @click="cloud_select=0">默认</li>
                  <li :class="{active:cloud_select==1}" @click="cloud_select=1">已有</li>
                  <li :class="{active:cloud_select==2}" @click="cloud_select=2">新增</li>
                </ul>
                <!--值-->
                <ul v-if="cloud_select==1" class="attr_list exist_list">
                  <li>
                    <span>虚拟私有云：</span>
                    <select>
                      <option value="">default</option>
                    </select>
                  </li>
                </ul>
                <ul v-if="cloud_select==2" class="attr_list add_attr_list">
                  <li>
                    <span>资源池ID：</span>
                    <input type="text">
                  </li>
                  <li>
                    <span>虚拟私有云名称：</span>
                    <input type="text">
                  </li>
                  <li>
                    <span>子网范围：</span>
                    <input placeholder="10.0.0.0/8">
                    -
                    <input placeholder="10.0.0.0/27">
                  </li>
                </ul>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">弹性IP</span>
              <div class="attr_val">
                <input type="text" value="50MB" readonly />
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
                  <span class="plus" v-bind:class="{'no-plus':buy_amount.amount == 100}"v-on:click="minusOrPlusTheAmount('+',buy_amount,$event)">+</span>
                  <span>&nbsp;&nbsp;台</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
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
  .no_border input{border:none;}
  .jx_select,.jx_version{height:30px;}
  .whiteBg{background:white;}
  .linH30{line-height:30px;}
  p,table,ul{margin:0;padding:0;}
  .w1200{width:1200px;margin:0 auto;}
  .base_info{
    .title{
      font-weight:bold;
      font-size:16px;
      padding-top:15px;
    }
    input{border:none;}
    .content{
      padding:20px 15px 10px;
      ul{
        width:1170px;
        li{
          float:left;
          width:390px;
          margin-bottom:15px;
          .attr_name{
            width:120px;
            line-height:30px;
            margin-right:5px;
            float:left;
            text-align:right;
            color:#999;
          }
          .attr_val{
            float:left;
            width:200px;
            height:30px;
            position: relative;
            input{
              width:200px;
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
    .product_part:first-child{
      border-top:none;
      padding-top:0;
      input{
        border:none;
      }
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
        width:110px;
        padding-right:10px;
        line-height:30px;
        font-weight:bold;
        text-align:right;
      }
      .attr_val{
        float:left;
        line-height:30px;
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
              width:115px;
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
      margin-left:5px;
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

</style>
<script>
  export default{
    props:[
    ],
    data(){
        return {
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
              '165':'',//虚拟私有云名称
              '166':'',//VPC申请起始IP
              '167':'',//VPC申请终止IP
              '164':'',//订购时长
              '179':'',//订购时长单位
              '180':'',//订购数量
              '_item_p':{
                'amount':''
              }
            },
            '261':{
              '169':'',//企业账号
              '170':'',//企业管理员用户名
              '171':'',//密码
              '172':'',//行业标识
              '173':'',//企业联系人姓名
              '174':'',//联系电话
              '175':'',//邮箱地址
              '176':'',//企业通信地址
              '177':'',//企业归属地编码
              '178':''//企业名称
            }
          },
          select_data:{
            '143':{},//订购类型
            '146':{},//开通平台
            '147':{},//CPU
            '148':{},//内存
            '149':{},//系统盘
            '150':{},//数据盘类型
            '152':{},//镜像类型
            '164':{}//订购时长单位
          },
          data_disk_bool:true,
          system_disk_data:{},

          mirror_type:[],
          mirror_version:{},
          mirror_data:{},

          mirror_type_val:'',
          images_data:[],
          images_val_txt:'',
          images_version_data:{},
          copy_images_data:{},
          relation_data:[],
          cloud_select:0,
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
          ranger_min:0,
          ranger_sameWithBandwidthOrNot:true,
          ranger_lib:[
            [10,10],
            [50,50],
            [100,100],
            [200,200],
            [300,300]
          ],
          //数据盘
          dataDisk:{
              selectList:['SATA','sata'],
              inputVal:'500',
              selectVal:'SATA',
              dataList:[
                {currentSelect:'SATA',currentInput:'100'},
              ]
          },
          hasInputError:false
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
          this.ranger_val = data_from_lib[1];
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
        //console.log(this.main_data['241']['180'],':::1');
      },
      main_data:{
        handler(curVal,oldVal){
          //系统盘大小变化绑定和系统盘类型变化绑定
//          this.system_data_num = this.system_disk_data[this.main_data["241"]["149"]][1];
//          this.system_data_str = this.system_disk_data[this.main_data["241"]["149"]][2];

          //订购数量绑定
          this.buy_amount.amount = this.main_data["241"]["180"];
          this.time_set.amount = this.main_data["241"]["164"];
          this.time_set.type = this.main_data["241"]["179"];
        },
        deep:true
      }
    },
    mounted(){
       var _this=this;
       axios({
         method:"post",
         url:'/netCloudOffer/productsService/productlistByParam',
         data:{id:_this.catalogId}
       }).then(res=>{
         if(res.data.code == 0) {
           console.log(res.data)
           var muniData = res.data;
           //云产品基本属性
           var baseInfo = muniData.data[1].offerProductObjectAttrList;
           var baseInfoObj = {};
           for (var i in baseInfo) {
             var attrId = baseInfo[i].objectAttrInfo.objAttrId;
             baseInfoObj[attrId] = baseInfo[i].objectAttrInfo.defaultValue;
           }
           _this.main_data[261] = baseInfoObj;
           //配置属性
           var info = muniData.data[0].offerProductObjectAttrList;
           var infoObj = {};//基本属性对象
           var infoListObj = {};//联动列表的对象
           var relationArr = [];//联动关系
           var systemDataObj = {};//系统盘下拉字符串和数值的分开
           for (var i in info) {
             var attrId = info[i].objectAttrInfo.objAttrId;
             infoObj[attrId] = info[i].objectAttrInfo.defaultValue;
             if (info[i].objectAttrValueList.length > 0) {
               var perObj = {};
               for (var k in info[i].objectAttrValueList) {
                 if (info[i].objectAttrValueList[k].objAttrValue == info[i].objectAttrInfo.defaultValue) {
                   infoObj[attrId] = info[i].objectAttrValueList[k].attrValueId;
                 }
                 //系统盘
//                if(info[i].objectAttrInfo.attrId==149) {
//                  var systemDataNum=info[i].objectAttrValueList[k].objAttrValue.slice(0,2);
//                  var systemDataStr=info[i].objectAttrValueList[k].objAttrValue.slice(2);
//                  systemDataObj[info[i].objectAttrValueList[k].attrValueId]=[info[i].objectAttrValueList[k].objAttrValue,systemDataNum,systemDataStr];
//                }

                 perObj[info[i].objectAttrValueList[k].attrValueId] = info[i].objectAttrValueList[k].remark;
               }
               //镜像
//               if (info[i].objectAttrInfo.attrId == 152) {
//                 var dataObj = {
//                   "imageType": "gold",
//                   "regionId": "cn-gzT"
//                 };
//                 axios({
//                   method: "post",
//                   /*url:'/netcloudBusinesscenterWeb/queryYunRes/queryImages',*/
//                   url: 'http://134.98.100.71:8081/netcloud-businesscenter-web/queryYunRes/queryImages',
//                   data: dataObj
//                 }).then(res => {
//                   var jxData = res.data;
//                   console.log(jxData)
//                   var obj = [];
//                   _this.mirror_data = jxData;
//                   //mirror_type
//
//                   for (let i in jxData) {
//                     for (let n in jxData[i]) {
//                       if (jxData[i][n].id == _this.main_data['241']['153']) {
//                         console.log(i, 'in id=153');
//                         _this.mirror_type_val = i;
//                       }
//                     }
//                   }
//                   let num = -1;
//                   for (var n in jxData) {
//                     // console.log('in for');
//                     if (!_this.mirror_type_val) {
//                       //console.log('in num');
//                       num++;
//                       if (num == 0) {
//                         //console.log('in num=0');
//                         _this.mirror_type_val = n;
//                         //console.log(_this.mirror_type_val,'in _this.mirror_type_val');
//                       }
//                     }
//                     obj.push(n);
//                   }
//                   _this.mirror_type = obj;
//                   _this.changeName(_this.mirror_type_val);
//                 }).catch(err => {
//                 })
//               }

               infoListObj[attrId] = perObj;
             }
             if (info[i].attrRefDefInfo) {
               relationArr.push(info[i].attrRefDefInfo.refObject);
             }
           }
           infoObj._item_p = {
             amount:''
           };

           console.log(infoObj, 'infoobj::');
           _this.main_data[241] = infoObj;
           _this.select_data = infoListObj;
           _this.relation_data = relationArr;
//          _this.system_disk_data=systemDataObj;
           _this.buy_amount.amount = _this.main_data['241']['180'];
           _this.time_set.amount = _this.main_data['241']['164'];
           _this.time_set.type = _this.select_data['179'][_this.main_data['241']['179']];
           //获取初始化价格
           _this.getPrice();
           // console.log(_this.system_disk_data);
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

    },
    methods:{
      //改变用户名
      changeName(val){
        //this.mirror_data
        var obj={};
        for(var i in this.mirror_data[val]){
          if(i==0){this.main_data["241"]["153"]=this.mirror_data[val][i].id};
          obj[this.mirror_data[val][i].id]=this.mirror_data[val][i].name;
        }
        this.mirror_version=obj;

        if(val=='Windows'){
          this.main_data['241']['156']='administrator';
        }else{
          this.main_data['241']['156']='root';
        }
      },
      //镜像联动版本
      imageFun(){
        var obj={};
        for(var i in this.copy_images_data[val]){
          if(i==0){this.images_val_txt=this.copy_images_data[val][i].name};
          obj[this.copy_images_data[val][i].id]=this.copy_images_data[val][i].name;
        }
        this.images_version_data=obj;
        console.log(this.images_version_data)
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
      rangerChangeFunc(lib_attr,max,min,bandwidth,ranger,same){
        this.ranger_lib = [];
        this.ranger_lib = lib_attr;
        this.ranger_max = max;
        this.ranger_min = max;
        this.main_data['241']['154'] = bandwidth;
        this.ranger_val = ranger;
        this.ranger_sameWithBandwidthOrNot = same;
      },
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
       // console.log(index+"___"+obj+"___"+attrId+"___"+attrValId+"___"+val)
        var _this=this;
        obj[attrId][attrValId]=index;
        for(var i in _this.relation_data){
            if(attrValId==_this.relation_data[i]){
              var dataObj={
                "linkageInfoList": [
                  {
                    "objAttrId":attrValId+'',//对象属性值ID
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
                  var selectVal = res.data.data.linkageList[0].objAttVal;
                  var selectData = res.data.data.linkageList[0].objAttrValList;
                  var objData = {};
                  var newAttrId = '';
                  for (var i in selectData) {
                    if (i == 0) {
                      newAttrId = selectData[i].objAttrId;
                      _this.main_data[attrId][newAttrId] = selectData[i].attrValueId;
                    }
                    objData[selectData[i].attrValueId] = selectData[i].objAttrValue;
                  }
                  _this.select_data[newAttrId] = objData;
                  //console.log(_this.main_data[attrId][newAttrId])
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
      },
      deleteDisk(){
        this.data_disk_bool=false;
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
          "productInfoList": [// 产品信息集合
            {
              "productInfo": {// 产品信息
                "product": {// 产品信息
                  "prodId": 241// 产品ID
                },
                "objectAttr": []
              }
            }
          ]
        };
        for(let one in this.main_data['241']){
          if(one !== '_item_p') {
            confList.productInfoList.productInfo.objectAttr.push({
              "objAttrId": one,// 对象属性ID
              "objAttVal": this.main_data['241'][one]
            });
          }
        }
        axios({
          method:'post',
          url:"/netCloudOffer/priceDefService/getObjAttrPrice",
          data:confList,
        }).then(function (response) {
          let lst = response.data.data;
          let code = response.data.code;
          if(code == '0'){
            that.main_data['241']._item_p.amount = lst.productInfoList[0].price;
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
      },

      ///////////////验证********************************************/
      /*提示语和红边框提示*/
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

      /////////////////////////加入购物车************************
      addToShoppingCart(prodId, prodFuncType){
        var _this = this;
        var user = window.sessionStorage.getItem('user');
        var cust = window.sessionStorage.getItem('cust');
        if(cust == null || cust == ""){
          this.$alert('您未选择客户，请选择', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          });
        };

        var userType = JSON.parse(user).staffType;
        var sysUserName = JSON.parse(user).sysUserName;
        var loginUserId = JSON.parse(user).staffId;
        var userId = JSON.parse(user).staffId;
        var certId = JSON.parse(cust).CUST_ID;

        if (loginUserId == "" || loginUserId == null) {
          this.$alert('您未登录，请登录', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          });
        };

        if (certId == "" || certId == null || userType == null || userType == "") {
          this.$alert('您未选择客户，请选择', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          });
        }

        if(_this.hasInputError){
          this.$alert('存在输入格式错误，请先根据提示进行检查修改后再加入购物车','提示',{
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          })
        }else {
          //----得到配置详情存到productAttrList中------------------
          var product_List = [];
          for (let item in _this.main_data) {
            let obj = _this.main_data[item];
            //判断第二层的值是对象还是字符串
            if ((typeof obj == 'string') && obj.constructor == String) {
              //此处为筛选出一次性费用作用
              let pro_item = {
                productId: item,
                amount: obj,
                serviceAttrList: []
              }
              product_List.push(pro_item);
            } else if ((typeof obj == 'object') && obj.constructor == Object) {
              let pro_item = {
                productId: item,
                serviceAttrList: []
              }
              for (let item_in in obj) {
                let obj_in = obj[item_in];
                //判断第三层的值的类型
                if (((typeof obj_in == 'string') && obj_in.constructor == String) || item_in == '126') {
                  //筛选出配置属性
                  let pro_item_in = {
                    attrId: item_in,
                    attrValue: obj[item_in]
                  }
                  pro_item.serviceAttrList.push(pro_item_in);
                } else if ((typeof obj_in == 'object') && obj_in.constructor == Object) {
                  //筛选出地址相关信息，和价格信息
                  for (let item_in_in in obj_in) {
                    pro_item[item_in_in] = obj_in[item_in_in];
                  }
                }
              }
              product_List.push(pro_item);
            }
          }

          //----IPRAN加入购物车并保存配置----------------------------------------------------------------
          axios({
            url: '/netCloudOrder/shoppingCartService/addShoppingCart',
            method: 'post',
            data: {
              code:prodId,
              actionCode:'添加',
              loginUserId: loginUserId,
              shoppingCart: {
                userId: certId,
                userType: userType
              },
              shoppingCartItem: {
                applyObjId: prodId,
                applyObjSpec: 1,
              },
              cartItemAttr: {
                attrId: 0,
                attrValue: 1,
              },
              offerId: prodId,
              productAttrList: product_List
            }
          }).then(response => {
            if (response.data.code == "0") {
              this.$router.push({path: '/myShoppingCart'});
            } else {
              this.$alert('添加购物车出错!', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  return false;
                }
              });
            }
          }).catch(err => {
          })
        }
      }

    }
  }
</script>

