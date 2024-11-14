"use client"
import React, { useEffect, useState } from "react"
import EventList from "@/utils/MOCK_DATA"
import EventCard from "@/components/EventCard"
import useEvents from "@/hooks/useEvent"
import { useDebouncedCallback } from "use-debounce"
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch"
import Loading from "@/components/Loading"
import useCategory from "@/hooks/useCategory"
import { cities } from "@/utils/CityDummy"
import { PROFILE_STORAGE } from "@/constant/constant"

const ListEvents: React.FC<{ userId: number }> = ({ userId }) => {
  const [search, setSearch] = useState<string>("")
  const [category, setCategory] = useState<string>("")
  const [location, setLocation] = useState<string>("")
  const { response } = useCategory()

  const initialParams = {
    page: 0,
    size: 6,
    userId: userId,
  }

  const { data, loading, error, refetch } = useEvents(initialParams)

  const debounced = useDebouncedCallback((value) => {
    setSearch(value)
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
      <h2 className='text-title text-2xl font-bold mb-6'>List Events</h2>
      <div>
        <div className='bg-white lg:justify-start lg:gap-x-24 lg:px-10 rounded-t-md'>
          <div className='p-6'>
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
            <div className='flex flex-col md:flex-row gap-3'>
              <div className='bg-background-v2 p-3 rounded-md w-full md:w-fit'>
                <select
                  name='Category'
                  id='category'
                  className='bg-background-v2'
                  onChange={handleCategoryChange}
                >
                  <option value=''>Category</option>
                  {response?.map((e, i) => {
                    return (
                      <option key={i} value={e.categoryName}>
                        {e.categoryName}
                      </option>
                    )
                  })}
                </select>
              </div>
              <div className='bg-background-v2 p-3 rounded-md w-full md:w-fit'>
                <select
                  name='Location'
                  id='location'
                  className='bg-background-v2 w-full'
                  onChange={handleLocationChange}
                >
                  <option value=''>Location</option>
                  {cities.map((e, i) => {
                    return (
                      <option key={i} value={e.city_name}>
                        {e.city_name}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-background-v2 px-1 sm:px-6 py-6 lg:py-12 flex flex-col items-center gap-y-8 lg:gap-y-12 rounded-b-md'>
          {loading && <Loading />}
          {error && <div>{error.message}</div>}
          <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
            {data && data.data.content.length === 0 ? (
              <p>Event is empty</p>
            ) : (
              data?.data.content.map((e, i) => {
                return <EventCard key={i} event={e} urlLink='dashboard' />
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

export default ListEvents
