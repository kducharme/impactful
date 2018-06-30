<template>
  <div class="questions">
      <div class="header">
        <h2 class="header__title"></h2>
        <h2 class="header__description"></h2>
      </div>
      <p></p>
      <div
        class='inputs'
        v-for="q in questions"
        :key="q.id"
        :id="q.id"
        >
            <label :for="q.input">{{ q.label }}</label>
            <input type="text" :placeholder="q.placeholder">
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
  },
};
</script>

<style lang='scss'>
@import "../../styles/variables";
@import "../../styles/mixins";

.questions {
  padding: 0 15%;
  width: 100%;
  height: 100%;
}
</style>