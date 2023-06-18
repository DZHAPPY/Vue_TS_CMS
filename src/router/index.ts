import { LOGIN_TOKEN } from '@/global/constants'
import { SessionCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      name: 'main',
      path: '/main',
      component: () => import('../views/main/main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: () => import('../views/404/404.vue')
    }
  ]
})

// 导航守卫
router.beforeEach((to, from) => {
  const token = SessionCache.getCache(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    console.log('未找到token')
    return '/login'
  }

  // 如果进入到main页面
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
