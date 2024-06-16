"use client"
import React, { useState } from "react"
import { BiChevronRight } from "react-icons/bi"
import { CgMenuRightAlt } from "react-icons/cg"
import { AiOutlineSearch } from "react-icons/ai"
import Link from "next/link"
import Tickitz from "@/public/navbar-logo.svg"
import TickitzMobile from "@/public/navbar-logo-mobile.svg"
import Image from "next/image"
import { useDebouncedCallback } from "use-debounce"

const nav = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Events",
    path: "/events",
  },
  {
    name: "About",
    path: "/about",
  },
]

const Navbar = () => {
  const [showBurger, setShowBurger] = useState<boolean>(false)
  const [isSearch, setSearch] = useState(false)

  const debounced = useDebouncedCallback(
    (value) => {
      // logic for search or hit api search
    },
    // delay in ms (1s)
    1000
  )

  return (
    <div className='sticky top-0 z-50'>
      <div className='hidden items-center justify-between px-32 py-7 w-full md:flex'>
        <div className='flex gap-x-14 items-center'>
          <Image className='' src={Tickitz} alt='tickitz' />
          {nav.map((e, i) => {
            return (
              <Link className='font-semibold' key={i} href={e.path}>
                {e.name}
              </Link>
            )
          })}
        </div>
        <div className='flex items-center px-4 py-3.5 border border-black rounded-md'>
          <AiOutlineSearch size={25} />
          <input
            onChange={(e) => debounced(e.target.value)}
            onBlur={() => setSearch(false)}
            className='px-4 py-[6px] text-sm rounded-xl w-full focus:outline-none'
            type='text'
            placeholder='Search...'
          />
        </div>
        <button
          type='button'
          className='bg-primary px-7 py-3.5 rounded-md text-white-btn'
        >
          Login
        </button>
      </div>

      <div className='flex items-center justify-between px-6 py-7 w-full'>
        <Image className='md:hidden' src={TickitzMobile} alt='tickitz-mobile' />
        <CgMenuRightAlt
          onClick={() => setShowBurger(!showBurger)}
          size={25}
          className='block md:hidden'
        />
      </div>
      {showBurger ? (
        <div className='flex flex-col'>
          <div className='pt-4 pb-10 px-6 border-b border-black'>
            <div className='flex items-center px-4 py-3.5 border border-black rounded-md'>
              <AiOutlineSearch size={25} />
              <input
                onChange={(e) => debounced(e.target.value)}
                onBlur={() => setSearch(false)}
                className='px-4 py-[6px] text-sm rounded-xl w-full focus:outline-none'
                type='text'
                placeholder='Search...'
              />
            </div>
          </div>
          {nav.map((e, i) => {
            return (
              <div key={i}>
                <Link
                  className='flex justify-center items-center py-4 border-b border-black'
                  href={e.path}
                >
                  {e.name}
                </Link>
              </div>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default Navbar
