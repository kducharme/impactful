<template>
    <div class="overview">
        <ProjectOverviewStatic
            :class="[editProject ? 'overview__hide' : '']"
            :project="projectData"
            :key='projectData.id'
        />
        <ProjectOverviewEdit
            :class="[editProject ? '' : 'overview__hide']"
            :project="projectData"
            @done="finishEdit"
            @updated="updateProject"
        />
    </div>

</template>

<script>
import { mapState, mapActions } from "vuex";
import ProjectOverviewStatic from "./ProjectOverviewStatic.vue";
import ProjectOverviewEdit from "./ProjectOverviewEdit.vue";

export default {
  name: "overview",
  props: ["editProject"],
  data() {
      return {
          projectData: {}
      }
  },
  components: {
    ProjectOverviewStatic,
    ProjectOverviewEdit
  },
  methods: {
    finishEdit() {
        this.$emit('edit')
    },
    updateProject(update) {
        console.log(update)
        this.projectData.name = update.name;
        this.projectData.description = update.description;
        this.projectData.budget = update.budget;
        this.projectData.updated = update.date_updated;
        console.log(this.projectData)
    },
    getManager(id) {
      fetch(`http://localhost:3000/users?id=${id}`)
        .then(r => r.json())
        .then(m => {
          const name = `${m[0].first_name} ${m[0].last_name}`;
          this.projectData.manager = name;
        });
    },
    getLocation(id) {
      fetch(`http://localhost:3000/locations?id=${id}`)
        .then(r => r.json())
        .then(l => {
          const address = `${l[0].street_address} ${l[0].city}, ${l[0].state} ${
            l[0].zip
          }`;
          this.projectData.location = address;
        });
    },
    getDate() {
      const date = new Date();
      const monthList = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const d = date.getDate();
      const m = date.getMonth();
      const y = date.getFullYear();
      const fullDate = `${monthList[m]} ${d}, ${y}`;
      return fullDate;
    }
  },
  beforeMount() {
    const id = window.location.href.split("projects/")[1];
    fetch(`http://localhost:3000/projects?id=${id}`)
      .then(r => r.json())
      .then(proj => {
        this.projectData = {
          name: proj[0].name,
          description: proj[0].description,
          type: proj[0].type,
          created: proj[0].date_created,
          due: proj[0].date_due,
          updated: proj[0].date_updated,
          deleted: proj[0].date_deleted,
          budget: proj[0].budget,
          managerId: proj[0].manager,
          manager: this.getManager(proj[0].manager),
          locationId: proj[0].location,
          location: this.getLocation(proj[0].location)
        };
      });
  }
};
</script>

<style lang='scss'>
@import "../../styles/variables";
@import "../../styles/mixins";
.overview {
  @include display-flex(flex-start, flex-start, column);
  width: 100%;
  .overview__hide {
    display: none !important;
  }
}
</style>