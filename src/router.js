import { createWebHashHistory, createRouter } from 'vue-router'

import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'
import Profile from './pages/Profile.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/favorites', name: 'favorites', component: Favorites },
  { path: '/profile', name: 'profile', component: Profile }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
