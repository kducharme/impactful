<template>
      <div class="groups">
        <div class="groups__header">
          <p>Groups</p>
          <button
            class="button__primary groups__button"
          >New group</button>
        </div>
        <div class="groups__list">
          
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
    ...mapState(["programActive", "projectActive"])
  }
};
</script>

<style lang='scss'>
@import "../../styles/variables";
@import "../../styles/mixins";

.groups {
  background-color: white;
  border-right: 1px solid $grayBorder;
  width: 300px;
  height: 100%;
  .groups__header {
    @include display-flex(space-between, center, row);
    height: 70px;
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
</style>