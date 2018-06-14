import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import Programs from './views/Programs.vue'
import Settings from './views/Settings.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/programs',
      name: 'programs',
      component: Programs
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})
