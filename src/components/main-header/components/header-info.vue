<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import { SessionCache } from '@/utils/cache'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
// 退出按钮点击事件
const handleExitSysClick = () => {
  SessionCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
  // 推出消息通知
  ElNotification({
    title: '系统通知',
    message: '你已成功退出账号'
  })
}
</script>

<template>
  <div class="header-info">
    <div class="operation">
      <span>
        <el-icon><Message /></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><Bell /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>
    <div class="info">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar
            :size="30"
            src="https://img1.baidu.com/it/u=3548585884,556559510&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          />
          <span class="name">W1nTer</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitSysClick"
              ><el-icon><CircleClose /></el-icon><span>退出系统</span></el-dropdown-item
            >
            <el-dropdown-item divided
              ><el-icon><Avatar /></el-icon><span>个人信息</span></el-dropdown-item
            >
            <el-dropdown-item
              ><el-icon><Edit /></el-icon><span>修改密码</span></el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="less">
.header-info {
  display: flex;
  align-items: center;

  .operation {
    display: inline-flex;
    margin-right: 20px;

    span {
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 35px;

      &:hover {
        background: #f2f2f2;
      }

      i {
        font-size: 20px;
      }

      .dot {
        position: absolute;
        top: 3px;
        right: 3px;
        z-index: 10;
        width: 6px;
        height: 6px;
        background: red;
        border-radius: 100%;
      }
    }
  }
  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
