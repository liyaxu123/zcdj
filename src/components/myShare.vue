<template>
  <div class="share">
    <el-card>
      <el-row>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/share' }">资产分享</el-breadcrumb-item>
          <el-breadcrumb-item>我的分享</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    </el-card>
    <el-card style="margin-top:10px;">
        这里是可以查看我的分享的页面
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {}
};
</script>

<style lang="css" scoped>
</style>