"use client"
import { Tickitz } from "@/types/tickitz"
import React, { ReactNode, useState } from "react"
import TickitzContext from "./TickitzContext"
import { Event } from "@/types/event"

const TickitzProvider: React.FC<{ children: JSX.Element | ReactNode }> = ({
  children,
}) => {
  let [event, setEvent] = useState<Event>()

  const value: Tickitz = {
    event,
    setEvent,
  }

  return (
    <TickitzContext.Provider value={value}>{children}</TickitzContext.Provider>
  )
}

export default TickitzProvider
