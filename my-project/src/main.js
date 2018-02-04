// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import App from './App.vue'

Vue.prototype.$http = axios
window.axios = axios;

Vue.use(Element, { size: 'small' })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})