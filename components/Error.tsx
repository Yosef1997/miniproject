import { BiError } from "react-icons/bi"
import React from "react"

const Error = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-y-4 min-h-96'>
      <BiError size={150} />
      <p>Something Error</p>
    </div>
  )
}

export default Error
