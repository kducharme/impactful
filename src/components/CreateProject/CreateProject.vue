<template>
  <div class="create">
    <Questions />
    <Progress
    :step="this.step"
    :button="this.button"
    @next="next"
    @previous="previous"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Progress from "../Progress.vue";
import Questions from "./Questions.vue";

export default {
  name: "createproject",
  components: {
    Progress,
    Questions
  },
  data() {
    return {
      step: {
        activeStep: 1,
        totalSteps: 5
      },
      button: {
        continue: true,
        previous: false
      }
    };
  },
  methods: {
    next() {
      if (this.step.activeStep < this.step.totalSteps) {
        this.step.activeStep = this.step.activeStep + 1;
        this.button.continue = true;
      }
      if (this.step.activeStep === this.step.totalSteps) {
        this.button.continue = false;
      }
      if(this.step.activeStep > 1) {
        this.button.previous = true;
      }
      if(this.step.activeStep === 1) {
        this.button.previous = false;
      }
    },
    previous() {
      if (this.step.activeStep > 1) {
        this.step.activeStep = this.step.activeStep - 1;
        this.button.previous = true;
      }
      if (this.step.activeStep === 1) {
        this.button.previous = false;
      }
      if (this.step.activeStep >= 1) {
        this.button.continue = true;
      }
    }
  },
  computed: {
    ...mapState(["projects", "programActive"])
  },
  mounted() {
    console.log(this.button)
  }
};
</script>

<style scoped lang='scss'>
@import "../../styles/variables";
@import "../../styles/mixins";

.create {
  height: calc(100vh - 44px);
  width: 100vw;
  background-color: white;
  margin: 0;
}
</style>