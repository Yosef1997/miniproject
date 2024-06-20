"use client"
import React, { useState } from "react"
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
]

const Navbar = () => {
  const [showBurger, setShowBurger] = useState<boolean>(false)
  const [isSearch, setSearch] = useState(false)

  const debounced = useDebouncedCallback(
    (value) => {
      // logic for search or hit api search
      setSearch(false)
    },
    // delay in ms (1s)
    1000
  )

  return (
    <div className='sticky top-0 z-50 bg-white'>
      <div className='hidden items-center justify-between px-16 py-7 w-full xl:px-32 lg:flex'>
        <div className='flex gap-x-14 items-center'>
          <Image className='' src={Tickitz} alt='tickitz' />
          {nav.map((e, i) => {
            return (
              <Link className='font-semibold text-title' key={i} href={e.path}>
                {e.name}
              </Link>
            )
          })}
        </div>
        <div className='flex gap-x-12'>
          <div
            className={`flex items-center px-4 py-3 ${
              isSearch ? "border" : ""
            } border-black rounded-md`}
          >
            <AiOutlineSearch size={25} onClick={() => setSearch(!isSearch)} />
            {isSearch ? (
              <input
                onChange={(e) => debounced(e.target.value)}
                onBlur={() => setSearch(false)}
                className='px-4 text-sm rounded-xl w-full focus:outline-none'
                type='text'
                placeholder='Search...'
              />
            ) : null}
          </div>
          <button
            type='button'
            className='bg-primary px-7 py-3.5 rounded-md text-white-btn font-bold'
          >
            <Link href={"/signup"}> Sign Up</Link>
          </button>
        </div>
      </div>

      <div className='flex lg:hidden items-center justify-between px-6 py-7 w-full'>
        <Image src={TickitzMobile} alt='tickitz-mobile' />
        <CgMenuRightAlt onClick={() => setShowBurger(!showBurger)} size={25} />
      </div>
      {showBurger ? (
        <div className='flex flex-col absolute left-0 right-0 bg-black bg-opacity-30 min-h-screen'>
          <div className='bg-white'>
            <div className='pt-4 pb-10 px-6 border-b border-border-line'>
              <div className='flex items-center px-4 py-3.5 border border-border-line rounded-md'>
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
                    className='flex text-title justify-center items-center py-4 border-b border-border-line'
                    href={e.path}
                  >
                    {e.name}
                  </Link>
                </div>
              )
            })}
            <Link
              className='flex text-title justify-center items-center py-4 border-b border-border-line'
              href={"/signup"}
            >
              Sign Up
            </Link>
            <p className='text-center text-label text-[13px] pt-14 pb-8 '>
              © 2020 Tickitz. All Rights Reserved.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Navbar
