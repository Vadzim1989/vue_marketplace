import { createWebHashHistory, createRouter } from 'vue-router'
import { checkAuth } from './middleware/checkAuth'

import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'
import Orders from './pages/Orders.vue'
import Auth from './pages/Auth.vue'

const routes = [
  { 
    path: '/', 
    name: 'home', 
    component: Home 
  },
  { 
    path: '/favorites', 
    name: 'favorites', 
    component: Favorites,
    beforeEnter: checkAuth,
  },
  { 
    path: '/orders', 
    name: 'orders', 
    component: Orders,
    beforeEnter: checkAuth
  },
  { 
    path: '/login', 
    name: 'login', 
    component: Auth 
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
