<template>
    <div class="content">
      details page
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "programdetails",
  components: {

  },
  methods: {
    ...mapActions([
      "getProjects",
      "setActiveProgramOnLoad",
      "setActiveProjectOnLoad"
    ]),
  },
  beforeMount() {
  }
};
</script>

<style scoped lang="scss">
@import "../styles/variables";
@import "../styles/mixins";

</style>

