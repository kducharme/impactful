<template>
  <div class="program">
    <SubNavigation
    :subLinks="this.links"
    :subButton="this.button"
    />
    <div class="content">
      <GroupList />
      <div class="content__right">
        <TableHeader
          :selected='this.selectedProjects'
        />

        <div class="table">

          <div class="table__header">
            <input
              v-on:click="selectAllProjects"
              type='checkbox'
              class='col col1'>
            <p class='col col2'>Project name</p>
            <p class='col col3'>Manager</p>
            <p class='col col4'>Location</p>
            <p class='col col5'>Budget</p>
            <p class='col col6'>Date created</p>
            <p class='col col7'>Last updated</p>
          </div>

          <div class="table__body">
            <div
              class='row'
              v-for="project in projects"
              :key="project.id"
              :id="project.id">
              <input
                v-model="selectedProjects"
                type='checkbox'
                :id='project.id'
                :value='project.id'
                class='col col1'>
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
import TableHeader from "../components/Program/TableHeader.vue";
import GroupList from "../components/Program/GroupList.vue";
export default {
  name: "program",
  components: {
    SubNavigation,
    TableHeader,
    GroupList
  },
  data() {
    return {
      links: {
        linkOne: "Projects",
        linkTwo: "Details",
        linkThree: 'Media'
      },
      button: {
        text: "Create project",
        action: this.addProgram
      },
      selectedProjects: []
    };
  },
  methods: {
    addProgram() {},
    ...mapActions(["getProjects", "setActiveProgramOnLoad"]),
    getProjectData: function(id) {
      this.getProjects(id);
    },
    getActiveProgramData: function(id) {
      this.getActiveProgram(id);
    },
    selectAllProjects() {
      if(this.selectedProjects.length === 0) {
        this.projects.forEach(p => {
          this.selectedProjects.push(p.id)
          p.checked = true;
        })
      }
      else {
        this.selectedProjects = [];
        this.projects.forEach(p => {
          p.checked = false;
        })
      }
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
@import "../styles/table";
@import "../styles/variables";
@import "../styles/mixins";
.content {
  background-color: $colorBackground;
  @include display-flex(flex-start, flex-start, row);
  height: calc(100vh - 44px - 40px); // Height of screen minus 2 navs
  
  .content__right {
    @include display-flex(space-between, flex-start, column);
    width: calc(100vw - 300px);
  }
}

.checked {
  background-color: red;
}
</style>