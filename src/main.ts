import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

// Log the current URL
console.log('Development URL:', window.location.origin)
console.log('Full URL:', window.location.href)