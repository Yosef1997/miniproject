"use client"
import React, { useState } from "react"
import EventList from "@/utils/MOCK_DATA"
import EventCard from "@/components/EventCard"

const ListEvents = () => {
  const [tab, setTab] = useState<number>(1)

  return (
    <div>
      <h2 className='text-title text-2xl font-bold mb-6'>List Events</h2>
      <div>
        <div className='bg-white w-full flex justify-evenly lg:justify-start lg:gap-x-24 lg:px-10 rounded-t-md'>
          <button
            type='button'
            title='Active events'
            className={`py-4 ${
              tab === 1
                ? "border-b border-primary text-title"
                : "text-placeholder"
            } `}
            onClick={() => setTab(1)}
          >
            Active events
          </button>
          <button
            type='button'
            title='Finish events'
            className={`py-4 ${
              tab === 2
                ? "border-b border-primary text-title"
                : "text-placeholder"
            } `}
            onClick={() => setTab(2)}
          >
            Finish events
          </button>
        </div>
        <div className='bg-background-v2 px-1 sm:px-6 py-6 lg:py-12 flex flex-col items-center gap-y-8 lg:gap-y-12 rounded-b-md'>
          <div className='flex flex-wrap justify-around gap-y-6'>
            {EventList.slice(0, 6).map((e, i) => {
              return <EventCard key={i} {...e} urlLink='dashboard' />
            })}
          </div>
          <button
            type='button'
            title='View More'
            className='bg-white-btn text-primary font-semibold border-2 border-primary p-2 rounded-md'
          >
            View More
          </button>
        </div>
      </div>
    </div>
  )
}

export default ListEvents
