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
         <span><div class='bullet'></div><input id="objectiveOne" :value="activeProject.objective_one"></span>
         <span><div class='bullet'></div><input id="objectiveTwo" :value="activeProject.objective_two"></span>
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
    ])
  },
  beforeMount() {
    fetch(`http://localhost:3000/projects?id=${this.$route.params.projectId}`)
      .then(r => r.json())
      .then(proj => (this.activeProject = proj[0]));
  }
};
</script>

<style lang="scss">
@import "../styles/variables";
@import "../styles/mixins";

.details {
  padding: 48px 24% 0 24%;
  height: calc(100vh - 44px - 40px);
  @include display-flex(flex-start, flex-start, column);
  background-color: $colorBackground;
  overflow: scroll;
  .details__title {
    font-size: 20px;
    font-weight: $weightHeavy;
    margin-bottom: 32px;
    border-bottom: 1px solid $grayBorder;
    width: 100%;
    padding-bottom: 16px;
  }
  .block {
    width: 100%;
    margin-bottom: 16px;
    span {
      @include display-flex(flex-start, center, row);
      margin-bottom: 8px;
      div {
        content: "";
        width: 10px;
        height: 10px;
        margin-right: 15px;
        border-radius: 100%;
        background: $grayBorder;
        margin-top: 12px;
      }
      input {
        width: calc(100% - 30px);
      }
    }
    label {
      letter-spacing: .5px;
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
      padding-top: 8px;
    }
    input:active,
    input:focus,
    textarea:active,
    textarea:focus {
      border: 1px solid $colorAccent;
      padding-left: 13px;
    }
  }
}
</style>

