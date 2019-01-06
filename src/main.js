// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Tabs,Tab,Button,Row,Col, SwipeItem, Swipe,Lazyload, List, Field, NavBar} from 'vant'

Vue
.use(Tabs)
.use(Tab)
.use(Button)
.use(Row)
.use(Col)
.use(SwipeItem)
.use(Swipe)
.use(Lazyload)
.use(List )
.use(Field)
.use(NavBar)

 

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
