import { defineStore } from "pinia";
import { getImgList_api } from "@/api/img";
import { ref } from "vue";
export const imgStore = defineStore("img", () => {
  const imgList = ref([]);
  const getimgList = (id: Number) => {
    getImgList_api(id).then((res) => {
      imgList.value = res.result;
    });
  };
  return { imgList, getimgList };
});
