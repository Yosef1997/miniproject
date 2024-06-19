"use client"
import React, { useState } from "react"
import DetailAccount from "./_components/DetailAccount"
import OrderHistory from "./_components/OrderHistory"
import ProfileImage from "./_components/ProfileImage"

const page = () => {
  const [tab, setTab] = useState<number>(1)
  return (
    <div className='bg-background'>
      <div className='bg-white w-full flex justify-evenly text-sm lg:hidden'>
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

      <div className='px-6 pt-8 pb-[72px] lg:px-[70px] lg:pt-14 lg:pb-24 lg:grid lg:grid-cols-3 lg:gap-x-8'>
        <div className='hidden lg:block'>
          <ProfileImage name='Jhonny Doer' />
        </div>
        <div className='lg:col-span-2'>
          <div className='bg-white w-full hidden justify-evenly text-sm rounded-md lg:flex'>
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
          {tab === 1 ? (
            <>
              <div className='lg:hidden'>
                <ProfileImage name='Jhonny Doer' />
              </div>
              <div className='mt-12'>
                <DetailAccount />
              </div>
            </>
          ) : (
            <OrderHistory />
          )}
        </div>
      </div>
    </div>
  )
}

export default page
