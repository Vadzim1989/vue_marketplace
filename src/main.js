import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'

const pinia = createPinia() 
const app = createApp(App)

app.use(autoAnimatePlugin)
app.use(router)
app.use(pinia)
app.mount('#app')
