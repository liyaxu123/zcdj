<template>
  <div class="share">
    <el-card>
      <el-row>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/share' }">资产分享</el-breadcrumb-item>
          <el-breadcrumb-item>分享明细</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    </el-card>
    <!-- 表格部分 -->
    <el-card class="tableCard">
      <el-table
        :data="tableData"
        ref="multipleTable"
        border
        style="width: 100%"
        :height="dyHeight"
        :header-cell-style="{'background':'#f2f2f2'}"
      >
        <el-table-column type="index" align="center" label="序号" width="55"></el-table-column>
        <el-table-column prop="ZC_ZCMC" align="center" label="资产名称"></el-table-column>
        <el-table-column prop="ZC_HTMC" align="center" label="合同名称"></el-table-column>
        <el-table-column prop="ZC_HTBH" align="center" label="合同编号"></el-table-column>
        <el-table-column prop="ZC_PPXH" align="center" label="品牌/型号"></el-table-column>
        <el-table-column prop="ZC_Num" align="center" label="数量" width="80"></el-table-column>
        <el-table-column prop="ZC_Price" align="center" label="单价（万元）" width="120"></el-table-column>
        <el-table-column prop="ZC_Sum" align="center" label="金额（万元）" width="120"></el-table-column>
        <el-table-column prop="ZC_SYR" align="center" label="使用人" width="120"></el-table-column>
        <el-table-column prop align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" @click="lookDetil(scope)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      dyHeight: window.innerHeight - 185,
      where: {}
    };
  },
  created() {
    this.tableData = JSON.parse(window.sessionStorage.getItem("SharedZCList"));
  },
  mounted() {
    window.onresize = () => {
      this.dyHeight = window.innerHeight - 185;
    };
  },
  methods: {
    lookDetil(scope) {
      this.where.CanEdit = false;
      this.where.GobackURI = "myshare";
      this.where.PrimaryKey = scope.row.IID;
      this.$router.push({
        name: "assetRegister",
        params: { where: this.where }
      });
    }
  }
};
</script>

<style lang="css" scoped>
</style>