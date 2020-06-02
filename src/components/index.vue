<template>
  <div class="index">
    <div>
      <div class="wrapbox">
        <div class="mainbox">
          <el-row :gutter="40" class="panel-group">
            <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col" v-if="isShowHTGL">
              <!-- 合同管理 -->
              <div @click="htgl" class="mainboxItem">
                <div class="optionCard opcard1" shadow="hover" ref="optionCard1">
                  <div class="imgbox">
                    <i class="iconfont icon-jurassic_form"></i>
                  </div>
                  <div class="pbox">
                    <p>合同管理</p>
                    <p>102,400</p>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col" v-if="isShowZCDJ">
              <!-- 资产登记 -->
              <div @click="zclb" class="mainboxItem">
                <div class="optionCard opcard3" shadow="hover" ref="optionCard2">
                  <div class="imgbox">
                    <i class="iconfont icon-catalog"></i>
                  </div>
                  <div class="pbox">
                    <p>资产登记</p>
                    <p>102,400</p>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col" v-if="isShowZCYS">
              <!-- 资产验收 -->
              <div @click="shys" class="mainboxItem">
                <div class="optionCard opcard5" shadow="hover" ref="optionCard3">
                  <div class="imgbox">
                    <i class="iconfont icon-money"></i>
                  </div>
                  <div class="pbox">
                    <p>资产验收</p>
                    <p>102,400</p>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col" v-if="isShowWDZC">
              <!-- 我的资产 -->
              <div @click="wdzc" class="mainboxItem">
                <div class="optionCard opcard2" shadow="hover" ref="optionCard4">
                  <div class="imgbox">
                    <i class="iconfont icon-form"></i>
                  </div>
                  <div class="pbox">
                    <p>我的资产</p>
                    <p>102,400</p>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col" v-if="isShowZCFX">
              <!-- 资产分享 -->
              <div @click="wdfx" class="mainboxItem">
                <div class="optionCard opcard4" shadow="hover" ref="optionCard5">
                  <div class="imgbox">
                    <i class="iconfont icon-fenxiang"></i>
                  </div>
                  <div class="pbox">
                    <p>资产分享</p>
                    <p>102,400</p>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col" v-if="isShowZCFX">
              <!-- 统计分析 -->
              <div @click="wdfx" class="mainboxItem">
                <div class="optionCard opcard6" shadow="hover" ref="optionCard6">
                  <div class="imgbox">
                    <i class="iconfont icon-tongji"></i>
                  </div>
                  <div class="pbox">
                    <p>统计分析</p>
                    <p>102,400</p>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <!-- echarts -->
          <div class="echartsBox">
            <div id="tu1" style="width: 100%;height:400px;"></div>
          </div>
          <div class="echartsBox2">
            <el-row style="width:100%;">
              <el-col :xs="24" :sm="24" :lg="8" class="charts1">
                <div class="minitu">
                  <div id="tu2" style="width: 100%;height:100%;"></div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="8" class="charts2" style>
                <div class="minitu">
                  <div id="tu3" style="width: 100%;height:100%;"></div>
                </div>
              </el-col>
              <el-col :xs="24" :sm="24" :lg="8" class="charts3">
                <div class="minitu">
                  <div id="tu4" style="width: 100%;height:100%;"></div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 指定图表的配置项和数据
