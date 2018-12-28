import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

//http request拦截器
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token');
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

//http response拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      // 返回 401 
      if (error.response.status == 401) {
        //身份认证失败,清除token信息并跳转到登录页面
        if (error.response.data.returnData == 40101) {
          store.commit('remove_token');
          store.state.errorTokenVisible = true;
          store.state.errorTokenMessage = error.response.data.returnType;
          router.push("/");
        }
        //权限不够，回退一步,token无需清除
        if (error.response.data.returnData == 40102) {
          store.state.errorTokenVisible = true;
          store.state.errorTokenMessage = error.response.data.returnType;
          router.go("-1");
        }
      } else if (error.response.status == 400) {
        store.state.errorTokenVisible = true;
        store.state.errorTokenMessage = error.response.data.returnType;
      } else {
        store.state.errorTokenVisible = true;
        store.state.errorTokenMessage = error.response.data.returnType;
      }
    } else {
      store.state.errorTokenVisible = true;
      store.state.errorTokenMessage = '服务器错误,请稍后再试';
    }
  });


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
