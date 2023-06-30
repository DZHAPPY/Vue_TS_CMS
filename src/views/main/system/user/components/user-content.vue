<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'

const emits = defineEmits()
const currentPage = ref(1)
const pageSize = ref(10)

// 发起action，拿到数据
const systemStore = useSystemStore()
fetchUserListData()

// 获取usersList数据
const { usersList, userstotalCount } = storeToRefs(systemStore)

// 页码的相关逻辑
function handleSizeChange() {}
function handleCurrentChange() {
  fetchUserListData()
}

// 定义函数用于发送网络请求
function fetchUserListData(searchFromData: any = {}) {
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 2.发送网络请求获取users列表数据
  const queryInfo = { ...pageInfo, ...searchFromData }

  systemStore.postUsersListAction(queryInfo)
}

// 编辑和删除按钮的点击事件
function handleDeletebtnClick(id: number) {
  systemStore.deleteUserByIdAction(id)
}
function handleEditbtnClick(itemData: any) {
  emits('editClick', itemData)
}

// 新建用户的功能
function handleAdduserClick() {
  emits('addUserClick')
}

defineExpose({
  fetchUserListData
})
</script>

<template>
  <div class="content">
    <div class="header">
      <h3>用户列表</h3>
      <el-button type="primary" @click="handleAdduserClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table :data="usersList" border stripe>
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="序号" align="center" type="index" />
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
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <el-button icon="Edit" text size="small" type="primary" @click="handleEditbtnClick(scope.row)">编辑</el-button>
            <el-button icon="Delete" text size="small" type="danger" @click="handleDeletebtnClick(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userstotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.content {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
