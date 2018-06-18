<template>
  <div class='sub'>
    <div class='sub__breadcrumbs'>
      <router-link v-bind:class="['sub__active']" @click.native="resetActive" to='/programs'>{{ levelOne }}
      </router-link>
      <svg v-bind:class="[programActive ? 'sub__active' : 'sub__hide']" class='sub__svg' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                    <path
                        d='M0 0h24v24H0z'
                        fill='none'
                    />
                    <path
                        class='sub__divider'
                        d='M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z'
                    />
                </svg>
      <router-link class='sub__overflow--program' @click.native="resetProjectOnly" v-bind:class="[programActive ? 'sub__active' : 'sub__hide']" :to="'/programs/' + programActive + '/projects/'">{{ programActiveName }}
      </router-link>
      <svg v-bind:class="[programActive && projectActive? 'sub__active' : 'sub__hide']" class='sub__svg' xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                    <path
                        d='M0 0h24v24H0z'
                        fill='none'
                    />
                    <path
                        class='sub__divider'
                        d='M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z'
                    />
                </svg>
      <router-link class='sub__overflow--project' v-bind:class="[programActive && projectActive ? 'sub__active' : 'sub__hide']" to=''>{{ projectActiveName }}
      </router-link>
    </div>
    <div class="sub__tabs">
      <router-link class='sub__tabs--link active' to=''>{{ subLinks.linkOne }}</router-link>
      <router-link class='sub__tabs--link' to=''>{{ subLinks.linkTwo }}</router-link>
    </div>
  
    <div class="sub__actions">
      <div class='sub__settings'>
        <svg width="13px" height="13px" viewBox="0 0 13 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Discovery-(v2)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Program-(Projects)" transform="translate(-1143.000000, -69.000000)" fill="#3B4158">
                <path d="M1154.46646,76.137 C1154.49319,75.929 1154.51324,75.721 1154.51324,75.5 C1154.51324,75.279 1154.49319,75.071 1154.46646,74.863 L1155.87643,73.7905 C1156.0034,73.693 1156.03681,73.5175 1155.95662,73.3745 L1154.62015,71.1255 C1154.53996,70.9825 1154.35954,70.9305 1154.21253,70.9825 L1152.54863,71.6325 C1152.20114,71.3725 1151.82693,71.158 1151.41931,70.9955 L1151.16538,69.273 C1151.14533,69.117 1151.005,69 1150.83795,69 L1148.16501,69 C1147.99795,69 1147.85762,69.117 1147.83757,69.273 L1147.58364,70.9955 C1147.17602,71.158 1146.80181,71.379 1146.45433,71.6325 L1144.79042,70.9825 C1144.63673,70.924 1144.46299,70.9825 1144.3828,71.1255 L1143.04633,73.3745 C1142.95946,73.5175 1142.99955,73.693 1143.12652,73.7905 L1144.53649,74.863 C1144.50976,75.071 1144.48972,75.2855 1144.48972,75.5 C1144.48972,75.7145 1144.50976,75.929 1144.53649,76.137 L1143.12652,77.2095 C1142.99955,77.307 1142.96614,77.4825 1143.04633,77.6255 L1144.3828,79.8745 C1144.46299,80.0175 1144.64341,80.0695 1144.79042,80.0175 L1146.45433,79.3675 C1146.80181,79.6275 1147.17602,79.842 1147.58364,80.0045 L1147.83757,81.727 C1147.85762,81.883 1147.99795,82 1148.16501,82 L1150.83795,82 C1151.005,82 1151.14533,81.883 1151.16538,81.727 L1151.41931,80.0045 C1151.82693,79.842 1152.20114,79.621 1152.54863,79.3675 L1154.21253,80.0175 C1154.36622,80.076 1154.53996,80.0175 1154.62015,79.8745 L1155.95662,77.6255 C1156.03681,77.4825 1156.0034,77.307 1155.87643,77.2095 L1154.46646,76.137 L1154.46646,76.137 Z M1149.50148,77.775 C1148.21178,77.775 1147.16265,76.7545 1147.16265,75.5 C1147.16265,74.2455 1148.21178,73.225 1149.50148,73.225 C1150.79117,73.225 1151.8403,74.2455 1151.8403,75.5 C1151.8403,76.7545 1150.79117,77.775 1149.50148,77.775 L1149.50148,77.775 Z" id="Shape"></path>
               </g>
              </g>
        </svg>
        <p>Page settings</p>
      </div>
      <button class="button__primary">{{ subButton.text }}</button>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from "vuex";
  
  export default {
    name: "programs",
    props: {
      subLinks: {
        type: Object
      },
      subButton: {
        type: Object
      }
    },
    data() {
      return {
        levelOne: "All Programs"
      };
    },
    methods: {
      ...mapActions(["resetActiveProgram", "resetActiveProject"]),
      resetActive: function() {
        this.resetActiveProgram();
        this.resetActiveProject();
      },
      resetProjectOnly: function() {
        this.resetActiveProject();
      }
    },
    computed: {
      ...mapState([
        "programActive",
        "projectActive",
        "programActiveName",
        "projectActiveName"
      ])
    }
  };
</script>

<style lang='scss'>
  @import "../styles/variables";
  @import "../styles/mixins";
  .sub {
    @include display-flex(space-between, center, row);
    background-color: white;
    border-bottom: 1px solid $grayBorder;
    height: 40px;
    width: 100vw;
    padding: 0 30px 0 30px;
    font-size: 13px;
    .sub__breadcrumbs {
      @include display-flex(flex-start, center, row);
      width: calc(100vw - 100px - 50%);
      .sub__overflow--program {
        max-width: 90px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .sub__overflow--project {
        max-width: 130px;
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
      .sub__active:hover {
        text-decoration: underline;
      }
      .sub__divider {
        fill: $colorArrow;
      }
    }
    .sub__tabs {
      min-width: 170px;
      @include display-flex(space-between, center, row);
      text-align: center;
      a {
        width: 100px;
        color: $colorPrimaryLight;
        font-size: 13px;
        margin: 0 5% 0 5%;
      }
      .active {
        color: $colorPrimaryDark;
        font-weight: $weightHeavy;
        padding: 10px;
        border-bottom: 2px solid $colorAccent;
      }
    }
    .sub__actions {
      @include display-flex(flex-end, center, row);
      width: calc(100vw - 100px - 50%);
      button {
        background-color: $colorAccent;
        height: 30px;
        width: 100px;
        font-size: 13px;
      }
      .sub__settings {
        @include display-flex(flex-end, center, row);
        margin-right: 24px;
        svg { margin-right: 5px; }
        p { font-weight: $weightMedium; }
      }
      .sub__settings:hover {
        text-decoration: underline;
        cursor: pointer;
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