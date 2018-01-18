import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/Index'
// const Index = resolve => require(['@/components/Index'], resolve)
// import customerInfo from '@/components/common/customerInfo'
import TConfiguration from '@/components/TConfiguration'
import MyCustomer from '@/components/common/MyCustomer'
import MyCustomer2 from '@/components/common/MyCustomer2'
import MyOrderDeliver from '@/components/common/MyOrderDeliver'
import AddClient from '@/components/AddClient'
import ClientManagerIndex from '@/components/ClientManagerIndex'
import OrderedProduct from '@/components/common/OrderedProduct'
// import ShipmentIndex from '@/components/ShipmentIndex'
import myWorkOrder from '@/components/myWorkOrder'
import myWorkOrder2 from '@/components/myWorkOrder2'
import workOrderDetails1 from '@/components/workOrderDetails1'
import workOrderDetails2 from '@/components/workOrderDetails2'
import workOrderDetails3 from '@/components/workOrderDetails3'
import workOrderDetailsA from '@/components/workOrderDetailsA'
import workOrderDetailsB from '@/components/workOrderDetailsB'
import workOrderDetailsC from '@/components/workOrderDetailsC'

import cloudBuy from '@/components/cloudBuy'
import orderForm from '@/components/orderForm'

import passBuy from '@/components/passBuy'

import orderwhole from '@/components/orderwhole'
const RealNameCompany = resolve => require(['@/components/RealNameCompany'], resolve)
import orderSubmitCorrect from '@/components/common/orderSubmitCorrect'
import orderSubmitError from '@/components/common/orderSubmitError'

Vue.use(Router)

