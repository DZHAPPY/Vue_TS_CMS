<script setup lang="ts">
import pageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
</script>

<template>
  <div class="menu">
    <pageContent :content-config="contentConfig" />
  </div>
</template>

<style scoped lang="less"></style>
