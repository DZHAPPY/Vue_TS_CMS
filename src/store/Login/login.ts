import { LOGIN_TOKEN, USERINFO, USERMENUS } from '@/global/constants'
import router from '@/router'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import { SessionCache } from '@/utils/cache'
import { defineStore } from 'pinia'
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

      // 跳转页面
      router.push('/main')
    }
  }
})

export default useLoginStore
