import axios from "axios" 
import { getAddress } from "@/config/server"
import type { CreateServiceDTO } from "@/interfaces/DTO/Services/CreateService"

export const servicesApi = {
  create: async (params: CreateServiceDTO) => {
    const result = await axios.post(getAddress('services/create'), params)

    return result.data
  },
}