import type { Page } from "@/interface/user_interface";
import type { CreateGoods } from "@/interface/goods_interface";
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

/* 上架商品 */
export const goodsOn = (data: number) => {
  return request({
    url: `/goods/on/${data}`,
    method: "POST",
  });
};
/* 下架商品 */
export const goodsOff = (data: number) => {
  return request({
    url: `/goods/off/${data}`,
    method: "POST",
  });
};
/* 上传商品信息 */
export const createGoods = (data: CreateGoods) => {
  return request({
    url: "/goods/create",
    method: "POST",
    data,
  });
};
/* 修改商品信息 */
export const updateGoods = (id: number, data: CreateGoods) => {
  return request({
    url: `/goods/update/${id}`,
    method: "PUT",
    data,
  });
};
