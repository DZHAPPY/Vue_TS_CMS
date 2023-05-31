<script setup lang="ts"></script>

<template>
  <div class="pane-phone">
    <el-form label-width="60px" size="large">
      <el-form-item label="手机号">
        <el-input />
      </el-form-item>
      <el-form-item label="验证码">
        <div class="verify-code">
          <el-input />
          <el-button type="primary" class="code_btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.verify-code {
  display: flex;

  .code_btn {
    margin-left: 8px;
  }
}
</style>
