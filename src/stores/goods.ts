import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { goodsList } from "@/api/goods";
import type { List } from "@/interface/user_interface";
import { login } from "@/api/user";

export const goodsStore = defineStore("goods", () => {
  /* 获取商品列表 */
  const goodsPageNum = ref();
  const goodsPageSize = ref();
  const goodsTotal = ref();
  const goodList = ref({});
  async function getGoods_list(palyload: number) {
    const { result } = await goodsList({ pageNum: palyload, pageSize: 10 });
    const { pageNum, pageSize, total, list } = result;
    goodsPageNum.value = pageNum;
    goodsPageSize.value = pageSize;
    goodsTotal.value = total;
    goodList.value = list;
  }
  const hasGoodslist = computed(() => {
    return JSON.stringify(goodList.value) !== "{}";
  });
  return {
    getGoods_list,
    hasGoodslist,
    goodList,
    goodsPageNum,
    goodsPageSize,
    goodsTotal,
  };
});
