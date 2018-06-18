<template>
      <div class="groups">
        <div class="groups__header">
          <p>Groups</p>
          <button
            class="button__primary groups__button"
          >New group</button>
        </div>
      </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "group",
  data() {
    return {
      levelOne: "All Programs",
      page: window.location.href
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
@import "../styles/variables";
@import "../styles/mixins";
</style>