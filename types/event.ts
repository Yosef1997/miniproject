export interface Events {
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
  reviews: Review[] | null
  tickets: Ticket[]
  promotions: Promotion[] | null
}

export interface Review {
  id: number
  experience: string
  quality: string
  improvement: string
  rating: number
  user: User
  eventId: number
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface User {
  id: number
  username: string | null
  email: string
  avatar: string | null
  role: string
  referralCode: string
  phone: string | null
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface Ticket {
  id: number
  name: string
  seats: number
  price: number
  eventId: number
}

export interface Promotion {
  id: number
  name: string
  type: string
  usageLimit: number
  discount: number
  expiredDate: string
  eventId: number
}

export interface EventResponse {
  statusCode: number
  message: string
  success: boolean
  data: {
    totalPages: number
    totalElements: number
    size: number
    content: Events[]
    number: number
    sort: {
      empty: boolean
      sorted: boolean
      unsorted: boolean
    }
    numberOfElements: number
    first: boolean
    last: boolean
    pageable: {
      pageNumber: number
      pageSize: number
      sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
      }
      offset: number
      paged: boolean
      unpaged: boolean
    }
    empty: boolean
  }
}
