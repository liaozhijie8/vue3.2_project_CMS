<template>
  <div class="create-container">
    <el-button type="primary">{{
      which_upload ? "excel上传" : "单项上传"
    }}</el-button>
    <UploadExcel :onSuccess="onSuccess" v-if="which_upload"></UploadExcel>
    <UploadPage v-else></UploadPage>
  </div>
</template>
<script setup lang="ts">
import UploadExcel from "../../../components/uploadExcel/index.vue";
import { GOODS_RELATIONS } from "./utils";
import { goodsStore } from "@/stores";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import UploadPage from "../../../components/uploadPage/index.vue";
import { computed } from "vue";
const router = useRouter();
const goods = goodsStore();
/* 判断是打开哪种方式上传 */
const which_upload = computed(() => {
  return goods.is_excel;
});
/* 上传文件 */
const onSuccess = ({ results }) => {
  const res = generateData(results);
  res.forEach(async (item) => {
    await goods.importGoods(item, true);
  });
  goods.updateDate();
  ElMessage.success("商品上传成功");
  router.push("/goods/list");
};
/* 筛选数据 */
const generateData = (results) => {
  const arr = [];
  results.forEach((item) => {
    const userInfo = {};
    Object.keys(item).forEach((key) => {
      userInfo[GOODS_RELATIONS[key]] = item[key];
    });
    arr.push(userInfo);
  });
  return arr;
};
</script>
<style scoped lang="scss">
@import "@/styles/mixin.scss";
.create-container {
  @include setBorder;
}
</style>
