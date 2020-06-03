<template>
  <div class="attachmentManagement">
    <div class="breadcrumb">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>资产登记</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="addcengji">
      <!-- 搜索部分 -->
      <el-card style="margin-top:10px;" class="searchCard">
        <el-form :model="where" ref="ruleForm" class="searchform" :inline="true">
          <el-row>
            <el-col :xs="22" :sm="22" :md="18" :lg="16" :xl="12">
              <el-row>
                <el-col :span="7">
                  <el-form-item label="资产名称">
                    <el-input placeholder="请输入资产名称" v-model="where.ZC_ZCMC" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="合同名称">
                    <el-input placeholder="请输入合同名称" v-model="where.ZC_HTMC" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="使用人">
                    <el-input placeholder="请输入使用人姓名" v-model="where.ZC_SYR" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item>
                    <el-button icon="el-icon-search" circle @click="search"></el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :xs="2" :sm="2" :md="6" :lg="8" :xl="6">
              <el-row>
                <el-col :span="6" :offset="6">
                  <el-form-item>
                    <el-button icon="el-icon-plus" size="medium" @click="add" type="primary">登记</el-button>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item>
                    <el-button icon="el-icon-share" size="medium" @click="share">分享</el-button>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item>
                    <el-button size="medium" icon="el-icon-s-check" @click="addCheckList">验收</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <!-- <el-form-item>
            <el-button size="medium" type="primary" @click="addCheckList">加入验收清单</el-button>
          </el-form-item>-->
        </el-form>
      </el-card>
      <!-- 表格部分 -->
      <el-card class="tableCard">
        <el-table
          :data="tableData"
          ref="multipleTable"
          border
          style="width: 100%"
          :height="dyHeight"
          @selection-change="changeFun"
          :header-cell-style="{'background':'#f2f2f2'}"
        >
          <el-table-column type="selection" :selectable="isCheck" fixed width="50"></el-table-column>
          <el-table-column prop="rownum" align="center" label="序号" width="55"></el-table-column>
          <el-table-column prop="ZC_ZCMC" align="center" label="资产名称"></el-table-column>
          <el-table-column prop="ZC_HTMC" align="center" label="合同名称"></el-table-column>
          <el-table-column prop="ZC_HTBH" align="center" label="合同编号"></el-table-column>
          <el-table-column prop="ZC_PPXH" align="center" label="品牌/型号"></el-table-column>
          <el-table-column prop="ZC_Num" align="center" label="数量" width="80"></el-table-column>
          <el-table-column prop="ZC_Price" align="center" label="单价（万元）" width="110"></el-table-column>
          <el-table-column prop="ZC_Sum" align="center" label="金额（万元）" width="110"></el-table-column>
          <el-table-column prop="ZC_SYR" align="center" label="使用人" width="110"></el-table-column>
          <el-table-column
            prop="STATUS"
            align="center"
            label="状态"
            width="100"
            :formatter="getState"
          ></el-table-column>
          <el-table-column align="center" label="操作" width="140">
            <template slot-scope="scope">
              <el-button
                type="text"
                class="btn"
                @click="edit(scope,false)"
                v-show="scope.row.STATUS=='T1'?true:false"
              >详情</el-button>
              <el-button
                type="text"
                class="btn"
                @click="edit(scope,true)"
                v-show="scope.row.STATUS=='T1'?false:true"
              >编辑</el-button>
              <el-button
                type="text"
                @click="delet(scope)"
                v-show="scope.row.STATUS=='T1'?false:true"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="where.page"
          :page-sizes="[1,5, 10, 20, 50]"
          :page-size="where.rows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="where.total"
        ></el-pagination>
      </el-card>
      <!-- 添加合同对话框 -->
      <el-dialog :title="dialogVisibleTitle" :visible.sync="addDialogVisible" width="60%">
        <div>13315</div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
          <el-button @click="addDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
      <!-- 自定义申请验收消息提示对话框 -->
      <el-dialog :title="dialogVisibleTitle" :visible.sync="diyDialogVisible" width="60%">
        <div>13315</div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
          <el-button @click="addDialogVisible = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
    <!-- 加入验收清单抽屉 -->
    <div class="draw">
      <!-- 加入验收清单抽屉 -->
      <el-drawer
        title="资产验收清单"
        :visible.sync="drawer"
        direction="btt"
        :wrapperClosable="false"
        :modal="false"
        size="50%"
        :modal-append-to-body="false"
      >
        <!-- 抽屉中展示选中的合同清单 -->
        <el-table
          :data="multipleSelection"
          ref="multipleSelectionTable"
          border
          style="width: 97%"
          max-height="330px"
          @selection-change="changeFun"
          :header-cell-style="{'background':'#f2f2f2'}"
          class="drawerTable"
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
              <el-button type="text" @click="remove(scope)">移除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 底部提交验收 -->
        <div class="botSubmitBtn">
          <el-button type="primary">申请验收</el-button>
          <!-- <el-button>取消</el-button> -->
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { QueryService, UpdateService } from "@/utils/api.js";

