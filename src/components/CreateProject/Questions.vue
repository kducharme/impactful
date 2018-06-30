<template>
  <div class="questions">
      <div class="header">
        <h2>Create new project</h2>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
      </div>
      <div class="body">
        <div v-for="q in questions" :key="q.id" :id="q.style">
            <label :for="q.input">{{ q.label }}</label>
            <input :type="q.type" :placeholder="q.placeholder" :class="[q.style ? q.style : '']">

        </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "questions",
  props: {
    questions: {
      type: Array
    },
    step: {
      type: Object
    }
  },
  methods: {
    customStyle() {
      if (this.step.activeStep === 1) {
        // TODO => THIS NEEDS TO BE FIXED

        const mapDiv = document.querySelector('#map')
        if (mapDiv) {
          mapDiv.remove();
        }

        // Creates textarea
        const frag = document.createElement("div");
        frag.setAttribute("id", "textarea");
        frag.style = "width: 100%; margin-bottom: 32px;";

        const label = document.createElement("label");
        label.textContent =
          "How would you describe the project in 2-3 sentences?";
        label.style = "font-size: 13px;";
        frag.appendChild(label);

        const textArea = document.createElement("textarea");
        textArea.setAttribute("rows", 5);
        textArea.style =
          "width: 100%; border: 1px solid #E2E2E2; resize: none; border-radius: 3px; padding: 12px 16px; font-size: 13px; margin-top: 12px;";
        textArea.setAttribute("placeholder", "Enter description");
        frag.appendChild(textArea);

        textArea.addEventListener("focus", () => {
          textArea.style.border = "1px solid #003bde";
        });
        textArea.addEventListener("focusout", () => {
          textArea.style.border = "1px solid #e2e2e2";
        });
        const name = document.querySelector("#name");
        name.parentNode.insertBefore(frag, name.nextSibling);
      }
      if (this.step.activeStep === 2) {
        // Removes textarea block
        const textArea = document.querySelector("#textarea");
        if (textArea) {
          textArea.remove();
        }

        // Creates map area
        const mapDiv = document.createElement("div");
        mapDiv.setAttribute('id', 'map')
        mapDiv.style =
          'height: 330px; width: 100%; background-image: url("./img/map.png"); margin-top:-32px; background-size: 100% auto; background-repeat: no-repeat;';

        const sibling = document.querySelector("#location");
        sibling.parentNode.insertBefore(mapDiv, sibling.nextSibling);
      }
      if (this.step.activeStep === 3) {
        const mapDiv = document.querySelector('#map')
        if (mapDiv) {
          mapDiv.remove();
        }
      }
    }
  },
  updated() {
    this.customStyle();
  }
};
</script>

<style scoped lang='scss'>
@import "../../styles/variables";
@import "../../styles/mixins";

.questions {
  @include display-flex(flex-start, flex-start, column);
  padding: 60px 24%;
  width: 100%;
  height: 100%;
  .header {
    min-width: 500px;
    max-width: 800px;
    @include display-flex(flex-start, flex-start, column);
    padding: 0;
    height: auto;
    line-height: 1.6;
    margin-bottom: 40px;
    h2 {
      font-size: 32px;
      font-family: "Merriweather";
      font-weight: 600;
      margin-bottom: 8px;
    }
    p {
      font-size: 15px;
      color: $colorFontMedium;
    }
  }
  .body {
    min-width: 500px;
    max-width: 800px;
    @include display-flex(flex-start, flex-start, column);
    width: 100%;
    div {
      @include display-flex(flex-start, flex-start, column);
      width: 100%;
      margin-bottom: 32px;
      label {
        font-size: 13px;
        margin-bottom: 12px;
      }
      input {
        height: 46px;
        border: 1px solid $grayBorder;
        border-radius: 3px;
        width: 100%;
        padding-left: 15px;
        font-size: 13px;
      }
      input:active,
      input:focus,
      textarea:active,
      textarea:focus {
        border: 1px solid $colorAccent;
      }
      .radio {
        margin-top: 8px;
      }
      .objective {
          margin-bottom: -24px;
      }
    }
  }
}
</style>