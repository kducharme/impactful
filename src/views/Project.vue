<template>
  <div class="programs" id='programs'>
    <div class="subnav">
      <SubNavigation />
    </div>
    <div class="content">
        <ProjectOverview class='col1 feature'/>
        <ProjectTimeline class='col2 feature'/>
        <ProjectTasks class='col3 feature'/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Card from "../components/Card.vue";
import SubNavigation from "../components/SubNavigation.vue";
import ProjectOverview from "../components/ProjectOverview.vue";
import ProjectTimeline from "../components/ProjectTimeline.vue";
import ProjectTasks from "../components/ProjectTasks.vue";
import ProjectMedia from "../components/ProjectMedia.vue";

export default {
  name: "project",
  components: {
    SubNavigation,
    ProjectOverview,
    ProjectTimeline,
    ProjectTasks,
    ProjectMedia,
  },
  methods: {
    ...mapActions(["getProjects", "setActiveProgramOnLoad", "setActiveProjectOnLoad"])
  },
  beforeMount() {
    const programId = window.location.href.split("programs/")[1].split("/")[0];
    this.setActiveProgramOnLoad(programId);

    const projectId = window.location.href.split("projects/")[1]
    this.setActiveProjectOnLoad(projectId);
  }
};
</script>

<style scoped lang="scss">
@import "../styles/variables";
@import "../styles/mixins";

.content {
  height: calc(100vh - 44px - 40px);
  @include display-flex(center, flex-start, row);
  padding: 30px 4% 0 4%;
  .col1 {
      width: 23%;
      min-width: 260px;
      margin: 0 20px 0 20px;
  }
  .col2 {
      width: 54%;
      height: 100%;
  }
  .col3 {
      width: 23%;
      min-width: 320px;
      height: calc(100vh - 44px - 40px - 30px - 30px);
      margin: 0 20px 0 20px;
  }
  .feature {
      border: 1px solid $grayBorder;
      background-color: white;
      border-radius: 5px;
  }
}
</style>

