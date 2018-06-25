<template>
    <div class="media">
        project media
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "media",
  data() {
    return {
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

</style>