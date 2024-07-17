// "use client"
import React from "react"
import { Metadata } from "next"
import DetailEvent from "./_components/DetailEvent"
import { DetailEventResponse } from "@/types/detailEvent"

type Props = {
  params: {
    eventId: number
  }
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  // const { response } = useDetailEvent(params.eventId)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOSTNAME_API}${process.env.NEXT_PUBLIC_PREFIX_API}/event/${params.eventId}`
  )

  if (!response.ok) {
    return {
      title: `${params.eventId}`,
    }
  }

  const result: DetailEventResponse = await response.json()
  return {
    title: `${result?.data.eventName}`,
  }
}

const EventId: React.FC<Props> = ({ params }) => {
  return (
    <div>
      <DetailEvent eventId={params.eventId} />
    </div>
  )
}

export default EventId
