import { Events } from "./event"

export interface ApiResponse {
  statusCode: number
  message: string
  success: boolean
  data: Home
}

interface Home {
<<<<<<< HEAD
  popular: Event[] | []
  upcoming: Event[] | []
=======
  popular: Events[]
  upcoming: Events[]
>>>>>>> 1bd6a62117e3b09de9d03fcc9a4cbd3bfb2f5e15
}
