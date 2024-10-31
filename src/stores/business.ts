import { ref } from 'vue'
import { defineStore } from 'pinia'
import { businessesApi } from '@/api/businesses'
import { servicesApi } from '@/api/services'
import type { UpdateBusinessDTO } from '@/interfaces/DTO/Businesses/UpdateBusiness'
import type { IBusiness } from '@/interfaces/DTO/Businesses/Business'
import type { IService } from '@/interfaces/DTO/Services/Service'

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
      .then((result: IService) => {
        if (result?.id) {
          if (Array.isArray(bussiness.value?.services)) {
            bussiness.value.services.push(result)
          } else {
            bussiness.value.services = [result]
          }
        }

        return result
      })
  }

  return {
    bussiness,
    setBussiness,
    updateBusiness,
    createService,
  }
})
