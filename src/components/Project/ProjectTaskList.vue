<template>
  <div class="taskList">
    <div class="feature__title taskList__header">
      <h4>To-do's</h4>
      <button
        class="button__primary"
        v-on:click="createNewTask"
      >Add new</button>
      <ProjectTaskCreate
        :position="this.position"
        :allTasks="this.allTasks"
        :createActive="this.createActive"
        @close="closeNewTask"
      />
    </div>
    <div class="taskList__count">
      <p class="taskList__tab tab__left taskList__active">In progress {{ inProgress.length }}</p>
      <p class="taskList__tab tab__right">Completed {{ completed.length }}</p>
    </div>
    <div
      class="taskList__list"
      :class="(createActive) ? 'task__create' : ''"
    >
      <ProjectTask
          class='list__tasks'
          v-for="task in allTasks"
          :taskDetails="task"
          :key="task.id"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProjectTask from "./ProjectTask.vue";
import ProjectTaskCreate from "./ProjectTaskCreate.vue";

export default {
  name: "tasklist",
  components: {
    ProjectTask,
    ProjectTaskCreate
  },
  data() {
    return {
      allTasks: [],
      inProgress: [],
      completed: [],
      position: {
        top: '',
        left: ''
      },
      createActive: false
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
                this.countTaskTypes(task);
              });
          });
        });
    },
    createNewTask(e) {
      this.position.top = e.target.parentElement.offsetTop;
      this.position.left = e.target.parentElement.offsetLeft;
      this.createActive = true;
    },
    closeNewTask() {
      this.createActive = false;
    },
    countTaskTypes(task) {
      if (!task.completed) {
        this.inProgress.push(task);
      }
      if (task.completed) {
        this.completed.push(task);
      }
    }
  },
  computed: {
    ...mapState(["projects"])
  },
  beforeMount() {
    this.loadTasks();
  },
  mounted() {
    this.position.top = this.$el.offsetTop;
    this.position.left = this.$el.offsetLeft;
  }
};
</script>

<style lang='scss'>
@import "../../styles/variables";
@import "../../styles/mixins";
.taskList {
  width: 100%;
  .taskList__header {
    @include display-flex(space-between, center, row);
    width: 100%;
      button {
        height: 30px;
        width: 80px;
        font-size: 12px;
        color: white !important;
        background-color: $colorFontDark;
      }
      button:hover {
        opacity: .7!important;
      }
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
  .list__tasks:last-child {
    border-bottom: none;
  }
  .list__tasks:last-child:hover {
    border-bottom: 1px solid $grayBorder;
    border-bottom-left-radius: 5px;
  }
  .hide {
    display: none;
  }
  .task__create {
    margin-top: 80px;
    border-top: 1px solid $grayBorder;
  }
}
</style>