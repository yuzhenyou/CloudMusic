import Vue from 'vue'
import Router from 'vue-router'
import singer from '../components/singer'
import songs from '../components/songs'
import index from '../components/index'
import readerContent from '../components/readerContent'
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
      path: '/readerContent',
      name: 'readerContent',
      component: readerContent
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

