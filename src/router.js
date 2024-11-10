import { createWebHashHistory, createRouter } from 'vue-router'

import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'
import Orders from './pages/Orders.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/favorites', name: 'favorites', component: Favorites },
  { path: '/orders', name: 'orders', component: Orders }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
