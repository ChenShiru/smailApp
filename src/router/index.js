import Vue from 'vue'
import Router from 'vue-router'
import ShoppingMail from '@/components/pages/ShoppingMail'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'
import Home from '@/components/pages/Home'
import City from '@/components/pages/City'
import Detail from '@/components/pages/Detail'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/main',name: 'Main',component: Main,
      children:[
        {
          path:'/',
          name:'Home',
          component:Home
        },
        {
          path: '/ShoppingMail',
          name: 'ShoppingMail',
          component: ShoppingMail
        },
        {
          path:'/categoryList',
          name:'CategoryList',
          component:CategoryList
        },
        {
          path:'/Cart',
          name:'Cart',
          component:Cart
        }
      ]
    },
    
    { 
      path: '/register',
      name:'Register',
      component: Register

    },
    {
      path: '/login',
      name: 'Login',
      component:Login
    },
    {
      path: '/goods',
      name: 'Goods',
      component:Goods
    },
    {
      path:'/city',
      name:'City',
      component:City
    },
    {
      path:'/detail/:id',
      name:'Detail',
      component:Detail
    }
   
   
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
