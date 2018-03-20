import Vue from 'vue'
import Router from 'vue-router'
import First from '@/components/First'
import CloudProduct from '@/components/CloudProduct'
import ShoppingCar from '@/components/ShoppingCar'
import Assets from '@/components/Assets'
import SelfManagement from '@/components/SelfManagement'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'First',
      component: First
    },
    {
      path: '/CloudProduct',
      name: '/CloudProduct',
      component: CloudProduct
    },
    {
      path: '/ShoppingCar',
      name: '/ShoppingCar',
      component: ShoppingCar
    },
    {
      path: '/Assets',
      name: '/Assets',
      component: Assets
    },
    {
      path: '/SelfManagement',
      name: '/SelfManagement',
      component: SelfManagement
    },    
  ]
})
	