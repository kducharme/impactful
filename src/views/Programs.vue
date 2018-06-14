<template>
  <div class="programs" id='programs'>
    <div class="subnav">
      <SubNavigation />
    </div>
    <div class="content">
      <h2>{{ organization }}</h2>
    </div>
  </div>
</template>

<script>
  import Vue from "vue";
  import { mapState } from "vuex";
  import Card from "../components/Card.vue";
  import SubNavigation from "../components/SubNavigation.vue";
  
  export default {
    name: "programs",
    components: {
      SubNavigation
    },
    computed: mapState(["organization"])
  };
</script>

<style lang="scss">
  
</style>

