<template>
    <div class="tasks">
        project tasks
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "tasks",
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["projects"])
  }
};
</script>

<style lang='scss'>
@import "../styles/variables";
@import "../styles/mixins";

.tasks {

  
}
</style>