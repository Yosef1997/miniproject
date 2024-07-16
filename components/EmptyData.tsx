import { MdOutlineEventBusy } from "react-icons/md"
import React from "react"

const EmptyData = () => {
  return (
    <div className='flex items-center gap-y-10'>
      <MdOutlineEventBusy size={50} />
      <p>Event Not Found</p>
    </div>
  )
}

export default EmptyData
