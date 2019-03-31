import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  Nprogress.start()
  if (to.name === 'login') {
    if (store.getters.getToken === 'null') {
      next()
    } else {
      next({ name: 'home' })
    }
  } else {
    if (store.getters.getToken === 'null') {
      next({ name: 'login' })
    } else {
      next()
    }
  }
})

router.afterEach(() => {
  Nprogress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
