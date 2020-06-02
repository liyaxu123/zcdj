<template>
  <div class="share">
    <el-card>
      <el-row>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>数据字典</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
    </el-card>
    <!-- 搜索部分 -->
    <el-card style="margin-top:10px;">
      <el-form :model="sjzdForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-row class="rowcenter">
          <el-col :span="6" class="colcenter">
            <el-form-item label="编号">
              <el-input placeholder="请输入编号" v-model="sjzdForm.serialNumber" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="colcenter">
            <el-form-item label="文本">
              <el-input placeholder="请输入文本" v-model="sjzdForm.text" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" :offset="8">
            <el-button type="primary" size="medium">添加</el-button>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" size="medium">删除</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 字典内容部分 -->
    <el-card style="margin-top:10px;">
      <div class="mainbox">
        <!-- 左侧树形结构 -->
        <div class="leftbox">
          <el-tree :data="treedata" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
        </div>
        <!-- 右侧表格数据 -->
        <div class="rightbox">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            max-height = '630px'
            :header-cell-style="{'background':'#f2f2f2'}"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="date" align="center" label="类型"></el-table-column>
            <el-table-column prop="name" align="center" label="编号"></el-table-column>
            <el-table-column prop="address" align="center" label="文本"></el-table-column>
            <el-table-column prop="address" align="center" label="备注"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sjzdForm: {
        serialNumber: "",
        text: ""
      },
      //   树结构数据
      treedata: [
        {
          label: "人员学位",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "仪器设备状态",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "实验室校区",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },
      //   表格数据
      tableData: [
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>

<style lang="css" scoped>
.mainbox {
  display: flex;
  /* height: 630px; */
  justify-content: space-between;
}
.leftbox {
  width: 15%;
  max-height: 630px;
  border: 1px solid #eee;
  overflow-y: auto;
}
.rightbox {
  width: 84%;
  /* background: #000; */
}
</style>