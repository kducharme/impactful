<template>
      <div class="groupList">
        <div class="groupList__header">
          <p>Groups</p>
          <button
            class="button__primary groupList__button"
          >New group</button>
        </div>
        <div class="groupList__list">
          <router-link
            :to="'/programs/' + programActive + '/projects/'" class='col col2'
          >All Projects</router-link>
        </div>
      </div>
</template>

<script>
import { mapState } from "vuex";
import Group from "./Group.vue";

export default {
  name: "grouplist",
  components: {
    Group
  },
  data() {
    return {
      levelOne: "All Programs",
      page: window.location.href,
      groups: []
    };
  },
  methods: {
    check() {
      this.checked = !this.checked;
    }
  },
  computed: {
    ...mapState(["programActive"])
  }
};
</script>

<style lang='scss'>
@import "../../styles/variables";
@import "../../styles/mixins";

.groupList {
  background-color: white;
  border-right: 1px solid $grayBorder;
  width: 300px;
  height: 100%;
  .groupList__header {
    @include display-flex(space-between, center, row);
    height: 70px;
    border-bottom: 1px solid $grayBorder;
    padding: 0 30px 0 30px;
    p {
      font-size: 18px;
      font-weight: $weightHeavy;
    }
    .groupList__button {
      height: 34px;
      width: 88px;
      font-size: 12px;
      color: white !important;
      background-color: $colorFontDark;
    }
    .groupList__button:hover {
      opacity: 0.8;
    }
  }
  .groupList__list {
    height: calc(100vh - 44px - 40px - 70px);
    a {
      @include display-flex(flex-start, center, row);
      padding: 0 30px;
      width: 100%;
      height: 39px;
      font-size: 13px;
      border-bottom: 1px solid $grayBorder;
    }
    .router-link-active {
      background-color: $colorBackground;
      font-weight: $weightMedium;
      color: $colorAccent;
      opacity: 1 !important;
    }
  }
}
</style>