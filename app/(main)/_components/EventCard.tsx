import { BsFillStarFill } from "react-icons/bs"
import Image from "next/image"
import React from "react"
import EventImg from "@/public/hero.webp"

interface EventCardProps {
  rating: string
  title: string
  date: string
  location: string
  price: string
}

const EventCard: React.FC<EventCardProps> = (props) => {
  return (
    <div className='w-[200px] bg-white rounded-md'>
      <div className='relative'>
        <Image
          src={EventImg}
          alt='event'
          className='h-[120px] w-[200px] object-cover rounded-md'
        />
        <div className='bg-white flex items-center gap-x-2 absolute top-2 left-2 p-2 rounded-md'>
          <BsFillStarFill color='#F4B740' />
          <p className='text-xs'>{props.rating}</p>
        </div>
      </div>
      <div className='p-6'>
        <h2 className='font-bold text-title'>{props.title}</h2>
        <p className='text-body text-sm'>{props.date}</p>
        <p className='text-body text-sm'>{props.location}</p>
        <p className='text-body text-sm font-semibold'>IDR {props.price}</p>
      </div>
    </div>
  )
}

export default EventCard
