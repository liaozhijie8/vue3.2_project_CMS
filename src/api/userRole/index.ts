import request from "@/utils/request";

/* 获取用户拥有的角色id */
export const getUserRoleID = (id: number) => {
  return request({
    url: `/user-role/find/${id}`,
    method: "GET",
  });
};
/* 添加用户角色 */
export const addUserRole = (id: number, data) => {
  return request({
    url: `/user-role/add-role/${id}`,
    method: "POST",
    data,
  });
};
