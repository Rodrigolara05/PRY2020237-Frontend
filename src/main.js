import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL='https://localhost:5001/'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
