<template>
  <el-upload
    v-model:file-list="fileList"
    action="#"
    list-type="picture-card"
    :on-preview="preview"
    :on-remove="handleRemove"
    :before-upload="beforeUpload"
    :http-request="upload"
    :on-exceed="exceedEvent"
    :limit="6"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>
  <el-progress v-if="showPercent" style="width: 180px" :percentage="percent" />
  <DialogBox v-model="dialogVisible">
    <template #title>{{ imgName }}</template>
    <template #content>
      <ImgBox class="img-container" :img-url="imgUrl"></ImgBox>
    </template>
  </DialogBox>
</template>

<script lang="ts" setup>
import COS from "cos-js-sdk-v5";
import { ref, watch } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { SECRET_ID, SECRET_KEY, BUCKET, REGION } from "../../../privacy/cos";
import { deleteImg_api, addImg_api } from "@/api/img";
import DialogBox from "@/components/dialog/index.vue";
import ImgBox from "@/components/imgBox/index.vue";
import { imgStore } from "@/stores";
const img = imgStore();
const props = defineProps({
  fileListOwnData: {
    type: Array,
    default() {
      return {};
    },
  },
});
const fileList = ref(props.fileListOwnData);
// 监听原来拥有的图片数据
watch(
  () => props.fileListOwnData,
  () => {
    fileList.value = props.fileListOwnData;
  }
);
const dialogVisible = ref(false);
const cos = new COS({
  SecretId: SECRET_ID, // 密钥id
  SecretKey: SECRET_KEY, // 密钥 key
}); // 实例化的包 已经具有了上传的能力 可以上传到该账号里面的存储桶了

const imgUrl = ref("");
const imgName = ref("");
const showPercent = ref(false);
const percent = ref(0);
const currentImageUid = ref(null);
const preview = (file) => {
  imgUrl.value = file.url;
  imgName.value = file.img_name;
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
            // 添加图片
            addImg_api({ img_id: img.currentId, img_name, url });
            return { url, img_name };
          }
          return item;
        });
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
      deleteImg_api({ img_id: img.currentId, img_name: file.img_name });
    }
  );
};
const exceedEvent = () => {
  ElMessage.error("最多只能添加六张图片");
};
</script>
<style lang="scss" scoped>
.img-container {
  height: 600px;
}
</style>