export default new Router({
  routes: [
    //首页
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/components/Index.vue'], resolve)
    },
    //合作伙伴
    {
      path: '/partner',
      name: 'partner',
      component: resolve => require(['@/components/common/partner.vue'], resolve)
    },
    //T+标准版配置
    {
      path: '/allocation',
      name: 'allocation',
      component: resolve => require(['@/components/allocation.vue'], resolve)
    },
    //T+普及版配置
    {
      path: '/allocation2',
      name: 'allocation2',
      component: resolve => require(['@/components/allocation2.vue'], resolve)
    },
    {
      path:'/orderSubmitCorrect',
      name:'orderSubmitCorrect',
      component:orderSubmitCorrect
    },
    {
      path:'/orderSubmitError',
      name:'orderSubmitError',
      component:orderSubmitError
    },
    //订单详情页
    {
      path: '/orderInfo',
      name: 'orderInfo',
      component: resolve => require(['@/components/common/orderInfo.vue'], resolve)
    },
    //我的订单
    {
      path: '/myOrder',
      name: 'myOrder',
      component: resolve => require(['@/components/MyOrder.vue'], resolve)
    },
    /**购物车新**/
    {
      path:'/shoppingCartFrame',
      name:'shoppingCartFrame',
      component:resolve => require(['@/components/shoppingCart/shoppingCartFrame.vue'],resolve)
    },
    {
      path: '/clientManagerIndex',
      name: 'clientManagerIndex',
      meta: {
        requireLogin: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component: resolve => require(['@/components/ClientManagerIndex.vue'], resolve)
    },
    //已购买的产品
    {
      path: '/OrderedProduct',
      name: 'OrderedProduct',
      component: resolve => require(['@/components/common/OrderedProduct.vue'], resolve)
    },
    //出工工位门户
    {
      path:'/shipmentIndex',component(resolve){
      require.ensure(['@/components/ShipmentIndex.vue'],()=>{
        resolve(require('@/components/ShipmentIndex.vue'))//打包切割
      });
    }
    },
    {
      path: '/cloudBuy',
      name: 'cloudBuy',
      component: resolve => require(['@/components/cloudBuy.vue'], resolve)
    },
    {
      path: '/orderForm',
      name: 'orderForm',
      component: resolve => require(['@/components/orderForm.vue'], resolve)
    },
    {
      path: '/passBuy',
      name: 'passBuy',
      component: resolve => require(['@/components/passBuy.vue'], resolve)
    },
    //施工门位
    {
      path: '/myWorkOrder',
      name: 'myWorkOrder',
      component: resolve => require(['@/components/myWorkOrder.vue'], resolve)
    },
    //支撑人员
    {
      path: '/myWorkOrder2',
      name: 'myWorkOrder2',
      component: resolve => require(['@/components/myWorkOrder2.vue'], resolve)
    },
    {
      path: '/workOrderDetails1',
      name: 'workOrderDetails1',
      component: resolve => require(['@/components/workOrderDetails1.vue'], resolve)
    },
    {
      path: '/workOrderDetails2',
      name: 'workOrderDetails2',
      component: resolve => require(['@/components/workOrderDetails2.vue'], resolve)
    },
    {
      path: '/workOrderDetails3',
      name: 'workOrderDetails3',
      component: resolve => require(['@/components/workOrderDetails3.vue'], resolve)
    },
    {
      path: '/workOrderDetailsA',
      name: 'workOrderDetailsA',
      component: resolve => require(['@/components/workOrderDetailsA.vue'], resolve)
    },
    {
      path: '/workOrderDetailsB',
      name: 'workOrderDetailsB',
      component: resolve => require(['@/components/workOrderDetailsB.vue'], resolve)
    },
    {
      path: '/workOrderDetailsC',
      name: 'workOrderDetailsC',
      component: resolve => require(['@/components/workOrderDetailsC.vue'], resolve)
    },
    {
      path: '/orderwhole',
      name: 'orderwhole',
      component: resolve => require(['@/components/orderwhole.vue'], resolve)
    },
    //加入合作伙伴
    {
      path: '/realNameCompany',
      name: 'realNameCompany',
      component: resolve => require(['@/components/RealNameCompany.vue'], resolve)
    },

    //IPRAN线路详情
    {
      path: '/IPRANDetail',
      name: 'IPRANDetail',
      component: resolve => require(['@/components/CloundLine/IPRAN/IPRANDetail.vue'], resolve)
    },
    // //云专线路径
    {
      path: '/CloundLine',
      name: 'CloundLine',
      component: resolve => require(['@/components/CloundLine/CloundLine.vue'], resolve)
    },
    //商品列表
    {
      path: '/goodsList',
      name: 'goodsList',
      component: resolve => require(['@/components/products/goodsList.vue'], resolve)
    },
    //新购物车页面
    {
      path:'/myShoppingCart',
      name:'myShoppingCart',
      component:resolve => require(['@/components/shoppingCart/myShoppingCart.vue'],resolve)
    },
  //  商品配置
    {
      path:'/goodsManagement',
      name:'goodsManagement',
      component:resolve => require(['@/components/goodsConfiguration/goodsManagement.vue'],resolve)
    },
  //  产品配置
    {
      path:'/productsManagement',
      name:'productsManagement',
      component:resolve => require(['@/components/goodsConfiguration/goodsManagement.vue'],resolve)
    },
  //  待补录订单
    {
      path:'/toMakeupOrder',
      name:'toMakeupOrder',
      meta: {
        requireLogin: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component:resolve => require(['@/components/waitRecord/ToMakeupOrder.vue'],resolve)
    },
  //  待补录订单详情
    {
      path:'/toMakeupInfo',
      name:'toMakeupInfo',
      meta: {
        requireLogin: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component:resolve => require(['@/components/waitRecord/toMakeupInfo.vue'],resolve)
    },
    //  云专线配置
    {
      path:'/cloudHost',
      name:'cloudHost',
      component:resolve => require(['@/components/CloudHost/cloudHost.vue'],resolve)
    },
    //  资源审核
    {
      path:'/resourcesCheck',
      name:'resourcesCheck',
      meta: {
        requireLogin: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component:resolve => require(['@/components/resourcesCheck/resourcesCheck.vue'],resolve)
    },
    //  资源审核详情页
    {
      path:'/resourcesCheckInfo',
      name:'resourcesCheckInfo',
      meta: {
        requireLogin: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component:resolve => require(['@/components/resourcesCheck/resourcesCheckInfo.vue'],resolve)
    },
  //  客户现有资产
    {
      path:'/clientAssets',
      name:'clientAssets',
      meta: {
        requireLogin: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component:resolve => require(['@/components/clientAssets/clientAssets.vue'],resolve)
    },
    //  客户现有资产列表
    {
      path:'/clientAssetsList',
      name:'clientAssetsList',
      meta: {
        requireLogin: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component:resolve => require(['@/components/clientAssets/clientAssetsList.vue'],resolve)
    },
  //  试用中的订单
    {
      path:'/tryOutOrder',
      name:'tryOutOrder',
      meta: {
        requireLogin: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component:resolve => require(['@/components/clientManager/tryOutOrder.vue'],resolve)
    },
    //  云专线配置
    {
      path:'/cloudNet',
      name:'cloudNet',
      meta: {
        requireLogin: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component:resolve => require(['@/components/views/CloudNet/cloudNet.vue'],resolve)
    },
    //  云宽通配置
    {
      path:'/CloudBroadband',
      name:'CloudBroadband',
      meta: {
        requireLogin: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component:resolve => require(['@/components/views/CloudBroadband/CloudBroadband.vue'],resolve)
    },
  //  修改密码
    {
      path:'/password',
      name:'password',
      meta: {
        requireLogin: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      component:resolve => require(['@/components/clientManager/passwordEdit.vue'],resolve)
    }
  ]
})
