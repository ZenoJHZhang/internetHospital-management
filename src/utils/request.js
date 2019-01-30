import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: 'http://localhost:8080', // api 的 base_url
  // baseURL: 'http://47.100.241.49:8080',
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
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
          router.push('401')
        }
      } else if (error.response.status == 400) {
        store.state.errorTokenVisible = true;
        store.state.errorTokenMessage = error.response.data.returnType;
      }else {
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
