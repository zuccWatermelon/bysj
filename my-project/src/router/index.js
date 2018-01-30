import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import First from '@/components/First'
import Log_in from '@/components/Log_in'
import CloudProduct from '@/components/CloudProduct'
import Searched from '@/components/Searched'
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
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Log_in',
      name: '/Log_in',
      component: Log_in
    },
    {
      path: '/CloudProduct',
      name: '/CloudProduct',
      component: CloudProduct
    },
     {
      path: '/Searched',
      name: '/Searched',
      component: Searched
    },
    {
      path: '/ShoppingCar',
      name: '/ShoppingCar',
      component: ShoppingCar
    }
  ]
})
	