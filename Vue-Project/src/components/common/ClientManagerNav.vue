<!--客户经理门户 左侧导航-->
<template>
  <div class="main">
    <ul>
      <li v-for="item in routerlinks.links">
        <router-link :to="item.link"
                     :class="{current:routerlinks.current == item.link}"
                     style="background-position: 0 0;"
        >{{item.name}}</router-link></li>
    </ul>
  </div>
</template>
<style scoped lang="less">
  *{
    margin: 0;
    padding:0;
  }
  a:focus{
    text-decoration: none;
  }
  .main{
    /*float: left;*/
    width: 14.16%;
    height: 100%;
    padding-top: 20px;
    background: #2e3347;
    position: absolute;
    top: 0;
    left:0;
    a{
      display: block;
      width: 100%;
      height: 60px;
      padding-left: 27.5%;
      line-height: 60px;
      color: #31b9ff;
      font-size: 16px;
      border-left: 4px solid #2e3347;
      /*background: url("../../assets/img/clientManager-icon.png") no-repeat;*/
    }
    .current{
      background-color: #202535;
      border-left: 4px solid #31b9ff;
    }
  }
</style>
<script>
  export default {
    data(){
      return{
        routerlinks:{
          current:'',
          links:[]
        },
//          客户经理
        clientManagerIndex:[
          {
            name:'待办事项',
            link:'/ClientManagerIndex',
            linkChild:[]
          },
          {
            name:'我的订单',
            link:'/myorder',
            linkChild:[]
          },
          {
            name:'试用中的订单',
            link:'/tryOutOrder',
            linkChild:[]
          }
        ],
//          补录
        toMakeupOrder:[
          {
            name:'补录订单',
            link:'/toMakeupOrder',
            linkChild:['/toMakeupInfo']
          }
        ],
//          施工门位
        myWorkOrder:[
          {
            name:'我的工单',
            link:'/myWorkOrder',
            linkChild:['/workOrderDetails1']
          }
        ],
//        支撑人员
        myWorkOrder2:[
          {
            name:'我的工单',
            link:'/myWorkOrder2',
            linkChild:['/workOrderDetailsA']
          }
        ],
//        资源审核
        resourcesCheck:[
          {
            name:'资源审核',
            link:'/resourcesCheck',
            linkChild:['/resourcesCheckInfo']
          }
        ],
//        密码修改
        password:[
          {
            name:'密码修改',
            link:'/password',
            linkChild:[]
          }
        ]
      }
    },
    created(){
      var self = this;
      self.routerlinks.current = self.$route.path;
      if(window.sessionStorage && window.sessionStorage.getItem('userResources') && window.sessionStorage.getItem('login')=='true'){
        var userResources = JSON.parse(window.sessionStorage.getItem('userResources'));
        userResources.forEach((v)=>{
          if(v.path != null && self[v.path] != null){
            self.routerlinks.links = self.routerlinks.links.concat(self[v.path]);
          }
        })
      }
      if(self.routerlinks.links.length > 0){
        for(var j = 0; j < self.routerlinks.links.length; j++){

          if( self.routerlinks.current == self.routerlinks.links[j].link){
            break;
          } else {
            self.routerlinks.links[j].linkChild.forEach((v)=>{
              if(self.routerlinks.current == v){
                self.routerlinks.current = self.routerlinks.links[j].link;
              }
            });
          }
        }
      } else {
        this.$alert('没有任何权限', '提示', {
          confirmButtonText: '确定',
          callback:action=>{

          }
        });
      }

    }
  }
</script>
