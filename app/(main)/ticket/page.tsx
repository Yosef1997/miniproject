"use client"
import Image from "next/image"
import React, { useContext } from "react"
import Hero from "@/public/hero.webp"
import TickitzContext from "@/context/TickitzContext"
const page = () => {
  const { event } = useContext(TickitzContext)

  return (
    <div className='bg-background px-6 lg:px-16 xl:px-32 py-12'>
      <div className='bg-white rounded-md lg:grid lg:grid-cols-3'>
        <div className=' relative flex justify-center items-center max-lg:border-b lg:border-r border-border-line border-dashed py-8'>
          <Image src={Hero} alt='barcode' className='w-[186px] h-[186px]' />
          <div className='absolute hidden lg:block h-[50px] w-[50px] rounded-full bg-background top-0 right-0 translate-x-1/2 -translate-y-1/2' />
          <div className='absolute block lg:hidden h-[50px] w-[50px] rounded-full bg-background -bottom-0 left-0 -translate-x-1/2 translate-y-1/2' />
          <div className='absolute h-[50px] w-[50px] rounded-full bg-background -bottom-0 right-0 translate-x-1/2 translate-y-1/2' />
        </div>
        <div className='px-6 py-14 flex flex-col gap-y-4'>
          <div className='grid grid-cols-2 gap-x-6'>
            <div>
              <p className='text-label text-sm'>Event</p>
              <p className='text-title'>{event?.title}</p>
            </div>
            <div>
              <p className='text-label text-sm'>Category</p>
              <p className='text-title'>{event?.category}</p>
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
              <p className='text-label text-sm'>Total</p>
              <p className='text-title'>IDR {event?.price}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
