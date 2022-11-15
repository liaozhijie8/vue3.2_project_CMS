<template>
  <el-upload
    v-model:file-list="fileList"
    action="#"
    list-type="picture-card"
    :on-preview="preview"
    :on-remove="handleRemove"
    :before-upload="beforeUpload"
    :http-request="upload"
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
const dialogVisible = ref(false);
const cos = new COS({
  SecretId: "AKIDkJdhnfIgpkPpytZx6ZnkTv61iFXYJohL", // 密钥id
  SecretKey: "Vloc9PPDm46QVKuEKBpDOJzRgiV3OXR6", // 密钥 key
}); // 实例化的包 已经具有了上传的能力 可以上传到该账号里面的存储桶了
const fileList = ref([
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "plant-1.png",
    url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-7059d53f-a4ca-4b65-894a-7a6054b27583/262a6f36-b4b0-4fa1-8dcc-93ae06b4f243.png",
  },
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "plant-2.png",
    url: "https://cms-1305646665.cos.ap-guangzhou.myqcloud.com/avatar.jpg",
  },
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "figure-1.png",
    url: "/images/figure-1.png",
  },
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "figure-2.png",
    url: "/images/figure-2.png",
  },
]);
const imgUrl = ref("");
const showPercent = ref(false);
const percent = ref(0);
const currentImageUid = ref(null);
const preview = (file) => {
  imgUrl.value = file.url;
  dialogVisible.value = true;
};
const beforeUpload = (file) => {
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
  currentImageUid.value = file.uid;
  showPercent.value = true;
  return true;
};
const upload = (params) => {
  //   console.log(params.file)
  if (params.file) {
    // 执行上传操作
    cos.putObject(
      {
        Bucket: "cms-1305646665", // 存储桶
        Region: "ap-guangzhou", // 地域
        Key: params.file.name, // 文件名
        Body: params.file, // 要上传的文件对象
        StorageClass: "STANDARD", // 上传的模式类型 直接默认 标准模式即可
        onProgress: (progressData) => {
          percent.value = progressData.percent * 100;
        },
      },
      (err, data) => {
        // data返回数据之后 应该如何处理
        if (err) return;
        fileList.value = fileList.value.map((item) => {
          if (item.uid === currentImageUid.value) {
            return { url: "http://" + data.Location, name: item.name };
          }
          return item;
        });
        // console.log(this.fileList);
      }
    );
  }
};
const handleRemove = (file, fileList) => {
  this.fileList = this.fileList.filter((item) => item.uid !== file.uid);
  // console.log(file)
  cos.deleteObject(
    {
      Bucket: "xxx" /* 必须 */,
      Region: "ap-nanjing" /* 存储桶所在地域，必须字段 */,
      Key: file.name /* 必须 */,
    },
    (err, data) => {
      // console.log(err || data)
    }
  );
};
</script>
