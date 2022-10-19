import type { Page } from "@/interface/user_interface";
import request from "@/utils/request";

/*
 * 获取商品列表
 */
export const goodsList = (params: Page) => {
  return request({
    url: "/goods/list",
    method: "GET",
    params,
  });
};
