<template>
  <div class='progress'>
    <span class='progress__bar'></span>
    <div class='progress__left'>
        <button
            :class="[button.previous ? '' : 'progress__button--disabled']"
            :disabled="!button.previous"
            @click="previous"
        >Back</button>
    </div>
    <div class='progress__center'>
        <p>Step {{step.activeStep}} of {{step.totalSteps}}</p>
    </div>
    <div class='progress__right'>
        <button
            :class="[button.continue ? '' : 'progress__button--disabled']"
            :disabled="!button.continue"
            @click="next"
        >Continue</button>
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
    },
    button: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    next() {
      this.$emit("next");
      this.updateProgress();
    },
    previous() {
      this.$emit("previous");
      this.updateProgress();
    },
    updateProgress() {
      const progress =
        1 -
        (this.step.totalSteps - this.step.activeStep) / this.step.totalSteps;
      document.querySelector(".progress__bar").style.width =
        parseFloat(progress * 100) + "%";
    }
  },
  mounted() {
    this.updateProgress();
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
  border-top: 1px solid $grayBorder;
  position: absolute;
  bottom: 0;
  left: 0;
  .progress__button--disabled {
      opacity: .2;
      cursor: default;
  }
  .progress__bar {
    position: absolute;
    margin-left: -30px;
    top: -1.7px;
    background-color: $colorAccent;
    height: 2px;
    width: 0%;
    border-radius: 10px;
  }
  .progress__left {
    button {
      font-size: 14px;
      font-weight: $weightMedium;
      height: 36px;
      width: 100px;
      border: 1px solid $colorPrimaryLight;
      border-radius: 3px;
      color: $colorPrimaryMedium;
    }
    button:hover {
      background: rgba(133, 149, 165, 0.15);
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
    button:hover {
      background: $colorAccentHover;
    }
  }
}
</style>