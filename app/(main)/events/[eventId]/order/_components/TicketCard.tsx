import { Ticket } from "@/types/event"
import React, { useState } from "react"

const TicketCard: React.FC<{ params: Ticket }> = ({ params }) => {
  const [totalOrder, setTotalOrder] = useState<number>(0)

  return (
    <div className='flex justify-between items-center py-3 border-b border-border-line'>
      <div className='flex flex-col items-start'>
        <p className='text-label text-sm'>Ticket {params.name}</p>
        <p className='text-label text-sm'>IDR {params.price}</p>
        <p className='text-label text-sm'>{params.seats} seats remaining</p>
      </div>
      <input
        onChange={(e) => setTotalOrder(Number(e.target.value))}
        className='text-sm text-title text-center border border-border-line rounded-md w-[15vw] lg:w-[5vw] py-2 focus:outline-none'
        type='number'
        placeholder={`${totalOrder}`}
      />
    </div>
  )
}

export default TicketCard
