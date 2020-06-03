<template>
  <div class="login">
    <!-- 头部导航 -->
    <div class="mod-header">
      <h1>
        <a href="javascript:void(0)" title="资产E登记平台">资产IN平台</a>
      </h1>
      <!-- <ul class="nav">
        <li>首页</li>
      </ul>-->
    </div>
    <!-- 主体部分 -->
    <div class="mainbox">
      <!-- 左侧内容区 -->
      <div class="leftBox">
        <p>资产IN平台</p>
        <p>开放登记</p>
        <p>智能分享</p>
      </div>
      <!-- 右侧登录区 -->
      <div class="loginbox">
        <div class="loginbox_head">
          <p :class="activeIndex==0?'borderTop':''" @click="wxlogin">微信登录</p>
          <p :class="activeIndex==1?'borderTop':''" @click="qqlogin">账号登录</p>
        </div>
        <div class="loginbox_body">
          <!-- 微信登录 -->
          <div class="wxbox" v-if="wxshow">
            <div class="wx">
              <div class="wxma">
                <img src="../assets/ewm.png" alt />
              </div>
              <p>请使用微信扫描二维码登录</p>
            </div>
          </div>
          <!-- 账号登录 -->
          <div class="qqbox" v-if="qqshow">
            <!-- <p class="shry">管理员登录</p> -->
            <el-form :model="shyInfo" :rules="rules" ref="loginForm">
              <el-row style="margin-top:60px;height:40px;">
                <el-col :span="18" :offset="3">
                  <el-form-item prop="UserName">
                    <el-input v-model="shyInfo.UserName" placeholder="请输入您的账号"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;height:45px;">
                <el-col :span="18" :offset="3" style="height:40px;">
                  <el-form-item prop="Password">
                    <el-input v-model="shyInfo.Password" placeholder="请输入登录密码" show-password></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row style="margin-top:20px;" type="flex" justify="center">
                <el-col :span="18">
                  <el-button class="loginBtn" type="primary" @click="login">登录</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <!-- 不同意协议显示提示信息 -->
          <p class="mustagreement" v-if="isAgreement">需要同意《资产IN登记平台服务协议》才能登录</p>
        </div>
        <!-- 登录框底部内容 -->
        <div class="loginbox_foot">
          <div class="foot1">
            <el-checkbox v-model="isConsent" @change="isagreement"></el-checkbox>
            <span>
              同意
              <a href="###">《资产IN登记平台服务协议》</a>
            </span>
          </div>
          <div class="foot2">
            <el-checkbox label="下次自动登录" v-model="isAutoLogin" class="foot2"></el-checkbox>
          </div>
        </div>
      </div>
    </div>
    <!-- <el-button  class="loginbtn">登录</el-button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 监听是否同意协议
      isConsent: true,
      isAutoLogin: false,
      // 控制账号登录的显示与隐藏
      qqshow: false,
      // 控制微信登录码的显示与隐藏
      wxshow: true,
      // 控制同意协议信息的显示与否
      isAgreement: false,
      activeIndex: 0,
      // 审核人员登录表单信息
      shyInfo: {
        // UserName: "Admin",
        // UserName: "tester",
        UserName: "",
        Password: ""
      },
      rules: {
        UserName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        Password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  created() {
    var _this = this;
    document.onkeydown = function(e) {
      //按下回车提交
      let key = window.event.keyCode;
      //事件中keycode=13为回车事件
      if (key == 13) {
        _this.login();
      }
    };
  },
  methods: {
    // 登录按钮
    login() {
      var _this = this;
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          // 预校验成功
          // 发起登录请求
          _this
            .$http({
              method: "post",
              url: "/Login/AdminLogin",
              data: this.shyInfo,
              transformRequest: [
                function(data) {
                  //在请求之前对data传参进行格式转换
                  let formatData = [];
                  for (var it in data) {
                    formatData.push(it + "=" + data[it]);
                  }
                  return formatData.join("&");
                }
              ]
            })
            .then(response => {
              console.log(response);
              if (response.status == 200) {
                // 1、将登录成功之后的token，保存到 sessionStorage 中
                // 2、然后跳转到首页
                // window.sessionStorage.setItem('token',response.data.token);
                var udata = response.data;
                if (udata.err == "") {
                  window.sessionStorage.setItem(
                    "userinfo",
                    JSON.stringify(udata)
                  );
                  // 请求数据字典
                  _this
                    .$http({
                      method: "post",
                      url: "/DataGate/GetAlDictData"
                    })
                    .then(response => {
                      window.sessionStorage.setItem(
                        "dict",
                        JSON.stringify(response.data)
                      );
                      this.$router.push("/home");
                    });
                }
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          // 预校验失败
          _this.$message({
            message: "请填写您的用户名和密码！",
            type: "warning"
          });
        }
      });
    },
    // 账号登录
    qqlogin() {
      this.isConsent = true;
      this.isAgreement = false;
      this.qqshow = true;
      this.wxshow = false;
      this.activeIndex = 1;
    },
    // 微信登录
    wxlogin() {
      this.isConsent = true;
      this.isAgreement = false;
      this.wxshow = true;
      this.qqshow = false;
      this.activeIndex = 0;
    },
    // 是否同意协议
    isagreement(e) {
      if (e == true) {
        this.isAgreement = false;
        if (this.activeIndex == 1) {
          this.qqshow = true;
        } else {
          this.wxshow = true;
          this.shyshow = true;
        }
      } else {
        this.isAgreement = true;
        this.wxshow = false;
        this.qqshow = false;
        this.shyshow = false;
      }
    }
  }
};
</script>

