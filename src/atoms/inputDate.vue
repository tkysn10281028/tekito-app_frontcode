<template>
  <div id="input-date">
    <div class="input-date">
      <input type="date" v-model="date" @change="changeDate" />
    </div>
  </div>
</template>
<script>
export default {
  created: function () {},
  data() {
    return {
      date: new Date(),
    };
  },
  methods: {
    show: function () {
      window.alert(this.date);
    },
    changeDate: function () {
      let array = this.date.split("-");
      array[1] = array[1].replaceAll("0", "");
      let formattedDate = array.join("/");
      this.$emit("changeDate", formattedDate);
    },
  },
};
</script>
<style>
.input-date {
  display: flex;
  justify-content: center;
}
</style>