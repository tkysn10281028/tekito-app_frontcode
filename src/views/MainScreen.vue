<template>
  <div id="main">
    <MyHeader></MyHeader>
    <div class="title">
      <h1>適当に作ったやつ一覧</h1>
    </div>
    <div class="content">
      <router-link to="/changeByCase">changeByCase</router-link>
    </div>
    <div class="content">
      <router-link to="/attendance">勤怠ボタン</router-link>
    </div>
    <div class="content">
      <router-link to="/attendanceInfoEdit">勤怠管理ページ</router-link>
    </div>
  </div>
</template>

<script>
import MyHeader from "../organisms/HeaderView.vue";
import constFunc from "../constFunc.js";
export default {
  components: {
    MyHeader,
  },
  methods: {},
  created: function () {
    constFunc.WhoAmI();
  },
};
</script>

<style>
.title {
  text-align: center;
}

.content {
  display: flex;
  justify-content: center;
}
</style>