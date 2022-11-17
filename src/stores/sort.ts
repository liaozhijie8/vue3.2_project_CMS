import { getSortList_api } from "@/api/sort";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const sortStore = defineStore("sort", () => {
  const allSortList = ref([]);
  const hasSortList = computed(() => {
    return allSortList.value.length > 0;
  });
  // 获取所有分类
  const getSortList = () => {
    getSortList_api().then((res) => {
      allSortList.value = res.result;
    });
  };
  return { allSortList, getSortList, hasSortList };
});
