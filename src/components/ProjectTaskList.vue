<template>
  <div class="taskList">
    <div class="feature__title taskList__header">
      <h4>To-do's</h4>
      <button class="taskList__add button__primary">Add new</button>
    </div>
    <div class="taskList__count">
      <p class="taskList__tab tab__left taskList__active">In progress (5)</p>
      <p class="taskList__tab tab__right">Completed (2)</p>
    </div>
    <div class="taskList__list">
      <ProjectTask
          v-for="task in allTasks"
          :taskDetails="task"
          :key="task.id"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProjectTask from "../components/ProjectTask.vue";

export default {
  name: "tasklist",
  components: {
    ProjectTask
  },
  data() {
    return {
      allTasks: []
    };
  },
  methods: {
    loadTasks() {
      const id = window.location.href.split("/projects/")[1];
      fetch(`http://localhost:3000/tasks?project=${id}`)
        .then(r => r.json())
        .then(t => {
          t.forEach(task => {
            fetch(`http://localhost:3000/users?id=${task.owner}`)
              .then(r => r.json())
              .then(owner => {
                task.ownerDetails = owner[0];
                this.allTasks.push(task);
              });
          });
        });
        console.log(this.allTasks)
    }
  },
  computed: {
    ...mapState(["projects"])
  },
  beforeMount() {
    this.loadTasks();
  }
};
</script>

<style lang='scss'>
@import "../styles/variables";
@import "../styles/mixins";
.taskList {
  width: 100%;
  .taskList__header {
    @include display-flex(space-between, center, row);
    width: 100%;
  }
  .taskList__add {
    height: 30px;
    width: 80px;
    font-size: 12px;
    color: white !important;
    background-color: $colorFontDark;
  }
  .taskList__count {
    @include display-flex(center, center, row);
    background-color: $grayFill;
    border-bottom: 1px solid $grayBorder;
    height: 36px;
    .taskList__tab {
      width: 50%;
      font-size: 12px;
      color: $colorPrimaryLight;
      text-align: center;
    }
    .taskList__active {
      font-size: 13px;
      font-weight: $weightHeavy;
      color: $colorAccent;
    }
    .tab__left {
      text-align: right;
      margin-right: 25px;
    }
    .tab__right {
      text-align: left;
      margin-left: 25px;
    }
  }
}
</style>