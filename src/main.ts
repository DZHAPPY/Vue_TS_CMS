import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.less'
import 'normalize.css'
import router from './router'
import pinia from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import useLoginStore from './store/Login/login'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 1. 单独引入
// import 'element-plus/theme-chalk/el-message.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(pinia)
app.use(ElementPlus, {
  locale: zhCn
})
const loginStore = useLoginStore()
loginStore.loadLocalCacheAction()

app.use(router)

app.mount('#app')
