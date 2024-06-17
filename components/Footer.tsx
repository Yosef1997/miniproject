import { FiYoutube } from "react-icons/fi"
import { RiTwitterLine } from "react-icons/ri"
import { FaInstagram } from "react-icons/fa"
import { FiFacebook } from "react-icons/fi"
import React from "react"
import Tickitz from "@/public/footer-logo.svg"
import TickitzMobile from "@/public/footer-logo-mobile.svg"
import Image from "next/image"
import Link from "next/link"
import Harmony from "@/public/harmony.svg"
import Elevate from "@/public/elevate.svg"
import Spark from "@/public/spark.svg"

const Footer = () => {
  return (
    <div className='px-6 md:px-32'>
      <div className='md:grid md:grid-cols-4'>
        <div className='mb-5'>
          <Image
            className='md:hidden'
            src={TickitzMobile}
            alt='tickitz-mobile'
          />
          <Image className='max-md:hidden' src={Tickitz} alt='tickitz' />

          <p className='text-label text-sm mt-3 md:text-base'>
            Stop waiting in line. Buy tickets conveniently, watch events
            quietly.
          </p>
        </div>
        <div className='mb-12 md:pl-20'>
          <h2 className='font-semibold mb-3'>Explore</h2>
          <div className='flex gap-x-10 gap-y-3 flex-wrap text-label md:text-body md:flex-col'>
            <Link href={"#"}>Events</Link>
            <Link href={"#"}>Organizers</Link>
            <Link href={"#"}>Locations</Link>
            <Link href={"#"}>About</Link>
          </div>
        </div>
        <div className='mb-12'>
          <h2 className='font-semibold mb-3'>Our Sponsor</h2>
          <div className='flex flex-col gap-y-5 flex-wrap'>
            <Image src={Harmony} alt='Harmony' />
            <Image src={Elevate} alt='Elevate' />
            <Image src={Spark} alt='Spark' />
          </div>
        </div>
        <div>
          <h2 className='font-semibold mb-3'>Follow us</h2>
          <div className='flex items-start gap-x-8 text-sm text-label md:flex-col md:gap-y-6'>
            <button
              type='button'
              title='Tickitz Events id'
              className='flex items-center gap-x-4'
            >
              <FiFacebook size={24} />
              <span className='hidden md:inline'>Tickitz Event id</span>
            </button>
            <button
              type='button'
              title='tickitz.id'
              className='flex items-center gap-x-4'
            >
              <FaInstagram size={24} />
              <span className='hidden md:inline'>tickitz.id</span>
            </button>
            <button
              type='button'
              title='tickitz.id'
              className='flex items-center gap-x-4'
            >
              <RiTwitterLine size={24} />
              <span className='hidden md:inline'>tickitz.id</span>
            </button>
            <button
              type='button'
              title='Tickitz Events id'
              className='flex items-center gap-x-4'
            >
              <FiYoutube size={24} />
              <span className='hidden md:inline'>Tickitz Event id</span>
            </button>
          </div>
        </div>
      </div>
      <p className='text-center text-body text-[13px] py-14'>
        © 2020 Tickitz. All Rights Reserved.
      </p>
    </div>
  )
}

export default Footer
