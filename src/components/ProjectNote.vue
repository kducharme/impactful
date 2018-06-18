<template>
    <div class="note">
        <div class="note__left">
            <div :class="(noteDetails.read) ? 'note__read' : 'note__unread'"></div>
            <img :src="noteDetails.writer.image" />
        </div>
        <div class="note__right">
            <div class="note__head">
                <p class='note__author'>{{ `${noteDetails.writer.first_name} ${noteDetails.writer.last_name}`}}</p>
                <p class='note__date'>{{ `${noteDetails.date_created}`}}</p>
            </div>
            <p class='note__text'>{{ noteDetails.text }}</p>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "projectnote",
  props: {
    noteDetails: {
      type: Object
    }
  }
};
</script>

<style lang='scss'>
@import "../styles/variables";
@import "../styles/mixins";
.note {
  @include display-flex(flex-start, flex-start, row);
  background-color: white;
  border-bottom: 1px solid $grayBorder;
  padding: 24px 0 24px 0;
  margin: 0 20px 0 20px;
  font-size: 13px;
  position: relative;
  .note__left {
    position: relative;
    .note__unread {
      content: "";
      position: absolute;
      z-index: 999;
      top: -3px;
      right: 12px;
      width: 12px;
      height: 12px;
      border-radius: 100%;
      background-color: $colorAccent;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
    }
    img {
      display: inline-block;
      position: relative;
      width: 40px;
      height: 40px;
      border-radius: 3px;
      margin-right: 16px;
    }
  }
  .note__right {
    @include display-flex(flex-start, flex-start, column);
    width: calc(100% - 40px);
    .note__head {
      @include display-flex(flex-start, flex-start, row);
      margin-bottom: 5px;
      .note__author {
        font-size: 14px;
        font-weight: $weightHeavy;
        margin-right: 8px;
      }
      .note__date {
        font-size: 13px;
        color: $colorPrimaryLight;
      }
    }
    .note__text {
      font-size: 13px;
      line-height: 1.5;
    }
  }
}
</style>