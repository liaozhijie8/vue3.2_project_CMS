import { defineStore } from "pinia";
import { ref, computed } from "vue";
// import md5 from "md5";
import { login, profile } from "@/api/user";
import { TOKEN } from "@/constant";
import { setItem, getItem } from "@/utils/storage";
import router from "@/router";
import { ElMessage } from "element-plus";

export const userStore = defineStore("user", () => {
  /* 登录模块 */
  const user_token = ref(getItem(TOKEN));
  function test() {
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
          ElMessage.success(res.message);
          const { token } = res.result;
          user_token.value = token;
          setItem(TOKEN, token);
          router.push("/");
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

  return { login_set, user_token, test, getProfile, userInfo, hasUserInfo };
});
