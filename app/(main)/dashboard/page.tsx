import React from "react"
import EventForm from "./_components/EventForm"
import ListEvents from "./_components/ListEvents"

const Dashboard = () => {
  return (
    <div className='bg-background px-6 lg:px-[70px] pt-14 pb-24'>
      <EventForm isDetailEvent={false} />
      <div className='mt-6'>
        <ListEvents />
      </div>
    </div>
  )
}

export default Dashboard
