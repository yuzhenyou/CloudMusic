import Vue from 'vue'
import Router from 'vue-router'
import singer from '../components/singer'
import songs from '../components/songs'
import index from '../components/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/songs',
      name: 'songs',
      component: songs
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer
    },
    { 
      path: "*", 
      redirect: '/index' 
    }
  ]

})

