import Vuex from "vuex";
import vuexPersistedState from 'vuex-persistedstate'
Vue.use(Vuex);

function getDefaultState() {
    return {
      attendanceInfo:null,
      attendanceInfoList:null
    };
  }

const store = new Vuex.Store({
    plugins: [
        vuexPersistedState({
          key: "tekito-app",
          paths: ["attendanceInfo","attendanceInfoList"],
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
  },
  mutations: {
    setAttendanceInfo(state, val) {
      state.attendanceInfo = val;
    },
    setAttendanceInfoList(state, val) {
        state.attendanceInfoList = val;
    },
      
  },
});
export default store;

