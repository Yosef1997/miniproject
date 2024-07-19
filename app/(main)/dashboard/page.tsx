"use client"
import { useSession } from "next-auth/react"
import EventForm from "./_components/EventForm"
import ListEvents from "./_components/ListEvents"
import useProfile from "@/hooks/useProfile"
import DashboardChart from "./_components/DashboardChart"

const Dashboard = () => {
  const session = useSession()
  const { response } = useProfile(session.data?.user.email)

  const data = [
    {
      organizerId: 2454,
      totalSales: 5000,
      date: "2024-07-18T11:00:00",
    },
    {
      organizerId: 2454,
      totalSales: 8000,
      date: "2024-07-18T12:00:00",
    },
    {
      organizerId: 2454,
      totalSales: 550,
      date: "2024-07-18T13:00:00",
    },
    {
      organizerId: 2454,
      totalSales: 550,
      date: "2024-07-18T14:00:00",
    },
  ]
  return (
    <div className='bg-background px-6 lg:px-[70px] pt-14 pb-24'>
      <DashboardChart data={data} />
      <EventForm isDetailEvent={false} />
      <div className='mt-6'>
        <ListEvents userId={response?.id ?? 2454} />
      </div>
    </div>
  )
}

export default Dashboard
