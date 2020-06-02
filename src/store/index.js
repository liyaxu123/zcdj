import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 存储资产列表中编辑数据的IID
    UniProp_ZCRecordIID: '',
    // 存储资产列表中编辑数据的FJLSBH
    UniProp_ZCRecordFJLSBH: '',
  },
  mutations: {
    // 将数据保存到 state 的 UniProp_ZCRecordIID 中
    getUniProp_ZCRecordIID(state, data) {
      // 先初始化 zclbEditIID
      state.UniProp_ZCRecordIID = '';
      // 再给 zclbEditIID 赋值
      state.UniProp_ZCRecordIID = data
    },
    // 清空UniProp_ZCRecordIID
    removeUniProp_ZCRecordIID(state){
      state.UniProp_ZCRecordIID = '';
    },
    getUniProp_ZCRecordFJLSBH(state, data) {
      // 先初始化 zclbEditLSBH
      state.UniProp_ZCRecordFJLSBH = '';
      // 再给 zclbEditLSBH 赋值
      state.UniProp_ZCRecordFJLSBH = data
    }
  },
  actions: {
  },
  modules: {
  }
})
