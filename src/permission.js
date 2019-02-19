import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getUserToken, getAccountToken } from '@/utils/auth' // 验权

const whiteList = ['/login', '/404'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  let roles
  NProgress.start()
  console.log('AccountToken', getAccountToken())
  console.log('UserToken', getUserToken())
  if (getUserToken()) {
    console.log('Usertoken 执行loginAccount')
    store.dispatch('LoginAccount')
      .then(() => {
        if (getAccountToken()) {
          if (to.path === '/login') {
            next({ path: '/' })
          } else {
            if (store.getters.roles.length === 0) {
              // store.dispatch('GetActivity')
              store.dispatch('GetInfo')
                .then(resolve => {
                  roles = resolve.data.user_account_role.role_code
                })
                .then(() => {
                  store.dispatch('GetMenu').then(resolve => {
                    store.dispatch('GenerateRoutes', { roles, resolve }).then(() => { // 生成可访问的路由表
                      router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
                      next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
                    })
                  })
                })
                .then(() => {
                  store.dispatch('GetUserAccountTypeList').then(() => {
                    next()
                  })
                })
                .catch(() => {
                  store.dispatch('FedLogOut').then(() => {
                    Message.error('验证失败,请重新登录')
                    next({ path: '/login' })
                  })
                })
            } else {
              next()
            }
          }
        } else {
          if (whiteList.indexOf(to.path) !== -1) {
            next()
          } else {
            next('/login')
            NProgress.done()
          }
        }
      })
      .catch(() => {
        console.log('UserToken 过期')
        window.location = store.state.user.home_url
      })
  } else {
    console.log('UserToken null')
    window.location = store.state.user.home_url
  }

})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
