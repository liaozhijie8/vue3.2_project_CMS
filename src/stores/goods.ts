import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  goodsList,
  goodsOff,
  goodsOn,
  createGoods,
  updateGoods,
} from "@/api/goods";
import { ElMessage } from "element-plus";
import type { CreateGoods, GoodsList } from "@/interface/goods_interface";

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
  // 刷新数据
  function updateDate() {
    getGoods_list(goodsPageNum.value);
  }
  /* 上架商品 */
  function setGoodsOn(palyload: number) {
    return new Promise((resolve, rejects) => {
      goodsOn(palyload)
        .then((res) => {
          // 刷新数据
          getGoods_list(goodsPageNum.value);
          ElMessage.success(res.message);
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }
  /* 下架商品 */
  function setGoodsOff(palyload: number) {
    return new Promise((resolve, rejects) => {
      goodsOff(palyload)
        .then((res) => {
          // 刷新数据
          getGoods_list(goodsPageNum.value);
          ElMessage.success(res.message);
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }
  /* 上传商品 */
  function importGoods(palyload: CreateGoods, isMore: boolean) {
    return new Promise((resolve, reject) => {
      createGoods(palyload)
        .then((res) => {
          const { message } = res;
          if (!isMore) {
            // 如果不是通过excle上传的就立马刷新数据
            updateDate();
            ElMessage.success(message);
          }
          resolve(message);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  /* 跳转修改页携带的参数 */
  const updateGoodsInfo = ref({});
  // 填入参数
  function injectInfo(palyload: GoodsList) {
    updateGoodsInfo.value = palyload;
  }
  // 清空参数
  function removeInfo() {
    updateGoodsInfo.value = {};
  }
  /* 修改商品信息 */
  function setUpdateGoods(palyload) {
    const { id, ...res } = palyload;
    return new Promise((resolve, rejects) => {
      updateGoods(id, res)
        .then((res) => {
          ElMessage.success(res.message);
          removeInfo();
          updateDate();
          resolve(res);
        })
        .catch((err) => {
          rejects(err);
        });
    });
  }
  return {
    getGoods_list,
    hasGoodslist,
    goodList,
    goodsPageNum,
    goodsPageSize,
    goodsTotal,
    setGoodsOn,
    setGoodsOff,
    importGoods,
    updateDate,
    updateGoodsInfo,
    injectInfo,
    removeInfo,
    setUpdateGoods,
  };
});
