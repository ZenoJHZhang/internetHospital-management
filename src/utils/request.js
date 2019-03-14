import axios from 'axios'
import {
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken,
  removeToken
} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    let token = getToken();
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = token;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      alert('错误测试')
      // 返回 401 
      if (error.response.status == 401) {
        //身份认证失败,清除token信息并跳转到登录页面
        if (error.response.data.returnData == 40101) {
          removeToken();
          store.state.errorTokenVisible = true;
          store.state.errorTokenMessage = error.response.data.returnType;
          router.push("/");
        }
        //权限不够，回退一步,token无需清除
        if (error.response.data.returnData == 40102) {
          router.push('401')
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
  }
)

export default service
