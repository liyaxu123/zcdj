<template>
  <div class="home">
    <!-- 头部导航 -->
    <el-card shadow="never" style='min-width:350px;'>
      <el-row class="topnav">
        <el-col :span="22">
          <p>欢迎您使用资产IN平台</p>
        </el-col>
        <!-- 欢迎语 -->
        <!-- <el-col :span="2" style="text-align:center;">
          <p></p>
        </el-col> -->
        <!-- 用户头像 -->
        <el-col :xs="8" :sm="4" :lg="2" style="text-align:center;">
          <div @click="toUserPage" class="usertx">
            <el-avatar size="medium" :src="userImg"></el-avatar>
          </div>
        </el-col>
        <el-col :xs="8" :sm="4" :lg="2" style="text-align:center;">
          <el-link :underline="false" @click="quit">退出</el-link>
        </el-col>
      </el-row>
    </el-card>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// 引入附件管理组件
import attachmentManagement from "@/components/attachmentManagement.vue";

export default {
  name: "Home",
  components: {
    attachmentManagement
  },
  data() {
    return {
      activeIndex: "1",
      userImg:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
    };
  },
  created() {},
  methods: {
    toUserPage() {
      this.$router.push("/userinfo");
    },
    // 退出
    quit() {
      this.$confirm("您确定要退出该系统吗？", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      })
        .then(() => {
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出"
          });
        });
    }
  }
};
</script>

<style lang="css" scoped>
.topnav {
  display: flex;
  align-items: center;
}
.el-dropdown-link,
.el-link {
  font-size: 16px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.usertx {
  cursor: pointer;
}
</style>
