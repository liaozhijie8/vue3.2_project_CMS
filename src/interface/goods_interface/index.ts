export interface GoodsList {
  id: number;
  goods_name: string;
  goods_price: number;
  goods_num: number;
  goods_img: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

/* 上传商品信息 */
export interface CreateGoods {
  goods_name: string;
  goods_price: number;
  goods_num: number;
  goods_img: string;
}
