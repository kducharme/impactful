<template>
    <div class="overview">
        <div class="overview__top">
            <!-- <svg width="15px" height="16px" viewBox="0 0 15 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Discovery-(v2)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Project-(Activity)" transform="translate(-374.000000, -151.000000)" fill="#BBBEC2">
                    <g id="Group" transform="translate(374.000000, 151.000000)">
                        <path d="M0,12.2 L0,15.2 L2.96052632,15.2 L11.6921053,6.352 L8.73157895,3.352 L0,12.2 L0,12.2 Z M13.9815789,4.032 C14.2894737,3.72 14.2894737,3.216 13.9815789,2.904 L12.1342105,1.032 C11.8263158,0.72 11.3289474,0.72 11.0210526,1.032 L9.57631579,2.496 L12.5368421,5.496 L13.9815789,4.032 L13.9815789,4.032 Z" id="Shape"></path>
                    </g>
                </g>
            </g>
            </svg> -->
            <h3>{{ projectActiveName }}</h3>
            <!-- <p>Date created: <span class="details">{{ projectData.created }}</span></p> -->
        </div>
        <div class="overview__bottom">
            <div class="block">
                <p class='block__label'>Date created</p>
                <p class='block__data'>{{ projectData.created }}</p>
            </div>
            <div class="block">
                <p class='block__label'>Location</p>
                <p class='block__data'>{{ projectData.location }}</p>
            </div>
            <div class="block">
                <p class='block__label'>Manager</p>
                <p class='block__data'>{{ projectData.manager }}</p>
            </div>
            <div class="block">
                <p class='block__label'>Description</p>
                <p class='block__data'>{{ projectData.description }}</p>
            </div>
            <div class="block">
                <p class='block__label'>Budget</p>
                <p class='block__data'>${{ projectData.budget }}</p>
            </div>
        </div>
    </div>

</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "overview",
  data() {
    return {
      projectData: {}
    };
  },
  methods: {
    getManager(id) {
      fetch(`http://localhost:3000/users?id=${id}`)
        .then(r => r.json())
        .then(m => {
          const name = `${m[0].first_name} ${m[0].last_name}`;
          this.projectData.manager = name;
        });
    },
    getLocation(id) {
      fetch(`http://localhost:3000/locations?id=${id}`)
        .then(r => r.json())
        .then(l => {
          const address = `${l[0].street_address} ${l[0].city}, ${l[0].state} ${l[0].zip}`
          this.projectData.location = address;
        });
    }
  },
  computed: {
    ...mapState(["projectActiveName"])
  },
  beforeMount() {
    const id = window.location.href.split("projects/")[1];
    fetch(`http://localhost:3000/projects?id=${id}`)
      .then(r => r.json())
      .then(proj => {
        this.projectData = {
          name: proj[0].name,
          description: proj[0].description,
          type: proj[0].type,
          created: proj[0].date_created,
          due: proj[0].date_due,
          updated: proj[0].date_updated,
          deleted: proj[0].date_deleted,
          budget: proj[0].budget,
          managerId: proj[0].manager,
          manager: this.getManager(proj[0].manager),
          locationId: proj[0].location,
          location: this.getLocation(proj[0].location)
        };
      });
  }
};
</script>

<style lang='scss'>
@import "../styles/variables";
@import "../styles/mixins";
.overview {
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