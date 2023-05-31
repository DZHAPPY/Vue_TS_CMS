<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import { SessionCache } from '@/utils/cache'
import { useRouter } from 'vue-router'

const router = useRouter()
const exitClick = () => {
  SessionCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<template>
  <div class="main">
    <h1>main</h1>
    <button @click="exitClick">退出登录</button>
  </div>
</template>

<style scoped lang="less"></style>
