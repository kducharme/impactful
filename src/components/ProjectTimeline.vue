<template>
    <div class="timeline">
        <div class="feature__title">
            <h4>Project notes <span>({{ undreadNotes }} new)</span></h4>
        </div>
        <div class="timeline__write">
            <img :src="activeUserImage" />
            <textarea type='textarea' v-model="note" @keyup.enter="saveNote" placeholder="Post a note..."></textarea>
        </div>
        <div class="timeline__notes">
            <ProjectNote
                v-for="note in allNotes"
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
      undreadNotes: 2,
      activeUserImage: ""
    };
  },
  methods: {
    getDate() {
      const date = new Date();
      console.log(date);
      const monthList = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];
      const d = date.getDate();
      const m = date.getMonth();
      const y = date.getFullYear();
      const fullDate = `${monthList[m]} ${d}, ${y}`;
      return { fullDate, date };
    },
    getActiveUserImage() {
      fetch(`http://localhost:3000/users?id=${this.activeUser}`)
        .then(r => r.json())
        .then(user => {
            this.activeUserImage = user[0].image;
        });
    },
    saveNote() {
      const newNote = {
        note: true,
        text: this.note,
        date_created: this.getDate().fullDate,
        date_sort: this.getDate().date,
        date_deleted: null,
        read: false,
        project: window.location.href.split("/projects/")[1],
        image: null, // TODO = change once images can be added
        author: 2 // TODO = change once active used hooked up
      };
      fetch("http://localhost:3000/project_notes", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(newNote)
      })
        .then(
          fetch(`http://localhost:3000/users?id=${newNote.author}`)
            .then(r => r.json())
            .then(author => {
              newNote.writer = author[0];
              this.allNotes.push(newNote);
              this.allNotes.sort(
                (a, b) => new Date(b.date_sort) - new Date(a.date_sort)
              );
            })
        )
        .catch(error => console.log(error));
      this.note = "";
    },
    loadNotes() {
      const id = window.location.href.split("/projects/")[1];
      fetch(`http://localhost:3000/project_notes?project=${id}`)
        .then(r => r.json())
        .then(notes => {
          notes.forEach(note => {
            fetch(`http://localhost:3000/users?id=${note.author}`)
              .then(r => r.json())
              .then(author => {
                note.writer = author[0];
                this.allNotes.push(note);
                this.allNotes.sort(
                  (a, b) => new Date(b.date_sort) - new Date(a.date_sort)
                );
              });
          });
        });
    }
  },
  computed: {
    ...mapState(["projects", "activeUser"])
  },
  beforeMount() {
    this.loadNotes();
    this.getActiveUserImage();
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
    img {
      width: 40px;
      height: 40px;
      border-radius: 3px;
    }
    textarea {
      width: calc(100% - 40px);
      height: 100%;
      border: none;
      padding: 12px 15px;
      font-size: 14px;
      resize: none;
    }
    input::placeholder {
      color: $colorFontMedium;
    }
  }
  .timeline__notes {
    width: 100%;
    height: calc(100% - 75px - 50px);
    overflow: scroll;
  }
}
</style>