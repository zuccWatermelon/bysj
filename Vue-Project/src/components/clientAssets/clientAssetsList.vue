<!--现有资产列表-->
<template>
  <div class="clientAssetsList">
    <MyNav class="nav" :current="'index'"
           :custData="custData"
           :background="'#2aabd2'"
    ></MyNav>
    <div class="main clearfix">
      <div class="left">
        <clientAssetdInfo :custData="custData"
                          :assetsId.sync="assetsId"
                          :navNum.sync = 'navNumObj'
        ></clientAssetdInfo>
      </div>
      <div class="right">
        <div class="header clearfix">
          <div class="header-left"><p>{{title}}&nbsp;&nbsp;(<span>{{num}}</span>)</p></div>
          <div class="search"><input placeholder="请输入业务编号查询" v-model="accNum" /><i class="el-icon-search" @click="getListData"></i></div>
        </div>
        <div class="list">
          <el-table
            :data="prodData"
            @expand-change="expendChange"
            :height="tableHeight"
            style="width: 100%;">
            <el-table-column type="expand">
              <template slot-scope="props">
                <cloudHost v-if="props.row.offerId == '301'" :itemData = "props.row"></cloudHost>
              </template>
            </el-table-column>
            <el-table-column
              prop="accNum"
              label="产品名称"
              width="127">
              <template slot-scope="props">
                <i class="hwsicon-service-ecm font-icon cloudHost"></i>{{props.row.offerName}}
              </template>
            </el-table-column>
            <el-table-column
              prop="accNum"
              label="业务编号"
              width="160">
            </el-table-column>
            <el-table-column
              label="生失效时间"
              width="170">
              <template slot-scope="props">
                {{props.row.effDate}} - {{props.row.expDate}}
              </template>
            </el-table-column>
            <el-table-column
              label="金额"
              width="85">
              <template slot-scope="props">
                {{props.row.realAmount}}元
              </template>
            </el-table-column>
            <el-table-column
              prop="statusCd"
              label="状态"
              width="85">
            </el-table-column>
            <el-table-column
              label="操作"
              width="200">
              <template slot-scope="props">
                <div class="asset-btn">
                  <!--<a href="javascript:void(0);" class="asset-btn refill" @click.stop="refill(props.row.offerInstanceId)">续订</a>-->
                  <!--<a href="javascript:void(0);" class="asset-btn change" @click.stop="change(props.row.offerInstanceId)">变更</a>-->
                  <a href="javascript:void(0);" :class="['asset-btn TD', props.row.statusCd=='生效'?'':'dis-btn']" @click.stop="TDShowFun(props.row)">退订</a>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            @current-change="getListData"
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <el-dialog class="TDBox" title="退订"
               :visible.sync="TDShow"
               width="800px"
               center>
      <cloudHost :itemData = "currentData"></cloudHost>
      <div class="TDreason clearfix">
        <section>
          <label class="TDreason-text">收费方式：</label>
          <el-select size="small" v-model="TDData.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </section>
        <section>
          <label class="TDreason-text">退订理由：</label>
          <el-input
            class="TDreason-input"
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            resize="none"
            v-model="TDData.reason">
          </el-input>
        </section>

      </div>
      <el-button class="cust-list-btn" type="warning" @click="TDSubmit">提交</el-button>
    </el-dialog>
  </div>
