<template>
  <div id="shoppingcar">
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
    <div class="customer_name">
    <h4 align="left">{{username}}的购物车</h4>
    <hr />
    </div>
<!-- 当el-table元素中注入data对象数组后，在el-table-column中用prop属性来对应对象中的键名即可填入数据，用label属性来定义表格的列名。可以使用width属性来定义列宽。 -->
    <div class="shoppingCarSelect">
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
          <el-form label-position="left"
            inline class="demo-table-expand"
            @change="handleprice" 
           >
            <el-form-item label="开通时间">
              <el-input-number style="margin-left:10px" 
                v-model="props.row.period" 
                @change="handlePeriod" 
                :min="1" 
                :max="10">
              </el-input-number>
              <span>月</span>
            </el-form-item>
            <el-form-item label="CPU">
              <el-radio-group style="margin-left:35px" 
                @change="handleCPU" 
                v-model="props.row.Cpu">
                <el-radio-button label="1"></el-radio-button>
                <el-radio-button label="2"></el-radio-button>
                <el-radio-button label="4"></el-radio-button>
                <el-radio-button label="8"></el-radio-button>
                <el-radio-button label="16"></el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="内存">
              <el-radio-group style="margin-left:37px" 
                @change="handleMemory" 
                v-model="props.row.memory">
                <div v-if="props.row.Cpu === '1'">
                  <el-radio-button label="1"></el-radio-button>
                  <el-radio-button label="2"></el-radio-button>
                  <el-radio-button label="4"></el-radio-button>
                  <el-radio-button label="8"></el-radio-button>
                </div>
                <div v-if="props.row.Cpu === '2'">
                  <el-radio-button label="2"></el-radio-button>
                  <el-radio-button label="4"></el-radio-button>
                  <el-radio-button label="8"></el-radio-button>
                  <el-radio-button label="16"></el-radio-button>
                </div>
                <div v-if="props.row.Cpu === '4'">
                  <el-radio-button label="4"></el-radio-button>
                  <el-radio-button label="8"></el-radio-button>
                  <el-radio-button label="16"></el-radio-button>
                  <el-radio-button label="32"></el-radio-button>
                </div>
                <div v-if="props.row.Cpu === '8'">
                  <el-radio-button label="8"></el-radio-button>
                  <el-radio-button label="16"></el-radio-button>
                  <el-radio-button label="32"></el-radio-button>
                  <el-radio-button label="64"></el-radio-button>
                </div>
                <div v-if="props.row.Cpu === '16'">
                  <el-radio-button label="16"></el-radio-button>
                  <el-radio-button label="32"></el-radio-button>
                  <el-radio-button label="64"></el-radio-button>
                  <el-radio-button label="128"></el-radio-button>
                </div>
              </el-radio-group>
            </el-form-item> 
            <el-form-item label="系统">
              <div style="margin-left:37px;width:400px;">
                <el-select size="small" style="width: 150px"
                           v-model="props.row.systemType"
                           placeholder="请选择操作系统类型"
                           v-on:change="getType($event)">
                  <el-option v-for="item in type"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
                <el-select size="small" style="width: 150px"
                           v-if="props.row.systemType!=''"
                           v-model="props.row.operateSystem"
                           placeholder="请选择操作系统"
                           v-on:change="getSystem($event)">
                  <el-option
                          v-for="item in Systems"
                          :label="item.label"
                          :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="系统盘">
              <el-select style="width: 150px ;margin-left:24px"
              v-model="props.row.systemHardDiskType" placeholder="请选择系统盘类型">
                <el-option 
                  v-for="item in disk" 
                  :label="item.label" 
                  :value="item.value">
                </el-option>
              </el-select>
              <span style="margin-left:10px">40G</span>
            </el-form-item>
            <el-form-item label="数据盘">
              <el-select style="width: 150px;margin-left:24px"
              v-model="props.row.dataHardDiskType" placeholder="请选择数据盘类型">
                <el-option 
                  v-for="item in disk" 
                  :label="item.label" 
                  :value="item.value">
                </el-option>
              </el-select>
              <el-input style='width:100px'
              placeholder="请输入内容"
              @change="handleDiskSize" 
              v-model="props.row.dataHardDiskSize"
              clearable>
              </el-input>
              <span>G</span>
            </el-form-item>
            <el-form-item label="带宽">
              <div class="block" style='width:400px ; margin-left:38px' >
                <el-slider v-model="props.row.bandWidth"
                @change="handlebandwidth"  
                :min="1" 
                :max="100"
                show-input> </el-slider>
              </div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <!-- 以下是标题 -->
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
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
          prop="createdAt"
          label="订单创建时间"
          width="180">
      </el-table-column>
      <el-table-column
          prop="status"
          label="订单状态"
          width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
       </el-table-column>
      </el-table>
    </div>
    <div class="bottom">
      <div class="bottom-center">
        <div class="submit" @click="submitOrder()">提交审批</div>
        <div class="final-price">
          <p class="word"><!-- 总价： --><span class="orange sumPrice"><small>
            <!-- {{val[0].price}} --><!-- {{this.multipleSelection[0].price}} -->

            </small></span></p>
        </div>
      </div>
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
      <p class="foot">版权所有 ©2017 中国电信浙江公司 [ 增值电信业务经营许可证 A2.B1.B2-XXXXXXXX ] ICP 证号:浙 ICP 备 XXXXXXXX号</p>
  </div>

