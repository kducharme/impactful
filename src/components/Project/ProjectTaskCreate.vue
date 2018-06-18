<template>
  <div
    class="create__bg"
    v-on:click="close"
  >
    <div
      class="create"
      :style="{
        top: position.top + 50 + 36 + 'px',
        left: position.left + 'px'
      }"
    >
      <div class="create__name">
        <input type="text" class='create__name' placeholder="Enter task name" />
      </div>
      <div class="create__date">
        <p>Due:</p>
        <input type="date" class='create__date' placeholder="Select due date">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "projecttask",
  props: {
    position: {
      type: Object
    }
  },
  methods: {
    close() {

    }
  }
};
</script>

<style lang='scss'>
@import "../../styles/variables";
@import "../../styles/mixins";

.create__bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 100vw;
  height: 100vh;
  background-color: rgba(29, 29, 29, .3);
}

.create {
  position: relative;
  background-color: white;
  width: calc(100% - 16% - 14% - 61% - 2px);
  height: 80px;
  min-width: 318px;
  position: fixed;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 12px 5px 2px 8px;
  input {
    height: 28px;
    border: none;
    padding-left: 10px;
    resize: none;
  }
  .create__name {
    @include display-flex(flex-start, center, row);
    height: 28px;
    input {
      width: 100%;
      font-size: 14px;
      font-weight: $weightMedium;
    }
    input::placeholder {
      color: $colorPrimaryLight;
      font-weight: $weightLight;
    }
  }
  .create__date {
    @include display-flex(flex-start, center, row);
    height: 28px;
    padding-left: 10px;
    width: 60%;
    min-width: 130px;
    p {
      font-size: 12px;
      color: $colorPrimaryLight;
    }
    input {
      padding-left: 8px;
      margin-top: 6px;
    }
  }
  ::-webkit-datetime-edit {
    height: 25px;
    font-family: 'Lato';
    font-size: 13px;
    color: $colorPrimaryDark;
  }
::-webkit-datetime-edit-fields-wrapper { }
::-webkit-datetime-edit-text { color: $colorPrimaryDark; }
::-webkit-datetime-edit-month-field {  }
::-webkit-datetime-edit-day-field {  }
::-webkit-datetime-edit-year-field {  }
::-webkit-inner-spin-button { display: none; }
::-webkit-calendar-picker-indicator { color: $colorPrimaryDark; width: 12px; }
}
</style>