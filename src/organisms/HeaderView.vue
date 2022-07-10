<template>
  <div id="headerView">
    <div
      class="header-invisible"
      v-if="!isOpen"
      @click="isOpen = !isOpen"
    ></div>
    <transition name="bounce">
      <div class="header" v-if="isOpen" @click="isOpen = !isOpen">
        <p class="header-content" @click="goToChangeByCase">
          <img src="../assets/left.png" />
          ログアウト
        </p>
        <p class="header-content" @click="goToMain">
          メイン画面へ
          <img src="../assets/right.png" />
        </p>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    goToMain: function () {
      if (this.$route.path !== "/main") {
        this.$router.push("/main");
      }
    },
    goToChangeByCase: function () {
      if (this.$route.path !== "/changeByCase") {
        this.$router.push("/changeByCase");
      }
    },
  },
};
</script>


<style>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
.header {
  width: 100%;
  height: 100px;
  background: ghostwhite;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.header-invisible {
  height: 10px;
  width: 10px;
  background: slategrey;
  position: absolute;
  top: 20px;
  left: 20px;
}
.header-content {
  width: max-content;

  display: flex;
  align-items: center;
}

.bounce-enter-active {
  animation: bounce-in 1s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
}
</style>