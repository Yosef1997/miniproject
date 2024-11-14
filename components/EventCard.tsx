import { BsFillStarFill } from "@react-icons/all-files/bs/BsFillStarFill"
import Image from "next/image"
import React from "react"
import EventImg from "@/public/hero.webp"
import moment from "moment"
import Link from "next/link"
import { Events, Promotion, Review, Ticket } from "@/types/event"

interface EventProps {
  event: Events
  urlLink: string
}

const EventCard: React.FC<EventProps> = (props) => {
  const price: Ticket[] = props.event.tickets.sort((a, b) => b.price - a.price)
  return (
    <div className='w-[150px] md:w-[300px] xl:w-[400px] bg-white rounded-md'>
      <Link href={`/${props.urlLink}/${props.event.id}`}>
        <div className='relative'>
          <Image
            src={props.event.eventImage}
            alt='event'
            width={400}
            height={240}
            className='h-[120px] xl:h-[240px] w-[150px] md:w-[300px] xl:w-[400px] object-cover rounded-md'
          />
          {/* <div className='bg-white flex items-center gap-x-2 absolute top-2 left-2 p-2 rounded-md'>
            <BsFillStarFill color='#F4B740' />
            <p className='text-xs font-bold'>{props.rating}</p>
          </div> */}
        </div>
        <div className='p-6 flex flex-col justify-between'>
          <h2 className='font-bold text-title text-xs md:text-base line-clamp-2'>
            {props.event.eventName}
          </h2>
          <p className='text-body text-xs md:text-sm '>
            {moment(props.event.date).format("dddd, DD MMMM YYYY - hh:mmA")}
          </p>
          <p className='text-body text-xs md:text-sm'>{props.event.location}</p>
          {props.event.tickets.length === 0 ? (
            <p className='text-body text-xs md:text-sm font-semibold'>Free</p>
          ) : (
            <p className='text-body text-xs md:text-sm font-semibold'>
              Start From IDR {price[0].price} - {price[price.length - 1].price}
            </p>
          )}
        </div>
      </Link>
    </div>
  )
}

export default EventCard
