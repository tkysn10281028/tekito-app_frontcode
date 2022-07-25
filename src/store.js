import Vuex from "vuex";
import vuexPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
Vue.use(Vuex);

function getDefaultState() {
    return {
      attendanceInfo:null,
      attendanceInfoList:null,
      userId:null
    };
  }

const store = new Vuex.Store({
    plugins: [
        vuexPersistedState({
          key: "tekito-app",
          paths: ["attendanceInfo","attendanceInfoList","userId"],
          storage: window.sessionStorage,
        }),
      ],
    state: getDefaultState,
  getters: {
    getAttendanceInfo(state) {
      return state.attendanceInfo;
    },
    getAttendanceInfoList(state) {
        return state.attendanceInfoList;
    },
    getUserId(state){
      return state.userId;
    }
  },
  mutations: {
    setAttendanceInfo(state, val) {
      state.attendanceInfo = val;
    },
    setAttendanceInfoList(state, val) {
        state.attendanceInfoList = val;
    },
    setUserId(state,val){
      state.userId = val;
    },
    clearState(state){
      Object.assign(state,getDefaultState())
    }
  },
});
export default store;

