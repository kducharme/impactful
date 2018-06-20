<template>
    <div class="overview__edit">
        <div class="overview__top">
            <textarea rows="3" :value="projectActiveName"></textarea>
        </div>
        <div class="overview__bottom">
            <div class="block">
                <p class='block__label'>Date created</p>
                <input :value="projectData.created" />
            </div>
            <div class="block">
                <p rows="5" class='block__label'>Location</p>
                <input :value="projectData.location" />
            </div>
            <div class="block">
                <p class='block__label'>Manager</p>
                <input :value="projectData.manager" />
            </div>
            <div class="block">
                <p class='block__label'>Description</p>
                <textarea :value="projectData.description"></textarea>
            </div>
            <div class="block">
                <p class='block__label'>Budget</p>
                <input :value="projectData.budget" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "overviewstatic",
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
          const address = `${l[0].street_address} ${l[0].city}, ${l[0].state} ${
            l[0].zip
          }`;
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
@import "../../styles/variables";
@import "../../styles/mixins";
.overview__edit {
  @include display-flex(flex-start, flex-start, column);
  width: 100%;
  textarea,
  input {
    width: 100%;
    resize: none;
    border: 1px solid $grayBorder;
    padding-left: 8px;
  }
  textarea {
      padding-right: 8px;
  }
  .overview__top {
    @include display-flex(flex-start, space-between, column);
    width: 100%;
    textarea {
      font-size: 20px;
      margin-bottom: 12px;
      font-weight: $weightMedium;
      line-height: 1.6;
    }
  }
  .overview__bottom {
    padding-top: 24px;
    font-weight: $weightLight;
    width: 100%;
    .block {
      margin-bottom: 16px;
      .block__label {
        font-size: 11px;
        color: $colorPrimaryLight;
        font-weight: $weightMedium;
        text-transform: uppercase;
        margin-bottom: 7px;
      }
      input,
      textarea {
        width: 100%;
        font-size: 13px;
        color: $colorPrimaryDark;
        line-height: 1.6;
      }
      input {
        height: 32px;
      }
    }
  }
}
</style>