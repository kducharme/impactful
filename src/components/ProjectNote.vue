<template>
    <div class="note">
        <!-- <img v-attr="src= imageLink" :src="'public/' + noteDetails.writer.image"/> -->
        <span class="note__unread"></span>
        <img :src="noteDetails.writer.image" />
        <div class="note__content">
            <div class="note__head">
                <p class='note__author'>{{ `${noteDetails.writer.first_name} ${noteDetails.writer.last_name}`}}</p>
                <p class='note__date'>{{ `${noteDetails.writer.date_created}`}}</p>
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
  padding: 24px 24px 24px 20px;
  font-size: 13px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 3px;
    margin-right: 16px;
  }
  .note__content {
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