let option1 = {
  title: {
    // text: "堆叠区域图"
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985"
      }
    }
  },
  legend: {
    data: ["登记数", "分享数"]
  },
  toolbox: {},
  grid: {
    left: 10,
    right: 10,
    bottom: 20,
    top: 30,
    containLabel: true
  },
  color: ["#81b22f", "#f3d71c", "#f4b9a9"],
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
    }
  ],
  yAxis: [
    {
      type: "value",
      splitArea: {
        show: true,
        areaStyle: {
          color: ["rgba(255,255,255,0.3)", "rgba(241,241,241,0.3)"]
        }
      }
    }
  ],
  series: [
    {
      name: "分享数",
      type: "line",
      stack: "总量",
      animationEasing: "quadraticOut",
      label: {
        normal: {
          // show: true,
          position: "top"
        }
      },
      itemStyle: {
        normal: {
          color: "#3888fa",
          lineStyle: {
            color: "#3888fa",
            width: 2
          },
          areaStyle: {
            color: "#f3f8ff"
          }
        }
      },
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      animationDuration: 2800,
      animationEasing: "cubicInOut"
    },
    {
      name: "登记数",
      type: "line",
      stack: "总量",
      itemStyle: {
        normal: {
          color: "#FF005A",
          lineStyle: {
            color: "#FF005A",
            width: 2
          }
        }
      },
      data: [350, 432, 601, 554, 390, 430, 410],
      animationDuration: 2800,
      animationEasing: "cubicInOut"
    }
  ]
};
// 指定图表的配置项和数据
let option2 = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  radar: {
    radius: "66%",
    center: ["50%", "42%"],
    splitNumber: 8,
    splitArea: {
      areaStyle: {
        color: "rgba(127,95,132,.3)",
        opacity: 1,
        shadowBlur: 45,
        shadowColor: "rgba(0,0,0,.5)",
        shadowOffsetX: 0,
        shadowOffsetY: 15
      }
    },
    indicator: [
      { name: "Sales", max: 10000 },
      { name: "Administration", max: 20000 },
      { name: "Information Technology", max: 20000 },
      { name: "Customer Support", max: 20000 },
      { name: "Development", max: 20000 },
      { name: "Marketing", max: 20000 }
    ]
  },
  legend: {
    left: "center",
    bottom: "10",
    data: ["Allocated Budget", "Expected Spending", "Actual Spending"]
  },
  series: [
    {
      type: "radar",
      symbolSize: 0,
      areaStyle: {
        normal: {
          shadowBlur: 13,
          shadowColor: "rgba(0,0,0,.2)",
          shadowOffsetX: 0,
          shadowOffsetY: 10,
          opacity: 1
        }
      },
      data: [
        {
          value: [5000, 7000, 12000, 11000, 15000, 14000],
          name: "Allocated Budget",
          itemStyle: {
            normal: {
              color: "#2ec7c9",
              areaStyle: {
                type: "default",
                // opacity: 0.8, // 图表中各个图区域的透明度
                color: "#5ab1ef" // 图表中各个图区域的颜色
              }
            }
          }
        },
        {
          value: [4000, 9000, 15000, 15000, 13000, 11000],
          itemStyle: {
            normal: {
              color: "#b6a2de"
              // areaStyle: {
              //   type: "default",
              //   // opacity: 0.8, // 图表中各个图区域的透明度
              //   color: "#b6a2de" // 图表中各个图区域的颜色
              // }
            }
          },
          name: "Expected Spending"
        },
        {
          value: [5500, 11000, 12000, 15000, 12000, 12000],
          name: "Actual Spending",
          itemStyle: {
            normal: {
              color: "#5ab1ef",
              areaStyle: {
                type: "default",
                // opacity: 0.8, // 图表中各个图区域的透明度
                color: "#2ec7c9" // 图表中各个图区域的颜色
              }
            }
          }
        }
      ],
      animationDuration: 3000
    }
  ]
};
let option3 = {
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    left: "center",
    bottom: "10",
    data: ["Industries", "Technology", "Forex", "Gold", "Forecasts"]
  },
  series: [
    {
      name: "WEEKLY WRITE ARTICLES",
      type: "pie",
      roseType: "radius",
      radius: [15, 95],
      center: ["50%", "38%"],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80"],
      data: [
        { value: 320, name: "Industries" },
        { value: 240, name: "Technology" },
        { value: 149, name: "Forex" },
        { value: 100, name: "Gold" },
        { value: 59, name: "Forecasts" }
      ],
      animationEasing: "cubicInOut",
      animationDuration: 2600
    }
  ]
};
let option4 = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  // backgroundColor: {},
  grid: {
    top: 10,
    left: "2%",
    right: "2%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisTick: {
        alignWithLabel: true
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      axisTick: {
        show: false
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ["rgba(255,255,255,0.3)", "rgba(241,241,241,0.3)"]
        }
      }
    }
  ],
  series: [
    {
      name: "pageA",
      type: "bar",
      stack: "vistors",
      barWidth: "60%",
      itemStyle: {
        normal: {
          color: "#2ec7c9"
        }
      },
      data: [79, 52, 200, 334, 390, 330, 220],
      animationDuration: 6000
    },
    {
      name: "pageB",
      type: "bar",
      stack: "vistors",
      barWidth: "60%",
      itemStyle: {
        normal: {
          color: "#b6a2de"
        }
      },
      data: [80, 52, 200, 334, 390, 330, 220],
      animationDuration: 6000
    },
    {
      name: "pageC",
      type: "bar",
      stack: "vistors",
      barWidth: "60%",
      itemStyle: {
        normal: {
          color: "#1e9fff"
        }
      },
      data: [30, 52, 200, 334, 390, 330, 220],
      animationDuration: 6000
    }
  ]
};
export default {
  name: "index",
  data() {
    return {
      // 合同管理
      isShowHTGL: false,
      // 资产登记
      isShowZCDJ: false,
      // 资产验收
      isShowZCYS: false,
      // 我的资产
      isShowWDZC: false,
      // 资产分享
      isShowZCFX: false,
      uroleID: ""
    };
  },
  mounted() {
    this.drawChart();
  },
  created() {
    // 得到用户角色ID
    // const urole = window.sessionStorage.getItem("urole");
    const urole = this.globalVar.getUserInfoByKey("urole");
    this.uroleID = urole;
    if (urole == 0) {
      // 登记人
      this.isShowHTGL = true;
      this.isShowZCDJ = true;
      this.isShowZCFX = true;
    } else if (urole == 1) {
      // 使用人
      this.isShowHTGL = true;
      this.isShowZCDJ = true;
      this.isShowWDZC = true;
      this.isShowZCFX = true;
    } else {
      // 验收人
      this.isShowHTGL = true;
      this.isShowZCDJ = true;
      this.isShowZCYS = true;
      this.isShowWDZC = true;
      this.isShowZCFX = true;
    }
  },
  methods: {
    zcdj() {
      this.$router.push("/assetRegister");
    },
    zclb() {
      this.$router.push("/zclb");
    },
    htgl() {
      this.$router.push("/attachmentManagement");
    },
    wdzc() {
      this.$router.push("/wdzc");
    },
    wdfx() {
      this.$router.push("/share");
    },
    sjzd() {
      this.$router.push("/DD");
    },
    shys() {
      this.$router.push("/shys");
    },
    // 绘制图表
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById("tu1"));
      let myChart2 = this.$echarts.init(document.getElementById("tu2"));
      let myChart3 = this.$echarts.init(document.getElementById("tu3"));
      let myChart4 = this.$echarts.init(document.getElementById("tu4"));
      // 使用刚指定的配置项和数据显示图表。
      myChart1.setOption(option1);
      myChart2.setOption(option2);
      myChart3.setOption(option3);
      myChart4.setOption(option4);
      // 自适应屏幕
      window.onresize = function() {
        myChart1.resize();
        myChart2.resize();
        myChart3.resize();
        myChart4.resize();
      };
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index {
  background: #f0f2f5;
}
.panel-group {
  margin-top: 18px;
}
.card-panel-col {
  margin-bottom: 40px;
}
.mainbox {
  /* width: 96.5%; */
  min-width: 350px;
  margin: 40px auto;
  padding: 0px 40px;
}
.wrapbox {
  height: 100%;
  background: #f0f2f5;
  overflow: hidden;
}
.pbox {
  width: 45%;
  margin-right: 15px;
}
.pbox p:nth-child(1) {
  font-size: 1em;
  color: rgba(0, 0, 0, 0.45);
  font-weight: bold;
}
.pbox p:nth-child(2) {
  font-size: 1em;
  color: #666;
  font-weight: bold;
}
.optionCard {
  /* width: 350px; */
  height: 108px;
  /* float: left;
  margin-left: 20px;
  margin-bottom: 20px; */
  border: 1px solid #eee;
  background: #fff;
  /* margin-top: 20px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.opcard1 {
  margin-left: 0px;
}
.opcard1 .imgbox i {
  color: #ffb980;
}
.opcard1:hover .imgbox {
  background: #ffb980;
  border-radius: 10px;
  transition: all 1s;
}
.opcard1:hover .imgbox i {
  color: white;
  transition: all 1s;
}
.opcard2 .imgbox i {
  color: #b6a2de;
}
.opcard2:hover .imgbox {
  background: #b6a2de;
  border-radius: 10px;
  transition: all 1s;
}
.opcard2:hover .imgbox i {
  color: white;
  transition: all 1s;
}
.opcard3 .imgbox i {
  color: #5ab1ef;
}
.opcard3:hover .imgbox {
  background: #5ab1ef;
  border-radius: 10px;
  transition: all 1s;
}
.opcard3:hover .imgbox i {
  color: white;
  transition: all 1s;
}
.opcard4 .imgbox i {
  color: #5ab1ef;
}
.opcard4:hover .imgbox {
  background: #5ab1ef;
  border-radius: 10px;
  transition: all 1s;
}
.opcard4:hover .imgbox i {
  color: white;
  transition: all 1s;
}
.opcard5 .imgbox i {
  color: #34bfa3;
}
.opcard5:hover .imgbox {
  background: #34bfa3;
  border-radius: 10px;
  transition: all 1s;
}
.opcard5:hover .imgbox i {
  color: white;
  transition: all 1s;
}
.opcard6 .imgbox i {
  color: #ffb980;
}
.opcard6:hover .imgbox {
  background: #ffb980;
  border-radius: 10px;
  transition: all 1s;
}
.opcard6:hover .imgbox i {
  color: white;
  transition: all 1s;
}
.optionCard p {
  line-height: 30px;
  text-align: center;
}
.imgbox {
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  margin: 0px 15px;
  padding: 15px;
  /* background: #409eff; */
}
.imgbox i {
  font-size: 40px;
  color: #409eff;
}
.echartsBox {
  /* margin-top: 40px; */
  width: 100%;
  padding: 0px 20px;
  padding-top: 20px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  box-sizing: border-box;
}
.echartsBox2 {
  margin-top: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.minitu {
  /* width: 29.7%; */
  height: 316px;
  /* padding: 0px 20px; */
  padding: 16px 16px 0;
  padding-top: 40px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.charts1 {
  padding-right: 20px;
}
.charts2 {
  padding: 0px 20px;
}
.charts3 {
  padding-left: 20px;
}
@media screen and (max-width: 1420px) {
  .imgbox {
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin: 0px 15px;
    padding: 10px;
    /* background: #409eff; */
  }
  .imgbox i {
    font-size: 30px;
    color: #409eff;
  }
}
@media screen and (max-width: 1295px) {
  .imgbox {
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin: 0px 15px;
    padding: 10px;
    /* background: #409eff; */
  }
  .imgbox i {
    font-size: 25px;
    color: #409eff;
  }
  .pbox p:nth-child(1) {
    font-size: 14px;
  }
  .pbox p:nth-child(2) {
    font-size: 14px;
  }
}
/* 平板 */
@media only screen and (max-width: 1200px) {
  .el-col-sm-12 {
    width: 50%;
  }
  .charts1,
  .charts2,
  .charts3 {
    padding: 0px;
  }
  .charts2 {
    margin: 40px 0px;
  }
  .pbox p:nth-child(1) {
    font-size: 20px;
  }
  .pbox p:nth-child(2) {
    font-size: 20px;
  }
  .imgbox {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: 0px 15px;
    padding: 10px;
    /* background: #409eff; */
  }
  .imgbox i {
    font-size: 40px;
    color: #409eff;
  }
}
/* 手机 */
@media only screen and (max-width: 768px) {
  .el-col-sm-12 {
    width: 50%;
  }
  .pbox {
    display: none;
  }
  .imgbox {
    width: 100%;
    height: 100%;
    line-height: 110px;
    padding: 0px;
    margin: 0px;
    border-radius: 0 !important;
  }
  .imgbox i {
    font-size: 50px;
  }
  /* .opcard1:hover .imgbox{
    height:100%;
  } */
}
@media only screen and (max-width: 480px) {
  .mainbox{
    padding: 0px;
  }
}
</style>
