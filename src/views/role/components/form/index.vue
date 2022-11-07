<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="80px"
    class="demo-ruleForm"
  >
    <el-form-item label="角色" prop="title">
      <el-input v-model="ruleForm.title" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="职能" prop="describe">
      <el-input v-model="ruleForm.describe" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">{{
        props.ruleFormData.type === "update" ? "确认修改" : "确认添加"
      }}</el-button>
      <el-button type="success" v-if="tipText">{{ tipText }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import type { FormInstance } from "element-plus";
import { updateRole, addRole } from "@/api/role";
import { roleStore } from "@/stores";

const role = roleStore();
const ruleFormRef = ref<FormInstance>();
const props = defineProps({
  ruleFormData: {
    type: Object,
    default() {
      return {
        title: "",
        describe: "",
      };
    },
  },
});

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入角色名称"));
  }
  callback();
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入职能描述"));
  }
  callback();
};

const ruleForm = ref(props.ruleFormData);

const rules = reactive({
  title: [{ validator: validatePass, trigger: "blur" }],
  describe: [{ validator: validatePass2, trigger: "blur" }],
});
const tipText = ref();
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      const { id, title, describe, type } = ruleForm.value;
      if (type === "update") {
        role
          .updateRoleInfo({ id, title, describe, type })
          .then((res) => {
            tipText.value = res.message;
          })
          .catch((err) => {
            tipText.value = err.message;
          });
      } else {
        role
          .addRoleInfo({ title, describe })
          .then((res) => {
            tipText.value = res;
          })
          .catch((err) => {
            tipText.value = err;
          });
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

watch(
  () => props.ruleFormData,
  (newVal, oldVal) => {
    tipText.value = "";
    ruleForm.value = newVal;
  }
);
</script>