export default {
  name: "attachmentManagement",
  data() {
    return {
      // 查询条件
      where: {
        ZC_ZCMC: "",
        ZC_SYR: "",
        ZC_HTMC: "",
        STATUS: "T0,T1"
      },
      tableData: [],
      // 控制添加对话框的显示与隐藏
      addDialogVisible: false,
      // 控制编辑对话框的显示与隐藏
      editDialogVisible: false,
      // 控制对话框的标题
      dialogVisibleTitle: "",
      // 存储表格多选的数据
      multipleSelection: [],
      // 控制加入验收清单抽屉的显示与隐藏
      drawer: false,
      // 控制自定义申请验收消息提示对话框的显示与隐藏
      diyDialogVisible: false,
      dyHeight: window.innerHeight - 340
    };
  },
  created() {
    this.where = this.globalVar.baseWhere(this.where);
    this.where.sidx = "ZC_HTBH,CJRQ";
    let condition = this.$route.params.where;
    if (condition != undefined) {
      for (var it in this.where) {
        this.where[it] = condition[it];
      }
    }
    this.getTableInfo();
  },
  mounted() {
    window.onresize = () => {
      this.dyHeight = window.innerHeight - 400;
    };
  },
  methods: {
    // 请求表格数据信息
    getTableInfo() {
      var _this = this;
      // 查找资产登记表
      QueryService(this.where, "post", "/DataGate/GetZCRecord", function(data) {
        console.log(data);
        _this.tableData = data.data;
        _this.where.total = data.total;
      });
    },
    // 搜索资产
    search() {
      this.getTableInfo();
    },
    // 添加
    add() {
      // 跳转到资产登记页面
      this.where.CanEdit = true;
      this.where.GobackURI = "zclb";
      this.where.PrimaryKey = 0;
      this.$router.push({
        name: "assetRegister",
        params: { where: this.where }
      });
    },
    // 分享按钮点击事件
    share() {
      var _this = this;
      console.log(this.multipleSelection);
      if (this.multipleSelection.length == 0) {
        this.$message({
          showClose: true,
          message: "您还没有选择资产，不能分享哦！",
          type: "warning"
        });
      } else {
        // 发起请求 this.multipleSelection[i].IID
        let Record = [];
        for (var i = 0; i < this.multipleSelection.length; i++) {
          Record.push({
            IID: 0,
            RecordLSBH: this.multipleSelection[i].LSBH
          });
        }

        let cparams = "data=" + JSON.stringify(Record);
        UpdateService(
          cparams,
          "post",
          "/DataGate/EditModel?model=UniProp_ZCShare",
          function(data) {
            console.log(data);
            if (data.err == "") {
              // 清空选项;
              _this.$refs.multipleTable.clearSelection();
              // 清空选中数据的数组;
              _this.multipleSelection.length = 0;
              _this.$message({
                showClose: true,
                message: "分享资产成功",
                type: "success"
              });
            } else {
              _this.$message({
                message: "操作失败",
                type: "error"
              });
            }
          }
        );
      }
    },
    // 申请验收按钮点击事件
    addCheckList() {
      console.log(this.multipleSelection);
      // 如果用户没有选择
      if (this.multipleSelection.length == 0) {
        this.$message({
          showClose: true,
          message: "您还没有选择资产，不能进行申请验收哦！",
          type: "warning"
        });
      } else {
        // 定义请求的 where 条件
        let zc_records = [];
        let htsum = 0;
        let zcsum = 0;
        let tmpHTBH = "";
        let isSame = true;
        for (var i = 0; i < this.multipleSelection.length; i++) {
          var tmpo = this.multipleSelection[i];
          if (i == 0) {
            tmpHTBH = tmpo.ZC_HTBH;
            htsum = tmpo.ZC_HTJE;
          } else {
            if (tmpo.ZC_HTBH != tmpHTBH) {
              isSame = false;
              break;
            }
          }
          //计算资产总金额
          zcsum += tmpo.ZC_Sum;
          zc_records.push({ IID: tmpo.IID, STATUS: "T1" });
        }

        if (isSame) {
          // 如果合同编号一致，则判断这两个金额是否相等
          console.log(htsum);
          console.log(zcsum);
          if (htsum == zcsum) {
            // 如果两个金额相等则发起请求
            this.commitZCRecord(zc_records);
          } else {
            // 如果两个金额不相等弹窗提示，用户允许提交再发起请求
            this.$confirm(
              "您的合同总金额与资产总金额不相等, 是否继续?",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }
            )
              .then(() => {
                // 发起请求
                this.commitZCRecord(zc_records);
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消申请验收"
                });
              });
          }
        } else {
          // 合同编号不一致
          this.$message({
            showClose: true,
            message: "请选择同一合同的资产记录",
            type: "error"
          });
        }

        // htbhArr.some((value, index)=>{
        //   if(value != htbhArr[0]){
        //     console.log('false')
        //   }else{
        //     console.log('true')
        //   }
        // })
        // 清空选项
        // this.$refs.multipleTable.clearSelection();
        // 清空选中数据的数组
        // this.multipleSelection.length = 0;
      }
    },
    // 发起申请验收的请求
    commitZCRecord(dt) {
      let pms = "data=" + JSON.stringify(dt);
      UpdateService(pms, "post", "/DataGate/Auth_ZCRecord", function(data) {
        console.log(data);
        if (data.err == "") {
          this.$message({
            type: "success",
            message: "申请验收成功!"
          });
        }
      });
    },
    // 格式化table表格状态数据
    getState(row, cellValue) {
      return this.globalVar.getDictName(row.STATUS, "SHST", "ZCSTATUS");
    },
    // 编辑
    edit(scope, edb) {
      this.where.CanEdit = edb;
      this.where.GobackURI = "zclb";
      this.where.PrimaryKey = scope.row.IID;
      this.$router.push({
        name: "assetRegister",
        params: { where: this.where }
      });
    },
    // 删除
    delet(scope) {
      var _this = this;
      this.$confirm("您确定要删除该资产吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let pms = "ids=" + scope.row.IID;
          UpdateService(
            pms,
            "post",
            "/DataGate/DelByIID?model=UniProp_ZCRecord",
            function(data) {
              if (data.err == "") {
                _this.getTableInfo();
                _this.$message({
                  message: "删除成功",
                  type: "success"
                });
              } else {
                _this.$message({
                  message: "操作失败",
                  type: "error"
                });
              }
            }
          );
        })
        .catch(() => {
          // 取消删除
          this.$message({
            type: "info",
            message: "取消删除"
          });
        });
    },
    // 监听表格多选
    changeFun(val) {
      // 将选择的数据保存到 multipleSelection 数组中
      this.multipleSelection = val;
    },
    // 表格数据格式化
    formatter(row, column) {
      // console.log(row)
      return row.isimport === 1 ? "是" : "否";
    },
    // 格式化状态
    formatter2(row, column) {
      // console.log(row)
      return row.state === 1 ? "已审核" : "未审核";
    },
    // 是否禁止表格某行多选
    isCheck(row, index) {
      // console.log(row.STATUS)
      // if (row.STATUS == "T1") {
      //   return false;
      // } else {
      //   return true;
      // }
      return true;
    },
    // 分页——改变每页的显示条数
    handleSizeChange(val) {
      this.where.rows = val;
      this.getTableInfo();
    },
    // 分页——改变页码
    handleCurrentChange(val) {
      this.where.page = val;
      this.getTableInfo();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.attachmentManagement {
  background: #f0f2f5;
  margin-top: 10px;
}
.el-pagination {
  margin-top: 20px;
}
.searchform {
  width: 100%;
  height: 38px;
  padding-top: 0px;
}
.el-button {
  margin-left: 20px;
}
.btn{
  margin-left: 0px;
}
.el-breadcrumb {
  height: 50px;
  line-height: 50px;
}
.breadcrumb {
  padding-left: 20px;
  background: #fff;
}
.tableCard {
  box-shadow: none;
}
.drawerTable {
  margin: 0px auto;
}
.draw {
  z-index: 0;
}
.addcengji {
  z-index: 100;
}
.el-drawer {
  position: relative;
}
.botSubmitBtn {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
}
.el-input {
  max-width: 160px;
}
</style>
