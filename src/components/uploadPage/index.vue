<template>
  <div class="upload-page">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
    >
      <el-form-item v-if="is_update" label="商品编号" prop="id">
        <el-input
          v-model.number="ruleForm.id"
          :disabled="is_listTo"
          placeholder="请输入商品编号"
        />
      </el-form-item>
      <el-form-item label="商品名称" prop="goods_name">
        <el-input v-model="ruleForm.goods_name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="商品价格" prop="goods_price">
        <el-input
          v-model.number="ruleForm.goods_price"
          placeholder="请输入价格"
        />
      </el-form-item>
      <el-form-item label="商品数量" prop="goods_num">
        <el-input
          v-model.number="ruleForm.goods_num"
          placeholder="请输入数量"
        />
      </el-form-item>
      <el-form-item label="商品图片" prop="goods_img">
        <el-button @click="displayDrawer">上传图片</el-button>
        <input v-model="ruleForm.goods_img" v-show="false" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >Create</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
    <DrawerBox v-model="isDrawer">
      <template #header><h4>图片管理</h4></template>
      <template #content>
        <UploadImage :file-list-own-data="fileList"></UploadImage>
      </template>
    </DrawerBox>
  </div>
</template>

<script lang="ts" setup>
import { computed, onActivated, reactive, ref, watch } from "vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import DrawerBox from "@/components/drawer/index.vue";
import UploadImage from "@/components/uploadImage/index.vue";
import { goodsStore, imgStore } from "@/stores";
import { useRouter } from "vue-router";

const props = defineProps({
  is_update: {
    type: Boolean,
    default: false,
  },
});
// 控制drawer显示
const isDrawer = ref(false);
const displayDrawer = () => {
  isDrawer.value = true;
};
const router = useRouter();
const goods = goodsStore();
const img = imgStore();
const formSize = ref("large");
const ruleFormRef = ref();
let ruleForm = ref({
  id: "",
  goods_name: "",
  goods_price: "",
  goods_num: "",
});
// 判断是否为商品列表跳转的修改行为
const is_listTo = ref(false);
/* 监听是否为修改状态 */
const updateGoods = computed(() => {
  return goods.updateGoodsInfo;
});
// 原始的图片数据

const ownImgData = computed(() => {
  return img.imgList;
});
const fileList = ref([]);
watch(ownImgData, () => {
  fileList.value = img.imgList;
});
onActivated(() => {
  if (props.is_update) {
    let { createdAt, updatedAt, deletedAt, goods_price, id, ...res } =
      updateGoods.value;
    if (goods_price) {
      is_listTo.value = true;
      goods_price = Number(goods_price);
    }
    img.getimgList(id);
    ruleForm.value = { goods_price, id, ...res };
  }
});

const rules = reactive({
  id: [{ required: true, message: "请输入商品编号", trigger: "blur" }],
  goods_name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
  goods_price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
  goods_num: [{ required: true, message: "请输入商品数量", trigger: "blur" }],
  // goods_img: [
  //   { required: true, message: "请至少选择一张商品图片", trigger: "blur" },
  // ],
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      // 处于创建状态
      if (!props.is_update) {
        const { id, ...res } = ruleForm.value;
        goods.importGoods(res, false);
      } else {
        // 处于修改
        goods.setUpdateGoods(ruleForm.value);
      }
      is_listTo.value = false;
      router.push("/goods/list");
    } else {
      ElMessage.error("请输入完整信息");
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  is_listTo.value = false;
  ruleForm.value = {
    id: "",
    goods_name: "",
    goods_price: "",
    goods_num: "",
  };
};
</script>
<style lang="scss" scoped>
.upload-page {
  display: flex;
  margin-top: 50px;
  justify-content: center;
  .demo-ruleForm {
    width: 600px;
  }
}
</style>
