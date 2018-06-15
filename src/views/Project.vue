<template>
  <div class="programs" id='programs'>
    <div class="subnav">
      <SubNavigation />
    </div>
    <div class="content">
  
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Card from "../components/Card.vue";
import SubNavigation from "../components/SubNavigation.vue";

export default {
  name: "project",
  data: {
    programList: "programs"
  },
  components: {
    SubNavigation
  },
  methods: {
    ...mapActions(["getProjects", "setActiveProgramOnLoad"])
  },
  beforeMount() {
    let id = window.location.href.split("programs/")[1].split("/")[0];
    this.setActiveProgramOnLoad(id);
  }
};
</script>

<style scoped lang="scss">
@import "../styles/variables";
@import "../styles/mixins";

.content {
  height: calc(100vh - 44px - 40px);
  @include display-flex(flex-start, flex-start, row);
  padding: 30px 100px 0 100px;
}
</style>

