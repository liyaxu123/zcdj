<template>
  <div class="share">
    <el-card>
      <el-row>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/share' }">资产变更</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    </el-card>
    <!-- 表格部分 -->
    <el-card class="tableCard">这是资产变更页面</el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="css" scoped>
</style>