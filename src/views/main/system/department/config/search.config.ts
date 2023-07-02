const searchConfig = {
  formItems: [
    { type: 'input', prop: 'name', label: '部门名称', placeholder: '请输入部门名称', initialValue: '' },
    { type: 'input', prop: 'leader', label: '部门领导', placeholder: '请输入领导名称', initialValue: '' },
    { type: 'date-picker', prop: 'createAt', label: '创建时间', placeholder: '创建时间', initialValue: '' }
    // {
    //   type: 'select',
    //   prop: 'enable',
    //   label: '状态',
    //   placeholder: '选择状态',
    //   options: [
    //     { label: '启用', value: 1 },
    //     { label: '禁用', value: 0 }
    //   ]
    // }
  ]
}

export default searchConfig
