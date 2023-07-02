<script setup lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import useMainStore from '@/store/main/main'
import { storeToRefs } from 'pinia'
import useSystemStore from '@/store/main/system/system'
import type { FormRules, ElForm } from 'element-plus'

interface Iprops {
  modalConfig: {
    pageName: string
    title: string
    header: {}
    formItems: any[]
  }
}

const props = defineProps<Iprops>()

const systemStore = useSystemStore()
const isNewRef = ref(true)
const editData = ref()
const modalTitle = ref('新建')

// 定义表单数据
const initialValue: any = {}
for (let item of props.modalConfig.formItems) {
  initialValue[item.prop] = item.initialValue ?? ''
}
const addFormData = reactive<any>(initialValue)

// 1. 声明打开对话框的变量
const isShowDialog = ref(false)

// 2. 定义改变isShowDialog的方法
function setModalVisible(isAddUser: boolean = true, itemData?: any) {
  console.log(itemData)

  if (itemData && !isAddUser) {
    modalTitle.value = '编辑'
    isNewRef.value = isAddUser
    editData.value = itemData
    for (let key in addFormData) {
      addFormData[key] = itemData[key]
    }
  }
  isShowDialog.value = true
}

// 3. 获取roles/departments列表的值

// 对modalConfig进行操作
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const { entireRoles, entireDepartments } = storeToRefs(mainStore)

  for (let item of props.modalConfig.formItems) {
    if (item.prop === 'parentID') {
      for (let optionsItem of entireDepartments.value) {
        item.options.push(optionsItem)
        console.log(optionsItem)
      }
    }
  }
  console.log(props.modalConfig.formItems)
  return props.modalConfig
})

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
    systemStore.addPageByUserInfo(props.modalConfig.pageName, addFormData)
  } else {
    isNewRef.value = true
    systemStore.editPageDataByID(props.modalConfig.pageName, editData.value.id, addFormData)
  }
}

// 5. 表单验证的规则
const rules = reactive<FormRules>({})

const formRef = ref<InstanceType<typeof ElForm>>()

defineExpose({ setModalVisible })
</script>

<template>
  <el-dialog v-model="isShowDialog" :title="modalTitle + props.modalConfig.title" width="30%" center>
    <el-form :model="addFormData" label-width="80px" size="large" :rules="rules" ref="formRef">
      <template v-for="item in modalConfigRef.formItems" :key="item.prop">
        <el-form-item :label="item.label" :prop="item.prop">
          <template v-if="item.type === 'input'">
            <el-input v-model="addFormData[item.prop]" :placeholder="item.placeholder" />
          </template>
          <template v-else-if="item.type === 'select'">
            <el-select v-model="addFormData[item.prop]" :placeholder="item.placeholder" style="width: 100%">
              <template v-for="optionsItem of item.options" :key="optionsItem.id">
                <el-option :value="optionsItem.id" :label="optionsItem.name" />
              </template>
            </el-select>
          </template>
        </el-form-item>
      </template>
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
