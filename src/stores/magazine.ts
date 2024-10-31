import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IService } from '@/interfaces/Services/Service'

export const useMagazineStore = defineStore('magazine', () => {
  const services = ref<IService[]>([])

  const setServices = (servicesData: IService) => {
    services.value = servicesData
  }

  return {
    services,
    setServices,
  }
})
