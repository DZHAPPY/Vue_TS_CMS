<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'

// 发起action，拿到数据
const systemStore = useSystemStore()
systemStore.postUsersListAction()

// 获取usersList数据
const { usersList } = storeToRefs(systemStore)
</script>

<template>
  <div class="content">
    <div class="header">
      <h3>用户列表</h3>
      <el-button type="primary">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border>
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column prop="name" label="用户名" align="center" />
        <el-table-column prop="realname" label="真实姓名" align="center" />
        <el-table-column prop="cellphone" label="手机号码" align="center" />
        <el-table-column prop="enable" label="状态" align="center" width="90px">
          <template #default="scope">
            <el-button :type="scope.row.enable ? 'primary' : 'danger'" plain size="small">{{ scope.row.enable ? '启用' : '禁用' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="createAt" label="创建时间" align="center">
          <template #default="scope">{{ formatUTC(scope.row.createAt) }}</template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" align="center">
          <template #default="scope">{{ formatUTC(scope.row.updateAt) }}</template>
        </el-table-column>
        <el-table-column align="center">
          <el-button icon="Edit" text size="small" type="primary">编辑</el-button>
          <el-button icon="Delete" text size="small" type="danger">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination"></div>
  </div>
</template>

<style scoped lang="less">
.content {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
