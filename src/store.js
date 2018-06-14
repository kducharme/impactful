import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    organization: 'Appalachia Service Project',
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

  },
  actions: {

  }
})
