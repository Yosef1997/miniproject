import React from "react"
import EventForm from "../_components/EventForm"
import { Metadata } from "next"
import EventList from "@/utils/MOCK_DATA"

type Props = {
  params: {
    eventId: number
  }
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const eventId = params.eventId
  return {
    title: `${EventList[eventId].title}`,
  }
}

const page = () => {
  return (
    <div className='bg-background px-6 lg:px-[70px] pt-14 pb-24'>
      <EventForm isDetailEvent={true} />
      <div className='mt-6'></div>
    </div>
  )
}

export default page
