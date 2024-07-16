import { BiError } from "react-icons/bi"
import React from "react"

const Error = () => {
  return (
    <div className='flex items-center gap-y-10'>
      <BiError size={50} />
      <p>Something Error</p>
    </div>
  )
}

export default Error
