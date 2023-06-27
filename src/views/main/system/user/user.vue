<script setup lang="ts">
import userSearchVue from './components/user-search.vue'
</script>

<template>
  <div class="user">
    <div class="search">
      <userSearchVue></userSearchVue>
    </div>
    <div class="content"></div>
  </div>
</template>

<style scoped lang="less">
.user {
  .search {
    background-color: #fff;
    border-radius: 5px;
    padding: 20px;
  }
}
</style>
