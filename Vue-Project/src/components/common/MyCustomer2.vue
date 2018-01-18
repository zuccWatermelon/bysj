<!--客户经理门户-->
<template>
  <div class="page" id="myCustomer">
    <UserHeader></UserHeader>
    <div class="page-cont clearfix">
      <ClientManagerNav :nowRouter="nowRouter"></ClientManagerNav>
      <div class="right">
        <div class="order">

          <div class="customer-top">
            <div class="customer-title">我的客户</div>

            <div class = "myCustomer-add">
              <img class="myCustomer-add-img" src="../../assets/img/add_customer.png">
              <div class="myCustomer-add-btn">新增客户</div>
            </div>
          </div>

          <div class="select-box clearfix">
            <div class="select-item">
              <label>用户名称：</label><el-input class="client" placeholder="请输入关键字"></el-input>
            </div>

            <div class="select-item">
              <label>手机号：</label><el-input class="client"  placeholder="请输入关键字"></el-input>
            </div>
            <div class="select-item">
              <label>状态：</label><el-select placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </div>
            <div class="select-item">
              <button class="submit" type="button">查询</button>
            </div>
          </div>
        <div class="customer-list" :style="{minHeight:minHeight+'px'}">
            <table class="customer-table">
              <thead>
              <tr>
                <td class="customer-name">用户名</td>
                <td class="phoneNum">手机号</td>
                <td class="customer-type">类型</td>
                <td class="register-date">注册时间</td>
                <td class="customer-status">状态(是否实名审核)</td>
                <td class="operation">操作</td>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in customerData" :class="{tr2:index%2==1}">
                <td class="customer-name">{{item.customerName}}</td>
                <td class="phoneNum">{{item.phoneNum}}</td>
                <td class="customer-type">{{item.customerType}}</td>
                <td class="register-date">{{item.registerDate}}</td>
                <td class="customer-status">{{item.price}}</td>
                <td class="operation">
                  <router-link to="/">购物</router-link>
                  <router-link to="/">订单</router-link>
                  <router-link to="/">购物车</router-link>
                  <router-link to="/">已购商品</router-link>
                </td>
              </tr>
              </tbody>
            </table>
            <div class = "pagination" style="float:right;margin-top: 20px;margin-right: 30px;">
                <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="10"
                layout="prev, pager, next, jumper"
                :total="1000">
              </el-pagination>
            </div>
          </div>

        </div>
      </div>
      </div>
    </div>
</template>
<style scoped lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  img{
    border: 0 none;
  }
  a:focus{
    text-decoration: none;
  }
  .page{
    background: #f6f6f6;
    overflow: hidden;
  }
  .page-cont{
    position: relative;
  }
  .right{
    float: left;
    width: 100%;
    padding-left: 14.16%;
  }

  .order{
    padding: 0 30px 40px 30px;
  }
  .order-btn{
    display: flex;
    display: -webkit-flex;
    justify-content:space-between;
    position: relative;
    padding-bottom: 48px;
    border-bottom: #ccd4d7 1px solid;
    i{
      position: absolute;
      bottom: 0;
      width: 0;
      height: 0;
      margin-left: -17px;
      border-width: 0 17px 18px 17px;
      border-style:solid;
      border-color: #f2f8fa #f2f8fa #ccd4d7 #f2f8fa;
    }
  }
  .order-current1{
    transform: scale(1.05);
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -o-transform: scale(1.05);
    box-shadow: rgba(20, 247, 164, 0.34) 0 0 15px 2px;
    -webkit-box-shadow: rgba(20, 247, 164, 0.34) 0 0 15px 2px;
    -moz-box-shadow: rgba(20, 247, 164, 0.34) 0 0 15px 2px;
    -o-box-shadow: rgba(20, 247, 164, 0.34) 0 0 15px 2px;
  }
  .order-current2{
    transform: scale(1.05);
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -o-transform: scale(1.05);
    box-shadow: rgba(255, 165, 108, 0.34) 0 0 15px 2px;
    -webkit-box-shadow: rgba(255, 165, 108, 0.34) 0 0 15px 2px;
    -moz-box-shadow: rgba(255, 165, 108, 0.34) 0 0 15px 2px;
    -o-box-shadow: rgba(255, 165, 108, 0.34) 0 0 15px 2px;
  }
  .order-current3{
    transform: scale(1.05);
    -webkit-transform: scale(1.05);
    -moz-transform: scale(1.05);
    -o-transform: scale(1.05);
    box-shadow: rgba(85, 193, 250, 0.34) 0 0 15px 2px;
    -webkit-box-shadow: rgba(85, 193, 250, 0.34) 0 0 15px 2px;
    -moz-box-shadow: rgba(85, 193, 250, 0.34) 0 0 15px 2px;
    -o-box-shadow: rgba(85, 193, 250, 0.34) 0 0 15px 2px;
  }
  .order-item{
    width: 31.86%;
    position: relative;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
    img{
      width: 100%;
      height: auto;
    }
    .num{
      position: absolute;
      left:0;
      top: 22%;
      width: 100%;
      line-height: 64px;
      font-size: 60px;
      text-align: center;
    }
    .text{
      position: absolute;
      left:0;
      top: 64%;
      width: 100%;
      line-height: 18px;
      font-size: 16px;
      text-align: center;
    }
  }

  .customer-top{
    height: 72px;
    line-height: 72px;
    font-size: 22px;
    color: #333;

    .customer-title{
      height: 72px;
      line-height: 72px;
      font-size: 22px;
      color: #333;
      float:left;
    }

    .myCustomer-add{
      width:141px;
      height:30px;
      background-color: #52dc90;
      float: right;
      border-radius: 2px;
      cursor: pointer;
      margin-top: 22px;

      .myCustomer-add-img{
        width:25px;
        height:20px;
        float: left;
        margin-top: 5px;
        margin-left: 20px;
      }

      .myCustomer-add-btn{
        color: white;
        line-height: 20px;
        font-size: 15px;
        margin-top: 4px;
        float: left;
      }
    }
  }

  .select-box{
    color: #676a6c;
    font-size: 16px;
    padding: 20px 0;
    background: #fff;
  }
  .select-item{
    float: left;
    padding-left: 30px;
    height: 30px;
    line-height: 30px;
    label{
      font-weight: 400;
    }
    .client{
      width: 140px;
    }
    .submit{
      width: 80px;
      height: 30px;
      background: #53caef;
      border: 0 none;
      -webkit-border-radius:5px;
      -moz-border-radius:5px;
      border-radius: 5px;
      color: #fff;
      font-size: 14px;
    }
  }

  .customer-list{
    background: #fff;
    padding-bottom: 100px;
    position: relative;
  }

  .customer-table{
    background: #fff;
    width: 100%;
    thead{
      background: #fafafa;
    }
    tr{
      height: 60px;
      line-height: 18px;
      text-align: center;
    }
    .tr2{
      background: #fafafa;
    }
    td{
      word-break:break-all;
    }
    .customer-name{
      padding-left: 2.5%;
      width:14%;
      text-align: left;
    }
    .phoneNum{
      width:14%;
    }
    .customer-type{
      width:14%;
    }
    .register-date{
      width:14%;
    }
    .customer-status{
      width:14%;
    }

    .operation{
      width:30%;
      a{
        display: inline-block;
        width: 70px;
        margin: 0 2px;
        font-size: 14px;
        color: #2bb4ff;
      }
    }

    .order-currPrice{
      width:10%;
      a{
        display: inline-block;
        width: 35px;
        margin: 0 2px;
        font-size: 14px;
        color: #2bb4ff;
      }
    }
    .order-status{
      min-width: 90px;
    }
    .order-num{
      min-width: 100px;
    }

    .status1{
      color: #fe9a1e;
    }
  }
