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
      // children: [{
      //   // path: '/business',
      //   // name: RoutesNames.business,
      //   // component: BusinessView,
      //   // children: [{
      //   //   path: 'onboard',
      //   //   name: RoutesNames.createManagerProfile,
      //   //   component: CreateManagerProfile,
      //   // }, {
      //   //   path: 'settings',
      //   //   name: RoutesNames.businessSettings,
      //   //   component: () => import('@/components/BusinessSettings.vue'),
      //   // }, {
      //   //   path: 'service/:id',
      //   //   component: () => import('@/views/ServiceSettings.vue'),
      //   //   children: [{
      //   //     path: '/',
      //   //     name: RoutesNames.serviceSettings,
      //   //     component: () => import('@/components/ServiceSettingsForm.vue'),
      //   //   }, {
      //   //     path: '/timeslots',
      //   //     name: RoutesNames.timeSlotsSettings,
      //   //     component: () => import('@/components/TimeSlotsSettingsForm.vue'),
      //   //   }]
      //   }]
      // }, 
      // {
      //   path: '/magazine',
      //   name: RoutesNames.magazine,
      //   component: MagazineView,
      //   children: [{
      //     path: '/service/:serviceId',
      //     name: RoutesNames.magazineOneService,
      //     component: AppointmentForm,
      //   }, {
      //     path: '/services/:businessId',
      //     name: RoutesNames.magazineAllServices,
      //     component: ItemsList,
      //   }]
      // }],
    },
  ]
})

export default router
