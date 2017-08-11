// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'
// 默认主题
import 'element-ui/lib/theme-default/index.css'
import AjaxPlugin from '@/plugins/ajax'
import store from './vuex/index'
import common from './mixins/common'
import * as MType from './vuex/mutation-types'
import userService from './utils/user'
// 国际化
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

require('es6-promise').polyfill()

Vue.config.productionTip = false
Vue.use(VueI18n)
// Vue.use(ElementUI)
Vue.use(AjaxPlugin)
Vue.use(common)
const messages = {
  en: Object.assign(require('./local/en_us').default, enLocale),
  ja: Object.assign(require('./local/ja').default, enLocale),
  tw: Object.assign(require('./local/zh_tw').default, enLocale),
  zh: Object.assign(require('./local/zh_cn').default, zhLocale)
}
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'zh', // set locale
  fallbackLocale: 'zh',
  messages// set locale messages
})

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.vm._t(key, value)
})

sync(store, router)

let history = window.sessionStorage
// history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach((to, from, next) => {
  // 检查进入的页面是否需要登入
  if (to.meta.isLogin && userService.isLogin() === false) {
    next({path: '/'})
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  store.commit(MType.UPDATE_LOADING, true)
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  // start标题
  if (to.meta && to.meta.title) {
    store.commit(MType.UPDATE_SHOW_TITLE, to.meta.title)
  } else {
    store.commit(MType.UPDATE_SHOW_TITLE, '')
  }
  // end标题

  if (toIndex) {
    if (toIndex > fromIndex || !fromIndex || (toIndex === '0' && fromIndex === '0')) {
      store.commit(MType.UPDATE_DIRECTION, 'forward') // 向前
    } else {
      store.commit(MType.UPDATE_DIRECTION, 'reverse') // 回退
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit(MType.UPDATE_DIRECTION, 'forward')
  }
  if (/\/http/.test(to.path)) {
    console.log('***************' + to.path)
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(() => {
  store.commit('UPDATE_LOADING', false)
})

/* eslint-disable no-new */
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
