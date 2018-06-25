import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import ProgramList from './views/ProgramList.vue'
import Program from './views/Program.vue'
import Project from './views/Project.vue'
import ProjectManage from './views/ProjectManage.vue'
import ProjectDetails from './views/ProjectDetails.vue'
import ProjectMedia from './views/ProjectMedia.vue'
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
      path: '/programs/:programId/projects/',
      name: 'program',
      component: Program
    },
    {
      path: '/programs/:programId/projects/:projectId',
      name: 'project',
      component: Project
    }
  ]
})
