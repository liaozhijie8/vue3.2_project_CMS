import router from "@/router";
import { getItem } from "./utils/storage";
import { TOKEN } from "@/constant";
import { userStore } from "./stores/user";

/* 白名单 */
const whiteList = ["/login"];
router.beforeEach(async (to, from, next) => {
  //用户已登录，则不允许进入login
  const user = userStore();
  if (getItem(TOKEN)) {
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
