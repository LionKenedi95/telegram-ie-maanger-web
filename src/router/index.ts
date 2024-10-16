import { createRouter, createWebHistory } from 'vue-router'
import { RoutesNames } from '@/constants/RoutesNames'
import HomeView from '../views/HomeView.vue'
import ItemsList from '@/components/ItemsList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RoutesNames.home,
      component: HomeView,
      children: [{
        path: '/items-list',
        name: RoutesNames.itemsList,
        component: ItemsList,
      },{
        path: '/appointment-form/:serviceId',
        name: RoutesNames.appointment,
        component: () => import('@/components/AppointmentForm.vue'),
      }]
    },
  ]
})

export default router
