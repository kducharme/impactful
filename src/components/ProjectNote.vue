<template>
      <div class="note">
          {{ noteDetails.text }}
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
  },
  mounted: function() {
      console.log(this.noteDetails)
  }
};
</script>

<style lang='scss'>
@import "../styles/variables";
@import "../styles/mixins";
.note {
  @include display-flex(flex-start, center, row);
  background-color: white;
  border-bottom: 1px solid $grayBorder;
  height: 100px;
  padding: 0 30px 0 30px;
  font-size: 13px;
}
</style>