<template>
  <div class="header">
    <div class="logo">{{$t('title')}}</div>
    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
           <img class="user-logo" src="../../../static/img/img.jpg">
          {{username}}
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="loginout">{{$t('exit')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <div class="language">
      <el-dropdown trigger="click" @command="languageCommand">
        <span class="el-dropdown-link">
          {{languageStr}}<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="{locale: 'zh'}">{{$t('zh')}}</el-dropdown-item>
          <el-dropdown-item :command="{locale: 'ja'}">{{$t('ja')}}</el-dropdown-item>
          <el-dropdown-item :command="{locale: 'tw'}">{{$t('tw')}}</el-dropdown-item>
          <el-dropdown-item :command="{locale: 'en'}">{{$t('en')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        locale: 'zh',
        text: this.$t('zh')
      }
    },
    computed: {
      username () {
        let username = sessionStorage.getItem('username')
        return username || this.name
      },
      languageStr () {
        return this.text
      }
    },
    methods: {
      handleCommand (command) {
        if (command === 'loginout') {
          sessionStorage.removeItem('username')
          this.$router.push('/login')
        }
      },
      languageCommand (command) {
        this.locale = command.locale
      }
    },
    watch: {
      locale (val) {
        this.$i18n.locale = val
        if (val === 'zh') {
          this.text = this.$t('zh')
        } else if (val === 'tw') {
          this.text = this.$t('tw')
        } else if (val === 'ja') {
          this.text = this.$t('ja')
        } else if (val === 'en') {
          this.text = this.$t('en')
        }
      }
    }
  }
</script>

<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
  }
  .header .logo{
    float: left;
    width:250px;
    text-align: center;
  }
  .user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
  }
  .user-info .el-dropdown-link{
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }
  .user-info .user-logo{
    position: absolute;
    left:0;
    top:15px;
    width:40px;
    height:40px;
    border-radius: 50%;
  }
  .el-dropdown-menu__item{
    text-align: center;
  }

  .language {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
  }
  .language .el-dropdown-link{
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }
</style>
