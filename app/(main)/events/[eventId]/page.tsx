import { Metadata } from "next"
import React from "react"
import EventList from "@/utils/MOCK_DATA"
import Hero from "@/public/hero.webp"
import Image from "next/image"
import Link from "next/link"

type Props = {
  params: {
    eventId: number
  }
}

type Event = {
  id: number
  title: string
  date: string
  time: string
  location: string
  vanue: string
  category: string
  organizer: string
  email: string
  phone: string
  description: string
  price: number
  eventImg: string
  organizerImg: string
  rating: number
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const eventId = params.eventId
  return {
    title: `${EventList[eventId].title}`,
  }
}

const page: React.FC<Props> = ({ params }) => {
  const event: Event = EventList[params.eventId]
  return (
    <div>
      <div className='border-b border-border-line lg:grid lg:grid-cols-3 lg:px-16 xl:px-32 lg:py-12'>
        <div className='flex justify-center'>
          <div className='border border-border-line p-8 rounded-md w-fit'>
            <Image
              src={Hero}
              alt={event.title}
              className='w-[160px] h-[245px] object-cover rounded-md'
            />
          </div>
        </div>
        <div className='px-6 py-8 lg:col-span-2'>
          <div className='flex flex-col lg:flex-row lg:justify-between items-center'>
            <div className='text-center lg:text-start'>
              <h2 className='text-title font-semibold text-xl text-center'>
                {event.title}
              </h2>
              <p className='text-body'>{event.category}</p>
            </div>
            <Link
              href={`/book/${event.id}`}
              className='bg-primary rounded-md text-center mt-3 lg:mt-0 text-white-btn p-3 font-semibold w-full lg:w-fit'
            >
              Book now
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-x-6 mb-4 mt-8'>
            <div>
              <p className='text-label text-sm'>Date</p>
              <p className='text-title'>{event.date}</p>
            </div>
            <div>
              <p className='text-label text-sm'>Location</p>
              <p className='text-title'>{event.location}</p>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-x-6'>
            <div>
              <p className='text-label text-sm'>Start time</p>
              <p className='text-title'>{event.time}</p>
            </div>
            <div>
              <p className='text-label text-sm'>Price</p>
              <p className='text-title'>IDR {event.price}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='px-6 lg:px-16 xl:px-32 py-8'>
        <h2 className='text-title font-semibold'>Description</h2>
        <p className='text-body text-xs lg:text-base mt-4'>
          {event.description}
        </p>
      </div>
    </div>
  )
}

export default page
