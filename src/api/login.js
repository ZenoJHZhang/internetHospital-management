import request from '@/utils/request'

export function loginByUsername(phone, password) {
  return request({
    url: '/user/login',
    method: 'get',
    params: {
      phone,
      password
    }
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      token
    }
  })
}
