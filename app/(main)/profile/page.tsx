"use client"
import React, { useState } from "react"
import DetailAccount from "./_components/DetailAccount"
import OrderHistory from "./_components/OrderHistory"

const page = () => {
  const [tab, setTab] = useState<number>(1)
  return (
    <div className='bg-background'>
      <div className='bg-white w-full flex justify-evenly text-sm'>
        <button
          type='button'
          title='Details Acoount'
          className={`py-4 ${
            tab === 1
              ? "border-b border-primary text-title"
              : "text-placeholder"
          } `}
          onClick={() => setTab(1)}
        >
          Details Account
        </button>
        <button
          type='button'
          title='Order History'
          className={`py-4 ${
            tab === 2
              ? "border-b border-primary text-title"
              : "text-placeholder"
          } `}
          onClick={() => setTab(2)}
        >
          Order History
        </button>
      </div>

      {tab === 1 ? <DetailAccount /> : <OrderHistory />}
    </div>
  )
}

export default page
