<script setup lang="ts">
import { ref } from 'vue'

import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
// 对content组件进行操作
// const contentRef = ref<InstanceType<typeof userContent>>()
function handleQueryClick(searchFromData: any) {
  // 在此处显示searchFromData的内容
  // contentRef.value?.fetchUserListData(searchFromData)
}

function handleResetClick() {
  // contentRef.value?.fetchUserListData()
}
</script>

<template>
  <div class="department">
    <pageSearch :searchConfig="searchConfig" @queryClick="handleQueryClick" @resetClick="handleResetClick" />
    <pageContent :contentConfig="contentConfig" />
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
