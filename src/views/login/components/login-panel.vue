<script setup lang="ts">
import { ref, watch } from 'vue'
import paneAccount from './pane-account.vue'
import panePhone from './pane-phone.vue'
import { SessionCache } from '@/utils/cache'

// 记住密码选中逻辑
const isRemPwd = ref<boolean>(SessionCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newValue) => {
  SessionCache.setCache('isRemPwd', newValue)
})

// 登录相关逻辑
const activeName = ref<string>('account')
const accountRef = ref<InstanceType<typeof paneAccount>>()

// 点击登录事件
const loginBtnClick = () => {
  accountRef.value?.loginAction(isRemPwd.value)
}
</script>

<template>
  <div class="login-panel">
    <div class="title">
      <h2>后台管理系统</h2>
    </div>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 账号登陆 -->
        <el-tab-pane name="account">
          <paneAccount ref="accountRef"></paneAccount>
          <template #label>
            <div class="label">
              <el-icon><User /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
        </el-tab-pane>
        <!-- 手机登录 -->
        <el-tab-pane name="phone">
          <panePhone></panePhone>
          <template #label>
            <el-icon><Iphone /></el-icon>
            <span class="text">手机登录</span>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="loginBtnClick">立即登录</el-button>
  </div>
</template>

<style scoped lang="less">
.login-panel {
  width: 330px;
  margin-bottom: 150px;
  .title {
    text-align: center;
    margin-bottom: 15px;
  }
  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }
  .login-btn {
    width: 100%;
  }
  .label {
    display: flex;
    align-items: center;
    .text {
      margin-left: 8px;
    }
  }
}
</style>
