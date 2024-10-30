import type { IService } from '../Services/Service'

export interface IBusiness {
  id: number
  telegramID: number
  username: string
  firstName: string
  lastName: string
  companyName: string
  services: IService[]
}