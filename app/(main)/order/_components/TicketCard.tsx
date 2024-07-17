import { ORDER_TICKETS } from "@/constant/constant"
import { Ticket } from "@/types/event"
import { TicketReq } from "@/types/order"
import React, { useEffect, useState } from "react"

const TicketCard: React.FC<{ params: Ticket[] | [] }> = ({ params }) => {
  const [ticketsPrice, setTicketsPrice] = useState<number>(0)
  const [ticketsQty, setTicketsQty] = useState<number>(0)
  const [tickets, setTickets] = useState<TicketReq[]>([])

  const handleTicket = (
    e: React.ChangeEvent<HTMLInputElement>,
    ticketId: number
  ) => {
    const quantity = Number(e.target.value)

    if (quantity >= 0) {
      setTickets((prevTickets) => {
        const existingTicketIndex = prevTickets.findIndex(
          (ticket) => ticket.ticketId === ticketId
        )

        if (existingTicketIndex !== -1) {
          const updatedTickets = [...prevTickets]
          updatedTickets[existingTicketIndex] = { ticketId, quantity }
          return updatedTickets
        } else if (quantity > 0) {
          return [...prevTickets, { ticketId, quantity }]
        }
        return prevTickets
      })
    }
  }

  const calculateTotalQuantity = () => {
    return tickets.reduce((total, ticket) => total + ticket.quantity, 0)
  }

  const calculateTotalPrice = () => {
    return tickets.reduce((total, ticket) => {
      const ticketType = params.find((param) => param.id === ticket.ticketId)
      return ticketType ? total + ticket.quantity * ticketType.price : total
    }, 0)
  }

  useEffect(() => {
    setTicketsPrice(calculateTotalPrice())
    setTicketsQty(calculateTotalQuantity())
  }, [tickets])

  useEffect(() => {
    sessionStorage.setItem(
      ORDER_TICKETS,
      JSON.stringify({
        tickets: tickets,
        ticketsPrice: ticketsPrice,
        ticketsQty: ticketsQty,
      })
    )
  }, [ticketsPrice, ticketsQty])

  return (
    <div>
      {params.map((params, i) => {
        return (
          <div
            key={i}
            className='flex justify-between items-center py-3 border-b border-border-line'
          >
            <div className='flex flex-col items-start'>
              <p className='text-label text-sm'>Ticket {params.name}</p>
              <p className='text-label text-sm'>IDR {params.price}</p>
              <p className='text-label text-sm'>
                {params.seats} seats remaining
              </p>
            </div>
            <input
              // onChange={(e) => setTotalOrder(Number(e.target.value))}
              onChange={(e) => handleTicket(e, params.id)}
              className='text-sm text-title text-center border border-border-line rounded-md w-[15vw] lg:w-[5vw] py-2 focus:outline-none'
              type='number'
              placeholder='_'
            />
          </div>
        )
      })}
    </div>
  )
}

export default TicketCard
