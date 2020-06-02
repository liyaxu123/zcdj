<template>
  <div class="attachmentManagement">
    <el-card>
      <el-row>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人信息</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    </el-card>
    <el-card style="margin-top:10px;">
        这里是个人信息页面
    </el-card>
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

</style>
