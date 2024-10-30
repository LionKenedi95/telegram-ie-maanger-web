import { ref } from 'vue'
import { defineStore } from 'pinia'
import { businessesApi } from '@/api/businesses'
import { servicesApi } from '@/api/services'
import type { UpdateBusinessDTO } from '@/interfaces/DTO/Businesses/UpdateBusiness'

interface IService {
  id: number
  businessID: number
  title: string
  description: string
}

interface IBussiness {
  id: number
  telegramID: number
  username: string
  firstName: string
  lastName: string
  companyName: string
  services: IService[]
}

interface ICreateServiceFields {
  title?: string
  description?: string
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