</style>
<style lang="less">
  #clientManagerIndex{
    /*选择日期*/
    .el-date-editor{
      width: 100px;
    }
    .el-input__inner{
      height: 30px;
      padding:0 10px;
    }
    .el-icon-date{
      display: none;
    }
    .el-select{
      width: 140px;
    }
    /*分页*/
    .el-pagination{
      padding: 40px 0;
      text-align: center;
      background: #fff;
    }
  }
</style>
<script>
  import UserHeader from '../common/UserHeader.vue';
  import ClientManagerNav from '../common/ClientManagerNav.vue';

  export default{
    components:{
      UserHeader,
      ClientManagerNav
    },
    created(){
      var height=document.documentElement.clientHeight;
      this.minHeight=height-72-110-70-40;
      if(this.minHeight<=0){
        this.minHeight=0;
      }
    },
    data(){
      return{
        nowRouter:"MyCustomer2",
        order1:1200,
        order2:120,
        order3:12,
        current:1,
        title:"处理中的订单",
        slideLeft:'15%',
        order:{
          date1:"",
          date2:"",
          status:"1",
          client:""
        },
        options:[{
            value:'选项1',
            label:'状态1'
          },{
            value:'选项2',
            label:'状态2'
          },{
            value:'选项3',
            label:'状态3'
          }
        ],

        customerData:[
          {
            customerName:"张三",
            phoneNum:"张三",
            customerType:"云服务器",
            registerDate:"2017-06-02",
            customerType:"家庭客户",
          },
          {
            customerName:"张三",
            phoneNum:"张三",
            customerType:"云服务器",
            registerDate:"2017-06-02",
            customerType:"家庭客户",
          },
          {
            customerName:"张三",
            phoneNum:"张三",
            customerType:"云服务器",
            registerDate:"2017-06-02",
            customerType:"家庭客户",
          },
          {
            customerName:"张三",
            phoneNum:"张三",
            customerType:"云服务器",
            registerDate:"2017-06-02",
            customerType:"家庭客户",
          },
          {
            customerName:"张三",
            phoneNum:"张三",
            customerType:"云服务器",
            registerDate:"2017-06-02",
            customerType:"家庭客户",
          }
        ],
        currentPage1:2
      }
    },

    methods:{
      orderChanage(i){
        this.current=i;
        if(i==1){
          this.slideLeft='15%';
          this.title="处理中的订单";
          this.order.status='1';
        } else if(i==2){
          this.slideLeft='50%';
          this.title="待付款的订单";
          this.order.status='2';
        } else if(i==3){
          this.slideLeft = '85%';
          this.title="待续费的订单";
          this.order.status='3';
        }
      }
    }
  }
</script>
