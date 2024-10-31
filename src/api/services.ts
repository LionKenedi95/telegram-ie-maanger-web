import axios from "axios" 
import { getAddress } from "@/config/server"
import type { CreateServiceDTO } from "@/interfaces/DTO/Services/CreateService"
import type { GetServicesDTO } from "@/interfaces/DTO/Businesses/GetServices"

export const servicesApi = {
  create: async (params: CreateServiceDTO) => {
    const result = await axios.post(getAddress('services/create'), params)

    return result.data
  },
  getServices: async (params: GetServicesDTO) => {
    const result = await axios.post(getAddress(`services/get-service`), params)

    return result.data
  },
}