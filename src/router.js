import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import ProgramList from './views/ProgramList.vue'
import Program from './views/Program.vue'
import Project from './views/Project.vue'
import Settings from './views/Settings.vue'

Vue.use(Router)

export default new Router({
  base: '/dashboard',
  routes: [
    {
      path: '/',
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
      path: '/programs/:programId/projects',
      name: 'projects',
      component: Program
    },
    {
      path: '/programs/:programId/details',
      name: 'details',
      component: Program
    },
    {
      path: '/programs/:programId/media',
      name: 'media',
      component: Program
    },
    {
      path: '/programs/:programId/projects/:projectId/manage',
      name: 'manage',
      component: Project
    },
    {
      path: '/programs/:programId/projects/:projectId/details',
      name: 'details',
      component: Project
    },
    {
      path: '/programs/:programId/projects/:projectId/media',
      name: 'media',
      component: Project
    },
  ]
})
