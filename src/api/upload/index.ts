import request from "@/utils/request";

/* 上传文件 */
export const upload = (data) => {
  return request({
    url: "/goods/upload",
    method: "POST",
    data,
  });
};
