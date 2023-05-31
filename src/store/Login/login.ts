import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import { accountLoginRequest, getUserInfoById } from '@/service/login/login'
import { SessionCache } from '@/utils/cache'
import { defineStore } from 'pinia'
const useLoginStore = defineStore('loginStore', {
  state: () => ({
    token: sessionStorage.getItem(LOGIN_TOKEN) ?? ''
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 登录获取token等相关信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      console.log(id);

      // const name = loginResult.data.name
      this.token = loginResult.data.token

      // 向sessionStorage中存入token
      // sessionStorage.setItem('token', loginResult.data.token)
      SessionCache.setCache(LOGIN_TOKEN, loginResult.data.token)

      //获取登录用户的信息
      const userInfoResult = await getUserInfoById(id)
      console.log('用户信息', userInfoResult)

      // 跳转页面
      router.push('/main')
    }
  }
})

export default useLoginStore
