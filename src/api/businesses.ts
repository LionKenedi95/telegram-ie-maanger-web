import { getAddress } from "@/config/server"
import type { CheckBusinessesDTO } from "@/interfaces/DTO/Businesses/CheckBusinesses"
import type { GetServicesDTO } from "@/interfaces/DTO/Businesses/GetServices"
import axios from "axios"

export const businessesApi = {
  check: async (params: CheckBusinessesDTO) => {
    const result = await axios.post(getAddress('businesses/check'), params)

    return result.data
  },
  getServices: async (params: GetServicesDTO) => {
    const result = await axios.post(getAddress(`businesses/get-service`), params)

    return result.data
  }
}