import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { showLoading, hideLoading } from './loading';

// 定义全局的请求路径
import globalVar from './utils/globalVar'
Vue.prototype.globalVar = globalVar

Vue.config.productionTip = false
// 引入icon图标
import './assets/icon/iconfont.css'

// 导入element-ui
import ElementUI from 'element-ui';
// 导入element-ui 相关样式
import 'element-ui/lib/theme-chalk/index.css';
// 挂载element-ui
Vue.use(ElementUI);

// 挂载 echarts
import echarts from "echarts";
Vue.prototype.$echarts = echarts;

// 引入reset.css文件
import './assets/css/reset.css';

// 引入并挂载 axios
import axios from 'axios';
// 配置请求的根路径
axios.defaults.baseURL = Vue.prototype.globalVar.ReqIPAddr

// 添加请求拦截器
axios.interceptors.request.use(config => {
  showLoading();//请求时的加载动画
  // 将token通过请求头的Authorization字段传给后台
  if (config.method == 'post') {
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/x-www-form-urlencoded; charset=UTF-8;"
    }
  }

  if (config.url.indexOf('/Login') == 0) {
    // console.log(config.url)
    return config
  }
  let tokenstr = Vue.prototype.globalVar.getUserInfoByKey('utoken')
  let openidstr = Vue.prototype.globalVar.getUserInfoByKey('uid')
  if (tokenstr && openidstr) {   //如果存在 token 和 uid 就添加到 headers 里面
    config.headers.token = tokenstr;
    config.headers.openid = openidstr;
    return config
  } else {   //如果不存在 token 和 uid 踢到登录页面
    window.location.href = '/'
    return false
  }
}, error => {   //网络连接错误
  Vue.prototype.$message({ message: '网络连接错误', type: 'error', duration: 3 * 1000 });
  return Promise.reject(error);
})


// 添加响应拦截器
axios.interceptors.response.use(response => {
  hideLoading();//结束加载动画
  let d = response.data;
  if (d.err != undefined && d.err != '') {   //如果返回的 data 中有 err 信息就提示用户服务器数据有错误
    Vue.prototype.$message({ message: '服务器数据有错误', type: 'error', duration: 3 * 1000 });
    console.log(err);
  }
  // 如果返回的 data 中没有 err 信息
  return response;
}, error => {
  hideLoading()//如果错误也结束动画
  let httpstc = error.response.status;
  console.log('报错的状态码：' + error.response.status);
  if (httpstc == 901 || httpstc == 906) {//超时或者请求参数缺失就跳转到登录页面
    window.location.href = '/'
  } else {//提示错误信息
    let errmsg = '';
    switch (httpstc) {
      case 900:
        errmsg = '该用户不存在,请重新登录';
        window.location.href = '/'
        break;
      case 909:
        errmsg = '该用户被管理员禁用';
        window.location.href = '/'
        break;
    }
    Vue.prototype.$message({ message: errmsg, type: 'error', duration: 3 * 1000 });
  }
})

Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
