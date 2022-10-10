<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance } from "element-plus";
import { Avatar, Lock } from "@element-plus/icons-vue";
import { validatePass } from "./rules"; //验证规则导入
import { userStore } from "@/stores/user";
const counter = userStore();
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  password: "",
  username: "",
});
/* 验证规则 */
const rules = reactive({
  username: [{ trigger: "blur", message: "用户名为必填项", required: true }],
  password: [{ validator: validatePass, trigger: "blur" }],
});
/* 提交按钮 */
const isLoading = ref(false);
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      isLoading.value = true;
      counter.login_set("user/login", {
        user_name: ruleForm.username,
        password: ruleForm.password,
      });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
/* 密码框显示处理 */
const passwordType = ref("password");
const changView = () => {
  if (passwordType.value === "password") {
    passwordType.value = "text";
  } else {
    passwordType.value = "password";
  }
};
</script>
<template>
  <div class="login-container">
    <el-form
      class="login-form"
      :model="ruleForm"
      scroll-to-error
      ref="ruleFormRef"
      :rules="rules"
    >
      <h3 class="title">用户登录</h3>
      <el-form-item prop="username">
        <el-input
          v-model="ruleForm.username"
          placeholder="username"
          size="large"
          :prefix-icon="Avatar"
          type="username"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          :type="passwordType"
          v-model="ruleForm.password"
          placeholder="password"
          size="large"
          :prefix-icon="Lock"
        >
          <template #suffix>
            <div @click="changView">
              <el-icon class="el-input__icon" v-if="passwordType === 'text'">
                <Hide />
              </el-icon>
              <el-icon class="el-input__icon" v-else>
                <View />
              </el-icon>
            </div>
          </template>
        </el-input>
      </el-form-item>
      <el-button
        type="primary"
        style="width: 100%"
        @click="submitForm(ruleFormRef)"
        :loading="isLoading"
        >登录</el-button
      >
    </el-form>
  </div>
</template>
<style scoped lang="less">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgb(54, 54, 54);
  color: rgb(231, 224, 224);

  .login-form {
    width: 400px;
    height: 200px;
    // border: 1px solid #000;
    text-align: center;

    .title {
      margin-bottom: 30px;
    }
  }
}
</style>
