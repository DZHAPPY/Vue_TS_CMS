import { createApp } from 'vue'
import App from './App.vue'
import './assets/css/index.less'
import 'normalize.css'
import router from './router'
import pinia from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 1. 单独引入
// import 'element-plus/theme-chalk/el-message.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router)
app.use(pinia)
app.mount('#app')
