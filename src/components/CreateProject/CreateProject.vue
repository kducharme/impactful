<template>
  <div class="create">
    <Questions />
    <Progress
    :step="this.step"
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
        totalSteps: 12
      }
    };
  },
  methods: {},
  computed: {
    ...mapState(["projects", "programActive"])
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