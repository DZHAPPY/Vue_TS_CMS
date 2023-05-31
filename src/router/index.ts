import { LOGIN_TOKEN } from '@/global/constants'
import { SessionCache } from '@/utils/cache'
import { createRouter, createWebHashHistory, routerKey } from 'vue-router'

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
})

export default router
