<script setup lang="ts">
import loginPanelVue from './components/login-panel.vue'
import * as THREE from 'three'
import BIRDS from 'vanta/src/vanta.globe'
import { onMounted, ref } from 'vue'
const Area = ref(null)
let vantaEffect = null
onMounted(() => {
  vantaEffect = BIRDS({
    el: Area.value,
    THREE: THREE,
    //如果需要改变样式，要写在这里
    //因为这里vantaEffect是没有setOptions这个方法的
    color: 0x2828f2,
    backgroundColor: 0xffffff,
    vertexColors: '123'
  })
})
</script>

<template>
  <div class="login" ref="Area">
    <loginPanelVue></loginPanelVue>
  </div>
</template>

<style scoped lang="less">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  // background-color: red;
  // background-image: url('@/assets/images/login-bg.svg');

  // background-color: #fff;
}
</style>
