import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getUserToken, getAccountToken } from '@/utils/auth' // 验权
import { getUserPermissionMenu } from '@/api/login'


const whiteList = ['/login', '/404', '/select_account'] // 不重定向白名单
function mapRoutesName(routes) {
  const routersCodes = routes.map(route => {
    return route.menu_code
  })
  return routersCodes
}
/**
 * 获取用户信息、菜单路由
 */
function getUserInfo(to, from, next) {
  store.dispatch('GetUserAccountTypeList')
  store.dispatch('GetInfo')
    .then(() => getUserPermissionMenu())
    .then(res => {
      const code = mapRoutesName(res.data)
      store.dispatch('GenerateRoutes', code)
    })
    .then(() => {
      router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
      next({...to, replace: true}) // hack方法 确保addRoutes已完成
    })
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  /**
   * 系统独立登陆
   */
  if (whiteList.indexOf(to.path) !== -1) {
    next()
    return false
  }
  if (getAccountToken()) {
    if (store.getters.roles.length === 0) {
      getUserInfo(to, from, next)
    } else {
      next()
    }
    return false
  }
  if (!getAccountToken() && getUserToken()) {
    store.dispatch('LoginAccount').then(res => {
      if (res.data.length === 1) {
        return store.dispatch('LoginAccount', res.data[0].id)
      } else {
        next({ path: '/select_account' })
      }
    }).then(() => {
      if (store.getters.roles.length === 0) {
        getUserInfo(to, from, next)
      } else {
        next()
      }
    })
  }
  if (!getAccountToken() && !getUserToken() && process.env.NODE_ENV == "development") {
    next({ path: '/login'})
    return
  }
  if (!getAccountToken() && !getUserToken()) {
    window.location.href = process.env.HOME_URL
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
