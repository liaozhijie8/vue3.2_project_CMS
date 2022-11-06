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
