<script setup lang="ts">
import { onMounted, ref } from 'vue'
import userContent from './components/user-content.vue'
import userSearch from './components/user-search.vue'
import userModal from './components/user-modal.vue'

// 对content组件进行操作
const contentRef = ref<InstanceType<typeof userContent>>()
function handleQueryClick(searchFromData: any) {
  console.log(123123, searchFromData)
  // 在此处显示searchFromData的内容

  contentRef.value?.fetchUserListData(searchFromData)
}

function handleResetClick() {
  contentRef.value?.fetchUserListData()
}

// 对modal组件进行操作
const modalRef = ref<InstanceType<typeof userModal>>()
function test() {
  console.log(modalRef)
  modalRef.value?.setModalVisible()
}
</script>

<template>
  <div class="user">
    <userSearch @query-click="handleQueryClick" @reset-click="handleResetClick" />
    <userContent ref="contentRef" @addUserClick="test" />
    <userModal ref="modalRef" />
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
