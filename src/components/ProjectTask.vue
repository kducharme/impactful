<template>
    <div class="task">
      <div class="task__left">
          <div class="task__complete"></div>
      </div>

      <div class="task__middle">
        <p class='task__name'>{{ taskDetails.name }}</p>
        <p class='task__due'>{{ taskDetails.date_due }}</p>
      </div>

      <div class="task__right">
        <img :src="taskDetails.ownerDetails.image" />
      </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "projecttask",
  props: {
    taskDetails: {
      type: Object
    }
  }
};
</script>

<style lang='scss'>
@import "../styles/variables";
@import "../styles/mixins";
.task {
  @include display-flex(space-between, flex-start, row);
  padding: 15px 10px;
  margin: 0 10px 0 10px;
  border-bottom: 1px solid $grayBorder;
  .task__left {
    width: 15px;
    margin-right: 15px;
    .task__complete {
      width: 15px;
      height: 15px;
      border-radius: 100%;
      content: "";
      background-color: transparent;
      border: 1.5px solid $colorPrimaryLight;
      margin-top: 4px;
    }
  }
  .task__middle {
    @include display-flex(flex-start, flex-start, column);
    width: 200px;
    .task__name {
      font-size: 13px;
      font-weight: $weightMedium;
      margin-bottom: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .task__due {
      font-size: 12px;
      color: $colorPrimaryLight;
    }
  }
  .task__right {
      img {
          margin-left: 10px;
          width: 30px;
          height: 30px;
          border-radius: 3px;
      }
  }
}
</style>