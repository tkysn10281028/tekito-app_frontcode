<template>
  <div id="input-pop-up">
    <modal
      :name="displayName"
      :draggable="true"
      :resizable="false"
      :width="300"
      :height="200"
    >
      <div class="modal-body-text">
        <p>{{ popUpText }}</p>
      </div>
      <div class="modal-body">
        <button class="modal-body-button" @click="hide">OK</button>
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
    popUpText: String,
  },
};
</script>
<style>
.modal-header,
.modal-body {
  padding: 5px 25px;
  height: 100%;
  display: flex;
  justify-content: center;
}
.modal-body-text {
  padding: 5px 5px;
  margin: 10;
  text-align: center;
}
.modal-body-button {
  width: 20%;
  height: 15%;
  position: absolute;
  bottom: 30px;
  background: #eee;
  border-radius: 3px;
  color: #313131;
}
</style>