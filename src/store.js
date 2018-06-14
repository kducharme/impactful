import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    organization: 1,
    organizationUsers: [],

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
    SET_PROGRAMS: (state, programs) => { 
      console.log(state.programs)
      state.programs = programs;
    }
  },
  actions: {
    getPrograms(context,  state) {
      fetch(`http://localhost:3000/programs?organization=${this.state.organization}`)
        .then(r => r.json())
        .then(programs => {
          context.commit('SET_PROGRAMS', programs)
      });
    }
  }
})
