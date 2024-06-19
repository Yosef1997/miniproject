import Image from "next/image"
import React from "react"
import EventImg from "@/public/hero.webp"

const EventCard = () => {
  return (
    <div>
      <div>
        <div className='relative'>
          <Image src={EventImg} width={400} height={240} alt='event' />
        </div>
      </div>
    </div>
  )
}

export default EventCard
