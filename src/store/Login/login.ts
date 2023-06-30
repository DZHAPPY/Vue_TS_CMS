import { LOGIN_TOKEN, USERINFO, USERMENUS } from '@/global/constants'
import router from '@/router'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import { SessionCache } from '@/utils/cache'
import { mapMenusToRouter } from '@/utils/map-menus'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import useMainStore from '../main/main'

const useLoginStore = defineStore('loginStore', {
  state: () => ({
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 登录获取token等相关信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      SessionCache.setCache(LOGIN_TOKEN, loginResult.data.token)

      // 获取登录用户的信息
      const userInfoResult = await getUserInfoById(id)
      this.userInfo = userInfoResult.data

      // 根据用户role的id获取该用户的权限(菜单menus)
      const UserRoleId = userInfoResult.data.role.id
      const userMenusResult = await getUserMenusByRoleId(UserRoleId)
      this.userMenus = userMenusResult.data

      // 进行本地缓存
      SessionCache.setCache(USERINFO, userInfoResult.data)
      SessionCache.setCache(USERMENUS, userMenusResult.data)

      // 请求roles/departments数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 动态添加路由
      const routes = mapMenusToRouter(this.userMenus)
      routes.forEach((item) => router.addRoute('main', item))

      // 跳转页面
      router.push('/main')
    },

    /**
     * 用户进行刷新时加载默认数据
     */
    loadLocalCacheAction() {
      const token = SessionCache.getCache(LOGIN_TOKEN)
      const userInfo = SessionCache.getCache(USERINFO)
      const userMenus = SessionCache.getCache(USERMENUS)
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 请求roles/departments数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 动态添加路由
        const routes = mapMenusToRouter(this.userMenus)
        routes.forEach((item) => router.addRoute('main', item))
      }
    }
  }
})

export default useLoginStore
