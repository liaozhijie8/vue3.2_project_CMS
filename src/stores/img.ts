import { defineStore } from "pinia";
import { getImgList_api } from "@/api/img";
import { ref } from "vue";
export const imgStore = defineStore("img", () => {
  const imgList = ref([]);
  const currentId = ref(0);
  const getimgList = (id: number) => {
    currentId.value = id;
    getImgList_api(id).then((res) => {
      imgList.value = res.result;
    });
  };
  return { imgList, getimgList, currentId };
});
