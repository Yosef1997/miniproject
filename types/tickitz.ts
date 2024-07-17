import { Dispatch, SetStateAction } from "react"
import { Events } from "./event"

export interface Tickitz {
  event: Events | undefined
  setEvent: Dispatch<SetStateAction<Events | undefined>>
}
