<template>
  <div class="program">
    <SubNavigation />
    <div class="content">
      <Groups />
      <div class="content__projects">
      <div class='card' v-for="project in projects" :key="project.id" :id="project.id">
    
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
              <p>35 /45 tasks (90% complete)</p>
            </div>
            <div class="card__progress" />
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
  import Groups from "../components/Groups.vue";
  export default {
    name: 'program',
    components: {
      SubNavigation,
      Groups
    },
    methods: {
      ...mapActions([
        "getProjects"
      ]),
      getProjectData: function() {
        this.getProjects();
      },
    },
    beforeMount() {
      this.getProjectData();
    },
    computed: {
      ...mapState(["projects"])
    },
  }
</script>

<style lang='scss'>
  @import "../styles/card";
  @import "../styles/variables";
  @import "../styles/mixins";
  .content {
    background-color: $colorBackground;
    @include display-flex(flex-start, flex-start, row);
    height: calc(100vh - 44px - 40px); // Height of screen minus 2 navs
    flex-wrap: wrap;
    .groups {
      background-color: white;
      border-right: 1px solid $grayBorder;
      width: 25%;
      min-width: 320px;
      max-width: 400px;
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
          color: white!important;
          background-color: $colorFontDark;
        }
        .groups__button:hover {
          opacity: .8;
        }
      }
    }
    .content__projects {
      @include display-flex(center, flex-start, row);
      flex-wrap: wrap;
      overflow: scroll;
      width: 70%;
      padding: 30px;
    }
  }
</style>
