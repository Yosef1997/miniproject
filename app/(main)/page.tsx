"use client"
import Image from "next/image"
import Hero from "@/public/hero.webp"
import Link from "next/link"
import EventCard from "@/components/EventCard"
import useHome from "@/hooks/useHome"
import SubscribeForm from "@/components/SubscribeForm"
import Loading from "@/components/Loading"
import Error from "@/components/Error"

export default function Home() {
  const { response, loading, error } = useHome()

  if (error) {
    return <Error />
  }

  return (
    <div className='bg-background'>
      <div className='relative'>
        <Image
          src={Hero}
          alt='hero'
          className='w-full lg:h-[80vh] object-cover'
        />
        <div className='absolute flex flex-col justify-between inset-0 bg-primary bg-opacity-40 p-6 lg:p-20'>
          <h2 className='text-white md:text-7xl font-bold'>
            DISCOVER <br /> POPULAR <br /> EVENTS TODAY
          </h2>
          <button
            type='button'
            title='Explore Events'
            className='bg-primary text-white-btn font-semibold p-2 lg:py-3 lg:px-8 rounded-md w-fit'
          >
            Explore Events
          </button>
        </div>
      </div>
      <div className='pt-12 pb-14'>
        <div className='flex items-center justify-between px-2 sm:px-6 pb-8'>
          <h2 className='text-lg font-bold text-primary'>Popular Events</h2>
          <Link
            href={"/view-all/popular"}
            className='font-semibold text-primary'
          >
            View All
          </Link>
        </div>
        <div className='flex flex-wrap justify-around gap-y-6 px-1 sm:px-6'>
          {loading && <Loading />}
          {response?.data.popular.map((e, i) => {
            return <EventCard key={i} urlLink='events' event={e} />
          })}
        </div>
      </div>
      <div className='pt-12 pb-14 bg-background-v2'>
        <div className='flex items-center justify-between px-2 sm:px-6 pb-8'>
          <h2 className='text-lg font-bold text-primary'>Upcoming Events</h2>
          <Link
            href={"/view-all/upcoming"}
            className='font-semibold text-primary'
          >
            View All
          </Link>
        </div>
        <div className='flex flex-wrap justify-around gap-y-6 px-1 sm:px-6'>
          {loading && <Loading />}
          {response?.data.upcoming.map((e, i) => {
            return <EventCard key={i} event={e} urlLink='events' />
          })}
        </div>
      </div>
      <SubscribeForm />
    </div>
  )
}
