<template>
  <div class="overview__static">
    <div class="overview__top">
      <h3>{{ this.project.name }}</h3>
    </div>
    <div class="overview__bottom">
      <div class="block">
        <p class='block__label'>Date created</p>
        <p class='block__data'>{{ this.project.created }}</p>
      </div>
      <div class="block">
        <p class='block__label'>Manager</p>
        <p class='block__data'>{{ this.project.manager }}</p>
      </div>
      <div class="block">
        <p class='block__label'>Location</p>
        <p class='block__data'>{{ this.project.location }}</p>
      </div>
      <div class="block">
        <p class='block__label'>Description</p>
        <p class='block__data'>{{ this.project.description }}</p>
      </div>
      <div class="block">
        <p class='block__label'>Budget</p>
        <p class='block__data'>${{ this.project.budget }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "overviewstatic",
  props: {
    project: {
      type: Object
    }
  },
  computed: {
    ...mapState(["projectActiveName"])
  }
};
</script>

<style lang='scss'>
@import "../../styles/variables";
@import "../../styles/mixins";
.overview__static {
  @include display-flex(flex-start, flex-start, column);
  width: 100%;
  .overview__top {
    @include display-flex(flex-start, space-between, column);
    width: 100%;
    svg {
      align-self: flex-end;
      margin-bottom: 12px;
    }
    h3 {
      font-size: 20px;
      line-height: 1.6;
    }
    p {
      font-size: 13px;
      color: $colorPrimaryLight;
      span {
        color: $colorPrimaryDark;
      }
    }
  }
  .overview__bottom {
    padding-top: 24px;
    .block {
      margin-bottom: 16px;
      .block__label {
        font-size: 11px;
        color: $colorPrimaryLight;
        font-weight: $weightMedium;
        text-transform: uppercase;
        margin-bottom: 7px;
      }
      .block__data {
        font-size: 13px;
        color: $colorPrimaryDark;
        line-height: 1.6;
      }
    }
  }
}
</style>