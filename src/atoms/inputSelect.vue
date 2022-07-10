<template>
  <div id="inputSelect">
    <select name="select-case" v-model="selectCase" @change="changeCase">
      <option value="kebab">Kebab Case</option>
      <option value="camel">Camel Case</option>
      <option value="snake">Snake Case</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectCase: "camel",
    };
  },
  methods: {
    changeCase: function () {
      this.$emit("changeCase", this.selectCase);
    },
  },
};
</script>

<style>
select,
option {
  cursor: pointer; /* リンクカーソル（カーソルを指にする） */
}
select {
  border: 2px solid skyblue;
  width: 100%;
}
</style>