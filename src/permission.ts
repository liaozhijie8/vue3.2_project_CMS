import router from "@/router";
import { userStore, store } from "./stores";

const user = userStore(store);
/* 白名单 */
const whiteList = ["/login"];
router.beforeEach(async (to, from, next) => {
  //用户已登录，则不允许进入login
  if (user.user_token) {
    if (to.path === "/login") {
      next("/");
    } else {
      if (!user.hasUserInfo) {
        await user.getProfile("获取个人信息");
      }
      next();
    }
  } else {
    //用户未登录，只允许进入login
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next("/login");
    }
  }
});
