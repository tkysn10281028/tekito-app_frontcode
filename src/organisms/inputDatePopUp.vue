<template>
  <div id="input-pop-up">
    <modal
      :name="displayName"
      :draggable="true"
      :resizable="false"
      :width="400"
      :height="300"
    >
      <div class="modal-body-content">
        <p>出勤予定時刻</p>
        <input type="time" v-model="scheduledAttendanceTime" />
      </div>
      <div class="modal-body-content">
        <p>退勤予定時刻</p>
        <input type="time" v-model="scheduledLeavingTime" />
      </div>
      <div class="modal-body">
        <button class="modal-body-button" @click="hide">OK</button>
      </div>
    </modal>
  </div>
</template>
<script>
export default {
  props: {
    displayName: String,
  },
  data() {
    return {
      scheduledAttendanceTime: this.attendanceTime,
      scheduledLeavingTime: this.leavingTime,
    };
  },
  methods: {
    show: function () {
      this.$modal.show(this.displayName);
    },
    hide: function () {
      this.$modal.hide(this.displayName);
      if (this.scheduledAttendanceTime && this.scheduledLeavingTime) {
        let obj = {
          attendanceTime: this.scheduledAttendanceTime,
          LeavingTime: this.scheduledLeavingTime,
        };
        this.$emit("changeScheduledTime", obj);
      }
    },
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
.modal-body-content {
  padding: 5px 5px;
  margin: 10;
  display: flex;
  justify-content: center;
}
.modal-body-button {
  width: 20%;
  height: 15%;
  position: absolute;
  bottom: 20px;
  background: #eee;
  border-radius: 3px;
  color: #313131;
}
</style>