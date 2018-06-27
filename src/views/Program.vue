<template>
  <div class="program">
    <SubNavigation
    :subLinks="this.links"
    :subButton="this.button"
    :subDestination="this.destination"
    @active="showComponent"
    />
    <ProgramProjects
      :class="[activeView === 'projects' ? '' : 'feature__hide']"
    />
    <ProgramDetails
      :class="[activeView === 'details' ? '' : 'feature__hide']"
    />
    <ProgramMedia
      :class="[activeView === 'media' ? '' : 'feature__hide']"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SubNavigation from "../components/SubNavigation.vue";
import ProgramProjects from "./ProgramProjects.vue";
import ProgramDetails from "./ProgramDetails.vue";
import ProgramMedia from "./ProgramMedia.vue";

export default {
  name: "program",
  components: {
    SubNavigation,
    ProgramProjects,
    ProgramDetails,
    ProgramMedia
  },
  data() {
    return {
      activeView: null,
      links: {
        linkOne: "Projects",
        linkTwo: "Details",
        linkThree: "Media"
      },
      destination: {
        one: "/projects",
        two: "/details",
        three: "/media"
      },
      button: {
        text: "Create project",
        action: this.addProgram
      }
    };
  },
  methods: {
    addProgram() {},
    ...mapActions([
        "getProjects",
        "setActiveProgramOnLoad"
    ]),
    showComponent() {
      const view = this.$route.path.split("/").pop();
      switch (view) {
        case "projects":
          this.activeView = "projects";
          break;
        case "details":
        console.log('program details')
          this.activeView = "details";
          break;
        case "media":
        console.log('program media')
          this.activeView = "media";
        default:
      }
    }
  },
  computed: {
    ...mapState(["projects", "programActive"])
  }
};
</script>

<style lang='scss'>
.feature__hide {
  display: none!important;
}
</style>