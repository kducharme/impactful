<template>
  <div class="program">
    <SubNavigation />
    <div class="content">
      <Groups />
      <div class="content__right">
        <ProgramHeader />
        <div class="content__projects">
          <div class='card' v-for="project in projects" :key="project.id" :id="project.id" v-on:mouseover="showOverlay" v-on:mouseleave="hideOverlay">
  
            <span class="project__hover hide">
                  <span class="select__container">
                    <input type="checkbox" checked={this.state.checked} />
                    <span class="select__checkbox" />
                  </span>
            <router-link :to="'/programs/' + programActive + '/projects/' + project.id" class='card__button'>
              <button class='project__hover--button button__primary'>
                    View project
                  </button>
            </router-link>
            </span>
  
            <div class="card__overview">
              <h4>{{ project.name }}</h4>
              <p>{{ project.description }}</p>
              <div class="card__data">
                <div class="card__data--block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path
                                      class="icon money"
                                      d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                                    />
                                    <path d="M0 0h24v24H0z" fill="none" />
                                  </svg>
                  <p>${{project.budget}} total budget</p>
                </div>
                <div class="card__data--block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path
                                      class="icon check"
                                      d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                                    />
                                  </svg>
                  <p>35/45 tasks (90%)</p>
                </div>
                <div class="card__progress" />
              </div>
            </div>
  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from "vuex";
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
    methods: {
      ...mapActions(["getProjects", "setActiveProgramOnLoad"]),
      getProjectData: function(id) {
        this.getProjects(id);
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
      const id = window.location.href.split("/projects/")[0].split('programs/')[1]
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
    background-color: $colorBackground;
    @include display-flex(flex-start, flex-start, row);
    height: calc(100vh - 44px - 40px); // Height of screen minus 2 navs
    .groups {
      background-color: white;
      border-right: 1px solid $grayBorder;
      width: 300px;
      height: 100%;
      .groups__header {
        @include display-flex(space-between, center, row);
        height: 80px;
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
      height: calc(100vh - 44px - 40px);
      .content__projects {
        padding: 0 2% 0 2%;
        height: calc(100vh - 44px - 40px - 80px);
        @include display-flex(flex-start, flex-start, row);
        flex-wrap: wrap;
        overflow: scroll;
      }
    }
  }
  .project__hover {
  @include display-flex(flex-start, flex-start, column);
  z-index: 999;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  height: 174px;
  width: 23%;
  min-width: 230px;
  max-width: 260px;
  background-color: rgba(52, 56, 73, 0.94);
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  input[type="checkbox"] {
    display: none;
  }
  input[type="checkbox"] + span {
    display: inline-block;
    position: relative;
    top: -1px;
    width: 18px;
    height: 18px;
    border-radius: 500px;
    margin: 12px 0 0 12px;
    vertical-align: middle;
    background: transparent;
    border: 1.5px solid white;
    cursor: pointer;
  }
  input[type="checkbox"]:hover + .select__checkbox:hover {
    background: rgba(255, 255, 255, 0.418);
  }
  input[type="checkbox"]:checked + .select__checkbox {
    // background: $colorSuccess;
  }
  .project__hover--button {
    margin-top: 40px;
    align-self: center !important;
    height: 34px;
    width: 110px;
    background-color: transparent;
    border: 2px solid white;
    opacity: 1 !important;
  }
  .card__button {
    align-self: center;
  }
  .project__hover--button:hover {
    background-color: $colorAccent;
    border: none;
  }
}
.hide {
  display: none;
}

</style>
