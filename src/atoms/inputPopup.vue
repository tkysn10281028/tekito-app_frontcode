<template>
  <div id="input-pop-up">
    <modal :name="displayName" :draggable="true" :resizable="true">
      <div class="modal-header">
        <h2>Modal title</h2>
      </div>
      <div class="modal-body">
        <p>you're reading this text in a modal!</p>
        <button @click="hide">閉じる</button>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  methods: {
    show: function () {
      this.$modal.show(this.displayName);
    },
    hide: function () {
      this.$modal.hide(this.displayName);
    },
  },
  props: {
    displayName: String,
  },
};
</script>
<style>
.modal-header,
.modal-body {
  padding: 5px 25px;
}
.modal-header {
  border-bottom: 1px solid #ddd;
}
</style>