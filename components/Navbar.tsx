"use client"
import React, { useState } from "react"
import { CgMenuRightAlt } from "@react-icons/all-files/cg/CgMenuRightAlt"
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch"
import Link from "next/link"
import Tickitz from "@/public/navbar-logo.svg"
import TickitzMobile from "@/public/navbar-logo-mobile.svg"
import Image from "next/image"
import { useDebouncedCallback } from "use-debounce"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

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

const navOrg = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "Profile",
    path: "/profile",
  },
]

const Navbar = () => {
  const [showBurger, setShowBurger] = useState<boolean>(false)
  const router = useRouter()
  const session = useSession()

  return (
    <div className='sticky top-0 z-50 bg-white'>
      <div className='hidden items-center justify-between px-16 py-7 w-full xl:px-32 lg:flex'>
        <div className='flex gap-x-14 items-center'>
          <Image
            onClick={() => router.push("/")}
            className=''
            src={Tickitz}
            alt='tickitz'
          />
          {session.data?.user.role === "ORGANIZER"
            ? navOrg.map((e, i) => {
                return (
                  <Link
                    className='font-semibold text-title'
                    key={i}
                    href={e.path}
                  >
                    {e.name}
                  </Link>
                )
              })
            : nav.map((e, i) => {
                return (
                  <Link
                    className='font-semibold text-title'
                    key={i}
                    href={e.path}
                  >
                    {e.name}
                  </Link>
                )
              })}
        </div>
        <div className='flex items-center gap-x-12'>
          <div>
            <AiOutlineSearch size={25} onClick={() => router.push("/events")} />
          </div>
          {session.status === "unauthenticated" ? (
            <button
              type='button'
              className='bg-primary px-7 py-3.5 rounded-md text-white-btn font-bold'
              onClick={() => router.push("/sign-up")}
            >
              Sign Up
            </button>
          ) : (
            <button
              onClick={() => router.push("/profile")}
              className='bg-background-v2 h-fit rounded-full'
            >
              <Avatar>
                <AvatarImage src={session.data?.user.avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </button>
          )}
        </div>
      </div>

      <div className='flex lg:hidden items-center justify-between px-6 py-7 w-full'>
        <Image
          onClick={() => {
            router.push("/")
            setShowBurger(false)
          }}
          src={TickitzMobile}
          alt='tickitz-mobile'
        />
        <CgMenuRightAlt onClick={() => setShowBurger(!showBurger)} size={25} />
      </div>
      {showBurger ? (
        <div className='flex flex-col absolute left-0 right-0 bg-black bg-opacity-30 min-h-screen'>
          <div className='bg-white'>
            <div
              onClick={() => {
                router.push("/events")
                setShowBurger(false)
              }}
              className='pt-4 pb-10 px-6 border-b border-border-line'
            >
              <div className='flex gap-x-5 items-center px-4 py-3.5 border border-border-line rounded-md'>
                <AiOutlineSearch size={25} />
                <p>Search</p>
              </div>
            </div>
            {session.data?.user.role === "ORGANIZER"
              ? navOrg.map((e, i) => {
                  return (
                    <div key={i}>
                      <Link
                        className='flex text-title justify-center items-center py-4 border-b border-border-line'
                        href={e.path}
                        onClick={() => setShowBurger(false)}
                      >
                        {e.name}
                      </Link>
                    </div>
                  )
                })
              : nav.map((e, i) => {
                  return (
                    <div key={i}>
                      <Link
                        className='flex text-title justify-center items-center py-4 border-b border-border-line'
                        href={e.path}
                        onClick={() => setShowBurger(false)}
                      >
                        {e.name}
                      </Link>
                    </div>
                  )
                })}
            {session.status === "unauthenticated" && (
              <Link
                className='flex text-title justify-center items-center py-4 border-b border-border-line'
                href={"/sign-up"}
                onClick={() => setShowBurger(false)}
              >
                Sign Up
              </Link>
            )}

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
