<template>
    <div class="timeline">
        <div class="feature__title">
            <h4>Project notes <span>({{ undreadNotes }} new)</span></h4>
        </div>
        <div class="timeline__write">
            <div></div>
            <input v-model="note" @keyup.enter="saveNote" placeholder="Post a note...">
        </div>
        <div class="timeline__notes">
            <ProjectNote
                v-for="note in allNotes[0]"
                :noteDetails="note"
                :key="note.id"
                :id="note.id" 
            />
        </div>
        
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ProjectNote from "../components/ProjectNote.vue";

export default {
  name: "timeline",
  components: {
      ProjectNote
  },
  data() {
    return {
      allNotes: [],
      note: "",
      undreadNotes: 2
    };
  },
  methods: {
    saveNote() {
      console.log(this.note);
      this.note = "";
    }
  },
  computed: {
    ...mapState(["projects"])
  },
  beforeMount() {
    const id = window.location.href.split("/projects/")[1]
    fetch(`http://localhost:3000/project_notes?project=${id}`)
      .then(r => r.json())
      .then(notes => {
        this.allNotes.push(notes);
      });
  }
};
</script>

<style lang='scss'>
@import "../styles/variables";
@import "../styles/mixins";
@import "../styles/project";
.timeline {
  @include display-flex(flex-start, flex-start, column);
  .timeline__write {
    @include display-flex(flex-start, center, row);
    height: 75px;
    width: 100%;
    padding: 0 20px 0 20px;
    border-bottom: 1px solid $grayBorder;
    div {
      border: 2px solid $grayBorder;
      width: 40px;
      height: 40px;
    }
    input {
      width: 100%;
      height: 100%;
      border: none;
      padding-left: 15px;
      font-size: 14px;
    }
    input::placeholder {
      color: $colorFontMedium;
    }
  }
}
</style>