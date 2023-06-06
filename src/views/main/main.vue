<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import { SessionCache } from '@/utils/cache'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const exitClick = () => {
  SessionCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}

const isCollapse = ref(false)
const test123 = (isFlod: boolean) => {
  console.log(isFlod)
  isCollapse.value = isFlod
}
</script>

<template>
  <div class="main">
    <!-- <h1>main</h1>
    <button @click="exitClick">退出登录</button> -->

    <el-container class="main-content">
      <el-aside :width="isCollapse ? '210px' : '70px'">
        <MainMenu :is-flod="isCollapse"></MainMenu>
      </el-aside>
      <el-container>
        <el-header :height="'50px'">
          <MainHeader @flod-change="test123"></MainHeader>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.main {
  height: 100%;
  .main-content {
    height: 100%;

    .el-aside {
      height: 100%;
      background-color: palegoldenrod;
      -ms-overflow-style: none;
      transition: width 0.4s;
      &::-webkit-scrollbar {
        display: none;
      }
    }
    .el-header {
      background-color: #fff;
    }
    .el-main {
      background-color: salmon;
    }
  }
}
</style>
