<template>
  <div class="programs" id='programs'>
    <div class="subnav">
      <SubNavigation 
        :subLinks="this.link"
        :subDestination="this.destination"
        :subButton="this.button"
      />
    </div>
    <div>
      <ProjectManage />
      <ProjectDetails />
      <ProjectMedia />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProjectManage from "./ProjectManage.vue";
import ProjectDetails from "./ProjectDetails.vue";
import ProjectMedia from "./ProjectMedia.vue";
import SubNavigation from "../components/SubNavigation.vue";

export default {
  name: "project",
  data() {
    return {
      link: {
        linkOne: 'Manage',
        linkTwo: 'Details',
        linkThree: 'Media',
      },
      destination: {
        one: '/',
        two: '/details',
        three: '/media',
      },
      button: {
        text: 'Edit project',
        action: this.editProject
      }
    }
  },
  components: {
    SubNavigation,
    ProjectManage,
    ProjectDetails,
    ProjectMedia
  },
  methods: {
    ...mapActions([
        "getProjects",
        "setActiveProgramOnLoad",
        "setActiveProjectOnLoad"
    ]),
    editProject() {
      this.edit = !this.edit;
    },
    showComponent() {

    }
  },
  beforeMount() {
    console.log(this.$route)
    this.setActiveProgramOnLoad(this.$route.params.programId);
    this.setActiveProjectOnLoad(this.$route.params.projectId);
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

