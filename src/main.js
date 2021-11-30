import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap'
import vuetify from './plugins/vuetify'
import axios from 'axios';
import toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

Vue.config.productionTip = false

axios.defaults.baseURL = "https://localhost:44367/";

Vue.use(toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 5,
  newestOnTop: true
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
