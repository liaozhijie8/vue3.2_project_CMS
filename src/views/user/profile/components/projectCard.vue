<template>
  <el-card class="box-card user-container">
    <template #header>
      <div class="card-header">
        <span>Card name</span>
      </div>
    </template>
    <div class="user-profile">
      <div class="box-center">
        <PanThumb height="100px" width="100px" :image="ava_url" :z-index="99">
          <div>
            <p>你好</p>
            {{ user.userInfo.user_name }}
          </div>
        </PanThumb>
      </div>
      <!-- 姓名 && 角色 -->
      <div class="box-center">
        <div class="user-name text-center">{{ user.userInfo.user_name }}</div>
        <div class="user-role text-center text-muted">超级管理员</div>
      </div>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { userStore } from "@/stores";
import PanThumb from "../../../../components/panThumb/index.vue";
const user = userStore();
let ava_url = ref(
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
);
</script>
<style scoped lang="scss">
.user-container {
  .text-muted {
    font-size: 14px;
    color: #777;
  }

  .user-profile {
    text-align: center;
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
    }
  }

  .project-bio {
    margin-top: 20px;
    color: #606266;
    span {
      padding-left: 4px;
    }

    .project-bio-section {
      margin-bottom: 36px;
      .project-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      .project-bio-section-body {
        .progress-item {
          margin-top: 10px;
          div {
            font-size: 14px;
            margin-bottom: 2px;
          }
        }
      }
    }
  }
}
</style>
