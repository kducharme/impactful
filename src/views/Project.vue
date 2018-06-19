<template>
  <div class="programs" id='programs'>
    <div class="subnav">
      <SubNavigation 
        :subLinks="this.links"
        :subButton="this.button"
      />
    </div>
    <div class="content">
        <ProjectOverview class='col1'/>
        <ProjectTimeline class='col2 feature'/>
        <ProjectTaskList class='col3 feature'/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Card from "../components/Card.vue";
import SubNavigation from "../components/SubNavigation.vue";
import ProjectOverview from "../components/Project/ProjectOverview.vue";
import ProjectTimeline from "../components/Project/ProjectTimeline.vue";
import ProjectTaskList from "../components/Project/ProjectTaskList.vue";
import ProjectMedia from "../components/Project/ProjectMedia.vue";

export default {
  name: "project",
  data() {
    return {
      links: {
        linkOne: 'Overview',
        linkTwo: 'Media'
      },
      button: {
        text: 'Edit project'
      }
    }
  },
  components: {
    SubNavigation,
    ProjectOverview,
    ProjectTimeline,
    ProjectTaskList,
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
  padding: 30px 8% 0 8%;
  .col1 {
      width: 15%;
      min-width: 200px;
      max-width: 300px;
      margin: 16px 25px 0 0;
      background-color: transparent;
  }
  .col2 {
      width: 60%;
      min-width: 500px;
      height: 100%;
  }
  .col3 {
      width: 25%;
      min-width: 320px;
      margin: 0 20px 0 20px;
  }
  .feature {
      border: 1px solid $grayBorder;
      background-color: white;
      border-radius: 5px;
  }
}
</style>

