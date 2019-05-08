import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/
export const constantRouterMap = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path*',
    component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () => import('@/views/login/authredirect'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/errorPage/404'),
  hidden: true
},
{
  path: '/401',
  component: () => import('@/views/errorPage/401'),
  hidden: true
},
{
  path: '',
  component: Layout,
  redirect: 'dashboard',
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    name: 'Dashboard',
    meta: {
      title: 'dashboard',
      icon: 'dashboard',
      noCache: true,
      affix: true
    }
  }]
}
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap,
  mode: 'history'
})

export const asyncRouterMap = [{
  path: '/deparmentManagement',
  component: Layout,
  meta: {
    roles: ['superAdmin', 'doctorAdmin']
  },
  children: [{
    component: () => import('@/views/department/index'),
    path: 'index',
    name: 'DeparmentManagement',
    meta: {
      title: 'deparmentManagement',
      roles: ['superAdmin', 'doctorAdmin'],
      icon: 'department'
    }
  }, {
    component: () => import('@/views/department/editDepartment'),
    path: 'editDepartment',
    name: 'EditDepartment',
    meta: {
      title: 'editDepartment',
      roles: ['superAdmin', 'doctorAdmin']
    },
    hidden: true
  },
  {
    component: () => import('@/views/department/insertDepartment'),
    path: 'insertDepartment',
    name: 'InsertDepartment',
    meta: {
      title: 'insertDepartment',
      roles: ['superAdmin', 'doctorAdmin']
    },
    hidden: true
  }
  ]
},
{
  path: '/doctorManagement',
  component: Layout,
  meta: {
    roles: ['superAdmin', 'doctorAdmin']
  },
  children: [{
    component: () => import('@/views/doctor/index'),
    path: 'index',
    name: 'DoctorManagement',
    meta: {
      title: 'doctorManagement',
      roles: ['superAdmin', 'doctorAdmin'],
      icon: 'doctor'
    }
  }, {
    component: () => import('@/views/doctor/editDoctor'),
    path: 'editDoctor',
    name: 'EditDoctor',
    meta: {
      title: 'editDoctor',
      roles: ['superAdmin', 'doctorAdmin']
    },
    hidden: true
  },
  {
    component: () => import('@/views/doctor/insertDoctor'),
    path: 'insertDoctor',
    name: 'InsertDoctor',
    meta: {
      title: 'insertDoctor',
      roles: ['superAdmin', 'doctorAdmin']
    },
    hidden: true
  }
  ]
},
{
  path: '/scheduleManagement',
  component: Layout,
  meta: {
    roles: ['superAdmin', 'doctorAdmin']
  },
  children: [{
    component: () => import('@/views/schedule/index'),
    path: 'index',
    name: 'ScheduleManagement',
    meta: {
      title: 'scheduleManagement',
      roles: ['superAdmin', 'doctorAdmin'],
      icon: '排班'
    }
  }, {
    component: () => import('@/views/schedule/normalDepartmentSchdule'),
    path: 'normalDepartmentSchdule',
    name: 'NormalDepartmentSchdule',
    meta: {
      title: 'normalDepartmentSchdule',
      roles: ['superAdmin', 'doctorAdmin']
    },
    hidden: true
  }, {
    component: () => import('@/views/schedule/expertDepartmentSchedule'),
    path: 'expertDepartmentSchedule',
    name: 'ExpertDepartmentSchedule',
    meta: {
      title: 'expertDepartmentSchedule',
      roles: ['superAdmin', 'doctorAdmin']
    },
    hidden: true
  }]
},
{
  path: '/reservationList',
  component: Layout,
  meta: {
    roles: ['superAdmin', 'doctor']
  },
  children: [{
    component: () => import('@/views/reservationList/index'),
    path: 'index',
    name: 'ReservationList',
    meta: {
      title: 'reservationList',
      roles: ['superAdmin', 'doctor'],
      icon: '申请列表'
    }
  },
  {
    component: () => import('@/views/reservationList/doctorClinic'),
    path: 'doctorClinic',
    name: 'DoctorClinic',
    meta: {
      title: 'doctorClinic',
      roles: ['superAdmin', 'doctor']
    },
    hidden: true
  },
  {
    component: () => import('@/views/reservationList/clinicResult'),
    path: 'clinicResult',
    name: 'ClinicResult',
    meta: {
      title: 'clinicResult',
      roles: ['superAdmin', 'doctor']
    },
    hidden: true
  },
  {
    component: () => import('@/views/reservationList/detail'),
    path: 'reservationDetail',
    name: 'ReservationDetail',
    meta: {
      title: 'reservationDetail',
      roles: ['superAdmin', 'doctor']
    },
    hidden: true
  }
  ]
},
{
  path: '/auditRecipe',
  component: Layout,
  meta: {
    roles: ['superAdmin', 'doctorAdmin']
  },
  children: [{
    component: () => import('@/views/auditRecipe/index'),
    path: 'index',
    name: 'AuditRecipe',
    meta: {
      title: 'auditRecipe',
      roles: ['superAdmin', 'doctorAdmin'],
      icon: '药方'
    }
  }]
},
{
  path: '/auditRefund',
  component: Layout,
  meta: {
    roles: ['superAdmin', 'doctorAdmin']
  },
  children: [{
    component: () => import('@/views/auditRefund/index'),
    path: 'index',
    name: 'AuditRefund',
    meta: {
      title: 'auditRefund',
      roles: ['superAdmin', 'doctorAdmin'],
      icon: '审核'
    }
  }]
},
{
  path: '*',
  redirect: '/404',
  hidden: true
}
]
