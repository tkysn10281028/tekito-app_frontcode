import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios' //追記
import VueAxios from 'vue-axios'
import VModal from 'vue-js-modal'
import store from "./store";
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(VModal);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
