<!--产品配置   产品管理-->
<template>
  <div id="goodsManagement">
    <UserNav></UserNav>
    <div class="cont">
      <ClientManagerNav :routerlinks="routerlinks"></ClientManagerNav>
      <div class="cont-right" >
        <div class="clearfix">
          <p class="title">产品管理</p>
          <a class="add-goods" href="javascript:void(0);" @click="goodsShow(0)">添加商品</a>
          <a class="add-goods" href="javascript:void(0);" >目录管理</a>
        </div>
        <div class="goods-main">
          <!--目录-->
          <div class="goods-nav" @click="currentNav='';" :style="{minHeight:minHeight+'px'}">
            <p class="nav-title">商品目录</p>
            <div class="nav-cont">
              <p v-for="item in navList" :class="{current: currentNav == item.catalogId}" @click.stop="navChange(item.catalogId)">{{item.catalogName}}</p>
            </div>
            <a class="add-nav" href="javascript:void(0);" @click.stop="addNav = true">添加商品目录</a>
          </div>
          <!--没有目录-->
          <div v-if="navList.length <= 0 || goodsData.length <= 0" class="goods-null" :style="{paddingTop:minHeight / 2 - 153 +'px',minHeight:minHeight+'px'}">
            <img src="../../assets/img/nullBox.png"/>
            <p v-if="navList.length <= 0">还没有任何商品，去新增商品吧！首先，去<a href="javascript:void(0);" @click="addNav = true">添加</a>一个商品目录吧</p>
            <p v-if="goodsData.length <= 0">还没有任何商品，去<a href="javascript:void(0);" @click="goodsShow(0)">新增商品吧</a>！</p>
          </div>
          <!--有商品-->
          <div class="goods-cont" v-if="goodsData.length > 0 && navList.length > 0" :style="{minHeight:minHeight+'px'}">
            <ul class="goods-header clearfix">
              <li style="width: 18%;">商品名称</li>
              <li style="width: 18%;">商品编码</li>
              <li style="width: 12%;">生效时间</li>
              <li style="width: 52%;">操作</li>
            </ul>
            <table>
              <tr v-for="item in goodsData">
                <td style="width: 18%; border-width: 1px 0 1px 1px;">{{item.offerName}}</td>
                <td style="width: 18%;">{{item.offerNbr}}</td>
                <td style="width: 12%; line-height: 20px;">{{item.expDate}}</td>
                <td style="width: 52%; border-width: 1px 1px 1px 0;" class="operate">
                  <a href="javascript:void(0);" @click="goodsShow(1)">商品详情</a>
                  <a href="javascript:void(0);" @click="showFun(item.offerId,'configuration')">配置详情</a>
                  <a href="javascript:void(0);" @click="showFun(item.offerId,'addProducts')">添加产品</a>
                  <a href="javascript:void(0);" @click="showFun(item.offerId,'addAttr')">属性配置</a>
                  <a href="javascript:void(0);" @click="showFun(item.offerId,'addPrice')">定价配置</a>
                  <a href="javascript:void(0);" @click="showFun(item.offerId,'addDiscount')">优惠配置</a>
                </td>
              </tr>
            </table>
            <div class="pagination">
              <el-pagination
                @current-change="getGoods(currentNav)"
                :current-page.sync="currentPage"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="10">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--添加目录-->
    <addNav v-if="addNav"
            :showBool.sync="addNav"
            @callback="getNavFun(navList.length)"
    ></addNav>
    <!--添加商品-->
    <addGoods v-if="boolObj.addGoods"
              :showBool.sync="boolObj.addGoods"
              :navList="navList"
              :currentNav="currentNav"
              :title="title"
              @callback="getGoods(currentNav)"
    ></addGoods>
    <!--配置详情-->
    <configuration v-if="boolObj.configuration"
                   :showBool.sync="boolObj.configuration"
                   :currentGoodID="currentGoodID"
    ></configuration>
    <!--添加产品-->
    <addProducts v-if="boolObj.addProducts"
                 :showBool.sync="boolObj.addProducts"
                 :currentGoodID="currentGoodID"
    ></addProducts>
    <!--属性配置-->
    <addAttr v-if="boolObj.addAttr"
             :showBool.sync="boolObj.addAttr"
             :currentGoodID="currentGoodID"
    ></addAttr>
  </div>
