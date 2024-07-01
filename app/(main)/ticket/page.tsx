"use client"
import Image from "next/image"
import React, { useContext } from "react"
import Hero from "@/public/hero.webp"
import TickitzContext from "@/context/TickitzContext"
import TickitzWhite from "@/public/tickitz-white.svg"

const Ticket = () => {
  const { event } = useContext(TickitzContext)

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
            <Image src={Hero} alt='barcode' className='w-[186px] h-[186px]' />
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
                <p className='text-title line-clamp-3'>{event?.title}</p>
              </div>
              <div>
                <p className='text-label text-sm'>Venue</p>
                <p className='text-title line-clamp-3'>{event?.vanue}</p>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-x-6'>
              <div>
                <p className='text-label text-sm'>Date</p>
                <p className='text-title'>{event?.date}</p>
              </div>
              <div>
                <p className='text-label text-sm'>Time</p>
                <p className='text-title'>{event?.time}</p>
              </div>
            </div>
            <div className='grid grid-cols-2 gap-x-6'>
              <div>
                <p className='text-label text-sm'>Count</p>
                <p className='text-title'>3 pcs</p>
              </div>
              <div>
                <p className='text-label text-sm'>Price</p>
                <p className='text-title'>IDR {event?.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ticket
