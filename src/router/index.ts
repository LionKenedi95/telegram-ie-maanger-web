import { createRouter, createWebHistory } from 'vue-router'
import { RoutesNames } from '@/constants/RoutesNames'
import HomeView from '@/views/HomeView.vue'
// import BusinessView from '@/views/BusinessView.vue'
// import MagazineView from '@/views/MagazineView.vue'
// import CreateManagerProfile from '@/components/CreateManagerProfile.vue'
// import ItemsList from '@/components/ItemsList.vue'
// import AppointmentForm from '@/components/AppointmentForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RoutesNames.home,
      component: HomeView,
    }, {
      path: '/test-ui',
      name: RoutesNames.testUI,
      component: () => import('@/views/TestUiView.vue')
    },
  ]
})

export default router
