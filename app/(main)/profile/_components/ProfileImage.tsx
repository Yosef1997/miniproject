import Image from "next/image"
import { BiDotsHorizontalRounded } from "@react-icons/all-files/bi/BiDotsHorizontalRounded"
import { MdAccountCircle } from "@react-icons/all-files/md/MdAccountCircle"
import { BiCopy } from "@react-icons/all-files/bi/BiCopy"
import LoyaltyCard from "@/public/loyalty-card.svg"
import { toast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { User } from "@/types/users"
import { PROFILE_STORAGE } from "@/constant/constant"
import useSignout from "@/hooks/useSignout"

const ProfileImage = () => {
  const [data, setData] = useState<User>()
  const { handleSignOut } = useSignout()
  useEffect(() => {
    const storage = localStorage.getItem(PROFILE_STORAGE)
    if (storage !== null) {
      const parsedData = JSON.parse(storage)
      setData(parsedData)
    }
  }, [])

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
        <p className='text-xl text-title font-semibold text-center'>
          {data?.username ?? "Full Name"}
        </p>
        <div className='flex justify-between items-center w-full xl:w-3/4 bg-success text-white text-sm font-bold p-2 rounded-md mt-3 mx-auto'>
          <p>Referral: {data?.referralCode}</p>
          <BiCopy
            size={25}
            onClick={() => {
              navigator.clipboard.writeText(data?.referralCode ?? "")
              toast({
                variant: "success",
                title: "Copy Referral Success",
                description: `Referral code: ${data?.referralCode ?? ""}`,
              })
              console.log("copy")
            }}
          />
        </div>
      </div>
      <div className='bg-white rounded-b-md  p-10'>
        <h2 className='text-body font-semibold'>Reward Points</h2>
        <div className='flex justify-center mt-6 mb-8'>
          <div className='relative'>
            <Image src={LoyaltyCard} alt='Loyalty-card' />
            <h2 className='absolute top-4 left-4 font-bold text-lg text-white'>
              Customer
            </h2>
            <p className='absolute bottom-4 left-4 font-semibold text-2xl text-white'>
              {data?.point}
              <span className='text-[10px] text-white'> points</span>
            </p>
          </div>
        </div>
        <button
          className='bg-error text-white text-sm font-bold w-full py-2 rounded-md mb-4'
          type='submit'
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  )
}

export default ProfileImage
