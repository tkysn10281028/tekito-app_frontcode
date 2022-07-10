<template>
  <div id="inputText">
    <input type="text" v-model="text" class="input" />
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: this.changedTextForAtoms,
    };
  },
  props: {
    changedTextForAtoms: {
      type: String,
      default: "",
    },
  },
  methods: {
    submit() {},
  },
  watch: {
    text: function () {
      this.$emit("getText", this.text);
    },
  },
};
</script>

<style>
.input {
  width: 100%; /*親要素いっぱい広げる*/
  padding: 10px 15px; /*ボックスを大きくする*/
  font-size: 16px;
  border-radius: 3px; /*ボックス角の丸み*/
  border: 2px solid #ddd; /*枠線*/
  box-sizing: border-box; /*横幅の解釈をpadding, borderまでとする*/
}
.input:focus {
  box-shadow: 0 0 5px 0 rgba(255, 153, 0, 1);
  border: 2px solid #fff !important;
  outline: 0;
}
#inputText {
  width: 30%;
}
</style>