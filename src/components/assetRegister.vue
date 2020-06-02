<template>
  <div class="assetRegister">
    <div class="breadcrumb">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>资产登记</el-breadcrumb-item>
        <!-- <el-breadcrumb-item>登记页</el-breadcrumb-item> -->
      </el-breadcrumb>
    </div>
    <el-card style="margin-top:10px;" shadow="never" class="mainbox">
      <!-- 基本信息 -->
      <el-row>
        <el-col :span="10" class="models">
          基本信息
          <span style="color:red;">（*为必填项）</span>
        </el-col>
      </el-row>
      <!--                   基本信息表单 -->
      <el-form
        :model="UniProp_ZCRecord"
        :rules="rules"
        ref="infoForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <!-- 第一行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="使用人">
              <!-- <el-input v-model="UniProp_ZCRecord.ZC_SYR"></el-input> -->
              <el-autocomplete
                v-model="UniProp_ZCRecord.ZC_SYR"
                :fetch-suggestions="SYRquerySearch"
                placeholder="请输入使用人"
                :trigger-on-focus="false"
                @select="SYRhandleSelect"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.RealName }}</div>
                  <span class="addr">{{ item.Org }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="使用单位" prop="ZC_SYDW">
              <el-input v-model="UniProp_ZCRecord.ZC_SYDW"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="用途" prop="ZC_YT">
              <el-select v-model="UniProp_ZCRecord.ZC_YT" placeholder="请选择用途">
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="item in ytSelectList"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="资产名称" prop="ZC_ZCMC">
              <el-input v-model="UniProp_ZCRecord.ZC_ZCMC"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌/型号" prop="ZC_PPXH">
              <el-input v-model="UniProp_ZCRecord.ZC_PPXH"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="厂家" prop="ZC_CJ">
              <el-input v-model="UniProp_ZCRecord.ZC_CJ"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="数量" prop="ZC_Num">
              <el-input v-model.number="UniProp_ZCRecord.ZC_Num" @keyup.native="calMoney('ZC_Num')"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单价" prop="ZC_Price">
              <el-input
                step="0.01"
                v-model="UniProp_ZCRecord.ZC_Price"
                @keyup.native="calMoney('ZC_Price')"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="金额(元)" prop="ZC_Sum">
              <el-input
                step="0.01"
                v-model="UniProp_ZCRecord.ZC_Sum"
                @keyup.native="calMoney('ZC_Sum')"
                autocomplete="off"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第四行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="是否进口" prop="ZC_SFJK">
              <el-select v-model="UniProp_ZCRecord.ZC_SFJK" placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="国家" prop="ZC_GJ">
              <el-input v-model="UniProp_ZCRecord.ZC_GJ"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否免税" prop="ZC_SFMS">
              <el-select v-model="UniProp_ZCRecord.ZC_SFMS" placeholder="请选择">
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第五行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="购置时间" prop="ZC_GZRQKS">
              <el-row>
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    placeholder="请选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    v-model="UniProp_ZCRecord.ZC_GZRQKS"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="保修期间" prop="ZC_BXRQKS">
              <el-row>
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    placeholder="请选择开始日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    v-model="UniProp_ZCRecord.ZC_BXRQKS"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-col>
                <el-col :span="2" class="line">-</el-col>
                <el-col :span="11">
                  <el-date-picker
                    type="date"
                    placeholder="请选择结束日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    v-model="UniProp_ZCRecord.ZC_BXRQJS"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="存放地点" prop="ZC_CFDD">
              <el-input v-model="UniProp_ZCRecord.ZC_CFDD"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第六行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="项目经费编号" prop="ZC_XMJFBH">
              <el-input v-model="UniProp_ZCRecord.ZC_XMJFBH"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="经费负责人" prop="ZC_JFFZR">
              <el-input v-model="UniProp_ZCRecord.ZC_JFFZR"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>
        <!--                  采购信息 -->
        <el-row>
          <el-col :span="10" class="models">
            采购信息
            <span style="color:red;">（*为必填项）</span>
          </el-col>
        </el-row>
        <!-- 第一行 -->
        <el-row style="margin-top:20px;">
          <el-col :span="8">
            <el-form-item label="合同编号" prop="ZC_HTBH">
              <el-input
                v-model.trim="UniProp_ZCRecord.ZC_HTBH"
                @focus="blurSearch"
                clearable
                :readonly="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同名称" prop="ZC_HTMC">
              <el-input v-model="UniProp_ZCRecord.ZC_HTMC" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="合同金额" prop="ZC_HTJE">
              <el-input v-model="UniProp_ZCRecord.ZC_HTJE" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="签订时间" prop="ZC_QDRQ">
              <el-row>
                <el-col>
                  <el-input v-model="UniProp_ZCRecord.ZC_QDRQ" disabled></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="供应商信息" prop="ZC_GYSXX">
              <el-input v-model="UniProp_ZCRecord.ZC_GYSXX" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发票编号" prop="ZC_FPBH">
              <el-input v-model="UniProp_ZCRecord.ZC_FPBH" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第三行 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label="发票金额" prop="ZC_FPJE">
              <el-input v-model="UniProp_ZCRecord.ZC_FPJE" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备注">
              <el-input v-model="UniProp_ZCRecord.ZC_BZ" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第四行 -->
        <el-row v-show="isCheckHT">
          <el-col :span="8">
            <el-form-item label="电子版合同" prop>
              <a :href="HTFJLooker" target="_blank" title="点击预览" class="ylt">
                <img width="40" height="40" src="../assets/pdf.png" alt />
              </a>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子版发票" prop>
              <a :href="FPFJLooker" target="_blank" title="点击预览" class="ylt">
                <img width="40" height="40" src="../assets/pdf.png" alt />
              </a>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="验收材料" prop>
              <a :href="YSCLFJLooker" target="_blank" title="点击预览" class="ylt">
                <img width="40" height="40" src="../assets/pdf.png" alt />
              </a>
            </el-form-item>
          </el-col>
        </el-row>
        <!--                  图片及文件信息 -->
        <el-row>
          <el-col :span="10" class="models">
            图片及文件信息（手机上传请连校园网）
            <!-- <span style="color:red;">（*为必填项）</span> -->
          </el-col>
        </el-row>
        <!-- 第一行 -->
        <el-row style="margin-top:20px;">
          <el-col :span="12">
            <el-form-item label="实物现场图片" prop>
              <el-row>
                <el-col :span="2">
                  <!-- 图片预览 -->
                  <a :href="imgLooker" target="_blank" title="点击预览" class="ylt" v-show="isShowImg">
                    <img width="40" height="40" src="../assets/img.png" alt />
                  </a>
                </el-col>
                <el-col :span="5">
                  <!-- 图片上传 -->
                  <el-upload
                    :action="uploadURL"
                    :limit="1"
                    :beforeUpload="beforeUpload"
                    :onSuccess="succeedUploadImg"
                    :on-error="uploadImgError"
                    :headers="headerObj"
                    :show-file-list="isShowFillList"
                  >
                    <el-button size="small" icon="el-icon-upload2">点击上传</el-button>
                  </el-upload>
                </el-col>
                <el-col :span="5">
                  <el-button size="small" icon="el-icon-upload2" @click="uploadImg('请扫描二维码上传实物现场图片')">手机上传</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 底部保存按钮 -->
    <div class="footer">
      <el-button type="primary" size="medium" @click="saveMessage">保存</el-button>
      <el-button size="medium" @click="goBack">返回</el-button>
    </div>
    <!-- 选择发票编号的对话框 -->
    <el-dialog
      title="选择发票编号"
      :visible.sync="FPBHDialogVisible"
      width="1000px"
      @close="closedDialog"
    >
      <!-- 搜索条件 -->
      <el-form :model="where" class="searchform" :inline="true" label-width="70px">
        <el-form-item label="合同编号">
          <el-input placeholder="请输入合同编号" v-model="where.HTBH" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" circle @click="searchHT"></el-button>
        </el-form-item>
      </el-form>
      <!-- table列表 -->
      <el-table
        :data="xzfpData"
        border
        highlight-current-row
        @current-change="changeFun"
        height="500"
        max-height="500px"
        :header-cell-style="{'background':'#f2f2f2'}"
      >
        <el-table-column align="center" label width="80">
          <template slot-scope>
            <div class="iconfont icon-radio"></div>
          </template>
        </el-table-column>
        <el-table-column property="HTBH" align="center" label="合同编号"></el-table-column>
        <el-table-column property="FPBH" align="center" label="发票编号"></el-table-column>
        <el-table-column property="HTMC" align="center" label="合同名称"></el-table-column>
        <el-table-column property="HTJE" align="center" label="合同金额"></el-table-column>
        <el-table-column property="QDRQ" align="center" label="签订时间"></el-table-column>
        <el-table-column property="GYSXX" align="center" label="供应商信息"></el-table-column>
        <el-table-column property="FPBH" align="center" label="发票编号"></el-table-column>
        <el-table-column property="FPJE" align="center" label="发票金额"></el-table-column>
        <!-- <el-table-column property="BZ" align="center" label="备注"></el-table-column> -->
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="where.page"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="where.rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="where.total"
      ></el-pagination>
    </el-dialog>
    <!-- 手机扫码上传图片的对话框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="saomaDialogVisible"
      width="30%"
      center
      @close="closedDialog"
    >
      <div class="smsc">
        <img src="../assets/ewm.png" alt />
      </div>
      <p class="dialogTime">
        <span>{{minute}}</span>秒后关闭
      </p>
      <div class="explain">
        <p>扫码后无法打开页面的可能原因：</p>
        <p>1、服务器限制公网访问</p>
        <p>2、手机网络与服务器不在同一网络环境</p>
        <p>3、备注：请使用校园网上传文件</p>
      </div>
      <span slot="footer">
        <el-button type="primary" @click="saomaDialogVisible = false">上传完成</el-button>
        <el-button @click="saomaDialogVisible = false">取消上传</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 引入请求的方法
import { QueryService, UpdateService } from "@/utils/api.js";
import { BizModels } from "@/utils/models.js";
export default {
  name: "AssetRegister",
  data() {
    // 添加手机号的验证规则
    var checkPhone = (rule, value, cb) => {
      const regPhone = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (regPhone.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号"));
    };
    return {
      // 控制手机扫码上传图片的对话框显示与隐藏
      saomaDialogVisible: false,
      // 控制选择发票编号的对话框显示与隐藏
      FPBHDialogVisible: false,
      // 手机扫码上传图片对话框的标题
      dialogTitle: "",
      timer: "",
      // 300秒倒计时
      minute: 300,
      // 资产登记表单字段
      UniProp_ZCRecord: BizModels.UniProp_ZCRecord,
      // 选择发票编号对话框中的表格数据
      xzfpData: [],
      multipleSelection: [],
      // 规则验证
      rules: {
        ZC_SYDW: [
          { required: true, message: "请输入使用单位", trigger: "blur" }
        ],
        ZC_SYR: [
          { required: true, message: "请输入使用人姓名", trigger: "blur" }
        ],
        ZC_SYRSJH: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        ZC_CFDD: [
          { required: true, message: "请输入存放地点", trigger: "blur" }
        ],
        ZC_ZCMC: [
          { required: true, message: "请输入资产名称", trigger: "blur" }
        ],
        ZC_PPXH: [
          { required: true, message: "请输入品牌/型号", trigger: "blur" }
        ],
        ZC_CJ: [{ required: true, message: "请输入厂家名称", trigger: "blur" }],
        ZC_Num: [
          { required: true, message: "请输入数量", trigger: "blur" },
          { type: "number", message: "数量必须为数字类型", trigger: "blur" }
        ],
        ZC_Price: [
          {
            required: true,
            message: "单价为数字类型,最多保留两位小数",
            pattern: /(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,2}$)/,
            trigger: "blur"
          }
        ],
        ZC_Sum: [
          {
            required: true,
            message: "金额为数字类型,最多保留两位小数",
            pattern: /(^[\d]|^[1-9][\d]*)($|[\.][\d]{0,2}$)/,
            trigger: "blur"
          }
        ],
        ZC_SFJK: [
          { required: true, message: "请选择是否进口", trigger: "blur" }
        ],
        ZC_GJ: [{ required: true, message: "请输入国家名称", trigger: "blur" }],
        ZC_SFMS: [
          { required: true, message: "请选择是否免税", trigger: "blur" }
        ],
        ZC_GZRQKS: [
          { required: true, message: "请选择购置日期", trigger: "blur" }
        ],
        ZC_BXRQKS: [
          { required: true, message: "请选择保质期", trigger: "blur" }
        ],
        ZC_XMJFBH: [
          { required: true, message: "请输入项目经费编号", trigger: "blur" }
        ],
        ZC_JFFZR: [
          { required: true, message: "请输入经费负责人", trigger: "blur" }
        ],
        ZC_YT: [{ required: true, message: "请选择用途", trigger: "blur" }],
        ZC_contractName: [
          { required: true, message: "请输入合同名称", trigger: "blur" }
        ],
        ZC_HTBH: [{ required: true, message: "请选择合同编号" }],
        ZC_HTMC: [{ required: true, message: "合同名称不能为空" }],
        ZC_HTJE: [{ required: true, message: "合同金额不能为空" }],
        ZC_QDRQ: [{ required: true, message: "合同签订时间不能为空" }],
        ZC_GYSXX: [{ required: true, message: "供应商信息不能为空" }],
        ZC_FPBH: [{ required: true, message: "发票编号不能为空" }],
        ZC_FPJE: [{ required: true, message: "发票金额不能为空" }]
      },
      // 附件链接地址
      HTFJLooker: "javascript:;",
      FPFJLooker: "javascript:;",
      YSCLFJLooker: "javascript:;",
      // 用途下拉菜单选择项
      ytSelectList: [],
      // 上传组件的请求地址
      uploadURL: this.globalVar.ReqIPAddr + "/Base/Uploader",
      // 上传图片组件的请求头对象
      headerObj: {
        token: this.globalVar.getUserInfoByKey("utoken"),
        openid: this.globalVar.getUserInfoByKey("uid")
      },
      // 控制文件上传进度条的显示与否
      isShowFillList: true,
      // 图片预览地址
      imgLooker: "javascript:;",
      // 控制上传图片是否显示
      isShowImg: false,
      // 合同编号弹出框搜索条件
      where: {
        HTBH: ""
      },
      // 控制附件是否显示
      isCheckHT: false
    };
  },
  created() {
    console.log(this.UniProp_ZCRecord)
    // 继承公共的where
    this.where = this.globalVar.baseWhere(this.where);
    // 获取数据字典
    var dictList = JSON.parse(window.sessionStorage.getItem("dict"));
    for (var i = 0; i < dictList.length; i++) {
      if (
        dictList[i].pid == "ZCusage" &&
        dictList[i].category == "ZCusageCate"
      ) {
        this.ytSelectList.push(dictList[i]);
      }
    }
    // console.log(this.$store.state.UniProp_ZCRecordIID);
    // 从store中获得资产列表页传过来的数据
    if (this.$store.state.UniProp_ZCRecordIID != "") {
      // 发起请求得到需要编辑的这条数据
      var id = this.$store.state.UniProp_ZCRecordIID;
      this.getEditInfo(id);
    } else {
      // 重置UniProp_ZCRecord表单字段
      for (var it in this.UniProp_ZCRecord) {
        if (it == "IID") {
          this.UniProp_ZCRecord[it] = 0;
        } else if (it == "STATUS") {
          this.UniProp_ZCRecord[it] = "T0";
        } else {
          this.UniProp_ZCRecord[it] = "";
        }
      }
    }
  },
  methods: {
    // 使用人输入框的输入选择事件
    SYRquerySearch(queryString, cb) {
      // 查找资产登记表
      QueryService(
        { uname: queryString },
        "post",
        "/DataGate/GetUserByName",
        function(data) {
          if (data.length > 0) {
            cb(data);
          }
        }
      );
    },
    // 使用人输入框选择事件
    SYRhandleSelect(item) {
      console.log(item);
      this.UniProp_ZCRecord.ZC_SYR = item.RealName;
      // console.log(this.UniProp_ZCRecord.ZC_SYR);
      this.UniProp_ZCRecord.ZC_SYRSJH = item.UserOpenID;
    },
    // 图片上传组件 上传前的预处理
    beforeUpload(file) {
      var ext = file.name
        .substring(file.name.lastIndexOf(".") + 1)
        .toLowerCase();
      const sizeOver = file.size / 1024 / 1024 > 30;

      if (
        !(ext === "png" || ext === "gif" || ext === "jpg" || ext === "jpeg")
      ) {
        this.$message({
          message: "请上传格式以.png, .gif, .jpg, .peg结尾的图片!",
          type: "warning"
        });
        return false;
      }
      if (sizeOver) {
        this.$message({
          message: "图片大小不能超过 30MB!",
          type: "warning"
        });
        return false;
      }
    },
    // 实物现场照片上传成功时的回调
    succeedUploadImg(response, file, fileList) {
      console.log(response);
      if (response.err == "") {
        this.UniProp_ZCRecord.FJ_SWXCZP = response.fn;
        // 得到预览服务器地址
        this.getImgLink("FJ_SWXCZP");
        // 显示预览图片
        this.isShowImg = true;
        // 隐藏进度条
        this.isShowFillList = false;
        this.$message({
          type: "success",
          message: "图片上传成功"
        });
      }
    },
    // 实物现场照片上传失败时的回调
    uploadImgError(err, file, fileList) {
      console.log(err);
      this.$notify.error({
        title: "错误",
        message: `文件上传失败`
      });
    },
    // 根据资产列表页传过来的 IID 查找数据库
    getEditInfo(id) {
      var _this = this;
      let pms = "IID=" + id;
      // 查找资产登记表
      UpdateService(
        pms,
        "post",
        "/DataGate/GetModel?model=UniProp_ZCRecord",
        function(data) {
          // console.log(data);
          // 按需赋值
          for (var it in _this.UniProp_ZCRecord) {
            _this.UniProp_ZCRecord[it] = data[it];
          }
          // 如果有附件就显示附件
          if (data.FJ_HTFJ && data.FJ_FPFJ) {
            // 显示附件
            _this.isCheckHT = true;
            // 给附件的服务器链接地址赋值
            _this.HTFJLooker =
              _this.globalVar.ReqIPAddr +
              _this.globalVar.FileRoot +
              data.FJ_HTFJ.split("$")[0];
            _this.FPFJLooker =
              _this.globalVar.ReqIPAddr +
              _this.globalVar.FileRoot +
              data.FJ_FPFJ.split("$")[0];
          }
          // 如果有照片就显示照片
          if (data.FJ_SWXCZP) {
            _this.isShowImg = true;
            _this.imgLooker =
              _this.globalVar.ReqIPAddr +
              _this.globalVar.FileRoot +
              data.FJ_SWXCZP.split("$")[0];
          }
        }
      );
    },
    // 根据资产列表页传过来的 LSBH 查找数据库
    getCgxxInfo(val) {
      var _this = this;
      let pms = "LSBH=" + val;
      // 查找资产登记表
      UpdateService(pms, "post", "/DataGate/GetFJModel", function(data) {
        console.log(data);
        // 按需赋值
        for (var it in _this.UniProp_ZCRecord) {
          _this.UniProp_ZCRecord[it] = data[it];
        }
        // 处理附件的服务器路径地址
        var filePath;
        for (var i in data) {
          if (i == "HTFJ") {
            filePath =
              _this.globalVar.ReqIPAddr +
              _this.globalVar.FileRoot +
              data.HTFJ.split("$")[0];
            _this.HTFJLooker = filePath;
          }
          if (i == "FPFJ") {
            filePath =
              _this.globalVar.ReqIPAddr +
              _this.globalVar.FileRoot +
              data.FPFJ.split("$")[0];
            _this.FPFJLooker = filePath;
          }
          // 还有一个验收材料的链接地址没有处理
        }
      });
    },
    // 底部保存按钮点击事件
    saveMessage() {
      var _this = this;
      console.log(this.UniProp_ZCRecord);
      // 处理基本信息表单预校验
      this.$refs["infoForm"].validate(valid => {
        if (valid) {
          // 预校验成功，然后发起请求
          console.log(this.UniProp_ZCRecord);
          let pms = "data=" + JSON.stringify(_this.UniProp_ZCRecord);
          UpdateService(
            pms,
            "post",
            "/DataGate/EditModel?model=UniProp_ZCRecord",
            function(data) {
              console.log(data);
              if (data.err == "") {
                // 初始化表单
                for (var it in _this.UniProp_ZCRecord) {
                  if (it == "IID") {
                    _this.UniProp_ZCRecord[it] = 0;
                  } else if (it == "STATUS") {
                    _this.UniProp_ZCRecord[it] = "0";
                  } else {
                    _this.UniProp_ZCRecord[it] = "";
                  }
                }
                _this.$message({
                  message: "保存成功",
                  type: "success"
                });
                // 返回列表页
                _this.goBack();
              } else {
                _this.$message({
                  message: "操作失败",
                  type: "error"
                });
              }
            }
          );
        } else {
          // 预校验失败
          _this.$message({
            message: "请保证信息填写正确！",
            type: "error"
          });
        }
      });
    },
    // 底部返回按钮点击事件
    goBack() {
      this.$router.push("/zclb");
    },
    // 监听合同编号输入框点击事件
    blurSearch() {
      var _this = this;
      _this.FPBHDialogVisible = true;
      this.getTableInfo();
    },
    // 监听表格选择事件
    changeFun(val) {
      console.log(val);
      if (val != null) {
        // 按需赋值
        this.UniProp_ZCRecord.FJ_HTFJ = val.HTFJ;
        this.UniProp_ZCRecord.FJ_FPFJ = val.FPFJ;
        this.UniProp_ZCRecord.ZC_HTBH = val.HTBH;
        this.UniProp_ZCRecord.ZC_HTMC = val.HTMC;
        this.UniProp_ZCRecord.ZC_HTJE = val.HTJE;
        this.UniProp_ZCRecord.ZC_QDRQ = val.QDRQ;
        this.UniProp_ZCRecord.ZC_GYSXX = val.GYSXX;
        this.UniProp_ZCRecord.ZC_FPBH = val.FPBH;
        this.UniProp_ZCRecord.ZC_FPJE = val.FPJE;
        this.UniProp_ZCRecord.ZC_QDSJKS = val.QDSJKS;
        // 给附件的服务器链接地址赋值
        this.HTFJLooker =
          this.globalVar.ReqIPAddr +
          this.globalVar.FileRoot +
          this.UniProp_ZCRecord.FJ_HTFJ.split("$")[0];
        this.FPFJLooker =
          this.globalVar.ReqIPAddr +
          this.globalVar.FileRoot +
          this.UniProp_ZCRecord.FJ_FPFJ.split("$")[0];
        // 还有一个验收材料的链接地址没有处理
        this.FPBHDialogVisible = false;
        this.isCheckHT = true;
      }
    },
    // 处理 img 预览路径    参数p是key
    getImgLink(p) {
      var filePath;
      if (this.UniProp_ZCRecord[p] != null) {
        filePath =
          this.globalVar.ReqIPAddr +
          this.globalVar.FileRoot +
          this.UniProp_ZCRecord[p].split("$")[0];
        this.imgLooker = filePath;
      }
      // return filePath;
    },
    // 手机上传按钮点击事件
    uploadImg(title) {
      this.minute = 300;
      var _this = this;
      this.saomaDialogVisible = true;
      this.dialogTitle = title;
      this.timer = setInterval(function() {
        _this.minute--;
        if (_this.minute <= 0) {
          clearInterval(_this.timer);
          _this.saomaDialogVisible = false;
        }
      }, 1000);
    },
    // 监听对话框关闭事件
    closedDialog() {
      clearInterval(this.timer);
    },
    // 单价、数量、金额联动
    calMoney(n) {
      let rv = this.UniProp_ZCRecord[n];
      if (rv != "" && !isNaN(rv)) {
        let curnum = this.UniProp_ZCRecord.ZC_Num;
        let curprice = this.UniProp_ZCRecord.ZC_Price;
        let cursum = this.UniProp_ZCRecord.ZC_Sum;
        switch (n) {
          case "ZC_Num":
            if (curprice != "" && !isNaN(curprice)) {
              this.UniProp_ZCRecord.ZC_Sum = (curprice * curnum).toFixed(2);
            }
            break;
          case "ZC_Price":
            if (curnum != "" && !isNaN(curnum)) {
              this.UniProp_ZCRecord.ZC_Sum = (curprice * curnum).toFixed(2);
            }
            break;
          case "ZC_Sum":
            if (curnum != "" && !isNaN(curnum)) {
              this.UniProp_ZCRecord.ZC_Price = parseInt(cursum / curnum);
            }
            break;
        }
      } else {
        this.UniProp_ZCRecord[n] = "";
      }
    },
    // 请求表格数据信息
    getTableInfo() {
      var _this = this;
      QueryService(this.where, "post", "/DataGate/GetFJ", function(data) {
        console.log(data);
        _this.xzfpData = data.data;
        _this.where.total = data.total;
      });
    },
    // 搜索合同
    searchHT() {
      this.getTableInfo();
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
.assetRegister {
  background: #f0f2f5;
  margin-top: 10px;
  position: relative;
}
.demo-ruleForm {
  margin-top: 20px;
}
.line {
  text-align: center;
}
.models {
  font-weight: bold;
}
.smsc {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
.smsc img {
  width: 100%;
}
.dialogTime {
  margin: 10px auto;
  text-align: center;
}
.dialogTime span {
  color: red;
}
.explain {
  color: red;
}
.el-breadcrumb {
  height: 50px;
  line-height: 50px;
}
.breadcrumb {
  padding-left: 20px;
  background: #fff;
}
.mainbox {
  margin-bottom: 80px;
}
.footer {
  width: 100%;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border-top: 1px solid #eeeeee;
  background: #fff;
  position: fixed;
  left: 0px;
  bottom: 0px;
}
.dialog-footer {
  display: flex;
  justify-content: center;
}
.el-icon-help {
  font-size: 20px;
  cursor: pointer;
}
.el-table__body tr:hover .iconfont {
  color: #5cb6ff;
}
.el-autocomplete-suggestion li {
  line-height: normal !important;
}

.name {
  text-overflow: ellipsis;
  overflow: hidden;
}

.addr {
  font-size: 12px;
  color: #b4b4b4;
}

.highlighted .addr {
  color: #ddd;
}

.el-autocomplete{
  width: 100%;
}
</style>
