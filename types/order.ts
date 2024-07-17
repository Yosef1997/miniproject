import { User } from "./users"

export interface TicketReq {
  ticketId: number
  quantity: number
}

export interface OrderRequest {
  totalPrice: number
  totalTicket: number
  usedPoint: number
  userId: number
  organizerId: number
  eventId: number
  tickets: TicketReq[]
  promoIds: number[]
}

interface ReferralVoucher {
  id: number
  discountPercentage: number
  userId: number
  status: boolean
}

interface TicketResponse {
  id: number
  name: string
  seats: number
  price: number
  eventId: number
}

interface Promotion {
  id: number
  name: string
  type: string
  usageLimit: number
  discount: number
  expiredDate: string
  eventId: number
  createdAt?: string
  updatedAt?: string
  deletedAt?: string | null
}

interface Event {
  id: number
  eventName: string
  eventImage: string
  category: string
  location: string
  venue: string
  description: string
  date: string
  startTime: string
  endTime: string
  userId: number
  reviews: any[]
  tickets: TicketResponse[]
  promotions: Promotion[]
}

interface OrderTicket {
  id: number
  orderId: number
  ticket: TicketResponse
  quantity: number
}

interface OrderData {
  id: number
  totalPrice: number
  totalTicket: number
  usedPoint: number
  user: User
  organizer: User
  event: Event
  tickets: OrderTicket[]
  promotions: Promotion[]
}

export interface OrderResponse {
  statusCode: number
  message: string
  success: boolean
  data: OrderData
}
