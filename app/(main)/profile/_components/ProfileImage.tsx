import Image from "next/image"
import React from "react"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { MdAccountCircle } from "react-icons/md"
import LoyaltyCard from "@/public/loyalty-card.svg"

const ProfileImage: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div>
      <div className='bg-white rounded-t-md border-b border-border-line p-10'>
        <div className='flex justify-between items-center'>
          <h2 className='text-body'>INFO</h2>
          <button type='button' title='Update Profile Image'>
            <BiDotsHorizontalRounded size={28} />
          </button>
        </div>
        <div className='flex flex-col items-center my-8'>
          <MdAccountCircle size={136} />
        </div>
        <p className='text-xl text-title font-semibold text-center'>{name}</p>
      </div>
      <div className='bg-white rounded-b-md  p-10'>
        <h2 className='text-body font-semibold'>Loyalty Points</h2>
        <div className='flex justify-center mt-6 mb-8'>
          <div className='relative'>
            <Image src={LoyaltyCard} alt='Loyalty-card' />
            <h2 className='absolute top-4 left-4 font-bold text-lg text-white'>
              Customer
            </h2>
            <p className='absolute bottom-4 left-4 font-semibold text-2xl text-white'>
              {320} <span className='text-[10px] text-white'>points</span>
            </p>
          </div>
        </div>
        <p className='text-body text-sm text-center'>
          {180} points become a master
        </p>
        <div className='bg-background-v2 h-4 rounded-lg w-full relative mt-2 mb-10'>
          <div
            style={{ width: `${Math.ceil(320 / 6)}%` }}
            className='bg-primary h-full rounded-lg'
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileImage
