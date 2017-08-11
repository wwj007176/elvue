export default {
  isLogin: function () {
    if (window.sessionStorage.getItem('username')) {
      return true
    }
    return false
  },
  save: function (userinfo, accessToken, uuid) {
    userinfo && userinfo.username && window.sessionStorage.setItem('username', userinfo.username)
    accessToken && window.sessionStorage.setItem('accessToken', accessToken)
    uuid && window.sessionStorage.setItem('uuid', uuid)
  },
  loadUserInfo: function () {
    let accessToken = window.sessionStorage.getItem('accessToken')
    let uuid = window.sessionStorage.getItem('uuid')
    if (accessToken && uuid) {
      // 登入
    }
  }
}
