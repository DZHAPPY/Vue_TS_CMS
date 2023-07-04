<script setup lang="ts">
import useAnalysisStore from '@/store/main/analysis/analysis'
import CountCard from './components/count-card.vue'
import { storeToRefs } from 'pinia'

// 发起数据请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDatAction()

// 拿到数据
const { amountList } = storeToRefs(analysisStore)
</script>

<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in amountList">
        <el-col :span="6">
          <CountCard v-bind="item" />
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<style scoped lang="less"></style>
