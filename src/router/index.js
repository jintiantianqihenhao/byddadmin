import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Home from '@/components/home/Home'
import HomeMain from '@/components/home/HomeMain'


import Login from '@/components/login/Login'

import UserList from '@/components/user/UserList'

import PrintList from '@/components/print/PrintList'
import PrintList2 from '@/components/print/PrintList2'


import Works from '@/components/works/Works'

import MoneyLog from '@/components/money/MoneyLog'

Vue.use(Router)



const routes = [{
    path: '/index',
    redirect: '/index',
    component: Home,
      children: [
        //首页
        {
          path: '/index',
          component: HomeMain,
          meta: {
            title: "DIY-百鱼定制 | 手机壳定制系统 |在线定制系统 | 手机壳个性化定制 |手机壳定制生产"
          },
          redirect: '/userlist',
          children: [
            {
                path: '/userlist',
                component: UserList,
                meta: {
                  title: "DIY-百鱼定制 | 手机壳定制系统 |在线定制系统 | 手机壳个性化定制 |手机壳定制生产"
                }
            },
            {
              path: '/printList',
              component: PrintList,
              meta: {
                title: "DIY-百鱼定制 | 手机壳定制系统 |在线定制系统 | 手机壳个性化定制 |手机壳定制生产"
              }
            },
            {
              path: '/printList2',
              component: PrintList2,
              meta: {
                title: "DIY-百鱼定制 | 手机壳定制系统 |在线定制系统 | 手机壳个性化定制 |手机壳定制生产"
              }
            },
            {
              path: '/works',
              component: Works,
              meta: {
                title: "DIY-百鱼定制 | 手机壳定制系统 |在线定制系统 | 手机壳个性化定制 |手机壳定制生产"
              }
            },
            {
              path: '/moneyLog',
              component: MoneyLog,
              meta: {
                title: "DIY-百鱼定制 | 手机壳定制系统 |在线定制系统 | 手机壳个性化定制 |手机壳定制生产"
              }
            }
          ]
        },
      ]
    },
    // 测试
    {
        path: '/login',
        component: Login,
        meta: {
            title: "DIY-百鱼定制 | 手机壳定制系统 |在线定制系统 | 手机壳个性化定制 |手机壳定制生产"
        }
    },
    {
        path: '*',
        redirect: '/index'
    },
]

const router = new Router({
  // mode: 'history',
  base: '/manager/',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes
});
router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
  next();

});

export default router;
