"use client"
import Error from "@/components/Error"
import Loading from "@/components/Loading"
import { EVENT_ORDER_KEY } from "@/constant/constant"
import useDetailEvent from "@/hooks/useDetailEvent"
import moment from "moment"
import Image from "next/image"
import Link from "next/link"
import React from "react"

const DetailEvent: React.FC<{ eventId: number }> = ({ eventId }) => {
  const { response, loading, error } = useDetailEvent(eventId)

  if (error) {
    return <Error />
  }

  return (
    <>
      {loading && <Loading />}
      <div className='border-b border-border-line lg:grid lg:grid-cols-3 lg:px-16 xl:px-32 lg:py-12'>
        <div className='flex justify-center'>
          <div className='border border-border-line p-8 rounded-md w-fit'>
            {response && (
              <Image
                src={response?.data.eventImage}
                alt={response?.data.eventName}
                width={160}
                height={245}
                priority
                className='w-[160px] h-[245px] object-cover rounded-md'
              />
            )}
          </div>
        </div>
        <div className='px-6 py-8 lg:col-span-2'>
          <div className='flex flex-col lg:flex-row lg:justify-between items-center'>
            <div className='text-center lg:text-start'>
              <h2 className='text-title font-semibold text-xl text-center'>
                {response?.data.eventName}
              </h2>
              <p className='text-body'>{response?.data.category}</p>
            </div>
            <Link
              href={`/order`}
              className='bg-primary rounded-md text-center mt-3 lg:mt-0 text-white-btn p-3 font-semibold w-full lg:w-fit'
              onClick={() => {
                sessionStorage.setItem(
                  EVENT_ORDER_KEY,
                  JSON.stringify(response?.data)
                )
              }}
            >
              Book now
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-x-6 mb-4 mt-8'>
            <div>
              <p className='text-label text-sm'>Date</p>
              <p className='text-title'>
                {moment(response?.data.date).format("MMM, DD YYYY")}
              </p>
            </div>
            <div>
              <p className='text-label text-sm'>Location</p>
              <p className='text-title'>{response?.data.location}</p>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-x-6'>
            <div>
              <p className='text-label text-sm'>Start time</p>
              <p className='text-title'>
                {moment(response?.data.startTime).format("hh:mm A")}
              </p>
            </div>
            <div>
              <p className='text-label text-sm'>Price</p>
              {response?.data.tickets.length === 0 ? (
                <p className='text-body text-xs md:text-sm font-semibold'>
                  Free
                </p>
              ) : (
                <p className='text-title'>
                  Start from IDR {response?.data.tickets[0].price} -
                  {
                    response?.data.tickets[response?.data.tickets.length - 1]
                      .price
                  }
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className='px-6 lg:px-16 xl:px-32 py-8'>
        <h2 className='text-title font-semibold'>Description</h2>
        <p className='text-body text-xs lg:text-base mt-4'>
          {response?.data.description}
        </p>
      </div>
    </>
  )
}

export default DetailEvent
