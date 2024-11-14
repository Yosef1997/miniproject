import { Tickitz } from "@/types/tickitz"
import { createContext } from "react"

const defaultValue = {
  event: {
    id: 0,
    eventName: "",
    eventImage: "",
    category: "",
    location: "",
    venue: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    userId: 0,
    reviews: null,
    tickets: [
      {
        id: 0,
        name: "",
        seats: 0,
        price: 0,
        eventId: 0,
      },
    ],
    promotions: null,
  },
  setEvent: () => {},
}

const TickitzContext = createContext<Tickitz>(defaultValue)
export default TickitzContext
