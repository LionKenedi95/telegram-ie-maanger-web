import { createRouter, createWebHistory } from 'vue-router'
import { RoutesNames } from '@/constants/RoutesNames'
import HomeView from '../views/HomeView.vue'
import BusinessView from '../views/BusinessView.vue'
import CreateManagerProfile from '@/components/CreateManagerProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RoutesNames.home,
      component: HomeView,
      children: [{
        path: '/business',
        name: RoutesNames.business,
        component: BusinessView,
        children: [{
          path: 'onboard',
          name: RoutesNames.createManagerProfile,
          component: CreateManagerProfile,
        }]
      },{
        path: '/appointment-form/:serviceId',
        name: RoutesNames.appointment,
        component: () => import('@/components/AppointmentForm.vue'),
      }]
    },
  ]
})

export default router
