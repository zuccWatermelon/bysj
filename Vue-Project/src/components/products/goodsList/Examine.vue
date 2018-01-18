<template>
    <div class="login">
      <div class="login-box">
          <p v-if="login" class="login-title">审批说明<i @click="close"></i></p>
          <p v-else="login" class="login-title">审批详情<i @click="close"></i></p>
          <div class="login-main">

             <div class="login-cloud"  v-if="login">
                 <div class="login-fold">
                   <p><span>客户名称 : {{message.custName}}</span><span>订购商品名称:{{message.offerName}}</span></p>
                   <p><span>使用费 : {{message.conf_price}}元</span><span>使用费折扣 : <span class="add-color">{{message.discount*100}}折</span></span><span>折扣后费用 : <span class="add-color">{{parseFloat(message.conf_price)*parseFloat(message.discount)}}元</span></span></p>
                   <p><span>一次性费用 : {{message.calculate_amount}}元</span><span>折后总价 : <span class="add-color">{{parseFloat(message.conf_price)*parseFloat(message.discount)+parseFloat(message.calculate_amount)}}元</span></span></p>
                 </div>
                 <div class="login-affend">
                   <textarea  placeholder="请输入商品折扣说明" v-model="subject"></textarea>
                 </div>
                 <p class="login-shop">
                   <span>发起人 : {{message.sysUserName}}</span>
                   <span>时间 : {{getCurDate}}</span>
                 </p>
                <p class="has-input"><span>EIP账号 : </span><input type="text"placeholder="请输入发起人EIP账号" v-model="EIPCode"/></p>
                 <div class="login-foot">
                     <span ><a href="javascript:void(0)" @click="close">取消</a></span><span @click="submitToExamine()">提交审批</span>
                 </div>
             </div>
             <div class="clound"  v-else="login">
                   <div class="clound-top">
                       <p><span class="clound-span">分局局长审批</span><span class="clound-span">审批人 : 张三</span>
                           <span class="clound-span">联系电话 : 17640403339</span><span class="clound-span">时间 : 2017年10月17日</span>
                       </p>
                       <p class="clound-pod">同意XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
                   </div>
                   <div class="clound-top">
                       <p><span class="clound-span">市政企部审批</span><span class="clound-span">审批人 : 张三</span>
                          <span class="clound-span">联系电话 : 17640403339</span><span class="clound-span">时间 : 2017年10月17日</span>
                       </p>
                       <p class="clound-pod">同意XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
                    </div>
                  <div class="clound-top">
                      <p><span class="clound-span">省企部总经理</span>
                      </p>
                      <p class="clound-pod">未审批</p>
                  </div>
             </div>
          </div>
      </div>
    </div>
</template>
<script>
  export default {
    props:['loginClick','message','curExamineCentOrNot'],
    data () {
      return {
          login:true,
          isActive:3,
        subject:'',
        EIPCode:'',
        product:[
          {
             "id" :1,
            "name":"发起审批",
           },
          {
            "id" :2,
            "name":"分局局长审批",
          },
          {
            "id" :3,
            "name":"市政企部主任审批",
          },
          {
            "id" :4,
            "name": "省政企部总经理",
          }
        ],
      }
    },
    computed:{
      getCurDate:function(){
        var myDate = new Date();
        return myDate.getFullYear()+'年'+(parseInt(myDate.getMonth())+1)+'月'+myDate.getDate()+'日';
      },
    },
    methods:{
      close(){
        this.$emit('update:loginClick', false);
      },
      //审批提交
      submitToExamine(){
        let _this = this;
        if(_this.EIPCode == ''){
          this.$alert('请输入发起人EIP账号', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          });
        }else if(_this.subject == ''){
          this.$alert('请输入商品折扣说明', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              return false;
            }
          });
        }else {
          axios({
            method: 'post',
            url: "/netCloudOrder/shoppingCartService/updateShoppingCartStatus",
            params: {
              params: {
                "orderItemId": _this.message.curExamineId.toString(),
                "catalogId":_this.message.catalogId,
                "bandwidthItem": {
                  "loginname": _this.EIPCode,
                  "subject": _this.subject,//标题(300)
                  "custName": _this.message.custName,//客户名称
                  "offerName": _this.message.offerName,//订购商品名称
                  "offerAt": _this.message.conf_price + '元',//订购商品原价
                  "offerRealAt": parseFloat(_this.message.conf_price) * parseFloat(_this.message.discount) + '元',//商品折扣后价格
                  "offerRate": _this.message.discount * 100 + '折',//订购商品折扣
                  "workAt": _this.message.calculate_amount + '元',//初装费原价
                }
              }
            }
          }).then(responce => {
            if (responce.data.code == '0') {
              _this.$emit('update:curExamineCentOrNot', true);
              _this.close();
              window.location.reload();
            } else {
              this.$alert(responce.data.msg, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  _this.close();
                  return false;
                }
              });
            }
          }).catch(error => {
          })
        }
      }
    },
    created(){
        var self = this;
        if(self.login == true){
            self.isActive = 0;
        }else {
            self.isActive = 3;
        }
    },
  }
