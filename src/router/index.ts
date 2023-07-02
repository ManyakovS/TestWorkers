import { createRouter, createWebHistory } from 'vue-router'
import WorkersView from '../views/WorkersView.vue'
import { ref } from 'vue'

import { useAxios } from '@vueuse/integrations/useAxios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/workers'
    },
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
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
    }
  ]
})

const isAuthenticated = ref(false)

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('auth_token')

  if(token == null)
    isAuthenticated.value = false

  if (to.name == 'auth' && token !== null) {
    if (await auth(token) == 200)
      next({ name: 'workers' })
    return
  }

  if (to.name !== 'auth' && !isAuthenticated.value) {

    if (token !== null) {

      if (await auth(token) == 200) {
        isAuthenticated.value = true
        next()
        return
      }
      else next({ name: 'auth' })
      return
    }
    next({ name: 'auth' })
    return
  }
  else next()
  return
})

const auth = async (token: string) => {
  try {
    const data = await useAxios('https://test.atwinta.online/api/v1/user',
      {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })

    return data.response.value.status
  } catch (error) {

    return 500
  }
}

export default router
