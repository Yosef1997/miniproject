import { Events } from "./event"

export interface ApiResponse {
  statusCode: number
  message: string
  success: boolean
  data: Home
}

interface Home {
  popular: Events[]
  upcoming: Events[]
}
