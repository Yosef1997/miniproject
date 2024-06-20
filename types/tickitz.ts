import { Dispatch, SetStateAction } from "react"
import { Event } from "./event"

export interface Tickitz {
  event: Event | undefined
  setEvent: Dispatch<SetStateAction<Event | undefined>>
}
