<template>
  <el-row>
    <el-col :span="8" v-if="isShowFJ">
      <div class="avatar-uploader">
        <img width="80" height="80" src="@/assets/pdf.png" alt />
        <!-- 预览删除遮罩 -->
        <div class="mask">
          <a :href="FJLooker" target="_blank" title="点击预览">
            <i class="el-icon-zoom-in"></i>
          </a>
          <!-- 删除重新上传 -->
          <i class="el-icon-delete" @click="removeFile"></i>
        </div>
      </div>
    </el-col>
    <el-col :span="8" v-else>
      <el-upload
        class="avatar-uploader"
        :action="uploadURL"
        :beforeUpload="beforeUpload"
        :onSuccess="succeedUpload"
        :on-error="uploadError"
        :headers="headerObj"
        :show-file-list="false"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
    </el-col>
  </el-row>
</template>

<script>
import { showLoading, hideLoading } from "@/loading.js";
export default {
  name: "UC_FileUploder",
  props: {
    FJContent: { type: String, default: "" },
    ext: { type: String, default: "" },
    canShow: { type: Boolean, default: false }
  },
  data() {
    return {
      // 上传组件的请求头对象
      // 上传组件的请求头对象
      headerObj: {
        token: this.globalVar.getUserInfoByKey("utoken"),
        openid: this.globalVar.getUserInfoByKey("uid")
      },
      // 上传组件的请求地址
      uploadURL: this.globalVar.ReqIPAddr + "/Base/Uploader",
      // 控制是否可以查看附件
      isShowFJ: this.canShow,
      FJLooker:
        this.globalVar.ReqIPAddr + this.globalVar.FileRoot + this.FJContent.split('$')[0]
    };
  },
  created() {
    //   console.log(this)
  },
  //   computed: {
  //     getFJLooker() {
  //             console.log(this.FJContent)
  //       if (this.FJContent != "") {
  //         this.isShowFJ = true;
  //         this.globalVar.ReqIPAddr + this.globalVar.FileRoot + this.FJContent;
  //       }
  //       return FJLooker;
  //     }
  //   },
  methods: {
    // 上传组件 上传前的预处理
    beforeUpload(file) {
      var ext = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
      const sizeOver = file.size / 1024 / 1024 > 30;
      if (ext != this.$props.ext) {
        this.$message({
          message: "只能上传" + this.$props.ext + "格式!",
          type: "warning"
        });
        return false;
      }
      if (sizeOver) {
        this.$message({
          message: "文件不能超过 30MB!",
          type: "warning"
        });
        return false;
      }
      // 开启加载动画
      showLoading();
    },
    // 电子合同上传成功时的回调
    succeedUpload(response, file, fileList) {
      if (response.err == "") {
        this.FJLooker =
          this.globalVar.ReqIPAddr +
          this.globalVar.FileRoot +
          response.fn.split("$")[0];
        this.isShowFJ = true;
        hideLoading(); //结束加载动画
        this.$message({
          type: "success",
          message: "文件上传成功"
        });
      }
    },
    // 文件上传失败时的回调
    uploadError(err, file, fileList) {
      // console.log(err);
      hideLoading(); //结束加载动画
      this.$message({
        type: "error",
        message: "文件上传失败，请重新上传"
      });
    },
    // 预览遮罩层删除事件
    removeFile() {
      this.isShowFJ = false;
    },
    getFileLink(p) {}
  }
};
</script>

<style lang="css" scoped>
/* 上传组件样式 */
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.el-icon-plus {
  font-size: 30px;
  color: #8c939d;
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
/* 预览遮罩 */
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  display: none;
}
.mask i {
  font-size: 20px;
  color: white;
}
.el-icon-delete {
  margin-top: -5px;
}
.avatar-uploader:hover .mask {
  display: block;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>