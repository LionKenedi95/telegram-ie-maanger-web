import { ref } from 'vue'
import { defineStore } from 'pinia'
import { businessesApi } from '@/api/businesses'
import type { UpdateBusinessDTO } from '@/interfaces/DTO/Businesses/UpdateBusiness'

interface IBussiness {
  id: number
  telegramID: number
  username: string
  firstName: string
  lastName: string
  companyName: string
}

export const useBusinessStore = defineStore('bussiness', () => {
  const bussiness = ref<IBussiness | null>(null)

  const setBussiness = (bussinessData: IBussiness) => {
    bussiness.value = bussinessData
  }
  
  const updateBusiness = (fields: UpdateBusinessDTO) => {
    businessesApi.update(bussiness.value?.id, fields)
      .then((result) => {
        console.log('updateBusiness result', result)
      })
  }

  return { bussiness, setBussiness, updateBusiness }
})