</template>
<style scoped lang="less">
  *{
    padding: 0;
    margin: 0;
  }
  a:focus{
    text-decoration: none;
  }
  .cont{
    position: relative;
  }
  .cont-right{
    margin-left: 14.16%;
    background: #f2f8fa;
    padding: 5px 30px 15px 35px;
  }
  .title{
    float: left;
    font-size: 20px;
    color: #333;
    line-height: 30px;
    padding: 10px 0;
  }
  .add-goods{
    float: right;
    width: 90px;
    height: 35px;
    margin-top: 6px;
    line-height: 33px;
    border: 1px #d2d2d2 solid;
    font-size: 12px;
    color: #333;
    background: #fff;
    border-radius: 3px;
    text-align: center;
    margin-left: 10px;
  }
  .goods-main{
    width: 100%;
    background: #fff;
    position: relative;
    padding: 21px 0 16px 15%;
  }
  .goods-nav{
    width: 15%;
    max-width: 240px;
    height: 90%;
    border: #d4d4d4 1px solid;
    background: #f7f7f7;
    padding-bottom: 53px;
    position: absolute;
    top: 21px;
    left: 16px;
  }
  .nav-title{
    width: 100%;
    background: #e8e8e8;
    line-height: 45px;
    font-size: 16px;
    color: #666;
    text-align: center;
  }
  .nav-cont{
    p{
      line-height: 45px;
      border-top: 3px #f7f7f7 solid;
      text-align: center;
      color: #333;
      font-size: 14px;
      background: #e8e8e8;
      cursor: pointer;
    }
    .current{
      background: #ccc;
    }
  }
  .add-nav{
    display: block;
    position: absolute;
    bottom: 0;
    left:0;
    width: 100%;
    line-height: 50px;
    text-align: center;
    color: #30acee;
    background: #fff;
  }
  .goods-null{
    text-align: center;
    p{
      font-size: 16px;
      padding-top: 15px;
      line-height: 20px;
    }
    a{
      color: #30acee;
    }
  }
  .goods-cont{
    width: 100%;
    padding: 0 30px 60px 50px;
    position: relative;
    table{
      text-align: center;
      width: 100%;
      border-collapse:separate;
      border-spacing:0px 5px;
      font-size: 14px;
    }
    tr{
      background: #f7f7f7;
    }
    td{
      line-height: 50px;
      border: #d4d4d4 1px solid;
      border-width: 1px 0;
      color: #333;
    }
    .operate{
      font-size: 0;
      a{
        color: #30acee;
        font-size: 14px;
        padding: 0 6px;
      }
    }
    .goods-header{
      width: 100%;
      padding-bottom: 10px;
      li{
        float: left;
        height: 16px;
        line-height: 16px;
        font-size: 16px;
        color: #999;
        text-align: center;
      }
    }
    .pagination{
      width: 100%;
      position: absolute;
      bottom: 16px;
      left: 0;
      text-align: center;
    }
  }
</style>
<script>
  import UserNav from '../common/UserHeader.vue';
  import ClientManagerNav from '../common/ClientManagerNav.vue';
  import addNav from './addNav.vue';
  import addGoods from './addGoods.vue';
  import configuration from './configuration.vue';
  import addProducts from './addProducts.vue';
  import addAttr from './addAttr.vue';
  export default{
    components:{
      UserNav,
      ClientManagerNav,
      addNav,
      addGoods,
      configuration,
      addProducts,
      addAttr
    },
    data(){
      return{
        routerlinks:{
          current:'/goodsManagement',
          links:[
            {
              name:'产品管理',
              link:'/goodsManagement'
            }
          ]
        },
        minHeight:0,
        pageSize:6,
        currentPage:1,
        total: 6,
        navList:[1,2],
        currentNav:'',
        addNav: false,
        title:'',
        goodsData:[1,2],
        boolObj:{
          addGoods:false, //添加商品，商品详情
          configuration:false, //配置详情
          addProducts:false,  //添加产品
          addAttr:false,  //属性配置
          addPrice:false,//定价配置
          addDiscount:false,//优惠配置
        },
        currentGoodID:'', //当前商品ID
      }
    },
    created(){
      var self = this;
      //        最小全屏高度
      var height=document.documentElement.clientHeight;
      self.minHeight=height-60-70-21-16-15;
      if(self.minHeight<=0){
        self.minHeight=0;
      }
//      this.getNavFun(0);
    },
    methods:{
//        获取商品目录
      getNavFun(num){
        var self = this;
        axios({
          method:"post",
          url:"/netCloudOffer/offerCatalogService/offercataloglist",
          data:{
            catalogId:"",
            parCatalogId:""
          }
        }).then(res=>{
          if(res.data.code == '0' || res.data.code == 0){
            self.navList = res.data.data;
            self.currentNav = this.navList[num].catalogId;
            if(self.$route.query.catalogId != undefined && self.$route.query.catalogId != null){
              self.currentNav = self.$route.query.catalogId;
            }
            if(self.$route.query.currentPage != undefined && self.$route.query.currentPage != null){
              self.currentPage = parseInt(self.$route.query.currentPage);
            }
            self.getGoods(self.currentNav);
          } else {
            self.$alert('程序出错', '提示', {
              confirmButtonText: '确定'
            });
          }
        }).catch(error=>{
          console.log(error)
        })
      },
//        商品目录点击事件
      navChange(catalogId){
        this.currentNav = catalogId;
        this.currentPage = 1;
        this.getGoods(this.currentNav);
      },
//      根据商品目录获取商品列表
      getGoods(catalogId){
        var self = this;
        axios({
          url:'/netCloudOffer/offerService/getofferinfobyoffercatalog',
          method: 'post',
          data: {
            id: catalogId,
            pageSize: self.pageSize,
            pageNo: self.currentPage
          }
        }).then(res => {
          self.total = res.data.totalRecord;
          self.goodsData = res.data.data;
          this.urlFun();
        }).catch(err => {

        });
      },
//      添加商品弹框
      goodsShow(status){ // status 0:添加，1：详情修改
        if(status == 0){
          if(this.currentNav){
            this.title = '添加商品';
            this.boolObj.addGoods = true;
          } else {
            this.$alert('请选择目录', '提示', {
              confirmButtonText: '确定'
            });
          }
        } else {
//              请求查询
          this.title = '商品详情';
          this.boolObj.addGoods = true;

        }
      },
//      显示各类弹框
      showFun(offerId,bool){
        this.currentGoodID = offerId;
        this.boolObj[bool] = true;
        console.log(this.configuration);
      },
//      url
      urlFun(){
        console.log();
        var self = this;
        this.$router.replace('/goodsManagement?catalogId='+self.currentNav+'&currentPage='+self.currentPage);
      }

    },
    watch:{

    }
  }
</script>
