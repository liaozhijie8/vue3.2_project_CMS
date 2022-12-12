<template>
  <el-form
    :model="formLabelAlign"
    :rules="rules"
    ref="ruleFormRef"
    class="form-container"
    :inline="true"
  >
    <el-form-item label="名称" prop="version_sort">
      <el-input v-model="formLabelAlign.version_sort" class="form-input" />
    </el-form-item>
    <el-form-item label="规格" prop="format_sort">
      <el-input v-model="formLabelAlign.format_sort" class="form-input" />
    </el-form-item>
  </el-form>
  <div class="form-container">
    <el-form :model="colorData" label-width="50px" :inline="true">
      <el-form-item label="颜色" prop="color_name">
        <el-input v-model="colorData.color_name" class="color-input" />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model.number="colorData.price" class="color-input" />
      </el-form-item>
      <el-form-item label="库存" prop="stock">
        <el-input v-model.number="colorData.stock" class="color-input" />
      </el-form-item>
      <el-form-item>
        <el-button @click="addColorData">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
  <el-table :data="tableData" table-layout="auto" :border="true">
    <el-table-column prop="color_name" label="颜色" />
    <el-table-column prop="price" label="价格" />
    <el-table-column prop="stock" label="库存" />
  </el-table>
  <div class="submit-box">
    <el-button type="primary" @click="submitForm(ruleFormRef)">创建</el-button>
    <el-button @click="resetForm(ruleFormRef)">清空</el-button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
const emits = defineEmits(["form-data"]);
const formLabelAlign = reactive({
  format_sort: "",
  version_sort: "",
});
const colorData = ref({
  color_name: "",
  price: 0,
  stock: 0,
});
const tableData = ref([]);
// 添加颜色参数
const addColorData = () => {
  const temp = colorData.value;
  tableData.value.push(temp);
  colorData.value = {
    color_name: "",
    price: 0,
    stock: 0,
  };
};
const rules = reactive({
  version_sort: [
    { required: true, message: "请输入版本名称", trigger: "blur" },
    { min: 2, max: 5, message: "长度在2~5个字符", trigger: "blur" },
  ],
  format_sort: [{ required: true, message: "请输入规格", trigger: "blur" }],
  color_name: [{ required: true, message: "请输入颜色", trigger: "blur" }],
  price: [{ required: true, message: "请输入价格", trigger: "blur" }],
  stock: [{ required: true, message: "请输入库存", trigger: "blur" }],
});
const ruleFormRef = ref();
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      const { format_sort, version_sort } = formLabelAlign;
      emits("form-data", {
        id: Date.now(),
        format_sort,
        version_sort,
        list: tableData.value,
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
<style lang="scss" scoped>
.form-container {
  .form-input {
    width: 150px;
  }
  .color-input {
    width: 90px;
  }
}
.submit-box {
  margin-top: 20px;
  text-align: end;
}
</style>
