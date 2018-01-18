<!-- 云主机配置组件 -->
<template>
  <div class="whiteBg">
    <div class="w1200 p15">
      <div class="base_info">
        <p class="title">云产品基本属性</p>
        <div class="select_account" v-if="!isHide">
          选择账号：
          <select v-model="existAccount.current" :disabled="cant_edit" @change="changeMainInfo(existAccount.current)">
            <option v-for="(item,index) in existAccount.list" :value="index">{{item['175']}}</option>
          </select>
          <a v-if="!cant_edit || !existBool" href="javascript:;" class="new_accout" @click="formEmpty()">新建账号</a>
        </div>
        <div class="content">
          <ul class="clearfix">
            <li class="clearfix">
              <span class="attr_name">管理员用户名</span>
              <div class="attr_val">
                <input :class="{'red-border':tip_for_callBackFunc['261']['170']}" :disabled="cant_edit || existBool" type="text" v-model="main_data['261']['170']"   @blur="checkUserName('261','170')"/>
                <div v-if="tip_for_callBackFunc['261']['170']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['261']['170']}}</div>
              </div>
            </li>
            <li class="clearfix">
              <span class="attr_name">密码</span>
              <div class="attr_val">
                <input :class="{'red-border':tip_for_callBackFunc['261']['171']}" :disabled="cant_edit || existBool" v-bind:type="[main_data['261']['171']!==''? 'password':'text']" v-model="main_data['261']['171']" @focus="setTypePassword($event)" @blur="checkPassword('261','171')"/>
                <div v-if="tip_for_callBackFunc['261']['171']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['261']['171']}}</div>
              </div>
            </li>
            <li class="clearfix">
              <span class="attr_name">行业标识</span>
              <div class="attr_val">
                <input :class="{'red-border':tip_for_callBackFunc['261']['172']}" :disabled="cant_edit || existBool" type="text"  v-model="main_data['261']['172']" @blur="checkNull('261','172')"/>
                <div v-if="tip_for_callBackFunc['261']['172']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['261']['172']}}</div>
              </div>
            </li>
            <li class="clearfix">
              <span class="attr_name">联系人姓名</span>
              <div class="attr_val">
                <input :class="{'red-border':tip_for_callBackFunc['261']['173']}" :disabled="cant_edit || existBool" type="text"  v-model="main_data['261']['173']" @blur="checkNull('261','173')"/>
                <div v-if="tip_for_callBackFunc['261']['173']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['261']['173']}}</div>
              </div>
            </li>
            <li class="clearfix">
              <span class="attr_name">联系人电话</span>
              <div class="attr_val">
                <input :class="{'red-border':tip_for_callBackFunc['261']['174']}" :disabled="cant_edit || existBool" type="text"  v-model="main_data['261']['174']"  @blur="checkPhone('261','174')"/>
                <div v-if="tip_for_callBackFunc['261']['174']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['261']['174']}}</div>
              </div>
            </li>
            <li class="clearfix">
              <span class="attr_name">邮箱地址</span>
              <div class="attr_val">
                <input :class="{'red-border':tip_for_callBackFunc['261']['175']}" :disabled="cant_edit || existBool" type="text"  v-model="main_data['261']['175']"  @blur="checkEmail('261','175')"/>
                <div v-if="tip_for_callBackFunc['261']['175']" class='has-tip'><i class='el-icon-error'></i> {{tip_for_callBackFunc['261']['175']}}</div>
              </div>
            </li>
            <li class="clearfix">
              <span class="attr_name">上传证件</span>

              <el-upload
                class="photo-upload"
                :data="{custId:CUST_ID}"
                :class="{'photo-upload-cannot-edit':cant_edit}"
                :disabled="cant_edit"
                ref="upload"
                action="/netCloudUser/customerImgService/uploadFile"
                :limit="1"
                accept="image/png,image/jpeg"
                :before-upload="checkBeforeUpload"
                :on-remove="handleRemove"
                :on-success="handleUploadSuccess"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">请上传企业营业执照正面照一张，目前仅支持jpg/png文件且不超过500kb,上传完成或删除<br/>已有照片后,请点击订单校验进行保存</div>
              </el-upload>

            </li>
          </ul>
        </div>
      </div>
      <div class="out-of-product-part" :class="{'cant-edit' : cant_edit}">
        <div class="out-of-product-part-l">
          <div class="product_part">
            <div class="product_bar clearfix">
              <span class="attr_name">订购类型</span>
              <div class="attr_val">

                <div class="input_wrap" v-for="(item,index) in select_data['143']">
                  <input type="checkbox" name="order_style"
                         :checked="main_data['241']['143'] == index"
                         :disabled="main_data['241']['143'] == index || cant_edit"
                         @click="cant_edit ? '':setCheckBox(index,'143');cant_edit ? '':getPrice(true)"/>
                    {{item}}
                </div>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">开通时间</span>
              <div class="attr_val clearfix">
                <div class="time_area clearfix">
                  <span class="minus" v-bind:class="{'no-minus':time_set.amount == 1}" v-on:click="cant_edit ? '':minusOrPlusTheAmount('-',time_set,$event);cant_edit ? '':getPrice(true);">-</span>
                  <input :disabled="cant_edit" type="text" v-model="time_set.amount" v-on:input="controlContent(time_set,$event)" @blur="cant_edit ? '':getPrice(true);" />
                  <span class="plus" v-bind:class="{'no-plus':time_set.amount == 100}"v-on:click="cant_edit ? '':minusOrPlusTheAmount('+',time_set,$event);cant_edit ? '':getPrice(true);">+</span>
                  <select :disabled="cant_edit" v-model="time_set.type">
                    <option  v-for="(option,index) in select_data['179']"  :value="index">{{option}}</option>
                  </select>
                </div>

              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">付费账户</span>
              <div class="attr_val">
                <select :disabled="cant_edit" class="jx_version" v-model="main_data['241']['280']">
                  <option v-for="(option,index) in pay_account" :value="index">{{option}}</option>
                </select>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">付费方式</span>
              <div class="attr_val">
                <div class="input_wrap" v-for="(item,index) in select_data['163']">
                  <input type="checkbox" name="pay_style"
                         :checked="main_data['241']['163'] == index"
                         :disabled="main_data['241']['163'] == index || cant_edit"
                         @click="cant_edit ? '':setCheckBox(index,'163');cant_edit ? '':getPrice(true);"/>
                  {{item}}
                </div>
              </div>
            </div>

            <div class="product_bar clearfix">
              <span class="attr_name">开通平台</span>
              <div class="attr_val">
                <ul class="val_list clearfix">
                  <li v-for="(item,index) in select_data['146']" :class="{active:main_data['241']['146']==index}" @click="cant_edit ? '':changeActive(index,main_data,'241','146',item,false)">{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">资源池</span>
              <div class="attr_val">
                <ul class="val_list clearfix">
                  <li v-for="(item,index) in select_data['145']" :class="{active:main_data['241']['145']==index}" @click="cant_edit ? '':changeActive(index,main_data,'241','145',item,false)">{{item}}</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="product_part">
            <div class="product_bar clearfix">
              <span class="attr_name">CPU(虚拟核数)</span>
              <div class="attr_val">
                <ul class="val_list clearfix">
                  <li v-for="(item,index) in select_data['147']" :class="{active:main_data['241']['147']==index}" @click="cant_edit ? '':changeActive(index,main_data,'241','147',item,false)">{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">内存</span>
              <div class="attr_val">
                <ul class="val_list clearfix">
                  <li v-for="(item,index) in select_data['148']" :class="{active:main_data['241']['148']==index}" @click="cant_edit ? '':changeActive(index,main_data,'241','148',item,false);cant_edit ? '':getPrice(true);">{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">镜像类型</span>
              <div class="attr_val">
                <ul class="val_list clearfix">
                  <li v-for="(item,index) in select_data['152']" :class="{active:main_data['241']['152']==index}" @click="cant_edit ? '':changeActive(index,main_data,'241','152',item,false)">{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">镜像</span>
              <div class="attr_val" v-if="mirror_show==true">
                <select :disabled="cant_edit" class="jx_select" v-model="main_data['241']['207']" @change="changeName(main_data['241']['207'])">
                  <option v-for="option in mirror_type" :value="option">{{option}}</option>
                </select>
                <select :disabled="cant_edit" class="jx_version" v-model="main_data['241']['153']">
                  <option v-for="(option,index) in mirror_version" :value="index">{{option}}</option>
                </select>
              </div>
              <div class="attr_val" v-if="mirror_show==false">
                <select :disabled="cant_edit" class="jx_version" v-model="main_data['241']['153']">
                  <option v-for="(option,index) in mirror_version" :value="index">{{option}}</option>
                </select>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">磁盘</span>
              <div class="attr_val">
                <div class="disk">
                  <span>系统盘</span>
                  <select :disabled="cant_edit" v-model="main_data['241']['149']">
                    <option v-for="(option,index) in select_data['149']" :value="index">{{option}}</option>
                  </select>
                  <span> {{main_data['241']['183']}}G</span>
                </div>
                <div class="data_disk" v-if="data_disk_bool==true">
                  <div class="disk">
                    <span>数据盘</span>
                    <select :disabled="cant_edit" v-model="main_data['241']['150']" @change="getPrice(true)">
                      <option v-for="(option,index) in select_data['150']" :value="index">{{option}}</option>
                    </select>
                        <input :disabled="cant_edit" type="number" v-model="main_data['241']['151']" @blur="handleNumMin();getPrice(true)" min="10"> G
                  </div>
                  <span class="delete_disk" @click="cant_edit ? '':deleteDisk();cant_edit ? '':getPrice(true);">删除</span>
                </div>
                <div class="add_disk" v-if="data_disk_bool==false">
                  <a href="javascript:;" @click="cant_edit ? '':addDisk()"><span>+</span>新增一块数据盘</a>
                  <!--您还可以挂载9块磁盘（云硬盘）-->
                </div>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">虚拟私有云</span>
              <div class="attr_val">
                <!--选项-->
                <ul class="val_list clearfix">
                  <li v-for="(item,index) in select_data['210']" :class="{active:main_data['241']['210']==index}" @click="cant_edit ? '':changeActive(index,main_data,'241','210',item,false)">{{item}}</li>
                </ul>
              </div>
            </div>
            <div class="product_bar clearfix">
              <span class="attr_name">带宽</span>
                <div class="attr_val bandwidth-width">
                  <div class="ranger-width">
                    <el-slider :disabled="cant_edit" v-model="ranger_val" :step="1" :show-tooltip="ranger_sameWithBandwidthOrNot" :max="ranger_max" :min="ranger_min" @change="getPrice(true)">
                    </el-slider>
                    <div class="scale-of-ranger">
                      <div v-for="(item,index) in width_of_scale_part" :style="{width:item+'px',height:'18px',float:'left','text-align':'right',position:'relative'}">
                        <span @click="cant_edit ? '':quickSetRanger(ranger_lib[index][1]);cant_edit ? '':getPrice(true);">{{ranger_lib[index][0]}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="bandwidth-get">
                    <input :disabled="cant_edit" type="text" :readonly="!ranger_sameWithBandwidthOrNot" v-model="main_data['241']['154']" @blur="inputBandwidth();getPrice(true);"/>
                    <span>Mb</span>
                  </div>
              </div>
            </div>

          </div>
          <div class="product_part">
            <div class="product_bar clearfix">
              <span class="attr_name">订购数量</span>
              <div class="attr_val clearfix">
                <div class="time_area clearfix">
                  <span class="minus" v-bind:class="{'no-minus':buy_amount.amount == 1}" v-on:click="cant_edit ? '':minusOrPlusTheAmount('-',buy_amount,$event)">-</span>
                  <input :disabled="cant_edit" type="text" v-model="buy_amount.amount" v-on:input="controlContent(buy_amount,$event)">
                  <span class="plus" v-bind:class="{'no-plus':buy_amount.amount == 100}"v-on:click="cant_edit ? '':minusOrPlusTheAmount('+',buy_amount,$event)">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="out-of-product-part-r configure_detail">
            <p class="title">配置详情</p>
            <div class="content">
              <div class="content_bar"><span class="attr">订购类型：</span><span class="val">{{select_data['143'][main_data['241']['143']]}}</span></div>
              <div class="content_bar"><span class="attr">开通平台：</span><span class="val">{{select_data['146'][main_data['241']['146']]}} {{select_data['145'][main_data['241']['145']]}}</span></div>
              <div class="content_bar"><span class="attr">规格：</span><span class="val">{{select_data['147'][main_data['241']['147']]}}核 | {{select_data['148'][main_data['241']['148']]}}G</span></div>
              <div class="content_bar"><span class="attr">镜像类型：</span><span class="val">{{select_data[152][main_data['241']['152']]}}</span></div>
              <div class="content_bar"><span class="attr">系统盘：</span><span class="val">{{select_data['149'][main_data['241']['149']]}} {{main_data['241']['183']}}G</span></div>
              <div class="content_bar"><span class="attr">数据盘：</span><span class="val">{{select_data['150'][main_data['241']['150']]}} {{main_data['241']['151']}}G</span></div>
              <div class="content_bar"><span class="attr">带宽：</span><span class="val" v-if="main_data['241']['154']">{{main_data['241']['154']}} Mb</span></div>
              <div class="content_bar"><span class="attr">商用时间：</span><span class="val">{{time_set.amount+select_data['179'][time_set.type]}}</span></div>
              <div class="content_bar"><span class="attr">订购数量：</span><span class="val">{{buy_amount.amount}}台</span></div>
              <div v-if="chanel == 'shoppingCart' && (prodList.statusCd == '12' || prodList.statusCd == '15')" class="conf-save">
                <el-button :disabled="cant_edit" type="warning" plain @click="cant_edit ? '':updateCartConf('301','','15')">订单校验</el-button>
                <el-button :disabled="cant_edit" type="warning" plain @click="cant_edit ? '':updateCartConf('301','','10')">资源审核</el-button>

              </div>
            </div>
        </div>

      </div>
    </div>
    <div class="bot_price" v-if="chanel !== 'shoppingCart'">
      <div class="w1200 clearfix">
        <p>配置费用：<span class="price_num">¥{{parseFloat(main_data['241']._item_p.amount) * parseInt(main_data['241']._item_p.num)}}</span></p>
        <div class="gocart_btn" @click="cant_edit ? '':addToShoppingCart('301','','15')">加入购物车</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  /**选择账户**/
  .select_account{
    font-size:14px;
    margin-bottom:10px;
    select{
      margin-right:10px;
      width:200px;
      height:30px;
    }
    .new_accout{
      color:#2883D6;
      font-size:14px;
    }
  }
  /**文件上传列表样式**/
  .photo-upload{
      margin-left: 120px;
      /deep/ .photo-upload-choose {
        display: inline;
        margin: 0;
      }
      /deep/ .el-upload__input{
        display: none;
      }

      /deep/ .el-upload-list__item{
        width:210px;
      }
  }

  /**上传文件控件--不能修改**/
  .photo-upload-cannot-edit{
    /deep/ button{
      background-color:#e5e5e5;
      border-color:#e5e5e5;
      cursor:default;
    }
  }

  .has-tip{
    position:absolute;
    left:0;
    top:30px;
    width:300px;
    font-size: 12px;
    color:red;
    line-height:16px;
    word-wrap: break-word;
    word-break: normal;
  }
  .jx_select,.jx_version{height:30px;}
  .whiteBg{background:white;}
  .linH30{line-height:30px;}
  p,table,ul{margin:0;padding:0;}
  .w1200{width:1200px;margin:0 auto;}
  .base_info{
    border-top:1px solid #e8e8e8;
    margin-bottom:20px;
    .title{
      font-weight:bold;
      font-size:16px;
      padding:15px 0;
    }
    .content{
      background:#f2f2f2;
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
    width: 918px;
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
    .conf-save{
      width:100%;
      height:60px;
      padding:8px 0;
      border-top: 1px solid #e5e5e5;
      line-height: 40px;
      text-align: center;
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
        width:100px;
        line-height:30px;
        font-weight:bold;
      }
      .attr_val{
        float:left;
        line-height:30px;
        width:798px;
        input[type=radio]{
          margin-left:40px;
          margin-right:10px;
          position:relative;
          top:2px;
        }
        .input_wrap{
          display:inline-block;
          min-width:100px;
          margin-right:20px;
          input{
            margin-right:5px;
          }
        }
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
              float:left;
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
          li.bandwidth-setted{
            span{
              margin-left:15px;
              width:170px;
            }
          }
        }
      }
      .bandwidth-label-width{
        width:60px;
        line-height: 38px;
      }
      .bandwidth-width{
        width:650px;
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
    li:nth-child(7n+1){
      margin-left:0;
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

  .p15{
    width:1200px;
    padding:0 20px;
    .out-of-product-part{
      width:1160px;
    }
    .out-of-product-part-l{
      width:878px;
    }
    .product_part .product_bar .attr_val{
      width:758px;
    }
  }

  .cant-edit{
    .val_list li.active{
      background:#999;
    }
    .val_list li{
      cursor: not-allowed;
    }
    input,select,span.plus,span.minus,.scale-of-ranger div span,.delete_disk{
      cursor: not-allowed;
    }
    span.minus {
      border: 1px solid #ccc;
      border-right: none;
      color: #ccc;
    }
    span.plus{
      border: 1px solid #ccc;
      border-left: none;
      color: #ccc;
    }
  }
</style>
<script>
  export default{
    props:[
        'prodList','chanel','price_and_num'
    ],
    data(){
        return {
          emailList:{},//存储邮箱地址{email:integrationId}
          accountProdInstId:{},//账号{integrationId:prodInstId}
          /**存放证件照片的列表**/
          fileList:[],
          isHide:true,//账户选择条是否隐藏
          existAccount:{//账户下拉对象
             current:'',//当前值
             list:{//下拉存储2主信息

             }
          },//存储账户的列表对象
          regionIdStr:'',//资源池接口调用值
          existBool:false,//是否已经存在值
          CUST_ID:'',//客户Id
          readValBool:false,//是否是有配置信息
          cant_edit:false,//判断所有属性能不能修改
          system_data_num:'',//系统盘大小
          system_data_str:'',//系统盘类型
          catalogId:'301',//云产品固定商品id
          password_confirm:'',
          parProdId:'',//主产品id
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
              '163':'',//收费方式
              '165':'',//虚拟私有云名称
              '166':'',//VPC申请起始IP
              '167':'',//VPC申请终止IP
              '164':'',//订购时长
              '179':'',//订购时长单位
              '180':'',//订购数量
              '207':'',//操作系统OS_STYLE
              '208':'',//操作系统版本
              '209':'',//
              '210':'',//vpc
              '280':'',//付费账号
              '_item_p':{
                'amount':'',
                'num':''
              },
              '304':'', //用户证件照
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
          show_data:{},
          select_data:{
            '143':{},//订购类型
            '145':{},//资源池
            '146':{},//开通平台
            '147':{},//CPU
            '148':{},//内存
            '149':{},//系统盘
            '150':{},//数据盘类型
            '152':{},//镜像类型
            '163':{},//收费方式
            '210':{},//vpc
            '179':{},//订购时长单位
            '280':{}//付费账号
          },
          buy_type_itemCd:'',
          resource_pool:[],//资源池列表

          data_disk_bool:true,
          system_disk_data:{},
          //付费账户
          pay_account:{},//key为索引，value为acctId
          //镜像
          mirror_type:[],
          mirror_version:{},
          mirror_data:{},
          mirror_show:true,
          images_data:[],
          images_val_txt:'',
          images_version_data:{},
          copy_images_data:{},
          relation_data:{},
          cloud_select:0,
          IP_select:0,
          time_set:{
            amount:'',
            type:'',
            start_day:'',
            end_day:'',
          },
          buy_amount:{
            amount:'1'
          },
          ranger_val:1,
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
          //数据盘
          dataDisk:{
              selectList:['SATA','sata'],
              inputVal:'500',
              selectVal:'SATA',
              dataList:[
                {currentSelect:'SATA',currentInput:'100'},
              ]
          },
          hasInputError:false,
          tip_for_callBackFunc:{
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
          }
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
            width_of_scale_part = 0;
          }else {
            width_of_scale_part = (((this.ranger_lib[i][1] - this.ranger_lib[i - 1][1]) / (this.ranger_lib[length_of_lib - 1][1] - this.ranger_lib[0][1])).toFixed(4)*500).toString();
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
        this.main_data['241']['_item_p']['num'] = this.buy_amount.amount;
      },
      main_data:{
        handler(curVal,oldVal){
          //系统盘大小变化绑定和系统盘类型变化绑定
//          this.system_data_num = this.system_disk_data[this.main_data["241"]["149"]][1];
//          this.system_data_str = this.system_disk_data[this.main_data["241"]["149"]][2];

          //订购数量绑定
          this.buy_amount.amount = this.main_data["241"]["180"];
          this.main_data['241']['_item_p']['num'] = this.main_data["241"]["180"];
          this.time_set.amount = this.main_data["241"]["164"];
          this.time_set.type = this.main_data["241"]["179"];
          this.buy_type_itemCd = this.main_data["241"]["143"] == '181' ? '1' : '2';
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
       let _this = this;
       if(_this.prodList){
         _this.initializtion(_this.prodList.confList);
       }else {
         axios({
           method: "post",
           url: '/netCloudOffer/productsService/productlistByParam',
           data: {id: _this.catalogId}
         }).then(res => {
           if (res.data.code == 0) {
             //初始化
             _this.initializtion(res.data.data);
           } else {
             this.$alert(res.data.msg, '提示', {
               confirmButtonText: '确定',
               callback: action => {
                 return false;
               }
             });
           }
         }).catch(err => {
         })
       }
    },
    methods:{

      handleNumMin(){
        if(this.main_data['241']['151'] < 10){
          this.main_data['241']['151'] = 10;
        }
      },
      /**文件上传成功后将file项添加至fileList**/
      handleUploadSuccess:function (response, file, fileList) {
        let _this = this;
        /**如果返回成功,则将返回值赋值至fileList**/
        if(response.code == '0'){
            let tmp = {};
            tmp.name = file.name;
            _this.fileList.push(tmp);
        }
      },

      /**提交前校验照片是否满足格式和大小需求**/
      checkBeforeUpload:function (file) {
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png');
        const isLtSize = file.size / 1024 / 1024 < 0.5;
        if (!isJPG) {
          this.$message.error('上传图片只能是JPG或PNG格式!');
        }
        if (!isLtSize) {
          this.$message.error('上传图片大小不能超过500kb!');
        }
        return isJPG && isLtSize;
      },

      /**删除照片**/
      handleRemove:function (file) {
        let _this = this;
        //删除fileList中对应的元素
        for (let index in _this.fileList){
          if(file.name == _this.fileList[index].name){
            _this.fileList.splice(index,1)
          }
        }
      },

      /**提交证件照片**/
      submitUpload:function () {
          this.$refs.upload.submit();
      },

      //初始化
      initializtion(product_list_by_param){
        let _this = this;
        //云产品基本属性
        let baseInfo;
        let info;
        for(var index in product_list_by_param){
          if(product_list_by_param[index].productInfo.prodId=='261'){
            baseInfo=product_list_by_param[index].offerProductObjectAttrList;
          }else if(product_list_by_param[index].productInfo.prodId=='241'){
            info = product_list_by_param[index].offerProductObjectAttrList;
          }
          if(product_list_by_param[index].productInfo.parProdId == null){
            _this.parProdId = product_list_by_param[index].productInfo.prodId;
          }
        }
        let baseInfoObj = {};
        for (let i in baseInfo) {
          let attrId = baseInfo[i].objectAttrInfo.attrId;
          baseInfoObj[attrId] = baseInfo[i].objectAttrInfo.defaultValue;
        }
        //console.log('baseInfoObj:',baseInfoObj);

        _this.main_data['261'] = baseInfoObj;
        /**新增功能:初始化用户信息**/
        _this.getHostInfo();
        //配置属性
        let infoObj = {};//基本属性对象
        let infoListObj = {};//联动列表的对象
        let relationArr = {};//联动关系
        let systemDataObj = {};//系统盘下拉字符串和数值的分开
        let imagesVal='';
        for (let i in info) {
          let attrId = info[i].objectAttrInfo.attrId;
          infoObj[attrId] = info[i].objectAttrInfo.displayValue;
          //show_data[attrId]=info[i].objectAttrInfo.displayValue;
          if (info[i].objectAttrValueList.length > 0) {
            let perObj = {};
            for (let k in info[i].objectAttrValueList) {
              if (info[i].objectAttrValueList[k].objAttrValue == info[i].objectAttrInfo.defaultValue) {
                infoObj[attrId] = info[i].objectAttrValueList[k].attrValueId;
              }

              perObj[info[i].objectAttrValueList[k].attrValueId] = info[i].objectAttrValueList[k].displayValue;
            }

            //镜像的初始化
            if (info[i].objectAttrInfo.attrId == 152) {
              imagesVal=info[i].objectAttrInfo.defaultValue;
            }
            if(info[i].objectAttrInfo.attrId == 145){
              _this.resource_pool=info[i].objectAttrValueList;
            }
            infoListObj[attrId] = perObj;
          }else if(info[i].objectAttrValueList.length==0){
            infoObj[attrId] = info[i].objectAttrInfo.displayValue;
            //付费账户
            if(info[i].objectAttrInfo.attrId == 280){
              _this.getaccount();
            }
          }
          if (info[i].attrRefDefList.length>0) {
            relationArr[info[i].attrRefDefList[0].refObject]=info[i].attrRefDefList[0].attrId;
          }
        }
        infoObj._item_p = {
          amount:'',
          num:infoObj['180']
        };

        infoObj['301'] = '';
        _this.main_data['241'] = infoObj;
        _this.select_data = infoListObj;
        _this.relation_data = relationArr;
        _this.ranger_val = parseInt(_this.main_data['241']['154']);
        _this.buy_amount.amount = _this.main_data['241']['180'];
        _this.time_set.amount = _this.main_data['241']['164'];
        _this.time_set.type = _this.select_data['179'][_this.main_data['241']['179']];

        _this.getPrice(false);
        //当在购物车页面，调用getCartConf函数会进行重新配置
        if(_this.prodList) {
          _this.getCartConf();
        }

        for(var i in _this.resource_pool){
          if(_this.resource_pool[i].attrValueId==_this.main_data['241']['145']){
            _this.regionIdStr=_this.resource_pool[i].objAttrValue;
          }
        }
        _this.getMirrorList(imagesVal);
      },
      //checkbox模拟radio，点击赋值
      setCheckBox(index,key){
        this.main_data['241'][key] = index;
      },
      //付费账号
      getaccount(){
        var _this=this;
        if(window.sessionStorage && window.sessionStorage.getItem('cust')){
          var cust = window.sessionStorage.getItem('cust');
          _this.CUST_ID = JSON.parse(cust).CUST_ID;
        }
          axios({
            method: "post",
            url: '/netCloudCustomer/acctService/queryAcctInfo',
            data: {"custId":_this.CUST_ID}
          }).then(res => {
            if (res.data.code == 0) {
              if(res.data.data.length>0){
                for(var i in res.data.data) {
                    if(!_this.readValBool || !_this.main_data['241']['280']){
                      if(i==0) _this.main_data['241']['280']=res.data.data[i].acctId;
                    }
                  _this.pay_account[res.data.data[i].acctId] = res.data.data[i].acctCode;
                }
              }
            } else {
              this.$alert(res.data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  return false;
                }
              });
            }
          }).catch(err => {
          })
      },
      //新建主产品信息
      formEmpty(){
        this.existBool=false;
        for(let key in this.main_data['261']){
          this.main_data['261'][key]='';
          this.callBackFunc('261',key,'');
        }
        this.existAccount.current='';
      },
      //是否有云主机账户
      getHostInfo(){
        var _this=this;
        if(window.sessionStorage && window.sessionStorage.getItem('cust')){
          var cust = window.sessionStorage.getItem('cust');
          _this.CUST_ID = JSON.parse(cust).CUST_ID;
        }
        axios({
          method: "post",
          url: '/netCloudOrder/cartItemAttrService/queryCartItemAttrByCustId',
          data: {"custId":_this.CUST_ID}
        }).then(res => {
          if (res.data.code == 0) {
            var obj={};
            if(res.data.data.length>0){
              _this.existBool=true;
              _this.isHide=false;
              let numindex=-1;
              let objAll={};
              let emailObj={};
              for(let item of res.data.data){
                  numindex++;
                  for(let perItem of item.productAttrList){
                      if(perItem.productId=='261'){
                          let obj={};
                          for(let value of perItem.serviceAttrList){
                            if(numindex==0){
                                _this.existAccount.current=perItem.integrationId;
                            }
                            obj[value.attrId]=value.attrValue;
                            _this.accountProdInstId[perItem.integrationId]=perItem.prodInstId;
                            if(value.attrId=='175'){
                              emailObj[value.attrValue]=perItem.integrationId;
                            }
                          }
                          objAll[perItem.integrationId]=obj;
                      }
                  }
              }

              if(_this.readValBool){
                if(_this.main_data['261']['175']){
                  if(!_this.emailList.hasOwnProperty(_this.main_data['261']['175'])){
                    _this.existAccount.current='';
                  }else{
                    _this.existAccount.current=_this.emailList[_this.main_data['261']['175']];
                  }
                }

              }
              _this.existAccount.list=objAll;
              _this.emailList=emailObj;
              //console.log(_this.accountProdInstId)
              //_this.prodInstId=this.accountProdInstId[this.existAccount.current];
              _this.$emit('update:prodInstId',_this.accountProdInstId[_this.existAccount.current]);
              _this.main_data['261']=JSON.parse(JSON.stringify(_this.existAccount.list[_this.existAccount.current]));
            }

          } else {
            this.$alert(res.data.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                return false;
              }
            });
          }
        }).catch(err => {
        })
      },
      //改变云主机账户信息
      changeMainInfo(str){
        this.existBool=true;
        this.$set(this.main_data,'261',JSON.parse(JSON.stringify(this.existAccount.list[this.existAccount.current])));
        this.$emit('update:prodInstId',this.accountProdInstId[this.existAccount.current]);
        for(let key in this.main_data['261']){
          this.callBackFunc('261',key,'');
        }
      },
      //改变用户名
      changeName(val){
        //this.mirror_data
        let obj={};
        for(let i in this.mirror_data[val]){
          if(!this.readValBool || !this.main_data["241"]["153"]) {
            if (i == 0) this.main_data["241"]["153"] = this.mirror_data[val][i].id;
          }
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
        let obj={};
        for(let i in this.copy_images_data[val]){
          if(i==0){this.images_val_txt=this.copy_images_data[val][i].name};
          obj[this.copy_images_data[val][i].id]=this.copy_images_data[val][i].name;
        }
        this.images_version_data=obj;
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
          this.ranger_val = parseInt(this.main_data['241']['154']);
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
        let _this=this;
        obj[attrId][attrValId]=index;
        for(let i in _this.relation_data){
            if(attrValId==i){
              let dataObj={
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
                  let mainData=res.data.objectAttrValueList;
                  let objData = {};
                  let newAttrId = res.data.tarAttrId;
                  for(let i in mainData){
                    if(!_this.readValBool){
                      if (i == 0) {
                        _this.main_data[attrId][newAttrId] = mainData[i].attrValueId;
                      }
                    }else{
                      let flag_curList_include = false;
                      for(let n in mainData){
                        if(mainData[n].attrValueId == _this.main_data[attrId][newAttrId]){
                          flag_curList_include = true;
                        }
                      }
                      if(!flag_curList_include && i == 0){
                        _this.main_data[attrId][newAttrId] = mainData[i].attrValueId;
                      }
                    }

                    objData[mainData[i].attrValueId] = mainData[i].objAttrValue;
                  }
                  _this.select_data[newAttrId] = objData;
                  _this.getPrice(true);
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
        if(attrValId=='152'){
          if(val=='公共镜像'){
            _this.mirror_show=true;
            _this.getMirrorList('gold');
          }else if(val=='私有镜像'){
            _this.mirror_show=false;
            _this.getMirrorList('private');
          }
        };
        if(attrValId=='145'){
          var val='';
          for(var key in _this.select_data['152']){
            if(_this.main_data['241']['152']==key){
                val=_this.select_data['152'][key];
                if(val=='公共镜像'){
                  _this.mirror_show=true;
                  _this.getMirrorList('gold');
                }else if(val=='私有镜像'){
                  _this.mirror_show=false;
                  _this.getMirrorList('private');
                }
            }
          }
        }
      },
      //数量input输入时确保输入为1到max_amount间的数字。
      controlContent:function(item,event){
        let max_amount = 100;
//        let el = event.currentTarget;
        let amount_input = item.amount;
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
        //event.preventDefault();
        if(m_or_p == '-' && item.amount > 1){
          item.amount--;
        }else if(m_or_p == '+' && item.amount < 100){
          item.amount++;
        }
      },
      deleteDisk(){
        this.data_disk_bool=false;
        this.main_data['241']['151'] = 0;
      },
      addDisk(){
        this.data_disk_bool=true;
        /*let addObj={currentSelect:this.dataDisk.selectVal,currentInput:this.dataDisk.inputVal};
        this.dataDisk.dataList.push(addObj);*/
      },


      setTypePassword(event){
        let el = event.currentTarget;
        $(el).attr('type','password');
      },

      //获取产品价格
      getPrice:function(flag_getP_182){
        let that = this;
        //判断订购类型为试用还是商用
        if(that.main_data['241']['143'] == '181') {
          //判断当前是否在购物车页面
          if(that.prodList) {
            //判断是否为购物车配置对应的价格
            if (flag_getP_182) {
              that.getPriceAxios();
            }
          }else{
            that.getPriceAxios();
          }
        }else if(that.main_data['241']['143'] == '182') {
          that.main_data['241']._item_p.amount = 0;
          that.$emit('update:price_and_num', {
            price:that.main_data['241']._item_p.amount,
            num:that.main_data['241']['180']
          });
        }


      },

      getPriceAxios:function(){
        let that = this;
        let confList = {
          "offerInfo":{
            "offerId":301,// 商品id
            "offerObjectAttr": [
            ]
          },
          "productInfoList": [// 产品信息集合
            {
              "productInfo": {// 产品信息
                "product": {// 产品信息
                  "prodId": 241, // 产品ID
                  "offerId": 301//商品ID
                },
                "objectAttr": []
              }
            }
          ]
        };
        //console.log("confList:",confList)
        for (let one in this.main_data['241']) {
          if (one !== '_item_p') {
            //main_data['241']中保存的是id值还是属性值的标示
            let flag = true;
            for (let item in this.select_data) {
              //如果是id值，在select_data中遍历获取属性值
              if (one == item) {
                confList.productInfoList[0].productInfo.objectAttr.push({
                  "objAttrId": one,// 对象属性ID
                  "objAttVal": this.select_data[item][this.main_data['241'][one]]
                });
                flag = false;
              }
            }
            //如果是属性值就直接保存
            if (flag) {
              confList.productInfoList[0].productInfo.objectAttr.push({
                "objAttrId": one,// 对象属性ID
                "objAttVal": this.main_data['241'][one] || '0'
              });
            }
          }
        }
        axios({
          method: 'post',
          url: "/netCloudOffer/priceDefService/getObjAttrPrice",
          data: confList,
        }).then(function (response) {
          let lst = response.data.data;
          let code = response.data.code;
          if (code == '0') {
            let count = 1;
            if(that.main_data['241']['163'] == '229'){
              count = parseInt(that.main_data['241']['164']);
            }
            that.main_data['241']._item_p.amount = parseInt(lst.productInfoList[0].price) * count;
            that.$emit('update:price_and_num', {
              price: that.main_data['241']._item_p.amount,
              num: that.main_data['241']['180']
            });
          } else if (code == '1') {
            this.$alert(response.data.msg, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                return false;
              }
            });
          }
        }).catch(err => {
        })
      },
      ///////////////验证********************************************/
      /*提示语和红边框提示*/
      callBackFunc:function(key1,key2,tip){
        let _this = this;
        _this.tip_for_callBackFunc[key1][key2] = tip;
      },
      checkNull(key1,key2){
        if (!this.main_data[key1][key2]) {
          this.callBackFunc(key1,key2,'不能为空');
        } else {
          this.callBackFunc(key1,key2,'');
        }
      },
      checkPhone:function(key1,key2){
        if (!this.main_data[key1][key2]) {
          this.callBackFunc(key1,key2,'联系电话不能为空');
        }else{
          let re1 = /^1\d{10}$/;
          let re2 = /^0\d{2,3}-?\d{7,8}$/;
          if (!re1.test(this.main_data[key1][key2]) && !re2.test(this.main_data[key1][key2])) {
            this.callBackFunc(key1,key2,'电话格式有误');
          } else {
            this.callBackFunc(key1,key2,'');
          }
        }
      },
      checkEmail(key1,key2){
        if (!this.main_data[key1][key2]) {
          this.callBackFunc(key1,key2,'邮箱地址不能为空');
        }else{
          let re = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
          if (!re.test(this.main_data[key1][key2])) {
            this.callBackFunc(key1,key2,'邮箱地址格式有误');
          } else {
            for(let key in this.emailList){
              if(this.main_data['261']['175'] == key){
                this.callBackFunc(key1,key2,'此邮箱地址已有，请输入新邮箱地址');
                return false;
              }
            }
            this.callBackFunc(key1,key2,'');
          }
        }
      },
      checkPassword:function(key1,key2){
        if (!this.main_data[key1][key2]) {
          this.callBackFunc(key1,key2,'密码不能为空');
        }else{
          let re = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{8,26}$/;
          if (!re.test(this.main_data[key1][key2])) {
            this.callBackFunc(key1,key2,'8-26位，至少有大小写字母/数字/字符中3类');
          } else {
            this.callBackFunc(key1,key2,'');
          }
        }
      },
      checkUserName:function(key1,key2){
        if (!this.main_data[key1][key2]) {
          this.callBackFunc(key1,key2,'用户名不能为空');
        }else{
          let re = /^[a-zA-Z]+$/;
          if (!re.test(this.main_data[key1][key2])) {
            this.callBackFunc(key1,key2,'用户名只能包含字母');
          } else {
            this.callBackFunc(key1,key2,'');
          }
        }
      },
      //提交表单前检验是否有错误
      hasErrorWhenSubmit(){
        let _this = this;
        if(!_this.existBool){
          _this.checkUserName('261','170');
          _this.checkPassword('261','171');
          _this.checkNull('261','172');
          _this.checkNull('261','173');
          _this.checkPhone('261','174');
          _this.checkEmail('261','175');
        };
        for(let key1 in _this.tip_for_callBackFunc){
          for(let key2 in _this.tip_for_callBackFunc[key1]){
            if(_this.tip_for_callBackFunc[key1][key2]){
              return true;
            }
          }
        }
        return false;
      },

      /////////////////////////加入购物车************************
      addToShoppingCart(prodId, prodFuncType,statusCd){
        let _this = this;
        let user = window.sessionStorage.getItem('user');
        let cust = window.sessionStorage.getItem('cust');
        if(cust == null || cust == ""){
          this.$alert('您未选择客户，请选择', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          });
        };

        let userType = JSON.parse(user).staffType;
        let sysUserName = JSON.parse(user).sysUserName;
        let loginUserId = JSON.parse(user).staffId;
        let userId = JSON.parse(user).staffId;
        let certId = JSON.parse(cust).CUST_ID;

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

        if(_this.hasErrorWhenSubmit()){
          this.$alert('存在输入格式错误，请先根据提示进行检查修改后再加入购物车','提示',{
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          })
        }else {
          //----得到配置详情存到productAttrList中------------------
          let product_List = [];
          for (let item in _this.main_data) {
            let obj = _this.main_data[item];

            //判断第二层的值是对象还是字符串
            if ((typeof obj == 'string') && obj.constructor == String) {
              //此处为筛选出一次性费用作用
              let pro_item = {
                productId: item,
                parProdId:_this.parProdId,
                amount: obj,
                serviceAttrList: []
              }
              product_List.push(pro_item);
            } else if ((typeof obj == 'object') && obj.constructor == Object) {
              let pro_item = {};
              if(_this.parProdId == item){
                pro_item = {
                  productId: item,
                  parProdId:'',
                  serviceAttrList: []
                }
              }else{
                pro_item = {
                  productId: item,
                  parProdId:_this.parProdId,
                  serviceAttrList: []
                }
              }
              for (let item_in in obj) {
                let obj_in = obj[item_in];
                //判断第三层的值的类型
                if(!isNaN(obj_in) && obj_in){
                  obj_in = obj_in.toString();
                  //alert(obj_in);
                }
                if (((typeof obj_in == 'string') && obj_in.constructor == String) || item_in == '126' || !obj_in) {
                  //筛选出配置属性
                  let pro_item_in = {
                    attrId: item_in,
                    attrValue: obj_in
                  }

                  /**保存用户证件照的文件路径**/
                  if(item_in == '304'){
                    let file_list_str = _this.handleFileListStr(_this.fileList)
                    pro_item_in.attrValue = file_list_str;
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
          /**保存证件照相关**/


         //----IPRAN加入购物车并保存配置----------------------------------------------------------------
         axios({
            url: '/netCloudOrder/shoppingCartService/addShoppingCart',
            method: 'post',
            data: {
              code:prodId,
              itemCd:_this.buy_type_itemCd,     //1新装 2 试用
              statusCd:statusCd,
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
              this.$router.push({path: '/shoppingCartFrame'});
            } else {
              this.$alert(response.data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  return false;
                }
              });
            }
          }).catch(err => {
          })
        }
      },

      /**处理fileList字符串**/
      handleFileListStr:function () {
          let str = "";
          let _this = this;
          for(let token of _this.fileList){
              str = str + token.name + ";";
          }
          /**去掉末尾的分号**/
          str = str.substring(0,str.length - 1);
          return str;
      },

      /**将证件照字符串相关信息转化为fileList**/
      transformStrInfo:function (param) {
        if(param != '' && param != null) {
          let outsideList = param.split(";")
          let _this = this;

          for (let token of outsideList) {
            let tmp = {};
            tmp.name = token;
            _this.fileList.push(tmp);
          }
        }
      },

      /////////////////////////配置保存(订单校验)************************
      updateCartConf(prodId, prodFuncType,statusCd){
        let _this = this;
        console.log("statusCd:",statusCd)
        if(statusCd==10) _this.isHide=true;//隐藏已有账户
        let user = window.sessionStorage.getItem('user');
        let cust = window.sessionStorage.getItem('cust');
        if(cust == null || cust == ""){
          this.$alert('您未选择客户，请选择', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          });
        };

        let userType = JSON.parse(user).staffType;
        let sysUserName = JSON.parse(user).sysUserName;
        let loginUserId = JSON.parse(user).staffId;
        let userId = JSON.parse(user).staffId;
        let certId = JSON.parse(cust).CUST_ID;

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
        console.log(_this.fileList)
        if(_this.fileList.length == 0){
          this.$alert('请上传证件', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
        }else{
          if(_this.hasErrorWhenSubmit()){
            this.$alert('存在输入格式错误，请先根据提示进行检查修改后再加入购物车','提示',{
              confirmButtonText: '确定',
              callback: action => {
                return false;
              }
            })
          }else {
            //----得到配置详情存到productAttrList中------------------
            let product_List = [];
            for (let item in _this.main_data) {
              let obj = _this.main_data[item];

              //判断第二层的值是对象还是字符串
              if ((typeof obj == 'string') && obj.constructor == String) {
                //此处为筛选出一次性费用作用
                let pro_item = {
                  productId: item,
                  parProdId:_this.parProdId,
                  amount: obj,
                  serviceAttrList: []
                }
                product_List.push(pro_item);
              } else if ((typeof obj == 'object') && obj.constructor == Object) {
                let pro_item = {};
                if(_this.parProdId == item){
                  pro_item = {
                    productId: item,
                    parProdId:'',
                    serviceAttrList: []
                  }
                }else{
                  pro_item = {
                    productId: item,
                    parProdId:_this.parProdId,
                    serviceAttrList: []
                  }
                }
                for (let item_in in obj) {
                  let obj_in = obj[item_in];
                  //判断第三层的值的类型
                  if(!isNaN(obj_in) && obj_in){
                    obj_in = obj_in.toString();
                  }
                  if (((typeof obj_in == 'string') && obj_in.constructor == String) || item_in == '126' || !obj_in) {
                    //筛选出配置属性
                    let pro_item_in = {
                      attrId: item_in,
                      attrValue: obj_in
                    }

                    /**保存用户证件照的文件路径**/
                    if(item_in == '304'){
                      let file_list_str = _this.handleFileListStr(_this.fileList)
                      pro_item_in.attrValue = file_list_str;
                    }

                    pro_item.serviceAttrList.push(pro_item_in);
                  } else if ((typeof obj_in == 'object') && obj_in.constructor == Object) {
                    //筛选出地址相关信息，和价格信息
                    for (let item_in_in in obj_in) {
                      pro_item[item_in_in] = obj_in[item_in_in];
                    }
                  }
                }

                /**如果账号非新建，送对应的prodInstId,否则送空**/
                if(pro_item.productId ==  '261'){
                  if(_this.accountProdInstId[_this.existAccount.current]){
                    pro_item.newProdFlag = 'N';
                    pro_item.prodInstId = _this.accountProdInstId[_this.existAccount.current];
                  }else{
                    pro_item.newProdFlag = 'Y';
                    pro_item.prodInstId = '';
                  }
                }
                product_List.push(pro_item);
              }
            }

            //----IPRAN加入购物车并保存配置----------------------------------------------------------------
            axios({
              url: '/netCloudOrder/shoppingCartService/updateShoppingCart2',
              method: 'post',
              data: {
                statusCd:statusCd,
                itemCd:_this.buy_type_itemCd,     //1新装 2 试用
                cartItemId:_this.prodList.cartItemId,
                loginUserId: loginUserId,
                offerId: prodId,
                productAttrList: product_List
              }
            }).then(response => {
              if (response.data.code == "0") {
                if(statusCd == '15'){
                  this.$router.push({path: '/shoppingCartFrame'});
                }else if(statusCd == '10'){
                  this.$alert('资源审核已提交!', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      _this.cant_edit = true;
                      _this.prodList.statusCd = '10';
                      return false;
                    }
                  });
                }
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
      },

      getCartConf(){
        let _this = this;
        //购物车中读取当前购物车项配置信息
        _this.readValBool=true;
        let curCartItem_confList = _this.prodList.prodConfList.productAttrList;
        for(let attr_item in curCartItem_confList){
          for(let attr_item_in in curCartItem_confList[attr_item].serviceAttrList){
            let id_of_attr = curCartItem_confList[attr_item].serviceAttrList[attr_item_in].attrId;
            let value_of_attr = curCartItem_confList[attr_item].serviceAttrList[attr_item_in].attrValue;
            _this.main_data[curCartItem_confList[attr_item].productId][id_of_attr] = value_of_attr;
          }
        }
        if(!_this.emailList.hasOwnProperty(_this.main_data['261']['175'])){
          _this.existAccount.current='';
        }else{
          _this.existAccount.current=_this.emailList[_this.main_data['261']['175']];
        }
        _this.getHostInfo();

        _this.changeActive(_this.main_data['241']['147'],_this.main_data,'241','147',_this.select_data['147'][_this.main_data['241']['147']],true);
        _this.ranger_val = parseInt(_this.main_data['241']['154']);
        _this.buy_amount.amount = _this.main_data['241']['180'];
        _this.time_set.amount = _this.main_data['241']['164'];
        _this.time_set.type = _this.select_data['179'][_this.main_data['241']['179']];
        /**初始化证件照相关信息**/
        _this.transformStrInfo(_this.main_data['241']['304']);

        if(_this.prodList.statusCd == '15' || _this.prodList.statusCd == '12'){
          _this.cant_edit = false;
        }else{
          _this.cant_edit = true;
        }
        if(1 == 0){
          this.$emit('update:prodList', '');
        }
      },
      getMirrorList(val){
        let _this = this;
        //镜像
        let mirror_style=val;
        for(var i in _this.resource_pool){
          if(_this.resource_pool[i].attrValueId==_this.main_data['241']['145']){
            _this.regionIdStr=_this.resource_pool[i].objAttrValue;
          }
        }
        //镜像id ：_this.main_data['241']['153']，资源池id：_this.main_data['241']['145']
        let dataObj = {
          "imageType": mirror_style,
          "regionId": _this.regionIdStr
        };
        axios({
          method: "post",
          url:'/netCloudBusiness/queryYunRes/queryImages',
          /*url: 'http://134.98.100.71:8081/netcloud-businesscenter-web/queryYunRes/queryImages',*/
          data: dataObj
        }).then(res => {
          let jxData = res.data;
          if(mirror_style=='gold'){
            let obj = [];
            _this.mirror_data = jxData;
            //mirror_type
            let num = -1;
            for (let n in jxData) {
              num++;
              if (num == 0) {
                _this.main_data['241']['207']=n;
              }
              obj.push(n);
            }
            _this.mirror_type = obj;
            for (let i in jxData) {
              for (let n in jxData[i]) {
                if (jxData[i][n].id == _this.main_data['241']['153']) {
                  _this.main_data['241']['207']=i;
                }
              }
            }
            _this.changeName(_this.main_data['241']['207']);
          }else if(mirror_style='private') {
            let privData = jxData.returnObj;
            let obj = {};
            for (let index in privData) {
              obj[privData[index].id] = privData[index].name;
            }
            _this.mirror_version = obj;
          }
        }).catch(err => {
        })
      }
    }
  }
</script>

