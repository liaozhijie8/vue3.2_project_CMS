import { defineStore } from "pinia";
import { ref, computed } from "vue";
import md5 from "md5";
import {
  changePassword,
  login,
  profile,
  getUserlist,
  removeUser,
  restoreUser,
} from "@/api/user";
import { TOKEN } from "@/constant";
import { setItem, getItem, removeAllItem } from "@/utils/storage";
import router from "@/router";
import { ElMessage } from "element-plus";
import { setTimeStamp } from "@/utils/auth";
import type { ChangePassword, Login } from "@/interface/user_interface";
import { resetRouter } from "@/router";
import { permissionStore } from "./permission";
// 类型接口
export const userStore = defineStore("user", () => {
  /* 登录模块 */
  const user_token = ref(getItem(TOKEN));
  // 清空token
  function cleanToken() {
    user_token.value = "";
  }
  function login_set(palyload: Login) {
    const { user_name, password } = palyload;
    return new Promise((resolve, reject) => {
      login({
        user_name,
        password: md5(password),
      })
        .then((res) => {
          const { token } = res.result;
          user_token.value = token;
          setItem(TOKEN, token);
          // 获取用户信息
          getProfile();
          // 保存登录时间
          setTimeStamp();
          router.push("/");
          ElMessage.success(`欢迎回来,${user_name}`);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  /* 获取用户信息 */
  const userInfo = ref({});
  async function getProfile() {
    return new Promise((resolve, reject) => {
      profile()
        .then((res) => {
          const { result } = res;
          userInfo.value = result;
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  const hasUserInfo = computed(() => {
    return JSON.stringify(userInfo.value) !== "{}";
  });
  /* 退出登录 */
  const logout = (content: string) => {
    const permission = permissionStore();
    resetRouter();
    permission.removeUserPermissionName();
    removeAllItem();
    cleanToken();
    userInfo.value = {};
    // TODO: 清理权限
    router.push("/login");

    ElMessage.success(content);
  };
  /* 修改用户密码 */
  const changepas = async (palyload: ChangePassword) => {
    const { newPassword, originalPassword } = palyload;
    return await changePassword({
      newPassword: md5(newPassword),
      originalPassword: md5(originalPassword),
    });
  };
  /* 获取用户列表 */
  const userList = ref({});
  const userCount = ref();
  const pageNum = ref();
  const pageSize = ref();
  async function getUser_list(palyload: number) {
    const { result } = await getUserlist({ pageNum: palyload, pageSize: 10 });
    userList.value = result.list;
    userCount.value = result.total;
    pageNum.value = result.pageNum;
    pageSize.value = result.pageSize;
  }
  const hasUserlist = computed(() => {
    return JSON.stringify(userList.value) !== "{}";
  });
  /* 删除用户 */
  function remove_user(palyload: number) {
    return new Promise((resolve, rejects) => {
      removeUser(palyload)
        .then((res) => {
          getUser_list(pageNum.value);
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }
  /* 恢复用户 */
  function restore_user(palyload: number) {
    return new Promise((resolve, rejects) => {
      restoreUser(palyload)
        .then((res) => {
          getUser_list(pageNum.value);
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }

  return {
    login_set,
    user_token,
    cleanToken,
    getProfile,
    userInfo,
    hasUserInfo,
    logout,
    changepas,
    getUser_list,
    hasUserlist,
    userList,
    userCount,
    pageNum,
    pageSize,
    remove_user,
    restore_user,
  };
});
