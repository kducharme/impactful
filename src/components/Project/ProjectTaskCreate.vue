<template>
  <div class="create__bg" :class="[createActive ? '' : 'owner__hide']" v-on:click.self="close" @keyup.enter="createTask" >
    <form class="create" :style="{
              top: position.top + 50 + 36 + 'px',
              left: position.left + 'px'
            }">
      <div class="left">
        <div class="create__name" :class="[warningName ? 'warning' : '']">
          <input v-model="taskName" type="text" class='create__name' placeholder="Enter task name" />
        </div>
        <div class="create__date" :class="[warningDate ? 'warning' : '']">
          <label  for="taskDate">Due:</label>
          <input
            v-model="taskDate"
            type="date"
          >
        </div>
      </div>
      <div class="right">
        <div :class="[owner ? '' : 'owner__unselected']" v-on:click="ownerDropdown">
          <svg :class="[owner ? 'owner__hide' : '']" width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <g id="Discovery-(v2)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                      <g id="Artboard-4" transform="translate(-127.000000, -82.000000)" fill="#97A7B8" fill-rule="nonzero">
                          <path d="M133,88 C134.6575,88 136,86.6575 136,85 C136,83.3425 134.6575,82 133,82 C131.3425,82 130,83.3425 130,85 C130,86.6575 131.3425,88 133,88 Z M133,89.5 C130.9975,89.5 127,90.505 127,92.5 L127,94 L139,94 L139,92.5 C139,90.505 135.0025,89.5 133,89.5 Z" id="Shape"></path>
                      </g>
                  </g>
              </svg>
        </div>
        <img :class="[owner ? 'owner__selected' : 'owner__hide']" :src="this.ownerImage" v-on:click="ownerDropdown" />
      </div>
    </form>
    <div class="owner" :class="[ownerActive ? '' : 'owner__hide']" @click.prevent.stop :style="{
          top: position.top + 50 + 36 + 80 + 'px',
          left: position.left + 'px'
        }">
      <div class='owner__option' v-for="user in allUsers[0]" :key="user.id" :id="user.id" v-on:click="selectOwner">
        <img :src="user.image" />
        <h3>{{`${user.first_name} ${user.last_name}`}}</h3>
        <p>({{ user.title }})</p>
      </div>
    </div>
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
    ...mapState(["activeUser", "organization"])
  },
  data() {
    return {
      active: false,
      warningName: false,
      warningDate: false,
      taskName: null,
      taskDate: null,
      taskUser: null,
      ownerActive: false,
      owner: null,
      ownerImage: null,
      allUsers: []
    };
  },
  methods: {
    ownerDropdown() {
      this.ownerActive = !this.ownerActive;
    },
    selectOwner(e) {
      let id = e.currentTarget.id;
      fetch(`http://localhost:3000/users?id=${id}`)
        .then(r => r.json())
        .then(o => {
          this.owner = o[0];
          this.getOwnerImage(o[0]);
          this.ownerActive = false;
        });
    },
    getOwnerImage: function(owner) {
      this.ownerImage = owner.image;
    },
    createTask(e) {
      e.preventDefault();
      if(!this.taskName) {
        this.warningName = true;
      }
      if(!this.taskDate) {
        this.warningDate = true;
      }
      if (this.taskName && this.taskDate) {
        const newTask = {
          name: this.taskName,
          date_created: this.getDate().fullDate,
          date_sort: this.taskDate,
          date_due: this.getDate().dueDate,
          completed: false,
          date_completed: null,
          date_deleted: null,
          project: window.location.href.split("/projects/")[1],
          owner: this.owner.id,
          ownerDetails: this.owner
        };
        this.ownerActive = false;
        fetch("http://localhost:3000/tasks", {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(newTask)
        })
          .then(
            this.allTasks.push(newTask),
            this.allTasks.sort( (a, b) => new Date(a.date_sort) - new Date(b.date_sort) )
          )
          .catch(error => console.log(error));
        this.taskName = "";
        this.taskDate = "";
        this.$emit("close");
        this.owner = false;
      }
    },
    onResize() {
      this.$emit("close");
      this.ownerActive = false;
    },
    close() {
      this.$emit("close");
      this.ownerActive = false;
      document.querySelector('.create__date').classList.remove('warning')
      document.querySelector('.create__name').classList.remove('warning')
      this.warningName = false
      this.warningDate = false
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
        month = due[1].split("")[1] - 1;
      }
      if (due[1].indexOf(0) !== 0) {
        month = due[1] - 1;
      }
      const dueDate = `${monthList[month]} ${due[2]}, ${due[0]}`;
      const fullDate = `${monthList[m]} ${d}, ${y}`;
      return {
        fullDate,
        date,
        dueDate
      };
    }
  },
  beforeMount() {
    fetch(`http://localhost:3000/users?organization=${this.organization}`)
      .then(r => r.json())
      .then(users => {
        this.allUsers.push(users);
      });
    window.addEventListener("resize", this.onResize);
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
  background-color: rgba(29, 29, 29, 0);
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
    // ::-webkit-calendar-picker-indicator {
    //   display: none;
    // }
    // ::-webkit-clear-button {
    //   display: none;
    // }
  }
  .right {
    @include display-flex(flex-end, center, row);
    padding-right: 15px;
    width: 20%;
    .owner__unselected {
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
    .owner__unselected:hover {
      background-color: #eaecf0;
      cursor: pointer;
    }
    .owner__selected {
      border-radius: 2px;
      width: 30px;
      height: 30px;
    }
    img:hover {
      cursor: pointer;
    }
  }
}

.owner {
  position: relative;
  background-color: white;
  width: 150px;
  max-height: 230px;
  overflow: scroll;
  min-width: 318px;
  position: fixed;
  padding: 8px 16px 8px 16px;
  border: 1px solid $grayBorder;
  .owner__option {
    @include display-flex(flex-start, center, row);
    height: 40px;
    img {
      width: 25px;
      height: 25px;
      border-radius: 2px;
      margin-right: 10px;
    }
    h3 {
      font-size: 13px;
      font-weight: $weightMedium;
      margin-right: 5px;
      max-width: 120px;
    }
    p {
      font-size: 12px;
      color: $colorPrimaryLight;
      max-width: 130px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .owner__option:hover {
    background-color: $grayFill;
    cursor: pointer;
    margin: 0 -16px 0 -16px;
    padding: 0 16px 0 16px;
  }
}

.warning  {
  animation: shake 0.95s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

.owner__hide {
  display: none !important;
}
</style>