import router from "@/router";
import { userStore, store, goodsStore, roleStore } from "./stores";
const goods = goodsStore(store);
const user = userStore(store);
const role = roleStore(store);
/* 白名单 */
const whiteList = ["/login"];
router.beforeEach(async (to, from, next) => {
  //用户已登录，则不允许进入login
  if (user.user_token) {
    if (to.path === "/login") {
      next("/");
    } else {
      if (!user.hasUserInfo) {
        await user.getProfile();
      }
      if (!user.hasUserlist) {
        await user.getUser_list(user.pageNum);
      }
      if (!goods.hasGoodslist) {
        await goods.getGoods_list(goods.goodsPageNum);
      }
      if (!role.hasRoleslist) {
        await role.getRoleList();
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
