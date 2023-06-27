import { createRouter, createWebHistory } from 'vue-router'
import WorkersView from '../views/WorkersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/workers/',
      name: 'workers',
      component: WorkersView,
      children: [
        {
          path: ':id/about',
          component: () => import('../components/AboutWorker.vue'),
        },
      ]
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    }
  ]
})

export default router
