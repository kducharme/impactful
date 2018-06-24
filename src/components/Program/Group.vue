<template>
      <div class="group">
      </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "group",
  data() {
    return {
      levelOne: "All Programs",
      page: window.location.href,
      groups: []
    };
  },
};
</script>