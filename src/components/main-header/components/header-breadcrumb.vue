<script setup lang="ts">
import { USERMENUS } from '@/global/constants'
import { SessionCache } from '@/utils/cache'
import { mapPathToBreadCrumbs } from '@/utils/map-menus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const userMenus = SessionCache.getCache(USERMENUS)
const route = useRoute()
const breadcrumbs = computed(() => {
  return mapPathToBreadCrumbs(route.path, userMenus)
})
</script>

<template>
  <el-breadcrumb separator-icon="CaretRight">
    <template v-for="item in breadcrumbs">
      <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<style scoped lang="less"></style>
