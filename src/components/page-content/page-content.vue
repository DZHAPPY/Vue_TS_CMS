<script setup lang="ts">
import useSystemStore from '@/store/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format'
import { ref } from 'vue'

interface Iprops {
  contentConfig: {
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
  }
}

const props = defineProps<Iprops>()

const emits = defineEmits()
const currentPage = ref(1)
const pageSize = ref(10)

// 发起action，拿到数据
const systemStore = useSystemStore()
fetchUserListData()

// 获取pagesList数据
const { pageList, pageTotalCount } = storeToRefs(systemStore)

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

  systemStore.postPageListAction('department', queryInfo)
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
      <h3>{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" @click="handleAdduserClick">{{ contentConfig?.header?.btnTitle ?? '新建数据' }}</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border stripe>
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" :label="item.label">
              <template #default="scope">
                <el-button icon="Edit" text size="small" type="primary" @click="handleEditbtnClick(scope.row)">编辑</el-button>
                <el-button icon="Delete" text size="small" type="danger" @click="handleDeletebtnClick(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
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
