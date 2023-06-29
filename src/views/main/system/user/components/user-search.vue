<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

// 搜索表单的数据
const searchFromData = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAT: ''
})

// 自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

// 重置按钮的方法
const formRef = ref<InstanceType<typeof ElForm>>()
const handleResetClick = () => {
  formRef.value?.resetFields()

  emit('resetClick')
}

// 查询按钮的方法
const handleQueryClick = () => {
  // console.log(searchFromData)
  emit('queryClick', searchFromData)
}
</script>

<template>
  <div class="user-search">
    <el-form size="large" label-width="80px" :model="searchFromData" ref="formRef">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="用户名" prop="name"> <el-input v-model="searchFromData.name" placeholder="请输入用户名" /> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname"> <el-input placeholder="请输入姓名" v-model="searchFromData.realname" /> </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone"> <el-input placeholder="请输入手机号码" v-model="searchFromData.cellphone" /> </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="状态" prop="state">
            <el-select placeholder="请输入查询的状态" style="width: 100%" v-model="searchFromData.enable">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAT">
            <el-date-picker v-model="searchFromData.createAT" type="daterange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="btns">
        <el-button type="primary" plain icon="Refresh" size="default" @click="handleResetClick">重置</el-button>
        <el-button type="primary" icon="Search" size="default" @click="handleQueryClick">查询</el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.user-search {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  .el-form-item {
    padding: 10px;
  }

  .btns {
    text-align: right;
  }
}
</style>
