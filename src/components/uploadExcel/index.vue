<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">
        {{ $t("msg.uploadExcel.upload") }}
      </el-button>
    </div>
    <input
      ref="excelUploadInput"
      type="file"
      class="excel-upload-input"
      accept=".xlsx,.xls"
      @change="handleChange"
    />
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <span>{{ $t("msg.uploadExcel.drop") }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref } from "vue";
import XLSX from "xlsx";
import { getHeaderRow, isExcel } from "./utils";

const props = defineProps({
  // 上传前回调
  beforeUpload: Function,
  // 成功回调
  onSuccess: Function,
});
const excelUploadInput = ref();
const loading = ref(false);
/* 点击上传按钮 */
const handleUpload = () => {
  // 触发隐藏的input
  excelUploadInput.value.click();
};
// 取到上传文件信息
const handleChange = (e: any) => {
  const files = e.target.files;
  const rawFile = files[0];
  if (!rawFile) return;
  upload(rawFile);
};
// 上传事件
const upload = (rawFile: any) => {
  excelUploadInput.value.value = null;
  // 如果用户没有指定上传回调
  if (!props.beforeUpload) {
    readerData(rawFile);
    return;
  }
  // 如果指定了回调
  const before = props.beforeUpload(rawFile);
  if (before) {
    // 处理数据
    readerData(rawFile);
  }
};
/* 读取数据 */
const readerData = (rawFile) => {
  loading.value = true;
  return new Promise((resolve, reject) => {
    // 读取文件
    const reader = new FileReader();
    // 读取完成时触发
    reader.onload = (e) => {
      // 1. 获取解析到的数据
      const data = e.target.result;
      // 2. 利用 XLSX 对数据进行解析
      const workbook = XLSX.read(data, { type: "array" });
      // 3. 获取第一张表格(工作簿)名称
      const firstSheetName = workbook.SheetNames[0];
      // 4. 只读取 Sheet1（第一张表格）的数据
      const worksheet = workbook.Sheets[firstSheetName];
      // 5. 解析数据表头
      const header = getHeaderRow(worksheet);
      // 6. 解析数据体
      const results = XLSX.utils.sheet_to_json(worksheet);
      // 7. 传入解析之后的数据
      generateData({ header, results });
      // 8. loading 处理
      loading.value = false;
      // 9. 异步完成
      resolve("解释数据完成");
    };
    reader.readAsArrayBuffer(rawFile);
  });
};
/**
 * 根据导入内容，生成数据
 */
const generateData = (excelData) => {
  // 发送给调用组件
  props.onSuccess && props.onSuccess(excelData);
};
/* 拖拽上传 */
/**
 * 拖拽文本释放时触发
 */
const handleDrop = (e) => {
  // 上传中跳过
  if (loading.value) return;
  const files = e.dataTransfer.files;
  if (files.length !== 1) {
    ElMessage.error("必须要有一个文件");
    return;
  }
  const rawFile = files[0];
  if (!isExcel(rawFile)) {
    ElMessage.error("文件必须是 .xlsx, .xls, .csv 格式");
    return false;
  }
  // 触发上传事件
  upload(rawFile);
};
/**
 * 拖拽悬停时触发
 */
const handleDragover = (e) => {
  // https://developer.mozilla.org/zh-CN/docs/Web/API/DataTransfer/dropEffect
  // 在新位置生成源项的副本
  e.dataTransfer.dropEffect = "copy";
};
</script>
<style scoped lang="scss">
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    .el-icon {
      font-size: 60px;
      margin: 0 auto;
      display: block;
    }
  }
}
</style>
