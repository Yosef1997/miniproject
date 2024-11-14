import React from "react"
import EventForm from "../_components/EventForm"
import { Metadata } from "next"
import { DetailEventResponse } from "@/types/detailEvent"

type Props = {
  params: {
    eventId: number
  }
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
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

const DashboardEventId = () => {
  return (
    <div className='bg-background px-6 lg:px-[70px] pt-14 pb-24'>
      <EventForm isDetailEvent={true} />
      <div className='mt-6'></div>
    </div>
  )
}

const data = [
  {
    organizerId: 2454,
    totalSales: 106100,
    date: "2024-07-18T00:00:00",
  },
  {
    organizerId: 2454,
    totalSales: 10100,
    date: "2024-07-10T00:00:00",
  },
]

const convertData = {
  data: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ],
  label: [
    "1Jul",
    "2Jul",
    "3Jul",
    "4Jul",
    "5Jul",
    "6Jul",
    "7Jul",
    "8Jul",
    "9Jul",
    "10Jul",
    "11Jul",
    "12Jul",
    "13Jul",
    "14Jul",
    "15Jul",
    "16Jul",
    "17Jul",
    "18Jul",
    "19Jul",
    "20Jul",
    "21Jul",
    "22Jul",
    "23Jul",
    "24Jul",
    "25Jul",
    "26Jul",
    "27Jul",
    "28Jul",
    "29Jul",
    "30Jul",
    "31Jul",
  ],
}

// const convertData = {
//   data: [0, 0, 0, 0, 0, 0, 106100, 0, 0, 0, 0, 0],
//   label: [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "Mei",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ],
// }

// const convertData = {
//   data: [
//     0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5000, 8000, 550, 550, 0, 0, 0, 0, 0, 0, 0,
//     0, 0,
//   ],
//   label: [
//     "00:00",
//     "01:00",
//     "02:00",
//     "03:00",
//     "04:00",
//     "05:00",
//     "06:00",
//     "07:00",
//     "08:00",
//     "09:00",
//     "10:00",
//     "11:00",
//     "12:00",
//     "13:00",
//     "14:00",
//     "15:00",
//     "16:00",
//     "17:00",
//     "18:00",
//     "19:00",
//     "20:00",
//     "21:00",
//     "22:00",
//     "23:00",
//   ],
// }

export default DashboardEventId
