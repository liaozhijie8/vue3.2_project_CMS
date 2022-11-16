import { defineStore } from "pinia";
import { getImgList_api } from "@/api/img";
import { ref } from "vue";
export const imgStore = defineStore("img", () => {
  const imgList = ref([]);
  const currentId = ref(0);
  const getimgList = (id: number) => {
    currentId.value = id;
    return new Promise((resolve, reject) => {
      getImgList_api(id)
        .then((res) => {
          imgList.value = res.result;
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  return { imgList, getimgList, currentId };
});
