<template>
  <div id="changeByCase">
    <MyHeader></MyHeader>
    <div class="title">
      <h2>ChangeByCase.</h2>
      <p>Hello World!</p>
    </div>
    <div class="content">
      <MyInputText @getText="showText"></MyInputText>
      <MyInputSelect
        @changeCase="getChange"
        class="input-select"
      ></MyInputSelect>
    </div>
    <div class="title">{{ changedText }}</div>
  </div>
</template>
<script>
import MyHeader from "../organisms/HeaderView.vue";
import MyInputText from "../atoms/inputText.vue";
import MyInputSelect from "../atoms/inputSelect.vue";

export default {
  data() {
    return {
      changedText: "",
      upperCaseFlg: false,
      selectCase: "camel",
    };
  },
  components: {
    MyHeader,
    MyInputText,
    MyInputSelect,
  },
  methods: {
    getChange: function (value) {
      this.selectCase = value;
    },
    snakeCase: function (value) {
      this.changedText = value.replaceAll(" ", "_").toUpperCase();
    },
    kebabCase: function (value) {
      this.changedText = value.replaceAll(" ", "-");
    },
    camelCase: function (value) {
      let array = value.split(" ");
      for (let i = 1; i < array.length; i++) {
        if (!array[i]) {
          continue;
        }
        array[i] = array[i][0].toUpperCase() + array[i].slice(1);
      }
      this.changedText = array.join("");
    },
    showText: function (value) {
      switch (this.selectCase) {
        case "kebab":
          this.kebabCase(value);
          break;
        case "snake":
          this.snakeCase(value);
          break;
        case "camel":
          this.camelCase(value);
          break;
        default:
          this.changedText = value;
      }
    },
  },
};
</script>

<style>
.content {
  display: flex;
  justify-content: center;
}
.input-select {
  height: 100%;
  margin: 10px 10px 10px 10px;
}
</style>