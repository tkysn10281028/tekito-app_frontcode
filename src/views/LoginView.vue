<template>
  <div id="login-view">
    <MyInputPopup
      :displayName="popUpName"
      :popUpText="popUpText"
    ></MyInputPopup>
    <div class="form">
      <h1 class="title">勤怠を入力してください</h1>
      <p>Emailaddress</p>
      <input type="text" v-model="emailAddress" class="form-content" />
      <p>Password</p>
      <input type="password" v-model="password" class="form-content" />
      <p><button class="btn-flat-border" @click="login">Login</button></p>
    </div>
  </div>
</template>

<script>
import MyInputPopup from "../atoms/inputPopup.vue";
export default {
  components: {
    MyInputPopup,
  },
  data() {
    return {
      emailAddress: "",
      password: "",
      popUpName: "LoginFailed",
      popUpText: "ログインに失敗しました。",
    };
  },
  methods: {
    login: function () {
      // console.log(this.emailAddress);
      // console.log(this.password);
      const url = location.origin + "/api/v1/login";
      const params = new URLSearchParams();
      params.append("emailAddress", this.emailAddress); // 渡したいデータ分だけappendする
      params.append("password", this.password);
      this.axios
        .post(url, params, this.serverPass + "login")
        .then((response) => {
          console.log(response);
          if (response.data.token) {
            sessionStorage.setItem("jwtToken", response.data.token);
            this.$store.commit("setUserId", response.data.userId);
            this.$router.push("/main");
          }
        })
        .catch((error) => {
          console.log(error);
          this.$modal.show(this.popUpName);
        });
    },
  },
};
</script>

<style scoped>
.form-content {
  border: 0;
  padding: 10px;
  font-size: 1.3em;
  color: rgb(0, 0, 0);
  border: solid 1px #a85757;
  margin: 0 0 20px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  -webkit-box-shadow: 0px 1px rgba(255, 255, 255, 0.5);
  -moz-box-shadow: 0px 1px rgba(255, 255, 255, 0.5);
  box-shadow: 0px 1px rgba(255, 255, 255, 0.5);
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
.form {
  text-align: center;
  padding: 0.5em 1em;
  margin: 2em 0;
  color: #00bcd4;
  background: #e4fcff; /*背景色*/
  border-top: solid 6px #1dc1d6;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.32); /*影*/
}
.btn-flat-border {
  display: inline-block;
  padding: 0.3em 1em;
  text-decoration: none;
  color: #67c5ff;
  border: solid 2px #67c5ff;
  border-radius: 3px;
  transition: 0.4s;
}
.btn-flat-border:hover {
  background: #67c5ff;
  color: white;
}
</style>>