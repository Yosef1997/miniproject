"use client"
import { useSession } from "next-auth/react"
import EventForm from "./_components/EventForm"
import ListEvents from "./_components/ListEvents"
import useProfile from "@/hooks/useProfile"

const Dashboard = () => {
  const session = useSession()
  useProfile(session.data?.user.email)
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
