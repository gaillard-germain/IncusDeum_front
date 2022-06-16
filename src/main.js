import { createApp } from 'vue'
import App from './App.vue'
import '../src/assets/css/main.scss'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSortAmountUp, faSortAmountDown } from '@fortawesome/free-solid-svg-icons'
import { faEye, faEdit, faTrashAlt, faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEye, faEdit, faTrashAlt, faSortAmountUp, faSortAmountDown, faPlusSquare)

// createApp(App).use(store).use(router).mount('#app')

const app = createApp(App)
app.use(store)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
