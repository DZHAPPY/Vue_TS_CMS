import { BASE_URL, TIME_OUT } from './config'
import HYRequest from './request'
import { SessionCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn(config) {
      const token = SessionCache.getCache(LOGIN_TOKEN)
      console.log(token)

      if (config.headers && token) {
        config.headers.Authorization = 'Bearer' + token
      }
      return config
    }
  }
})
console.log(import.meta.env.VITE_NAME)

export default hyRequest
