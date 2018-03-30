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
            default-active="3"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
           
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title"><router-link to="SelfManagement" class="color" >密码修改</router-link></span>
            </el-menu-item>
            <div v-if="userID === '5ab0a8f447ed655ae06704ce'">
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title"><router-link to="resetPsw" class="color" >重置密码</router-link></span>
              </el-menu-item>
              <el-menu-item index="3">
              <i class="el-icon-menu"></i>
              <span slot="title"><router-link to="ToDoList" class="color" >资源审核</router-link></span>
            </el-menu-item>
            <!-- <el-menu-item index="4">
                <i class="el-icon-menu"></i>
                <span slot="title"><router-link to="UserManagement" class="color" >用户管理</router-link></span>
              </el-menu-item> -->
            </div>
            <div v-else-if="userID === '5ab0a94fadddd51fa8d35924'">
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title"><router-link to="resetPsw" class="color" >重置密码</router-link></span>
              </el-menu-item>
              <el-menu-item index="3">
              <i class="el-icon-menu"></i>
              <span slot="title"><router-link to="ToDoList" class="color" >资源审核</router-link></span>
            </el-menu-item>
            <!-- <el-menu-item index="4">
                <i class="el-icon-menu"></i>
                <span slot="title"><router-link to="UserManagement" class="color" >用户管理</router-link></span>
              </el-menu-item> -->
            </div>
          </el-menu>
        </el-col>
      <div class="right-con">
        <div class="managementSelect">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="订购时长">
              <el-input v-model="formInline.period" placeholder="订购时长"></el-input>
            </el-form-item>
            <el-form-item label="系统类型">
              <el-select v-model="formInline.systemType" placeholder="系统类型">
                <el-option label="Windows" value="5a79717cbc9a5b0370dae3b7"></el-option>
                <el-option label="Linux" value="5a797175bc9a5b0370dae3b6"></el-option>
              </el-select>  
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit(formInline)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="selectedTable">
          <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <!-- 以下是展开的内容 -->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="CPU">
                  <span>{{ props.row.Cpu }}核</span>
                </el-form-item>
                <el-form-item label="内存">
                  <span>{{ props.row.memory }}G</span>
                </el-form-item> 
                <el-form-item label="系统">
                  <span>{{ props.row.systemType }}</span>
                  <span>{{ props.row.operateSystem }}</span>
                </el-form-item>
                <el-form-item label="系统盘">
                  <span>{{ props.row.systemHardDiskType }}</span>
                  <span style="margin-left:10px">40G</span>
                </el-form-item>
                <el-form-item label="数据盘">
                  <span>{{ props.row.dataHardDiskType }}</span>
                  <span>{{ props.row.dataHardDiskSize }}</span>
                  <span>G</span>
                </el-form-item>
                <el-form-item label="带宽">
                  <span>{{ props.row.bandWidth }}MB</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <!-- 以下是标题 -->
            <el-table-column
                prop="orderId"
                label="订单编号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="商品名称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="price"
                label="单价"
                width="180">
            </el-table-column>
            <el-table-column
                prop="endAt"
                label="订单截止时间"
                width="180">
            </el-table-column>
            <el-table-column
                prop="status"
                label="订单状态"
                width="180">
            </el-table-column>
            <el-table-column label="操作"width="180">
              <template slot-scope="scope">
                <el-button 
                  size="mini"
                  type="primary"
                  @click="handlePass(scope.$index, scope.row)">通过
                </el-button>
                <el-button 
                  size="mini"
                  type="danger"
                  @click="handleChange(scope.$index, scope.row)">不通过
                </el-button>
              </template>
            </el-table-column>
           </el-table>
          </div>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="5"
              layout="prev, pager, next"
              :total=totalCnt>
            </el-pagination>
          </div>
        </div>
      </el-row>
      
      <p class="foot">版权所有 ©2017 中国电信浙江公司 [ 增值电信业务经营许可证 A2.B1.B2-XXXXXXXX ] ICP 证号:浙 ICP 备 XXXXXXXX号</p>
  </div>
</template>

<script>
export default {
    data() {
      return {
        activeIndex: '3',
        currentPage: 1,
        totalCnt:100,
        dataHardDiskSize: '40',
        inputDiscount: '0.8',
        login: false,
        tableData: [],
        form: {
          name: '',
          pwd: '',
        },
        formInline: {
          systemType: '',
          period: ''
        },
        username:window.sessionStorage.getItem('username'),
        userID:window.sessionStorage.getItem('userID'), 
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
              url:"http://127.0.0.1:3000/api/managementSelect",
              data: formData
      }).then(
          res=>{
            self.tableData = res.data.message
            self.totalCnt = res.data.totalCnt
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        console.log(val);
      },
      handleCurrentChange(val) {
        var formInline = this.formInline;
        var formData = new FormData();
        //左边是后台接收的变量的名称，右边是前台实际变量的名称
        formData.append('systemType',formInline.systemType);
        formData.append('period',formInline.period);
        formData.append('currentPage',val);
        axios({
                method:"post",
                url:"http://127.0.0.1:3000/api/managementSelect",
                data: formData
        }).then(
            res=>{
              this.tableData = res.data.message;
              console.log(res.data.message);
            }
        ).catch(
            error=>{
                console.log(error);
            }
        );
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleChange(index,row){
          console.log(row);
          this.$confirm('资源审批不通过，此操作将跳转到购物车进行修改订单, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '资源审批不通过，请在购物车中修改订单'
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
      onSubmit(formInline) {
        var userID = window.sessionStorage.getItem('userID');
        var formData = new FormData();
        formData.append('userID', userID);
        //左边是后台接收的变量的名称，右边是前台实际变量的名称
        formData.append('systemType',formInline.systemType);
        formData.append('period',formInline.period);
        axios({
                method:"post",
                url:"http://127.0.0.1:3000/api/managementSelect",
                data: formData
        }).then(
            res=>{
              this.tableData = res.data.message;
              console.log(res.data.message);
            }
        ).catch(
            error=>{
                console.log(error);
            }
        );
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
        handlePass(index,row){
          this.$confirm('是否通过审批?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
            var orderID = row.orderId;

            var formData = new FormData();
            formData.append('orderID', orderID);

            axios({
              method:"post",
              url:"http://127.0.0.1:3000/api/orderPass",
              data:formData,
              responseType: 'json',
              headers:{
                'Content-Type':'application/x-www-form-urlencoded'
              },
            }).then(
                res=>{
                  this.$message({
                    type: 'success',
                    message: '订单提交成功'
                  });
                  location.reload();
                }
              ).catch(
                error=>{
                  console.log(error);
                }
              )
          }).catch(() => {
          this.$message({
            type: 'info',
            message: '提交错误，取消提交' 
          });          
        });
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
    min-height: 600px;
  }
  .psw{
    margin-left: 50px;
    padding-left: 50px;
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
    float: left;
    width: 50%;
  }
  .selectedTable{
    margin-left: 50px;
    margin-right: 50px;
    margin-bottom: 75px;
    text-align: left;
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
  .right-con{
    float:left;
    padding-left: 25px;
  }
  .managementSelect{
    margin-top: 25px;
  }
  #management /deep/ .el-col-12{width:auto;}/*强行改掉了系统里的样式*/
</style>
 