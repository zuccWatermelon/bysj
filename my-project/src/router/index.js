import Vue from 'vue'
import Router from 'vue-router'
import First from '@/components/First'
import CloudProduct from '@/components/CloudProduct'
import ShoppingCar from '@/components/ShoppingCar'
import Assets from '@/components/Assets'
import SelfManagement from '@/components/SelfManagement'
import ToDoList from '@/components/ToDoList'
import resetPsw from '@/components/resetPsw'
import UserManagement from '@/components/UserManagement'
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
    {
      path: '/ToDoList',
      name: '/ToDoList',
      component: ToDoList
    }, 
    {
      path: '/resetPsw',
      name: '/resetPsw',
      component: resetPsw
    },
    {
      path: '/UserManagement',
      name: '/UserManagement',
      component: UserManagement
    }
    
  ]
})
	