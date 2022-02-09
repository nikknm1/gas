import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Main from '../views/Main.vue'
import History from '../views/History.vue'

Vue.use(VueRouter)


const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    children: [
      {
        path: ':type',
        name: 'History',
        component: History
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
