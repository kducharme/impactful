<template>
  <div class="progress">
    <div class="progress__left">
        <button>Back</button>
    </div>
    <div class="progress__center">
        <p>Step {{step.activeStep}} of {{step.totalSteps}}</p>
    </div>
    <div class="progress__right">
        <button>Continue</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "create-progress",
  props: {
    step: {
      type: Object
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang='scss'>
@import "../styles/variables";
@import "../styles/mixins";

.progress {
  @include display-flex(space-between, center, row);
  width: 100vw;
  height: 56px;
  padding: 0 30px;
  background: white;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.3);
  position: absolute;
  bottom: 0;
  left: 0;
  .progress__left {
    button {
      font-size: 14px;
      font-weight: $weightMedium;
      height: 36px;
      width: 100px;
      border: 1px solid $colorFontMedium;
      border-radius: 3px;
      color: $colorFontMedium;
    }
  }
  .progress__center {
    font-size: 14px;
  }
  .progress__right {
    button {
      font-size: 14px;
      font-weight: $weightMedium;
      height: 36px;
      width: 100px;
      background: $colorAccent;
      border-radius: 3px;
      color: white;
    }
  }
}
</style>