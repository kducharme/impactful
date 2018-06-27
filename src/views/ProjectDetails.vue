<template>
    <div class="details">
        <h3 class="details__title">Project overview</h3>
        <div class="block">
          <label for='name' class='block__label'>Project name</label>
          <input id="name" :value="activeProject.name">
        </div>
        <div class="block">
          <label for='description'>Description</label>
          <textarea rows='5' id="description" :value="activeProject.description"></textarea>
        </div>
        <div class="block">
          <label for='objective' class='block__label'>Objectives</label>
         <span class='objective'><div class='bullet'></div><input id="objectiveOne" :value="activeProject.objective_one"></span>
         <span class='objective'><div class='bullet'></div><input id="objectiveTwo" :value="activeProject.objective_two"></span>
        </div>
        <div class="block">
          <label for='budget'>Budget</label>
          <span class="budget">
            <div>$</div>
            <input id="budget" :value="activeProject.budget" />
          </span>
        </div>
        <h3 class="details__title">Location</h3>
        <div class="block">
          <label for='location' class='block__label'>Address</label>
          <input id="location" :value="activeProject.location">
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "projectdetails",
  data() {
    return {
      activeProject: ""
    };
  },
  methods: {
    ...mapActions([
      "getProjects",
      "setActiveProgramOnLoad",
      "setActiveProjectOnLoad"
    ]),
    getLocation(location) {
      console.log(location)
      fetch(`http://localhost:3000/locations?id=${location}`)
        .then(r => r.json())
        .then(l => {
          console.log(l)
          const address = `${l[0].street_address} ${l[0].city}, ${l[0].state} ${
            l[0].zip
          }`;
          this.activeProject.location = address;
        });
    }
  },
  beforeMount() {
    fetch(`http://localhost:3000/projects?id=${this.$route.params.projectId}`)
      .then(r => r.json())
      .then(proj => {
        this.activeProject = proj[0]
        this.getLocation(proj[0].location)
        })
  }
};
</script>

<style lang="scss">
@import "../styles/variables";
@import "../styles/mixins";

.details {
  padding: 32px 24% 32px 24%;
  height: calc(100vh - 44px - 40px);
  @include display-flex(flex-start, flex-start, column);
  background-color: $colorBackground;
  overflow: scroll;
  .details__title {
    font-size: 20px;
    font-weight: $weightHeavy;
    margin: 16px 0 32px 0;
    border-bottom: 1px solid $grayBorder;
    width: 100%;
    padding-bottom: 16px;
  }
  .block {
    width: 100%;
    margin-bottom: 16px;
    .objective {
      @include display-flex(flex-start, center, row);
      margin-bottom: 8px;
      div {
        content: "";
        width: 10px;
        height: 10px;
        margin-right: 10px;
        border-radius: 100%;
        background: $grayBorder;
        margin-top: 12px;
      }
      input {
        width: calc(100% - 25px);
      }
    }
    .budget {
      @include display-flex(flex-start, center, row);
      border: 1px solid $grayBorder;
      background-color: white;
      margin-top: 12px;
      div {
        @include display-flex(center, center, row);
        border-right: 1px solid $grayBorder;
        font-size: 15px;
        color: $colorPrimaryLight;
        height: 36px;
        width: 36px;
      }
      input {
        border: none;
        margin: 0px;
      }
    }
    label {
      letter-spacing: 0.5px;
      font-size: 11px;
      color: $colorPrimaryLight;
      font-weight: $weightMedium;
      text-transform: uppercase;
    }
    input,
    textarea {
      margin-top: 12px;
      width: 100%;
      font-size: 13px;
      color: $colorPrimaryDark;
      line-height: 1.6;
      padding-left: 12px;
      resize: none;
      border: 1px solid $grayBorder;
    }
    input {
      height: 36px;
    }
    textarea {
      padding: 8px 12px;
    }
    input:active,
    input:focus,
    textarea:active,
    textarea:focus {
      border-color: $colorAccent;
    }
  }
}
</style>

