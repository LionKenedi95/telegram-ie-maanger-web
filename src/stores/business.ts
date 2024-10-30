import { ref } from 'vue'
import { defineStore } from 'pinia'
import { businessesApi } from '@/api/businesses'
import { servicesApi } from '@/api/services'
import type { UpdateBusinessDTO } from '@/interfaces/DTO/Businesses/UpdateBusiness'
import type { IBusiness } from '@/interfaces/DTO/Businesses/Business'

interface ICreateServiceFields {
  title?: string
  description?: string
}

export const useBusinessStore = defineStore('bussiness', () => {
  const bussiness = ref<IBusiness | null>(null)

  const setBussiness = (bussinessData: IBusiness) => {
    bussiness.value = bussinessData
  }
  
  const updateBusiness = (fields: UpdateBusinessDTO) => {
    businessesApi.update(bussiness.value?.id, fields)
      .then((result) => {
        console.log('updateBusiness result', result)
      })
  }

  const createService = (fields: ICreateServiceFields) => {
    servicesApi.create({
      businessID: bussiness.value?.id,
      title: fields.title || '',
      description: fields.description || '',
    })
      .then(() => {

      })
  }

  return {
    bussiness,
    setBussiness,
    updateBusiness,
    createService,
  }
})
