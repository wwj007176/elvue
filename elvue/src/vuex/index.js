import Vue from 'vue'
import Vuex from 'vuex'
import * as MType from './mutation-types'
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
let state = {
  // loading 状态
  isLoading: false,
  // 记录方向
  direction: 'forward',
  // 系统消息
  msg: '',
  // 错误消息
  errorMsg: '',
  // 滚动条距离顶部位置
  scrollTop: 0,
  showTitle: ''
}
// 同步
let mutations = {
  [MType.UPDATE_MSG] (state, msg) {
    state.msg = msg
  },
  [MType.UPDATE_ERROR_MSG] (state, msg) {
    state.errorMsg = msg
  },
  [MType.UPDATE_SCROLLTOP_POSITION] (state, payload) {
    state.scrollTop = payload.top
  },
  [MType.UPDATE_LOADING] (state, status) {
    state.isLoading = status
  },
  [MType.UPDATE_SHOW_TITLE] (state, title) {
    state.showTitle = title
  },
  [MType.UPDATE_DIRECTION] (state, direction) {
    state.direction = direction
  }
}
let actions = {
  updateScrollPosition ({commit}, top) {
    commit({
      type: MType.UPDATE_SCROLLTOP_POSITION,
      top: top
    })
  }
}
let getters = {
}

// let store = new Vuex.Store({
//   state: state,
//   getters: getters,
//   mutations: mutations,
//   actions: actions,
//   strict: debug
// })

// export {
//   store
// }
export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
  strict: debug
})
