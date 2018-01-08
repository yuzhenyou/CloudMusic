// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import yogee from 'yogee'
import axios from 'axios'
import {store} from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)
Vue.use(ElementUI)
import util from './util'
Vue.use(util);

Vue.config.productionTip = false
Vue.prototype.$http=axios
Vue.prototype.config={
  api:'http://192.168.51.46:3000'
}
// Vue.use(Swiper)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App}
})
