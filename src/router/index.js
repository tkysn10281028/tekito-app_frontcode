import Vue from 'vue'
import VueRouter from 'vue-router'
import MainScreen from '../views/MainScreen.vue'
import HomePage from '../views/HomePage.vue'
import ChangeByCase from '../views/ChangeByCase.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: HomePage
  },
  {
    path: '/main',
    name: 'MainScreen',
    component: MainScreen
  },
  {
    path: '/changeByCase',
    name: 'ChangeByCase',
    component: ChangeByCase
  }
]

const router = new VueRouter({
  routes
})

export default router
