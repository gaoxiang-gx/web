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
  },
  {
    path: '/404', hidden: true, component: _import('404'), name: '404',
    meta: { title: '404', icon: 'form' }
  }
]
export const asyncRouterMap = [
  {
    path: '/domain',
    component: Layout,
    redirect: 'noredirect',
    name: 'websiteManagement',
    meta: { title: '网站管理', icon: 'websiteManagement', role: ['administrator', 'promotion', 'promotionManager', 'templateManager', 'promotionGroup', 'promotionDirector', 'promotiondataclerk'] },
    children: [
      {
        path: '/domain/domain',
        name: 'domainManagement',
        redirect: 'noredirect',
        component: _import('domain/domain/index'),
        meta: { title: '域名管理', icon: 'domainManagement', role: ['administrator', 'promotion', 'promotionManager', 'promotionGroup', 'promotionDirector', 'promotiondataclerk'] },
        children: [
          {
            path: 'domain',
            name: 'domain',
            component: _import('domain/domain/domain'),
            meta: { title: '根域名管理', role: ['administrator', 'promotion', 'promotionManager', 'promotionGroup', 'promotionDirector', 'promotiondataclerk'] }
          },
          {
            path: 'subdomain',
            name: 'subdomain',
            component: _import('domain/domain/subdomain'),
            meta: { title: '子域名管理', role: ['administrator', 'promotion', 'promotionManager', 'promotionGroup', 'promotionDirector', 'promotiondataclerk'] }
          }
        ]
      },
      {
        path: 'website/promotion_product',
        name: 'promotionWebsiteManagement',
        component: _import('domain/website/promotion_product'),
        meta: { title: '推广网站管理', icon: 'promotionWebsiteManagement', role: ['administrator', 'promotion', 'promotionManager', 'templateManager', 'promotionGroup', 'promotionDirector', 'promotiondataclerk'] }
      }
    ]
  },
  {
    path: '/promotion',
    component: Layout,
    name: 'promotionManagement',
    redirect: 'noredirect',
    meta: { title: '推广管理', icon: 'promotionManagement', role: ['administrator', 'promotion', 'promotionManager', 'templateManager', 'promotionGroup', 'promotionDirector', 'promotiondataclerk'] },
    children: [
      {
        path: '/promotion/promotion_channel',
        name: 'channelManagement',
        redirect: 'noredirect',
        component: _import('promotion/promotion_channel/index'),
        meta: { title: '渠道管理', icon: 'channelManagement', role: ['administrator', 'promotion', 'promotionManager', 'promotionGroup', 'promotionDirector', 'promotiondataclerk'] },
        children: [
          {
            path: 'promotion_channel',
            name: 'promotion_channel',
            component: _import('promotion/promotion_channel/promotion_channel'),
            meta: { title: '渠道管理', role: ['administrator', 'promotion', 'promotionManager', 'promotionDirector', 'promotiondataclerk'] }
          },
          {
            path: 'promotion_channel_account',
            name: 'promotion_channel_account',
            component: _import('promotion/promotion_channel/promotion_channel_account'),
            meta: { title: '账户管理', role: ['administration', 'promotion', 'promotionManager', 'promotionGroup', 'promotionDirector', 'promotiondataclerk'] }
          },
          {
            path: 'promotion_channel_account_recharge',
            name: 'promotion_channel_account_recharge',
            component: _import('promotion/promotion_channel/promotion_channel_account_recharge'),
            meta: { title: '账户充值记录', role: ['administrator', 'promotion', 'promotionManager', 'promotionGroup', 'promotionDirector', 'promotiondataclerk'] }
          },
          {
            path: 'promotion_channel_account_consumption',
            name: 'promotion_channel_account_consumption',
            component: _import('promotion/promotion_channel/promotion_channel_account_consumption'),
            meta: { title: '账户消费记录', role: ['administration', 'promotion', 'promotionManager', 'promotionGroup', 'promotionDirector', 'promotiondataclerk'] }
          },
          {
            path: 'promotion_channel_account_transfer',
            name: 'promotion_channel_account_transfer',
            component: _import('promotion/promotion_channel/promotion_channel_account_transfer'),
            meta: { title: '账户转账记录', role: ['administration', 'promotion', 'promotionManager', 'promotionGroup', 'promotionDirector', 'promotiondataclerk'] }
          },
          {
            path: 'promotion_channel_account_refund',
            name: 'promotion_channel_account_refund',
            component: _import('promotion/promotion_channel/promotion_channel_account_refund'),
            meta: { title: '账户退款记录', role: ['administration', 'promotion', 'promotionManager', 'promotionGroup', 'promotionDirector', 'promotiondataclerk'] }
          }
        ]
      },
      {
        path: '/promotion/promotion_member',
        name: 'promotionMemberManagement',
        redirect: 'noredirect',
        component: _import('promotion/promotion_member/index'),
        meta: { title: '人员管理', icon: 'MemberManagement', role: ['administrator', 'promotionManager', 'promotionDirector'] },
        children: [
          {
            path: 'promotion_group',
            name: 'promotionGroupManage',
            component: _import('promotion/promotion_member/promotion_group'),
            meta: { title: '推广分组管理', role: ['administrator', 'promotionManager', 'promotionDirector'] }
          },
          {
            path: 'promotion_member',
            name: 'promotionMemberManage',
            component: _import('promotion/promotion_member/promotion_member'),
            meta: { title: '推广人员管理', role: ['administrator', 'promotionManager', 'promotionDirector'] }
          }
        ]
      },
      {
        path: 'product_template',
        name: 'templateManagement',
        component: _import('promotion/product_template'),
        meta: { title: '模板管理', icon: 'templateManagement', role: ['administrator', 'promotionManager', 'templateManager', 'promotionGroup', 'promotion', 'promotionDirector'] }
      },
      {
        path: 'promotion_warning/promotion_warning',
        name: 'wxWarnManagement',
        component: _import('promotion/promotion_warning/promotion_warning'),
        meta: { title: '微信告警管理', icon: 'warn', role: ['administrator', 'promotion', 'promotionManager', 'promotionGroup', 'promotionDirector'] }
      },
      {
        path: 'promotion_copy',
        name: 'promotionCopy',
        component: _import('promotion/promotion_copy'),
        meta: { title: '推广复制记录', icon: 'promotionCopy', role: ['administrator', 'promotion', 'promotionManager', 'promotionGroup', 'promotionDirector', 'promotiondataclerk'] }
      },
      {
        path: '/promotion/promotion_statistics',
        name: 'promotionData',
        redirect: 'noredirect',
        component: _import('promotion/promotion_statistics/index'),
        meta: { title: '推广数据', icon: 'data', role: ['administrator', 'promotion', 'promotionManager', 'promotionGroup', 'promotionDirector', 'promotiondataclerk'] },
        children: [
          {
            path: 'promotion_orders',
            name: 'ordersData',
            component: _import('promotion/promotion_statistics/promotion_orders'),
            meta: { title: '客服订单数据', role: ['administrator', 'promotion', 'promotionManager', 'promotionGroup', 'promotionDirector'] }
          },
          {
            path: 'promotion_statistics',
            name: 'promotionReports',
            component: _import('promotion/promotion_statistics/promotion_statistics'),
            meta: { title: '推广统计报表', role: ['administrator', 'promotion', 'promotionManager', 'promotionGroup', 'promotionDirector', 'promotiondataclerk'] }
          }
        ]
      }
    ]
  },
  {
    path: '/support',
    component: Layout,
    name: 'customerManagement',
    redirect: 'noredirect',
    meta: { title: '客服管理', icon: 'customerManagement', role: ['administrator', 'support', 'supportManager', 'supervisor', 'supportDirector'] },
    children: [
      {
        path: '/support/support_member',
        name: 'personnelManagement',
        redirect: 'noredirect',
        component: _import('support/support_member/index'),
        meta: { title: '人员管理', icon: 'MemberManagement', role: ['administrator', 'supportManager', 'supportDirector'] },
        children: [
          {
            path: 'support_member_team',
            name: 'customerGroupManagement',
            component: _import('support/support_member/support_member_team'),
            meta: { title: '客服分组管理', role: ['administrator', 'supportManager', 'supportDirector'] }
          },
          {
            path: 'support_member',
            name: 'customerPersonnelManagement',
            component: _import('support/support_member/support_member'),
            meta: { title: '客服人员管理', role: ['administrator', 'supportManager', 'supportDirector'] }
          }
        ]
      },
      {
        path: '/support/support_rating',
        name: 'SalesRank',
        redirect: 'noredirect',
        component: _import('support/support_rating/index'),
        meta: { title: '销售排名', icon: 'SalesRank', role: ['administrator', 'support', 'supportManager', 'supportDirector'] },
        children: [
          {
            path: 'daily_rating',
            name: 'dailySalesRank',
            component: _import('support/support_rating/daily_rating'),
            meta: { title: '每日销售排名', role: ['administrator', 'support', 'supportManager', 'supportDirector'] }
          },
          {
            path: 'monthly_rating',
            name: 'monthlySalesRank',
            component: _import('support/support_rating/monthly_rating'),
            meta: { title: '每月销售排名', role: ['administrator', 'support', 'supportManager', 'supportDirector'] }
          },
          {
            path: 'achievement_rating',
            name: 'achievementRank',
            component: _import('support/support_rating/achievement_rating'),
            meta: { title: '实时业绩排名', role: ['administrator', 'support', 'supportManager', 'supportDirector'] }
          }
        ]
      },
      // {
      //   path: 'support_track',
      //   name: 'support_track',
      //   nullResult: _import('support/support_track'),
      //   meta: { title: '追访任务', icon: 'form', role: ['administrator', 'support', 'supportManager', 'supportDirector'] }
      // },
      {
        path: 'support/support_weixin_setting',
        name: 'addFanSetting',
        component: _import('support/support_weixin/support_weixin_setting'),
        meta: { title: '加粉设置', icon: 'addFanSetting', role: ['administrator', 'support', 'supportManager', 'supportDirector'] }
      },
      {
        path: 'support_portrayal',
        name: 'supportPortrayal',
        component: _import('support/support_portrayal'),
        meta: { title: '粉丝画像', icon: 'supportPortrayal', role: ['administrator', 'support', 'supportManager', 'supportDirector'] }
      },
      {
        path: 'support/support_setting',
        name: 'PassengerServiceScheduling',
        component: _import('support/support_setting/support_schedule'),
        meta: { title: '客服排班', icon: 'PassengerServiceScheduling', role: ['administrator', 'support', 'supportManager', 'supervisor', 'supportDirector'] }
      },
      {
        path: '/support/support_statistics',
        name: 'SupportStatisticsMain',
        redirect: 'noredirect',
        component: _import('support/support_statistics/index'),
        meta: { title: '客服数据统计', icon: 'data', role: ['administrator', 'support', 'supportManager', 'supportDirector'] },
        children: [
          {
            path: 'supportMemberStatistics',
            name: 'SupportMemberStatistics',
            component: _import('support/support_statistics/supportMemberStatistics'),
            meta: { title: '人员报表', role: ['administrator', 'support', 'supportManager', 'supportDirector'] }
          },
          {
            path: 'productStatistics',
            name: 'ProductStatistics',
            component: _import('support/support_statistics/productStatistics'),
            meta: { title: '产品报表', role: ['administrator', 'support', 'supportManager', 'supportDirector'] }
          },
          {
            path: 'channelStatistics',
            name: 'channelStatistics',
            component: _import('support/support_statistics/channelStatistics'),
            meta: { title: '渠道报表', role: ['administrator', 'support', 'supportManager', 'supportDirector'] }
          },
          {
            path: 'transformStatistics',
            name: 'transformStatistics',
            component: _import('support/support_statistics/transformStatistics'),
            meta: { title: '转化报表', role: ['administrator', 'support', 'supportManager', 'supportDirector'] }
          },
          {
            path: 'newFansRepurchaseStatistics',
            name: 'newFansRepurchaseStatistics',
            component: _import('support/support_statistics/newFansRepurchaseStatistics'),
            meta: { title: '复购报表', role: ['administrator', 'support', 'supportManager', 'supportDirector'] }
          },
          {
            path: 'frontSupportMemberStatistics',
            name: 'frontSupportMemberStatistics',
            component: _import('support/support_statistics/frontSupportMemberStatistics'),
            meta: { title: '前端报表', role: ['administrator', 'support', 'supportManager', 'supportDirector'] }
          },
          {
            path: 'backSupportMemberStatistics',
            name: 'backSupportMemberStatistics',
            component: _import('support/support_statistics/backSupportMemberStatistics'),
            meta: { title: '后端报表', role: ['administrator', 'support', 'supportManager', 'supportDirector'] }
          }
        ]
      }
    ]
  },
  {
    path: '/copywriteManagement',
    component: Layout,
    name: 'copywriteManagement',
    redirect: 'noredirect',
    meta: { title: '文案管理', icon: 'knowledge', role: ['administrator', 'clerk', 'supportDirector', 'supportManager'] },
    children: [
      {
        path: 'friendCircle',
        name: 'friendCircle',
        component: _import('copywriters/friendCircle'),
        meta: { title: '朋友圈', icon: 'friendCircle', role: ['administrator', 'clerk', 'supportDirector', 'supportManager'] }
      },
      {
        path: 'knowledge',
        name: 'knowledge',
        component: _import('support/knowledge'),
        meta: { title: '知识树', icon: 'channelManagement', role: ['administrator', 'supportManager', 'support', 'supportDirector'] }
      },
      {
        path: 'speech',
        name: 'speech',
        component: _import('copywriters/speech'),
        meta: { title: '话术', icon: 'speech', role: ['administrator', 'clerk'] }
      },
      {
        path: 'customer_feedback',
        name: 'customer_feedback',
        component: _import('copywriters/customer_feedback'),
        meta: { title: '客户反馈', icon: 'customer_feedback', role: ['administrator', 'clerk'] }
      },
      {
        path: 'article_knowledge',
        name: 'article_knowledge',
        component: _import('copywriters/article_knowledge'),
        meta: { title: '文章知识', icon: 'article_knowledge', role: ['administrator', 'clerk'] }
      },
      {
        path: 'copywriterManagement',
        name: 'copywriterManagement',
        component: _import('copywriters/copywriterManagement'),
        meta: { title: '文案人员管理', icon: 'MemberManagement', role: ['administrator', 'clerk'] }
      }]
  },
  {
    path: '/data',
    component: Layout,
    name: 'dataQuery',
    redirect: 'noredirect',
    meta: { title: '数据查询', icon: 'data', role: ['administrator', 'supportManager', 'promotionManager', 'promotion', 'supervisor', 'promotionGroup', 'promotionDirector', 'supportDirector', 'promotiondataclerk'] },
    children: [
      {
        path: 'support_member_unfilled',
        name: 'addFansData',
        component: _import('data/support_member_unfilled'),
        meta: { title: '客服加粉数据', icon: 'data', role: ['administrator', 'supportManager', 'promotionManager', 'promotion', 'supervisor', 'promotionGroup', 'promotionDirector', 'supportDirector', 'promotiondataclerk'] }
      },
      {
        path: 'add_fans_data_query',
        name: 'addFansDataQuery',
        component: _import('data/add_fans_data_query'),
        meta: { title: '加粉数据查询', icon: 'data', role: ['administrator', 'supportManager', 'promotionManager', 'promotion', 'promotionGroup', 'promotionDirector', 'supportDirector', 'promotiondataclerk'] }
      },
      {
        path: 'promotionChannelData',
        name: 'promotionChannelData',
        component: _import('data/promotionChannelData'),
        meta: { title: '推广渠道数据', icon: 'data', role: ['administrator', 'promotionManager', 'supportManager', 'promotionDirector', 'supportDirector'] }
      },
      {
        path: 'fans_portrayal_statistics',
        name: 'fansPortrayalStatistics',
        component: _import('data/fans_portrayal_statistics'),
        meta: { title: '粉丝画像报表', icon: 'data', role: [] }
      },
      {
        path: '/data/supportCostStatistics',
        name: 'supportFansCostStatistics',
        redirect: 'noredirect',
        component: _import('data/supportFansCost/index'),
        meta: { title: '客服成本', icon: 'data', role: ['administrator', 'promotionManager', 'promotionDirector'] },
        children: [
          {
            path: 'costStatistics',
            name: 'costStatistics',
            component: _import('data/supportFansCost/costStatistics'),
            meta: { title: '成本报表', role: ['administrator', 'promotionManager', 'promotionDirector'] }
          },
          {
            path: 'costStatisticsFans',
            name: 'costStatisticsFans',
            component: _import('data/supportFansCost/costStatisticsFans'),
            meta: { title: '加粉成本详细', role: ['administrator', 'promotionManager', 'promotionDirector'] }
          },
          {
            path: 'costStatisticsGoods',
            name: 'costStatisticsGoods',
            component: _import('data/supportFansCost/costStatisticsGoods'),
            meta: { title: '商品成本详细', role: ['administrator', 'promotionManager', 'promotionDirector'] }
          }
        ]
      }
    ]
  },
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
      },
      {
        path: 'ordersQuery',
        name: 'ordersQuery',
        component: _import('orders/ordersQuery'),
        meta: { title: '订单查询', icon: 'ordersQuery', role: ['administrator', 'support', 'supportManager', 'supportDirector', 'warehouse', 'clerk', 'supervisor'] }
      },
      {
        path: 'logistics',
        name: 'logisticsDynamics',
        component: _import('orders/logistics'),
        meta: { title: '物流动态', icon: 'logisticsDynamics', role: ['administrator', 'support', 'supportManager', 'supportDirector', 'warehouse', 'clerk'] }
      }
    ]
  },
  {
    path: '/purchase',
    component: Layout,
    name: 'purchaseSellManagement',
    redirect: 'noredirect',
    meta: { title: '进销存管理', icon: 'purchaseSellManagement', role: ['administrator', 'warehouse'] },
    children: [
      {
        path: 'product_management',
        name: 'productManagement',
        component: _import('purchase/product_management'),
        meta: { title: '商品管理', icon: 'productManagement', role: ['administrator', 'warehouse'] }
      },
      {
        path: 'product_cost',
        name: 'productCost',
        component: _import('purchase/product_cost'),
        meta: { title: '商品成本', icon: 'productCost', role: ['administrator'] }
      },
      {
        path: 'inventory_warning',
        name: 'inventoryWarning',
        component: _import('purchase/inventory_warning'),
        meta: { title: '商品库存预警', icon: 'warn', role: ['administrator', 'warehouse'] }
      },
      {
        path: 'inventory_statistics',
        name: 'inventoryStatistics',
        component: _import('purchase/inventory_statistics'),
        meta: { title: '商品出入库明细', icon: 'inventoryStatistics', role: ['administrator', 'warehouse'] }
      },
      {
        path: 'inventory_expend',
        name: 'inventoryExpend',
        component: _import('purchase/inventory_expend'),
        meta: { title: '商品日消耗查询', icon: 'data', role: ['administrator', 'warehouse'] }
      },
      {
        path: 'inventory_management',
        name: 'inventoryManagement',
        component: _import('purchase/inventory_management'),
        meta: { title: '盘库管理', icon: 'inventoryManagement', role: ['administrator', 'warehouse'] }
      },
      {
        path: '/purchase_management',
        name: 'purchaseManagement',
        redirect: 'noredirect',
        component: _import('purchase/purchase_management/index'),
        meta: { title: '订货管理', icon: 'purchaseManagement', role: ['administrator', 'warehouse'] },
        children: [
          {
            path: 'purchase_management',
            name: 'purchaseItemManagement',
            component: _import('purchase/purchase_management/purchase_management'),
            meta: { title: '订货条目管理', role: ['administrator', 'warehouse'] }
          },
          {
            path: 'purchase_in_storage',
            name: 'purchaseInStorage',
            component: _import('purchase/purchase_management/purchase_in_storage'),
            meta: { title: '订货入库管理', role: ['administrator', 'warehouse'] }
          }
        ]
      },
      {
        path: 'manual_Management',
        name: 'manual_Management',
        component: _import('purchase/manual_Management'),
        meta: { title: '人工出入库', icon: 'manual_Management', role: ['administrator', 'warehouse'] }
      }
    ]
  },
  {
    path: '/financial',
    component: Layout,
    name: 'financialManagement',
    redirect: 'noredirect',
    meta: { title: '财务管理', icon: 'financialManagement', role: ['administrator', 'supportManager', 'supportDirector'] },
    children: [
      {
        path: 'financial_weixin',
        name: 'wxFinancialManagement',
        component: _import('financial/financial_weixin'),
        meta: { title: '微信流水管理', icon: 'wxAccountManagement', role: ['administrator'] }
      },
      {
        path: 'financial_cash_on_delivery',
        name: 'cashOnDeliveryFinancialManagement',
        component: _import('financial/financial_cash_on_delivery'),
        meta: { title: '代收款流水管理', icon: 'cashOnDeliveryFinancialManagement', role: ['administrator'] }
      },
      {
        path: 'financial_transfer',
        name: 'financialTransfer',
        component: _import('financial/financial_transfer'),
        meta: { title: '转款凭证管理', icon: 'financialTransfer', role: ['administrator'] }
      },
      {
        path: 'financial_cash',
        name: 'financialCashManagement',
        component: _import('financial/financial_cash'),
        meta: { title: '提现管理', icon: 'financialCashManagement', role: ['administrator', 'supportManager', 'supportDirector'] }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    name: 'userManagement',
    redirect: 'noredirect',
    meta: { title: '用户管理', icon: 'MemberManagement', role: ['administrator'] },
    children: [
      // {
      //   path: 'user_department',
      //   name: 'userDepartment',
      //   component: _import('user/user_department'),
      //   meta: { title: '部门管理', icon: 'userDepartment', role: ['administrator'] }
      // },
      {
        path: 'user_group',
        name: 'userGroupManagement',
        component: _import('user/user_group'),
        meta: { title: '小组管理', icon: 'userGroupManagement', role: ['administrator'] }
      },
      {
        path: 'user',
        name: 'userManage',
        component: _import('user/user'),
        meta: { title: '用户管理', icon: 'MemberManagement', role: ['administrator'] }
      },
      {
        path: 'role',
        name: 'rolesManagement',
        component: _import('user/user_role'),
        meta: { title: '权限管理', icon: 'rolesManagement', role: ['administrator'] }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: 'systemManagement',
    redirect: 'noredirect',
    meta: { title: '系统管理', icon: 'systemManagement', role: ['administrator', 'supportDirector', 'promotionDirector'] },
    children: [
      {
        path: '/system/setting',
        name: 'systemSetting',
        redirect: 'noredirect',
        component: _import('system/setting/index'),
        meta: { title: '系统设置', icon: 'systemSetting', role: ['administrator'] },
        children: [
          // {
          //   path: 'global_setting',
          //   name: 'globalSetting',
          //   component: _import('system/setting/global_setting'),
          //   meta: { title: '全局变量设置', role: ['administrator'] }
          // },
          {
            path: 'deliver_address_setting',
            name: 'deliverAddressSetting',
            component: _import('system/setting/deliver_address_setting'),
            meta: { title: '发货仓库设置', role: ['administrator'] }
          },
          {
            path: 'deliver_address_extre',
            name: 'deliverAddressExtre',
            component: _import('system/setting/deliver_address_extre'),
            meta: { title: '发货额外信息', role: ['administrator'] }
          },
          {
            path: 'redis_setting',
            name: 'RedisSetting',
            component: _import('system/setting/redis_setting'),
            meta: { title: 'Redis设置', role: ['administrator'] }
          },
          {
            path: 'support_model_time_setting',
            name: 'supportModelTimeSetting',
            component: _import('system/setting/support_model_time_setting'),
            meta: { title: '转号日期设置', role: ['administrator'] }
          },
          {
            path: 'activity_setting',
            name: 'activitySetting',
            component: _import('system/setting/activity_setting'),
            meta: { title: '活动日期设置', role: ['administrator'] }
          },
          {
            path: 'authMenu_setting',
            name: 'AuthMenuSetting',
            component: _import('system/setting/authMenu_setting'),
            meta: { title: '菜单设置', role: ['administrator'] }
          },
          {
            path: 'auth_setting',
            name: 'AuthSetting',
            component: _import('system/setting/auth_setting'),
            meta: { title: '权限设置', role: ['administrator'] }
          },
          {
            path: 'port_setting',
            name: 'PortSetting',
            component: _import('system/setting/port_setting'),
            meta: { title: 'API设置', role: ['administrator'] }
          }
        ]
      },
      {
        path: '/system/tag',
        component: _import('system/setting/index'),
        name: 'tagManagement',
        redirect: 'noredirect',
        meta: { title: '标签管理', icon: 'tagManagement', role: ['administrator'] },
        children: [
          // {
          //   path: 'tract_tag',
          //   name: 'tractTag',
          //   component: _import('tag/tract_tag/tract_tag'),
          //   meta: { title: '追访标签管理', role: ['administrator'] }
          // },
          {
            path: 'system_tag',
            name: 'systemTag',
            component: _import('tag/system_tag/system_tag'),
            meta: { title: '标签管理', role: ['administrator'] }
          },
          {
            path: 'tag_type',
            name: 'tagType',
            component: _import('tag/tag_type/tag_type'),
            meta: { title: '标签类型管理', role: ['administrator'] }
          }
        ]
      },
      // {
      //   path: 'system/track_setting',
      //   name: 'track_setting',
      //   component: _import('system/tract/track_setting'),
      //   meta: { title: '追访计划', icon: 'form', role: ['administrator'] }
      // },
      {
        path: 'system/weixin',
        name: 'wxAccountManagement',
        component: _import('system/weixin/product_weixin'),
        meta: { title: '微信号管理', icon: 'wxAccountManagement', role: ['administrator', 'supportDirector', 'promotionDirector'] }
      },
      {
        path: 'system/protraitSetting',
        name: 'protraitSetting',
        component: _import('system/protrait/protraitSetting'),
        meta: { title: '粉丝画像管理', icon: 'supportPortrayal', role: ['administrator'] }
      },
      // {
      //   path: 'system/log_operation',
      //   name: 'logOperation',
      //   component: _import('system/logs/log_operation'),
      //   meta: { title: '日志查询', icon: 'form', role: ['administrator'] }
      // },
      {
        path: 'system/product_goods_management',
        name: 'productGoodsManagement',
        component: _import('system/product/product_goods_management'),
        meta: { title: '产品管理', icon: 'productGoodsManagement', role: ['administrator'] }
      },
      {
        path: 'system/address_management',
        name: 'addressManagement',
        component: _import('system/address/address_management'),
        meta: { title: '敏感地址管理', icon: 'addressManagement', role: ['administrator'] }
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

