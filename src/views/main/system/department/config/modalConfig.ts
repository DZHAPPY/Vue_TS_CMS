const modalConfig = {
  pageName: 'department',
  title: '部门',
  header: {
    addTitle: '新建部门',
    editTitle: '编辑部门'
  },
  formItems: [
    { type: 'input', label: '部门名称', prop: 'name', placeholder: '请输入部门名称' },
    { type: 'input', label: '部门领导', prop: 'leader', placeholder: '请输入部门领导' },
    { type: 'select', label: '上级部门', prop: 'parentID', options: [] }
  ]
}

export default modalConfig
