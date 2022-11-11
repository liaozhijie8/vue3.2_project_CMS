<template>
  <el-table :data="accepTableData" border style="width: 100%">
    <el-table-column
      :prop="item.prop"
      :label="item.label"
      :width="item.width"
      v-for="item in propArray"
      :key="item.id"
    />
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button
          :type="item.color"
          size="small"
          v-for="item in actionData"
          :key="item.id"
          :disabled="scope.row.title === '超级管理员'"
          @click="handleClick(scope.row, item.type, item.name)"
          >{{ item.name }}</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
defineProps({
  accepTableData: {
    type: Array,
  },
  propArray: {
    type: Array,
  },
  //操作的数据
  actionData: {
    type: Array,
  },
});
const emit = defineEmits(["editEvent"]);
const handleClick = (val, type, name) => {
  emit("editEvent", { ...val, type, name });
};
</script>
