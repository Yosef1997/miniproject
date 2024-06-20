import { BsFillStarFill } from "react-icons/bs"
import Image from "next/image"
import React from "react"
import EventImg from "@/public/hero.webp"
import moment from "moment"
import Link from "next/link"

interface EventProps {
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

const EventCard: React.FC<EventProps> = (props) => {
  return (
    <div className='w-[150px] md:w-[300px] xl:w-[400px] bg-white rounded-md'>
      <Link href={`/events/${props.id}`}>
        <div className='relative'>
          <Image
            src={EventImg}
            alt='event'
            className='h-[120px] xl:h-[240px] w-[150px] md:w-[300px] xl:w-[400px] object-cover rounded-md'
          />
          <div className='bg-white flex items-center gap-x-2 absolute top-2 left-2 p-2 rounded-md'>
            <BsFillStarFill color='#F4B740' />
            <p className='text-xs font-bold'>{props.rating}</p>
          </div>
        </div>
        <div className='p-6 flex flex-col justify-between'>
          <h2 className='font-bold text-title text-xs md:text-base line-clamp-2'>
            {props.title}
          </h2>
          <p className='text-body text-xs md:text-sm '>
            {moment().format("dddd, DD MMMM YYYY - hh:mmA")}
          </p>
          <p className='text-body text-xs md:text-sm'>{props.location}</p>
          <p className='text-body text-xs md:text-sm font-semibold'>
            IDR {props.price}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default EventCard
