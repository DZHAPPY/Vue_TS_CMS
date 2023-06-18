import type { RouteRecordRaw } from 'vue-router'

function locadLocalRoutes() {
  // 动态添加路由
  const localRoutes: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  for (let key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}

export let firstMenu: any = null
export function mapMenusToRouter(userMenus: any[]) {
  const localRoutes = locadLocalRoutes()
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      // console.log('test', submenu.url)

      const route = localRoutes.find((item) => item.path === submenu.url)

      if (route) {
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route.path })
        }
        routes.push(route)
      }
      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) {
        firstMenu = submenu
      }
    }
  }

  return routes
}

/**
 *
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 */
export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

export function mapPathToBreadCrumbs(path: string, userMenus: any[]) {
  // 1. 定义面包屑
  const breadcrumbs: any[] = []

  // 2. 便利获取面包屑层级
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }

  return breadcrumbs
}
