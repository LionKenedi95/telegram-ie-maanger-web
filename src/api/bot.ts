import axios from "axios" 
import { getAddress } from "@/config/server"

interface BotApiRequiredPyaload {
  chatId: number
}

interface FirstServiceLinkPayload extends BotApiRequiredPyaload {
  link: string
}

interface NewAppointmentPayload extends BotApiRequiredPyaload {
  info: string
}

export const botApi = {
  firstServiceLink: async (params: FirstServiceLinkPayload) => {
    const result = await axios.post(getAddress('bot/first-service-link'), params)

    return result.data
  },
  newAppointment: async (params: NewAppointmentPayload) => {
    const result = await axios.post(getAddress(`bot/new-appointment`), params)

    return result.data
  },
}