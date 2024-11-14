import { MdOutlineEventBusy } from "react-icons/md"
import React from "react"

const EmptyData = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-y-10 min-h-96'>
      <MdOutlineEventBusy size={50} />
      <p>Event Not Found</p>
    </div>
  )
}

export default EmptyData
