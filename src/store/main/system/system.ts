import {
  addPageData,
  addUserData,
  deletePageByID,
  deleteUserByID,
  editPageData,
  editUserData,
  postPageListData,
  postUsersListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'

const useSystemStore = defineStore('system', {
  state: () => ({
    usersList: [],
    userstotalCount: 0,
    pageList: [],
    pageTotalCount: 0
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
    },

    async addUserByUserInfo(userInfo: any) {
      // 1. 发起添加用户的请求
      const addResult = await addUserData(userInfo)

      if (addResult.code === 0) {
        ElMessage({
          message: '添加成功',
          type: 'success'
        })
      } else {
        ElMessage({
          message: '添加失败',
          type: 'error'
        })
      }
      // 2. 查询请求数据
      this.postUsersListAction({})
    },

    async editUserDataByID(id: number, userInfo: any) {
      const editResult = await editUserData(id, userInfo)
      if (editResult.code === 0) {
        ElMessage({
          message: '修改成功',
          type: 'success'
        })
      } else {
        ElMessage({
          message: '修改失败',
          type: 'error'
        })
      }
      // 查询请求数据
      this.postUsersListAction({})
    },

    // 针对页面的action
    async postPageListAction(pageName: string, queryInfo: any) {
      const PageListResult = await postPageListData(pageName, queryInfo)
      console.log(PageListResult)

      const { totalCount, list } = PageListResult.data
      this.pageList = list
      this.pageTotalCount = parseInt(totalCount)
    },

    async deletePageByIdAction(pageName: string, id: number) {
      // 1. 根据id删除相对应的数据
      const deleteResult = await deletePageByID(pageName, id)
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
      this.postPageListAction(pageName, {})
    },

    async addPageByUserInfo(pageName: string, userInfo: any) {
      // 1. 发起添加用户的请求
      const addResult = await addPageData(pageName, userInfo)

      if (addResult.code === 0) {
        ElMessage({
          message: '添加成功',
          type: 'success'
        })
      } else {
        ElMessage({
          message: '添加失败',
          type: 'error'
        })
      }
      // 2. 查询请求数据
      this.postPageListAction(pageName, {})
    },

    async editPageDataByID(pageName: string, id: number, userInfo: any) {
      const editResult = await editPageData(pageName, id, userInfo)
      if (editResult.code === 0) {
        ElMessage({
          message: '修改成功',
          type: 'success'
        })
      } else {
        ElMessage({
          message: '修改失败',
          type: 'error'
        })
      }
      // 查询请求数据
      this.postPageListAction(pageName, {})
    }
  }
})

export default useSystemStore
