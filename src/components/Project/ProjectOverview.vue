<template>
    <div class="overview">
        <ProjectOverviewStatic
            :class="[editProject ? 'overview__hide' : '']"
        />
        <ProjectOverviewEdit
            :class="[editProject ? '' : 'overview__hide']"
            @done="finishEdit"
        />
    </div>

</template>

<script>
import { mapState, mapActions } from "vuex";
import ProjectOverviewStatic from "./ProjectOverviewStatic.vue";
import ProjectOverviewEdit from "./ProjectOverviewEdit.vue";

export default {
  name: "overview",
  props: ["editProject"],
  components: {
    ProjectOverviewStatic,
    ProjectOverviewEdit
  },
  methods: {
    finishEdit() {
        this.$emit('edit')
    }
  }
};
</script>

<style lang='scss'>
@import "../../styles/variables";
@import "../../styles/mixins";
.overview {
  @include display-flex(flex-start, flex-start, column);
  width: 100%;
  .overview__hide {
    display: none !important;
  }
}
</style>