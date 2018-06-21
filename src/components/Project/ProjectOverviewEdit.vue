<template>
    <div class="overview__edit" v-on:click='formActive'>
        <div class="overview__top">
            <textarea id="name" type='textarea' rows="3" :value="projectActiveName"></textarea>
        </div>
        <div class="overview__bottom">
            <div class="block">
                <p class='block__label'>Date created</p>
                <p class='block__data'>{{ projectData.created }}</p>
            </div>
            <div class="block">
                <p class='block__label'>Manager</p>
                <p class='block__data'>{{ projectData.manager }}</p>
            </div>
            <div class="block">
                <p  class='block__label'>Location</p>
                <p class='block__data'>{{ projectData.location }}</p>
            </div>
            <div class="block">
                <p class='block__label'>Description</p>
                <textarea rows="4" id="description" :value="projectData.description"></textarea>
            </div>
            <div class="block">
                <p class='block__label'>Budget</p>
                <span class="budget">
                    <div>$</div>
                    <input id="budget" :value="projectData.budget" />
                </span>
                
            </div>
            <div :class="[formClicked ? 'prepActions' : 'hideActions']">
                <button
                    v-on:click="updateProject"
                    class='save'
                >Save edits</button>
                <button
                    class='discard'
                    v-on:click="discardUpdates"
                >Discard</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "overviewstatic",
  data() {
    return {
      formClicked: false,
      projectData: {},
      nameUpdate: null,
      managerUpdate: null,
      descriptionUpdate: null,
      budgetUpdate: null,
    };
  },
  methods: {
    formActive() {
      this.formClicked = true;
    },
    changesMade() {
      this.buttonDisabled = false;
      console.log(this.buttonDisabled)
    },
    updateProject() {
    const id = window.location.href.split("projects/")[1];
      const update = {
        id,
        name: document.querySelector("#name").value,
        description: document.querySelector("#description").value,
        budget: document.querySelector("#budget").value,
        date_updated: this.getDate()
      };
      console.log(update)
      fetch(`http://localhost:3000/projects/${id}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(update)
        })
        this.$emit('done');
    },
    discardUpdates() {
      this.$emit('done');
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
  computed: {
    ...mapState(["projectActiveName"])
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
.overview__edit {
  @include display-flex(flex-start, flex-start, column);
  width: 100%;
  textarea,
  input {
    width: 100%;
    resize: none;
    border: 1px solid $grayBorder;
    padding-left: 8px;
  }
  textarea {
    padding-right: 8px;
    line-height: 1.6;
  }
  .overview__top {
    @include display-flex(flex-start, space-between, column);
    width: 100%;
    textarea {
      font-size: 20px;
      margin-bottom: 12px;
      font-weight: $weightMedium;
    }
  }
  .overview__bottom {
    padding-top: 24px;
    font-weight: $weightLight;
    width: 100%;
    .block {
      margin-bottom: 16px;
      .block__label {
        font-size: 11px;
        color: $colorPrimaryLight;
        font-weight: $weightMedium;
        text-transform: uppercase;
        margin-bottom: 7px;
      }
      .block__data {
        font-size: 13px;
        color: $colorPrimaryDark;
        line-height: 1.6;
      }
      input,
      textarea {
        width: 100%;
        font-size: 13px;
        color: $colorPrimaryDark;
        line-height: 1.6;
      }
      input {
        height: 32px;
      }
      .budget {
        @include display-flex(flex-start, center, row);
        border: 1px solid $grayBorder;
        background-color: white;
        div {
          @include display-flex(center, center, row);
          border-right: 1px solid $grayBorder;
          font-size: 13px;
          color: $colorPrimaryLight;
          height: 32px;
          width: 32px;
        }
        input {
          border: none;
        }
      }
    }
    .prepActions {
      width: 100%;
      @include display-flex(space-between, center, row);
      padding-top: 8px;
      button {
        height: 36px;
        padding: 4px 10px 4px 10px;
        font-size: 14px;
        border-radius: 3px;
        font-weight: $weightMedium;
        width: 90px;
      }
      .save {
        background-color: $colorAccent;
        color: white;
        border: none;
      }
      .save:hover {
        background-color: $colorAccentHover;
      }
      .discard {
        background-color: white;
        border: 1.5px solid $colorAccent;
        color: $colorAccent;
      }
      .discard:hover {
        background-color: $colorAccentLight;
      }
    }
  }
}
.hideActions {
  display: none;
}

input:active,
input:focus,
textarea:focus,
textarea:active {
  border: 1px solid $colorAccent !important;
}
</style>