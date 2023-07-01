<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'

interface Iprops {
  searchConfig: {
    formItems: any[]
  }
}
const props = defineProps<Iprops>()

// 定义表单的数据
const initialValue: any = {}
for (let item of props.searchConfig.formItems) {
  initialValue[item.prop] = item.initialValue ?? ''
}
const searchFromData = reactive(initialValue)

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
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchFromData[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-else-if="item.type === 'date-picker'">
                <el-date-picker
                  v-model="searchFromData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select :placeholder="item.placeholder" style="width: 100%" v-model="searchFromData[item.prop]">
                  <template v-for="selectItem in item.options" :key="selectItem.value">
                    <el-option :label="selectItem.label" :value="selectItem.value" />
                  </template>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
      <div class="form-group"></div>
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
