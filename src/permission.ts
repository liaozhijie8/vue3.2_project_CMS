import router from "@/router";
import {
  userStore,
  store,
  goodsStore,
  roleStore,
  permissionStore,
  sortStore,
} from "./stores";
const goods = goodsStore(store);
const user = userStore(store);
const role = roleStore(store);
const sort = sortStore(store);
const permission = permissionStore(store);

/* 白名单 */
const whiteList = ["/login"];
router.beforeEach(async (to, from, next) => {
  //用户已登录
  if (user.user_token) {
    if (!user.hasUserInfo) {
      const { result } = await user.getProfile();
      const res = await permission.getUserPermissionName(result.id);
      const filterRoutes = await permission.handleRoutesData();
      //动态添加路由
      filterRoutes.forEach((item) => {
        router.addRoute(item);
      });
      return next(to.path);
    } else if (to.path === "/login") {
      next("/");
    } else {
      if (!user.hasUserlist) {
        await user.getUser_list(user.pageNum);
      }
      if (!goods.hasGoodslist) {
        await goods.getGoods_list(goods.goodsPageNum);
      }
      if (!role.hasRoleslist) {
        await role.getRoleList();
      }
      if (!sort.hasSortList) {
        await sort.getSortList();
      }
      next();
    }
  } else {
    //用户未登录
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next("/login");
    }
  }
});
