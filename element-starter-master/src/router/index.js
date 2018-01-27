import Vue from 'vue'
import Router from 'vue-router'
// import Index from '@/components/Index'
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
    //新购物车页面
    {
      path:'/myShoppingCart',
      name:'myShoppingCart',
      component:resolve => require(['@/components/shoppingCart/myShoppingCart.vue'],resolve)
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
