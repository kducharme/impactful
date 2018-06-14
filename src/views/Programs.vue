<template>
  <div class="programs" id='programs'>
    <div class="subnav">
      <SubNavigation />
    </div>
    <div class="content">
      <div class='card' v-on:mouseover="showOverlay" v-on:mouseleave="hideOverlay"  v-for="program in programs" :key="program.id" >

        <span class="card__hover hide">
                <span class="select__container">
                  <input type="checkbox" checked={this.state.checked} />
                  <span class="select__checkbox" />
                </span>
                <button 
                  class='card__button card__hover--button button__primary'
                  to=''
                  >
                    View program
                </button>
              </span>
        <div class="card__overview">
          <h4>{{ program.name }}</h4>
          <p>{{ program.description }}</p>
  
          <div class="card__data">
            <div class="card__data--block">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path
                          class="icon money"
                          d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                        />
                        <path d="M0 0h24v24H0z" fill="none" />
                      </svg>
              <p>${{program.budget}} total budget</p>
            </div>
            <div class="card__data--block">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path
                          class="icon check"
                          d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                        />
                      </svg>
              <p>35 /45 tasks (90% complete)</p>
            </div>
            <div class="card__progress" />
          </div>
        </div>
  
      </div>
  
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapActions
  } from "vuex";
  import Card from "../components/Card.vue";
  import SubNavigation from "../components/SubNavigation.vue";
  
  export default {
    name: "programs",
    data: {
      programList: "programs"
    },
    methods: {
      ...mapActions([
          "getPrograms"
      ]),
      getProgramData: function() {
        this.getPrograms();
      },
      showOverlay: function(e) {
        const overlay = e.currentTarget.children[0];
        overlay.classList.remove("hide");
      },
      hideOverlay: function(e) {
        const overlay = e.currentTarget.children[0];
        overlay.classList.add("hide");
      },
    },
    computed: {
      ...mapState(["programs"])
    },
    beforeMount() {
      this.getProgramData();
    },
    components: {
      SubNavigation
    }
  };
</script>

<style lang="scss">
  @import "../styles/variables";
  @import "../styles/mixins";
  .content {
    height: calc(100vh - 44px - 40px);
    @include display-flex(flex-start, flex-start, row);
    padding-top: 30px;
    .card {
      @include display-flex(flex-start, flex-start, column);
      position: relative;
      background-color: white;
      border: 1px solid $grayBorder;
      border-radius: 10px;
      height: 310px;
      width: 275px;
      min-width: 275px;
      margin-right: 20px;
      .card__overview {
        position: absolute;
        z-index: 998;
        padding: 32px 24px 24px 24px;
        min-height: 174px!important;
        h4 {
          font-size: 15px;
          font-weight: 800;
          margin-bottom: 8px;
          color: $colorFontDark;
        }
        p {
          font-size: 13px;
          font-weight: 400;
          color: $colorFontMedium;
          line-height: 1.5;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }
      }
      .card__data {
        @include display-flex(flex-start, flex-start, column);
        position: absolute;
        width: 100%;
        padding: 24px;
        top: 134px;
        margin: 40px -20px 0 -20px;
        border-top: 1px solid $grayBorder;
        left: 20px;
        .card__data--block {
          @include display-flex(flex-start, center, row);
          margin-bottom: 12px;
          svg {
            height: 18px;
            width: 18px;
            .icon {
              fill: $colorFontMedium;
              opacity: .7;
            }
            .money {
              height: 20px;
              width: 20px;
              margin-left: 4px;
            }
            .check {
              height: 14px;
              width: 14px;
            }
          }
          p {
            font-size: 14px;
            font-weight: 400;
            padding-left: 6px;
            color: $colorFontDark;
          }
        }
        .card__progress {
          @include display-flex(flex-start, center, row);
          width: 100%;
          height: 10px;
          background: $colorBackground;
          border: 1px solid $grayBorder;
          border-radius: 200px;
          margin-top: 4px;
        }
        .card__progress:after {
          content: '';
          display: block;
          width: 50%;
          height: 100%;
          border-radius: 9px;
          background: $colorAccent;
        }
      }
    }
    .card__hover {
      @include display-flex(flex-start, flex-start, column);
      z-index: 999;
      position: relative;
      top: 0;
      left: 0;
      right: 0;
      height: 174px;
      width: 273px;
      background-color: rgba(52, 56, 73, 0.94);
      border-top-left-radius: 9px;
      border-top-right-radius: 9px;
      input[type="checkbox"] {
        display: none;
      }
      input[type="checkbox"]+span {
        display: inline-block;
        position: relative;
        top: -1px;
        width: 18px;
        height: 18px;
        border-radius: 500px;
        margin: 12px 0 0 12px;
        vertical-align: middle;
        background: transparent;
        border: 1.5px solid white;
        cursor: pointer;
      }
      input[type="checkbox"]:hover+.select__checkbox:hover {
        background: rgba(255, 255, 255, 0.418);
      }
      input[type="checkbox"]:checked+.select__checkbox {
        // background: $colorSuccess;
      }
      .card__hover--button {
        margin-top: 40px;
        align-self: center!important;
        height: 34px;
        width: 110px;
        background-color: transparent;
        border: 2px solid white;
        opacity: 1 !important;
      }
      .card__button {
        align-self: center;
      }
      .card__hover--button:hover {
        background-color: $colorAccent;
        border: none;
      }
    }
    .hide {
      display: none;
    }
  }
</style>

