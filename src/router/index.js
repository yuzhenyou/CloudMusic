import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Login from '@/components/login'
import Mine from '@/components/mine'
import Search from '@/components/search'
import List from '@/components/list'
import MineList from '@/components/mineList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/mineList',
      name: 'MineList',
      component: MineList
    }
  ]
})
