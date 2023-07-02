const modalConfig = {
  pageName: 'role',
  header: {
    addTitle: '新建角色',
    editTitle: '编辑角色'
  },
  formItems: [
    { type: 'input', label: '角色名称', prop: 'name', placeholder: '请输入角色名称' },
    { type: 'input', label: '角色描述', prop: 'intro', placeholder: '请输入部门领导' },
    { type: 'select', label: '上级部门', prop: 'parentID', options: [] }
  ]
}

export default modalConfig
