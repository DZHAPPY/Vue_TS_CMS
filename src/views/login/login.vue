<script setup lang="ts">
import loginPanelVue from './components/login-panel.vue'
</script>

<template>
  <div class="login">
    <loginPanelVue></loginPanelVue>
  </div>
</template>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  // background-color: red;
  background-image: url('@/assets/images/login-bg.svg');
}
</style>
