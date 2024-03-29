import Vue from 'vue'
import VueRouter from 'vue-router'
import MainScreen from '../views/MainScreen.vue'
import HomePage from '../views/HomePage.vue'
import ChangeByCase from '../views/ChangeByCase.vue'
import Attendance from '../views/AttendanceButton.vue';
import AttendanceInfoEdit from "../views/AttendanceInfoEdit.vue";
import LoginView from "../views/LoginView.vue";
import UploadFileView from "../views/UploadFileView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: HomePage
  },
  {
    path: '/main',
    name: 'MainScreen',
    component: MainScreen
  },
  {
    path: '/changeByCase',
    name: 'ChangeByCase',
    component: ChangeByCase
  },
  {
    path: '/attendance',
    name: 'Attendance',
    component: Attendance
  },
  {
    path: '/attendanceInfoEdit',
    name: 'AttendanceInfoEdit',
    component: AttendanceInfoEdit
  },
  {
    path:'/login',
    name:'LoginView',
    component:LoginView
  },
  {
    path:'/uploadFile',
    name:'UploadFileView',
    component:UploadFileView
  }
]

const router = new VueRouter({
  routes
})

export default router
