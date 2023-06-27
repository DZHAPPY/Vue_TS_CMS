<script setup lang="ts">
import userContentVue from './components/user-content.vue'
import userSearchVue from './components/user-search.vue'
</script>

<template>
  <div class="user">
    <div class="search">
      <userSearchVue></userSearchVue>
    </div>
    <div class="content">
      <userContentVue></userContentVue>
    </div>
  </div>
</template>

<style scoped lang="less">
.user {
  .search {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
  .content {
    background-color: #fff;
    margin-top: 20px;
    padding: 1px 20px;
    border-radius: 5px;
    margin-bottom: 30px;
  }
}
</style>
