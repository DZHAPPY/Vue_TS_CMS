<script setup lang="ts">
import { ref } from 'vue'

// 1. 声明打开对话框的变量
const isShowDialog = ref(false)

// 2. 定义改变isShowDialog的方法
function setModalVisible() {
  isShowDialog.value = true
}

defineExpose({ setModalVisible })
</script>

<template>
  <el-dialog v-model="isShowDialog" title="新建用户" width="50%" center>
    <span> It should be noted that the content will not be aligned in center by default </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="isShowDialog = false">确认</el-button>
        <el-button type="primary" @click="isShowDialog = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="less"></style>
