import request from "@/utils/request";

// 添加图片

export const addImg_api = (data) => {
  return request({
    url: "/img/add",
    method: "POST",
    data,
  });
};

// 获取图片列表
export const getImgList_api = (id) => {
  return request({
    url: `/img/list/${id}`,
    method: "GET",
  });
};

// 删除图片
export const deleteImg_api = (data) => {
  return request({
    url: "/img/delete",
    method: "POST",
    data,
  });
};
