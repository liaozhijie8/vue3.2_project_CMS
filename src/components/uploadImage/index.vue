<template>
  <el-upload
    v-model:file-list="fileList"
    action="#"
    list-type="picture-card"
    :on-preview="preview"
    :on-remove="handleRemove"
    :before-upload="beforeUpload"
    :http-request="upload"
    :limit="6"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
  <el-progress v-if="showPercent" style="width: 180px" :percentage="percent" />
  <el-dialog v-model="dialogVisible">
    <img w-full :src="imgUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>
import COS from "cos-js-sdk-v5";
import { ref } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { SECRET_ID, SECRET_KEY, BUCKET, REGION } from "../../../privacy/cos";
const props = defineProps({
  fileListOwnData: {
    type: Array,
    default() {
      return {};
    },
  },
});
const emits = defineEmits(["img-list"]);
const dialogVisible = ref(false);
const cos = new COS({
  SecretId: SECRET_ID, // 密钥id
  SecretKey: SECRET_KEY, // 密钥 key
}); // 实例化的包 已经具有了上传的能力 可以上传到该账号里面的存储桶了
const fileList = ref(props.fileListOwnData);
const imgUrl = ref("");
const showPercent = ref(false);
const percent = ref(0);
const currentImageUid = ref(null);
const preview = (file) => {
  imgUrl.value = file.url;
  dialogVisible.value = true;
};
const beforeUpload = (file) => {
  // 检查是否重复上传
  const res = fileList.value.filter((item) => {
    return item.img_name === file.name;
  });
  if (res.length > 0) {
    ElMessage.error("该图片已经存在");
    return false;
  }
  // 允许上传的文件类型
  const types = ["image/jpeg", "image/gif", "image/bmp", "image/png"];
  if (!types.includes(file.type)) {
    ElMessage.error("上传图片只能是 JPG、GIF、BMP、PNG 格式!");
    return false; // return false 会阻止图片的上传操作
  }
  const maxSize = 1024 * 1024;
  if (file.size > maxSize) {
    ElMessage.error("图片大小最大不能超过1M");
    return false;
  }
  currentImageUid.value = file.uid; //传入图片的时间戳
  showPercent.value = true;
  return true;
};
const upload = (params) => {
  //   console.log(params.file)
  if (params.file) {
    // 执行上传操作
    cos.putObject(
      {
        Bucket: BUCKET, // 存储桶
        Region: REGION, // 地域
        Key: params.file.name, // 文件名
        Body: params.file, // 要上传的文件对象
        StorageClass: "STANDARD", // 上传的模式类型 直接默认 标准模式即可
        onProgress: (progressData) => {
          percent.value = progressData.percent * 100;
        },
      },
      (err, data) => {
        // data返回数据之后 应该如何处理
        console.log(data);
        if (err) return;
        fileList.value = fileList.value.map((item) => {
          if (item.uid === currentImageUid.value) {
            const url = "http://" + data.Location;
            const img_name = item.name;
            return { url, img_name };
          }
          return item;
        });
        emits("img-list", fileList.value);
      }
    );
  }
};
const handleRemove = (file) => {
  cos.deleteObject(
    {
      Bucket: BUCKET /* 必须 */,
      Region: REGION /* 存储桶所在地域，必须字段 */,
      Key: file.img_name /* 必须 */,
    },
    (err, data) => {
      console.log(data);
    }
  );
};
</script>
