import { deleteUserByID, postUsersListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

const useSystemStore = defineStore('system', {
  state: () => ({
    usersList: [],
    userstotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryInfo: any) {
      const usersListResult = await postUsersListData(queryInfo)
      const { totalCount, list } = usersListResult.data
      this.usersList = list
      this.userstotalCount = totalCount
    },

    async deleteUserByIdAction(id: number) {
      // 1. 根据id删除相对应的数据
      const deleteResult = await deleteUserByID(id)
      if (deleteResult.code === 0) {
        ElMessage({
          message: '删除成功',
          type: 'success'
        })
      } else {
        ElMessage({
          message: '删除失败',
          type: 'error'
        })
      }

      // 2. 查询请求数据
      this.postUsersListAction({})
    }
  }
})

export default useSystemStore
