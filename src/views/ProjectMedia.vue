<template>
    <div class="content">

    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "projectmedia",
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
    console.log(this.$route)
  }
};
</script>

<style scoped lang="scss">
@import "../styles/variables";
@import "../styles/mixins";

</style>

