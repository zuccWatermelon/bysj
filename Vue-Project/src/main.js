// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/js/jquery.min'
import './assets/css/bootstrap.css'
// import './assets/css/bootstrap-theme.css'
import './assets/js/bootstrap'

// import './assets/fonts/ecm_icomoon.woff';
// import './assets/fonts/homeIcomoon.woff';
// import './assets/css/combined-business.min.css';
// import './assets/css/icomoon.css';


//element-ui相关样式以及组件
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"

import axios from 'axios'
import '../config/config'

Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.prototype.axios = axios //组件调用this.axios.get(...)
// Vue.prototype.$ajax = axios  //换个名字 组件调用this.$ajax.get(...)
window.axios = axios;  //组件中调用 axios.get(...)

router.beforeEach((to, from, next) => {
  var loginBool = window.sessionStorage && window.sessionStorage.getItem('login')=='true';
  if (to.meta.requireLogin) {  // 判断该路由是否需要登录权限
    if (loginBool) {
      next();
    }
    else {
      next({
        path: '/',
      })
    }
  }
  else {
    next();
  }
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
