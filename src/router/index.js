import Vue from 'vue'
import VueRouter from 'vue-router'

// 在VueCli 创建的项目中 @表示 src目录 它不受当前路径的影响
// const originalPush = VueRouter.prototype.push

// VueRouter.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/mian')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/classify',
    name: 'classify',
    component: () => import('@/views/classify')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/views/detail')
  },
  {
    path: '/userInfo',
    name: 'userInfo',
    component: () => import('@/views/user')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // const user = JSON.parse(window.localStorage.getItem('user'))

  // 检验登录页面的登陆状态
  if (to.path !== '/login') {
    next()
    // if (user) {
    // } else {
    //   next('/login')
    // }
  } else {
    // 登录页面 允许正常通过
    next()
  }
})

export default router
