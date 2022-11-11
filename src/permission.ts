import router from "@/router";
import {
  userStore,
  store,
  goodsStore,
  roleStore,
  permissionStore,
} from "./stores";
const goods = goodsStore(store);
const user = userStore(store);
const role = roleStore(store);
const permission = permissionStore(store);

/* 白名单 */
const whiteList = ["/login"];
let temp = true;
router.beforeEach(async (to, from, next) => {
  //用户已登录
  if (user.user_token) {
    console.log(user.hasUserInfo);
    console.log(user.userInfo);
    if (!user.hasUserInfo) {
      const { result } = await user.getProfile();
      console.log("222");
      console.log(result);
      const res = await permission.getUserPermissionName(result.id);
      const filterRoutes = await permission.handleRoutesData();
      console.log(filterRoutes);
      //动态添加路由
      filterRoutes.forEach((item) => {
        router.addRoute(item);
        console.log("添加路由");
      });
      console.log(to.path);
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
