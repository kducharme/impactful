<template>
  <div class="create__bg"
    :class="[createActive ? '' : 'create__hide']"
    v-on:click="close">
    <form class="create" @keyup.enter="createTask" :style="{
          top: position.top + 50 + 36 + 'px',
          left: position.left + 'px'
        }">
      <div class="left">
        <div class="create__name">
          <input v-model="taskName" type="text" class='create__name' placeholder="Enter task name" />
        </div>
        <div class="create__date">
          <label for="taskDate">Due:</label>
          <input v-model="taskDate" type="date" class='create__date' placeholder="Select due date">
        </div>
      </div>
      <div class="right">
        <div class="create__owner">
          <svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
              <g id="Discovery-(v2)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="Artboard-4" transform="translate(-127.000000, -82.000000)" fill="#97A7B8" fill-rule="nonzero">
                      <path d="M133,88 C134.6575,88 136,86.6575 136,85 C136,83.3425 134.6575,82 133,82 C131.3425,82 130,83.3425 130,85 C130,86.6575 131.3425,88 133,88 Z M133,89.5 C130.9975,89.5 127,90.505 127,92.5 L127,94 L139,94 L139,92.5 C139,90.505 135.0025,89.5 133,89.5 Z" id="Shape"></path>
                  </g>
              </g>
          </svg>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "projecttask",
  props: {
    position: {
      type: Object
    },
    allTasks: {
      type: Array
    },
    createActive: {
      type: Boolean
    }
  },
  computed: {
    ...mapState(["activeUser"])
  },
  data() {
    return {
      taskName: null,
      taskDate: null,
      owner: null
    };
  },
  methods: {
    close() {
      this.$emit(this.createActive, false);
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
      let due = this.taskDate.split("-");
      let month = "";
      if (due[1].indexOf(0) === 0) {
        month = due[1].split("")[1];
      } else {
        month = due[1];
      }
      const dueDate = `${monthList[month]} ${due[2]}, ${due[0]}`;
      const fullDate = `${monthList[m]} ${d}, ${y}`;
      return {
        fullDate,
        date,
        dueDate
      };
    },
    getOwner() {
      fetch(`http://localhost:3000/users?id=${this.activeUser}`)
        .then(r => r.json())
        .then(owner => {
          this.newTask.ownerDetails = owner[0];
        });
    },
    createTask(e) {
      if (this.taskName && this.taskDate) {
        const newTask = {
          name: this.taskName,
          date_created: this.getDate().fullDate,
          date_sort: this.getDate().date,
          date_due: this.getDate().dueDate,
          completed: false,
          date_completed: null,
          date_deleted: null,
          project: window.location.href.split("/projects/")[1],
          ownerDetails: this.owner
        };
        this.allTasks.push(newTask);
        console.log(newTask);
      }
      e.preventDefault();
    }
  },
  beforeMount() {
    fetch(`http://localhost:3000/users?id=${this.activeUser}`)
      .then(r => r.json())
      .then(o => {
        this.owner = o[0];
      });
    window.addEventListener('resize', this.onResize)
  }
};
</script>

<style lang='scss'>
@import "../../styles/variables";
@import "../../styles/mixins";
.create__bg {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1001;
  width: 100vw;
  height: 100vh;
  background-color: rgba(29, 29, 29, 0.3);
}

.create {
  @include display-flex(space-between, center, row);
  position: relative;
  background-color: white;
  width: calc(100% - 16% - 14% - 61% - 2px);
  height: 80px;
  min-width: 318px;
  position: fixed;
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 6px 5px 6px 8px;
  .left {
    @include display-flex(flex-start, flex-start, column);
    width: 80%;
    input {
      height: 28px;
      border: none;
      padding-left: 10px;
      resize: none;
    }
    .create__name {
      @include display-flex(flex-start, center, row);
      width: 100%;
      height: 28px;
      input {
        font-size: 13px;
        font-weight: $weightMedium;
      }
      input::placeholder {
        color: $colorPrimaryLight;
        font-weight: $weightLight;
      }
    }
    .create__date {
      @include display-flex(flex-start, center, row);
      height: 28px;
      padding-left: 10px;
      width: 80%;
      min-width: 130px;
      label {
        font-size: 13px;
        color: $colorPrimaryLight;
      }
      input {
        padding-left: 8px;
        margin-top: 6px;
      }
    }
    ::-webkit-datetime-edit {
      height: 25px;
      font-family: "Lato";
      font-size: 13px;
      color: $colorPrimaryDark;
    }
    ::-webkit-datetime-edit-text {
      color: $colorPrimaryDark;
    }
    ::-webkit-inner-spin-button {
      display: none;
    }
    ::-webkit-calendar-picker-indicator {
      color: $colorPrimaryDark;
      width: 12px;
    }
  }
  .right {
    @include display-flex(flex-end, center, row);
    padding-right: 15px;
    width: 20%;
    .create__owner {
      @include display-flex(center, center, row);
      background-color: $colorBackground;
      border: 1px dashed $colorPrimaryLight;
      border-radius: 2px;
      width: 30px;
      height: 30px;
      svg {
        height: 12px;
      }
    }
  }
}
.create__hide {
  display: none!important;
}
</style>