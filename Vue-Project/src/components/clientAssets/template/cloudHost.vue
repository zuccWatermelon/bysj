<template>
  <div class="cont">
    <p class="title">客户基本信息</p>
    <ul class="info clearfix">
      <!--<li><span>企业账号：</span>{{infoData['261']['169']}}</li>-->
      <li><span>管理员用户名：</span>{{infoData['261']['170']}}</li>
      <li><span>密码：</span>{{infoData['261']['171']}}</li>
      <li><span>行业标识：</span>{{infoData[261]['172']}}</li>
      <li><span>联系人姓名：</span>{{infoData['261']['173']}}</li>
      <li><span>联系电话：</span>{{infoData['261']['174']}}</li>
      <li><span>邮箱地址：</span>{{infoData['261']['175']}}</li>
      <!--<li><span>企业名称：</span>{{infoData['261']['178']}}</li>-->
      <!--<li><span>企业通讯地址：</span>{{infoData[261]['176']}}</li>-->
      <!--<li><span>企业归属地编码：</span>{{infoData['261']['177']}}</li>-->
    </ul>
    <p class="title">云主机配置信息</p>
    <ul class="info clearfix">
      <li><span>订购类型：</span>{{infoData['241']['146']}}&nbsp;&nbsp;{{infoData['241']['145']}}</li>
      <li><span>规格：</span>{{infoData['241']['147']}}核 | {{infoData['241']['148']}}G</li>
      <li><span>镜像类型：</span>{{infoData['241']['152']}} {{infoData['241']['208']}}</li>
      <li><span>系统盘：</span>{{infoData['241']['149']}}&nbsp;&nbsp;{{infoData['241']['183']}}G</li>
      <li v-if="infoData['241']['150']"><span>数据盘：</span>{{infoData['241']['150']}}&nbsp;&nbsp;{{infoData['241']['151']}}G</li>
      <li v-else><span>数据盘：</span>无</li>
      <li><span>虚拟私有云：</span>{{infoData['241']['155']?infoData['241']['155']:infoData['241']['210']}}</li>
      <li><span>宽带：</span>{{infoData['241']['154']}}Mb</li>
      <li><span>ID：</span>{{infoData.id}}</li>
      <li><span>IP：</span>{{infoData['241']['303']}}</li>
    </ul>
  </div>
</template>
<style scoped lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  .cont{
    /*border: #ddd solid;*/
    /*border-width: 0 1px 1px 1px;*/
    background: #f2f2f2;
    padding: 4px 0 0 0;
  }
  .title{
    line-height: 32px;
    font-size: 12px;
    padding-left: 14px;
    color: #484848;
  }
  .info{
    padding-bottom: 6px;
    li{
      float: left;
      width: 33.33%;
      padding-left: 14px;
      line-height: 24px;
      font-size: 12px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #333;
    }
    span{
      color: #6f6f6f;
    }
  }
</style>
<script>
  export default{
    props:['itemData'],
    data(){
      return{
        infoData:{
          '241':{},
          '261':{}
        },
        configData:"",//配置信息的
        relationArr:{}//关联信息
      }
    },
    computed:{
      showBool(){
        var self = this;
//        if(self.itemData.showBool){
          self.init()
//        }
        return self.itemData.showBool;
      },
    },
    created(){
//      if(this.itemData.showBool){
        this.init();
//      }
    },
    methods:{
      getConfigAxios(){
        return axios({
          method:"post",
          url:"/netCloudOffer/productsService/productlistByParam",
          data:{
            id:"301"
          }
        });
      },
      getInfoAxios(){
          var self = this;
          return axios({
            method:"post",
            url:"/netCloudOrder/assetsService/getAssetsInfo",
            data:{
              offerInstanceId:self.itemData.offerInstanceId.toString(),
              prodInstanceId:self.itemData.prodInstanceId.toString()
            }
          });
      },
      init(){
        var self = this;
        axios.all([self.getConfigAxios(),self.getInfoAxios()])
          .then(axios.spread(function (resConfigData,resInfoData) {
            let realInfoData = JSON.parse(JSON.stringify(resInfoData.data.data));
//            for(let i = 0; i < realInfoData.length; i++){
//              if(realInfoData[i].productInfo.prodInstanceId != self.itemData.prodInstanceId && realInfoData[i].productInfo.prodId != '261'){
//                realInfoData.splice(i,1)
//              }
//            }
//            console.log(realInfoData,'111111')
            self.setInfo(resConfigData.data.data,realInfoData);
          }));
      },
      setInfo(resConfigData,resInfoData){
        var self = this;
        let config = {};
        /**获取id**/
        config.id = resInfoData[0].productInfo.mastRecId;
        resInfoData.forEach((v)=>{
          config[v.productInfo.prodId] = {};
          v.objectAttrList.forEach((b)=>{
            config[v.productInfo.prodId][b.objAttrId] = self.getText(resConfigData,v.productInfo.prodId,b.objAttrId,b.objAttrValue);
          })
        });
        self.infoData = config;
        if(self.infoData['241']['210']=='已有'){
          self.getVPC();
        }
//        关联
        resConfigData.forEach((v)=>{
          v.offerProductObjectAttrList.forEach((b)=>{
            if(b.attrRefDefList.length > 0){
              b.attrRefDefList.forEach((ref)=>{
                self.$set(self.relationArr,ref.refObject,ref.attrId);
              })
            }
          })
        });
        for(let key in self.relationArr){
          console.log(self.infoData['241'][key] != undefined)
          if(self.infoData['241'][key] != undefined){
            self.getAttrRefDefText(self.relationArr[key],key,self.infoData['241'][key]);
          }
        }

      },
      //            循环配置信息  若有下拉框  将配置中的id转你换成文本
      getText(configData,prodId,objAttrId,objAttrValue){
        let text = objAttrValue;
        var self = this;
        configData.forEach((v)=>{
          if(v.productInfo.prodId == prodId){
              v.offerProductObjectAttrList.forEach((b)=>{
                if(b.objectAttrInfo.attrId == objAttrId && b.objectAttrValueList.length > 0){
                  for(let i in b.objectAttrValueList){
                    if(b.objectAttrValueList[i].attrValueId == objAttrValue){
                      text = b.objectAttrValueList[i].displayValue
                    }
                  }
                }
              })
          }
        })
        return text;
      },
//      获取关联
      getAttrRefDefText(targetId,attrId,objAttVal){
        var self = this;
        let data = {
          "tarAttrId":targetId +'',//对象属性值ID
          "linkageInfoList": [
            {
              "attrId":attrId +'',//属性标识ID
              "objAttVal": objAttVal +''//对象属性选用值(页面选择的参数值,cpu值)
            }
          ]
        };
        axios({
          method:"post",
          url:'/netCloudOffer/productsService/getLinkageInfo',
          data:data
        }).then(res=>{
          res.data.data.forEach((v)=>{
             if(v.attrValueId == self.infoData['241'][targetId]){
               self.infoData['241'][targetId] = v.objAttrValue;
             }
          });
        }).catch(err=>{})
      },

    }
  }
</script>
