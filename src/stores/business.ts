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

export const useBusinessStore = defineStore('business', () => {
  const business = ref<IBusiness | null>(null)

  const setBussiness = (bussinessData: IBusiness) => {
    business.value = bussinessData
  }
  
  const updateBusiness = (fields: UpdateBusinessDTO) => {
    businessesApi.update(business.value?.id, fields)
      .then((result) => {
        console.log('updateBusiness result', result)
      })
  }

  const createService = async (fields: ICreateServiceFields) => {
    return servicesApi.create({
      businessID: business.value?.id,
      title: fields.title || '',
      description: fields.description || '',
    })
      .then((result: IService) => {
        if (result?.id) {
          if (Array.isArray(business.value?.services)) {
            business.value.services.push(result)
          } else {
            business.value.services = [result]
          }
        }

        return result
      })
  }

  return {
    business,
    setBussiness,
    updateBusiness,
    createService,
  }
})
