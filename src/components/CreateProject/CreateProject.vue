<template>
  <div class="newProject">
    Create new project
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "createproject",
  components: {
    // SubNavigation
  },
  data() {
    return {
      step: null
    };
  },
  methods: {},
  computed: {
    ...mapState(["projects", "programActive"])
  }
};
</script>

<style lang='scss'>
</style>