interface Ticket {
  name: string
  seats: number
  price: number
}

interface Promotion {
  name: string
  type: string
  usageLimit: number
  discount: number
  expiredDate: string
}

export interface CreateEventReq {
  eventName: string
  eventImage: string
  category: string
  date: string
  startTime: string
  endTime: string
  location: string
  venue: string
  description: string
  userId: number | undefined
  tickets: Ticket[]
  promotions: Promotion[]
}
