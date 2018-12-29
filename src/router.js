import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


Vue.use(Router)

//所有权限通用路由表 
//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Home,
    hidden: true
  },
]

export default new Router({
  mode: 'history',
  routes: constantRouterMap
})

export const asyncRouterMap = [{
  path: '/test',
  component: () => import('@/views/test'),
  name: '权限测试',
  meta: {
    role: ['admin', 'user']
  }
}];