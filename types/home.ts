import { Event } from "./event"

export interface ApiResponse {
  statusCode: number
  message: string
  success: boolean
  data: Home
}

interface Home {
  popular: Event[]
  upcoming: Event[]
}
