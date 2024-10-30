import { ref } from 'vue'
import { defineStore } from 'pinia'

interface IBussiness {
  id: number
  telegramID: number
  username: string
  firstName: string
  lastName: string
}

export const useBusinessStore = defineStore('bussiness', () => {
  const bussiness = ref<IBussiness | null>(null)

  const setBussiness = (bussinessData: IBussiness) => {
    bussiness.value = bussinessData
  }

  return { bussiness, setBussiness }
})
