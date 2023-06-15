import { LOGIN_TOKEN, USERINFO, USERMENUS } from '@/global/constants'
import router from '@/router'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import { SessionCache } from '@/utils/cache'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'

const useLoginStore = defineStore('loginStore', {
  state: () => ({
    token: SessionCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: SessionCache.getCache(USERINFO) ?? {},
    userMenus: SessionCache.getCache(USERMENUS) ?? []
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

      // 动态添加路由
      const localRoutes: RouteRecordRaw[] = []
      const files: Record<string, any> = import.meta.glob('../../router/main/**/*.ts', {
        eager: true
      })
      for (let key in files) {
        const module = files[key]
        localRoutes.push(module.default)
      }

      for (const menu of this.userMenus) {
        for (const submenu of menu.children) {
          // console.log('test', submenu.url)

          const route = localRoutes.find((item) => item.path === submenu.url)
          if (route) {
            console.log(123, route)

            router.addRoute('main', route)
          }
        }
      }

      console.log(123, localRoutes)

      // 跳转页面
      router.push('/main')
    }
  }
})

export default useLoginStore
