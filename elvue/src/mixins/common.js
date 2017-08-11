import * as MType from '../vuex/mutation-types'
export default Vue => {
  Vue.mixin({
    methods: {
      // 统一跳转方法
      base_go (url, isReplace) {
        if (url) {
          if (isReplace) {
            this.$router.replace({path: url})
          } else {
            this.$router.push({path: url})
          }
        }
      },
      // 统一回退方法
      base_goBack (isReplace) {
        let count = window.sessionStorage.getItem('count') || 0
        let url = window.sessionStorage.key(count) || '/' // 当前url
        let url1 = window.sessionStorage.key(count - 1) || '/' // 上次访问的url
        if (this.$route.path === url) { // 和当前URL一致
          if (isReplace) {
            this.$router.replace({path: url1})
          } else {
            this.$router.push({path: url1})
          }
        } else {
          if (isReplace) {
            this.$router.replace({path: url})
          } else {
            this.$router.push({path: url})
          }
        }
      },
      /**
       * http get 方式请求数据
       * @param {String} url 请求地址
       * @param {Function} callback 请求回调方放，
       * @param {Function} error(e) 异常回调方法
       * @param {Boolean} isLoading 加载状态
       */
      getHttpData (url, callback, error, isLoading) {
        isLoading = isLoading || true
        this.$store.commit(MType.UPDATE_LOADING, isLoading)
        callback = callback || function () {}
        this.$http.get(url).then(response => {
          this.$store.commit(MType.UPDATE_LOADING, false)
          let result = response.data
          if (result === undefined) {
            return callback(false)
          } else if (result.status !== '1' && result.status !== 1) {
            // 设置errorMsg
            this.$store.commit(MType.UPDATE_ERROR_MSG, result.msg)
            return callback(false, this.$store, result.msg)
          } else if (result.result) {
            return callback(result.result, this.$store, result.msg)
          } else {
            return callback(true, this.$store, result.msg)
          }
        }).catch(e => {
          this.$store.commit(MType.UPDATE_LOADING, false)
          if (error) {
            return error(e)
          } else {
            this.$store.commit(MType.UPDATE_ERROR_MSG, e.message)
            return false
          }
        })
      },
      postHttpData (url, params, header, callback, error, isLoading) {
        header = header || null
        isLoading = isLoading || true
        this.$store.commit(MType.UPDATE_LOADING, isLoading)
        let qs = require('qs')
        params = params || {}
        this.$http.post(url, qs.stringify(params), header).then(response => {
          this.$store.commit(MType.UPDATE_LOADING, false)
          let result = response.data
          if (result === undefined) {
            return callback(false)
          } else if (result.status !== '1' && result.status !== 1) {
            this.$store.commit(MType.UPDATE_ERROR_MSG, result.msg)
            return callback(false, this.$store, result.msg)
          } else if (result.result) {
            return callback(result.result, this.$store, result.msg)
          } else {
            return callback(true, this.$store, result.msg)
          }
        }).catch(e => {
          this.$store.commit(MType.UPDATE_LOADING, false)
          if (error) {
            return error(e)
          } else {
            this.$store.commit(MType.UPDATE_ERROR_MSG, e.message)
            return false
          }
        })
      },
      uploadHttpData (url, params, header, callback, error, isLoading) {
        isLoading = isLoading || true
        header = header || {'Content-Type': 'multipart/form-data'}
        params = params || new FormData()
        this.$store.commit(MType.UPDATE_LOADING, isLoading)
        this.$http.post(url, params, {
          method: 'post',
          headers: {'Content-Type': 'multipart/form-data'}
        }).then(response => {
          this.$store.commit(MType.UPDATE_LOADING, false)
          let result = response.data
          if (result.status !== '1' && result.status !== 1) {
            this.$store.commit(MType.UPDATE_ERROR_MSG, result.msg)
            callback && callback(false, this.$store, result.msg)
          } else if (result === undefined) {
            callback && callback(false, this.$store, result.msg)
          } else if (result.result) {
            callback && callback(result.result, this.$store, result.msg)
          } else {
            callback && callback(true, this.$store, result.msg)
          }
        }).catch(e => {
          this.$store.commit(MType.UPDATE_LOADING, false)
          if (error) {
            error(e)
          } else {
            this.$store.commit(MType.UPDATE_ERROR_MSG, e.message)
          }
        })
      }
    }
  })
}
