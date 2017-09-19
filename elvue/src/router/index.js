import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      meta: {isLogin: false},
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      meta: {isLogin: false, title: '登入'},
      component: resolve => require(['@/views/login.vue'], resolve)
    },
    {
      path: '/home',
      name: 'home',
      meta: {isLogin: true, title: '主页'},
      component: resolve => require(['@/views/home.vue'], resolve),
      children: [
        {
          path: '/',
          name: 'menu',
          meta: {isLogin: true, title: '菜单1'},
          component: resolve => require(['@/views/menu.vue'], resolve)
        },
        {
          path: '/menu',
          name: 'menu',
          meta: {isLogin: true, title: '菜单1'},
          component: resolve => require(['@/views/menu.vue'], resolve)
        },
        {
          path: '/menu2',
          name: 'menu2',
          meta: {isLogin: true, title: '菜单2'},
          component: resolve => require(['@/views/menu.vue'], resolve)
        },
        {
          path: '/menu3',
          name: 'menu3',
          meta: {isLogin: true, title: '菜单3'},
          component: resolve => require(['@/views/menu.vue'], resolve)
        }
      ]
    }
  ]
})
