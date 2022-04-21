import { createApp } from 'vue'
import App from './App.vue'
import '../src/assets/css/styles.scss'
import router from './router'

createApp(App).use(router).mount('#app')
