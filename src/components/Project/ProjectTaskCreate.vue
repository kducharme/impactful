<template>
  <div class="create__bg">
    <div
      class="create"
      :style="{
        top: position.top + 50 + 36 + 'px',
        left: position.left + 'px'
      }"
    >
      <textarea type="text" class='create__name' placeholder="Task name"></textarea>
      <input type="date" class='create__descript' placeholder="Due date">
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
  background-color: rgba(29, 29, 29, 0);
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
  padding: 12px 8px 2px 8px;
  textarea, input {
    height: 28px;
    width: 100%;
    border: none;
    padding-left: 10px;
    resize: none;
  }
  .create__name {
    font-size: 13px;
    font-weight: $weightMedium;
  }
  .create__name::placeholder {
    font-weight: $weightLight;
    color: $colorPrimaryLight;
  }
  ::-webkit-datetime-edit {
    height: 25px;
    font-family: 'Lato';
    font-size: 13px;
    color: $colorPrimaryLight;
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