<style lang="css" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url(../assets/login_bg.jpg);
  background-size: cover;
  overflow: hidden;
}
.mod-header {
  height: 80px;
  line-height: 80px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  display: flex;
  justify-content: space-between;
}
h1 {
  width: 45%;
  font-size: 32px;
  margin-left: 5%;
}
h1 a {
  color: white;
  text-decoration: none;
}
.nav {
  width: 25%;
}
.mainbox {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 120px;
}
.loginbtn {
  margin-top: 5%;
  margin-left: 48%;
}
.loginbox {
  width: 444px;
  height: 400px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.qqbox p {
  text-align: center;
  color: #666;
}
.zh {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}
.ma {
  width: 84px;
  height: 84px;
  margin-left: 10px;
}
.ma img {
  width: 100%;
  height: 100%;
}
.leftBox {
  width: 500px;
  height: 300px;
  color: white;
}
.leftBox p {
  text-align: justify;
}
.leftBox p:nth-child(1) {
  font-size: 90px;
}
.leftBox p:nth-child(2) {
  height: 60px;
  line-height: 60px;
  text-align: justify;
  font-size: 36px;
  letter-spacing: 100px;
  word-break: keep-all;
  white-space: nowrap;
}
.leftBox p:nth-child(3) {
  height: 60px;
  line-height: 60px;
  text-align: justify;
  font-size: 36px;
  word-break: keep-all;
  white-space: nowrap;
  letter-spacing: 100px;
}
.loginbox_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.loginbox_head p {
  width: 50%;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  text-align: center;
  margin-top: 0;
  border-top: 5px solid #fff;
  cursor: pointer;
}
.loginbox_head p:hover {
  color: #2980ff;
}
.loginbox_head .borderTop {
  border-color: #2980ff;
  color: #2980ff;
}
.loginbox_foot {
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0px;
}
.foot1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 14px;
  color: #606266;
}
.foot1 span {
  margin-left: 5px;
}
.foot1 a {
  color: #606266;
}
.foot1 a:hover {
  color: #2980ff;
}
.foot2 {
  margin-left: 10px;
  margin-bottom: 10px;
}
.wx {
  margin-top: 40px;
}
.wx p {
  text-align: center;
  font-size: 14px;
  color: #606266;
}
.wxma {
  width: 150px;
  height: 150px;
  margin: 20px auto;
}
.wxma img {
  width: 100%;
}
.mustagreement {
  text-align: center;
  color: #666;
  margin-top: 130px;
}
.el-link {
  margin-left: 15%;
}
.shry {
  text-align: center;
  margin-top: 30px;
}
.loginBtn{
  width: 100%;
}
</style>