import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储资产列表中编辑数据的IID
    UniProp_ZCRecordIID: '',
    // 存储分享明细页面中的数据
    dataFromMyShare: [],
    // 是否可编辑  0 不可编辑，1可编辑
    isEditable: '0'
  },
  mutations: {
    // 将数据保存到 state 的 UniProp_ZCRecordIID 中
    getUniProp_ZCRecordIID(state, data) {
      // 先初始化 zclbEditIID
      state.UniProp_ZCRecordIID = '';
      // 再给 zclbEditIID 赋值
      state.UniProp_ZCRecordIID = data;
    },
    // 清空UniProp_ZCRecordIID
    removeUniProp_ZCRecordIID(state) {
      state.UniProp_ZCRecordIID = '';
    },
    // 给 dataFromMyShare 数组赋值
    getDataFromMyShare(state, data) {
      // 再给 dataFromMyShare 赋值
      state.dataFromMyShare.push(data);
    },
    // 清空 dataFromMyShare 数组
    removeDataFromMyShare(state) {
      state.dataFromMyShare.length = 0;
    },
    setIsEditable(state, isEdit) {
      state.isEditable = isEdit
    },
    resizeIsEditable(state) {
      state.isEditable = '0';
    }
  },
  actions: {
  },
  modules: {
  }
})
