import type { CreateUserDTO } from "@/interfaces/DTO/Users/CreateUser"
import axios from "axios"

export const userApi = {
  create: async (params: CreateUserDTO) => {
    const result = await axios.get('http://localhost:3000/users/create', {
      params,
    })

    console.log(result)
  }
}