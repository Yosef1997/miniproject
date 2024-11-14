"use client"

import Image from "next/image"
import React, { useState } from "react"
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch"
import { useDebouncedCallback } from "use-debounce"
import EventCard from "@/components/EventCard"
import useEvents from "@/hooks/useEvent"
import Loading from "@/components/Loading"

const Event = () => {
  const [search, setSearch] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [location, setLocation] = useState<string>("")

  const initialParams = {
    page: 0,
    size: 12,
  }

  const { data, loading, error, refetch } = useEvents(initialParams)

  const debounced = useDebouncedCallback((value) => {
    setSearch(value)
    console.log(value)
    refetch({ eventName: value || undefined, page: 0 })
  }, 1000)

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setCategory(value)
    refetch({ category: value || undefined, page: 0 })
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setLocation(value)
    refetch({ location: value || undefined, page: 0 })
  }

  const handleViewMore = () => {
    if (data) {
      refetch({ page: (data.data.pageable.pageNumber || 0) + 1 }, true)
    }
  }

  return (
    <div>
      <div className='relative'>
        <Image
          src='/hero.webp'
          alt='hero'
          width={1440}
          height={400}
          className='w-full h-[20vh] lg:h-[50vh] object-cover'
        />
        <div className='absolute flex flex-col justify-center inset-0 bg-primary bg-opacity-40 p-6 lg:p-20'>
          <h2 className='text-white md:text-4xl lg:text-7xl font-bold'>
            EXPLORE INTEREST EVENTS
          </h2>
        </div>
      </div>
      <div className='pt-8 pb-12'>
        <div className='p-6'>
          <h2 className='font-bold text-title text-xl lg:text-5xl'>Filters</h2>
          <div className='py-2 lg:py-4'>
            <div className='flex items-center p-1 lg:p-3 border border-border-line rounded-md lg:w-1/2'>
              <input
                onChange={(e) => debounced(e.target.value)}
                className='px-4 py-[6px] text-sm rounded-xl w-full focus:outline-none'
                type='text'
                placeholder='Search...'
              />
              <AiOutlineSearch size={25} />
            </div>
          </div>
          <div className='flex gap-x-3'>
            <div className='bg-background-v2 p-3 rounded-md w-fit'>
              <select
                name='Category'
                id='category'
                className='bg-background-v2'
                onChange={handleCategoryChange}
              >
                <option value=''>Category</option>
                <option value='saab'>Saab</option>
                <option value='mercedes'>Mercedes</option>
                <option value='audi'>Audi</option>
                <option value='saab'>Saab</option>
              </select>
            </div>
            <div className='bg-background-v2 p-3 rounded-md w-fit'>
              <select
                name='Location'
                id='location'
                className='bg-background-v2'
                onChange={handleLocationChange}
              >
                <option value=''>Location</option>
                <option value='saab'>Saab</option>
                <option value='mercedes'>Mercedes</option>
                <option value='audi'>Audi</option>
              </select>
            </div>
          </div>
        </div>

        <div className='bg-background px-1 sm:px-6 py-6 lg:py-12 flex flex-col items-center gap-y-8 lg:gap-y-12'>
          {loading && <Loading />}
          {error && <div>{error.message}</div>}
          <div className='flex flex-wrap justify-around gap-y-6'>
            {data && data.data.content.length === 0 ? (
              <p>Event not found</p>
            ) : (
              data?.data.content.map((e, i) => {
                return <EventCard key={i} event={e} urlLink='events' />
              })
            )}
          </div>
          {data && data.data.last === false && (
            <button
              type='button'
              title='View More'
              className='bg-white-btn text-primary font-semibold border-2 border-primary p-2 rounded-md'
              onClick={handleViewMore}
            >
              View More
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Event
