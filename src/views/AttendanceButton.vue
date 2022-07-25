<template>
  <div id="attendance-button">
    <MyInputPopUp
      :displayName="popUpName"
      :popUpText="popUpText"
    ></MyInputPopUp>
    <MyHeader></MyHeader>
    <h1 class="title">勤怠を入力してください</h1>
    <div class="clock">
      <MyHeaderTime></MyHeaderTime>
    </div>
    <div class="text-content">
      <p class="text-content-label">＜出勤＞</p>
      <p>予定：{{ scheduledAttendanceTime }}</p>
      <p>実績：{{ achievedAttendanceTime }}</p>
      <p class="text-content-label">＜退勤＞</p>
      <p>予定：{{ scheduledLeavingTime }}</p>
      <p>実績 ：{{ achievedLeavingTime }}</p>
    </div>
    <div class="button-contents">
      <button class="button" @click="submitAttendanceDateTime">出勤</button>
      <button class="button" @click="submitLeavingDateTime">退勤</button>
    </div>
  </div>
</template>
<script>
import MyHeader from "../organisms/HeaderView.vue";
import MyHeaderTime from "../atoms/HeaderTime.vue";
import MyInputPopUp from "../atoms/inputPopup.vue";
import constFunc from "../constFunc.js";
export default {
  components: {
    MyHeader,
    MyHeaderTime,
    MyInputPopUp,
  },
  data() {
    return {
      scheduledAttendanceTime: "投稿なし",
      scheduledLeavingTime: "投稿なし",
      achievedAttendanceTime: "投稿なし",
      achievedLeavingTime: "投稿なし",
      popUpName: "attendanceButton",
      popUpText: "投稿できませんでした.",
    };
  },
  created: function () {
    constFunc.WhoAmI();
    this.getAttendanceInfo();
  },
  methods: {
    show: function () {
      this.$modal.show(this.popUpName);
    },
    getAttendanceInfo: function () {
      const url = location.origin + "/api/v1/getAttendanceInfo";
      const params = new URLSearchParams();
      params.append("date", new Date().toLocaleDateString());
      params.append("userId", this.$store.getters.getUserId);
      this.axios
        .post(
          url,
          params,
          {
            headers: {
              Authorization: sessionStorage.getItem("jwtToken"),
            },
          },
          this.serverPass + "login"
        )
        .then((response) => {
          this.$store.commit("setAttendanceInfo", response.data);
          this.scheduledAttendanceTime = response.data.scheduledAttendanceTime;
          this.scheduledLeavingTime = response.data.scheduledLeavingTime;
          this.achievedAttendanceTime = response.data.achievedAttendanceTime;
          this.achievedLeavingTime = response.data.achievedLeavingTime;
        })
        .catch((error) => {
          console.log(error);
          this.$store.commit("setAttendanceInfo", null);
        });
    },
    submitAttendanceDateTime: function () {
      let attendanceInfo = this.$store.getters.getAttendanceInfo;
      if (attendanceInfo == null) {
        this.popUpText = "投稿できませんでした。";
        this.show();
        return;
      }
      if (attendanceInfo.attendFlg) {
        this.popUpText = "出勤済みのため登録できませんでした。";
        this.show();
        return;
      }
      const url = location.origin + "/api/v1/postAchievedAttendanceInfo";
      const params = new URLSearchParams();
      params.append("isAttend", true);
      params.append("achievedAttendanceDate", new Date().toLocaleDateString());
      params.append("achievedAttendanceTime", new Date().toLocaleTimeString());
      params.append("userId", this.$store.getters.getUserId);
      params.append("attendanceInfo", JSON.stringify(attendanceInfo));
      this.axios
        .post(
          url,
          params,
          {
            headers: {
              Authorization: sessionStorage.getItem("jwtToken"),
            },
          },
          this.serverPass + "login"
        )
        .then((response) => {
          if (response.status == 204) {
            this.popUpText = "出勤しました。";
            this.getAttendanceInfo();
            this.show();
          }
        })
        .catch((error) => {
          this.popUpText = "投稿できませんでした。";
          console.log(error);
          this.show();
        });
    },
    submitLeavingDateTime: function () {
      let attendanceInfo = this.$store.getters.getAttendanceInfo;
      if (attendanceInfo == null) {
        this.popUpText = "投稿できませんでした。";
        this.show();
        return;
      }
      if (attendanceInfo.leaveFlg) {
        this.popUpText = "退勤済みのため登録できませんでした。";
        this.show();
        return;
      }
      const url = location.origin + "/api/v1/postAchievedAttendanceInfo";
      const params = new URLSearchParams();
      params.append("isAttend", false);
      params.append("achievedAttendanceDate", new Date().toLocaleDateString()); // 渡したいデータ分だけappendする
      params.append("achievedAttendanceTime", new Date().toLocaleTimeString());
      params.append("userId", this.$store.getters.getUserId);
      params.append("attendanceInfo", JSON.stringify(attendanceInfo));
      this.axios
        .post(
          url,
          params,
          {
            headers: {
              Authorization: sessionStorage.getItem("jwtToken"),
            },
          },
          this.serverPass + "login"
        )
        .then((response) => {
          if (response.status == 204) {
            this.popUpText = "退勤しました。";
            this.getAttendanceInfo();
            this.show();
          }
        })
        .catch((error) => {
          this.popUpText = "投稿できませんでした。";
          console.log(error);
          this.show();
        });
    },
  },
};
</script>
<style>
.clock {
  display: flex;
  justify-content: center;
}

*,
*:before,
*:after {
  -webkit-box-sizing: inherit;
  box-sizing: inherit;
}
.button-contents {
  display: flex;
  justify-content: center;
}
.button {
  width: 20vh;
  height: 20vh;
  font-size: 5vh;
  font-weight: 700;
  line-height: 1.5;
  position: relative;
  display: inline-block;
  padding: 1rem 4rem;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  letter-spacing: 0.1em;
  color: #212529;
  border-radius: 0.5rem;
  margin: 10px;
  color: #000;
  background-color: #fff100;
  border-bottom: 5px solid #ccc100;
}
.button:hover {
  margin-top: 3px;
  color: #000;
  background: #fff20a;
  border-bottom: 2px solid #ccc100;
}
.text-content {
  text-align: center;
}
.text-content-label {
  font-weight: bolder;
  color: red;
}
</style>