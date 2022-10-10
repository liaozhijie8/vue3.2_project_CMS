import { ref } from "vue";
import { defineStore } from "pinia";
// import md5 from "md5";
import { login } from "@/api/user";

export const useCounterStore = defineStore("counter", () => {
  const count = ref("kii");
  // const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value = "leon";
  }
  function change() {
    count.value = "libai";
  }
  function login_set(content: any, userInfo: any) {
    const { user_name, password } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        user_name,
        password,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  return { count, increment, login_set, change };
});
