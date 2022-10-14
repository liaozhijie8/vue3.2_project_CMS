import { defineStore } from "pinia";
import { ref, computed } from "vue";
// import md5 from "md5";
import { changePassword, login, profile } from "@/api/user";
import { TOKEN } from "@/constant";
import { setItem, getItem, removeAllItem } from "@/utils/storage";
import router from "@/router";
import { ElMessage } from "element-plus";
import { setTimeStamp } from "@/utils/auth";
import type { ChangePassword } from "@/interface/user_interface";
// 类型接口

export const userStore = defineStore("user", () => {
  /* 登录模块 */
  const user_token = ref(getItem(TOKEN));
  function cleanToken() {
    user_token.value = "";
  }
  function login_set(content: any, userInfo: any) {
    const { user_name, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        user_name,
        password,
      })
        .then((res) => {
          const { token } = res.result;
          user_token.value = token;
          setItem(TOKEN, token);
          // 获取用户信息
          getProfile("登录时获取");
          // 保存登录时间
          setTimeStamp();
          router.push("/");
          ElMessage.success(`欢迎回来,${userInfo.user_name}`);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  /* 获取用户信息 */
  const userInfo = ref({});
  async function getProfile(content: any) {
    const { result } = await profile();
    userInfo.value = result;
  }
  const hasUserInfo = computed(() => {
    return JSON.stringify(userInfo.value) !== "{}";
  });
  /* 退出登录 */
  const logout = (content: string) => {
    removeAllItem();
    cleanToken();
    userInfo.value = "";
    // TODO: 清理权限
    router.push("/login");
    ElMessage.success(content);
  };
  /* 修改用户密码 */
  const changepas = async (content: any, palyload: ChangePassword) => {
    return await changePassword(palyload);
  };

  return {
    login_set,
    user_token,
    cleanToken,
    getProfile,
    userInfo,
    hasUserInfo,
    logout,
    changepas,
  };
});
