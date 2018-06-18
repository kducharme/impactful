<template>
  <div class="task">
    <div class="feature__title task__header">
      <h4>To-do's</h4>
      <button class="task__add button__primary">Add new</button>
    </div>
    <div class="task__count">
      <p class="task__tab tab__left task__active">In progress (5)</p>
      <p class="task__tab tab__right">Completed (2)</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "tasks",
  data() {
    return {};
  },
  computed: {
    ...mapState(["projects"])
  }
};
</script>

<style lang='scss'>
@import "../styles/variables";
@import "../styles/mixins";
.task {
  width: 100%;
  .task__header {
    @include display-flex(space-between, center, row);
    width: 100%;
  }
  .task__add {
    height: 30px;
    width: 80px;
    font-size: 12px;
    color: white !important;
    background-color: $colorFontDark;
  }
  .task__count {
    @include display-flex(center, center, row);
    background-color: $grayFill;
    border-bottom: 1px solid $grayBorder;
    height: 36px;
    .task__tab {
      width: 50%;
      font-size: 12px;
      color: $colorPrimaryLight;
      text-align: center;
    }
    .task__active {
      font-size: 13px;
      font-weight: $weightHeavy;
      color: $colorAccent;
    }
    .tab__left {
      text-align: right;
      margin-right: 25px;
    }
    .tab__right {
      text-align: left;
      margin-left: 25px;
    }
  }
}
</style>