</script>
<style scoped lang="less">
  .login{
    width: 100%;
    height: 100%;
    position:fixed;
    top:0;
    left:0;
    background:rgba(0,0,0,0.41);
    z-index:999;
  }
  .login-box {
    position:absolute;
    top:50%;
    left:50%;
    width: 660px;
    /*height: 460px;*/
    background: white;
    margin:-260px 0 0 -272px;
  }
  .login-title{
    width: 660px;
    height: 61px;
    line-height: 61px;
    color: #ffe6cc;
    background: #ff8200;
    font-size: 20px;
    text-align: center;
    position:relative;
    margin: 0;
    i{
      font-style: normal;
      position: absolute;
      top:19px;
      right:22px;
      height:20px;
      width:20px;
      background: url("../../assets/img/cha.png") center no-repeat;
      cursor:pointer;
    }
  }
   .login-main{
     width: 600px;
     margin: 0 auto;
     .login-nav{
       width: 600px;
       height: 50px;
       ul{
         margin-bottom: 0;
         .text-danger{
           color: #666666;
           background:  url("../../assets/img/bead.png") center no-repeat;
           background-position-y: -39px;
         }
         .active{
           color: #666666;
           background:  url("../../assets/img/bead.png") center no-repeat;
           background-position-y: 0;
         }
         li{
           float: left;
           width: 130px;
           height: 26px;
           margin-right: 24px;
           margin-top: 13px;
           p{
             line-height: 26px;
             margin-left: 8px;
           }
         }
         li:last-child{
           margin-right: 0;
         }
       }
     }
     .login-cloud{
       width: 600px;
       position: relative;
       .login-fold{
         margin-top: 10px;
         width: 600px;
         min-height: 70px;
         margin-bottom: 10px;
         p{
           padding:10px 0;
           margin:0;
           span{
             display: inline-block;
             width:33.3%;
           }
         }
         p:first-child{
           border-bottom: 1px solid #ddd;
         }
         p:nth-child(2){
           border-bottom: 1px dashed #999;
         }
         .add-color{
           color:#ff8200;
           font-weight: bold;
         }
       }
       .login-affend{
          width: 600px;
         max-height:120px;
          textarea{
            width: 600px;
            height: 100px;
            max-height:120px;
            background: #f1f1f1;
            padding: 10px;
            border: none;
            outline: none;
          }
       }
       .login-child{
         width: 600px;
         height: 50px;
         margin-top: 10px;
         border: 1px solid #858585;
         border-left: none;
         border-right: none;
         p{
           margin: 0;
           line-height: 50px;
         }
       }
       .login-shop{
         margin: 0;
         margin-top: 10px;
         span{
           display: inline-block;
           width: 33.3%;
         }
       }
       .login-foot{
         width: 230px;
         height: 34px;
         margin-top: 30px;
         margin-left: 380px;
         margin-bottom: 15px;
         span{
           display: inline-block;
           width: 100px;
           height: 34px;
           text-align: center;
           line-height: 34px;
           color: #ffffff;
           background-color: #e5e5e5;
           a{
             color: #ffffff;
           }
         }
         span:last-child{
           background-color: #ff950c;
           margin-left: 20px;
           cursor: pointer;
         }
       }
       .has-input{
         margin-top: 10px;
         input{
           height:30px;
         }
       }
     }
     .clound{
       width: 600px;
       position: relative;
       .clound-top{
         width: 600px;
         height: 70px;
         border-bottom: 1px solid #858585;
         margin-top: 10px;
         p{
           margin: 0;
           height: 35px;
         }
         .clound-span{
           display: inline-block;
           margin-right: 28px;
           color: #999999;
         }
         .clound-span:first-child{
           margin-left: 10px;
           color: black;
           font-weight: 600;
         }
         .clound-pod{
           margin-left: 10px;
         }
       }
       .clound-top:last-child{
         border-bottom: none;
       }
     }
   }
</style>
