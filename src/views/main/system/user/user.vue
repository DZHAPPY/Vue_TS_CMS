<script setup lang="ts">
import { onMounted, ref } from 'vue'
import userContent from './components/user-content.vue'
import userSearch from './components/user-search.vue'
import userModal from './components/user-modal.vue'

// 对content组件进行操作
const contentRef = ref<InstanceType<typeof userContent>>()
function handleQueryClick(searchFromData: any) {
  // 在此处显示searchFromData的内容
  contentRef.value?.fetchUserListData(searchFromData)
}

function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

// 对modal组件进行操作
const modalRef = ref<InstanceType<typeof userModal>>()
function handleAdduserClick() {
  modalRef.value?.setModalVisible()
}

function handleEditbtnClick(itemData: any) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<template>
  <div class="user">
    <userSearch @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <userContent ref="contentRef" @addUserClick="handleAdduserClick" @editClick="handleEditbtnClick" />
    <userModal ref="modalRef" />
  </div>
</template>

<style scoped lang="less"></style>
