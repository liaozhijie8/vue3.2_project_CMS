import { defineStore } from "pinia";
import { getImgList_api } from "@/api/img";
import { ref } from "vue";
import { getItem, setItem } from "@/utils/storage";
import { CURRENT_ID } from "@/constant";
export const imgStore = defineStore("img", () => {
  const imgList = ref([]);
  const currentId = ref(getItem(CURRENT_ID));
  const getimgList = (id: number) => {
    currentId.value = id;
    setItem(CURRENT_ID, id);
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
