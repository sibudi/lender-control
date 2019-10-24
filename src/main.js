// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/id'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import VueRouter from 'vue-router'
import routes from './common/router';

import Config from './common/config';
import DataUtil from './common/dataUtil';

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(ElementUI, { locale });
Vue.config.productionTip = false;

//路由配置
const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  // let perMiss = DataUtil.getPermissionSet();  /*从localStorage中获取权限列表*/
  // if(perMiss.has(to.path)){       /*判断用户是否有该页面权限*/
  //   next()
  // }else{
  //   next({path:'/home'})        /*无权限跳转到 /home*/
  // }
  next()
});

//ajax公共配置
Vue.axios.defaults.baseURL = Config.host;
Vue.axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.axios.interceptors.request.use(config =>{
  config.data.sessionId = DataUtil.sid() || '222';
  //console.log(config);
  return config;
},error =>{});

Vue.axios.interceptors.response.use(response =>{
  //console.log(response);
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