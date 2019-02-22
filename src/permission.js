import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getUserToken, getAccountToken } from '@/utils/auth' // 验权


const home_url = 'http://localhost:9528/#/dashboard' // 返回首页
const whiteList = ['/login', '/404'] // 不重定向白名单
/**
 * 获取用户信息、菜单路由
 */
function getUserInfo(to, from, next) {
  let roles
  // store.dispatch('GetActivity')
  store.dispatch('GetInfo')
    .then(resolve => {
      roles = resolve.data.user_account_role.role_code
    })
    .then(() => {
      store.dispatch('GetMenu').then(menuCode => {
        store.dispatch('GenerateRoutes', {roles, menuCode}).then(() => { // 生成可访问的路由表
          router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          next({...to, replace: true}) // hack方法 确保addRoutes已完成
        })
      })
    })
    .then(() => {
      store.dispatch('GetUserAccountTypeList').then(() => {
        next()
      })
    })
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log('UserToken', getUserToken())
  console.log('AccountToken', getAccountToken())
  /**
   * 系统独立登陆
   */
  if (to.path === '/login') {
    next()
    return false
  }
  if (getAccountToken()) {
    if (store.getters.roles.length === 0) {
      getUserInfo(to, from, next)
    }
    next()
    return false
  }
  if (!getAccountToken() && getUserToken()) {
    store.dispatch('LoginAccount').then(() => {
      if (store.getters.roles.length === 0) {
        getUserInfo(to, from, next)
      }
      next()
      return false
    })
  }
  if (!getAccountToken() && !getUserToken()) {
    window.location = home_url
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
