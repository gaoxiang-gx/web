import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
Vue.use(Router)
/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  }
  // {
  //   path: '*', hidden: true, component: _import('404'), name: '404',
  // }
]
export const asyncRouterMap = [
  {
    path: '/orders',
    component: Layout,
    name: 'ordersManagement',
    redirect: 'noredirect',
    meta: { title: '订单管理', icon: 'ordersManagement', role: ['administrator', 'support', 'supportManager', 'supportDirector', 'warehouse', 'clerk', 'supervisor'] },
    children: [
      {
        path: 'orders',
        name: 'ordersManage',
        component: _import('orders/orders'),
        meta: { title: '订单管理', icon: 'ordersManage', role: ['administrator', 'support', 'supportManager', 'supportDirector', 'warehouse', 'clerk', 'supervisor'] }
      }
    ]
  },
  {
    path: '/purchase',
    component: Layout,
    name: 'purchaseSellManagement',
    redirect: 'noredirect',
    meta: { title: '进销存管理', icon: 'purchaseSellManagement'},
    children: [
      {
        path: 'product_management',
        name: 'productManagement',
        component: _import('purchase/product_management'),
        meta: { title: '商品管理', icon: 'productManagement'}
      },
      {
        path: 'product_cost',
        name: 'productCost',
        component: _import('purchase/product_cost'),
        meta: { title: '商品成本', icon: 'productCost'}
      },
      {
        path: 'inventory_warning',
        name: 'inventoryWarning',
        component: _import('purchase/inventory_warning'),
        meta: { title: '商品库存预警', icon: 'warn'}
      },
      {
        path: 'inventory_statistics',
        name: 'inventoryStatistics',
        component: _import('purchase/inventory_statistics'),
        meta: { title: '商品出入库明细', icon: 'inventoryStatistics'}
      },
      {
        path: 'inventory_expend',
        name: 'inventoryExpend',
        component: _import('purchase/inventory_expend'),
        meta: { title: '商品日消耗查询', icon: 'data'}
      },
      {
        path: 'inventory_management',
        name: 'inventoryManagement',
        component: _import('purchase/inventory_management'),
        meta: { title: '盘库管理', icon: 'inventoryManagement' }
      },
      {
        path: '/purchase_management',
        name: 'purchaseManagement',
        redirect: 'noredirect',
        component: _import('purchase/purchase_management/index'),
        meta: { title: '订货管理', icon: 'purchaseManagement'},
        children: [
          {
            path: 'purchase_management',
            name: 'purchaseItemManagement',
            component: _import('purchase/purchase_management/purchase_management'),
            meta: { title: '订货条目管理' }
          },
          {
            path: 'purchase_in_storage',
            name: 'purchaseInStorage',
            component: _import('purchase/purchase_management/purchase_in_storage'),
            meta: { title: '订货入库管理' }
          }
        ]
      },
      {
        path: 'manual_Management',
        name: 'manual_Management',
        component: _import('purchase/manual_Management'),
        meta: { title: '人工出入库', icon: 'manual_Management' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: 'userManagement',
    redirect: 'noredirect',
    meta: { title: '用户管理', icon: 'MemberManagement' },
    children: [
      {
        path: 'user_group',
        name: 'userGroupManagement',
        component: _import('user/user_group'),
        meta: { title: '小组管理', icon: 'userGroupManagement' }
      },
      {
        path: 'user',
        name: 'userManage',
        component: _import('user/user'),
        meta: { title: '用户管理', icon: 'MemberManagement' }
      },
      {
        path: 'role',
        name: 'rolesManagement',
        component: _import('user/user_role'),
        meta: { title: '权限管理', icon: 'rolesManagement' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: 'systemManagement',
    redirect: 'noredirect',
    meta: { title: '系统管理', icon: 'systemManagement' },
    children: [
      {
        path: '/system/setting',
        name: 'systemSetting',
        redirect: 'noredirect',
        component: _import('system/setting/index'),
        meta: { title: '系统设置', icon: 'systemSetting' },
        children: [
          {
            path: 'deliver_address_setting',
            name: 'deliverAddressSetting',
            component: _import('system/setting/deliver_address_setting'),
            meta: { title: '发货仓库设置' }
          },
          {
            path: 'deliver_address_extre',
            name: 'deliverAddressExtre',
            component: _import('system/setting/deliver_address_extre'),
            meta: { title: '发货额外信息' }
          },
          {
            path: 'authMenu_setting',
            name: 'AuthMenuSetting',
            component: _import('system/setting/authMenu_setting'),
            meta: { title: '菜单设置' }
          },
          {
            path: 'auth_setting',
            name: 'AuthSetting',
            component: _import('system/setting/auth_setting'),
            meta: { title: '权限设置' }
          },
          {
            path: 'port_setting',
            name: 'PortSetting',
            component: _import('system/setting/port_setting'),
            meta: { title: 'API设置' }
          }
        ]
      },
      {
        path: 'system/product_goods_management',
        name: 'productGoodsManagement',
        component: _import('system/product/product_goods_management'),
        meta: { title: '产品管理', icon: 'productGoodsManagement' }
      },
      {
        path: 'system/address_management',
        name: 'addressManagement',
        component: _import('system/address/address_management'),
        meta: { title: '敏感地址管理', icon: 'addressManagement' }
      }
    ]
  },
  {
    path: '/user_center',
    component: Layout,
    name: 'userCenter',
    redirect: 'noredirect',
    meta: { title: '用户中心', icon: 'userCenter' },
    children: [
      {
        path: 'user_center/user_info',
        name: 'infoSetting',
        component: _import('user_center/user_info/user_info'),
        meta: { title: '个人信息设置', icon: 'infoSetting' }
      },
      {
        path: 'user_center/action_history',
        name: 'actionHistory',
        component: _import('user_center/action_history/action_history'),
        meta: { title: '操作记录', icon: 'form' }
      },
      {
        path: 'user_center/message_notification',
        name: 'messageNotification',
        component: _import('user_center/message_notification/message_notification'),
        meta: { title: '消息通知', icon: 'form' }
      },
      {
        path: 'user_center/integral_query',
        name: 'integralQuery',
        component: _import('user_center/integral_query/integral_query'),
        meta: { title: '积分查询', icon: 'integralQuery' }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

