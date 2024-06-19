import Image from "next/image"
import EventCard from "./_components/EventCard"
import Hero from "@/public/hero.webp"

export default function Home() {
  return (
    <main className='flex min-h-screen'>
      <div>
        <div className='px-[104px] w-fit'>
          <Image className='rounded-2xl' src={Hero} alt='hero' />
        </div>
        <EventCard />
      </div>
    </main>
  )
}
