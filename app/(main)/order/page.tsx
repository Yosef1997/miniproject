"use client"
import React, { useCallback, useEffect, useState } from "react"
import * as yup from "yup"
import { Field, Form, Formik, FormikProps } from "formik"
import Link from "next/link"
import moment from "moment"
import { Events } from "@/types/event"
import { EVENT_ORDER_KEY, ORDER_TICKETS } from "@/constant/constant"
import TicketCard from "./_components/TicketCard"
import { useSession } from "next-auth/react"
import useProfile from "@/hooks/useProfile"
import { Button } from "@/components/ui/button"

const personalInfoSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  email: yup
    .string()
    .email("Invalid email address format")
    .required("Email is required"),
  phone: yup
    .string()
    .min(11, "Phone number must be 11 numbers at minimum")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Invalid phone number"
    )
    .required("Phone number is required"),
})

interface personalInfoValues {
  fullName: string | ""
  email: string | ""
  phone: string | ""
}

const Order = () => {
  const [ticketsPrice, setticketsPrice] = useState<number>(0)
  const [ticketsQty, setticketsQty] = useState<number>(0)
  let [usePoint, setUsePoint] = useState<number>(0)
  let [isTicketConfirm, setIsTicketConfirm] = useState<boolean>(false)
  const [event, setEvent] = useState<Events | null>()
  const session = useSession()

  const { response } = useProfile(session.data?.user.email)

  const initialValues: personalInfoValues = {
    fullName: session?.data?.user.username ?? "",
    email: session?.data?.user.email ?? "",
    phone: session?.data?.user.phone ?? "",
  }

  useEffect(() => {
    const storedData = sessionStorage.getItem(EVENT_ORDER_KEY)
    if (storedData !== null) {
      const data = JSON.parse(storedData)
      setEvent(data)
    }
    if (event?.tickets.length === 0) {
      setIsTicketConfirm(true)
    }
  }, [])

  useCallback(() => {
    const ticketOrder = sessionStorage.getItem(ORDER_TICKETS)
    if (ticketOrder !== null) {
      const data = JSON.parse(ticketOrder)
      console.log(ORDER_TICKETS, data)
    }
  }, [isTicketConfirm])

  return (
    <div className='bg-background py-8 lg:py-14 px-6 md:px-16 xl:px-32 lg:grid lg:grid-cols-3 lg:gap-x-6'>
      <div className='lg:col-span-2'>
        <h2 className='text-title font-semibold mb-6'>Choose Ticket</h2>
        <div className='bg-white px-3 lg:p-6 mb-12 rounded-md'>
          <TicketCard params={event?.tickets ?? []} />
          <button
            className='bg-primary text-white text-sm font-bold w-full py-2 lg:py-4 rounded-md my-4'
            type='button'
            disabled={isTicketConfirm}
            onClick={() => setIsTicketConfirm(!isTicketConfirm)}
          >
            Confirm
          </button>
        </div>

        <h2 className='text-title font-semibold mb-6'>Payment Info</h2>
        <div className='bg-white px-3 lg:p-6 rounded-md'>
          <div className='flex justify-between items-center py-3 border-b border-border-line'>
            <p className='text-label text-sm'>Date & time</p>
            <p className='text-title'>
              {moment(event?.date).format("MMMM, DD - hh:mm A")}
            </p>
          </div>
          <div className='flex justify-between items-center py-3 border-b border-border-line'>
            <p className='text-label text-sm'>Event title</p>
            <p className='text-title line-clamp-2 w-1/2 text-end'>
              {event?.eventName}
            </p>
          </div>
          <div className='flex justify-between items-center py-3 border-b border-border-line'>
            <p className='text-label text-sm'>Location</p>
            <p className='text-title'>{event?.location}</p>
          </div>
          <div className='flex justify-between items-center py-3 border-b border-border-line'>
            <p className='text-label text-sm'>Venue</p>
            <p className='text-title w-1/2 text-end'>{event?.venue}</p>
          </div>
          <div className='flex justify-between items-center py-3 border-b border-border-line'>
            <div className='flex flex-col items-start'>
              <p className='text-label text-sm'>Use points</p>
              <p className='text-label text-sm'>{response?.point}</p>
            </div>
            <input
              onChange={(e) => {
                setUsePoint(e.target.checked ? response?.point ?? 0 : 0)
              }}
              type='checkbox'
            />
          </div>

          {event?.promotions && (
            <div className='flex flex-col md:flex-row justify-between md:items-center py-3 border-b border-border-line gap-y-3 md:gap-y-0'>
              <p className='text-label text-sm'>Use voucher</p>
              <div className='bg-background-v2 p-3 rounded-md w-full md:w-fit'>
                <select
                  name='use voucher'
                  id='voucher'
                  className='bg-background-v2 w-full'
                >
                  <option value=''>Select voucher</option>
                  {event?.promotions?.map((e, i) => {
                    return (
                      <option
                        key={i}
                        value={e.discount / 100}
                      >{`${e.type}:\n${e.name} - ${e.discount}%`}</option>
                    )
                  })}
                </select>
              </div>
            </div>
          )}

          <div className='flex flex-col md:flex-row justify-between md:items-center py-3 border-b border-border-line gap-y-3 md:gap-y-0'>
            <p className='text-label text-sm'>Payment method</p>
            <div className='bg-background-v2 p-3 rounded-md w-full md:w-fit'>
              <select
                name='select payment'
                id='payment'
                className='bg-background-v2  w-full'
              >
                <option value=''>Select payment</option>
                <option value='Virtual account'>Virtual account</option>
                <option value='Transfer'>Transfer</option>
                <option value='COD'>COD</option>
              </select>
            </div>
          </div>
          {/* <div className='flex justify-between items-center py-3'>
            <p className='text-label text-sm'>Total Payment</p>
            <p className='text-title'>
              IDR {totalOrder * events.price - usePoint}
            </p>
          </div> */}
        </div>
      </div>
      <div className='mt-12 lg:mt-0'>
        <h2 className='text-title mb-6 font-semibold'>Details Information</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={personalInfoSchema}
          onSubmit={async (values) => {
            console.log(values)
          }}
        >
          {(props: FormikProps<personalInfoValues>) => {
            const { values, errors, touched, handleChange } = props

            return (
              <Form>
                <div className='bg-white px-3 lg:px-6 py-6 mb-6 rounded-md'>
                  <div className='flex flex-col mb-3'>
                    <label htmlFor='fullName' className='text-body'>
                      Full Name
                    </label>
                    <Field
                      className='px-4 py-3 mt-3 text-body rounded-md border border-border-line focus:outline-none'
                      type='text'
                      name='fullName'
                      onChange={handleChange}
                      value={values.fullName}
                      placeholder={"Fill your full name"}
                    />
                    {touched.fullName && errors.fullName ? (
                      <div className='text-error text-sm mt-1'>
                        {errors.fullName}
                      </div>
                    ) : null}
                  </div>
                  <div className='flex flex-col mb-3'>
                    <label htmlFor='email' className='text-body'>
                      Email
                    </label>
                    <Field
                      className='px-4 py-3 mt-3 text-body rounded-md border border-border-line focus:outline-none'
                      type='email'
                      name='email'
                      onChange={handleChange}
                      value={values.email}
                      placeholder={values.email}
                    />
                    {touched.email && errors.email ? (
                      <div className='text-error text-sm mt-1'>
                        {errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor='phone' className='text-body'>
                      Phone Number
                    </label>
                    <Field
                      className='px-4 py-3 mt-3 text-body rounded-md border border-border-line focus:outline-none'
                      type='text'
                      name='phone'
                      onChange={handleChange}
                      value={values.phone}
                      placeholder={"Fill your phone"}
                    />
                    {touched.phone && errors.phone ? (
                      <div className='text-error text-sm mt-1'>
                        {errors.phone}
                      </div>
                    ) : null}
                  </div>
                </div>
                <button
                  className='bg-primary text-white text-sm font-bold w-full py-2 lg:py-4 rounded-md mb-4'
                  type='submit'
                >
                  Pay your order
                </button>
                <Link href={"/ticket"}>next</Link>
              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}

export default Order
