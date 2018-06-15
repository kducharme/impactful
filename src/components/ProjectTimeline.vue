<template>
    <div class="timeline">
        project timeline
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "timeline",
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

.timeline {

  
}
</style>