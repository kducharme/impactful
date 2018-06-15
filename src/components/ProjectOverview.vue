<template>
    <div class="overview">
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "header",
  data() {
    return {
      totalProjects: 12,
      selected: 0
    };
  },
  computed: {
    ...mapState(["projects"])
  }
  //   methods: {
  //     ...mapActions(["getProjects"])
  //   },
  //   beforeMount() {
  //     const id = window.location.href.split("programs/")[1];
  //     this.getProjects(id);
  //   }
};
</script>

<style lang='scss'>
@import "../styles/variables";
@import "../styles/mixins";
.overview {
    
  
}
</style>