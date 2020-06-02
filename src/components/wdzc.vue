<template>
  <div class="shys">
    <div class="breadcrumb">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的资产</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card style="margin-top:10px;">这里是我的资产页面</el-card>
  </div>
</template>

<script>
export default {
  name: "attachmentManagement",
  data() {
    return {};
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shys{
  background: #f0f2f5;
  margin-top: 10px;
}
.el-breadcrumb {
  height: 50px;
  line-height: 50px;
}
.breadcrumb {
  padding-left: 20px;
  background: #fff;
}
</style>
