<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage, ElNotification } from 'element-plus'
import useLoginStore from '@/store/Login/login'

const [USERNAME, PASSWORD] = ['name', 'password']

const account = reactive({
  username: localStorage.getItem(USERNAME) ?? '',
  password: localStorage.getItem(PASSWORD) ?? ''
})

// 定义校验规则
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '请输入登录帐号', trigger: 'blur' },
    { min: 5, max: 20, message: '5-20位数字或者字母', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{5,20}$/, message: '5-20位数字或者字母', trigger: 'blur' }
  ]
})

// 账号的登录逻辑
const FormRef = ref<InstanceType<typeof ElForm>>()

const loginStore = useLoginStore()

function loginAction(isRemPwd: boolean) {
  // 获取用户输入的帐号与密码
  const { username: name, password } = account

  // 判断用户输入的帐号与密码是否符合规则
  FormRef.value?.validate((valid, fields) => {
    if (valid) {
      loginStore
        .loginAccountAction({ name, password })
        .then(() => {
          if (isRemPwd) {
            localStorage.setItem(USERNAME, name)
            localStorage.setItem(PASSWORD, password)
          } else {
            localStorage.removeItem(USERNAME)
            localStorage.removeItem(PASSWORD)
          }
          ElMessage({
            message: '登录成功',
            type: 'success'
          })
        })
        .catch(() => {
          ElMessage.error('用户名或密码错误')
        })
    } else {
      const errorMsg = fields!.password[0].message
      ElMessage({
        message: errorMsg,
        type: 'warning'
      })
    }
  })
  // console.log(FormRef.value)
}

defineExpose({
  loginAction
})
</script>

<template>
  <div class="pane-account">
    <el-form
      size="large"
      :model="account"
      :rules="rules"
      label-width="60px"
      status-icon
      ref="FormRef"
    >
      <el-form-item label="帐号" prop="username">
        <el-input v-model="account.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less"></style>
