import hyRequest from '..'

// 登陆验证
export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

// 获取登录用户的信息
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: '/users/' + id.toString()
  })
}

// 获取用户的菜单Byid
export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
