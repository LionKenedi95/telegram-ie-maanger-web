import type { CreateUserDTO } from "@/interfaces/DTO/Users/CreateUser"
import axios from "axios"

export const userApi = {
  create: async (params: CreateUserDTO) => {
    const result = await axios.post('http://localhost:3000/users/create', {
      params,
    })

    return result.data
  }
}