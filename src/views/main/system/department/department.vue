<script setup lang="ts">
import { ref } from 'vue'

import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modalConfig'
// 对content组件进行操作
const contentRef = ref<InstanceType<typeof pageContent>>()
function handleQueryClick(queryInfo: any) {
  console.log(queryInfo)

  // 在此处显示searchFromData的内容
  contentRef.value?.fetchPageListData(queryInfo)
}

function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

// 对modal组件进行操作
const modalRef = ref<InstanceType<typeof pageModal>>()
function handleAddPageClcik() {
  modalRef.value?.setModalVisible()
}

function handleEditbtnClick(itemData) {
  modalRef.value?.setModalVisible(false, itemData)
}
</script>

<template>
  <div class="department">
    <pageSearch :searchConfig="searchConfig" @queryClick="handleQueryClick" @resetClick="handleResetClick" />
    <pageContent ref="contentRef" :contentConfig="contentConfig" @addPageClick="handleAddPageClcik" @editClick="handleEditbtnClick" />
    <pageModal ref="modalRef" :modalConfig="modalConfig" />
  </div>
</template>

<style scoped lang="less">
.department {
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
