import { postUsersListData } from '@/service/main/system/system'
import { defineStore } from 'pinia'

const useSystemStore = defineStore('system', {
  state: () => ({
    usersList: [],
    userstotalCount: 0
  }),
  actions: {
    async postUsersListAction() {
      const usersListResult = await postUsersListData()
      const { totalCount, list } = usersListResult.data
      this.usersList = list
      this.userstotalCount = totalCount
    }
  }
})

export default useSystemStore
