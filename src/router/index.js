import { createRouter, createWebHistory } from 'vue-router'
import VehicleView from '../views/VehicleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'vehicle',
      component: VehicleView
    },
    {
      path: '/pricing',
      name: 'pricing',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PrincingView.vue')
    }
  ]
})

export default router
