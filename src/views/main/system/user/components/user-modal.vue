<script setup lang="ts">
import { reactive, ref } from 'vue'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import type { FormRules, ElForm } from 'element-plus'

const systemStore = useSystemStore()
const isNewRef = ref(true)
const editData = ref()
// 定义表单数据
const addFormData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

// 1. 声明打开对话框的变量
const isShowDialog = ref(false)

// 2. 定义改变isShowDialog的方法
function setModalVisible(isAddUser: boolean = true, itemData?: any) {
  console.log(itemData)

  if (itemData && !isAddUser) {
    isNewRef.value = isAddUser
    editData.value = itemData
    for (let key in addFormData) {
      addFormData[key] = itemData[key]
    }
  }
  isShowDialog.value = true
}

// 3. 获取roles/departments列表的值
const mainStore = useMainStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)

// 4. 新建用户按钮点击事件
function handleConfirmClick() {
  // formRef.value?.validate((valid) => {
  //   console.log(valid)
  //   // 检查是否全部填写完整
  //   const isFormFilled = Object.keys(addFormData).every((key) => addFormData[key] !== '')
  //   if (isFormFilled) {
  //     console.log('表单项都填写完整')
  //   } else {
  //     console.log('表单项未填写完整')
  //   }
  // })
  isShowDialog.value = false

  // 1.若在新建用户页面点击确认
  if (isNewRef.value) {
    systemStore.addUserByUserInfo(addFormData)
  } else {
    isNewRef.value = true
    systemStore.editUserDataByID(editData.value.id, addFormData)
  }
}

// 5. 表单验证的规则
const rules = reactive<FormRules>({
  name: [{ required: true }],
  realname: [{ required: true }],
  password: [{ required: true }],
  cellphone: [{ required: true }],
  roleId: [{ required: true }],
  departmentId: [{ required: true }]
})

const formRef = ref<InstanceType<typeof ElForm>>()

defineExpose({ setModalVisible })
</script>

<template>
  <el-dialog v-model="isShowDialog" title="新建用户" width="30%" center>
    <el-form :model="addFormData" label-width="80px" size="large" :rules="rules" ref="formRef">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="addFormData.name" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="realname">
        <el-input v-model="addFormData.realname" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-show="isNewRef">
        <el-input v-model="addFormData.password" placeholder="请输入密码" :show-password="true"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="cellphone">
        <el-input v-model="addFormData.cellphone" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item label="选择角色" prop="roleId">
        <el-select v-model="addFormData.roleId" style="width: 100%">
          <template v-for="item in entireRoles" :key="item.id">
            <el-option :label="item.name" :value="item.id" />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item label="选择部门" prop="departmentId">
        <el-select v-model="addFormData.departmentId" style="width: 100%">
          <template v-for="item in entireDepartments" :key="item.id">
            <el-option :label="item.name" :value="item.id" />
          </template>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleConfirmClick">确认</el-button>
        <el-button type="primary" @click="isShowDialog = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="less"></style>
