<template>
  <div class="create">
    <Questions
    :questions="this.questions"
    :step="this.step"
    />
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
      questions: [],
      step: {
        activeStep: 0,
        totalSteps: 5
      },
      button: {
        continue: true,
        previous: false
      }
    };
  },
  methods: {
    getQuestions(action) {
      if(action === 'prev') {
        this.step.activeStep--;
      }
      if(action !== 'prev') {
        this.step.activeStep++
      }
      fetch(`http://localhost:3000/questions?page=${this.step.activeStep}`)
        .then(r => r.json())
        .then(q => this.questions = q);
    },
    next() {
      this.getQuestions();
      if (this.step.activeStep < this.step.totalSteps) {
        this.button.continue = true;
      }
      if (this.step.activeStep === this.step.totalSteps) {
        this.button.continue = false;
      }
      if (this.step.activeStep > 1) {
        this.button.previous = true;
      }
      if (this.step.activeStep === 1) {
        this.button.previous = false;
      }
    },
    previous() {
      this.getQuestions('prev');
      if (this.step.activeStep > 1) {
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
  beforeMount() {
    this.getQuestions();
  },
  beforeUpdate() {
    // console.log('update')
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