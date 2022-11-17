import request from "@/utils/request";

// 查找所有分类
export const getSortList_api = () => {
  return request({
    url: "/sort/list",
    method: "GET",
  });
};
