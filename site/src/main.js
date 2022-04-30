import Vue from 'vue'
import VueCompositionAPI, { createApp, h } from '@vue/composition-api'
import Notifications from 'vt-notifications'
import './index.css'
import VueTheMask from 'vue-the-mask'
import App from './App.vue'
import router from './router'

Vue.use(VueCompositionAPI)
Vue.use(VueTheMask)
Vue.use(Notifications)

const app = createApp({
  router,
  render: () => h(App)
})

app.mount('#app')
