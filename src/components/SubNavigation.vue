<template>
    <div class='sub'>
        <div class='sub__breadcrumbs'>
            <router-link
                v-bind:class="['sub__active']"
                @click.native="resetActive"
                to='/programs'>{{ levelOne }}
            </router-link>
            <svg
                v-bind:class="[programActive ? 'sub__active' : 'sub__hide']"
                class='sub__svg'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'>
                <path
                    d='M0 0h24v24H0z'
                    fill='none'
                />
                <path
                    class='sub__divider'
                    d='M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z'
                />
            </svg>
            <router-link
                class='sub__overflow'
                @click.native="resetProjectOnly"
                v-bind:class="[programActive ? 'sub__active' : 'sub__hide']"
                :to="/programs/ + programActive" >{{ programActiveName }}
            </router-link>
            <svg
                v-bind:class="[programActive && projectActive? 'sub__active' : 'sub__hide']"
                class='sub__svg'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'>
                <path
                    d='M0 0h24v24H0z'
                    fill='none'
                />
                <path
                    class='sub__divider'
                    d='M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z'
                />
            </svg>
            <router-link 
                class='sub__overflow'
                v-bind:class="[programActive && projectActive ? 'sub__active' : 'sub__hide']"
                to=''>{{ projectActiveName }}
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "programs",
  data() {
    return {
      levelOne: "All Programs"
    };
  },
  methods: {
    ...mapActions([
        "resetActiveProgram",
        "resetActiveProject",
    ]),
    resetActive: function() {
      this.resetActiveProgram();
      this.resetActiveProject();
    },
    resetProjectOnly: function() {
      this.resetActiveProject();
    }
  },
  computed: {
    ...mapState(["programActive", "projectActive", "programActiveName", "projectActiveName"])
  }
};
</script>

<style lang='scss'>
@import "../styles/variables";
@import "../styles/mixins";
.sub {
  @include display-flex(flex-start, center, row);
  background-color: white;
  border-bottom: 1px solid $grayBorder;
  height: 40px;
  width: 100vw;
  padding: 0 30px 0 30px;
  font-size: 13px;
  .sub__breadcrumbs {
    @include display-flex(flex-start, center, row);
    width: 50%;
    .sub__overflow {
      max-width: 150px;
      white-space: nowrap; 
      overflow: hidden;
      text-overflow: ellipsis;
    }
    a {
      margin-top: -2px;
      color: $colorPrimaryDark;
    }
    svg {
      height: 18px;
      width: auto;
      margin: 0 6px 0 4px;
    }
    .sub__active {
      color: $colorAccent;
      font-weight: 600;
    }
    .sub__divider {
      fill: $colorArrow;
    }
  }
  .sub__links {
    width: 20%;
  }
  .sub__actions {
    @include display-flex(flex-end, center, row);
    width: 30%;
    .sub__actions--button {
      height: 30px;
      width: 100px;
    }
    .sub__actions--button:hover {
      background-color: $colorAccentHover;
    }
  }
  // Hides arrow depending on depth of pagination
  .sub__divider--hide {
    display: none !important;
  }
  // Hides pagination link depending on page
  .sub__hide {
    display: none !important;
  }
}
</style>