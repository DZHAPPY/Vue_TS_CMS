import hyRequest from '@/service'

/** 用户的网络请求*/
export function postUsersListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}


export function deleteUserByID(id:number){
  return hyRequest.delete({
    url: `/users/${id}`
  })
}
