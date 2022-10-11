import type { ChangePassword } from "@/interface/user_interface";
import request from "@/utils/request";

/*
 * 登录请求
 */
export const login = (data: any) => {
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