</template>
<style scoped lang="less">
  @font-face {
    font-family:homeIcomoon;
    src:url('../../assets/fonts/homeIcomoon.woff');
  }
  @font-face {
    font-family:comoon;
    src:url('../../assets/fonts/ecm_icomoon.woff');
  }
  *{
    padding: 0;
    margin: 0;
  }
  .nav{
    background: #2aabd2;
  }
  .main{
    position: relative;
    width: 1200px;
    margin: 0 auto;
  }
  .left{
    float: left;
    width: 280px;
  }
  .right{
    float: left;
    width: 920px;
    padding-left: 20px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 280px;
    .header{
      /*border-bottom: #ddd 1px solid;*/
      line-height: 60px;
    }
    .header-left{
      float: left;
      line-height: 20px;
      padding: 19px 0 11px 0;
      p{
        font-size: 16px;
        padding-left: 10px;
        border-left: 4px solid #4ca1ea;
      }
      span{
        color: #ff6700;
      }
      .prod-title{
        font-size: 20px;
        line-height: 60px;
        display: inline-block;
        padding-left: 6px;
        vertical-align: middle;
      }
    }
    .search{
      float: right;
      position: relative;
      height: 50px;
      padding: 15px 0 7px 0;
      input{
        display: block;
        line-height: 28px;
        font-size: 12px;
        width: 230px;
        height: 100%;
        border: #ddd 1px solid;
        border-radius: 3px;
        padding: 0  45px 0 5px;
        background: #f5f5f5;
      }
      i{
        position: absolute;
        width: 45px;
        height: 28px;
        background: #3998ea;
        right: 0;
        top: 15px;
        color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 28px;
        border-radius: 0 3px 3px 0;
      }
    }
  }

  .list {

    width: 100%;
    padding-bottom: 60px;
  }
  .list /deep/ .el-table{
    font-size: 12px;
  }
  .list {
    /deep/ .el-table__expanded-cell{
      padding: 0;
    }
  }
  .asset-btn{
    font-size: 0;
  }
  .asset-btn a{
    display: inline-block;
    width: 44px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    text-align: center;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    margin: 0 5px;
    color: #5bc0de;
    background: #fff;
  }
  .asset-btn .refill{
    background: #3192e6;
    color: #fff;
  }
  .asset-btn .change{
    background: #fc8b3f;
    color: #fff;
  }
  .asset-btn .TD{
    border: 1px #ddd solid;
    line-height: 22px;
  }
  .asset-btn .dis-btn{
    border: 0 none;
    background: #5e5e5e;
    color: #fff;
  }
  .list-show{
    background: #e5f3ff;
    border-color: #a3d5ff #a3d5ff #ddd #a3d5ff;
  }
  .pagination{
    position: absolute;
    bottom: 12px;
    left: 0;
    right: 0;
    text-align: center;
  }
  .prodNme{
    font-size: 16px;
    padding-left: 10px;
    text-align: left !important;
  }
  .font-icon{
    vertical-align: middle;
    font-size: 30px;
    padding-right: 10px;
  }
  .cloudHost{
    font-family: homeIcomoon;
  }
  /*退订框*/
  .TDBox{
    /deep/ .cont{
      border: 0 none;
      background: #fff;
    }
    /deep/ .el-dialog__body{
      padding: 0 30px 20px 30px;
    }
    .cust-list-btn{
      width: 125px;
      height: 40px;
      display: block;
      margin: 0 auto;
    }
    .TDreason{
      padding: 10px 0;
      border-top:#9d9d9d 1px solid;
      section{
        padding: 0 0 10px 0;
      }
    }

    .TDreason-text{
      float: left;
      width: 76px;
    }
    .TDreason-input{
      float: left;
      width: 664px;
    }

  }
  .el-select-dropdown .el-select-dropdown__item{
    padding: 0 20px;
  }
