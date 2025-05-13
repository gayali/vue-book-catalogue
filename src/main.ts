import './assets/main.css'
import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './js/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
