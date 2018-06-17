import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    organization: 1,
    organizationUsers: [],
    activeUser: 1, // TODO = Hook up to auth

    programs: [],
    programsSelected: [],
    programActive: null,
    programActiveName: null,
    programActiveManager: null,
    programActiveUsers: [],

    projects: [],
    projectsSelected: [],
    projectActive: null,
    projectActiveName: null,
    projectActiveManager: null,
    projectActiveUsers: []
  },
  mutations: {
    // Project-related mutations
    SET_PROGRAMS: (state, programs) => {
      state.programs = programs;
    },
    SET_ACTIVE_PROGRAM: (state, id) => {
      state.programActive = id;
    },
    SET_ACTIVE_PROGRAM_NAME: (state, name) => {
      state.programActiveName = name;
    },
    RESET_ACTIVE_PROGRAM: state => {
      state.programActive = null;
      state.programActiveName = null;
    },
    // Project-related mutations
    SET_PROJECTS: (state, projects) => {
      state.projects = projects;
    },
    SET_ACTIVE_PROJECT: (state, id) => {
      state.projectActive = id;
    },
    SET_ACTIVE_PROJECT_NAME: (state, project) => {
      state.projectActiveName = project.name;
      state.projectActiveManager = project.manager;
    },
    RESET_ACTIVE_PROJECT: state => {
      state.projectActive = null;
      state.projectActiveName = null;
    },
  },
  actions: {
    getPrograms(context, state) {
      fetch(
        `http://localhost:3000/programs?organization=${this.state.organization}`
      )
        .then(r => r.json())
        .then(programs => {
          context.commit("SET_PROGRAMS", programs);
        });
    },
    getProjects(context, id) {
      fetch(`http://localhost:3000/projects?program=${id}`)
        .then(r => r.json())
        .then(projects => {
          context.commit("SET_PROJECTS", projects);
        });
    },
    getActiveProgram(context, e) {
      let id = e.currentTarget.parentNode.parentNode.parentNode.id;
      context.commit("SET_ACTIVE_PROGRAM", id);

      fetch(`http://localhost:3000/programs?id=${id}`)
        .then(r => r.json())
        .then(program => {
          context.commit("SET_ACTIVE_PROGRAM_NAME", program[0].name);
        });
    },
    resetActiveProgram(context) {
      context.commit("RESET_ACTIVE_PROGRAM", null);
    },
    resetActiveProject(context) {
      context.commit("RESET_ACTIVE_PROJECT", null);
    },
    setActiveProgramOnLoad(context, id) {
      context.commit("SET_ACTIVE_PROGRAM", id);

      fetch(`http://localhost:3000/programs?id=${id}`)
        .then(r => r.json())
        .then(program => {
          context.commit("SET_ACTIVE_PROGRAM_NAME", program[0].name);
        });
    },
    setActiveProjectOnLoad(context, id) {
      context.commit("SET_ACTIVE_PROJECT", id);

      fetch(`http://localhost:3000/projects?id=${id}`)
        .then(r => r.json())
        .then(project => {
          context.commit("SET_ACTIVE_PROJECT_NAME", project[0]);
        });
    }
  }
});
