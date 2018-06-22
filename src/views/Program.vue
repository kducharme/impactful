<template>
  <div class="program">
    <SubNavigation
    :subLinks="this.links"
    :subButton="this.button"
    />
    <div class="content">
      <Groups />
      <div class="content__right">
        <ProgramHeader />

        <div class="table">

          <div class="table__header">
            <input type='checkbox' class='col col1'>
            <p class='col col2'>Project name</p>
            <p class='col col3'>Manager</p>
            <p class='col col4'>Location</p>
            <p class='col col5'>Budget</p>
            <p class='col col6'>Date created</p>
            <p class='col col7'>Last updated</p>
          </div>

          <div class="table__body">
            <div class='row' v-for="project in projects" :key="project.id" :id="project.id">
              <input type='checkbox' class='col col1'>
              <router-link :to="'/programs/' + programActive + '/projects/' + project.id" class='col col2'>{{project.name}}
            </router-link>
              <p class="col col3">{{ project.manager }}</p>
              <p class="col col4">{{ project.location }}</p>
              <p class="col col5">${{ project.budget }}</p>
              <p class="col col6">{{ project.date_created }}</p>
              <p class="col col7">{{ project.date_updated }}</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SubNavigation from "../components/SubNavigation.vue";
import ProgramHeader from "../components/ProgramHeader.vue";
import Groups from "../components/Groups.vue";
export default {
  name: "program",
  components: {
    SubNavigation,
    ProgramHeader,
    Groups
  },
  data() {
    return {
      links: {
        linkOne: "Projects",
        linkTwo: "Media"
      },
      button: {
        text: "Create project",
        action: this.addProgram
      },
      projectData: null
    };
  },
  methods: {
    addProgram() {},
    ...mapActions(["getProjects", "setActiveProgramOnLoad"]),
    getProjectData: function(id) {
      this.getProjects(id);
    },
    calculateTasks() {
      console.log(this.projectData);
    },
    getActiveProgramData: function(id) {
      this.getActiveProgram(id);
    },
    showOverlay: function(e) {
      const overlay = e.currentTarget.children[0];
      overlay.classList.remove("hide");
    },
    hideOverlay: function(e) {
      const overlay = e.currentTarget.children[0];
      overlay.classList.add("hide");
    }
  },
  beforeMount() {
    const id = window.location.href
      .split("/projects/")[0]
      .split("programs/")[1];
    this.getProjectData(id);
    this.setActiveProgramOnLoad(id);
  },
  computed: {
    ...mapState(["projects", "programActive"])
  }
};
</script>

<style lang='scss'>
@import "../styles/card";
@import "../styles/variables";
@import "../styles/mixins";
.content {
  background-color: white;
  @include display-flex(flex-start, flex-start, row);
  height: calc(100vh - 44px - 40px); // Height of screen minus 2 navs
  .groups {
    background-color: white;
    border-right: 1px solid $grayBorder;
    width: 300px;
    height: 100%;
    .groups__header {
      @include display-flex(space-between, center, row);
      height: 70px;
      border-bottom: 1px solid $grayBorder;
      padding: 0 30px 0 30px;
      p {
        font-size: 18px;
        font-weight: $weightHeavy;
      }
      .groups__button {
        height: 34px;
        width: 88px;
        font-size: 12px;
        color: white !important;
        background-color: $colorFontDark;
      }
      .groups__button:hover {
        opacity: 0.8;
      }
    }
  }
  .content__right {
    @include display-flex(space-between, flex-start, column);
    width: calc(100vw - 300px);
  }
}
</style>