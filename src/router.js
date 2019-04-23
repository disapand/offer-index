import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login')
    },
    {
      path: '/',
      name: 'home',
      component: () => import('./views/layout/index'),
      children: [
        {
          path: 'price',
          name: 'price',
          component: () => import('./views/price/index')
        },
        {
          path: 'profiles',
          name: 'profiles',
          component: () => import('./views/profile/index')
        },
        {
          path: 'customs',
          name: 'customs',
          component: () => import('./views/custom/index')
        },
        {
          path: 'list',
          name: 'list',
          component: () => import('./views/paper/list')
        },
        {
          path: 'paper',
          name: 'paper',
          component: () => import('./views/paper/index')
        },
        {
          path: 'detail',
          name: 'detail',
          component: () => import('./views/paper/detail')
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
