<template>
  <el-checkbox-group :v-model="checkList" @change="addUserRoleClick">
    <el-checkbox
      :label="item.title"
      v-for="item in roleList"
      :key="item.id"
      :disabled="item.title === SUPER_ADMID"
    />
  </el-checkbox-group>
</template>

<script lang="ts" setup>
import { addUserRole } from "@/api/userRole";
import { SUPER_ADMID } from "@/constant";
import { ElMessage } from "element-plus";
const emit = defineEmits(["updateRole"]);
const props = defineProps({
  roleList: {
    type: Array,
    default() {
      return [];
    },
  },
  userId: {
    type: Number,
    default: 0,
  },
  checkList: {
    type: Array,
    default() {
      return [];
    },
  },
});
// 添加用户角色
const addUserRoleClick = (val) => {
  let temp = [];
  let temp2 = [];
  //对比title是否一致
  val.forEach((item) => {
    props.roleList.forEach((element) => {
      if (item === element.title) {
        temp.push(element);
      }
    });
  });
  // 存入id
  for (let i of temp) {
    temp2.push(i.id);
  }
  // 添加角色id（api)
  if (temp2.length > 0) {
    addUserRole(props.userId, { role_id: temp2.toString() }).then((res) => {
      ElMessage.success(res.message);
      emit("updateRole");
    });
  }
};
</script>
