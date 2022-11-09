import request from "@/utils/request";

/* 获取所有角色 */
export const getAllRole = () => {
  return request({
    url: "/role/all",
    method: "GET",
  });
};
/* 修改角色 */
export const updateRole = (id: Number, data) => {
  return request({
    url: `/role/update/${id}`,
    method: "PUT",
    data,
  });
};
/* 删除角色 */
export const removeRole = (id: Number) => {
  return request({
    url: `/role/detele/${id}`,
    method: "POST",
  });
};

/* 添加角色 */
export const addRole = (data) => {
  return request({
    url: "/role/add",
    method: "POST",
    data,
  });
};

/* 查找角色拥有的权限id */
export const findPermission = (id: number) => {
  return request({
    url: `/role/find/${id}`,
    method: "GET",
  });
};
/* 添加角色的权限id */
export const addPermission = (id: number, data) => {
  return request({
    url: `/role/add/permission/${id}`,
    method: "POST",
    data,
  });
};
