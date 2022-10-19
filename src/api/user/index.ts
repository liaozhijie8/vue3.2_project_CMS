import type { ChangePassword, Page, Login } from "@/interface/user_interface";
import request from "@/utils/request";

/*
 * 登录请求
 */
export const login = (data: Login) => {
  return request({
    url: "/login",
    method: "POST",
    data,
  });
};

/* 
获取用户个人信息
*/
export const profile = () => {
  return request({
    url: "/profile",
    method: "GET",
  });
};

/* 修改密码 */
export const changePassword = (data: ChangePassword) => {
  return request({
    url: "/change",
    method: "PATCH",
    data,
  });
};
/* 获取用户列表 */
export const getUserlist = (params: Page) => {
  return request({
    url: "/list",
    method: "GET",
    params,
  });
};
/* 删除用户 */
export const removeUser = (data: number) => {
  return request({
    url: `/remove/${data}`,
    method: "POST",
  });
};
/* 恢复用户 */
export const restoreUser = (data: number) => {
  return request({
    url: `/restore/${data}`,
    method: "POST",
  });
};
