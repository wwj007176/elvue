<template>
  <div>
    <li v-for="item in items" :key="item.img">
      <router-link to="/menu3" target="_blank">{{item.title}}</router-link>
    </li>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        items: []
      }
    },
    created () {
      this.getHttpData('/api/goods', data => {
        if (data) {
          this.items = data
        }
      })
    }
  }
</script>

