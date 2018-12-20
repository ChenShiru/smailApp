import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ShoppingMail from '@/components/pages/ShoppingMail'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ShoppingMail',
      component: ShoppingMail
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
    }
  ]
})
