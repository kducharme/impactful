<template>
    <div class="overview">
        <svg width="15px" height="16px" viewBox="0 0 15 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g id="Discovery-(v2)" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Project-(Activity)" transform="translate(-374.000000, -151.000000)" fill="#BBBEC2">
                <g id="Group" transform="translate(374.000000, 151.000000)">
                    <path d="M0,12.2 L0,15.2 L2.96052632,15.2 L11.6921053,6.352 L8.73157895,3.352 L0,12.2 L0,12.2 Z M13.9815789,4.032 C14.2894737,3.72 14.2894737,3.216 13.9815789,2.904 L12.1342105,1.032 C11.8263158,0.72 11.3289474,0.72 11.0210526,1.032 L9.57631579,2.496 L12.5368421,5.496 L13.9815789,4.032 L13.9815789,4.032 Z" id="Shape"></path>
                </g>
            </g>
        </g>
    </svg>
        <h3>{{ projectActiveName }}</h3>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "overview",
  data() {
    return {};
  },
  computed: {
    ...mapState(["projectActiveName"])
  },
  beforeMount() {
    const id = window.location.href.split("programs/")[1].split("/")[1];
    fetch(`http://localhost:3000/projects?id=${id}`)
      .then(r => r.json())
      .then(proj => {
        return project = {
          name: proj[0].name,
          description: proj[0].description,
          budget: proj[0].budget,
          manager: proj[0].manager,
          created: proj[0].date_created
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
  padding: 20px 20px 20px 20px;
  svg {
    align-self: flex-end;
    margin-bottom: 4px;
  }
}
</style>