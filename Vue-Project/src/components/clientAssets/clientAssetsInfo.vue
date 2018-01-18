<!--客户信息-->
<template>
  <div class="clinetInfo" :style="{height:myHeight+'px'}">
    <div class="hello">你好，{{custData.custName}}<span @click="clientOut">退出</span></div>
    <div class="info-box">
      <p class="title">客户信息</p>
      <div class="info-list">
        <p class="info">客户类型：&nbsp;&nbsp;{{custData.custType}}</p>
        <p class="info">证件类型：&nbsp;&nbsp;{{custData.certTypeName}}</p>
        <p class="info">证件号码：&nbsp;&nbsp;{{custData.custNumber}}</p>
        <p class="info">客户地址：&nbsp;&nbsp;{{custData.province}}{{custData.city}}{{custData.county}}{{custData.contactAddr}}</p>
        <p class="info">联系电话：&nbsp;&nbsp;{{custData.mobile}}</p>
      </div>
    </div>
    <div class="assets-list" >
      <!--<a href="javascript:void(0);" :class="['assets-item',{'current':assetsId==''}]" @click="changeFun('')" data-id="">全部&nbsp;&nbsp;(<i>{{numJson['all']}}</i>)</a>-->
      <a href="javascript:void(0);" :class="['assets-item','assets-item1',{'current':assetsId=='161'}]" @click="changeFun('161')" data-id="301">天翼云产品&nbsp;&nbsp;(<i>{{numJson['161']}}</i>)</a>
      <!--<a href="javascript:void(0);" :class="['assets-item','assets-item2',{'current':assetsId=='61'}]" @click="changeFun('61')" data-id="61">畅捷通&nbsp;&nbsp;(<i>{{numJson['61']}}</i>)</a>-->
      <!--<a href="javascript:void(0);" :class="['assets-item','assets-item3',{'current':assetsId=='101'}]" @click="changeFun('101')" data-id="101">云专线&nbsp;&nbsp;(<i>{{numJson['101']}}</i>)</a>-->
      <!--<a href="javascript:void(0);" :class="['assets-item','assets-item4',{'current':assetsId=='181'}]" @click="changeFun('181')" data-id="">云网通&nbsp;&nbsp;(<i>{{numJson['181']}}</i>)</a>-->
      <!--<a href="javascript:void(0);" :class="['assets-item','assets-item5',{'current':assetsId=='182'}]" @click="changeFun('182')" data-id="">云宽通&nbsp;&nbsp;(<i>{{numJson['182']}}</i>)</a>-->
    </div>
  </div>
</template>
<style scoped lang="less">
  p{
    padding: 0;
    margin: 0;
  }
  a:focus{
    text-decoration: none;
  }
  .clinetInfo{
    background: #f4f4f4;
  }
  .hello{
    width: 100%;
    font-size: 14px;
    padding-top: 6px;
    line-height: 44px;
    position: relative;
    color: #333;
    background: #fff;
    padding-right: 45px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    span{
      position: absolute;
      right: 0;
      top: 15px;
      width: 44px;
      height: 26px;
      line-height: 24px;
      border: #ddd 1px solid;
      text-align: center;
      font-size: 12px;
      cursor: pointer;
      border-radius: 3px;
    }
  }
  .info-box{
    width: 100%;

    padding: 4px 15px 0 15px;
    color: #6b6b6b;
    .title{
      font-size: 16px;
      line-height: 36px;
      color: #484848;
    }
  }
  .info-list{
    border-bottom: #ddd 1px solid;
    border-top: #ddd 1px solid;
    padding: 11px 0 16px 0;
    .info{
      line-height: 18px;
      font-size: 12px;
      padding: 3px 0;
    }
  }
  .assets-list{
    padding: 15px;
    font-size: 14px;
    .current{
      background-color: #fff;
    }
  }
  .assets-item{
    display: block;
    width: 250px;
    height: 40px;
    padding-left: 50px;
    line-height: 40px;
    background-size: 25px 25px;
    background-position: 16px center;
    background-repeat: no-repeat;
    cursor: pointer;
    i{
      font-style: normal;
      color: #ff6700;
    }
  }
  .assets-item1{
    /*background-image: url("../../assets/img/assets_list_icon1.png");*/
  }
  .assets-item2{
    /*background-image: url("../../assets/img/assets_list_icon2.png");*/
  }
  .assets-item3{
    /*background-image: url("../../assets/img/assets_list_icon3.png");*/
  }
  .assets-item4{
    /*background-image: url("../../assets/img/assets_list_icon4.png");*/
  }
  .assets-item5{
    /*background-image: url("../../assets/img/assets_list_icon5.png");*/
  }

</style>
<script>
  export default{
    props:['custData','assetsId','navNum'],
    data(){
      return{
        myHeight:0,
        numJson:{
          all:0,
          '161':0,
          '61':0,
          '101':0,
          '4':'0',
          '5':'0'
        }
      }
    },
    created(){
      let params = this.$route.query.prodId;
      if(params){
        this.changeFun(params);
      }
//        获取高度
      var height=document.documentElement.clientHeight;
      this.myHeight=height-61;
      if(this.myHeight<=0){
        this.myHeight=0;
      }
//      查询数量
      this.getNum();
    },
    methods:{
//        查询目录
//      getNav(){
//        var self = this;
//        axios({
//          method:'post',
//          url:"/netCloudOffer/offerCatalogService/offercataloglist",
//          data:{
//            "catalogId":'',
//            "parCatalogId":'',
//          }
//        }).then(res=>{
//          self.nav = res.data.data;
//        })
//      },
//     查询数量
      getNum(){
          var self = this;
          axios({
            method:'post',
            url:'/netCloudOrder/orderService/getDataAssetEnquiryTotal',
            data:{
              beglongCustId:self.custData.CUST_ID, //客户编码
              catalogId:',161,61,101', //目录标识
              accNum:'', //专线编号
//              测试
//              beglongCustId:'402', //客户编码
            }
          }).then(res=>{
            res.data.data.forEach((v)=>{
              if(!v.catalogId){
                self.numJson.all = v.total;
              } else {
                self.numJson[v.catalogId] = v.total;
              }

            });
            self.$emit('update:navNum',self.numJson)
          }).catch(err=>{
          })
      },
//      退出
      clientOut(){
        window.sessionStorage.setItem('cust','');
        this.$router.push('/');
      },
//      点击切换
      changeFun(assetsId){
        let path = this.$route.path;
        if(path == '/clientAssetsList'){
          this.$router.replace('/clientAssetsList?prodId='+ assetsId);
        } else {
          this.$router.push('/clientAssetsList?prodId='+ assetsId);
        }
        this.$emit('update:assetsId',assetsId);
      },

    }
  }
</script>
