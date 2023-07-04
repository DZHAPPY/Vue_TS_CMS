<script setup lang="ts">
import { CountUp } from 'countup.js'
import { onMounted, ref } from 'vue'

interface IProps {
  amount?: string
  title?: string
  tips: string
  number1: number
  number2: number
  subtitle: string
}

const props = withDefaults(defineProps<IProps>(), {
  title: '默认标题',
  tips: '提交',
  number1: 10000,
  number2: 10000,
  subtitle: 'Tset'
})

// 创建CountUP实力对象
const count1Ref = ref<HTMLElement>()
const count2Ref = ref<HTMLElement>()

onMounted(() => {
  const countUp1 = new CountUp(count1Ref.value!, props.number1, {})
  const countUp2 = new CountUp(count2Ref.value!, props.number2, {})
  countUp1.start()
  countUp2.start()
})
</script>

<template>
  <div class="countcard">
    <div class="header">
      <div class="title">{{ title }}</div>
      <el-tooltip class="box-item" effect="light" :content="tips" placement="bottom">
        <el-icon><warning /></el-icon>
      </el-tooltip>
    </div>
    <div class="content">
      <span v-if="amount === 'saleroom'">￥</span>
      <div class="count" ref="count1Ref">{{ number1 }}</div>
    </div>
    <div class="footer">
      <span class="title">{{ subtitle }}</span>
      <span v-if="amount === 'saleroom'">￥</span>
      <span class="count" ref="count2Ref">{{ number2 }}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.countcard {
  display: flex;
  flex-direction: column;
  height: 130px;
  padding: 0 20px;
  background-color: #fff;
  letter-spacing: 1px;
  padding-top: 10px;

  .header {
    display: flex;
    justify-content: space-between;
    height: 38px;
    font-size: 13px;
    color: #aaaaaa;
  }

  .content {
    display: flex;
    font-size: 26px;
    flex: 1;
  }
  .footer {
    display: flex;
    align-items: center;
    border-top: 1px solid #e1e1e1;
    height: 38px;
    .title {
      margin-right: 5px;
    }
  }
}
</style>
