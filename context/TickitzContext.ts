import { Tickitz } from "@/types/tickitz"
import { createContext } from "react"

const defaultValue = {
  event: {
    id: 0,
    title: "",
    date: "",
    time: "",
    location: "",
    vanue: "",
    category: "",
    organizer: "",
    email: "",
    phone: "",
    description: "",
    price: 0,
    eventImg: "",
    organizerImg: "",
    rating: 0,
  },
  setEvent: () => {},
}

const TickitzContext = createContext<Tickitz>(defaultValue)
export default TickitzContext
