<template>
  <div id="attendance-button">
    <MyInputPopUp :displayName="popUpName"></MyInputPopUp>
    <MyHeader></MyHeader>
    <h1 class="title">勤怠を入力してください</h1>
    <div class="clock">
      <MyHeaderTime></MyHeaderTime>
    </div>
    <div class="event">
      <p @click="show">イベント</p>
    </div>
    <div class="text-content">
      <p class="text-content-label">＜出勤予定時刻＞</p>
      <p>
        {{ scheduledAttendanceTime }}
      </p>
      <p class="text-content-label">＜退勤予定時刻＞</p>
      <p>
        {{ scheduledLeavingTime }}
      </p>
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
      popUpName: "attendanceButton",
    };
  },
  created: function () {
    const url = "http://localhost:8080/api/v1/getAttendanceInfo";
    const params = new URLSearchParams();
    params.append("date", new Date().toLocaleDateString()); // 渡したいデータ分だけappendする
    params.append("userId", "001");
    this.axios
      .post(url, params, this.serverPass + "login")
      .then((response) => {
        console.log(response.data);
        this.$store.commit("setAttendanceInfo", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    show: function () {
      this.$modal.show(this.popUpName);
    },
    submitAttendanceDateTime: function () {
      const url = "http://localhost:8080/api/v1/postAchievedAttendanceInfo";
      // console.log(new Date().toLocaleDateString());
      // console.log(new Date().toLocaleTimeString());

      const params = new URLSearchParams();
      params.append("isAttend", true);
      params.append("achievedAttendanceDate", new Date().toLocaleDateString()); // 渡したいデータ分だけappendする
      params.append("achievedAttendanceTime", new Date().toLocaleTimeString());
      params.append("userId", "001");
      console.log(this.$store.getters.getAttendanceInfo);
      // let attendanceInfo = {
      //   achievedAttendanceDate:
      //     this.$store.getters.getAttendanceInfo.achievedAttendanceDate,
      //   achievedAttendanceTime:
      //     this.$store.getters.getAttendanceInfo.achievedAttendanceTime,
      //   achievedLeavingDate:
      //     this.$store.getters.getAttendanceInfo.achievedAttendanceTime,
      //   achievedLeavingTime:
      //     this.$store.getters.getAttendanceInfo.achievedLeavingTime,
      //   scheduledAttendanceDate:
      //     this.$store.getters.getAttendanceInfo.scheduledAttendanceDate,
      //   scheduledAttendanceTime:
      //     this.$store.getters.getAttendanceInfo.scheduledAttendanceTime,
      //   scheduledLeavingDate:
      //     this.$store.getters.getAttendanceInfo.scheduledLeavingDate,
      //   scheduledLeavingTime:
      //     this.$store.getters.getAttendanceInfo.scheduledLeavingTime,
      // };
      params.append(
        "attendanceInfo",
        JSON.stringify(this.$store.getters.getAttendanceInfo)
      );
      this.axios
        .post(url, params, this.serverPass + "login")
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          window.alert("投稿できませんでした。");
          console.log(error);
        });
    },
    submitLeavingDateTime: function () {},
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