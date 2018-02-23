import Vue from 'vue'
import Router from 'vue-router'
import First from '@/components/First'
import CloudProduct from '@/components/CloudProduct'
import ShoppingCar from '@/components/ShoppingCar'
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
  ]
})
	