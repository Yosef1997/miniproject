import { BiChevronRight } from "react-icons/bi"
import Image from "next/image"
import React from "react"
import Spark from "@/public/spark.svg"

interface OrderHistoryCardProps {
  date: string
  time: string
  title: string
  organizerImg: string
  ticketStatus: boolean
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = (props) => {
  return (
    <div className='bg-white rounded-md mb-6'>
      <div className='flex items-center justify-between border-b border-border-line px-12 py-10'>
        <div>
          <p className='text-placeholder text-sm'>
            Tuesday, 07 July 2020 - 04:30pm
          </p>
          <h2 className='text-title font-semibold text-2xl'>
            Spider-Man: Homecoming
          </h2>
        </div>
        <div>
          <Image src={Spark} alt='Organizer-image' />
        </div>
      </div>
      <div className='flex justify-between items-center px-12 py-8'>
        <div
          className={`${
            props.ticketStatus ? "bg-success" : "bg-label"
          } text-white-btn text-sm font-bold w-48 h-10 flex items-center justify-center rounded-md`}
        >
          {props.ticketStatus ? "Ticket in active" : "Ticket used"}
        </div>
        <div className='flex items-center'>
          <p className='text-lg text-placeholder'>Show Details</p>
          <BiChevronRight size={24} />
        </div>
      </div>
    </div>
  )
}

export default OrderHistoryCard
