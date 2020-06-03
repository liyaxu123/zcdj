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
      <div>
        <el-alert title="在这里您可以查看朋友分享的资产，也可以查看您分享的资产哦！" center type="info" show-icon></el-alert>
      </div>
      <el-row>
        <el-col :span="3" :offset="21"></el-col>
      </el-row>
      <h2 class="a1" style="margin-top:20px">查找朋友分享的资产</h2>
      <!-- <h3 class="a1" style="margin-top:20px">“资产分享”目前公测中，在安装朋友分享的资产前，请务必先备份</h3> -->
      <div class="searchBox" style="margin-top:30px">
        <el-input
          placeholder="请输入分享码，查找朋友的分享"
          prefix-icon="el-icon-search"
          v-model="where.ShareCode"
          clearable
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="queryData">查找</el-button>
      </div>
      <!-- <h3 class="a1" style="margin-top:50px;">我的分享</h3> -->
      <!-- 分享内容 -->
      <div class="contentBox">
        <div
          class="ttbox"
          v-for="(item) in myShareList"
          :key="item.id"
        >
          <el-card class="contentCard">
            <div @click="toShareList(item.LSBH)">
              <div class="pp" slot="header">
                <span class="bood">合同名称：{{item.ZC_HTMC}}</span>
              </div>
              <p class="pp">合同金额：{{item.ZC_HTJE}}万元</p>
              <p class="pp">发票金额：{{item.ZC_FPJE}}万元</p>
              <p class="pp">供应商信息：{{item.ZC_GYSXX}}</p>
              <p class="pp">使用人：{{item.ZC_SYR}}</p>
              <div class="imgBox">
                <div class="imgbox2" v-for="(item2,index) in item.SWXCZPCollection" :key="index">
                  <img :src="item2" />
                </div>
              </div>
            </div>
            <el-row>
              <p class="pp">资产清单：{{item.ZXCount}}个</p>
            </el-row>
            <el-row>
              <p class="pp">分享码：{{item.ShareCode}}</p>
            </el-row>
          </el-card>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { QueryService, UpdateService } from "@/utils/api.js";
export default {
  data() {
    return {
      myShareList: [],
      ZCCache: [],
      where: { ShareCode: "" }
    };
  },
  created() {
    this.where = this.globalVar.baseWhere(this.where);
    this.queryData();
  },
  methods: {
    queryData() {
      var _this = this;
      // 查找资产分享表
      QueryService(this.where, "post", "/DataGate/GetZCShare", function(data) {
        // console.log(data);
        _this.ZCCache = data.sdata;

        for (var i = 0; i < data.mdata.data.length; i++) {
          let mobj = data.mdata.data[i];
          //初始化视图属性
          mobj.SWXCZPCollection = [];
          mobj.ZXCount = 0;

          for (var j = 0; j < _this.ZCCache.length; j++) {
            let sobj = _this.ZCCache[j];

            if (mobj.LSBH == sobj.ShareLSBH) {
              if (mobj.ZC_HTMC == undefined) {
                mobj.ZC_HTMC = sobj.ZC_HTMC;
                mobj.ZC_HTJE = sobj.ZC_HTJE;
                mobj.ZC_FPJE = sobj.ZC_FPJE;
                mobj.ZC_GYSXX = sobj.ZC_GYSXX;
                mobj.ZC_SYR = sobj.ZC_SYR;
              }
              //实物照片
              let imgUrl =
                _this.globalVar.ReqIPAddr +
                _this.globalVar.FileRoot +
                sobj.FJ_SWXCZP.split("$")[0];
              if (mobj.SWXCZPCollection.length < 5) {
                mobj.SWXCZPCollection.push(imgUrl);
              }
              mobj.ZXCount += 1;
            }
          }
        }
        // data.mdata.data[0].SWXCZPCollection.push(
        //   "http://172.23.55.69:8015/upload/2020/05/29/9a0e58b6-a3db-4b0c-bc8e-01771228990e.jpg"
        // );
        // data.mdata.data[0].SWXCZPCollection.push(
        //   "http://172.23.55.69:8015/upload/2020/05/29/9a0e58b6-a3db-4b0c-bc8e-01771228990e.jpg"
        // );
        // data.mdata.data[0].SWXCZPCollection.push(
        //   "http://172.23.55.69:8015/upload/2020/05/29/07ca8c26-cd98-45d8-8557-81606e5bdec4.png"
        // );
        _this.myShareList = data.mdata.data;
        _this.where.total = data.mdata.total;
        // console.log(_this.myShareList);
      });
    },
    toShareList(shareLSBH) {
      let ZCList = [];
      for (var j = 0; j < this.ZCCache.length; j++) {
        let sobj = this.ZCCache[j];
        if (shareLSBH == sobj.ShareLSBH) {
          ZCList.push(sobj);
        }
      }
      window.sessionStorage.setItem("SharedZCList", JSON.stringify(ZCList));
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
  margin-top: 50px;
}
.contentBox:hover {
  cursor: pointer;
}
.ttbox {
  width: 46%;
  margin-top: 20px;
}
.contentCard {
  width: 100%;
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
  width: 100%;
  height: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: flex-start;
  /* padding-bottom: 10px; */
  border-bottom: 2px solid #ebedf1;
  overflow: hidden;
}
.imgBox .imgbox2 {
  width: 19%;
  height: 100%;
  margin-left: 1%;
}
.imgbox2 img {
  width: 100%;
  height: 80%;
  /* margin-left: 1%; */
}
.imgBox .imgbox2:nth-child(1) {
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
.el-alert {
  color: #5ab1ef;
  background: #e7f7ff;
}
.pp {
  height: 30px;
  line-height: 30px;
}
</style>