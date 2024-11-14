import { AiOutlineLoading3Quarters } from "react-icons/ai"
import React from "react"

const Loading = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-y-4 min-h-96'>
      <AiOutlineLoading3Quarters size={100} />
      <p>Loading...</p>
    </div>
  )
}

export default Loading