</style>
<script>
  import '../../assets/css/combined-business.min.css';
  import MyNav from '../common/MyNav.vue';
  import clientAssetdInfo from './clientAssetsInfo.vue';
  import cloudHost from './template/cloudHost.vue';
  export default{
    components:{
      MyNav,
      clientAssetdInfo,
      cloudHost,
    },
    data(){
      return{
        tableHeight:0,//table的高度
        navNumObj:{},
        current:"index",
        custData:{},
        assetsId:'', // id
        accNum:'', //专线编号
        prodData:[],
        loginId:'',
        currentPage:1,
        pageSize:8,
        total:8,
        TDShow:false,
        currentData:{},
        TDData:{
          type:"",
          reason:""
        },
        options:[
          {
            value:'前台收费',
            label:'前台收费'
          }
        ]
      }
    },
    computed: {
      title(){
        this.assetsId = this.$route.query.prodId;
        let title = '';
        if(this.assetsId == '61'){
          title = '畅捷通';
        } else if(this.assetsId == '101'){
          title = '云专线';
        } else if(this.assetsId == '161'){
          title = '云产品';
        } else if(this.assetsId == '181'){
          title = '云网通';
        } else if(this.assetsId == '182'){
          title = '云宽通';
        } else {
          title = '全部';
        }
        return title;
      },
      num(){
        let num = 0;
        num = this.navNumObj[this.$route.query.prodId];
        return num;
      }
    },
    created(){
      var cust = window.sessionStorage.getItem('cust');
      if(cust!=null && cust!=''){
        this.custData=JSON.parse(cust);
      }
      if(window.sessionStorage && window.sessionStorage.getItem('user')){
        let user = JSON.parse(window.sessionStorage.getItem('user'));
        this.loginId = user.staffId;
      }
      //最小全屏高度
      let height = document.documentElement.clientHeight;
      this.tableHeight=height-61-50-60;
      if(this.myHeight<=0){
        this.myHeight=0;
      }
//      获取
      this.getListData();
    },
    methods:{
      //获取列表
      getListData(){
        var self = this;
        axios({
          method:'post',
          url:'/netCloudOrder/orderService/getDataAssetEnquiry',
//          url:'http://134.98.100.72:8001/assetsService/getAssetsInfo',
          data:{
            beglongCustId:self.custData.CUST_ID, //客户编码
//            beglongCustId: '402',
            catalogId:self.assetsId, //目录标识
            accNum:self.accNum, //专线编号
            pageNo: self.currentPage,
            pageSize: self.pageSize
          }
        }).then(res=>{
          self.total = res.data.totalRecord;
          self.prodData = JSON.parse(JSON.stringify(res.data.data));
          self.prodData.forEach((v)=>{
            self.$set(v,'showBool',false);
            v.effDate = v.effDate.split('-')[0] + '.' + v.effDate.split('-')[1] + '.' + v.effDate.split('-')[2].split(' ')[0];
            v.expDate = v.expDate.split('-')[0] + '.' + v.expDate.split('-')[1] + '.' + v.expDate.split('-')[2].split(' ')[0];
          });
        }).catch(err=>{

        })
      },
//        列表展开
      showFun(index){
        this.prodData[index].show = !this.prodData[index].show;
      },
      //        续订
      refill(offerInstanceId){
        var self = this;
        axios({
          method:'post',
          url:'/netCloudOrder/orderService/subDataRenew',
          data:{
            offerInstanceId:offerInstanceId,
            loginUserId:self.loginId,
            actionCode:'续订'
          }
        }).then(res=>{
          if(res.data.code == 0 || res.data.code == '0'){
            this.$router.push('/shoppingCartFrame');
          }
        }).catch(err=>{
        });
      },
//      变更
      change(offerInstanceId){
        var self = this;
        axios({
          method:'post',
          url:'/netCloudOrder/orderService/subDataChange',
          data:{
            offerInstanceId:offerInstanceId,
            loginUserId:self.loginId,
            actionCode:'变更'
          }
        }).then(res=>{
          if(res.data.code == 0 || res.data.code == '0'){
            self.$router.push('/shoppingCartFrame');
          }
        }).catch(err=>{
        });
      },
//      退订
      TDShowFun(data){
        var self = this;
        if(data.statusCd == '生效'){
          /**判断是否还在退订过程中**/
          axios({
            url:'/netCloudOrder/orderService/getOrderOnlineStatus',
            method:'post',
            data:{
              prodInstanceId:data.prodInstanceId
            }
          }).then(res=>{
            if(res.data.data == '成功'){
              self.TDShow = true;
              self.currentData = data;
            } else {
              self.$alert('订单正在退订中', '提示', {
                confirmButtonText: '确定',
                callback:action=>{
                }
              });
            }
          }).catch(err=>{

          })

        }
      },
      TDSubmit(){
        var self = this;
        if(self.TDData.type == ''){
          self.$alert('请选择收费方式', '提示', {
            confirmButtonText: '确定',
            callback:action=>{
            }
          });
        } else {
          self.$confirm('确认是否要退订？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios({
              method:'post',
              url:'/netCloudOrder/orderService/subDataUnsubscribe',
              data:{
                offerInstId:self.currentData.offerInstanceId,
                prodInstanceId:self.currentData.prodInstanceId,
                loginUserId:self.loginId,
                actionCode:'删除',
                operType:'退订',
                custId:self.custData.CUST_ID,
                billType:self.TDData.type
              }
            }).then(res=>{
              if(res.data.code == 0 || res.data.code == '0'){
                self.$alert('退订成功', '提示', {
                  confirmButtonText: '确定',
                  callback:action=>{
                    self.TDShow = false;
                    self.TDData.type = '';
                    self.TDData.reason = '';
                  }
                });
              } else {
                self.$alert('退订失败', '提示', {
                  confirmButtonText: '确定',
                  callback:action=>{
                  }
                });
              }
            }).catch(err=>{
            });
          }).catch(() => {

          });
        }
      },
      expendChange(val){
        val.showBool = !val.showBool;
      }
    }
  }
</script>
