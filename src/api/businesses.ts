import axios from "axios"
import { getAddress } from "@/config/server"
import type { IBusiness } from "@/interfaces/DTO/Businesses/Business"
import type { CheckBusinessesDTO } from "@/interfaces/DTO/Businesses/CheckBusinesses"
import type { UpdateBusinessDTO } from '@/interfaces/DTO/Businesses/UpdateBusiness'

export const businessesApi = {
  check: async (params: CheckBusinessesDTO) => {
    const result = await axios.post(getAddress('businesses/check'), params)

    return result.data as IBusiness
  },
  update: async (id: number, fields: UpdateBusinessDTO) => {
    const result = await axios.post(getAddress(`businesses/edit`), {
      id,
      edit: fields,
    })

    return result.data
  },
}