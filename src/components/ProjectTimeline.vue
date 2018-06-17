<template>
    <div class="timeline">
        <div class="feature__title">
            <h4>Project updates <span>({{ unreadUpdates }} new)</span></h4>
        </div>
        <div class="timeline__write">
            <div></div>
            <input v-model="update" @keyup.enter="saveUpdate" placeholder="Post a note...">
        </div>
        
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "timeline",
  data() {
    return {
      update: '',
      unreadUpdates: 2
    };
  },
  methods: {
      saveUpdate() {
          console.log(this.update)
          this.update = '';
      }
  },
  computed: {
    ...mapState(["projects"])
  }
};
</script>

<style lang='scss'>
@import "../styles/variables";
@import "../styles/mixins";
@import "../styles/project";
.timeline {
  @include display-flex(flex-start, flex-start, column);
  .timeline__write {
    @include display-flex(flex-start, center, row);
    height: 75px;
    width: 100%;
    padding: 0 20px 0 20px;
    border-bottom: 1px solid $grayBorder;
    div {
        border: 2px solid $grayBorder;
        width: 40px;
        height: 40px;
    }
    input {
        width: 100%;
        height: 100%;
        border: none;
        padding-left: 15px;
        font-size: 14px;
    }
    input::placeholder {
        color: $colorFontMedium;
    }
  }
}
</style>