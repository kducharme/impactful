<template>
  <div class="header">
    <div class="header__title">
      <h2>All Projects <span>({{ projects.length }})</span></h2>
      <div class="header__select">
        <p class="header__select--selected">{{ this.selected.length }} selected</p>
      </div>
    </div>
    <input placeholder='Search projects...'>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from "vuex";
  
  export default {
    name: "pageheader",
    props: ['selected'],
    data() {
      return {
        totalProjects: 12
      };
    },
    computed: {
      ...mapState(["projects"])
    }
  };
</script>

<style lang='scss'>
  @import "../../styles/variables";
  @import "../../styles/mixins";
  .header {
    background-color: white;
    height: 70px;
    width: 100%;
    @include display-flex(space-between, center, row);
    padding: 0 30px 0 15px;
    .header__title {
      @include display-flex(flex-start, flex-start, column);
      h2 {
        margin-bottom: 4px;
        font-size: 16px;
        color: $colorFontDark;
      }
      .header__select {
        @include display-flex(flex-start, flex-start, row);
        font-size: 13px;
        text-decoration: none;
        p {
          color: $colorFontMedium;
        }
        a {
          color: $colorAccent;
        }
        span {
          margin: 0 8px 0 8px;
        }
      }
    }
    input {
      width: 300px;
      height: 38px;
      border-radius: 4px;
      border: 1px solid $grayBorder;
      padding-left: 16px;
      font-size: 13px;
    }
    input::placeholder {
      color: $colorPrimaryLight;
    }
    input:active, input:focus {
      border: 1px solid $colorAccent;
    }
  }
</style>