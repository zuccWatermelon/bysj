<template>
  <div id="management">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <div class="menu-item">
          <el-menu-item index="1"><router-link to="/" class="color" >首页</router-link></el-menu-item>
          <el-menu-item index="2"><a href="https://www.ele.me" target="_blank" class="color" > 合作伙伴 </a></el-menu-item>
          <el-submenu index="3">
          <template slot="title" class="color" > 管理平台 </template>
            <div v-if="userID === null">
              <el-menu-item index="3-1"><router-link to="/" class="color">个人管理平台</router-link></el-menu-item>
            </div>
            <div v-else>
              <el-menu-item index="3-1"><router-link to="SelfManagement" class="color">个人管理平台</router-link></el-menu-item>
            </div>
          </el-submenu>
          <el-menu-item index="4"> <router-link to="/" class="color" >帮助中心</router-link> </el-menu-item>
        <div class="regist-login">
          <el-submenu index="6">
          <template slot="title" class="color"> 您好！{{username}} </template>
              <el-menu-item index="6-1"><router-link to="Assets" class="color">资产</router-link> </el-menu-item>
              <el-menu-item index="6-2"><el-button type="text" @click="logout" class="color" > 退出  </el-button> </el-menu-item>
        </el-submenu>
          <el-menu-item index="7"> <router-link to="ShoppingCar" class="color">我的购物车 </router-link> </el-menu-item>
        </div>
      </div>
    </el-menu>

      <el-row class="tac">
  <el-col :span="12">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" >
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</el-row>
 

      <p class="foot">版权所有 ©2017 中国电信浙江公司 [ 增值电信业务经营许可证 A2.B1.B2-XXXXXXXX ] ICP 证号:浙 ICP 备 XXXXXXXX号</p>
  </div>
</template>

<script>
export default {
    data() {
      return {
        activeIndex: '3',
        dataHardDiskSize: '40',
        inputDiscount: '0.8',
        login: false,
        form: {
          name: '',
          pwd: '',
        },
        username:window.sessionStorage.getItem('username'),
        userID:window.sessionStorage.getItem('userID')  
      };
    },
    created(){
      var self = this;

      var userID = window.sessionStorage.getItem('userID');
      if(!userID){
        this.$router.push({path: '/'});
      }
      var formData = new FormData();
      formData.append('userID', userID);
      axios({
              method:"post",
              url:"http://127.0.0.1:3000/api/test",
              data: formData
      }).then(
          res=>{
            self.tableData = res.data.message
          }
      ).catch(
          error=>{
              console.log(error);
          }
      );
    },
    methods: {
      handleSelect(key, keyPath) {
        return 0;
      },
       handleTime(value) {
        console.log(value);
      },
      handleNum(value) {
        console.log(value);
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      logout(){
        this.$confirm('是否退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          window.sessionStorage.removeItem('username');
          window.sessionStorage.removeItem('userID');
          location.reload();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        }); 
      },
        toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleContinue(index, row){
         this.$prompt('请输入续订时长，以月为单位', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern : /^[1-9]\d*$/,
          inputErrorMessage: '格式不正确，请输入正整数'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你续订的时长为: ' + value + '个月,请稍后刷新查看'
          });
          var period = Number(row.period)+Number(value) ;
          console.log(period);
          var orderId = row.orderId;
          var formData = new FormData();
          formData.append('orderID', orderId);
          formData.append('period', period);
          axios({
            method:"post",
            url:"http://127.0.0.1:3000/api/orderContinue",
            data:formData,
            responseType: 'json',
            headers:{
              'Content-Type':'application/x-www-form-urlencoded'
            },
          }).then(
              res=>{
              }
            ).catch(
              error=>{
                console.log(error);
            }
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      handleChange(index,row){
          console.log(row);
          this.$confirm('此操作将跳转到购物车进行修改订单, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '请在购物车中修改订单'
          });
          var orderId = row.orderId;
          var formData = new FormData();
          formData.append('orderID', orderId);
          axios({
            method:"post",
            url:"http://127.0.0.1:3000/api/orderChange",
            data:formData,
            responseType: 'json',
            headers:{
              'Content-Type':'application/x-www-form-urlencoded'
            },
          }).then(
              res=>{
                this.$router.push("/ShoppingCar");
              }
            ).catch(
              error=>{
                console.log(error);
            }
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
      },
      handleUnsubscribe(index, row) {
        var self = this;
        this.$confirm('是否退订该订单?<br>订购时长：'+row.period+' 月&emsp;CPU：'+row.Cpu+' 核&emsp;内存：'+row.memory+' G<br>操作系统：'+row.systemType+' | '+row.operateSystem+'&emsp;带宽：'+row.bandWidth+' MB<br>系统盘：'+row.systemHardDiskType+'&emsp;数据盘：'+row.dataHardDiskType+' | '+row.dataHardDiskSize+' G', '提示', {
        dangerouslyUseHTMLString: true,
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
          this.$message({
            type: 'success',
            message: '退订成功!'
        });
          var orderId = row.orderId;
          console.log(orderId);
          axios({
            method:"post",
            url:"http://127.0.0.1:3000/api/deleteOrder",
            data:{
              "orderID":orderId
            },
            responseType: 'json',
            headers:{
              'Content-Type':'application/x-www-form-urlencoded'
            },
          }).then(
              res=>{
              }
            ).catch(
              error=>{
                console.log(error);
            }
          )
            location.reload();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退订'
          });          
        });
      },
      getType: function (Type) {
                let tempSystem=[];              
                this.Systems=[];
                this.selectSystem='';               
                let allSystem=[{                    
                    Type: "Windows",
                    label: "Windows7"
                }, {
                    Type: "Windows",
                    label: "Windows10"
                    
                }, {
                    Type: "Linux",
                    label: "CentOS 6"
                }, {
                    Type: "Linux",
                    label: "Ubuntu 16.04"
                }];
                for (var val of allSystem){
                    if (Type == val.Type){
                        console.log(val);
                        tempSystem.push({label: val.label, value: val.label})
                    }
                }
                this.Systems = tempSystem;
            },
            getSystem: function (System) {
                console.log(System);
                console.log(this.selectSystem)
            },
    }
}
</script>

<style>
#management {
  font-family: Helvetica, sans-serif;
  text-align: center;
}

.regist-login{
  float: right;
  margin-right: 100px; 
}
.menu-item{
  margin-left: 100px; 
}
.customer_name{
  margin-left: 100px;
  margin-right: 100px; 
}
.selectedTable{
  margin-left: 100px;
  margin-right: 100px;
  margin-bottom: 75px;
  text-align: left;
}

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
   /* width: 45px;*/
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
    .color{
    color: white;
    text-decoration:none;
  }
   .foot{
    width:100%;
    text-align: center;
    font-size: 18px;
    color: #999;
    line-height: 30px;
    /*padding-bottom: 26px;*/
    position: fixed;
    bottom: 26px;
    margin: 0;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

</style>
 