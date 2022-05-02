import Vue from 'vue'
import App from './App.vue'
import VueTheMask from 'vue-the-mask'
import router from './router'
import store from './store'
import axios from "./service/axios";
import moment from 'moment'
import './assets/base.css'
Vue.prototype.$http = axios;
Vue.prototype.$moment = moment;
Vue.use(VueTheMask)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
