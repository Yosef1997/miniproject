"use client"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { QRCodeGeneratorComponent } from "@syncfusion/ej2-react-barcode-generator"
import TickitzWhite from "@/public/tickitz-white.svg"
import { OrderData } from "@/types/order"
import { TICKET_STORAGE } from "@/constant/constant"
import moment from "moment"

const Ticket = () => {
  const [event, setEvent] = useState<OrderData>()

  useEffect(() => {
    const storage = sessionStorage.getItem(TICKET_STORAGE)
    if (storage !== null) {
      const parsedData = JSON.parse(storage)
      setEvent(parsedData)
    }
  }, [])

  return (
    <div className='bg-background px-6 lg:px-16 xl:px-32 py-12'>
      <div className='bg-white rounded-md lg:grid lg:grid-cols-3'>
        <div className=' relative flex flex-col justify-center items-center max-lg:border-b lg:border-r border-border-line border-dashed '>
          <div className='bg-primary w-full rounded-t-md hidden lg:flex justify-center lg:py-4'>
            <Image
              src={TickitzWhite}
              height={49}
              width={125}
              alt='Tickitz-white'
            />
          </div>
          <div className='py-12'>
            <QRCodeGeneratorComponent
              id='barcode'
              width={"186px"}
              height={"186px"}
              mode='SVG'
              type='QRCode'
              value='Tickitz'
            ></QRCodeGeneratorComponent>
          </div>
          <div className='absolute hidden lg:block h-[50px] w-[50px] rounded-full bg-background top-0 right-0 translate-x-1/2 -translate-y-1/2' />
          <div className='absolute block lg:hidden h-[50px] w-[50px] rounded-full bg-background -bottom-0 left-0 -translate-x-1/2 translate-y-1/2' />
          <div className='absolute h-[50px] w-[50px] rounded-full bg-background -bottom-0 right-0 translate-x-1/2 translate-y-1/2' />
        </div>
        <div className='lg:col-span-2'>
          <div className='bg-primary w-full rounded-t-md hidden lg:flex justify-end px-14 py-4'>
            <Image
              src={TickitzWhite}
              height={49}
              width={125}
              alt='Tickitz-white'
            />
          </div>
          <div className='flex flex-col gap-y-4 py-12 px-8 lg:px-14'>
            <div className='grid grid-cols-2 gap-x-6'>
              <div>
                <p className='text-label text-sm'>Event</p>
                <p className='text-title line-clamp-3'>
                  {event?.event.eventName}
                </p>
              </div>
              <div>
                <p className='text-label text-sm'>Venue</p>
                <p className='text-title line-clamp-3'>{event?.event.venue}</p>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-x-6'>
              <div>
                <p className='text-label text-sm'>Date</p>
                <p className='text-title'>
                  {moment(event?.event.date).format("MM, dd YYYY")}
                </p>
              </div>
              <div>
                <p className='text-label text-sm'>Time</p>
                <p className='text-title'>
                  {moment(event?.event.startTime).format("HH:MM A")}
                </p>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-x-6'>
              <div>
                <p className='text-label text-sm'>Tickets</p>
                <p className='text-title'>{event?.totalTicket} seats</p>
              </div>
              <div>
                <p className='text-label text-sm'>Price</p>
                <p className='text-title'>IDR {event?.totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket
