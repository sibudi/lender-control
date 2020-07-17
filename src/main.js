// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/id'
import App from './App'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

/* css */
import 'element-ui/lib/theme-chalk/index.css';
import 'nprogress/nprogress.css'

import routes from './common/router';
// import Config from './common/config';
import DataUtil from './common/dataUtil';
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;

//Routing Configuration
const router = new VueRouter({
  routes
});

NProgress.configure({ showSpinner: false });

router.beforeEach((to, from, next) => {
  NProgress.start();
  let currentUrl = window.location.hash.split('#')[1].split('?')[0];
  let isHavePermission = DataUtil.getPermissionSet().has(currentUrl);
  if (!isHavePermission  && to.path !== '/unauthorized') {
    //Need to ignore the path to avoid infinite loop
    //ahalim1: Disable unauthorized for now
    next();
    //next('/unauthorized');
    //NProgress.done();
  }
  else {
    next();
  }
  // let perMiss = DataUtil.getPermissionSet();  /*Get permissions list from local storage*/
  // if(perMiss.has(to.path)){       /*Determine if user has access to the page*/
  //   next()
  // }else{
  //   next({path:'/home'})        /*Redirect to /home if doesn't have permission*/
  // }
  // next()
});

router.afterEach(transition => {
  NProgress.done();
});


//ajax Public configuration
Vue.axios.defaults.baseURL = process.env.API_URL;
Vue.axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.axios.interceptors.request.use(config =>{

  config.data.sessionId = DataUtil.sid()||'222' ;
  return config;
},error =>{});

Vue.axios.interceptors.response.use(response =>{
  if(response && response.data && response.data.code == -5){
    router.push('/login')
  }
  return response;
},error=>{});

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');



// WEBPACK FOOTER //
// ./src/main.js