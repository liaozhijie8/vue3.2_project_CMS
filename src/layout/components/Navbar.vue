<script setup lang="ts">
import { reactive, ref } from "vue";
import { userStore } from "@/stores";
import { ElNotification } from "element-plus";
import { validateNewPassword } from "@/utils/validate";
import Hamburger from "../../components/hamburger/index.vue";
import Breadcrumb from "../../components/breadcrumb/index.vue";
import LangSelect from "../../components/langSelect/index.vue";
import ThemeSelect from "../../components/themeSelect/index.vue";
import Screenfull from "../../components/screenfull/index.vue";
const user = userStore();

/* dropdown栏数据设置 */
let ava_url = ref(
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
);
/* 退出登录 */
const logoutClick = () => {
  user.logout("退出成功！");
};
/* 密码框设置 */
const dialogFormVisible = ref(false);
const formLabelWidth = "80px";
const form = reactive({
  originalPassword: "",
  newPassword: "",
  confirmPassword: "",
});
// 验证规则
const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入密码"));
  } else if (value !== form.newPassword) {
    return callback(new Error("密码不一致"));
  } else {
    return callback();
  }
};
const rules = reactive({
  originalPassword: [
    { trigger: "blur", message: "原始密码为必填", required: true },
  ],
  newPassword: [
    { validator: validateNewPassword, trigger: "blur", required: true },
  ],
  confirmPassword: [
    {
      validator: validateConfirmPassword,
      trigger: "blur",
      required: true,
    },
  ],
});
/* 修改密码 */
// 弹出密码框
const openChangePassword = () => {
  form.confirmPassword = "";
  form.newPassword = "";
  form.originalPassword = "";
  dialogFormVisible.value = true;
};
// 提交密码
const is_loading = ref(false);
const submitPassword = () => {
  const { originalPassword, newPassword, confirmPassword } = form;
  if (originalPassword && newPassword === confirmPassword) {
    is_loading.value = true;
    user
      .changepas("修改密码", { originalPassword, newPassword })
      .then(() => {
        is_loading.value = false;
        dialogFormVisible.value = false;
        user.logout("修改密码成功,请重新登录!");
      })
      .catch(() => {
        is_loading.value = false;
      });
  } else {
    ElNotification.error("请输入完整参数");
  }
};
</script>
<template>
  <div class="navbar">
    <!-- nav前半部分 -->
    <div class="left-navbar">
      <Hamburger class="hamburger"></Hamburger>
      <Breadcrumb></Breadcrumb>
    </div>
    <!-- nav后半部分 -->
    <div class="right-navbar">
      <Screenfull class="right-menu-item hover-effect"></Screenfull>
      <ThemeSelect></ThemeSelect>
      <LangSelect class="right-menu-item hover-effect"></LangSelect>
      <el-dropdown class="right-menu">
        <span class="el-dropdown-link">
          <el-avatar shape="square" :size="30" fit="cover" :src="ava_url" />
          <span>{{ user.userInfo.user_name }}</span>
          <el-icon class="el-icon--right">
            <Setting />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>{{ $t("msg.navBar.home") }}</el-dropdown-item>
            </router-link>
            <el-dropdown-item @click="openChangePassword"
              >修改密码</el-dropdown-item
            >
            <router-link to="#">
              <el-dropdown-item :disabled="!user.userInfo.is_admin"
                >管理员身份</el-dropdown-item
              >
            </router-link>
            <el-dropdown-item divided @click="logoutClick">{{
              $t("msg.navBar.logout")
            }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 修改密码框 -->
    <el-dialog v-model="dialogFormVisible" title="修改密码" width="30%">
      <el-form :model="form" :rules="rules">
        <el-form-item
          label="原始密码"
          :label-width="formLabelWidth"
          prop="originalPassword"
        >
          <el-input
            type="password"
            v-model="form.originalPassword"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="新的密码"
          :label-width="formLabelWidth"
          prop="newPassword"
        >
          <el-input
            type="password"
            v-model="form.newPassword"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="确认密码"
          :label-width="formLabelWidth"
          prop="confirmPassword"
        >
          <el-input
            type="password"
            v-model="form.confirmPassword"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            :loading="is_loading"
            @click="submitPassword"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped lang="scss">
.navbar {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  height: 50px;

  .left-navbar {
    display: flex;
    align-items: center;

    .hamburger {
      height: 100%;
      padding: 0 10px;
      cursor: pointer;
      transition: background 0.5;

      &:hover {
        background: rgba(221, 224, 225, 0.08);
      }
    }
  }

  .right-navbar {
    display: flex;
    align-items: center;

    .right-menu-item {
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;

      &.hover-effect {
        cursor: pointer;
      }
    }

    .right-menu {
      padding-right: 16px;

      .el-dropdown-link {
        cursor: pointer;
        color: var(--el-color-primary);
        display: flex;
        align-items: flex-end;

        span {
          padding-left: 5px;
        }
      }
    }
  }
}

/* 密码框样式 */
.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
