import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import ProgramList from './views/ProgramList.vue'
import Program from './views/Program.vue'
import Settings from './views/Settings.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/programs',
      name: 'programs',
      component: ProgramList
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/programs/:id',
      name: 'program',
      component: Program
    }
  ]
})
