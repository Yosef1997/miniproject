import { Events } from "./event"

export interface DetailEventResponse {
  statusCode: number
  message: string
  success: boolean
  data: Events
}