</template>

<script>
export default {
    data() {
      return {
        activeIndex: '7',
        currentPage: 1,
        totalCnt:100,
        dataHardDiskSize: '40',
        type:[{
          label:"Windows",
          value:"Windows"
        },{
          label:"Linux",
          value:"Linux"
        }],
        Systems: [{
          label:"Windows7",
          value:"Windows7"
        },{
          label:"Windows10",
          value:"Windows10"
        }],
        login: false,
        cpu: '1',
        memory: '1',
        bandWidth: 1,
        period: 1,
        formInline: {
          systemType: '',
          period: ''
        },
        num: 1,
        disk: [{
          value: 'SATA',
          label: 'SATA'
        }, {
          value: 'SSD',
          label: 'SSD'
        }],
        form: {
          name: '',
          pwd: '',
        },

        formLabelWidth: '40px',
        tableData: [],
        multipleSelection: [],   
        price:40,
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
              url:"http://127.0.0.1:3000/api/shoppingCarSelect",
              data: formData
      }).then(
          res=>{
            self.tableData = res.data.message
            self.totalCnt = res.data.totalCnt
            self.tableData.forEach(function(element){
              element.bandWidth = Number(element.bandWidth)
            })
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
      handleprice(value){
        console.log(value);
      },
      handleCurrentChange(val) {
        var formInline = this.formInline;
        var userID = window.sessionStorage.getItem('userID');
        var formData = new FormData();
        formData.append('userID', userID);
        //左边是后台接收的变量的名称，右边是前台实际变量的名称
        formData.append('systemType',formInline.systemType);
        formData.append('period',formInline.period);
        formData.append('currentPage',val);
        axios({
                method:"post",
                url:"http://127.0.0.1:3000/api/shoppingCarSelect",
                data: formData
        }).then(
            res=>{
              this.tableData = res.data.message;
              // console.log(res.data.message);
            }
        ).catch(
            error=>{
                console.log(error);
            }
        );
      },
      handleSelect(key, keyPath) {
        return 0;
      },
      handleCPU(value){
        // console.log(value);
        this.price = 80;
        this.price = this.price * value;
        // this.price = this.price * value;
        // console.log(this.price);
      },
      handleMemory(value){
        // console.log(value);
        this.price = 80;
        this.price = this.price * value;
        // console.log(this.price);
      },
      handleDiskSize(value){
        // console.log(value);
        if (value == 0) {
          this.price = this.price;
        }else{
          this.price = 80;
          this.price = value * this.price;
        }
        
        // console.log(this.price);
      },

       handlePeriod(value) {
        // console.log(value);
        this.price = 80;
        this.price = value * this.price;
        // console.log(this.price);
        
        // this.multipleSelection = val;
        // console.log(val);
        // console.log(this.multipleSelection);

        // console.log(this.multipleSelection[0].price);
        // if (val[0]) {
        //   console.log(val[0].price);
        //   val[0].price = 2 * val[0].period * val[0].Cpu * val[0].memory * val[0].dataHardDiskSize * val[0].bandWidth;
        //   console.log(this.multipleSelection[0].price);
        // }

      },
      
      handlebandwidth(value) {
        // console.log(value);
        this.price = 80;
        this.price = value * this.price;
        // console.log(this.price);
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
      onSubmit(formInline) {
        var userID = window.sessionStorage.getItem('userID');
        var formData = new FormData();
        formData.append('userID', userID);
        //左边是后台接收的变量的名称，右边是前台实际变量的名称
        formData.append('systemType',formInline.systemType);
        formData.append('period',formInline.period);
        axios({
                method:"post",
                url:"http://127.0.0.1:3000/api/shoppingCarSelect",
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
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      
      handleDelete(index, row) {
          console.log(row);
          this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
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
            message: '已取消删除'
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val);
        
        if (val[0]) {
          console.log(val[0].price);
          val[0].price = 2 * val[0].period * val[0].Cpu * val[0].memory * val[0].dataHardDiskSize * val[0].bandWidth;
          console.log(this.multipleSelection[0].price);
        }
        
      },

      submitOrder(){
        if (this.multipleSelection[0] != '' && this.multipleSelection[0] != null) {
        console.log(this.multipleSelection[0]);
          this.$confirm('提交审批后请等待管理员审批，是否提交订单?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.multipleSelection.forEach(function(element){
            if(element.Cpu == 1){
              element.Cpu = '5a7970d6bc9a5b0370dae3a8';
            }else if (element.Cpu == 2) {
              element.Cpu = '5a7970dfbc9a5b0370dae3a9';
            }else if (element.Cpu == 4) {
              element.Cpu = '5a7970e2bc9a5b0370dae3aa';
            }else if (element.Cpu == 8) {
              element.Cpu = '5a7970e4bc9a5b0370dae3ab';
            }else if (element.Cpu == 16) {
              element.Cpu = '5a7970e5bc9a5b0370dae3ac';
            }else if (element.Cpu == 32) {
              element.Cpu = '5a7970e7bc9a5b0370dae3ad';
            }

            if (element.memory == 1) {
              element.memory = '5a7970f5bc9a5b0370dae3ae';
            }else if (element.memory == 2) {
              element.memory = '5a7970f6bc9a5b0370dae3af';
            }else if (element.memory == 4) {
              element.memory = '5a7970f8bc9a5b0370dae3b0';
            }else if (element.memory == 8) {
              element.memory = '5a7970fabc9a5b0370dae3b1';
            }else if (element.memory == 16) {
              element.memory = '5a7970ffbc9a5b0370dae3b2';
            }else if (element.memory == 32) {
              element.memory = '5a797101bc9a5b0370dae3b3';
            }else if (element.memory == 64) {
              element.memory = '5a797102bc9a5b0370dae3b4';
            }else if (element.memory == 128) {
              element.memory = '5a797104bc9a5b0370dae3b5';
            }

            if (element.operateSystemType == "Windows") {
              element.operateSystemType = '5a79717cbc9a5b0370dae3b7';
            }else{
              element.operateSystemType = '5a797175bc9a5b0370dae3b6';
            }

            if(element.operateSystem == "Windows7"){
              element.operateSystem = '5a79718dbc9a5b0370dae3b9';
            }else if (operateSystem == "Windows10") {
              element.operateSystem = '5a797187bc9a5b0370dae3b8';
            }else if (element.operateSystem == 'CentOS 6') {
              element.operateSystem = '5a797199bc9a5b0370dae3bb';
            }else{
              element.operateSystem = '5a797193bc9a5b0370dae3ba';
            }

            if (element.systemHardDiskType == 'SATA') {
              element.systemHardDiskType = '5a7971b5bc9a5b0370dae3bc';
            }else {
              element.systemHardDiskType = '5a7971c8bc9a5b0370dae3bd';
            }

            if (element.dataHardDiskType == 'SATA' ) {
              element.dataHardDiskType = '5a7971b5bc9a5b0370dae3bc';
            }else {
              element.dataHardDiskType = '5a7971c8bc9a5b0370dae3bd';
            }

            console.log(element.operateSystemType);
            // alert('Test');

            var orderID = element.orderId;
            var CPU = element.Cpu;
            var bandWidth = element.bandWidth;
            var createdAt = element.createdAt;
            var dataHardDiskSize = element.dataHardDiskSize;
            var dataHardDiskType = element.dataHardDiskType;
            var memory = element.memory;
            var operateSystem = element.operateSystem;
            var operateSystemType = element.operateSystemType;
            var period = element.period;
            var status = element.status;
            var systemHardDiskType = element.systemHardDiskType;
            

            var formData = new FormData();
            formData.append('orderID', orderID);
            formData.append('CPU', CPU);
            formData.append('createdAt', createdAt);
            formData.append('dataHardDiskSize', dataHardDiskSize);
            formData.append('dataHardDiskType', dataHardDiskType);
            formData.append('memory', memory);
            formData.append('operateSystemType', operateSystemType);
            formData.append('period', period);
            formData.append('status', status);
            formData.append('systemHardDiskType', systemHardDiskType);
             formData.append('operateSystem', operateSystem);
            formData.append('bandWidth', bandWidth);

            axios({
              method:"post",
              url:"http://127.0.0.1:3000/api/saveOrder",
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
          })
          this.$message({
            type: 'success',
            message: '订单提交成功'
          });
            location.reload();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '提交错误，取消提交' 
          });          
        });
      }else{
        alert("请勾选需要提交审批的订单")
      }
    },
  }
}
</script>

<style>
#shoppingcar {
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
    width: 100%;
  }
   .bottom{
    width:99%;
    margin-top:50px;
    position: fixed;
    bottom: 0px;
    background-color: #e5e5e5;
    z-index: 10000;
  }

  .bottom-center{
    width:1200px;
    margin:0 auto;
  }
.final-price{
      width:650px;
      height:50px;
      margin-right:10px;
      float:right;
      text-align: right;
    }
.word{
        line-height: 35px;
}
.submit{
      width:130px;
      height:70px;
      float: right;
      text-align: center;
      line-height: 70px;
      background-color: #ff8200;
      font-size: 25px;
      color:#fff;
      cursor: pointer;
    }
    .orange{
        font-weight: bold;
        font-size: 26px;
        color:#ff8200;
      }
      .light-word{
        font-size: 12px;
        color:#999;
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

</style>
