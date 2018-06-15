<template>
    <div class="header">
        <div class="header__title">
            <h2>All Projects <span>({{ projects.length }})</span></h2>
            <div class="header__select">
                <p class="header__select--selected">{{ selected }} selected</p>
                <span><svg width="5px" height="5px" viewBox="0 0 5 5" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="Discovery-(v2)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <g id="Program-(Projects)" transform="translate(-518.000000, -157.000000)" fill="#E2E2E2">
                        <circle id="Oval" cx="520.5" cy="159.5" r="2.5"></circle>
                        </g>
                        </g>
                    </svg></span>
                <a class="header__select--all">Select all</a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "header",
  data() {
    return {
      totalProjects: 12,
      selected: 0
    };
  },
  computed: {
    ...mapState(["projects"])
  }
  //   methods: {
  //     ...mapActions(["getProjects"])
  //   },
  //   beforeMount() {
  //     const id = window.location.href.split("programs/")[1];
  //     this.getProjects(id);
  //   }
};
</script>

<style lang='scss'>
@import "../styles/variables";
@import "../styles/mixins";
.header {
  height: 80px;
  @include display-flex(flex-start, center, row);
  .header__title {
    @include display-flex(flex-start, flex-start, column);
    h2 {
      margin-bottom: 4px;
      font-size: 18px;
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
}
</style>