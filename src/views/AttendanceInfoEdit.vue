<template>
  <div id="attendance-info-edit">
    <MyHeader></MyHeader>
    <MyInputPopUp
      :displayName="popUpName"
      @changeScheduledTime="changeScheduledTime"
    ></MyInputPopUp>
    <h1 class="title">勤怠管理</h1>
    <MyInputDate @changeDate="getAttedanceInfoByDate"></MyInputDate>
    <div class="text-content">
      <p class="text-content-label">＜出勤＞</p>
      <p @click="show">予定：{{ scheduledAttendanceTime }}</p>
      <p>実績：{{ achievedAttendanceTime }}</p>
      <p class="text-content-label">＜退勤＞</p>
      <p @click="show">予定：{{ scheduledLeavingTime }}</p>
      <p>実績 ：{{ achievedLeavingTime }}</p>
    </div>
  </div>
</template>
<script>
import MyHeader from "../organisms/HeaderView.vue";
import MyInputDate from "../atoms/inputDate.vue";
import MyInputPopUp from "../organisms/inputDatePopUp.vue";
export default {
  components: {
    MyHeader,
    MyInputDate,
    MyInputPopUp,
  },
  data() {
    return {
      popUpName: "attendanceInfoEdit",
      scheduledAttendanceTime: "",
      achievedAttendanceTime: "",
      scheduledLeavingTime: "",
      achievedLeavingTime: "",
      nowDate: "",
    };
  },
  created: function () {
    this.getInfoList();
  },
  methods: {
    show: function () {
      this.$modal.show(this.popUpName);
    },
    getInfoList: function () {
      this.axios
        .get("/api/v1/getAttendanceInfoList")
        .then((response) => {
          this.$store.commit("setAttendanceInfoList", response.data);
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("setAttendanceInfoList", null);
        });
    },
    changeScheduledTime: function (value) {
      if (this.nowDate == "") {
        return;
      }
      // const url = "http://localhost:8080/api/v1/postScheduledAttendanceInfo";
      const url =
        "http://www.tekito-app.com/api/v1/postScheduledAttendanceInfo";

      const params = new URLSearchParams();
      params.append("date", this.nowDate);
      params.append("achievedAttendanceTime", value.attendanceTime);
      params.append("achievedLeavingTime", value.LeavingTime);
      params.append("userId", "001");
      this.axios
        .post(url, params, this.serverPass + "login")
        .then(() => {
          this.getInfoList();
          this.scheduledAttendanceTime = value.attendanceTime;
          this.scheduledLeavingTime = value.LeavingTime;
        })
        .catch((error) => {
          console.log(error);
        });
      this.getAttedanceInfoByDate(this.nowDate);
    },
    getAttedanceInfoByDate: function (value) {
      this.nowDate = value;
      let attendanceInfoList = this.$store.getters.getAttendanceInfoList;

      if (attendanceInfoList == null) {
        return;
      }
      let result = attendanceInfoList.filter(
        (info) => info.scheduledAttendanceDate == value
      );
      console.log(attendanceInfoList);
      console.log(result);
      console.log(result[0]);
      if (result[0]) {
        this.scheduledAttendanceTime = result[0].scheduledAttendanceTime;
        this.achievedAttendanceTime = result[0].achievedAttendanceTime;
        this.scheduledLeavingTime = result[0].scheduledLeavingTime;
        this.achievedLeavingTime = result[0].achievedLeavingTime;
      } else {
        this.scheduledAttendanceTime = "";
        this.achievedAttendanceTime = "";
        this.scheduledLeavingTime = "";
        this.achievedLeavingTime = "";
      }
    },
  },
};
</script>
<style>
</style>