<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['flodChange'])
let isFlod = ref(false)

const handleMenuIconClick = () => {
  isFlod.value = !isFlod.value
  console.log(123)
  // 将事件和状态传递给父组件
  emit('flodChange', isFlod.value)
}
</script>

<template>
  <div class="menu-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="20px">
        <component :is="isFlod ? 'Fold' : 'Expand'" />
      </el-icon>
    </div>
    <div class="menu-content">
      <div class="breadcrumb">面包屑</div>
      <div class="info">
        <header-info></header-info>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.menu-header {
  height: 100%;
  display: flex;
  flex: 1;
  // justify-content: space-around;
  align-items: center;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .menu-content {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 18px;
  }
}
</style>
