<script setup lang="ts">
import router from '@/router'
import useLoginStore from '@/store/Login/login'

// 获取动态菜单的数据
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

const props = defineProps({
  isFlod: {
    type: Boolean,
    default: false
  }
})

const handleItemClick = (item: any) => {
  const url = item.url
  router.push(url)
}
</script>

<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/images/logo.svg" alt="" />
      <h3 class="title" v-show="isFlod">VUE-TS-CMS</h3>
    </div>
    <div class="menu">
      <el-menu
        default-active="3"
        text-color="#b7bdc3"
        background-color="#001529"
        :collapse="!props.isFlod"
        :collapse-transition="false"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('el-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleItemClick(subitem)">{{
                subitem.name
              }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style scoped lang="less">
.main-menu {
  height: 100%;
  background-color: var(--root-color);
  .logo {
    color: #fff;
    display: flex;
    height: 28px;
    justify-content: center;
    align-items: center;
    padding: 10px 0;

    .img {
      height: 100%;
      // margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      white-space: nowrap;
      margin-left: 15px;
    }
  }
}
</style>
