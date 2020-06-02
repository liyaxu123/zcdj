<template>
  <div class="share">
    <div class="breadcrumb">
      <!-- 面包屑导航 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>资产分享</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card style="margin-top:10px;">
      <!-- 信息提示 -->
      <el-alert
        title="我就是爱分享查找朋友分享的资产"
        center
        type="success"
        description="文字说明文字说明文字说明文字说明"
        show-icon
      ></el-alert>
      <el-row>
        <el-col :span="3" :offset="21">
          <el-row>
            <el-col :span="11" class="a1">
              <el-link icon="el-icon-search" :underline="false">查找资产</el-link>
            </el-col>
            <el-col :span="2" class="a1">|</el-col>
            <el-col :span="11" class="a1">
              <el-link icon="el-icon-user-solid" :underline="false" @click="myshare">我的分享</el-link>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <h2 class="a1" style="margin-top:20px">查找朋友分享的资产</h2>
      <h3 class="a1" style="margin-top:20px">“资产分享”目前公测中，在安装朋友分享的资产前，请务必先备份</h3>
      <div class="searchBox" style="margin-top:30px">
        <el-input
          placeholder="请输入分享码，查找朋友的分享"
          prefix-icon="el-icon-search"
          v-model="searchInfo"
          clearable
        ></el-input>
        <el-button type="primary" icon="el-icon-search">查找</el-button>
      </div>
      <h3 class="a1" style="margin-top:50px;">我的资产</h3>
      <!-- 分享内容 -->
      <div class="contentBox">
        <el-card class="contentCard" v-for="item in contentCardList" :key="item.id">
          <div slot="header">
            <span class="bood">{{item.title}}</span>
          </div>
          <p>合同金额：{{item.HTJE}}万元</p>
          <p>发票金额：{{item.FPJE}}万元</p>
          <p>供应商信息：{{item.GYSXX}}</p>
          <p>使用人：{{item.SYY}}</p>
          <div class="imgBox">
            <img v-for="item2 in item.imglist" :key="item2.id" :src="item2.src" />
          </div>
          <el-row>
            <p>资产清单：{{item.cjqd}}个</p>
          </el-row>
          <el-row>
            <p>分享码：{{item.shareCode}}</p>
          </el-row>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInfo: "",
      contentCardList: [
        {
          id: 1,
          title: "合同名称1",
          HTJE: "243",
          FPJE: "256",
          GYSXX: "最强华为",
          SYY: "任正非",
          cjqd: 22,
          imglist: [
            { id: 1, src: require("@/assets/1.jpg") },
            { id: 2, src: require("@/assets/1.jpg") },
            { id: 3, src: require("@/assets/1.jpg") },
            { id: 4, src: require("@/assets/1.jpg") },
            { id: 5, src: require("@/assets/1.jpg") }
          ],
          shareCode: "11565ajsdlsajdsadaslajasl12kjdslajkd"
        },
        {
          id: 2,
          title: "合同名称2",
          HTJE: "243",
          FPJE: "256",
          GYSXX: "阿里巴巴",
          SYY: "马云",
          cjqd: 22,
          imglist: [
            { id: 1, src: require("@/assets/1.jpg") },
            { id: 2, src: require("@/assets/1.jpg") },
            { id: 3, src: require("@/assets/1.jpg") },
            { id: 4, src: require("@/assets/1.jpg") },
            { id: 5, src: require("@/assets/1.jpg") }
          ],
          shareCode: "11565ajsdlsajdsadaslajasl12kjdslajkd"
        },{
          id: 3,
          title: "合同名称3",
          HTJE: "243",
          FPJE: "256",
          GYSXX: "腾讯科技",
          SYY: "马蛋腾",
          cjqd: 22,
          imglist: [
            { id: 1, src: require("@/assets/1.jpg") },
            { id: 2, src: require("@/assets/1.jpg") },
            { id: 3, src: require("@/assets/1.jpg") },
            { id: 4, src: require("@/assets/1.jpg") },
            { id: 5, src: require("@/assets/1.jpg") }
          ],
          shareCode: "11565ajsdlsajdsadaslajasl12kjdslajkd"
        }
      ]
    };
  },
  methods: {
    myshare() {
      this.$router.push("/myshare");
    }
  }
};
</script>

<style lang="css" scoped>
.share {
  background: #f0f2f5;
  margin-top: 10px;
}
.a1 {
  text-align: center;
}
h3 {
  color: #8f9298;
}
.searchBox {
  display: flex;
  justify-content: center;
}
.searchBox > .el-input {
  width: 35%;
}
.searchBox > .el-button {
  margin-left: 20px;
}
.contentBox {
  width: 90%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-left: 5%;
}
.contentBox:hover {
  cursor: pointer;
}
.contentCard {
  width: 46%;
  margin-top: 20px;
}
.bood {
  font-weight: bold;
}
.contentCard p {
  margin: 0;
  width: 100%;
  max-height: 84px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
.imgBox {
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  border-bottom: 2px solid #ebedf1;
}
.imgBox img {
  width: 19%;
}
.el-breadcrumb {
  height: 50px;
  line-height: 50px;
}
.breadcrumb {
  padding-left: 20px;
  background: #fff;
}
.el-alert {
  /* color: #5ab1ef; */
  background: #e1eef8;
}
</style>