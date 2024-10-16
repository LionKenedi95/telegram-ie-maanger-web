import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IServiceItem } from '@/interfaces/IServiceItem'

export const useServiceAppointment = defineStore('serviceAppointment', () => {
  const selectedService = ref<IServiceItem | null>(null)

  const selectService = (item: IServiceItem) => {
    selectedService.value = item
  }

  return { selectedService, selectService }
})
